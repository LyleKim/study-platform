import { boolean, int, varchar, mysqlTable, serial } from 'drizzle-orm/mysql-core';
import { courseTable } from './courseTable';
export const lectureTable = mysqlTable('lecture_table', {
    lectureId: int().primaryKey().autoincrement(),
    courseId: int().notNull().references(() => courseTable.courseId),
    title: varchar({ length: 255 }),
    isCompleted: boolean().notNull().default(false),
    videoUrl: varchar({ length: 255 }),
    memo: varchar({ length: 500 }),
});
