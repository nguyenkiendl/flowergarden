-- phpMyAdmin SQL Dump
-- version 4.8.5
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: Nov 11, 2023 at 09:30 AM
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
-- Table structure for table `bbqs`
--

CREATE TABLE `bbqs` (
  `bbq_id` bigint(20) NOT NULL,
  `table_id` int(11) NOT NULL DEFAULT '0',
  `name` varchar(255) NOT NULL DEFAULT '',
  `deposit` double NOT NULL DEFAULT '0',
  `note` text,
  `date` varchar(10) NOT NULL DEFAULT '0000-00-00',
  `time` varchar(5) NOT NULL DEFAULT '00:00',
  `status` tinyint(2) NOT NULL DEFAULT '0',
  `created_at` datetime NOT NULL,
  `updated_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `bbqs`
--

INSERT INTO `bbqs` (`bbq_id`, `table_id`, `name`, `deposit`, `note`, `date`, `time`, `status`, `created_at`, `updated_at`) VALUES
(1, 10, 'Nguyễn Văn A', 500000, 'tesst', '2023-11-26', '15:00', 0, '2023-11-10 09:20:26', NULL),
(2, 10, 'Nguyễn Văn B', 300000, 'test 23', '2023-11-19', '15:30', 0, '2023-11-10 09:24:27', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `bbq_product`
--

CREATE TABLE `bbq_product` (
  `id` bigint(20) NOT NULL,
  `bbq_id` bigint(20) NOT NULL,
  `product_id` bigint(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `categories`
--

CREATE TABLE `categories` (
  `category_id` bigint(20) NOT NULL,
  `category_order` int(11) NOT NULL DEFAULT '0',
  `category_key` varchar(20) NOT NULL DEFAULT '',
  `category_name` varchar(255) NOT NULL DEFAULT ''
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `categories`
--

INSERT INTO `categories` (`category_id`, `category_order`, `category_key`, `category_name`) VALUES
(1, 2, 'water', 'Nước'),
(2, 4, 'food', 'BBQ'),
(3, 1, 'ticket', 'Vé'),
(4, 3, 'breakfast', 'Ăn sáng'),
(5, 5, 'camp', 'Lều');

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
(378, '', 'flower', 1, 1, '2023-11-03 10:36:20'),
(379, '', 'flower', 1, 1, '2023-11-03 10:37:17'),
(380, '', 'flower', 1, 1, '2023-11-03 10:38:48'),
(381, '', 'flower', 1, 1, '2023-11-03 10:38:54'),
(382, '', 'flower', 1, 1, '2023-11-03 10:41:13'),
(383, '', 'flower', 1, 1, '2023-11-03 10:41:15'),
(384, '', 'flower', 1, 1, '2023-11-03 10:47:40'),
(385, '', 'flower', 1, 1, '2023-11-03 13:20:10'),
(386, '', 'flower', 1, 1, '2023-11-03 13:54:05'),
(387, '', 'flower', 1, 5, '2023-11-03 15:27:51'),
(388, '', 'flower', 1, 1, '2023-11-03 15:30:26'),
(389, '', 'flower', 1, 5, '2023-11-03 15:30:29'),
(390, '', 'flower', 1, 5, '2023-11-03 15:30:33'),
(391, '', 'flower', 1, 5, '2023-11-03 15:30:34'),
(392, '', 'flower', 1, 5, '2023-11-03 15:30:34'),
(393, '', 'flower', 1, 1, '2023-11-03 15:30:48'),
(394, '', 'flower', 1, 1, '2023-11-03 15:30:48'),
(395, '', 'flower', 1, 1, '2023-11-03 15:30:49'),
(396, '', 'flower', 1, 1, '2023-11-03 15:30:49'),
(397, '', 'flower', 1, 1, '2023-11-03 15:30:50'),
(398, '', 'flower', 1, 1, '2023-11-03 15:30:50'),
(399, '', 'flower', 1, 1, '2023-11-03 15:30:50'),
(400, '', 'flower', 1, 1, '2023-11-03 15:30:51'),
(401, '', 'flower', 1, 1, '2023-11-03 15:30:51'),
(402, '', 'flower', 1, 1, '2023-11-03 15:30:51'),
(403, '', 'flower', 1, 1, '2023-11-03 15:30:56'),
(404, '', 'flower', 1, 1, '2023-11-03 15:31:02'),
(405, '', 'flower', 1, 1, '2023-11-03 15:31:17'),
(406, '', 'flower', 1, 1, '2023-11-03 15:31:46'),
(407, '', 'flower', 1, 1, '2023-11-03 15:33:48'),
(408, '', 'flower', 1, 5, '2023-11-03 15:33:51'),
(409, '', 'flower', 1, 5, '2023-11-03 15:33:52'),
(410, '', 'flower', 1, 5, '2023-11-03 15:33:52'),
(411, '', 'flower', 1, 5, '2023-11-03 15:33:53'),
(412, '', 'flower', 1, 5, '2023-11-03 15:33:55');

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
(383, 2, 1, 1, '2023-11-01 19:52:11', '2023-11-01 20:23:59'),
(384, 2, 1, 1, '2023-11-01 20:28:42', '2023-11-01 20:29:19'),
(386, 2, 1, 1, '2023-11-02 06:37:32', '2023-11-02 06:44:21'),
(387, 2, 2, 1, '2023-11-02 07:28:52', '2023-11-02 07:33:25'),
(394, 2, 3, 1, '2023-11-02 08:09:01', '2023-11-02 10:29:33'),
(400, 2, 1, 1, '2023-11-02 09:32:55', '2023-11-02 09:39:45'),
(402, 2, 1, 1, '2023-11-02 10:50:13', '2023-11-02 10:52:26'),
(403, 2, 2, 1, '2023-11-02 11:21:50', '2023-11-02 11:22:13'),
(404, 2, 1, 1, '2023-11-02 13:58:53', '2023-11-02 13:59:15'),
(405, 2, 2, 1, '2023-11-02 14:20:27', '2023-11-02 14:31:24'),
(406, 2, 1, 1, '2023-11-02 14:32:59', '2023-11-02 14:33:36'),
(407, 2, 1, 1, '2023-11-02 14:34:06', '2023-11-02 14:34:50'),
(408, 2, 2, 1, '2023-11-02 14:40:09', '2023-11-02 14:40:26'),
(409, 2, 2, 1, '2023-11-02 16:15:49', '2023-11-02 16:28:33'),
(411, 2, 1, 1, '2023-11-02 21:58:21', '2023-11-02 21:59:18'),
(412, 2, 1, 1, '2023-11-03 07:22:21', '2023-11-03 07:23:44'),
(413, 2, 2, 1, '2023-11-03 08:28:58', '2023-11-03 08:31:45'),
(414, 2, 4, 1, '2023-11-03 08:49:26', '2023-11-03 09:14:07'),
(415, 2, 5, 1, '2023-11-03 08:50:12', '2023-11-03 08:50:58'),
(416, 2, 6, 1, '2023-11-03 09:14:45', '2023-11-03 09:15:05'),
(417, 2, 4, 1, '2023-11-03 09:49:43', '2023-11-03 09:50:20'),
(418, 2, 1, 1, '2023-11-03 10:08:38', '2023-11-03 10:51:30'),
(419, 2, 2, 1, '2023-11-03 10:40:01', '2023-11-03 10:40:11'),
(420, 2, 2, 1, '2023-11-03 11:04:24', '2023-11-03 11:04:46'),
(421, 2, 3, 1, '2023-11-03 11:04:53', '2023-11-03 11:05:08'),
(422, 2, 2, 1, '2023-11-03 12:17:34', '2023-11-03 12:18:30'),
(423, 2, 1, 1, '2023-11-03 13:48:17', '2023-11-03 13:48:50'),
(424, 2, 1, 1, '2023-11-03 15:59:43', '2023-11-03 16:00:30'),
(425, 2, 2, 1, '2023-11-03 16:37:09', '2023-11-03 16:37:23'),
(426, 2, 3, 1, '2023-11-03 16:50:25', '2023-11-03 16:50:34'),
(427, 2, 1, 1, '2023-11-03 16:55:39', '2023-11-03 16:55:52'),
(428, 2, 1, 1, '2023-11-03 16:59:32', '2023-11-03 16:59:40'),
(429, 2, 1, 1, '2023-11-03 17:08:34', '2023-11-03 17:08:54'),
(430, 2, 1, 1, '2023-11-03 18:40:55', '2023-11-03 18:41:09'),
(431, 2, 1, 1, '2023-11-03 19:42:49', '2023-11-03 19:44:56'),
(432, 2, 3, 1, '2023-11-03 20:10:51', '2023-11-03 20:26:17'),
(433, 2, 4, 1, '2023-11-03 20:36:58', '2023-11-03 20:37:56'),
(434, 2, 1, 1, '2023-11-04 06:22:32', '2023-11-04 06:24:08'),
(435, 2, 1, 1, '2023-11-04 07:20:00', '2023-11-04 07:20:08'),
(436, 2, 1, 1, '2023-11-04 08:57:15', '2023-11-04 08:57:23'),
(437, 2, 2, 1, '2023-11-04 08:58:13', '2023-11-04 08:58:57'),
(438, 2, 3, 1, '2023-11-04 09:00:31', '2023-11-04 09:12:30'),
(439, 2, 4, 1, '2023-11-04 09:18:23', '2023-11-04 09:19:23'),
(440, 2, 1, 1, '2023-11-04 12:55:38', '2023-11-04 12:56:05'),
(441, 2, 1, 1, '2023-11-04 15:21:06', '2023-11-04 15:21:18'),
(442, 2, 1, 1, '2023-11-04 16:42:40', '2023-11-04 16:42:57'),
(443, 2, 2, 1, '2023-11-04 16:43:25', '2023-11-04 16:43:59'),
(444, 2, 1, 1, '2023-11-04 19:41:14', '2023-11-04 19:41:36'),
(445, 2, 2, 1, '2023-11-04 20:49:48', '2023-11-04 20:50:01'),
(446, 2, 3, 1, '2023-11-04 20:54:49', '2023-11-04 21:24:45'),
(447, 2, 4, 1, '2023-11-04 21:11:39', '2023-11-04 21:25:25'),
(448, 2, 1, 1, '2023-11-04 21:25:57', '2023-11-04 21:43:47'),
(449, 2, 1, 1, '2023-11-05 06:13:59', '2023-11-05 06:14:05'),
(450, 2, 1, 1, '2023-11-05 06:21:56', '2023-11-05 06:22:10'),
(451, 2, 2, 1, '2023-11-05 06:31:27', '2023-11-05 06:31:35'),
(452, 2, 3, 1, '2023-11-05 07:09:54', '2023-11-05 07:10:00'),
(453, 2, 1, 1, '2023-11-05 09:01:40', '2023-11-05 09:01:57'),
(454, 2, 2, 1, '2023-11-05 09:02:23', '2023-11-05 09:36:56'),
(455, 2, 3, 1, '2023-11-05 09:35:19', '2023-11-05 09:35:26'),
(456, 2, 1, 1, '2023-11-05 11:38:56', '2023-11-05 11:40:39'),
(457, 2, 2, 1, '2023-11-05 12:12:32', '2023-11-05 12:13:33'),
(458, 2, 3, 1, '2023-11-05 12:19:40', '2023-11-05 14:03:11'),
(459, 2, 1, 1, '2023-11-05 14:29:34', '2023-11-05 14:30:01'),
(460, 2, 1, 1, '2023-11-05 15:24:56', '2023-11-05 15:25:06'),
(461, 2, 2, 1, '2023-11-05 15:56:57', '2023-11-05 15:57:15'),
(462, 2, 3, 1, '2023-11-05 16:07:17', '2023-11-05 16:07:27'),
(463, 2, 1, 1, '2023-11-05 16:56:02', '2023-11-05 16:56:48'),
(464, 2, 1, 1, '2023-11-05 18:45:46', '2023-11-05 19:27:16'),
(465, 2, 2, 1, '2023-11-05 19:07:50', '2023-11-05 19:08:28'),
(466, 2, 3, 1, '2023-11-05 19:28:57', '2023-11-05 19:55:06'),
(467, 2, 1, 1, '2023-11-06 08:15:39', '2023-11-06 08:15:51'),
(468, 2, 2, 1, '2023-11-06 08:27:01', '2023-11-06 08:27:18'),
(469, 2, 3, 1, '2023-11-06 08:28:34', '2023-11-06 08:28:48'),
(470, 2, 4, 1, '2023-11-06 08:43:12', '2023-11-06 08:43:18'),
(471, 2, 1, 1, '2023-11-06 13:46:46', '2023-11-06 13:46:53'),
(472, 2, 1, 1, '2023-11-06 17:01:54', '2023-11-06 17:05:02'),
(473, 2, 1, 1, '2023-11-06 19:34:24', '2023-11-06 19:37:59'),
(474, 2, 1, 1, '2023-11-07 14:47:05', '2023-11-07 14:47:17'),
(475, 2, 2, 1, '2023-11-07 15:00:25', '2023-11-07 16:14:58'),
(476, 2, 3, 1, '2023-11-07 15:45:49', '2023-11-07 15:46:08'),
(477, 2, 1, 1, '2023-11-07 17:21:19', '2023-11-07 17:21:39'),
(478, 2, 2, 1, '2023-11-07 17:35:32', '2023-11-07 17:35:42'),
(479, 2, 1, 1, '2023-11-07 19:35:10', '2023-11-07 19:45:43'),
(480, 2, 1, 1, '2023-11-08 07:57:12', '2023-11-08 07:57:32'),
(481, 2, 2, 1, '2023-11-08 07:57:37', '2023-11-08 08:30:17'),
(482, 2, 3, 1, '2023-11-08 08:12:39', '2023-11-08 08:12:53'),
(483, 2, 4, 1, '2023-11-08 08:12:57', '2023-11-08 08:13:01'),
(484, 2, 1, 1, '2023-11-08 11:50:02', '2023-11-08 11:50:13'),
(485, 2, 2, 1, '2023-11-08 13:52:45', '2023-11-08 13:53:05'),
(486, 2, 1, 1, '2023-11-08 16:33:38', '2023-11-08 16:34:58'),
(487, 2, 1, 1, '2023-11-08 19:02:17', '2023-11-08 19:22:42'),
(488, 2, 2, 1, '2023-11-08 19:04:39', '2023-11-08 19:05:02'),
(489, 2, 3, 1, '2023-11-08 19:05:11', '2023-11-08 20:22:08'),
(490, 2, 3, 1, '2023-11-08 19:21:12', '2023-11-08 20:03:45'),
(491, 2, 2, 1, '2023-11-08 19:47:16', '2023-11-08 19:47:28'),
(492, 2, 1, 1, '2023-11-09 07:17:05', '2023-11-09 08:02:42'),
(493, 2, 1, 1, '2023-11-09 09:30:23', '2023-11-09 09:30:33'),
(494, 2, 2, 1, '2023-11-09 09:37:09', '2023-11-09 09:44:15'),
(495, 2, 10, 1, '2023-11-11 10:31:43', '2023-11-11 16:07:56');

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
(241, 383, 21, 1, 0, '2023-11-01 20:24:26', NULL),
(242, 383, 25, 1, 0, '2023-11-01 20:24:26', NULL),
(243, 384, 26, 1, 0, '2023-11-01 20:29:16', NULL),
(245, 386, 10, 1, 0, '2023-11-02 06:37:38', NULL),
(246, 386, 9, 1, 0, '2023-11-02 06:44:20', NULL),
(247, 387, 38, 1, 0, '2023-11-02 07:29:01', NULL),
(248, 387, 12, 1, 0, '2023-11-02 07:29:01', NULL),
(249, 394, 13, 1, 0, '2023-11-02 08:09:38', NULL),
(250, 394, 27, 1, 0, '2023-11-02 08:09:38', NULL),
(268, 400, 10, 7, 0, '2023-11-02 09:36:44', NULL),
(269, 400, 12, 3, 0, '2023-11-02 09:36:44', NULL),
(270, 400, 9, 3, 0, '2023-11-02 09:36:44', NULL),
(271, 400, 30, 2, 0, '2023-11-02 09:36:44', NULL),
(272, 400, 8, 1, 0, '2023-11-02 09:36:44', NULL),
(273, 400, 11, 6, 0, '2023-11-02 09:36:44', NULL),
(274, 400, 7, 1, 0, '2023-11-02 09:36:44', NULL),
(275, 400, 3, 1, 0, '2023-11-02 09:36:44', NULL),
(276, 400, 34, 1, 0, '2023-11-02 09:36:44', NULL),
(277, 387, 44, 1, 0, '2023-11-02 10:34:15', NULL),
(278, 402, 21, 1, 0, '2023-11-02 10:50:28', NULL),
(279, 402, 23, 1, 0, '2023-11-02 10:52:24', NULL),
(280, 403, 10, 1, 0, '2023-11-02 11:22:12', NULL),
(281, 404, 34, 1, 0, '2023-11-02 13:59:33', NULL),
(282, 405, 24, 1, 0, '2023-11-02 14:31:23', NULL),
(283, 406, 25, 1, 0, '2023-11-02 14:33:34', NULL),
(284, 407, 23, 1, 0, '2023-11-02 14:34:32', NULL),
(285, 407, 25, 1, 0, '2023-11-02 14:34:32', NULL),
(286, 407, 21, 1, 0, '2023-11-02 14:34:32', NULL),
(287, 407, 19, 1, 0, '2023-11-02 14:34:49', NULL),
(288, 407, 20, 1, 0, '2023-11-02 14:34:49', NULL),
(289, 407, 29, 1, 0, '2023-11-02 14:34:50', NULL),
(290, 408, 64, 1, 0, '2023-11-02 14:40:25', NULL),
(291, 408, 31, 1, 0, '2023-11-02 14:40:25', NULL),
(292, 408, 3, 1, 0, '2023-11-02 14:40:25', NULL),
(293, 409, 8, 1, 0, '2023-11-02 16:17:18', NULL),
(294, 409, 9, 1, 0, '2023-11-02 16:17:18', NULL),
(295, 409, 68, 1, 0, '2023-11-02 16:28:32', NULL),
(298, 411, 38, 1, 0, '2023-11-02 21:59:16', NULL),
(299, 412, 12, 1, 0, '2023-11-03 07:23:42', NULL),
(300, 412, 10, 2, 0, '2023-11-03 07:23:42', NULL),
(301, 412, 9, 3, 0, '2023-11-03 07:23:42', NULL),
(302, 413, 9, 1, 0, '2023-11-03 08:29:17', NULL),
(303, 413, 5, 1, 0, '2023-11-03 08:29:17', NULL),
(304, 414, 19, 2, 0, '2023-11-03 08:50:04', NULL),
(305, 414, 10, 2, 0, '2023-11-03 08:50:04', NULL),
(306, 415, 29, 1, 0, '2023-11-03 08:50:57', NULL),
(307, 415, 11, 1, 0, '2023-11-03 08:50:57', NULL),
(308, 415, 34, 1, 0, '2023-11-03 08:50:57', NULL),
(309, 416, 26, 1, 0, '2023-11-03 09:15:04', NULL),
(310, 416, 27, 1, 0, '2023-11-03 09:15:04', NULL),
(311, 417, 34, 1, 0, '2023-11-03 09:50:19', NULL),
(312, 418, 36, 3, 0, '2023-11-03 10:09:41', NULL),
(313, 418, 35, 1, 0, '2023-11-03 10:09:41', NULL),
(314, 418, 74, 1, 0, '2023-11-03 10:09:41', NULL),
(315, 419, 10, 1, 0, '2023-11-03 10:40:11', NULL),
(316, 418, 20, 1, 0, '2023-11-03 10:51:30', NULL),
(317, 420, 27, 1, 0, '2023-11-03 11:04:45', NULL),
(318, 420, 73, 1, 0, '2023-11-03 11:04:45', NULL),
(319, 421, 44, 1, 0, '2023-11-03 11:05:07', NULL),
(320, 421, 2, 1, 0, '2023-11-03 11:05:07', NULL),
(321, 422, 27, 1, 0, '2023-11-03 12:17:57', NULL),
(322, 422, 23, 1, 0, '2023-11-03 12:18:29', NULL),
(323, 423, 27, 1, 0, '2023-11-03 13:48:47', NULL),
(324, 423, 23, 1, 0, '2023-11-03 13:48:47', NULL),
(325, 423, 29, 1, 0, '2023-11-03 13:48:47', NULL),
(326, 423, 10, 2, 0, '2023-11-03 13:48:47', NULL),
(327, 424, 27, 1, 0, '2023-11-03 16:00:29', NULL),
(328, 424, 26, 3, 0, '2023-11-03 16:00:29', NULL),
(329, 424, 75, 1, 0, '2023-11-03 16:00:29', NULL),
(330, 424, 74, 1, 0, '2023-11-03 16:00:29', NULL),
(331, 425, 9, 2, 0, '2023-11-03 16:37:22', NULL),
(332, 426, 27, 2, 0, '2023-11-03 16:50:33', NULL),
(333, 427, 36, 1, 0, '2023-11-03 16:55:51', NULL),
(334, 428, 20, 2, 0, '2023-11-03 16:59:38', NULL),
(335, 429, 13, 1, 0, '2023-11-03 17:08:53', NULL),
(336, 429, 35, 1, 0, '2023-11-03 17:08:53', NULL),
(337, 430, 10, 3, 0, '2023-11-03 18:41:04', NULL),
(338, 430, 9, 1, 0, '2023-11-03 18:41:04', NULL),
(339, 431, 66, 1, 0, '2023-11-03 19:44:56', NULL),
(340, 431, 5, 1, 0, '2023-11-03 19:44:56', NULL),
(341, 432, 25, 3, 0, '2023-11-03 20:17:07', NULL),
(342, 432, 27, 2, 0, '2023-11-03 20:17:07', NULL),
(343, 432, 68, 1, 0, '2023-11-03 20:17:07', NULL),
(344, 432, 3, 2, 0, '2023-11-03 20:17:07', NULL),
(345, 432, 35, 1, 0, '2023-11-03 20:26:11', NULL),
(346, 433, 35, 1, 0, '2023-11-03 20:37:55', NULL),
(347, 433, 3, 2, 0, '2023-11-03 20:37:55', NULL),
(348, 433, 27, 1, 0, '2023-11-03 20:37:55', NULL),
(349, 434, 66, 1, 0, '2023-11-04 06:22:49', NULL),
(350, 434, 10, 1, 0, '2023-11-04 06:24:07', NULL),
(351, 435, 10, 2, 0, '2023-11-04 07:20:07', NULL),
(352, 436, 12, 1, 0, '2023-11-04 08:57:22', NULL),
(353, 436, 11, 1, 0, '2023-11-04 08:57:22', NULL),
(354, 437, 40, 1, 0, '2023-11-04 08:58:55', NULL),
(355, 438, 11, 1, 0, '2023-11-04 09:00:58', NULL),
(356, 438, 5, 2, 0, '2023-11-04 09:00:58', NULL),
(357, 439, 65, 1, 0, '2023-11-04 09:19:22', NULL),
(358, 439, 75, 1, 0, '2023-11-04 09:19:22', NULL),
(359, 439, 74, 1, 0, '2023-11-04 09:19:22', NULL),
(360, 439, 11, 1, 0, '2023-11-04 09:19:22', NULL),
(361, 440, 19, 1, 0, '2023-11-04 12:56:04', NULL),
(362, 440, 24, 1, 0, '2023-11-04 12:56:04', NULL),
(363, 441, 20, 1, 0, '2023-11-04 15:21:16', NULL),
(364, 442, 33, 1, 0, '2023-11-04 16:42:56', NULL),
(365, 442, 27, 1, 0, '2023-11-04 16:42:56', NULL),
(366, 443, 29, 1, 0, '2023-11-04 16:43:58', NULL),
(367, 443, 27, 1, 0, '2023-11-04 16:43:58', NULL),
(368, 444, 66, 1, 0, '2023-11-04 19:41:35', NULL),
(369, 444, 27, 1, 0, '2023-11-04 19:41:35', NULL),
(370, 444, 7, 1, 0, '2023-11-04 19:41:35', NULL),
(371, 445, 75, 1, 0, '2023-11-04 20:50:00', NULL),
(372, 446, 10, 1, 0, '2023-11-04 20:54:56', NULL),
(373, 446, 11, 2, 0, '2023-11-04 21:11:33', NULL),
(375, 447, 27, 5, 0, '2023-11-04 21:11:48', NULL),
(376, 448, 16, 4, 0, '2023-11-04 21:26:05', NULL),
(377, 449, 68, 1, 0, '2023-11-05 06:14:04', NULL),
(378, 450, 9, 2, 0, '2023-11-05 06:22:02', NULL),
(379, 451, 9, 1, 0, '2023-11-05 06:31:34', NULL),
(380, 452, 10, 1, 0, '2023-11-05 07:09:59', NULL),
(381, 453, 66, 1, 0, '2023-11-05 09:01:56', NULL),
(382, 453, 68, 1, 0, '2023-11-05 09:01:56', NULL),
(383, 453, 34, 1, 0, '2023-11-05 09:01:56', NULL),
(384, 453, 32, 1, 0, '2023-11-05 09:01:56', NULL),
(385, 454, 9, 1, 0, '2023-11-05 09:02:50', NULL),
(386, 454, 35, 5, 0, '2023-11-05 09:02:50', NULL),
(387, 454, 31, 1, 0, '2023-11-05 09:02:50', NULL),
(388, 454, 11, 1, 0, '2023-11-05 09:02:50', NULL),
(389, 454, 2, 1, 0, '2023-11-05 09:02:50', NULL),
(390, 455, 10, 2, 0, '2023-11-05 09:35:25', NULL),
(391, 454, 30, 1, 0, '2023-11-05 09:36:55', NULL),
(392, 454, 76, 1, 0, '2023-11-05 09:36:55', NULL),
(393, 456, 31, 1, 0, '2023-11-05 11:40:38', NULL),
(394, 456, 24, 1, 0, '2023-11-05 11:40:38', NULL),
(395, 457, 27, 1, 0, '2023-11-05 12:13:32', NULL),
(396, 458, 24, 1, 0, '2023-11-05 14:03:10', NULL),
(397, 459, 36, 1, 0, '2023-11-05 14:30:00', NULL),
(398, 460, 25, 1, 0, '2023-11-05 15:25:05', NULL),
(399, 461, 73, 1, 0, '2023-11-05 15:57:15', NULL),
(400, 461, 33, 1, 0, '2023-11-05 15:57:15', NULL),
(401, 462, 20, 1, 0, '2023-11-05 16:07:26', NULL),
(402, 463, 25, 1, 0, '2023-11-05 16:56:47', NULL),
(403, 464, 10, 1, 0, '2023-11-05 18:46:15', NULL),
(404, 464, 66, 2, 0, '2023-11-05 18:46:16', NULL),
(405, 464, 27, 1, 0, '2023-11-05 18:46:16', NULL),
(406, 465, 3, 2, 0, '2023-11-05 19:08:26', NULL),
(407, 465, 19, 1, 0, '2023-11-05 19:08:27', NULL),
(408, 466, 25, 1, 0, '2023-11-05 19:29:36', NULL),
(409, 466, 19, 1, 0, '2023-11-05 19:29:36', NULL),
(410, 466, 12, 1, 0, '2023-11-05 19:55:05', NULL),
(411, 467, 10, 2, 0, '2023-11-06 08:15:50', NULL),
(412, 467, 34, 1, 0, '2023-11-06 08:15:50', NULL),
(413, 467, 24, 1, 0, '2023-11-06 08:15:50', NULL),
(414, 468, 10, 1, 0, '2023-11-06 08:27:17', NULL),
(415, 469, 12, 1, 0, '2023-11-06 08:28:47', NULL),
(416, 469, 10, 1, 0, '2023-11-06 08:28:47', NULL),
(417, 469, 34, 1, 0, '2023-11-06 08:28:47', NULL),
(418, 469, 31, 1, 0, '2023-11-06 08:28:47', NULL),
(419, 469, 32, 1, 0, '2023-11-06 08:28:47', NULL),
(420, 470, 11, 2, 0, '2023-11-06 08:43:17', NULL),
(421, 471, 40, 1, 0, '2023-11-06 13:46:53', NULL),
(422, 472, 75, 1, 0, '2023-11-06 17:02:27', NULL),
(423, 472, 8, 2, 0, '2023-11-06 17:02:27', NULL),
(424, 472, 7, 1, 0, '2023-11-06 17:05:02', NULL),
(425, 473, 10, 1, 0, '2023-11-06 19:36:48', NULL),
(426, 473, 68, 1, 0, '2023-11-06 19:37:12', NULL),
(427, 473, 31, 1, 0, '2023-11-06 19:37:58', NULL),
(428, 473, 67, 1, 0, '2023-11-06 19:37:58', NULL),
(429, 474, 19, 1, 0, '2023-11-07 14:47:16', NULL),
(430, 475, 27, 3, 0, '2023-11-07 15:00:32', NULL),
(431, 476, 44, 2, 0, '2023-11-07 15:46:07', NULL),
(432, 475, 70, 1, 0, '2023-11-07 16:14:57', NULL),
(433, 477, 66, 1, 0, '2023-11-07 17:21:38', NULL),
(434, 477, 1, 1, 0, '2023-11-07 17:21:38', NULL),
(435, 477, 25, 1, 0, '2023-11-07 17:21:38', NULL),
(436, 478, 10, 1, 0, '2023-11-07 17:35:40', NULL),
(437, 479, 29, 1, 0, '2023-11-07 19:45:40', NULL),
(438, 479, 21, 1, 0, '2023-11-07 19:45:40', NULL),
(439, 479, 27, 1, 0, '2023-11-07 19:45:40', NULL),
(440, 479, 25, 1, 0, '2023-11-07 19:45:43', NULL),
(441, 480, 65, 2, 0, '2023-11-08 07:57:32', NULL),
(442, 480, 10, 1, 0, '2023-11-08 07:57:32', NULL),
(443, 481, 12, 1, 0, '2023-11-08 07:57:44', NULL),
(444, 481, 65, 1, 0, '2023-11-08 08:07:44', NULL),
(445, 482, 68, 1, 0, '2023-11-08 08:12:53', NULL),
(446, 482, 73, 1, 0, '2023-11-08 08:12:53', NULL),
(447, 482, 36, 1, 0, '2023-11-08 08:12:53', NULL),
(448, 483, 66, 1, 0, '2023-11-08 08:13:01', NULL),
(449, 481, 29, 1, 0, '2023-11-08 08:30:16', NULL),
(450, 484, 36, 1, 0, '2023-11-08 11:50:13', NULL),
(451, 485, 19, 1, 0, '2023-11-08 13:53:04', NULL),
(452, 486, 74, 1, 0, '2023-11-08 16:34:57', NULL),
(453, 486, 75, 1, 0, '2023-11-08 16:34:57', NULL),
(454, 488, 75, 1, 0, '2023-11-08 19:05:01', NULL),
(455, 488, 36, 1, 0, '2023-11-08 19:05:01', NULL),
(456, 488, 35, 1, 0, '2023-11-08 19:05:01', NULL),
(457, 488, 24, 1, 0, '2023-11-08 19:05:01', NULL),
(458, 487, 10, 3, 0, '2023-11-08 19:05:59', NULL),
(459, 487, 3, 1, 0, '2023-11-08 19:07:25', NULL),
(460, 487, 33, 1, 0, '2023-11-08 19:07:25', NULL),
(463, 490, 3, 1, 0, '2023-11-08 19:22:12', NULL),
(464, 490, 8, 1, 0, '2023-11-08 19:22:12', NULL),
(465, 487, 66, 2, 0, '2023-11-08 19:22:42', NULL),
(466, 490, 2, 2, 0, '2023-11-08 19:47:09', NULL),
(467, 491, 29, 2, 0, '2023-11-08 19:47:28', NULL),
(468, 491, 19, 1, 0, '2023-11-08 19:47:28', NULL),
(469, 489, 73, 1, 0, '2023-11-08 20:22:08', NULL),
(470, 492, 69, 1, 0, '2023-11-09 07:17:12', NULL),
(471, 492, 9, 1, 0, '2023-11-09 08:02:42', NULL),
(472, 492, 10, 3, 0, '2023-11-09 08:02:42', NULL),
(473, 492, 11, 3, 0, '2023-11-09 08:02:42', NULL),
(474, 492, 76, 1, 0, '2023-11-09 08:02:42', NULL),
(475, 492, 32, 1, 0, '2023-11-09 08:02:42', NULL),
(476, 493, 27, 1, 0, '2023-11-09 09:30:32', NULL),
(477, 493, 24, 1, 0, '2023-11-09 09:30:32', NULL),
(478, 494, 10, 1, 0, '2023-11-09 09:37:51', NULL),
(479, 494, 20, 1, 0, '2023-11-09 09:44:14', NULL),
(480, 495, 9, 1, 0, '2023-11-11 10:31:51', NULL),
(481, 495, 13, 3, 0, '2023-11-11 10:31:52', NULL),
(482, 495, 10, 3, 0, '2023-11-11 10:31:52', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `products`
--

CREATE TABLE `products` (
  `product_id` bigint(20) UNSIGNED NOT NULL,
  `product_order` int(11) NOT NULL DEFAULT '0',
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

INSERT INTO `products` (`product_id`, `product_order`, `product_name`, `thumbnail`, `product_price`, `display_price`, `product_type`, `product_unit`, `category_id`) VALUES
(1, 0, 'Nước chanh', 'nuoc-chanh.jpg', 20000, '20k', 'tea', 'Ly', 1),
(2, 0, 'Trà lipton', 'tra-lipton.jpg', 20000, '20k', 'tea', 'Ly', 1),
(3, 0, 'Trà gừng', 'tra-gung.jpg', 20000, '20k', 'tea', 'Ly', 1),
(4, 0, 'Trà trái cây', 'tra-trai-cay.jpg', 25000, '25k', 'tea', 'Ly', 1),
(5, 0, 'Trà sen vàng', 'tra-sen-vang.jpg', 25000, '25k', 'tea', 'Ly', 1),
(6, 0, 'Trà chanh', 'tra-chanh.jpg', 25000, '25k', 'tea', 'Ly', 1),
(7, 0, 'Trà tắc xí muội', 'tra-tac-xi-muoi.jpg', 25000, '25k', 'tea', 'Ly', 1),
(8, 0, 'Trà tắc mật ong', 'tra-tac-mat-ong.jpg', 25000, '25k', 'tea', 'Ly', 1),
(9, 0, 'Cà phê đen đá', 'ca-phe-den.jpg', 20000, '20k', 'coffee', 'Ly', 1),
(10, 0, 'Cà phê sữa đá', 'ca-phe-sua.jpg', 25000, '25k', 'coffee', 'Ly', 1),
(11, 0, 'Cà phê muối', 'ca-phe-muoi.jpg', 25000, '25k', 'coffee', 'Ly', 1),
(12, 0, 'Bạc xỉu đá', 'bac-xiu.jpg', 25000, '25k', 'coffee', 'Ly', 1),
(13, 0, 'Cacao đá', 'cacao.jpg', 25000, '25k', 'coffee', 'Ly', 1),
(14, 0, 'Tiger nâu', 'tiger-nau.jpg', 20000, '20k', 'beer', 'Lon', 1),
(15, 0, 'Tiger bạc', 'tiger-bac.jpg', 22000, '22k', 'beer', 'Lon', 1),
(16, 0, 'Heniken', 'heniken.jpg', 25000, '25k', 'beer', 'Lon', 1),
(17, 0, 'Strongbow', 'strongbow.jpg', 25000, '25k', 'beer', 'Lon', 1),
(18, 0, 'Soju', 'soju.jpg', 70000, '70k', 'beer', 'Chai', 1),
(19, 0, 'Kem sầu riêng', 'kem-sau-rieng.jpg', 25000, '25k', 'cream', 'Ly', 1),
(20, 0, 'Kem dâu tây', 'kem-dau-tay.jpg', 25000, '25k', 'cream', 'Ly', 1),
(21, 0, 'Kem vanni', 'kem-vanni.jpg', 25000, '25k', 'cream', 'Ly', 1),
(22, 0, 'Kem yogurt', 'kem-yogurt.jpg', 25000, '25k', 'cream', 'Ly', 1),
(23, 0, 'Kem trà xanh', 'kem-tra-xanh.jpg', 25000, '25k', 'cream', 'Ly', 1),
(24, 0, 'Kem dưa lưới', 'kem-dua-luoi.jpg', 25000, '25k', 'cream', 'Ly', 1),
(25, 0, 'Kem socola', 'kem-socola.jpg', 25000, '25k', 'cream', 'Ly', 1),
(26, 0, 'Kem mít', 'kem-mit.jpg', 25000, '25k', 'cream', 'Ly', 1),
(27, 0, 'Kem trái cây', 'kem-trai-cay.jpg', 25000, '25k', 'cream', 'Ly', 1),
(29, 0, 'Kem caramels hạt điều', 'kem-hat-dieu.jpg', 25000, '25k', 'cream', 'Ly', 1),
(30, 0, 'Nước ép ổi', 'nuoc-ep-oi.jpg', 25000, '25k', 'juice', 'Ly', 1),
(31, 0, 'Nước ép táo', 'nuoc-ep-tao.jpg', 25000, '25k', 'juice', 'Ly', 1),
(32, 0, 'Nước ép cà rốt', 'nuoc-ep-ca-rot.jpg', 25000, '25k', 'juice', 'Ly', 1),
(33, 0, 'Nước ép cam', 'nuoc-ep-cam.jpg', 25000, '25k', 'juice', 'Ly', 1),
(34, 0, 'Nước ép thơm', 'nuoc-ep-thom.jpg', 25000, '25k', 'juice', 'Ly', 1),
(35, 0, 'Nước ép dưa hấu', 'nuoc-ep-dua-hau.jpg', 25000, '25k', 'juice', 'Ly', 1),
(36, 0, 'Nước ép mix', 'nuoc-ep-mix.jpg', 25000, '25k', 'juice', 'Ly', 1),
(37, 0, 'Nước suối', 'nuoc-suoi.jpg', 10000, '10k', 'soda', 'Chai', 1),
(38, 0, 'Cocacola', 'cocacola.jpg', 15000, '15k', 'soda', 'Lon', 1),
(39, 0, 'Pepsi', 'pepsi.jpg', 15000, '15k', 'soda', 'Lon', 1),
(40, 0, 'Sting', 'string.jpg', 15000, '15k', 'soda', 'Lon', 1),
(42, 0, 'Cam Twister', 'cam-twister.jpg', 15000, '15k', 'soda', 'Chai', 1),
(43, 0, '7UP', '7up.jpg', 15000, '15k', 'soda', 'Lon', 1),
(44, 0, 'Redbull', 'redbull.jpg', 20000, '20k', 'soda', 'Lon', 1),
(45, 0, 'Heo rừng', 'heo-rung.jpg', 250000, '250k', 'forest', 'Phần', 2),
(46, 0, 'Chồn', 'chon.jpg', 250000, '250k', 'forest', 'Phần', 2),
(47, 0, 'Nhím', 'nhim.jpg', 250000, '250k', 'forest', 'Phần', 2),
(49, 0, 'Cá cam', 'ca-cam.jpg', 200000, '200k', 'sea', 'Phần', 2),
(50, 0, 'Sò nướng', 'so-nuong.jpg', 200000, '200k', 'sea', 'Phần', 2),
(51, 0, 'Cua', 'cua.jpg', 200000, '200k', 'sea', 'Phần', 2),
(52, 0, 'Ghẹ', 'ghe.jpg', 200000, '200k', 'sea', 'Phần', 2),
(53, 0, 'Nghêu', 'ngheu.jpg', 200000, '200k', 'sea', 'Phần', 2),
(54, 0, 'Mực', 'muc.jpg', 200000, '200k', 'sea', 'Phần', 2),
(56, 0, 'Combo BBQ', 'combo-bbq.jpg', 339000, '339k', 'combo', 'Phần', 2),
(57, 1, 'Cà chua', 'ca-chua.jpg', 15000, '15k', 'vegetable', 'Phần', 2),
(58, 1, 'Xa lách', 'xa-lach.jpg', 10000, '10k', 'vegetable', 'Phần', 2),
(59, 1, 'Cà tím', 'ca-tim.jpg', 15000, '15k', 'vegetable', 'Phần', 2),
(60, 1, 'Dưa leo', 'dua-leo.jpg', 15000, '15k', 'vegetable', 'Phần', 2),
(61, 1, 'Bí ngòi', 'bi-ngoi.jpg', 15000, '15k', 'vegetable', 'Phần', 2),
(62, 1, 'Đậu bắp', 'dau-bap.jpg', 10000, '10k', 'vegetable', 'Phần', 2),
(63, 0, 'Rượi vang chile', 'ruoi-vang-chile.jpg', 400000, '400k', 'beer', 'Chai', 1),
(64, 0, 'Nước ép cà chua', 'nuoc-ep-ca-chua.jpg', 25000, '25k', 'juice', 'Ly', 1),
(65, 0, 'Cà phê đen nóng', 'ca-phe-den-nong.jpg', 20000, '20k', 'coffee', 'Ly', 1),
(66, 0, 'Cà phê sữa nóng', 'ca-phe-sua-nong.jpg', 25000, '25k', 'coffee', 'Ly', 1),
(67, 0, 'Bạc xỉu nóng', 'bac-xiu-nong.jpg', 25000, '25k', 'coffee', 'Ly', 1),
(68, 0, 'Cacao nóng', 'cacao-nong.jpg', 25000, '25k', 'coffee', 'Ly', 1),
(69, 0, 'Nước chanh (Đá)', 'nuoc-chanh-da.jpg', 20000, '20k', 'tea', 'Ly', 1),
(70, 0, 'Trà lipton (Đá)', 'tra-lipton-da.jpg', 20000, '20k', 'tea', 'Ly', 1),
(71, 0, 'Trà gừng (Đá)', 'tra-gung-da.jpg', 20000, '20k', 'tea', 'Ly', 1),
(72, 0, 'Trà trái cây (Đá)', 'tra-trai-cay-da.jpg', 25000, '25k', 'tea', 'Ly', 1),
(73, 0, 'Trà sen vàng (Đá)', 'tra-sen-vang-da.jpg', 25000, '25k', 'tea', 'Ly', 1),
(74, 0, 'Trà chanh (Đá)', 'tra-chanh-da.jpg', 25000, '25k', 'tea', 'Ly', 1),
(75, 0, 'Trà tắc xí muội (Đá)', 'tra-tac-xi-muoi-da.jpg', 25000, '25k', 'tea', 'Ly', 1),
(76, 0, 'Trà tắc mật ong (Đá)', 'tra-tac-mat-ong-da.jpg', 25000, '25k', 'tea', 'Ly', 1),
(77, 0, 'Phí tham quan chụp ảnh vườn hoa', 'ticket.jpg', 15000, '15k', 'ticket', 'Vé', 3),
(78, 0, 'Cá hộp + Xíu mại + Trứng ốp la', 'breakfast.jpg', 35000, '35k', 'breakfast', 'Phần', 4),
(79, 0, 'Sườn bò', 'suon-bo-bbq.jpg', 180000, '180k', 'beef', 'Phần', 2),
(80, 0, 'Bò miếng', 'bo-mieng-bbq.jpg', 140000, '140k', 'beef', 'Phần', 2),
(81, 0, 'Xiên que', 'xien-que-bbq.jpg', 100000, '100k', 'beef', 'Phần', 2),
(82, 0, 'Xúc xích đức', 'xuc-xich-duc-bbq.jpg', 60000, '60k', 'beef', 'Phần', 2),
(84, 0, 'Tôm sú', 'tom-su-bbq.jpg', 100000, '100k', 'sea', 'Phần', 2),
(85, 0, 'Bò cuộn nấm kim châm', 'bo-cuon-nam-kim-cham-bbq.jpg', 100000, '100k', 'beef', 'Phần', 2),
(86, 0, 'Rau củ các loại', 'rau-cu-bbq.jpg', 70000, '70k', 'vegetable', 'Phần', 2);

-- --------------------------------------------------------

--
-- Table structure for table `stores`
--

CREATE TABLE `stores` (
  `store_id` bigint(20) NOT NULL,
  `product_id` bigint(20) UNSIGNED NOT NULL,
  `store_quantity` int(11) NOT NULL DEFAULT '0',
  `store_quantitative` int(11) NOT NULL DEFAULT '0',
  `store_price` double UNSIGNED NOT NULL DEFAULT '0',
  `store_unit` varchar(20) NOT NULL DEFAULT '',
  `created_at` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

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
(1, 'b1', 'Bàn 01', 1),
(2, 'b2', 'Bàn 02', 1),
(3, 'b3', 'Bàn 03', 0),
(4, 'b4', 'Bàn 04', 0),
(5, 'b5', 'Bàn 05', 0),
(6, 'b6', 'Bàn 06', 0),
(7, 'b7', 'Bàn 07', 0),
(8, 'b8', 'Bàn 08', 0),
(9, 'b9', 'Bàn 09', 0),
(10, 'b10', 'Bàn 10', 1),
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
-- Indexes for table `bbqs`
--
ALTER TABLE `bbqs`
  ADD PRIMARY KEY (`bbq_id`);

--
-- Indexes for table `bbq_product`
--
ALTER TABLE `bbq_product`
  ADD PRIMARY KEY (`id`);

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
-- Indexes for table `stores`
--
ALTER TABLE `stores`
  ADD PRIMARY KEY (`store_id`);

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
-- AUTO_INCREMENT for table `bbqs`
--
ALTER TABLE `bbqs`
  MODIFY `bbq_id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `bbq_product`
--
ALTER TABLE `bbq_product`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `categories`
--
ALTER TABLE `categories`
  MODIFY `category_id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `customers`
--
ALTER TABLE `customers`
  MODIFY `customer_id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=413;

--
-- AUTO_INCREMENT for table `discounts`
--
ALTER TABLE `discounts`
  MODIFY `discount_id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `orders`
--
ALTER TABLE `orders`
  MODIFY `order_id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=496;

--
-- AUTO_INCREMENT for table `order_detail`
--
ALTER TABLE `order_detail`
  MODIFY `detail_id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=483;

--
-- AUTO_INCREMENT for table `products`
--
ALTER TABLE `products`
  MODIFY `product_id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=87;

--
-- AUTO_INCREMENT for table `stores`
--
ALTER TABLE `stores`
  MODIFY `store_id` bigint(20) NOT NULL AUTO_INCREMENT;

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
