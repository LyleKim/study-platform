CREATE TABLE `course_table` (
	`courseId` int AUTO_INCREMENT NOT NULL,
	`title` varchar(30),
	`goalDate` date,
	`createdAt` date,
	CONSTRAINT `course_table_courseId` PRIMARY KEY(`courseId`)
);
--> statement-breakpoint
CREATE TABLE `lecture_table` (
	`lectureId` int AUTO_INCREMENT NOT NULL,
	`courseId` int NOT NULL,
	`title` varchar(255),
	`isCompleted` boolean NOT NULL DEFAULT false,
	`videoUrl` varchar(255),
	`memo` varchar(500),
	CONSTRAINT `lecture_table_lectureId` PRIMARY KEY(`lectureId`)
);
--> statement-breakpoint
ALTER TABLE `lecture_table` ADD CONSTRAINT `lecture_table_courseId_course_table_courseId_fk` FOREIGN KEY (`courseId`) REFERENCES `course_table`(`courseId`) ON DELETE no action ON UPDATE no action;