CREATE DATABASE IF NOT EXISTS board_game_corner;
USE board_game_corner;

CREATE TABLE IF NOT EXISTS `registered_user` (
	`id` int AUTO_INCREMENT NOT NULL UNIQUE,
	`first_name` varchar(255) NOT NULL,
	`last_name` varchar(255) NOT NULL,
	`email` varchar(255) NOT NULL UNIQUE,
	`password` varchar(255) NOT NULL,
	`phone_number` int NOT NULL,
	PRIMARY KEY (`id`)
);

CREATE TABLE IF NOT EXISTS `board_game_cafe` (
	`id` int AUTO_INCREMENT NOT NULL UNIQUE,
	`name` varchar(255) NOT NULL,
	`city` varchar(255) NOT NULL,
	`address` varchar(255) NOT NULL,
	`phone_number` int NOT NULL,
	`email` varchar(255) NOT NULL UNIQUE,
	`password` varchar(255) NOT NULL UNIQUE,
	`photo` varchar(255) NOT NULL,
	PRIMARY KEY (`id`)
);

CREATE TABLE IF NOT EXISTS `reservation` (
	`id` int AUTO_INCREMENT NOT NULL UNIQUE,
	`date` date NOT NULL,
	`time` time NOT NULL,
	`players_no` int NOT NULL,
	`customer_first_name` varchar(255) NOT NULL,
	`customer_last_name` varchar(255) NOT NULL,
	`customer_email` varchar(255) NOT NULL,
	`customer_phone` int NOT NULL,
	`status` varchar(255) NOT NULL,
	`board_game_id` int NOT NULL,
	`board_game_cafe_id` int NOT NULL,
	`registered_user_id` int,
	PRIMARY KEY (`id`)
);

CREATE TABLE IF NOT EXISTS `user_board_game_list` (
	`id` int AUTO_INCREMENT NOT NULL UNIQUE,
	`is_favorite` boolean NOT NULL,
	`is_have_played` boolean NOT NULL,
	`is_want_to_play` boolean NOT NULL,
	`reg_user_id` int NOT NULL,
	`board_game_id` int NOT NULL,
	PRIMARY KEY (`id`)
);

CREATE TABLE IF NOT EXISTS `board_game` (
	`id` int AUTO_INCREMENT NOT NULL UNIQUE,
	`name` varchar(255) NOT NULL UNIQUE,
	PRIMARY KEY (`id`)
);

CREATE TABLE IF NOT EXISTS `review` (
	`id` int AUTO_INCREMENT NOT NULL UNIQUE,
	`stars` int NOT NULL,
	`description` text NOT NULL,
	`created_on` datetime NOT NULL,
	`board_game_id` int NOT NULL,
	`reg_user_id` int NOT NULL,
	PRIMARY KEY (`id`)
);

CREATE TABLE IF NOT EXISTS `board_game_catalog` (
	`id` int AUTO_INCREMENT NOT NULL UNIQUE,
	`board_game_id` int NOT NULL,
	`board_game_cafe_id` int NOT NULL,
	PRIMARY KEY (`id`)
);



ALTER TABLE `reservation` ADD CONSTRAINT `reservation_fk9` FOREIGN KEY (`board_game_id`) REFERENCES `board_game`(`id`);

ALTER TABLE `reservation` ADD CONSTRAINT `reservation_fk10` FOREIGN KEY (`board_game_cafe_id`) REFERENCES `board_game_cafe`(`id`);

ALTER TABLE `reservation` ADD CONSTRAINT `reservation_fk11` FOREIGN KEY (`registered_user_id`) REFERENCES `registered_user`(`id`);
ALTER TABLE `user_board_game_list` ADD CONSTRAINT `user_board_game_list_fk4` FOREIGN KEY (`reg_user_id`) REFERENCES `registered_user`(`id`);

ALTER TABLE `user_board_game_list` ADD CONSTRAINT `user_board_game_list_fk5` FOREIGN KEY (`board_game_id`) REFERENCES `board_game`(`id`);

ALTER TABLE `review` ADD CONSTRAINT `review_fk4` FOREIGN KEY (`board_game_id`) REFERENCES `board_game`(`id`);

ALTER TABLE `review` ADD CONSTRAINT `review_fk5` FOREIGN KEY (`reg_user_id`) REFERENCES `registered_user`(`id`);
ALTER TABLE `board_game_catalog` ADD CONSTRAINT `board_game_catalog_fk1` FOREIGN KEY (`board_game_id`) REFERENCES `board_game`(`id`);

ALTER TABLE `board_game_catalog` ADD CONSTRAINT `board_game_catalog_fk2` FOREIGN KEY (`board_game_cafe_id`) REFERENCES `board_game_cafe`(`id`);