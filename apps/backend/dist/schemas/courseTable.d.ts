export declare const courseTable: import("drizzle-orm/mysql-core").MySqlTableWithColumns<{
    name: "courseTable";
    schema: undefined;
    columns: {
        courseId: import("drizzle-orm/mysql-core").MySqlColumn<{
            name: "courseid";
            tableName: "courseTable";
            dataType: "number";
            columnType: "MySqlInt";
            data: number;
            driverParam: string | number;
            notNull: true;
            hasDefault: true;
            isPrimaryKey: true;
            isAutoincrement: true;
            hasRuntimeDefault: false;
            enumValues: undefined;
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {}>;
        title: import("drizzle-orm/mysql-core").MySqlColumn<{
            name: "title";
            tableName: "courseTable";
            dataType: "string";
            columnType: "MySqlVarChar";
            data: string;
            driverParam: string | number;
            notNull: false;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {}>;
        goalDate: import("drizzle-orm/mysql-core").MySqlColumn<{
            name: "goalDate";
            tableName: "courseTable";
            dataType: "date";
            columnType: "MySqlDate";
            data: Date;
            driverParam: string | number;
            notNull: false;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: undefined;
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {}>;
        createdAt: import("drizzle-orm/mysql-core").MySqlColumn<{
            name: "createdAt";
            tableName: "courseTable";
            dataType: "date";
            columnType: "MySqlDate";
            data: Date;
            driverParam: string | number;
            notNull: false;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: undefined;
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {}>;
    };
    dialect: "mysql";
}>;
//# sourceMappingURL=courseTable.d.ts.map