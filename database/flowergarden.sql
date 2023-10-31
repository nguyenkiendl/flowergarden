-- phpMyAdmin SQL Dump
-- version 4.8.5
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: Oct 31, 2023 at 07:43 AM
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
-- Table structure for table `categories`
--

CREATE TABLE `categories` (
  `category_id` bigint(20) NOT NULL,
  `category_key` varchar(20) NOT NULL DEFAULT '',
  `category_name` varchar(255) NOT NULL DEFAULT ''
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `categories`
--

INSERT INTO `categories` (`category_id`, `category_key`, `category_name`) VALUES
(1, 'water', 'Nước'),
(2, 'food', 'Đồ ăn');

-- --------------------------------------------------------

--
-- Table structure for table `customers`
--

CREATE TABLE `customers` (
  `customer_id` bigint(20) UNSIGNED NOT NULL,
  `customer_phone` varchar(20) COLLATE utf8_unicode_ci NOT NULL DEFAULT '',
  `customer_type` varchar(20) CHARACTER SET utf8 NOT NULL DEFAULT '',
  `ticket_id` int(11) UNSIGNED NOT NULL DEFAULT '0',
  `customer_number` int(6) UNSIGNED NOT NULL DEFAULT '1',
  `created_at` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `customers`
--

INSERT INTO `customers` (`customer_id`, `customer_phone`, `customer_type`, `ticket_id`, `customer_number`, `created_at`) VALUES
(276, '', 'flower', 1, 1, '2023-10-25 15:26:58'),
(277, '', 'hotel', 2, 1, '2023-10-25 16:04:34'),
(278, '213123123', 'flower', 1, 1, '2023-10-26 08:11:07'),
(279, '1231231231', 'flower', 1, 1, '2023-10-26 09:05:29'),
(280, '0123456789', '', 1, 1, '2023-10-26 13:44:47'),
(281, '0123456789', '', 1, 1, '2023-10-26 14:38:55'),
(282, '', 'flower', 1, 3, '2023-10-26 14:39:40'),
(283, '048641231231', 'flower', 1, 10, '2023-10-26 14:44:31'),
(284, '0568241549', 'flower', 1, 1, '2023-10-26 16:32:09'),
(285, '', 'flower', 1, 6, '2023-10-26 16:33:29'),
(286, '032564831', 'flower', 1, 1, '2023-10-27 08:12:16'),
(287, '0123456789', 'flower', 1, 1, '2023-10-27 09:07:05'),
(288, '0123456789', 'flower', 1, 1, '2023-10-27 09:07:43'),
(289, '0123456789', 'flower', 1, 1, '2023-10-27 09:09:02'),
(290, '0123456897', 'flower', 1, 1, '2023-10-27 09:09:44'),
(291, '12345464561', 'flower', 1, 1, '2023-10-27 09:13:44'),
(292, '1234567897', 'flower', 1, 1, '2023-10-27 09:21:11'),
(293, '0532659955', 'flower', 1, 5, '2023-10-27 09:24:04'),
(294, '', 'flower', 1, 1, '2023-10-27 09:27:06'),
(295, '', 'flower', 1, 1, '2023-10-27 09:27:18'),
(296, '', 'flower', 1, 1, '2023-10-27 09:29:28'),
(297, '', 'flower', 1, 1, '2023-10-27 09:29:52'),
(298, '', 'flower', 1, 1, '2023-10-27 09:30:25'),
(299, '', 'flower', 1, 3, '2023-10-27 14:53:17'),
(300, '', 'flower', 1, 3, '2023-10-27 14:53:34'),
(301, '', 'flower', 1, 20, '2023-10-27 14:54:48'),
(302, '', 'flower', 1, 1, '2023-10-28 14:11:26'),
(303, '', 'flower', 1, 1, '2023-10-28 14:16:19'),
(304, '', 'flower', 1, 1, '2023-10-28 14:17:03'),
(305, '', 'flower', 1, 1, '2023-10-28 15:40:54'),
(306, '', 'flower', 1, 1, '2023-10-28 15:59:03'),
(307, '', 'flower', 1, 5, '2023-10-30 14:51:11'),
(308, '', 'flower', 1, 5, '2023-10-31 13:10:32'),
(309, '', 'flower', 1, 1, '2023-10-31 13:14:37'),
(310, '', 'flower', 1, 10, '2023-10-31 13:16:48'),
(311, '', 'flower', 1, 10, '2023-10-31 13:18:03');

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
  `table_id` bigint(20) UNSIGNED NOT NULL DEFAULT '0',
  `order_status` tinyint(2) NOT NULL DEFAULT '0',
  `created_at` datetime NOT NULL,
  `updated_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `orders`
--

INSERT INTO `orders` (`order_id`, `ticket_id`, `table_id`, `order_status`, `created_at`, `updated_at`) VALUES
(340, 1, 1, 1, '2023-10-26 12:56:29', NULL),
(341, 1, 1, 1, '2023-10-26 12:58:45', NULL),
(342, 1, 2, 1, '2023-10-26 13:20:13', NULL),
(343, 2, 1, 1, '2023-10-26 14:28:37', NULL),
(344, 1, 1, 1, '2023-10-26 14:42:18', NULL),
(345, 2, 1, 1, '2023-10-26 14:42:37', NULL),
(346, 2, 1, 1, '2023-10-26 14:42:55', NULL),
(347, 2, 1, 1, '2023-10-26 14:43:14', NULL),
(348, 1, 1, 1, '2023-10-26 14:43:17', NULL),
(349, 1, 13, 1, '2023-10-26 14:47:19', NULL),
(350, 1, 20, 1, '2023-10-26 15:16:10', NULL),
(351, 2, 20, 1, '2023-10-26 15:17:14', NULL),
(352, 1, 1, 1, '2023-10-26 16:28:24', NULL),
(353, 2, 1, 1, '2023-10-26 16:29:23', NULL),
(354, 1, 1, 1, '2023-10-26 16:29:31', '2023-10-27 15:40:29'),
(355, 2, 3, 1, '2023-10-27 09:33:18', NULL),
(356, 2, 13, 1, '2023-10-27 10:17:02', NULL),
(357, 2, 13, 1, '2023-10-27 10:28:15', NULL),
(358, 2, 8, 1, '2023-10-27 14:55:29', NULL),
(359, 2, 1, 1, '2023-10-27 15:07:42', NULL),
(360, 2, 1, 1, '2023-10-27 15:36:01', '2023-10-27 15:40:10'),
(361, 2, 9, 0, '2023-10-28 11:21:10', NULL),
(362, 2, 5, 1, '2023-10-28 13:24:05', NULL),
(363, 2, 2, 1, '2023-10-28 14:00:33', NULL),
(364, 2, 2, 1, '2023-10-28 14:04:28', NULL),
(365, 2, 1, 1, '2023-10-28 14:06:40', NULL),
(366, 2, 1, 1, '2023-10-30 14:51:22', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `order_detail`
--

CREATE TABLE `order_detail` (
  `detail_id` bigint(20) UNSIGNED NOT NULL,
  `order_id` bigint(20) UNSIGNED NOT NULL DEFAULT '0',
  `product_id` bigint(20) UNSIGNED NOT NULL DEFAULT '0',
  `quantity` int(6) UNSIGNED NOT NULL DEFAULT '1',
  `status` tinyint(2) NOT NULL DEFAULT '0',
  `created_at` datetime NOT NULL,
  `updated_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `order_detail`
--

INSERT INTO `order_detail` (`detail_id`, `order_id`, `product_id`, `quantity`, `status`, `created_at`, `updated_at`) VALUES
(7, 330, 1, 1, 0, '2023-10-25 15:27:59', '2023-10-25 16:00:30'),
(8, 330, 6, 1, 0, '2023-10-25 15:27:59', '2023-10-25 16:01:31'),
(9, 330, 3, 1, 0, '2023-10-25 15:27:59', '2023-10-25 16:03:38'),
(10, 330, 2, 1, 0, '2023-10-25 15:27:59', '2023-10-25 16:03:41'),
(11, 330, 5, 1, 0, '2023-10-25 15:27:59', '2023-10-25 16:03:43'),
(12, 331, 1, 1, 0, '2023-10-25 16:05:05', '2023-10-25 16:05:11'),
(13, 331, 6, 1, 0, '2023-10-25 16:05:05', '2023-10-25 16:05:11'),
(14, 331, 3, 1, 0, '2023-10-25 16:05:05', '2023-10-25 16:05:11'),
(15, 331, 2, 1, 0, '2023-10-25 16:05:05', '2023-10-25 16:05:11'),
(16, 331, 5, 1, 0, '2023-10-25 16:05:05', '2023-10-25 16:05:11'),
(17, 341, 1, 2, 0, '2023-10-26 13:04:22', NULL),
(18, 341, 6, 2, 0, '2023-10-26 13:04:22', NULL),
(19, 341, 3, 1, 0, '2023-10-26 14:26:32', NULL),
(20, 341, 2, 1, 0, '2023-10-26 14:26:32', NULL),
(21, 341, 5, 2, 0, '2023-10-26 14:28:13', NULL),
(22, 341, 4, 1, 0, '2023-10-26 14:28:18', NULL),
(23, 349, 1, 1, 0, '2023-10-26 14:47:34', NULL),
(24, 349, 6, 1, 0, '2023-10-26 14:47:34', NULL),
(25, 349, 3, 1, 0, '2023-10-26 14:47:34', NULL),
(26, 349, 2, 1, 0, '2023-10-26 14:47:34', NULL),
(27, 349, 5, 1, 0, '2023-10-26 14:47:34', NULL),
(28, 349, 8, 1, 0, '2023-10-26 14:47:34', NULL),
(29, 349, 7, 1, 0, '2023-10-26 14:47:34', NULL),
(30, 349, 4, 1, 0, '2023-10-26 14:47:34', NULL),
(31, 349, 12, 1, 0, '2023-10-26 14:47:34', NULL),
(32, 349, 11, 1, 0, '2023-10-26 14:47:34', NULL),
(33, 350, 1, 1, 0, '2023-10-26 15:16:41', NULL),
(34, 350, 6, 1, 0, '2023-10-26 15:16:41', NULL),
(35, 350, 3, 1, 0, '2023-10-26 15:16:41', NULL),
(36, 350, 2, 1, 0, '2023-10-26 15:16:41', NULL),
(37, 350, 5, 1, 0, '2023-10-26 15:16:41', NULL),
(38, 351, 10, 1, 0, '2023-10-26 15:17:24', NULL),
(39, 351, 9, 1, 0, '2023-10-26 15:17:24', NULL),
(40, 352, 1, 1, 0, '2023-10-26 16:28:34', NULL),
(41, 352, 6, 1, 0, '2023-10-26 16:28:34', NULL),
(42, 352, 3, 1, 0, '2023-10-26 16:28:34', NULL),
(43, 352, 2, 1, 0, '2023-10-26 16:28:34', NULL),
(44, 355, 1, 6, 0, '2023-10-27 13:44:34', NULL),
(45, 355, 6, 1, 0, '2023-10-27 13:46:52', NULL),
(46, 354, 1, 2, 1, '2023-10-27 13:54:29', '2023-10-27 15:43:58'),
(47, 354, 5, 1, 1, '2023-10-27 14:05:49', '2023-10-27 15:43:58'),
(48, 354, 4, 2, 1, '2023-10-27 14:05:49', '2023-10-27 15:43:58'),
(49, 354, 8, 1, 1, '2023-10-27 14:05:50', '2023-10-27 15:43:58'),
(50, 353, 1, 1, 1, '2023-10-27 14:32:58', '2023-10-27 15:35:56'),
(51, 353, 5, 1, 1, '2023-10-27 14:32:58', '2023-10-27 15:35:56'),
(52, 353, 6, 1, 1, '2023-10-27 14:32:58', '2023-10-27 15:35:56'),
(53, 353, 8, 1, 1, '2023-10-27 14:32:59', '2023-10-27 15:35:56'),
(54, 353, 2, 1, 1, '2023-10-27 14:32:59', '2023-10-27 15:35:56'),
(55, 353, 11, 1, 1, '2023-10-27 14:33:00', '2023-10-27 15:35:56'),
(56, 353, 4, 1, 1, '2023-10-27 14:33:00', '2023-10-27 15:35:56'),
(57, 353, 10, 1, 1, '2023-10-27 14:33:01', '2023-10-27 15:35:56'),
(58, 353, 7, 1, 1, '2023-10-27 14:33:01', '2023-10-27 15:35:56'),
(59, 354, 3, 1, 1, '2023-10-27 14:33:10', '2023-10-27 15:43:58'),
(60, 354, 10, 8, 1, '2023-10-27 14:33:29', '2023-10-27 15:43:58'),
(61, 358, 6, 1, 0, '2023-10-27 14:56:02', NULL),
(62, 358, 10, 1, 0, '2023-10-27 14:56:43', NULL),
(63, 358, 11, 1, 0, '2023-10-27 14:59:33', NULL),
(64, 358, 18, 1, 0, '2023-10-27 14:59:37', NULL),
(65, 358, 17, 1, 0, '2023-10-27 14:59:38', NULL),
(66, 358, 16, 1, 0, '2023-10-27 14:59:39', NULL),
(67, 360, 1, 1, 0, '2023-10-27 16:22:37', NULL),
(68, 360, 6, 1, 0, '2023-10-27 16:22:39', NULL),
(69, 360, 5, 1, 0, '2023-10-27 16:22:39', NULL),
(70, 360, 2, 1, 0, '2023-10-27 16:22:39', NULL),
(71, 360, 7, 2, 0, '2023-10-27 16:22:40', NULL),
(72, 360, 4, 2, 0, '2023-10-27 16:22:40', NULL),
(73, 360, 11, 15, 0, '2023-10-27 16:22:41', NULL),
(74, 360, 10, 1, 0, '2023-10-27 16:22:41', NULL),
(75, 360, 17, 5, 0, '2023-10-28 10:14:22', NULL),
(76, 360, 24, 2, 0, '2023-10-28 10:14:23', NULL),
(77, 360, 44, 1, 0, '2023-10-28 10:58:48', NULL),
(78, 360, 40, 1, 0, '2023-10-28 10:58:49', NULL),
(79, 360, 38, 1, 0, '2023-10-28 10:58:49', NULL),
(80, 360, 37, 1, 0, '2023-10-28 10:58:49', NULL),
(81, 360, 39, 1, 0, '2023-10-28 10:58:50', NULL),
(82, 360, 36, 1, 0, '2023-10-28 11:02:40', NULL),
(83, 360, 30, 1, 0, '2023-10-28 11:02:40', NULL),
(84, 360, 34, 1, 0, '2023-10-28 11:02:40', NULL),
(85, 360, 35, 1, 0, '2023-10-28 11:02:42', NULL),
(86, 360, 31, 1, 0, '2023-10-28 11:02:42', NULL),
(87, 360, 33, 2, 0, '2023-10-28 11:02:42', NULL),
(88, 360, 32, 1, 0, '2023-10-28 11:02:43', NULL),
(89, 360, 22, 1, 0, '2023-10-28 11:02:43', NULL),
(90, 360, 21, 1, 0, '2023-10-28 11:02:44', NULL),
(91, 360, 25, 1, 0, '2023-10-28 11:02:44', NULL),
(92, 360, 23, 1, 0, '2023-10-28 11:02:44', NULL),
(93, 360, 27, 1, 0, '2023-10-28 11:02:45', NULL),
(94, 360, 19, 1, 0, '2023-10-28 11:02:45', NULL),
(95, 360, 26, 1, 0, '2023-10-28 11:02:46', NULL),
(96, 360, 20, 1, 0, '2023-10-28 11:02:46', NULL),
(97, 360, 28, 1, 0, '2023-10-28 11:02:47', NULL),
(98, 360, 29, 1, 0, '2023-10-28 11:02:47', NULL),
(99, 360, 14, 1, 0, '2023-10-28 11:02:48', NULL),
(100, 360, 15, 1, 0, '2023-10-28 11:02:48', NULL),
(101, 360, 16, 1, 0, '2023-10-28 11:02:48', NULL),
(102, 360, 18, 1, 0, '2023-10-28 11:02:48', NULL),
(120, 361, 10, 1, 0, '2023-10-28 13:23:27', NULL),
(121, 361, 11, 1, 0, '2023-10-28 13:23:27', NULL),
(122, 361, 8, 1, 0, '2023-10-28 13:23:28', NULL),
(123, 361, 4, 1, 0, '2023-10-28 13:23:28', NULL),
(124, 361, 1, 1, 0, '2023-10-28 13:23:29', NULL),
(125, 361, 13, 1, 0, '2023-10-28 13:23:33', NULL),
(136, 342, 1, 1, 1, '2023-10-28 13:46:32', '2023-10-28 13:46:38'),
(137, 342, 5, 1, 1, '2023-10-28 13:46:32', '2023-10-28 13:46:38'),
(138, 342, 8, 1, 1, '2023-10-28 13:46:33', '2023-10-28 13:46:38'),
(139, 363, 10, 1, 0, '2023-10-28 14:01:21', NULL),
(140, 363, 18, 1, 0, '2023-10-28 14:01:23', NULL),
(141, 363, 17, 1, 0, '2023-10-28 14:01:23', NULL),
(142, 364, 5, 1, 1, '2023-10-28 14:04:29', '2023-10-28 14:04:33'),
(143, 364, 8, 1, 1, '2023-10-28 14:04:30', '2023-10-28 14:04:33'),
(144, 364, 4, 1, 1, '2023-10-28 14:04:30', '2023-10-28 14:04:33'),
(158, 366, 39, 2, 0, '2023-10-31 09:43:29', NULL),
(159, 366, 10, 1, 0, '2023-10-31 09:43:35', NULL),
(160, 366, 11, 1, 0, '2023-10-31 09:43:35', NULL),
(161, 366, 40, 3, 0, '2023-10-31 09:43:35', NULL),
(162, 366, 56, 1, 0, '2023-10-31 11:49:24', NULL),
(163, 366, 37, 1, 0, '2023-10-31 12:42:31', NULL),
(164, 366, 13, 1, 0, '2023-10-31 13:54:43', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `products`
--

CREATE TABLE `products` (
  `product_id` bigint(20) UNSIGNED NOT NULL,
  `product_name` varchar(255) CHARACTER SET utf8 NOT NULL DEFAULT '',
  `thumbnail` varchar(225) COLLATE utf8_unicode_ci NOT NULL DEFAULT '',
  `product_price` double UNSIGNED NOT NULL DEFAULT '0',
  `display_price` varchar(20) COLLATE utf8_unicode_ci NOT NULL DEFAULT '',
  `product_type` varchar(20) CHARACTER SET utf8 NOT NULL DEFAULT '',
  `product_unit` varchar(20) COLLATE utf8_unicode_ci NOT NULL DEFAULT '',
  `category_id` bigint(20) NOT NULL DEFAULT '1'
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `products`
--

INSERT INTO `products` (`product_id`, `product_name`, `thumbnail`, `product_price`, `display_price`, `product_type`, `product_unit`, `category_id`) VALUES
(1, 'Nước chanh', 'nuoc-chanh.jpg', 20000, '20k', 'tea', 'Ly', 1),
(2, 'Trà lipton', 'tra-lipton.jpg', 20000, '20k', 'tea', 'Ly', 1),
(3, 'Trà gừng', 'tra-gung.jpg', 20000, '20k', 'tea', 'Ly', 1),
(4, 'Trà trái cây', 'tra-trai-cay.jpg', 25000, '25k', 'tea', 'Ly', 1),
(5, 'Trà sen vàng', 'tra-sen-vang.jpg', 25000, '25k', 'tea', 'Ly', 1),
(6, 'Trà cam sả', 'tra-cam-sa.jpg', 25000, '25k', 'tea', 'Ly', 1),
(7, 'Trà tắc xí muội', 'tra-tac-xi-muoi.jpg', 25000, '25k', 'tea', 'Ly', 1),
(8, 'Trà tắc mật ong', 'tra-tac-mat-ong.jpg', 25000, '25k', 'tea', 'Ly', 1),
(9, 'Cà phê đen đá/nóng', 'ca-phe-den.jpg', 20000, '20k', 'coffee', 'Ly', 1),
(10, 'Cà phê sữa đá/nóng', 'ca-phe-sua.jpg', 25000, '25k', 'coffee', 'Ly', 1),
(11, 'Cà phê muối', 'ca-phe-muoi.jpg', 25000, '25k', 'coffee', 'Ly', 1),
(12, 'Bạc xỉu đá/nóng', 'bac-xiu.jpg', 25000, '25k', 'coffee', 'Ly', 1),
(13, 'Cacao đá/nóng', 'cacao.jpg', 25000, '25k', 'coffee', 'Ly', 1),
(14, 'Tiger nâu', 'tiger-nau.jpg', 20000, '20k', 'beer', 'Lon', 1),
(15, 'Tiger bạc', 'tiger-bac.jpg', 25000, '25k', 'beer', 'Lon', 1),
(16, 'Heniken', 'heniken.jpg', 25000, '25k', 'beer', 'Lon', 1),
(17, 'Strongbow', 'strongbow.jpg', 25000, '25k', 'beer', 'Lon', 1),
(18, 'Soju', 'soju.jpg', 85000, '85k', 'beer', 'Chai', 1),
(19, 'Sầu riêng', 'kem-sau-rieng.jpg', 25000, '25k', 'cream', 'Ly', 1),
(20, 'Dâu tây', 'kem-dau-tay.jpg', 25000, '25k', 'cream', 'Ly', 1),
(21, 'Vanni', 'kem-vanni.jpg', 25000, '25k', 'cream', 'Ly', 1),
(22, 'Yogurt', 'kem-yogurt.jpg', 25000, '25k', 'cream', 'Ly', 1),
(23, 'Trà xanh', 'kem-tra-xanh.jpg', 25000, '25k', 'cream', 'Ly', 1),
(24, 'Dưa lưới', 'kem-dua-luoi.jpg', 25000, '25k', 'cream', 'Ly', 1),
(25, 'Socola', 'kem-socola.jpg', 25000, '25', 'cream', 'Ly', 1),
(26, 'Mít', 'kem-mit.jpg', 25000, '25k', 'cream', 'Ly', 1),
(27, 'Trái cây', 'kem-trai-cay.jpg', 25000, '25k', 'cream', 'Ly', 1),
(28, 'Caramels', 'kem-caramels.jpg', 25000, '25k', 'cream', 'Ly', 1),
(29, 'Hạt điều', 'kem-hat-dieu.jpg', 25000, '25k', 'cream', 'Ly', 1),
(30, 'Ổi', 'nuoc-ep-oi.jpg', 20000, '20k', 'juice', 'Ly', 1),
(31, 'Táo', 'nuoc-ep-tao.jpg', 20000, '20k', 'juice', 'Ly', 1),
(32, 'Cà rốt', 'nuoc-ep-ca-rot.jpg', 20000, '20k', 'juice', 'Ly', 1),
(33, 'Cam', 'nuoc-ep-cam.jpg', 20000, '20k', 'juice', 'Ly', 1),
(34, 'Thơm', 'nuoc-ep-thom.jpg', 20000, '20k', 'juice', 'Ly', 1),
(35, 'Dưa hấu', 'nuoc-ep-dua-hau.jpg', 20000, '20k', 'juice', 'Ly', 1),
(36, 'Nước ép mix', 'nuoc-ep-mix.jpg', 25000, '25k', 'juice', 'Ly', 1),
(37, 'Nước suối', 'nuoc-suoi.jpg', 10000, '10k', 'soda', 'Chai', 1),
(38, 'Cocacola', 'cocacola.jpg', 15000, '15k', 'soda', 'Lon', 1),
(39, 'Pepsi', 'pepsi.jpg', 15000, '15k', 'soda', 'Lon', 1),
(40, 'Sting', 'string.jpg', 20000, '20k', 'soda', 'Lon', 1),
(41, 'Cam vắt', 'cam-vat.jpg', 25000, '25k', 'soda', 'Ly', 1),
(42, 'Cam Twister', 'cam-twister.jpg', 20000, '20k', 'soda', 'Chai', 1),
(43, '7UP', '7up.jpg', 20000, '20k', 'soda', 'Lon', 1),
(44, 'Redbull', 'redbull.jpg', 20000, '20k', 'soda', 'Lon', 1),
(45, 'Heo rừng', 'heo-rung.jpg', 200000, '200k', 'forest', 'Phần', 2),
(46, 'Chồn', 'chon.jpg', 200000, '200k', 'forest', 'Phần', 2),
(47, 'Nhím', 'nhim.jpg', 200000, '200k', 'forest', 'Phần', 2),
(48, 'Bò', 'bo.jpg', 200000, '200k', 'forest', 'Phần', 2),
(49, 'Cá cam', 'ca-cam.jpg', 200000, '200k', 'sea', 'Phần', 2),
(50, 'Sò nướng', 'so-nuong.jpg', 200000, '200k', 'sea', 'Phần', 2),
(51, 'Cua', 'cua.jpg', 200000, '200k', 'sea', 'Phần', 2),
(52, 'Ghẹ', 'ghe.jpg', 200000, '200k', 'sea', 'Phần', 2),
(53, 'Nghêu', 'ngheu.jpg', 200000, '200k', 'sea', 'Phần', 2),
(54, 'Mực', 'muc.jpg', 200000, '200k', 'sea', 'Phần', 2),
(55, 'Xúc xích', 'xuc-xich.jpg', 200000, '200k', 'forest', 'Phần', 2),
(56, 'Combo BBQ', 'combo-bbq.jpg', 299000, '299k', 'combo', 'Phần', 2),
(57, 'Cà chua', 'ca-chua.jpg', 10000, '10k', 'vegetable', 'Phần', 2),
(58, 'Xa lách', 'xa-lach.jpg', 10000, '10k', 'vegetable', 'Phần', 2),
(59, 'Cà tím', 'ca-tim.jpg', 10000, '10k', 'vegetable', 'Phần', 2),
(60, 'Dưa leo', 'dua-leo.jpg', 10000, '10k', 'vegetable', 'Phần', 2),
(61, 'Bí ngòi', 'bi-ngoi.jpg', 10000, '10k', 'vegetable', 'Phần', 2),
(62, 'Đậu bắp', 'dau-bap.jpg', 10000, '10k', 'vegetable', 'Phần', 2);

-- --------------------------------------------------------

--
-- Table structure for table `tables`
--

CREATE TABLE `tables` (
  `table_id` int(11) NOT NULL,
  `table_key` varchar(20) NOT NULL DEFAULT '',
  `table_name` varchar(20) NOT NULL DEFAULT '',
  `table_status` tinyint(2) NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `tables`
--

INSERT INTO `tables` (`table_id`, `table_key`, `table_name`, `table_status`) VALUES
(1, 'b1', 'Bàn 01', 0),
(2, 'b2', 'Bàn 02', 0),
(3, 'b3', 'Bàn 03', 0),
(4, 'b4', 'Bàn 04', 0),
(5, 'b5', 'Bàn 05', 0),
(6, 'b6', 'Bàn 06', 0),
(7, 'b7', 'Bàn 07', 0),
(8, 'b8', 'Bàn 08', 0),
(9, 'b9', 'Bàn 09', 0),
(10, 'b10', 'Bàn 10', 0),
(11, 'b11', 'Bàn 11', 0),
(12, 'b12', 'Bàn 12', 0),
(13, 'b13', 'Bàn 13', 0),
(14, 'b14', 'Bàn 14', 0),
(15, 'b15', 'Bàn 15', 0),
(16, 'b16', 'Bàn 16', 0),
(17, 'b17', 'Bàn 17', 0),
(18, 'b18', 'Bàn 18', 0),
(19, 'b19', 'Bàn 19', 0),
(20, 'b20', 'Bàn 20', 0);

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
(1, 'flower', 'Khách Vườn Hoa', 40000, 'paid'),
(2, 'hotel', 'Khách Lẻ', 0, 'unpaid');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `categories`
--
ALTER TABLE `categories`
  ADD PRIMARY KEY (`category_id`);

--
-- Indexes for table `customers`
--
ALTER TABLE `customers`
  ADD PRIMARY KEY (`customer_id`),
  ADD KEY `customer_code` (`ticket_id`);

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
  ADD PRIMARY KEY (`order_id`);

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
-- Indexes for table `tables`
--
ALTER TABLE `tables`
  ADD PRIMARY KEY (`table_id`);

--
-- Indexes for table `tickets`
--
ALTER TABLE `tickets`
  ADD PRIMARY KEY (`ticket_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `categories`
--
ALTER TABLE `categories`
  MODIFY `category_id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `customers`
--
ALTER TABLE `customers`
  MODIFY `customer_id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=312;

--
-- AUTO_INCREMENT for table `discounts`
--
ALTER TABLE `discounts`
  MODIFY `discount_id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `orders`
--
ALTER TABLE `orders`
  MODIFY `order_id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=367;

--
-- AUTO_INCREMENT for table `order_detail`
--
ALTER TABLE `order_detail`
  MODIFY `detail_id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=165;

--
-- AUTO_INCREMENT for table `products`
--
ALTER TABLE `products`
  MODIFY `product_id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=63;

--
-- AUTO_INCREMENT for table `tables`
--
ALTER TABLE `tables`
  MODIFY `table_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

--
-- AUTO_INCREMENT for table `tickets`
--
ALTER TABLE `tickets`
  MODIFY `ticket_id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
