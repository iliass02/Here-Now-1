# ************************************************************
# Sequel Pro SQL dump
# Version 4541
#
# http://www.sequelpro.com/
# https://github.com/sequelpro/sequelpro
#
# Hôte: 127.0.0.1 (MySQL 5.5.42)
# Base de données: Here-and-now
# Temps de génération: 2016-07-30 12:12:46 +0000
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
  PRIMARY KEY (`id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `favorites_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

LOCK TABLES `favorites` WRITE;
/*!40000 ALTER TABLE `favorites` DISABLE KEYS */;

INSERT INTO `favorites` (`id`, `user_id`, `name`, `address`, `latitude`, `longitude`)
VALUES
	(18,9,'I.N.R.A','65 Boulevard de Brandebourg, Ivry-sur-Seine','48.81418679999999','2.393429'),
	(35,1,'test','test','1','2'),
	(36,1,'Guerin','7 Place Colbert, Meaux','48.9495783','2.905014');

/*!40000 ALTER TABLE `favorites` ENABLE KEYS */;
UNLOCK TABLES;


# Affichage de la table interest
# ------------------------------------------------------------

DROP TABLE IF EXISTS `interest`;

CREATE TABLE `interest` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL DEFAULT '',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

LOCK TABLES `interest` WRITE;
/*!40000 ALTER TABLE `interest` DISABLE KEYS */;

INSERT INTO `interest` (`id`, `name`)
VALUES
	(1,'Foot à 5'),
	(2,'Restaurant Japonais'),
	(3,'Restaurants Chinois'),
	(4,'Fast Food'),
	(5,'Musée'),
	(6,'Cinéma'),
	(7,'Théâtre'),
	(8,'food');

/*!40000 ALTER TABLE `interest` ENABLE KEYS */;
UNLOCK TABLES;


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

LOCK TABLES `news_feed` WRITE;
/*!40000 ALTER TABLE `news_feed` DISABLE KEYS */;

INSERT INTO `news_feed` (`id`, `user_id`, `content`, `date_post`)
VALUES
	(1,1,NULL,NULL),
	(2,1,'test',NULL),
	(3,1,NULL,NULL),
	(4,1,'test',NULL),
	(5,1,'test',NULL),
	(6,1,'test','2016-07-04 07:47:46'),
	(7,1,'test','2016-07-04 07:47:59'),
	(8,1,'test','2016-07-04 07:48:00'),
	(9,1,'test','2016-07-04 07:48:00'),
	(10,1,'test','2016-07-04 07:48:01'),
	(11,1,'test','2016-07-04 07:48:01'),
	(12,1,'test','2016-07-04 07:48:02'),
	(13,1,'test','2016-07-04 07:48:03'),
	(14,1,'test','2016-07-04 07:48:03'),
	(15,1,'toto','2016-07-04 09:07:31'),
	(16,1,'ceci est un message','2016-07-04 09:12:09'),
	(17,1,'test','2016-07-07 15:26:42'),
	(18,1,'nouveau test','2016-07-07 15:26:51'),
	(19,4,'message doc api','2016-07-20 17:09:12'),
	(20,4,'message doc api','2016-07-20 17:09:35');

/*!40000 ALTER TABLE `news_feed` ENABLE KEYS */;
UNLOCK TABLES;


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

LOCK TABLES `opinions` WRITE;
/*!40000 ALTER TABLE `opinions` DISABLE KEYS */;

INSERT INTO `opinions` (`id`, `interest_id`, `user_id`, `content`, `date_post`)
VALUES
	(1,NULL,1,NULL,'0000-00-00 00:00:00'),
	(2,'3',1,NULL,'0000-00-00 00:00:00'),
	(3,'3',1,'message','0000-00-00 00:00:00'),
	(4,NULL,1,NULL,'0000-00-00 00:00:00'),
	(5,'5',1,'soso','0000-00-00 00:00:00'),
	(6,'5',1,'soso','0000-00-00 00:00:00'),
	(7,'5',1,'soso','0000-00-00 00:00:00'),
	(8,'5',1,'soso',NULL),
	(9,'5',1,'soso',NULL),
	(10,'5',1,'soso','0000-00-00 00:00:00'),
	(11,NULL,1,NULL,'0000-00-00 00:00:00'),
	(12,NULL,1,NULL,'0000-00-00 00:00:00'),
	(13,NULL,1,NULL,'0000-00-00 00:00:00'),
	(14,NULL,1,NULL,'0000-00-00 00:00:00'),
	(15,NULL,0,'test','0000-00-00 00:00:00'),
	(16,'ChIJ6V20L7Nz5kcRLP1rxsxJPU8',0,'test','0000-00-00 00:00:00'),
	(17,'ChIJ6V20L7Nz5kcRLP1rxsxJPU8',1,'test','0000-00-00 00:00:00'),
	(18,'ChIJ6V20L7Nz5kcRLP1rxsxJPU8',1,'test','2016-07-04 08:03:28'),
	(19,'ChIJ6V20L7Nz5kcRLP1rxsxJPU8',1,'test','2016-07-04 08:03:31'),
	(20,'ChIJ6V20L7Nz5kcRLP1rxsxJPU8',1,'test','2016-07-04 08:03:31'),
	(24,'ChIJYQmE1m6h6EcRo-CqZJjPvy4',1,'Test from iphone','2016-07-05 16:12:14'),
	(29,'ChIJYQmE1m6h6EcRo-CqZJjPvy4',1,'nouvelle avis','2016-07-17 15:25:32'),
	(30,'3',3,'message doc api','2016-07-20 17:02:28');

/*!40000 ALTER TABLE `opinions` ENABLE KEYS */;
UNLOCK TABLES;


# Affichage de la table users
# ------------------------------------------------------------

DROP TABLE IF EXISTS `users`;

CREATE TABLE `users` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `login` varchar(100) NOT NULL DEFAULT '',
  `email` varchar(100) NOT NULL DEFAULT '',
  `password` varchar(255) NOT NULL DEFAULT '',
  `profileImageURL` varchar(250) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;

INSERT INTO `users` (`id`, `login`, `email`, `password`, `profileImageURL`)
VALUES
	(1,'login-user','email-user','$2a$10$hgSaY.DC.LTP1daE0q.SB.sJJFW6SHGCJ6GdJkc7X1s5zkW3xZkfe',NULL),
	(8,'Sadam_Houssam','shadow_1996@hotmail.fr','$2a$10$5qCBG/mMlte0SOUgjTVt3.cr/sw07B5sUAS7JqAa3AabWl6qKPWo2',NULL),
	(9,'Fin_Pomponette','pomponette93420@gmail.com','$2a$10$9xYe2ynIi1ykcWEFhD/heeNKX.MS5CnQluwua7ELOu8YttYmaXm5q',NULL),
	(11,'marchoud_fatima','fatima.marchoud.maamri@gmail.com','$2a$10$0c3cqWQvcs6y.yyVvwCIaudQ9B44VCWLfhLVFC5ykxr6ha73xdVmu',NULL),
	(12,'sisi','sisi@toto.com','$2a$10$.eyajda.Gx5H45JosxavxeUCcSq0SD3hrVvKV42u89Qq0L/auEnMi',NULL),
	(13,'','','',NULL),
	(14,'','','',NULL),
	(15,'login-user3','iliass','$2a$10$9gsIRF7Elz6lAFUP9N7qqeXnCJMp6gD9saw100WxHLmnaP3/rc6Im',NULL),
	(43,'Marchoud_Iliass','iliass.marchoud@gmail.com','$2a$10$QFioOzMIW/Zx1J1/CHzEHeGjMG.Aa7lVeC3pxUb0uwhy1/tNo4n0G','https://lh3.googleusercontent.com/-3unpm9ZGr-w/AAAAAAAAAAI/AAAAAAAABcw/AuIF9advowE/photo.jpg');

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
	(1,1,8),
	(2,1,7),
	(135,9,8),
	(137,11,8),
	(140,12,8);

/*!40000 ALTER TABLE `users_interest` ENABLE KEYS */;
UNLOCK TABLES;



/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
