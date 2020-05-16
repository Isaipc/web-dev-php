DROP DATABASE IF EXISTS `web_dev_php`;

CREATE DATABASE IF NOT EXISTS `web_dev_php`;

USE `web_dev_php`;

CREATE TABLE IF NOT EXISTS `account`(
    `id` INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(60) NOT NULL,
    `lastname` VARCHAR(120) NOT NULL,
    `dni` VARCHAR(30) NOT NULL,
    `password` VARCHAR(191) NOT NULL,
    `phone` VARCHAR(12) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `zipcode` MEDIUMINT NOT NULL,
    `age` TINYINT NOT NULL,
    `gender` ENUM('Hombre', 'Mujer') NOT NULL,
    `address` VARCHAR(90) NOT NULL,
    `created_at` TIMESTAMP NOT NULL,
    `updated_at` TIMESTAMP NOT NULL
)