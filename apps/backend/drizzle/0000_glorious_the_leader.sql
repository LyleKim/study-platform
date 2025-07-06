CREATE TABLE `courseTable` (
	`courseid` int AUTO_INCREMENT NOT NULL,
	`title` varchar(30),
	`goalDate` date,
	`createdAt` date,
	CONSTRAINT `courseTable_courseid` PRIMARY KEY(`courseid`)
);
--> statement-breakpoint
CREATE TABLE `lectureTable` (
	`lectureId` int AUTO_INCREMENT NOT NULL,
	`courseId` int NOT NULL,
	`title` varchar(255),
	`isCompleted` boolean NOT NULL DEFAULT false,
	`videoUrl` varchar(255),
	`memo` text,
	CONSTRAINT `lectureTable_lectureId` PRIMARY KEY(`lectureId`)
);
--> statement-breakpoint
ALTER TABLE `lectureTable` ADD CONSTRAINT `lectureTable_courseId_courseTable_courseid_fk` FOREIGN KEY (`courseId`) REFERENCES `courseTable`(`courseid`) ON DELETE no action ON UPDATE no action;