-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Sep 27, 2024 at 09:23 PM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.0.30

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `mojabaza`
--

-- --------------------------------------------------------

--
-- Table structure for table `ispit`
--

CREATE TABLE `ispit` (
  `id` int(11) NOT NULL,
  `predmet_id` int(11) NOT NULL,
  `datum_vrijeme` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `nastavno_osoblje`
--

CREATE TABLE `nastavno_osoblje` (
  `id` int(11) NOT NULL,
  `jmbg` varchar(13) NOT NULL,
  `lozinka` varchar(64) NOT NULL,
  `ime` varchar(32) NOT NULL,
  `prezime` varchar(32) NOT NULL,
  `telefon` varchar(24) NOT NULL,
  `mail` varchar(64) NOT NULL,
  `zvanje` varchar(32) NOT NULL,
  `uloga` varchar(24) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `obavjestenja`
--

CREATE TABLE `obavjestenja` (
  `id` int(11) NOT NULL,
  `naslov` varchar(256) NOT NULL,
  `obavjestenje` longtext NOT NULL,
  `datum` varchar(30) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `obavjestenja`
--

INSERT INTO `obavjestenja` (`id`, `naslov`, `obavjestenje`, `datum`) VALUES
(11, 'Test naslov obavjestenje', '<p>asd<span class=\"text-big\">asdsd</span></p>', '03.07.2024.');

-- --------------------------------------------------------

--
-- Table structure for table `polozeni_ispiti`
--

CREATE TABLE `polozeni_ispiti` (
  `id` int(11) NOT NULL,
  `student_id` int(11) NOT NULL,
  `ispit_id` int(11) NOT NULL,
  `predmet_id` int(11) NOT NULL,
  `ocjena` int(11) NOT NULL DEFAULT 5
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `predmet`
--

CREATE TABLE `predmet` (
  `id` int(11) NOT NULL,
  `naziv` varchar(128) NOT NULL,
  `semestar` varchar(32) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `predmet`
--

INSERT INTO `predmet` (`id`, `naziv`, `semestar`) VALUES
(1, 'Diskretna matematika', '3'),
(2, 'Uvod u tehnike programiranja', '1'),
(3, 'Racunarske mreze', '2'),
(4, 'Napredne tehnike programiranja', '3'),
(5, 'Uvod u IT', '1'),
(6, 'Matematika', '2');

-- --------------------------------------------------------

--
-- Table structure for table `student`
--

CREATE TABLE `student` (
  `student_id` int(11) NOT NULL,
  `jmbg` varchar(13) NOT NULL,
  `lozinka` varchar(255) DEFAULT NULL,
  `ime` varchar(30) NOT NULL,
  `prezime` varchar(30) NOT NULL,
  `datum_rodjenja` date NOT NULL,
  `mjesto_rodjenja` varchar(30) NOT NULL,
  `spol` char(1) NOT NULL,
  `drzavljanstvo` varchar(30) NOT NULL,
  `adresa_boravista` varchar(100) NOT NULL,
  `telefon` varchar(25) DEFAULT NULL,
  `mail` varchar(30) DEFAULT NULL,
  `broj_indeksa` int(11) NOT NULL,
  `semestar` varchar(24) NOT NULL,
  `akademska_godina_upisa` varchar(9) NOT NULL,
  `uloga` enum('prediplomac','magistrant','doktorant') NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `ispit`
--
ALTER TABLE `ispit`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `nastavno_osoblje`
--
ALTER TABLE `nastavno_osoblje`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `obavjestenja`
--
ALTER TABLE `obavjestenja`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `polozeni_ispiti`
--
ALTER TABLE `polozeni_ispiti`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `predmet`
--
ALTER TABLE `predmet`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `student`
--
ALTER TABLE `student`
  ADD PRIMARY KEY (`student_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `ispit`
--
ALTER TABLE `ispit`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT for table `nastavno_osoblje`
--
ALTER TABLE `nastavno_osoblje`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `obavjestenja`
--
ALTER TABLE `obavjestenja`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT for table `polozeni_ispiti`
--
ALTER TABLE `polozeni_ispiti`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `predmet`
--
ALTER TABLE `predmet`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `student`
--
ALTER TABLE `student`
  MODIFY `student_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
