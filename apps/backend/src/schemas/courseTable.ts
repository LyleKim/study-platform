import { int, varchar, date, mysqlTable } from 'drizzle-orm/mysql-core';

export const courseTable = mysqlTable('courseTable', {
    courseId: int('courseid').primaryKey().autoincrement(),
    title: varchar('title',{length: 30}).unique(),
    goalDate: date('goalDate'),
    createdAt: date('createdAt'),
});