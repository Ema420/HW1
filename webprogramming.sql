-- phpMyAdmin SQL Dump
-- version 5.0.3
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Creato il: Mag 21, 2021 alle 10:11
-- Versione del server: 10.4.14-MariaDB
-- Versione PHP: 7.4.11

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `webprogramming`
--

-- --------------------------------------------------------

--
-- Struttura della tabella `carrello`
--

CREATE TABLE `carrello` (
  `id` int(11) NOT NULL,
  `id_utente` int(11) DEFAULT NULL,
  `id_evento` varchar(55) DEFAULT NULL,
  `data_creazione` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Struttura della tabella `evento`
--

CREATE TABLE `evento` (
  `id` varchar(55) NOT NULL,
  `name` varchar(55) DEFAULT NULL,
  `data` date DEFAULT NULL,
  `prezzo` int(11) DEFAULT NULL,
  `citta` varchar(55) DEFAULT NULL,
  `image` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dump dei dati per la tabella `evento`
--

INSERT INTO `evento` (`id`, `name`, `data`, `prezzo`, `citta`, `image`) VALUES
('1', 'Milan-Bologna', '2021-02-17', 20, 'Milano', 'img1.jpeg'),
('10', 'MF DOOM live', '2021-10-20', 25, 'Bologna', 'mfdoom.jpg'),
('2', 'MacBeth', '2021-05-03', 13, 'Roma', 'img2.jpg'),
('3', 'Contest BreakDance', '2021-06-27', 15, 'Torino', 'img3.jpg'),
('4', 'Salmo live', '2021-02-13', 25, 'Bologna', 'salmo.png'),
('5', 'Torneo Beach Volley', '2021-07-17', 0, 'Rimini', 'img4.jpg'),
('6', 'Concerto Natale', '2020-12-24', 12, 'Bologna', 'concertonatale.jpg'),
('7', 'Comedian Alfred', '2021-06-05', 8, 'Catania', 'comedy.jpg'),
('8', 'Skate Contest', '2021-02-24', 3, 'Ragusa', 'img5.jpg'),
('9', 'Divina Commedia', '2021-09-25', 12, 'Palermo', 'divinacommedia.jpg');

-- --------------------------------------------------------

--
-- Struttura della tabella `pren_corrente`
--

CREATE TABLE `pren_corrente` (
  `id_utente` int(11) DEFAULT NULL,
  `id_evento` varchar(55) DEFAULT NULL,
  `data` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Struttura della tabella `pren_passata`
--

CREATE TABLE `pren_passata` (
  `id_utente` int(11) DEFAULT NULL,
  `id_evento` varchar(55) DEFAULT NULL,
  `data` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Struttura della tabella `utente`
--

CREATE TABLE `utente` (
  `id` int(11) NOT NULL,
  `name` varchar(20) DEFAULT NULL,
  `data` date DEFAULT NULL,
  `username` varchar(55) NOT NULL,
  `password` varchar(255) NOT NULL,
  `surname` varchar(55) NOT NULL,
  `email` varchar(55) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Indici per le tabelle scaricate
--

--
-- Indici per le tabelle `carrello`
--
ALTER TABLE `carrello`
  ADD KEY `new_utente` (`id_utente`),
  ADD KEY `new_id` (`id`) USING BTREE;

--
-- Indici per le tabelle `evento`
--
ALTER TABLE `evento`
  ADD PRIMARY KEY (`id`);

--
-- Indici per le tabelle `pren_corrente`
--
ALTER TABLE `pren_corrente`
  ADD KEY `new_utente` (`id_utente`),
  ADD KEY `new_evento` (`id_evento`);

--
-- Indici per le tabelle `pren_passata`
--
ALTER TABLE `pren_passata`
  ADD KEY `new_utente` (`id_utente`),
  ADD KEY `new_evento` (`id_evento`);

--
-- Indici per le tabelle `utente`
--
ALTER TABLE `utente`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT per le tabelle scaricate
--

--
-- AUTO_INCREMENT per la tabella `carrello`
--
ALTER TABLE `carrello`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=104;

--
-- AUTO_INCREMENT per la tabella `utente`
--
ALTER TABLE `utente`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- Limiti per le tabelle scaricate
--

--
-- Limiti per la tabella `carrello`
--
ALTER TABLE `carrello`
  ADD CONSTRAINT `carrello_ibfk_1` FOREIGN KEY (`id_utente`) REFERENCES `utente` (`id`) ON UPDATE CASCADE;

--
-- Limiti per la tabella `pren_corrente`
--
ALTER TABLE `pren_corrente`
  ADD CONSTRAINT `pren_corrente_ibfk_1` FOREIGN KEY (`id_utente`) REFERENCES `utente` (`id`) ON UPDATE CASCADE,
  ADD CONSTRAINT `pren_corrente_ibfk_2` FOREIGN KEY (`id_evento`) REFERENCES `evento` (`id`) ON UPDATE CASCADE;

--
-- Limiti per la tabella `pren_passata`
--
ALTER TABLE `pren_passata`
  ADD CONSTRAINT `pren_passata_ibfk_1` FOREIGN KEY (`id_utente`) REFERENCES `utente` (`id`) ON UPDATE CASCADE,
  ADD CONSTRAINT `pren_passata_ibfk_2` FOREIGN KEY (`id_evento`) REFERENCES `evento` (`id`) ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
