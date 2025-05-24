CREATE DATABASE IF NOT EXISTS board_game_corner;
USE board_game_corner;

CREATE TABLE IF NOT EXISTS `basic_user` (
	`id` bigint AUTO_INCREMENT NOT NULL UNIQUE,
	`first_name` varchar(255) NOT NULL,
	`last_name` varchar(255) NOT NULL,
	`phone_number` varchar(10) NOT NULL,
	`user_id` bigint NOT NULL,
	PRIMARY KEY (`id`)
);

CREATE TABLE IF NOT EXISTS `board_game_cafe` (
	`id` bigint AUTO_INCREMENT NOT NULL UNIQUE,
	`name` varchar(255) NOT NULL,
	`city` varchar(255) NOT NULL,
	`address` varchar(255) NOT NULL,
	`phone_number` varchar(10) NOT NULL,
	`photo` varchar(255),
	`user_id` bigint NOT NULL,
	PRIMARY KEY (`id`)
);

CREATE TABLE IF NOT EXISTS `reservation` (
	`id` bigint AUTO_INCREMENT NOT NULL UNIQUE,
	`date` date NOT NULL,
	`time` time NOT NULL,
	`players_no` int NOT NULL,
	`customer_first_name` varchar(255) NOT NULL,
	`customer_last_name` varchar(255) NOT NULL,
	`customer_email` varchar(255) NOT NULL,
	`customer_phone` varchar(10) NOT NULL,
	`status` varchar(255) NOT NULL,
	`board_game_id` bigint NOT NULL,
	`board_game_cafe_id` bigint NOT NULL,
	`basic_user_id` bigint,
	PRIMARY KEY (`id`)
);

CREATE TABLE IF NOT EXISTS `user_board_game_list` (
	`id` bigint AUTO_INCREMENT NOT NULL UNIQUE,
	`is_favorite` boolean NOT NULL,
	`is_have_played` boolean NOT NULL,
	`is_want_to_play` boolean NOT NULL,
	`basic_user_id` bigint NOT NULL,
	`board_game_id` bigint NOT NULL,
	PRIMARY KEY (`id`)
);

CREATE TABLE IF NOT EXISTS `board_game` (
	`id` bigint AUTO_INCREMENT NOT NULL UNIQUE,
	`bgg_id` varchar(255) NOT NULL,
	`category` varchar(255) NOT NULL,
	`name` varchar(255) NOT NULL UNIQUE,
	`min_players` int NOT NULL,
	`max_players` int NOT NULL,
	`playing_time` int NOT NULL,
	`age` int NOT NULL,
	`description` text NOT NULL,
	`image` varchar(255),
	`is_hot` boolean NOT NULL DEFAULT false,
	PRIMARY KEY (`id`)
);

CREATE TABLE IF NOT EXISTS `review` (
	`id` bigint AUTO_INCREMENT NOT NULL UNIQUE,
	`stars` int NOT NULL,
	`description` text NOT NULL,
	`created_on` datetime NOT NULL,
	`board_game_id` bigint NOT NULL,
	`basic_user_id` bigint NOT NULL,
	PRIMARY KEY (`id`)
);

CREATE TABLE IF NOT EXISTS `board_game_catalog` (
	`id` bigint AUTO_INCREMENT NOT NULL UNIQUE,
	`board_game_id` bigint NOT NULL,
	`board_game_cafe_id` bigint NOT NULL,
	PRIMARY KEY (`id`)
);

CREATE TABLE IF NOT EXISTS `user` (
	`id` bigint AUTO_INCREMENT NOT NULL UNIQUE,
	`email` varchar(255) NOT NULL UNIQUE,
	`password` varchar(255) NOT NULL,
	`role` ENUM('USER', 'ADMIN') NOT NULL,
	PRIMARY KEY (`id`)
);

ALTER TABLE `basic_user` ADD CONSTRAINT `basic_user_fk4` FOREIGN KEY (`user_id`) REFERENCES `user`(`id`);
ALTER TABLE `board_game_cafe` ADD CONSTRAINT `board_game_cafe_fk6` FOREIGN KEY (`user_id`) REFERENCES `user`(`id`);
ALTER TABLE `reservation` ADD CONSTRAINT `reservation_fk9` FOREIGN KEY (`board_game_id`) REFERENCES `board_game`(`id`);

ALTER TABLE `reservation` ADD CONSTRAINT `reservation_fk10` FOREIGN KEY (`board_game_cafe_id`) REFERENCES `board_game_cafe`(`id`);

ALTER TABLE `reservation` ADD CONSTRAINT `reservation_fk11` FOREIGN KEY (`basic_user_id`) REFERENCES `basic_user`(`id`);
ALTER TABLE `user_board_game_list` ADD CONSTRAINT `user_board_game_list_fk2` FOREIGN KEY (`basic_user_id`) REFERENCES `basic_user`(`id`);

ALTER TABLE `user_board_game_list` ADD CONSTRAINT `user_board_game_list_fk3` FOREIGN KEY (`board_game_id`) REFERENCES `board_game`(`id`);

ALTER TABLE `review` ADD CONSTRAINT `review_fk4` FOREIGN KEY (`board_game_id`) REFERENCES `board_game`(`id`);

ALTER TABLE `review` ADD CONSTRAINT `review_fk5` FOREIGN KEY (`basic_user_id`) REFERENCES `basic_user`(`id`);
ALTER TABLE `board_game_catalog` ADD CONSTRAINT `board_game_catalog_fk1` FOREIGN KEY (`board_game_id`) REFERENCES `board_game`(`id`);

ALTER TABLE `board_game_catalog` ADD CONSTRAINT `board_game_catalog_fk2` FOREIGN KEY (`board_game_cafe_id`) REFERENCES `board_game_cafe`(`id`);

DELIMITER $$

-- Add triggers to generates a random 10-digit number as an ID in all tables

CREATE TRIGGER `before_insert_user`
BEFORE INSERT ON `user`
FOR EACH ROW
BEGIN
    SET NEW.id = FLOOR(1000000000 + (RAND() * 8999999999)); -- Generates a random 10-digit number
END$$

CREATE TRIGGER `before_insert_basic_user`
BEFORE INSERT ON `basic_user`
FOR EACH ROW
BEGIN
    SET NEW.id = FLOOR(1000000000 + (RAND() * 8999999999)); -- Generates a random 10-digit number
END$$ 

CREATE TRIGGER `before_insert_board_game_cafe`
BEFORE INSERT ON `board_game_cafe`
FOR EACH ROW
BEGIN
    SET NEW.id = FLOOR(1000000000 + (RAND() * 8999999999)); -- Generates a random 10-digit number
END$$

CREATE TRIGGER `before_insert_reservation`
BEFORE INSERT ON `reservation`
FOR EACH ROW
BEGIN
    SET NEW.id = FLOOR(1000000000 + (RAND() * 8999999999)); -- Generates a random 10-digit number
END$$

CREATE TRIGGER `before_insert_user_board_game_list`
BEFORE INSERT ON `user_board_game_list`
FOR EACH ROW
BEGIN
    SET NEW.id = FLOOR(1000000000 + (RAND() * 8999999999)); -- Generates a random 10-digit number
END$$

CREATE TRIGGER `before_insert_board_game`
BEFORE INSERT ON `board_game`
FOR EACH ROW
BEGIN
    SET NEW.id = FLOOR(1000000000 + (RAND() * 8999999999)); -- Generates a random 10-digit number
END$$

CREATE TRIGGER `before_insert_review`
BEFORE INSERT ON `review`
FOR EACH ROW
BEGIN
    SET NEW.id = FLOOR(1000000000 + (RAND() * 8999999999)); -- Generates a random 10-digit number
END$$

CREATE TRIGGER `before_insert_board_game_catalog`
BEFORE INSERT ON `board_game_catalog`
FOR EACH ROW
BEGIN
    SET NEW.id = FLOOR(1000000000 + (RAND() * 8999999999)); -- Generates a random 10-digit number
END$$

DELIMITER ;