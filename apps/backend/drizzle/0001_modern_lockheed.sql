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
	`couseId` int NOT NULL,
	`title` varchar(255),
	`isCompleted` boolean NOT NULL DEFAULT false,
	`videoUrl` varchar(255),
	`memo` varchar(500),
	CONSTRAINT `lectureTable_lectureId` PRIMARY KEY(`lectureId`)
);
--> statement-breakpoint
ALTER TABLE `lectureTable` ADD CONSTRAINT `lectureTable_couseId_courseTable_courseid_fk` FOREIGN KEY (`couseId`) REFERENCES `courseTable`(`courseid`) ON DELETE no action ON UPDATE no action;