# ************************************************************
# Sequel Pro SQL dump
# Version 4541
#
# http://www.sequelpro.com/
# https://github.com/sequelpro/sequelpro
#
# Hôte: 127.0.0.1 (MySQL 5.6.30)
# Base de données: Here-and-now
# Temps de génération: 2016-04-26 18:47:23 +0000
# ************************************************************


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


# Affichage de la table category_interest
# ------------------------------------------------------------

DROP TABLE IF EXISTS `category_interest`;

CREATE TABLE `category_interest` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

LOCK TABLES `category_interest` WRITE;
/*!40000 ALTER TABLE `category_interest` DISABLE KEYS */;

INSERT INTO `category_interest` (`id`, `name`)
VALUES
	(1,'Restaurants'),
	(2,'Sports'),
	(3,'Culture et Art');

/*!40000 ALTER TABLE `category_interest` ENABLE KEYS */;
UNLOCK TABLES;


# Affichage de la table interest
# ------------------------------------------------------------

DROP TABLE IF EXISTS `interest`;

CREATE TABLE `interest` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `category_id` int(11) unsigned DEFAULT NULL,
  `name` varchar(100) NOT NULL DEFAULT '',
  PRIMARY KEY (`id`),
  KEY `category_id` (`category_id`),
  CONSTRAINT `interest_ibfk_1` FOREIGN KEY (`category_id`) REFERENCES `category_interest` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

LOCK TABLES `interest` WRITE;
/*!40000 ALTER TABLE `interest` DISABLE KEYS */;

INSERT INTO `interest` (`id`, `category_id`, `name`)
VALUES
	(1,1,'Japonais'),
	(2,1,'Chinois'),
	(3,1,'Mexicain'),
	(4,1,'Fast Food'),
	(5,1,'Italien'),
	(6,1,'Pizzeria'),
	(7,2,'Foot à 5'),
	(8,2,'Piscine Municipale'),
	(9,3,'Musée'),
	(10,3,'Cinema');

/*!40000 ALTER TABLE `interest` ENABLE KEYS */;
UNLOCK TABLES;


# Affichage de la table users
# ------------------------------------------------------------

DROP TABLE IF EXISTS `users`;

CREATE TABLE `users` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `login` varchar(100) NOT NULL DEFAULT '',
  `email` varchar(100) NOT NULL DEFAULT '',
  `password` varchar(255) NOT NULL DEFAULT '',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;

INSERT INTO `users` (`id`, `login`, `email`, `password`)
VALUES
	(1,'login-user','email-user','$2a$10$hgSaY.DC.LTP1daE0q.SB.sJJFW6SHGCJ6GdJkc7X1s5zkW3xZkfe'),
	(2,'dzdzdz','dzdzdz@dzzdddz','$2a$10$pC9izDWaKfIfIOT3bM/Yt.BJJTH47nWH7b/cJdk2piA3XWDIGVTUG'),
	(3,'dzdzdzzsszsz','dzdzdz@dzzdszszddz','$2a$10$9/D1yV6gJWAdhNfPcMQm6OqMwP.kKndKO2bqSUnevlcLB1aZSwFT2'),
	(4,'dzdzdzzsszszsss','dzdzdz@dzzdszszddzsss','$2a$10$tiLv.ppn2g7DOLXJkY1RHeZg/pENo5CPik/1mLH1lfxQ.cAw4wjy.'),
	(5,'dzdzdzzsszszsssszsz','dzdzdz@dzzdszszddzsssszzsz','$2a$10$a45ZfivcRF9KCfYAzebdBe7.O6MDGlY1OcA6Obx93Hx2X.xrTs3qO'),
	(6,'dzdzdzzsszszsssszszszszz','dzdzdz@dzzdszszddzsssszzszszzs','$2a$10$wkv5n.pbi38JKkufrLO7f.0Mb3fQBBrykNmM0ARCliKoLJvAcuazm'),
	(7,'dzdzdzzsszszsssszszszsxsxszz','dzdzdz@dzzdszszddzsssszzszszzs','$2a$10$rgBVMgfr4sEL7XYySUIVNedZc1lcdYDJma8Ptbk0C145hkwsiiNmi'),
	(8,'dzdzdzdzdz','dzdzddz@dzdzzddz','$2a$10$lPqX8Rk4GtmycHkBZJ0YtO2dBPGBnTGvV61CzItKxb/5kamSyY2Q2'),
	(9,'dzdzdzdzdzdzzddzdz','dzdzddz@dzdzzddzdzdzdzdz','$2a$10$K4nTdYseug66F7WZL3RCVepL2Hlbwzo25qbqFFwJ/wXOs04gutvZy'),
	(10,'ssasasasa','saas@ssasasa','$2a$10$kyYQLMzyTziwLYJzJ48tdeIXokXKxa1HYICVV/a2N3fiCaLO7XXym'),
	(11,'iliass','iliass@gmail.com','$2a$10$aDZNhM8V6Rnr6nB1KvmFh.gnRlT0UwIs9cXUEAYqlGWjnr1jvdYjG'),
	(12,'dzdzdzdz','zddzdzdz@zzzzz','$2a$10$3sgUqQFl1TWTbWnLERqg6eh7A1QY7ad9YGLcfDjcji8THsY.nOM3O');

/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;


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

LOCK TABLES `users_interest` WRITE;
/*!40000 ALTER TABLE `users_interest` DISABLE KEYS */;

INSERT INTO `users_interest` (`id`, `user_id`, `interest_id`)
VALUES
	(1,4,1),
	(2,10,1),
	(3,10,1),
	(4,10,1),
	(5,10,2),
	(6,10,3),
	(7,10,1),
	(8,10,2),
	(9,10,3),
	(10,10,1),
	(11,10,2),
	(12,10,3),
	(13,10,3),
	(14,10,3),
	(15,11,1),
	(16,11,2),
	(17,12,3),
	(18,12,4),
	(19,12,5),
	(20,12,6),
	(21,12,7),
	(22,12,8);

/*!40000 ALTER TABLE `users_interest` ENABLE KEYS */;
UNLOCK TABLES;



/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
