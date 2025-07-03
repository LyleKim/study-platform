import { boolean, int, varchar, mysqlTable, serial } from 'drizzle-orm/mysql-core';
import { courseTable } from './courseTable';

<<<<<<< main
export const lectureTable = mysqlTable('lecture_table', {
    lectureId: int().primaryKey().autoincrement(),
    courseId: int().notNull().references(() => courseTable.courseId),
    title: varchar({length: 255}),
    isCompleted: boolean().notNull().default(false),
    videoUrl: varchar({length: 255}),
    memo: varchar({length: 500}),
});
=======
export const lectureTable = mysqlTable('lectureTable', {
    lectureId: int('lectureId').primaryKey().autoincrement(),
    courseId: int('couseId').notNull().references(() => courseTable.courseId),
    title: varchar('title',{length: 255}),
    isCompleted: boolean('isCompleted').notNull().default(false),
    videoUrl: varchar('videoUrl',{length: 255}),
    memo: varchar('memo',{length: 500}),
});
>>>>>>> main
