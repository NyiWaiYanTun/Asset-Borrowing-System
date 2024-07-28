-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jul 28, 2024 at 10:25 AM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `asset_borrowing_system`
--

-- --------------------------------------------------------

--
-- Table structure for table `assets`
--

CREATE TABLE `assets` (
  `id` int(11) NOT NULL,
  `name` varchar(30) NOT NULL,
  `type_id` int(11) NOT NULL,
  `status` enum('available','waiting for patron','borrowed','disabled') NOT NULL,
  `description` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `assets`
--

INSERT INTO `assets` (`id`, `name`, `type_id`, `status`, `description`) VALUES
(1, 'Lenovo 001', 1, 'waiting for patron', 'Brand: Dell|\nModel: XPS 15|\nOS: Windows 10|\nStorage: 512GB SSD|\nRAM: 16GB|\nScreen Size: 15.6 inches|'),
(2, 'Arduino Uni01', 4, 'waiting for patron', 'Item: Arduino Uno R3|\nMicrocontroller: ATmega328P|\nDigital Pins: 14|\nAnalog Pins: 6|'),
(3, 'Lenovo ThinkPad', 1, 'available', 'Brand: Dell|\nModel: XPS 15|\nOS: Windows 10|\nStorage: 512GB SSD|\nRAM: 16GB|\nScreen Size: 15.6 inches|'),
(4, 'iPad Air', 2, 'available', 'Brand: Apple|\nModel: iPad Pro|\nScreen Size: 12.9 inches|\nStorage: 256GB|'),
(5, 'iPad Pro', 2, 'waiting for patron', 'Brand: Apple|\nModel: iPad Pro|\nScreen Size: 12.9 inches|\nStorage: 256GB|'),
(6, 'Samsung Galaxy', 2, 'available', 'Brand: Apple|\nModel: iPad Pro|\nScreen Size: 12.9 inches|\nStorage: 256GB|'),
(7, 'Introduction to Algorithms', 3, 'borrowed', 'Title: Introduction to Algorithms|\nAuthor: Cormen, Leiserson, Rivest, Stein|\nPages: 1312|\nLanguage: English|'),
(8, 'Clean Code', 3, 'available', 'Title: Introduction to Algorithms|\nAuthor: Cormen, Leiserson, Rivest, Stein|\nPages: 1312|\nLanguage: English|'),
(9, 'Harry Potter and the philosoph', 3, 'waiting for patron', 'Title: Introduction to Algorithms|\nAuthor: Cormen, Leiserson, Rivest, Stein|\nPages: 1312|\nLanguage: English|'),
(10, 'Arduino Uno', 4, 'available', 'Item: Arduino Uno R3|\nMicrocontroller: ATmega328P|\nDigital Pins: 14|\nAnalog Pins: 6|'),
(11, 'Mac Mini', 4, 'available', 'Item: Arduino Uno R3|\nMicrocontroller: ATmega328P|\nDigital Pins: 14|\nAnalog Pins: 6|'),
(12, 'Google Pixel', 4, 'available', 'Item: Arduino Uno R3|\nMicrocontroller: ATmega328P|\nDigital Pins: 14|\nAnalog Pins: 6|'),
(13, 'Raspberry Pi', 4, 'available', 'Item: Arduino Uno R3|\nMicrocontroller: ATmega328P|\nDigital Pins: 14|\nAnalog Pins: 6|'),
(14, 'Introduction to javascript', 3, 'available', 'Title: Introduction to Algorithms|\nAuthor: Cormen, Leiserson, Rivest, Stein|\nPages: 1312|\nLanguage: English|'),
(15, 'Asus01', 1, 'available', 'Brand: Dell|\nModel: XPS 15|\nOS: Windows 10|\nStorage: 512GB SSD|\nRAM: 16GB|\nScreen Size: 15.6 inches|'),
(16, 'new item', 1, 'available', 'Brand: Dell|\nModel: XPS 15|\nOS: Windows 10|\nStorage: 512GB SSD|\nRAM: 16GB|\nScreen Size: 15.6 inches|\n                            '),
(17, 'new item', 1, 'available', 'hello\n                            '),
(18, 'KFC MC', 2, 'available', 'Kai Tod Kub');

-- --------------------------------------------------------

--
-- Table structure for table `asset_transaction`
--

CREATE TABLE `asset_transaction` (
  `id` int(11) NOT NULL,
  `asset_id` int(11) NOT NULL,
  `borrower_id` int(11) NOT NULL,
  `validator_id` int(11) DEFAULT NULL,
  `validated_date` date DEFAULT NULL,
  `issued_by_id` int(11) DEFAULT NULL,
  `borrow_date` date DEFAULT NULL,
  `expected_return_date` date DEFAULT NULL,
  `receiver_id` int(11) DEFAULT NULL,
  `returned_date` date DEFAULT NULL,
  `status` enum('pending','approved','disapproved','holding','timeout','returned','overdue','cancelled') NOT NULL DEFAULT 'pending',
  `remark` text DEFAULT NULL,
  `booked_date` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `asset_transaction`
--

INSERT INTO `asset_transaction` (`id`, `asset_id`, `borrower_id`, `validator_id`, `validated_date`, `issued_by_id`, `borrow_date`, `expected_return_date`, `receiver_id`, `returned_date`, `status`, `remark`, `booked_date`) VALUES
(16, 1, 53, 54, '2024-04-19', 55, '2024-04-19', '2024-04-26', 55, '2024-04-19', 'returned', ' I want it. I get it.\n                    ', '2024-04-19'),
(17, 2, 57, 54, '2024-04-19', 55, '2024-04-19', '2024-04-26', 55, '2024-04-20', 'returned', 'For iot class', '2024-04-19'),
(18, 4, 56, 58, '2024-04-19', NULL, NULL, NULL, NULL, NULL, 'timeout', 'to take notes\n                    ', '2024-04-19'),
(19, 4, 61, 54, '2024-04-19', 55, '2024-04-20', '2024-04-27', 55, '2024-04-22', 'returned', ' Luna needs this                       ', '2024-04-19'),
(20, 3, 60, 58, '2024-04-19', 55, '2024-04-20', '2024-04-27', 55, '2024-04-28', 'cancelled', '                        \n                    ', '2024-04-19'),
(21, 11, 53, 58, '2024-04-20', NULL, NULL, NULL, NULL, NULL, 'cancelled', '   \n                    ', '2024-04-20'),
(22, 16, 53, 54, '2024-04-22', NULL, NULL, NULL, NULL, NULL, 'cancelled', '                        \n                    ', '2024-04-21'),
(23, 5, 56, 54, '2024-04-20', NULL, NULL, NULL, NULL, NULL, 'timeout', '                        \n                    ', '2024-04-21'),
(24, 7, 57, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'cancelled', '                        \n                    ', '2024-04-21'),
(25, 1, 57, 58, '2024-04-22', NULL, NULL, NULL, NULL, NULL, 'timeout', '                        \n                    ', '2024-04-21'),
(26, 7, 60, NULL, NULL, 55, '2024-04-29', '2024-05-06', NULL, NULL, 'holding', '                        \n                    ', '2024-04-21'),
(27, 7, 60, NULL, NULL, 55, '2024-04-28', '2024-05-05', 55, '2024-04-29', 'returned', '                        \n                    ', '2024-04-21'),
(28, 7, 60, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'cancelled', '                        \n                    ', '2024-04-21'),
(29, 7, 60, 58, '2024-04-22', NULL, NULL, NULL, NULL, NULL, 'disapproved', '                        \n                    ', '2024-04-21'),
(30, 2, 53, 63, '2024-04-01', 55, '2024-04-02', '2024-04-09', 55, '2024-04-08', 'returned', NULL, '2024-04-01'),
(31, 9, 61, 54, '2024-04-29', NULL, NULL, NULL, NULL, NULL, 'approved', 'Love this book\n                    ', '2024-04-22'),
(32, 6, 53, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'cancelled', '                        \n                    ', '2024-04-22'),
(33, 2, 53, 54, '2024-04-22', 55, '2024-04-28', '2024-05-05', NULL, NULL, 'holding', '                        \n                    ', '2024-04-22'),
(34, 10, 65, 54, '2024-04-23', 55, '2024-04-23', '2024-04-30', 55, '2024-04-28', 'returned', ' I want this..\n                    ', '2024-04-23'),
(35, 3, 53, 54, '2024-04-29', NULL, NULL, NULL, NULL, NULL, 'cancelled', '                        \n                    ', '2024-04-28'),
(36, 3, 53, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'cancelled', '                        \n                    ', '2024-04-29'),
(37, 3, 77, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'cancelled', '                        Borrow na kub\n                    ', '2024-04-29'),
(38, 3, 77, 54, '2024-04-29', NULL, NULL, NULL, NULL, NULL, 'cancelled', 'Borrow Mai kub', '2024-04-29'),
(39, 3, 53, 54, '2024-04-29', 55, '2024-04-29', '2024-05-06', 55, '2024-04-29', 'returned', '                        \n                    ', '2024-04-29'),
(40, 3, 53, 54, '2024-07-28', NULL, NULL, NULL, NULL, NULL, 'disapproved', '                        \n                    ', '2024-07-28'),
(41, 3, 56, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'pending', 'Wanna borrow smth that Harry didn\'t get                      \n                    ', '2024-07-28'),
(42, 10, 77, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'pending', ' Need to practice for Lab test                       \n                    ', '2024-07-28');

-- --------------------------------------------------------

--
-- Table structure for table `asset_type`
--

CREATE TABLE `asset_type` (
  `id` int(11) NOT NULL,
  `name` varchar(30) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `asset_type`
--

INSERT INTO `asset_type` (`id`, `name`) VALUES
(1, 'Laptops'),
(2, 'iPads'),
(3, 'Books'),
(4, 'Electronics');

-- --------------------------------------------------------

--
-- Table structure for table `news`
--

CREATE TABLE `news` (
  `id` int(11) NOT NULL,
  `title` varchar(20) DEFAULT NULL,
  `desp` varchar(255) DEFAULT NULL,
  `img` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `news`
--

INSERT INTO `news` (`id`, `title`, `desp`, `img`) VALUES
(2, 'New Asset Added to I', 'We are excited to announce the addition of the latest Lenovo Thinkbook to our inventory! This powerful laptop is now available for borrowing. Reserve yours today!', '/public/img/anouncement.jpg'),
(3, 'Extended Borrowing H', 'Good news for our users! We have extended our borrowing hours to better accommodate your needs. You can now borrow assets from our facility between 8:00 AM to 5:00 PM every weekday.', '/public/img/inc/image-1714303640757.png'),
(4, 'Asset Return Reminde', 'Friendly reminder to all borrowers: please ensure that you return borrowed assets on time to avoid fines and penalties. Your cooperation helps us maintain a smooth borrowing process for everyone.', '/public/img/anouncement.jpg'),
(5, 'New Borrowing Policy', 'In response to user feedback, we have updated our borrowing policy to allow longer borrowing periods for certain assets. Check out our website for more details on the revised policy.', '/public/img/anouncement.jpg'),
(9, 'Mac book', 'You can now borrow a new mac', '/public/img/anouncement.jpg');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `name` varchar(30) DEFAULT NULL,
  `email` varchar(30) NOT NULL,
  `psw` varchar(225) NOT NULL,
  `profile_pic` varchar(255) DEFAULT NULL,
  `type_id` int(11) NOT NULL,
  `isVerified` tinyint(1) DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `name`, `email`, `psw`, `profile_pic`, `type_id`, `isVerified`) VALUES
(53, 'Harry Potter', 'harry@gmail.com', '$2b$10$suSpeJOQbiH6mq6XmSHwcO4vG1mrNe/bYRyo3z/iDJ/Zgbf9UF32m', '/public/img/inc/image-1713372618111.jpg', 1, 1),
(54, 'Severus', 'snape@gmail.com', '$2b$10$eG3qdpwDuYxHfnoNjw7o0ed54gM2MbQHvFzNmGozCHioM.kyEMsym', '/public/img/inc/image-1713210709184.jpg', 2, 1),
(55, 'Rubeus Hagriddd', 'hagrid@gmail.com', '$2b$10$yl8UTaYCneOMbTNAqbOPn.TeFGpqz6xN31snsuDNfKSflyNop/c06', '/public/img/inc/image-1713210737764.jpg', 3, 1),
(56, 'Ron Weasley', 'ron@gmail.com', '$2b$10$/TmK6xASCgeFNf2r7E6E5eKwZ7zT95Y.WGdjHR.lWunkqTx2Pv8qy', '/public/img/inc/image-1713335979863.webp', 1, 1),
(57, 'Hermione Granger', 'hermione@gmail.com', '$2b$10$jc3AkovIBLQ5MtgWXjWk9.fOTmNzlZ3MPbVCRO65znbzjNvQGA7L.', '/public/img/inc/image-1713336067012.webp', 1, 1),
(58, 'Minerva McGonagall', 'mcg@gmail.com', '$2b$10$zcJ2z3Lu0WdTDsOgWTT3j.FAKbGY7PaXobAtres4GcTIjq.Sy95LC', '/public/img/inc/image-1713336282097.jpg', 2, 1),
(59, 'Poppy Pomfrey', 'pomfrey@gmail.com', '$2b$10$b97PJ3koYDQAlafZh0qyo.3vpmmnu5S.ytOLA9kRyCxipCslQIaJ6', '/public/img/inc/image-1713336472292.jpg', 3, 1),
(60, 'Draco Malfoy', 'draco@gmail.com', '$2b$10$sszy75Nq5HFGKh3ZV8N6TO5H1CPqmqr2NwN.ne2TRKH8.Y5n0orna', '/public/img/inc/image-1713427745835.jpg', 1, 1),
(61, 'Luna Lovegood', 'luna@gmail.com', '$2b$10$LncfIKofU1OvI0TmbsI8L.nLssqJHYlZ7TCdUWhuCdxhMhBuCc7tq', '/public/img/inc/image-1713432904825.webp', 1, 1),
(62, 'Nevil Longbottom', 'nevil@gmail.com', '$2b$10$AevUCwfpkBD1A6taSqYN2eNpGiDan4AXI072ujdFBsPT1Zk8aPL4q', '/public/img/inc/image-1713539142527.webp', 1, 1),
(63, 'Albus Dumbledore', 'dumbledore@gmail.com', '$2b$10$jH23HJsvGJL8cvFYNernUORFauXwCak5TYDi0.hUitiynoI4TRzgi', '/public/img/inc/image-1713540662348.jpg', 2, 1),
(65, 'Khatter San', 'khatter.kts2001@gmail.com', '$2b$10$Clk2qF5JXyHtemfj72mxMuyUBhd1NSFAhOB8RpR9PKalRLaGbENbK', '/public/img/no-photo.jpg', 1, 1),
(77, 'Joeyy', 'nwai39771@gmail.com', '$2b$10$49AFHWtyVnaP/Zh7bLg8CuUnrqaQe.2TabzBge.SJC9kJ/4.cIKEq', '/public/img/no-photo.jpg', 1, 1),
(78, 'nyiwaiyantun', 'nwai39772@gmail.com', '$2b$10$p7Bc35AYUSrBKW3BXjNAVekuKidt0M.ikPs4upg7DaGYt3oENWagK', '/public/img/no-photo.jpg', 1, 0);

-- --------------------------------------------------------

--
-- Table structure for table `user_type`
--

CREATE TABLE `user_type` (
  `id` int(11) NOT NULL,
  `name` varchar(30) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `user_type`
--

INSERT INTO `user_type` (`id`, `name`) VALUES
(1, 'Student'),
(2, 'Lecturer'),
(3, 'Staff');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `assets`
--
ALTER TABLE `assets`
  ADD PRIMARY KEY (`id`),
  ADD KEY `type_id` (`type_id`);

--
-- Indexes for table `asset_transaction`
--
ALTER TABLE `asset_transaction`
  ADD PRIMARY KEY (`id`),
  ADD KEY `asset_id` (`asset_id`),
  ADD KEY `borrower_id` (`borrower_id`),
  ADD KEY `validator_id` (`validator_id`),
  ADD KEY `issued_by_id` (`issued_by_id`),
  ADD KEY `receiver_id` (`receiver_id`);

--
-- Indexes for table `asset_type`
--
ALTER TABLE `asset_type`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `news`
--
ALTER TABLE `news`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `unique_email` (`email`),
  ADD KEY `type_id` (`type_id`);

--
-- Indexes for table `user_type`
--
ALTER TABLE `user_type`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `assets`
--
ALTER TABLE `assets`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;

--
-- AUTO_INCREMENT for table `asset_transaction`
--
ALTER TABLE `asset_transaction`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=43;

--
-- AUTO_INCREMENT for table `asset_type`
--
ALTER TABLE `asset_type`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `news`
--
ALTER TABLE `news`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=79;

--
-- AUTO_INCREMENT for table `user_type`
--
ALTER TABLE `user_type`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `assets`
--
ALTER TABLE `assets`
  ADD CONSTRAINT `assets_ibfk_1` FOREIGN KEY (`type_id`) REFERENCES `asset_type` (`id`);

--
-- Constraints for table `asset_transaction`
--
ALTER TABLE `asset_transaction`
  ADD CONSTRAINT `asset_transaction_ibfk_1` FOREIGN KEY (`asset_id`) REFERENCES `assets` (`id`),
  ADD CONSTRAINT `asset_transaction_ibfk_2` FOREIGN KEY (`borrower_id`) REFERENCES `users` (`id`),
  ADD CONSTRAINT `asset_transaction_ibfk_3` FOREIGN KEY (`validator_id`) REFERENCES `users` (`id`),
  ADD CONSTRAINT `asset_transaction_ibfk_4` FOREIGN KEY (`issued_by_id`) REFERENCES `users` (`id`),
  ADD CONSTRAINT `asset_transaction_ibfk_5` FOREIGN KEY (`receiver_id`) REFERENCES `users` (`id`);

--
-- Constraints for table `users`
--
ALTER TABLE `users`
  ADD CONSTRAINT `users_ibfk_1` FOREIGN KEY (`type_id`) REFERENCES `user_type` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
