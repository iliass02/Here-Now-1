# ************************************************************
# Sequel Pro SQL dump
# Version 4541
#
# http://www.sequelpro.com/
# https://github.com/sequelpro/sequelpro
#
# Hôte: 127.0.0.1 (MySQL 5.5.42)
# Base de données: Here-and-now
# Temps de génération: 2016-09-05 19:36:30 +0000
# ************************************************************


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


# Affichage de la table favorites
# ------------------------------------------------------------

DROP TABLE IF EXISTS `favorites`;

CREATE TABLE `favorites` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `user_id` int(11) unsigned DEFAULT NULL,
  `name` varchar(150) NOT NULL DEFAULT '',
  `address` varchar(250) NOT NULL DEFAULT '',
  `latitude` varchar(50) NOT NULL DEFAULT '',
  `longitude` varchar(50) NOT NULL DEFAULT '',
  `place_id` varchar(250) NOT NULL DEFAULT '',
  PRIMARY KEY (`id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `favorites_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;



# Affichage de la table interest
# ------------------------------------------------------------

DROP TABLE IF EXISTS `interest`;

CREATE TABLE `interest` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL DEFAULT '',
  `fr_name` varchar(100) NOT NULL DEFAULT '',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;



# Affichage de la table news_feed
# ------------------------------------------------------------

DROP TABLE IF EXISTS `news_feed`;

CREATE TABLE `news_feed` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `user_id` int(11) DEFAULT NULL,
  `content` text,
  `date_post` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;



# Affichage de la table opinions
# ------------------------------------------------------------

DROP TABLE IF EXISTS `opinions`;

CREATE TABLE `opinions` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `interest_id` varchar(250) DEFAULT NULL,
  `user_id` int(11) DEFAULT NULL,
  `content` text,
  `date_post` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;



# Affichage de la table users
# ------------------------------------------------------------

DROP TABLE IF EXISTS `users`;

CREATE TABLE `users` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `login` varchar(100) NOT NULL DEFAULT '',
  `email` varchar(100) NOT NULL DEFAULT '',
  `password` varchar(255) NOT NULL DEFAULT '',
  `profileImageURL` varchar(250) DEFAULT NULL,
  `lastname` varchar(150) DEFAULT NULL,
  `firstname` varchar(150) DEFAULT NULL,
  `birth_date` date DEFAULT NULL,
  `sexe` varchar(1) DEFAULT NULL,
  `social` tinyint(4) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;



# Affichage de la table users_interest
# ------------------------------------------------------------

DROP TABLE IF EXISTS `users_interest`;

CREATE TABLE `users_interest` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `user_id` int(11) unsigned NOT NULL,
  `interest_id` int(11) unsigned NOT NULL,
  PRIMARY KEY (`id`),
  KEY `user_id` (`user_id`),
  KEY `interest_id` (`interest_id`),
  CONSTRAINT `users_interest_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`),
  CONSTRAINT `users_interest_ibfk_2` FOREIGN KEY (`interest_id`) REFERENCES `interest` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;




/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
