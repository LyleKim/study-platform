import { Hono } from "hono";
import { z } from "zod";
import { zValidator } from "~/utils/zValidator-wrapper";
import type { Env } from '~/types/Env';
import { db } from "~/utils/db";
import { courseTable } from "~/schemas/courseTable";
import { and, count, eq, ne } from "drizzle-orm";
import { lectureTable } from "~/schemas/lectureTable";


let courseTitle:string;
let total:number;
let completedCount:number;
let courseID:number;

const lectureSchema = z.object({ 
    courseId: z.string(),
    title: z.string(),
    videoUrl: z.string(),
  });


const app = new Hono<Env>()
    .post( 
        '/title',
        zValidator('json', 
            z.object({ 
              corId: z.string()
            })
        ),
        async (c) => {
            const data = c.req.valid('json');
            courseID = Number(data.corId);
            const result = await db.select({
                courseTitle: courseTable.title
            }).from(courseTable)
            .where(eq(courseTable.courseId, courseID))

            courseTitle = result[0]?.courseTitle??""
            return c.json(courseTitle);
        }
    )
    .get(
        '/allTitle',
        async (c) => {
            const titleList = await db.select({title : lectureTable.title})
            .from(lectureTable)

            let result:string[] = titleList.map(item => item.title??"");
            return c.json(result);
        }
    )

    .post(
        '/progRate',
        zValidator('json', 
            z.object({ 
              corId: z.string()
            })
        ),
        async(c)=>{
            const data = c.req.valid('json');
            courseID = Number(data.corId);
            //courseId가 같은 것들 중에서 강의 목록의 총 개수
            const max = await db.select({total: count()})
            .from(lectureTable)
            .where(and(eq(lectureTable.courseId, courseID), ne(lectureTable.title, "")));
            
            //학습 완료한 lectrue의 수
            const value = await db.select({completedCount: count()})
            .from(lectureTable)
            .where(and(eq(lectureTable.isCompleted,true), eq(lectureTable.courseId, courseID), ne(lectureTable.title, "")));

            total = max[0]?.total??0;
            completedCount = value[0]?.completedCount??0;

            let result:number[] = [total, completedCount];
            
            return c.json(result);
        }
    )

    //TOTO: get a lecture titleList that is a part of course
    .post( //lectureTable
        '/tdl',
        zValidator('json', 
            z.object({ 
              corId: z.string()
            })
        ),
        async (c) => {
            const data = c.req.valid('json');
            courseID = Number(data.corId);
            //과목에 맞는 강좌 목록 가져오기
            const titleList = await db.select({title : lectureTable.title})
            .from(lectureTable)
            .where(and(eq(lectureTable.courseId, courseID), ne(lectureTable.title, "")));

            let result:string[] = titleList.map(item => item.title??"");

            return c.json(result);
        }
    )
    //TODO: get a lecture data and insert column
    .post( //lectureTable
        '/Addlecture',
        zValidator('json', 
            z.object({ 
              lecture: lectureSchema
            })
        ),
        async(c) =>{
            const data = c.req.valid('json');
            courseID = Number(data.lecture.courseId);
            await db.insert(lectureTable).values({
                courseId: courseID,
                title: data.lecture.title,
                isCompleted: false,
                videoUrl: data.lecture.videoUrl,
                memo: ""
            });

            return c.json("성공적으로 저장했습니다.");
        }
    )
    .post( //lectureTable
        '/getLectureId',
        zValidator('json', 
            z.object({ 
              title: z.string()
            })
        ),
        async(c) =>{
            const data = c.req.valid('json');
            const titleList = await db.select({id: lectureTable.lectureId})
            .from(lectureTable)
            .where(eq(lectureTable.title, data.title))

            let lectureTitle = titleList[0]?.id??-1;

            return c.json(lectureTitle);
        }
    )
    .post( //lectureTable
        '/modifyTitle',
        zValidator('json', 
            z.object({ 
              title: z.string(),
              modify: z.string()
            })
        ),
        async (c) => {
            const data = c.req.valid('json');
            await db.update(lectureTable)
                    .set({title: data.modify})
                    .where(eq(lectureTable.title, data.title))
            
            return c.json({message: 'successfully update!!'});
        }
    )
    .post( //lectureTable
        '/deleteCourse',
        zValidator('json', 
            z.object({ 
              title: z.string(),
            })
        ),
        async (c) => {
            const data = c.req.valid('json');
            const res1 = await db.delete(lectureTable).where(eq(lectureTable.title,data.title));
            return c.json({ message: 'successfully delete!!' });
        }
    )

export default app;
