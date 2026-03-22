CREATE TABLE `gallery_images` (
	`id` int AUTO_INCREMENT NOT NULL,
	`imageUrl` text NOT NULL,
	`captionHe` varchar(255),
	`captionEn` varchar(255),
	`sortOrder` int NOT NULL DEFAULT 0,
	`active` boolean NOT NULL DEFAULT true,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `gallery_images_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `hero_section` (
	`id` int AUTO_INCREMENT NOT NULL,
	`titleHe` varchar(255),
	`titleEn` varchar(255),
	`subtitleHe` varchar(512),
	`subtitleEn` varchar(512),
	`reserveBtnHe` varchar(128),
	`reserveBtnEn` varchar(128),
	`reserveBtnUrl` text,
	`menuBtnHe` varchar(128),
	`menuBtnEn` varchar(128),
	`menuBtnUrl` varchar(512),
	`instagramUrl` text,
	`facebookUrl` text,
	`tiktokUrl` text,
	`backgroundImageUrl` text,
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `hero_section_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `menu_categories` (
	`id` int AUTO_INCREMENT NOT NULL,
	`nameHe` varchar(128) NOT NULL,
	`nameEn` varchar(128) NOT NULL,
	`descriptionHe` text,
	`descriptionEn` text,
	`sortOrder` int NOT NULL DEFAULT 0,
	`active` boolean NOT NULL DEFAULT true,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `menu_categories_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `menu_items` (
	`id` int AUTO_INCREMENT NOT NULL,
	`categoryId` int NOT NULL,
	`nameHe` varchar(255) NOT NULL,
	`nameEn` varchar(255) NOT NULL,
	`descriptionHe` text,
	`descriptionEn` text,
	`price` float,
	`badges` varchar(512),
	`imageUrl` text,
	`sortOrder` int NOT NULL DEFAULT 0,
	`active` boolean NOT NULL DEFAULT true,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `menu_items_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `navbar_content` (
	`id` int AUTO_INCREMENT NOT NULL,
	`menuHe` varchar(64),
	`menuEn` varchar(64),
	`storyHe` varchar(64),
	`storyEn` varchar(64),
	`galleryHe` varchar(64),
	`galleryEn` varchar(64),
	`faqHe` varchar(64),
	`faqEn` varchar(64),
	`contactHe` varchar(64),
	`contactEn` varchar(64),
	`brandNameHe` varchar(128),
	`brandNameEn` varchar(128),
	`reservationHe` varchar(128),
	`reservationEn` varchar(128),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `navbar_content_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `our_gallery_section` (
	`id` int AUTO_INCREMENT NOT NULL,
	`sectionLabelHe` varchar(128),
	`sectionLabelEn` varchar(128),
	`headlineLine1He` varchar(255),
	`headlineLine2He` varchar(255),
	`headlineLine3He` varchar(255),
	`headlineLine1En` varchar(255),
	`headlineLine2En` varchar(255),
	`headlineLine3En` varchar(255),
	`descriptionHe` text,
	`descriptionEn` text,
	`btnLabelHe` varchar(128),
	`btnLabelEn` varchar(128),
	`btnUrl` text,
	`image1Url` text,
	`image2Url` text,
	`image3Url` text,
	`image4Url` text,
	`image5Url` text,
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `our_gallery_section_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `our_menu_section` (
	`id` int AUTO_INCREMENT NOT NULL,
	`labelHe` varchar(128),
	`labelEn` varchar(128),
	`headlineLine1He` varchar(255),
	`headlineLine2He` varchar(255),
	`headlineLine3He` varchar(255),
	`headlineLine1En` varchar(255),
	`headlineLine2En` varchar(255),
	`headlineLine3En` varchar(255),
	`ctaBtnHe` varchar(128),
	`ctaBtnEn` varchar(128),
	`ctaBtnUrl` text,
	`card1ImageUrl` text,
	`card1NameHe` varchar(255),
	`card1NameEn` varchar(255),
	`card1TypeHe` varchar(128),
	`card1TypeEn` varchar(128),
	`card1BtnHe` varchar(128),
	`card1BtnEn` varchar(128),
	`card1BtnUrl` text,
	`card2ImageUrl` text,
	`card2NameHe` varchar(255),
	`card2NameEn` varchar(255),
	`card2TypeHe` varchar(128),
	`card2TypeEn` varchar(128),
	`card2BtnHe` varchar(128),
	`card2BtnEn` varchar(128),
	`card2BtnUrl` text,
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `our_menu_section_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `our_story_section` (
	`id` int AUTO_INCREMENT NOT NULL,
	`labelHe` varchar(128),
	`labelEn` varchar(128),
	`headlineLine1He` varchar(255),
	`headlineLine2He` varchar(255),
	`headlineLine3He` varchar(255),
	`headlineLine1En` varchar(255),
	`headlineLine2En` varchar(255),
	`headlineLine3En` varchar(255),
	`descriptionHe` text,
	`descriptionEn` text,
	`ctaBtnHe` varchar(128),
	`ctaBtnEn` varchar(128),
	`ctaBtnUrl` text,
	`image1Url` text,
	`image1LabelHe` varchar(128),
	`image1LabelEn` varchar(128),
	`image1TitleHe` varchar(255),
	`image1TitleEn` varchar(255),
	`image2Url` text,
	`image2LabelHe` varchar(128),
	`image2LabelEn` varchar(128),
	`image2TitleHe` varchar(255),
	`image2TitleEn` varchar(255),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `our_story_section_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `site_settings` (
	`id` int AUTO_INCREMENT NOT NULL,
	`key` varchar(64) NOT NULL,
	`value` text,
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `site_settings_id` PRIMARY KEY(`id`),
	CONSTRAINT `site_settings_key_unique` UNIQUE(`key`)
);
--> statement-breakpoint
CREATE TABLE `statistics_section` (
	`id` int AUTO_INCREMENT NOT NULL,
	`customersValue` varchar(32),
	`customersSuffixHe` varchar(32),
	`customersSuffixEn` varchar(32),
	`customersLabelHe` varchar(255),
	`customersLabelEn` varchar(255),
	`yearsValue` varchar(32),
	`yearsSuffixHe` varchar(32),
	`yearsSuffixEn` varchar(32),
	`yearsLabelHe` varchar(255),
	`yearsLabelEn` varchar(255),
	`ratingValue` varchar(16),
	`ratingSymbol` varchar(8),
	`ratingCountHe` varchar(128),
	`ratingCountEn` varchar(128),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `statistics_section_id` PRIMARY KEY(`id`)
);
