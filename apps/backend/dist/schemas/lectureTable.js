import { boolean, int, varchar, mysqlTable, text } from 'drizzle-orm/mysql-core';
import { courseTable } from './courseTable';
export const lectureTable = mysqlTable('lectureTable', {
    lectureId: int('lectureId').primaryKey().autoincrement(),
    courseId: int('courseId').notNull().references(() => courseTable.courseId),
    title: varchar('title', { length: 255 }),
    isCompleted: boolean('isCompleted').notNull().default(false),
    videoUrl: varchar('videoUrl', { length: 255 }),
    memo: text('memo')
});
