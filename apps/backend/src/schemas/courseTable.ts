import { int, varchar, date, mysqlTable, serial } from 'drizzle-orm/mysql-core';

export const courseTable = mysqlTable('course_table', {
    courseId: int().primaryKey().autoincrement(),
    title: varchar({length: 30}),
    goalDate: date(),
    createdAt: date(),
});
