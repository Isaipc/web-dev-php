-- --------------------------------------------------------
-- Host:                         127.0.0.1
-- Versión del servidor:         5.7.26 - MySQL Community Server (GPL)
-- SO del servidor:              Win64
-- HeidiSQL Versión:             11.0.0.5919
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;


-- Volcando estructura de base de datos para web_dev_php
CREATE DATABASE IF NOT EXISTS `web_dev_php` /*!40100 DEFAULT CHARACTER SET latin1 */;
USE `web_dev_php`;

-- Volcando estructura para tabla web_dev_php.account
CREATE TABLE IF NOT EXISTS `account` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(60) NOT NULL,
  `lastname` varchar(120) NOT NULL,
  `dni` varchar(30) NOT NULL,
  `password` varchar(191) NOT NULL,
  `phone` varchar(12) NOT NULL,
  `email` varchar(191) NOT NULL,
  `zipcode` int(11) NOT NULL,
  `age` tinyint(4) NOT NULL,
  `gender` enum('Hombre','Mujer') NOT NULL,
  `address` varchar(90) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=41 DEFAULT CHARSET=latin1;

-- Volcando datos para la tabla web_dev_php.account: 3 rows
/*!40000 ALTER TABLE `account` DISABLE KEYS */;
INSERT INTO `account` (`id`, `name`, `lastname`, `dni`, `password`, `phone`, `email`, `zipcode`, `age`, `gender`, `address`, `created_at`, `updated_at`) VALUES
	(38, 'KDFLSDNF', 'LKSLKFNSLDFN', '54645', '5664654', '556', 'flavio.perez@itssat.mx', 212254, 23, 'Mujer', 'asdlmañsdl', '2020-05-16 20:23:40', '2020-05-16 21:15:53'),
	(39, 'AKSDALSND', 'ASDA5S4D5', '4654654654654654654', 'as6d46a54sd6a5', '65464', 'as1d65a6sd4@a5da6s5d4', 54, 54, 'Mujer', 'Tilapan', '2020-05-16 21:15:03', '2020-05-16 21:17:56'),
	(40, 'SKDFLSKDJF', 'KJSDFJL', '654654', '46d546sd5f46', '546', 'ljl@sdfsklf', 654, 127, 'Mujer', 'dksdflksdf', '2020-05-16 21:30:18', NULL);
/*!40000 ALTER TABLE `account` ENABLE KEYS */;

/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IF(@OLD_FOREIGN_KEY_CHECKS IS NULL, 1, @OLD_FOREIGN_KEY_CHECKS) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
