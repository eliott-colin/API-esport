/*M!999999\- enable the sandbox mode */ 
-- MariaDB dump 10.19  Distrib 10.11.14-MariaDB, for debian-linux-gnu (x86_64)
--
-- Host: localhost    Database: esport_db
-- ------------------------------------------------------
-- Server version	10.11.14-MariaDB-0+deb12u2

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `brackets`
--
USE my_database;

DROP TABLE IF EXISTS `brackets`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `brackets` (
  `Id_brackets` int(11) NOT NULL AUTO_INCREMENT,
  `Id_event` int(11) NOT NULL,
  PRIMARY KEY (`Id_brackets`),
  KEY `Id_event` (`Id_event`),
  CONSTRAINT `brackets_ibfk_1` FOREIGN KEY (`Id_event`) REFERENCES `events` (`Id_event`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `brackets`
--

LOCK TABLES `brackets` WRITE;
/*!40000 ALTER TABLE `brackets` DISABLE KEYS */;
/*!40000 ALTER TABLE `brackets` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `cities`
--

DROP TABLE IF EXISTS `cities`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `cities` (
  `Id_cities` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(50) DEFAULT NULL,
  `Id_departements` int(11) NOT NULL,
  PRIMARY KEY (`Id_cities`),
  KEY `Id_departements` (`Id_departements`),
  CONSTRAINT `cities_ibfk_1` FOREIGN KEY (`Id_departements`) REFERENCES `departements` (`Id_departements`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cities`
--

LOCK TABLES `cities` WRITE;
/*!40000 ALTER TABLE `cities` DISABLE KEYS */;
INSERT INTO `cities` VALUES
(1,'Bordeaux',1);
/*!40000 ALTER TABLE `cities` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `contain`
--

DROP TABLE IF EXISTS `contain`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `contain` (
  `Id_matchs` int(11) NOT NULL,
  `Id_brackets` int(11) NOT NULL,
  PRIMARY KEY (`Id_matchs`,`Id_brackets`),
  KEY `Id_brackets` (`Id_brackets`),
  CONSTRAINT `contain_ibfk_1` FOREIGN KEY (`Id_matchs`) REFERENCES `matchs` (`Id_matchs`),
  CONSTRAINT `contain_ibfk_2` FOREIGN KEY (`Id_brackets`) REFERENCES `brackets` (`Id_brackets`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `contain`
--

LOCK TABLES `contain` WRITE;
/*!40000 ALTER TABLE `contain` DISABLE KEYS */;
/*!40000 ALTER TABLE `contain` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `customstats`
--

DROP TABLE IF EXISTS `customstats`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `customstats` (
  `Id_customStats` int(11) NOT NULL AUTO_INCREMENT,
  `statName` varchar(50) DEFAULT NULL,
  `statValue` varchar(50) DEFAULT NULL,
  `isDefault` datetime DEFAULT NULL,
  `Id_eventGames` int(11) NOT NULL,
  PRIMARY KEY (`Id_customStats`),
  KEY `Id_eventGames` (`Id_eventGames`),
  CONSTRAINT `customstats_ibfk_1` FOREIGN KEY (`Id_eventGames`) REFERENCES `eventgames` (`Id_eventGames`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `customstats`
--

LOCK TABLES `customstats` WRITE;
/*!40000 ALTER TABLE `customstats` DISABLE KEYS */;
/*!40000 ALTER TABLE `customstats` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `departements`
--

DROP TABLE IF EXISTS `departements`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `departements` (
  `Id_departements` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(50) DEFAULT NULL,
  `code` varchar(50) DEFAULT NULL,
  `Id_regions` int(11) NOT NULL,
  PRIMARY KEY (`Id_departements`),
  KEY `Id_regions` (`Id_regions`),
  CONSTRAINT `departements_ibfk_1` FOREIGN KEY (`Id_regions`) REFERENCES `regions` (`Id_regions`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `departements`
--

LOCK TABLES `departements` WRITE;
/*!40000 ALTER TABLE `departements` DISABLE KEYS */;
INSERT INTO `departements` VALUES
(1,'Gironde','33',1);
/*!40000 ALTER TABLE `departements` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `eventgames`
--

DROP TABLE IF EXISTS `eventgames`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `eventgames` (
  `Id_eventGames` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`Id_eventGames`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `eventgames`
--

LOCK TABLES `eventgames` WRITE;
/*!40000 ALTER TABLE `eventgames` DISABLE KEYS */;
/*!40000 ALTER TABLE `eventgames` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `events`
--

DROP TABLE IF EXISTS `events`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `events` (
  `Id_event` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(50) DEFAULT NULL,
  `eventDate` datetime DEFAULT NULL,
  `description` varchar(50) DEFAULT NULL,
  `maxTeam` int(11) DEFAULT NULL,
  `leaderboardType` enum('actif','inactif','en attente') DEFAULT NULL,
  `Id_eventGames` int(11) NOT NULL,
  PRIMARY KEY (`Id_event`),
  KEY `Id_eventGames` (`Id_eventGames`),
  CONSTRAINT `events_ibfk_1` FOREIGN KEY (`Id_eventGames`) REFERENCES `eventgames` (`Id_eventGames`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `events`
--

LOCK TABLES `events` WRITE;
/*!40000 ALTER TABLE `events` DISABLE KEYS */;
/*!40000 ALTER TABLE `events` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `eventstats`
--

DROP TABLE IF EXISTS `eventstats`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `eventstats` (
  `Id_event` int(11) NOT NULL,
  `Id_customStats` int(11) NOT NULL,
  PRIMARY KEY (`Id_event`,`Id_customStats`),
  KEY `Id_customStats` (`Id_customStats`),
  CONSTRAINT `eventstats_ibfk_1` FOREIGN KEY (`Id_event`) REFERENCES `events` (`Id_event`),
  CONSTRAINT `eventstats_ibfk_2` FOREIGN KEY (`Id_customStats`) REFERENCES `customstats` (`Id_customStats`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `eventstats`
--

LOCK TABLES `eventstats` WRITE;
/*!40000 ALTER TABLE `eventstats` DISABLE KEYS */;
/*!40000 ALTER TABLE `eventstats` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ispart`
--

DROP TABLE IF EXISTS `ispart`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `ispart` (
  `id_user` int(11) NOT NULL,
  `Id_teams` int(11) NOT NULL,
  PRIMARY KEY (`id_user`,`Id_teams`),
  KEY `Id_teams` (`Id_teams`),
  CONSTRAINT `ispart_ibfk_1` FOREIGN KEY (`id_user`) REFERENCES `users` (`id_user`),
  CONSTRAINT `ispart_ibfk_2` FOREIGN KEY (`Id_teams`) REFERENCES `teams` (`Id_teams`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ispart`
--

LOCK TABLES `ispart` WRITE;
/*!40000 ALTER TABLE `ispart` DISABLE KEYS */;
/*!40000 ALTER TABLE `ispart` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `matchs`
--

DROP TABLE IF EXISTS `matchs`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `matchs` (
  `Id_matchs` int(11) NOT NULL AUTO_INCREMENT,
  `round` varchar(50) DEFAULT NULL,
  `dateMatch` datetime DEFAULT NULL,
  `score` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`Id_matchs`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `matchs`
--

LOCK TABLES `matchs` WRITE;
/*!40000 ALTER TABLE `matchs` DISABLE KEYS */;
/*!40000 ALTER TABLE `matchs` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `participate`
--

DROP TABLE IF EXISTS `participate`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `participate` (
  `id_user` int(11) NOT NULL,
  `Id_event` int(11) NOT NULL,
  `Id_teams` int(11) NOT NULL,
  `role` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`id_user`,`Id_event`,`Id_teams`),
  KEY `Id_event` (`Id_event`),
  KEY `Id_teams` (`Id_teams`),
  CONSTRAINT `participate_ibfk_1` FOREIGN KEY (`id_user`) REFERENCES `users` (`id_user`),
  CONSTRAINT `participate_ibfk_2` FOREIGN KEY (`Id_event`) REFERENCES `events` (`Id_event`),
  CONSTRAINT `participate_ibfk_3` FOREIGN KEY (`Id_teams`) REFERENCES `teams` (`Id_teams`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `participate`
--

LOCK TABLES `participate` WRITE;
/*!40000 ALTER TABLE `participate` DISABLE KEYS */;
/*!40000 ALTER TABLE `participate` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `permission`
--

DROP TABLE IF EXISTS `permission`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `permission` (
  `Id_roles` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`Id_roles`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `permission`
--

LOCK TABLES `permission` WRITE;
/*!40000 ALTER TABLE `permission` DISABLE KEYS */;
/*!40000 ALTER TABLE `permission` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `playing`
--

DROP TABLE IF EXISTS `playing`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `playing` (
  `Id_teams_1` int(11) NOT NULL,
  `Id_teams_2` int(11) NOT NULL,
  `Id_teams_winningTeam` int(11) NOT NULL,
  `Id_matchs` int(11) NOT NULL,
  `dateCreate` datetime DEFAULT NULL,
  PRIMARY KEY (`Id_teams_1`,`Id_teams_2`,`Id_teams_winningTeam`,`Id_matchs`),
  KEY `Id_teams_2` (`Id_teams_2`),
  KEY `Id_teams_winningTeam` (`Id_teams_winningTeam`),
  KEY `Id_matchs` (`Id_matchs`),
  CONSTRAINT `playing_ibfk_1` FOREIGN KEY (`Id_teams_1`) REFERENCES `teams` (`Id_teams`),
  CONSTRAINT `playing_ibfk_2` FOREIGN KEY (`Id_teams_2`) REFERENCES `teams` (`Id_teams`),
  CONSTRAINT `playing_ibfk_3` FOREIGN KEY (`Id_teams_winningTeam`) REFERENCES `teams` (`Id_teams`),
  CONSTRAINT `playing_ibfk_4` FOREIGN KEY (`Id_matchs`) REFERENCES `matchs` (`Id_matchs`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `playing`
--

LOCK TABLES `playing` WRITE;
/*!40000 ALTER TABLE `playing` DISABLE KEYS */;
/*!40000 ALTER TABLE `playing` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `refereeon`
--

DROP TABLE IF EXISTS `refereeon`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `refereeon` (
  `id_user` int(11) NOT NULL,
  `Id_event` int(11) NOT NULL,
  PRIMARY KEY (`id_user`,`Id_event`),
  KEY `Id_event` (`Id_event`),
  CONSTRAINT `refereeon_ibfk_1` FOREIGN KEY (`id_user`) REFERENCES `users` (`id_user`),
  CONSTRAINT `refereeon_ibfk_2` FOREIGN KEY (`Id_event`) REFERENCES `events` (`Id_event`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `refereeon`
--

LOCK TABLES `refereeon` WRITE;
/*!40000 ALTER TABLE `refereeon` DISABLE KEYS */;
/*!40000 ALTER TABLE `refereeon` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `regions`
--

DROP TABLE IF EXISTS `regions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `regions` (
  `Id_regions` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`Id_regions`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `regions`
--

LOCK TABLES `regions` WRITE;
/*!40000 ALTER TABLE `regions` DISABLE KEYS */;
INSERT INTO `regions` VALUES
(1,'Nouvelle-Aquitaine');
/*!40000 ALTER TABLE `regions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `teams`
--

DROP TABLE IF EXISTS `teams`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `teams` (
  `Id_teams` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(50) DEFAULT NULL,
  `dateCreate` datetime DEFAULT NULL,
  PRIMARY KEY (`Id_teams`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `teams`
--

LOCK TABLES `teams` WRITE;
/*!40000 ALTER TABLE `teams` DISABLE KEYS */;
/*!40000 ALTER TABLE `teams` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `universities`
--

DROP TABLE IF EXISTS `universities`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `universities` (
  `Id_universities` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(50) DEFAULT NULL,
  `Id_cities` int(11) NOT NULL,
  PRIMARY KEY (`Id_universities`),
  KEY `Id_cities` (`Id_cities`),
  CONSTRAINT `universities_ibfk_1` FOREIGN KEY (`Id_cities`) REFERENCES `cities` (`Id_cities`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `universities`
--

LOCK TABLES `universities` WRITE;
/*!40000 ALTER TABLE `universities` DISABLE KEYS */;
INSERT INTO `universities` VALUES
(1,'Montaigne',1),
(2,'Montaigne',1);
/*!40000 ALTER TABLE `universities` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `userPermissions`
--

DROP TABLE IF EXISTS `userPermissions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `userPermissions` (
  `id_user` int(11) NOT NULL,
  `Id_roles` int(11) NOT NULL,
  PRIMARY KEY (`id_user`,`Id_roles`),
  KEY `Id_roles` (`Id_roles`),
  CONSTRAINT `userPermissions_ibfk_1` FOREIGN KEY (`id_user`) REFERENCES `users` (`id_user`),
  CONSTRAINT `userPermissions_ibfk_2` FOREIGN KEY (`Id_roles`) REFERENCES `permission` (`Id_roles`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `userPermissions`
--

LOCK TABLES `userPermissions` WRITE;
/*!40000 ALTER TABLE `userPermissions` DISABLE KEYS */;
/*!40000 ALTER TABLE `userPermissions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id_user` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(50) DEFAULT NULL,
  `firstname` varchar(50) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `photo` varchar(50) DEFAULT NULL,
  `Id_universities` int(11) NOT NULL,
  PRIMARY KEY (`id_user`),
  KEY `Id_universities` (`Id_universities`),
  CONSTRAINT `users_ibfk_1` FOREIGN KEY (`Id_universities`) REFERENCES `universities` (`Id_universities`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES
(1,'User','Lol','test@gmail.com','$2b$10$xbafoioLwh8YdcsvqUjnTeNPCVbqTj9SQX5wXx0FZgflxBFktcYr.','0753904652',1),
(2,'Admin','Test','admin@test.com','$2b$10$MTVo2T3GCphRwd691F8xx.CpegdN8/TH6X6I/gJAqbYv9xYlCHBDi',NULL,1);
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2026-01-05 15:30:01
