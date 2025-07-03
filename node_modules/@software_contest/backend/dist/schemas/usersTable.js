//Test를 위한 테이블임 향후 삭제 예정
import { int, mysqlTable, serial, varchar } from 'drizzle-orm/mysql-core';
export const usersTable = mysqlTable('users_table', {
    id: int().primaryKey(),
    name: varchar({ length: 255 }).notNull(),
    age: int().notNull(),
    email: varchar({ length: 255 }).notNull().unique(),
});
