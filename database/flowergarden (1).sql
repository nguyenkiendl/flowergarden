-- phpMyAdmin SQL Dump
-- version 4.8.5
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: Oct 25, 2023 at 09:15 AM
-- Server version: 5.7.33
-- PHP Version: 7.4.19

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `flowergarden`
--

-- --------------------------------------------------------

--
-- Table structure for table `customers`
--

CREATE TABLE `customers` (
  `customer_id` bigint(20) UNSIGNED NOT NULL,
  `customer_code` varchar(20) CHARACTER SET utf8 NOT NULL DEFAULT '',
  `customer_type` varchar(20) CHARACTER SET utf8 NOT NULL DEFAULT '',
  `ticket_id` int(11) UNSIGNED NOT NULL DEFAULT '0',
  `customer_number` int(6) UNSIGNED NOT NULL DEFAULT '1',
  `created_at` datetime NOT NULL,
  `customer_status` varchar(20) COLLATE utf8_unicode_ci NOT NULL DEFAULT 'new'
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `customers`
--

INSERT INTO `customers` (`customer_id`, `customer_code`, `customer_type`, `ticket_id`, `customer_number`, `created_at`, `customer_status`) VALUES
(276, '0000000001', 'flower', 1, 1, '2023-10-25 15:26:58', 'new'),
(277, '0000000277', 'hotel', 2, 1, '2023-10-25 16:04:34', 'new');

-- --------------------------------------------------------

--
-- Table structure for table `discounts`
--

CREATE TABLE `discounts` (
  `discount_id` bigint(20) UNSIGNED NOT NULL,
  `customer_id` bigint(20) UNSIGNED NOT NULL DEFAULT '0',
  `product_id` bigint(20) UNSIGNED NOT NULL DEFAULT '0',
  `quantity` int(6) UNSIGNED NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `orders`
--

CREATE TABLE `orders` (
  `order_id` bigint(20) UNSIGNED NOT NULL,
  `ticket_id` bigint(20) UNSIGNED NOT NULL DEFAULT '0',
  `customer_id` bigint(20) UNSIGNED NOT NULL DEFAULT '0',
  `status` varchar(20) COLLATE utf8_unicode_ci NOT NULL DEFAULT 'new',
  `created_at` datetime NOT NULL,
  `updated_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `orders`
--

INSERT INTO `orders` (`order_id`, `ticket_id`, `customer_id`, `status`, `created_at`, `updated_at`) VALUES
(330, 1, 276, 'processing', '2023-10-25 15:26:58', '2023-10-25 15:34:22'),
(331, 2, 277, 'new', '2023-10-25 16:04:34', NULL),
(332, 2, 276, 'new', '2023-10-25 16:09:12', NULL),
(333, 2, 276, 'new', '2023-10-25 16:11:31', NULL),
(334, 2, 276, 'new', '2023-10-25 16:11:53', NULL),
(335, 2, 276, 'new', '2023-10-25 16:13:16', NULL),
(336, 2, 277, 'new', '2023-10-25 16:13:44', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `order_detail`
--

CREATE TABLE `order_detail` (
  `detail_id` bigint(20) UNSIGNED NOT NULL,
  `order_id` bigint(20) UNSIGNED NOT NULL DEFAULT '0',
  `product_id` bigint(20) UNSIGNED NOT NULL DEFAULT '0',
  `customer_id` bigint(20) UNSIGNED NOT NULL DEFAULT '0',
  `quantity` int(6) UNSIGNED NOT NULL DEFAULT '1',
  `status` varchar(20) NOT NULL DEFAULT 'new',
  `created_at` datetime NOT NULL,
  `updated_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `order_detail`
--

INSERT INTO `order_detail` (`detail_id`, `order_id`, `product_id`, `customer_id`, `quantity`, `status`, `created_at`, `updated_at`) VALUES
(7, 330, 1, 0, 1, 'done', '2023-10-25 15:27:59', '2023-10-25 16:00:30'),
(8, 330, 6, 0, 1, 'done', '2023-10-25 15:27:59', '2023-10-25 16:01:31'),
(9, 330, 3, 0, 1, 'done', '2023-10-25 15:27:59', '2023-10-25 16:03:38'),
(10, 330, 2, 0, 1, 'done', '2023-10-25 15:27:59', '2023-10-25 16:03:41'),
(11, 330, 5, 0, 1, 'done', '2023-10-25 15:27:59', '2023-10-25 16:03:43'),
(12, 331, 1, 0, 1, 'processing', '2023-10-25 16:05:05', '2023-10-25 16:05:11'),
(13, 331, 6, 0, 1, 'processing', '2023-10-25 16:05:05', '2023-10-25 16:05:11'),
(14, 331, 3, 0, 1, 'processing', '2023-10-25 16:05:05', '2023-10-25 16:05:11'),
(15, 331, 2, 0, 1, 'processing', '2023-10-25 16:05:05', '2023-10-25 16:05:11'),
(16, 331, 5, 0, 1, 'processing', '2023-10-25 16:05:05', '2023-10-25 16:05:11');

-- --------------------------------------------------------

--
-- Table structure for table `products`
--

CREATE TABLE `products` (
  `product_id` bigint(20) UNSIGNED NOT NULL,
  `product_name` varchar(255) CHARACTER SET utf8 NOT NULL DEFAULT '',
  `product_price` double UNSIGNED NOT NULL DEFAULT '0',
  `product_parent` bigint(20) UNSIGNED NOT NULL DEFAULT '0',
  `product_type` varchar(20) CHARACTER SET utf8 NOT NULL DEFAULT '',
  `product_unit` varchar(20) COLLATE utf8_unicode_ci NOT NULL DEFAULT '',
  `product_store` int(11) UNSIGNED NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `products`
--

INSERT INTO `products` (`product_id`, `product_name`, `product_price`, `product_parent`, `product_type`, `product_unit`, `product_store`) VALUES
(1, 'Nước chanh', 20000, 0, 'tea', 'Ly', 98),
(2, 'Trà lipton', 20000, 0, 'tea', 'Ly', 98),
(3, 'Trà gừng', 20000, 0, 'tea', 'Ly', 98),
(4, 'Trà trái cây', 25000, 0, 'tea', 'Ly', 100),
(5, 'Trà sen vàng', 25000, 0, 'tea', 'Ly', 98),
(6, 'Trà cam sả', 25000, 0, 'tea', 'Ly', 98),
(7, 'Trà tắc xí muội', 25000, 0, 'tea', 'Ly', 100),
(8, 'Trà tắc mật ong', 25000, 0, 'tea', 'Ly', 100),
(9, 'Cà phê đen đá/nóng', 20000, 0, 'coffee', 'Ly', 100),
(10, 'Cà phê sữa đá/nóng', 25000, 0, 'coffee', 'Ly', 100),
(11, 'Cà phê muối', 25000, 0, 'coffee', 'Ly', 100),
(12, 'Bạc xỉu đá/nóng', 25000, 0, 'coffee', 'Ly', 100),
(13, 'Cacao đá/nóng', 25000, 0, 'coffee', 'Ly', 100),
(14, 'Tiger nâu', 20000, 0, 'beer', 'Lon', 100),
(15, 'Tiger bạc', 25000, 0, 'beer', 'Lon', 100),
(16, 'Heniken', 25000, 0, 'beer', 'Lon', 100),
(17, 'Strongbow', 25000, 0, 'beer', 'Lon', 100),
(18, 'Soju', 85000, 0, 'beer', 'Chai', 100),
(19, 'Sầu riêng', 25000, 0, 'cream', 'Ly', 100),
(20, 'Dâu tây', 25000, 0, 'cream', 'Ly', 100),
(21, 'Vanni', 25000, 0, 'cream', 'Ly', 100),
(22, 'Yogurt', 25000, 0, 'cream', 'Ly', 100),
(23, 'Trà xanh', 25000, 0, 'cream', 'Ly', 100),
(24, 'Dưa lưới', 25000, 0, 'cream', 'Ly', 100),
(25, 'Socola', 25000, 0, 'cream', 'Ly', 100),
(26, 'Mít', 25000, 0, 'cream', 'Ly', 100),
(27, 'Trái cây', 25000, 0, 'cream', 'Ly', 100),
(28, 'Caramels', 25000, 0, 'cream', 'Ly', 100),
(29, 'Hạt điều', 25000, 0, 'cream', 'Ly', 100),
(30, 'Ổi', 20000, 0, 'juice', 'Ly', 100),
(31, 'Táo', 20000, 0, 'juice', 'Ly', 100),
(32, 'Cà rốt', 20000, 0, 'juice', 'Ly', 100),
(33, 'Cam', 20000, 0, 'juice', 'Ly', 100),
(34, 'Thơm', 20000, 0, 'juice', 'Ly', 100),
(35, 'Dưa hấu', 20000, 0, 'juice', 'Ly', 100),
(36, 'Nước ép mix', 25000, 0, 'juice', 'Ly', 100),
(37, 'Nước suối', 10000, 0, 'soda', 'Chai', 100),
(38, 'Cocacola', 15000, 0, 'soda', 'Lon', 100),
(39, 'Pepsi', 15000, 0, 'soda', 'Lon', 100),
(40, 'Sting', 20000, 0, 'soda', 'Lon', 100),
(41, 'Cam vắt', 25000, 0, 'soda', 'Ly', 100),
(42, 'Cam Twister', 20000, 0, 'soda', 'Chai', 100),
(43, '7UP', 20000, 0, 'soda', 'Lon', 100),
(44, 'Redbull', 20000, 0, 'soda', 'Lon', 100);

-- --------------------------------------------------------

--
-- Table structure for table `tickets`
--

CREATE TABLE `tickets` (
  `ticket_id` int(11) UNSIGNED NOT NULL,
  `ticket_key` varchar(20) NOT NULL DEFAULT '',
  `ticket_name` varchar(20) NOT NULL DEFAULT '',
  `ticket_price` double UNSIGNED NOT NULL DEFAULT '0',
  `ticket_payment` varchar(20) NOT NULL DEFAULT 'unpaid'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `tickets`
--

INSERT INTO `tickets` (`ticket_id`, `ticket_key`, `ticket_name`, `ticket_price`, `ticket_payment`) VALUES
(1, 'flower', 'Khách Vườn Hoa', 45000, 'paid'),
(2, 'hotel', 'Khách Lẻ', 0, 'unpaid');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `customers`
--
ALTER TABLE `customers`
  ADD PRIMARY KEY (`customer_id`),
  ADD UNIQUE KEY `customer_code_2` (`customer_code`),
  ADD KEY `customer_code` (`customer_code`,`ticket_id`);

--
-- Indexes for table `discounts`
--
ALTER TABLE `discounts`
  ADD PRIMARY KEY (`discount_id`),
  ADD KEY `customer_id` (`customer_id`,`product_id`);

--
-- Indexes for table `orders`
--
ALTER TABLE `orders`
  ADD PRIMARY KEY (`order_id`),
  ADD KEY `product_id` (`customer_id`);

--
-- Indexes for table `order_detail`
--
ALTER TABLE `order_detail`
  ADD PRIMARY KEY (`detail_id`);

--
-- Indexes for table `products`
--
ALTER TABLE `products`
  ADD PRIMARY KEY (`product_id`);

--
-- Indexes for table `tickets`
--
ALTER TABLE `tickets`
  ADD PRIMARY KEY (`ticket_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `customers`
--
ALTER TABLE `customers`
  MODIFY `customer_id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=278;

--
-- AUTO_INCREMENT for table `discounts`
--
ALTER TABLE `discounts`
  MODIFY `discount_id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `orders`
--
ALTER TABLE `orders`
  MODIFY `order_id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=337;

--
-- AUTO_INCREMENT for table `order_detail`
--
ALTER TABLE `order_detail`
  MODIFY `detail_id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- AUTO_INCREMENT for table `products`
--
ALTER TABLE `products`
  MODIFY `product_id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=45;

--
-- AUTO_INCREMENT for table `tickets`
--
ALTER TABLE `tickets`
  MODIFY `ticket_id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
