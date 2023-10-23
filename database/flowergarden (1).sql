-- phpMyAdmin SQL Dump
-- version 4.8.5
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: Oct 23, 2023 at 09:33 AM
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
(1, '0000000001', 'flower', 1, 1, '2023-10-09 08:12:27', 'new'),
(2, '0000000002', 'flower', 1, 1, '2023-10-09 08:39:20', 'new'),
(3, '0000000003', 'flower', 1, 1, '2023-10-09 08:40:39', 'ordering'),
(4, '0000000004', 'hotel', 2, 10, '2023-10-09 08:41:20', 'ordering'),
(5, '0000000005', 'flower', 1, 1, '2023-10-09 08:55:43', 'ordering'),
(6, '0000000006', 'flower', 1, 1, '2023-10-09 09:01:08', 'ordering'),
(7, '0000000007', 'hotel', 2, 20, '2023-10-09 09:26:39', 'new'),
(8, '0000000008', 'flower', 1, 7, '2023-10-09 09:28:33', 'ordering'),
(9, '0000000009', 'hotel', 2, 1, '2023-10-11 02:41:34', 'ordering'),
(10, '0000000010', 'flower', 1, 2, '2023-10-12 04:13:35', 'ordering'),
(11, '0000000011', 'flower', 1, 8, '2023-10-13 07:47:05', 'ordering'),
(12, '0000000012', 'flower', 1, 2, '2023-10-14 02:11:55', 'ordering'),
(13, '0000000013', 'flower', 1, 1, '2023-10-16 04:44:59', 'new'),
(14, '0000000014', 'flower', 1, 1, '2023-10-16 04:47:49', 'new'),
(15, '0000000015', 'flower', 1, 2, '2023-10-16 04:48:55', 'new'),
(16, '0000000016', 'flower', 1, 1, '2023-10-16 04:50:48', 'new'),
(17, '0000000017', 'flower', 1, 1, '2023-10-16 04:52:13', 'new'),
(18, '0000000018', 'flower', 1, 1, '2023-10-16 04:54:00', 'new'),
(19, '0000000019', 'hotel', 2, 2, '2023-10-16 04:54:32', 'new'),
(20, '0000000020', 'flower', 1, 3, '2023-10-16 06:36:54', 'new'),
(21, '0000000021', 'flower', 1, 1, '2023-10-16 06:38:41', 'new'),
(22, '0000000022', 'flower', 1, 1, '2023-10-16 06:40:41', 'new'),
(23, '0000000023', 'flower', 1, 1, '2023-10-16 06:40:54', 'new'),
(24, '0000000024', 'hotel', 2, 2, '2023-10-16 06:44:26', 'new'),
(25, '0000000025', 'hotel', 2, 2, '2023-10-16 06:44:26', 'new'),
(26, '0000000026', 'hotel', 2, 2, '2023-10-16 06:44:26', 'new'),
(27, '0000000027', 'hotel', 2, 2, '2023-10-16 06:44:26', 'new'),
(28, '0000000028', 'hotel', 2, 2, '2023-10-16 06:44:26', 'new'),
(29, '0000000029', 'flower', 1, 1, '2023-10-16 06:45:41', 'new'),
(30, '0000000030', 'flower', 1, 1, '2023-10-16 06:45:41', 'new'),
(31, '0000000031', 'flower', 1, 1, '2023-10-16 06:45:41', 'new'),
(32, '0000000032', 'flower', 1, 1, '2023-10-16 06:45:41', 'new'),
(33, '0000000033', 'flower', 1, 1, '2023-10-16 06:45:41', 'new'),
(34, '0000000034', 'hotel', 2, 2, '2023-10-16 06:47:56', 'new'),
(35, '0000000035', 'hotel', 2, 2, '2023-10-16 06:47:56', 'new'),
(36, '0000000036', 'hotel', 2, 2, '2023-10-16 06:47:56', 'new'),
(37, '0000000037', 'hotel', 2, 2, '2023-10-16 06:47:56', 'new'),
(38, '0000000038', 'flower', 1, 1, '2023-10-16 06:55:34', 'new'),
(39, '0000000039', 'flower', 1, 1, '2023-10-16 06:55:34', 'new'),
(40, '0000000040', 'flower', 1, 1, '2023-10-16 06:55:34', 'new'),
(41, '0000000041', 'flower', 1, 1, '2023-10-16 06:55:34', 'new'),
(42, '0000000042', 'hotel', 2, 3, '2023-10-16 07:36:36', 'new'),
(43, '0000000043', 'hotel', 2, 3, '2023-10-16 07:36:36', 'new'),
(44, '0000000044', 'hotel', 2, 3, '2023-10-16 07:36:36', 'new'),
(45, '0000000045', 'hotel', 2, 3, '2023-10-16 07:36:36', 'new'),
(46, '0000000046', 'flower', 1, 2, '2023-10-16 07:40:06', 'new'),
(47, '0000000047', 'flower', 1, 2, '2023-10-16 07:40:06', 'new'),
(48, '0000000048', 'flower', 1, 2, '2023-10-16 07:40:06', 'new'),
(49, '0000000049', 'flower', 1, 2, '2023-10-16 07:40:06', 'new'),
(50, '0000000050', 'flower', 1, 1, '2023-10-16 07:50:00', 'new'),
(51, '0000000051', 'flower', 1, 1, '2023-10-16 07:50:00', 'new'),
(52, '0000000052', 'flower', 1, 1, '2023-10-16 07:50:00', 'new'),
(53, '0000000053', 'flower', 1, 1, '2023-10-16 07:50:00', 'new'),
(54, '0000000054', 'flower', 1, 1, '2023-10-16 07:50:38', 'new'),
(55, '0000000055', 'flower', 1, 1, '2023-10-16 07:50:38', 'new'),
(56, '0000000056', 'flower', 1, 1, '2023-10-16 07:50:38', 'new'),
(57, '0000000057', 'flower', 1, 1, '2023-10-16 07:50:38', 'new'),
(58, '0000000058', 'flower', 1, 1, '2023-10-16 07:50:54', 'new'),
(59, '0000000059', 'flower', 1, 1, '2023-10-16 07:50:54', 'new'),
(60, '0000000060', 'flower', 1, 1, '2023-10-16 07:50:54', 'new'),
(61, '0000000061', 'flower', 1, 1, '2023-10-16 07:50:54', 'new'),
(62, '0000000062', 'flower', 1, 1, '2023-10-16 07:51:40', 'new'),
(63, '0000000063', 'flower', 1, 1, '2023-10-16 07:51:40', 'new'),
(64, '0000000064', 'flower', 1, 1, '2023-10-16 07:51:40', 'new'),
(65, '0000000065', 'flower', 1, 1, '2023-10-16 07:51:40', 'new'),
(66, '0000000066', 'flower', 1, 2, '2023-10-16 08:22:16', 'new'),
(67, '0000000067', 'flower', 1, 2, '2023-10-16 08:22:16', 'new'),
(68, '0000000068', 'flower', 1, 2, '2023-10-16 08:22:16', 'new'),
(69, '0000000069', 'flower', 1, 2, '2023-10-16 08:22:16', 'new'),
(70, '0000000070', 'flower', 1, 1, '2023-10-16 08:35:44', 'new'),
(71, '0000000071', 'flower', 1, 1, '2023-10-16 08:35:44', 'new'),
(72, '0000000072', 'flower', 1, 1, '2023-10-16 08:35:44', 'new'),
(73, '0000000073', 'flower', 1, 1, '2023-10-16 08:35:44', 'new'),
(74, '0000000074', 'flower', 1, 1, '2023-10-16 08:39:50', 'new'),
(75, '0000000075', 'flower', 1, 1, '2023-10-16 08:39:50', 'new'),
(76, '0000000076', 'flower', 1, 1, '2023-10-16 08:39:50', 'new'),
(77, '0000000077', 'flower', 1, 1, '2023-10-16 08:39:50', 'new'),
(78, '0000000078', 'flower', 1, 1, '2023-10-16 08:41:52', 'new'),
(79, '0000000079', 'flower', 1, 1, '2023-10-16 08:41:52', 'new'),
(80, '0000000080', 'flower', 1, 1, '2023-10-16 08:41:52', 'new'),
(81, '0000000081', 'flower', 1, 1, '2023-10-16 08:41:52', 'new'),
(82, '0000000082', 'flower', 1, 2, '2023-10-16 08:44:36', 'new'),
(83, '0000000083', 'flower', 1, 2, '2023-10-16 08:44:36', 'new'),
(84, '0000000084', 'flower', 1, 2, '2023-10-16 08:44:36', 'new'),
(85, '0000000085', 'flower', 1, 2, '2023-10-16 08:44:36', 'new'),
(86, '0000000086', 'flower', 1, 1, '2023-10-16 08:52:42', 'new'),
(87, '0000000087', 'flower', 1, 1, '2023-10-16 08:52:42', 'new'),
(88, '0000000088', 'flower', 1, 1, '2023-10-16 08:52:42', 'new'),
(89, '0000000089', 'flower', 1, 1, '2023-10-16 08:52:42', 'new'),
(90, '0000000090', 'flower', 1, 1, '2023-10-16 08:53:43', 'new'),
(91, '0000000091', 'flower', 1, 1, '2023-10-16 08:53:43', 'new'),
(92, '0000000092', 'flower', 1, 1, '2023-10-16 08:53:43', 'new'),
(93, '0000000093', 'flower', 1, 1, '2023-10-16 08:53:43', 'new'),
(94, '0000000094', 'flower', 1, 1, '2023-10-16 08:54:11', 'new'),
(95, '0000000095', 'flower', 1, 1, '2023-10-16 08:54:11', 'new'),
(96, '0000000096', 'flower', 1, 1, '2023-10-16 08:54:11', 'new'),
(97, '0000000097', 'flower', 1, 1, '2023-10-16 08:54:11', 'new'),
(98, '0000000098', 'flower', 1, 1, '2023-10-16 08:55:56', 'new'),
(99, '0000000099', 'flower', 1, 1, '2023-10-16 08:55:56', 'new'),
(100, '0000000100', 'flower', 1, 1, '2023-10-16 08:55:56', 'new'),
(101, '0000000101', 'flower', 1, 1, '2023-10-16 08:55:56', 'new'),
(102, '0000000102', 'flower', 1, 1, '2023-10-16 08:56:31', 'new'),
(103, '0000000103', 'flower', 1, 1, '2023-10-16 08:56:31', 'new'),
(104, '0000000104', 'flower', 1, 1, '2023-10-16 08:57:16', 'new'),
(105, '0000000105', 'flower', 1, 1, '2023-10-16 08:57:16', 'new'),
(106, '0000000106', 'flower', 1, 1, '2023-10-16 08:57:16', 'new'),
(107, '0000000107', 'flower', 1, 1, '2023-10-16 08:57:16', 'new'),
(108, '0000000108', 'flower', 1, 1, '2023-10-16 08:58:22', 'new'),
(109, '0000000109', 'flower', 1, 1, '2023-10-16 08:58:22', 'new'),
(110, '0000000110', 'flower', 1, 1, '2023-10-16 08:58:22', 'new'),
(111, '0000000111', 'flower', 1, 1, '2023-10-16 08:58:22', 'new'),
(112, '0000000112', 'flower', 1, 1, '2023-10-16 08:59:02', 'new'),
(113, '0000000113', 'flower', 1, 1, '2023-10-16 08:59:02', 'new'),
(114, '0000000114', 'flower', 1, 1, '2023-10-16 08:59:02', 'new'),
(115, '0000000115', 'flower', 1, 1, '2023-10-16 08:59:02', 'new'),
(116, '0000000116', 'flower', 1, 1, '2023-10-16 08:59:24', 'new'),
(117, '0000000117', 'flower', 1, 1, '2023-10-16 08:59:24', 'new'),
(118, '0000000118', 'flower', 1, 1, '2023-10-16 08:59:24', 'new'),
(119, '0000000119', 'flower', 1, 1, '2023-10-16 08:59:24', 'new'),
(120, '0000000120', 'flower', 1, 1, '2023-10-16 09:01:11', 'new'),
(121, '0000000121', 'flower', 1, 1, '2023-10-16 09:01:11', 'new'),
(122, '0000000122', 'flower', 1, 1, '2023-10-16 09:01:11', 'new'),
(123, '0000000123', 'flower', 1, 1, '2023-10-16 09:01:11', 'new'),
(124, '0000000124', 'flower', 1, 1, '2023-10-16 09:01:24', 'new'),
(125, '0000000125', 'flower', 1, 1, '2023-10-16 09:01:24', 'new'),
(126, '0000000126', 'flower', 1, 1, '2023-10-16 09:01:24', 'new'),
(127, '0000000127', 'flower', 1, 1, '2023-10-16 09:01:24', 'new'),
(128, '0000000128', 'flower', 1, 1, '2023-10-16 09:28:54', 'new'),
(129, '0000000129', 'flower', 1, 1, '2023-10-16 09:28:54', 'new'),
(130, '0000000130', 'flower', 1, 1, '2023-10-16 09:29:06', 'new'),
(131, '0000000131', 'flower', 1, 1, '2023-10-16 09:29:06', 'new'),
(132, '0000000132', 'flower', 1, 1, '2023-10-16 09:29:06', 'new'),
(133, '0000000133', 'flower', 1, 1, '2023-10-16 09:29:06', 'new'),
(134, '0000000134', 'flower', 1, 1, '2023-10-16 09:29:45', 'new'),
(135, '0000000135', 'flower', 1, 1, '2023-10-16 09:29:45', 'new'),
(136, '0000000136', 'flower', 1, 1, '2023-10-16 09:29:45', 'new'),
(137, '0000000137', 'flower', 1, 1, '2023-10-16 09:29:45', 'new'),
(138, '0000000138', 'flower', 1, 1, '2023-10-16 09:31:44', 'new'),
(139, '0000000139', 'flower', 1, 1, '2023-10-16 09:31:44', 'new'),
(140, '0000000140', 'flower', 1, 1, '2023-10-16 09:31:44', 'new'),
(141, '0000000141', 'flower', 1, 1, '2023-10-16 09:31:44', 'new'),
(142, '0000000142', 'flower', 1, 1, '2023-10-16 09:35:38', 'new'),
(143, '0000000143', 'flower', 1, 1, '2023-10-16 09:35:38', 'new'),
(144, '0000000144', 'flower', 1, 1, '2023-10-16 09:35:38', 'new'),
(145, '0000000145', 'flower', 1, 1, '2023-10-16 09:35:38', 'new'),
(146, '0000000146', 'flower', 1, 1, '2023-10-16 09:36:39', 'new'),
(147, '0000000147', 'flower', 1, 1, '2023-10-16 09:36:39', 'new'),
(148, '0000000148', 'flower', 1, 1, '2023-10-16 09:36:39', 'new'),
(149, '0000000149', 'flower', 1, 1, '2023-10-16 09:36:39', 'new'),
(150, '0000000150', 'flower', 1, 1, '2023-10-17 00:49:04', 'new'),
(151, '0000000151', 'flower', 1, 1, '2023-10-17 00:49:04', 'new'),
(152, '0000000152', 'flower', 1, 1, '2023-10-17 00:49:04', 'new'),
(153, '0000000153', 'flower', 1, 1, '2023-10-17 00:49:04', 'new'),
(154, '0000000154', 'flower', 1, 1, '2023-10-17 00:50:07', 'new'),
(155, '0000000155', 'flower', 1, 1, '2023-10-17 00:50:07', 'new'),
(156, '0000000156', 'flower', 1, 1, '2023-10-17 00:50:07', 'new'),
(157, '0000000157', 'flower', 1, 1, '2023-10-17 00:50:07', 'new'),
(158, '0000000158', 'flower', 1, 1, '2023-10-17 00:59:00', 'new'),
(159, '0000000159', 'flower', 1, 1, '2023-10-17 00:59:00', 'new'),
(160, '0000000160', 'flower', 1, 1, '2023-10-17 00:59:00', 'new'),
(161, '0000000161', 'flower', 1, 1, '2023-10-17 00:59:00', 'new'),
(162, '0000000162', 'flower', 1, 1, '2023-10-17 01:00:36', 'new'),
(163, '0000000163', 'flower', 1, 1, '2023-10-17 01:00:36', 'new'),
(164, '0000000164', 'flower', 1, 1, '2023-10-17 01:00:36', 'new'),
(165, '0000000165', 'flower', 1, 1, '2023-10-17 01:00:36', 'new'),
(166, '0000000166', 'flower', 1, 1, '2023-10-17 01:05:51', 'new'),
(167, '0000000167', 'flower', 1, 1, '2023-10-17 01:05:51', 'new'),
(168, '0000000168', 'flower', 1, 1, '2023-10-17 01:05:51', 'new'),
(169, '0000000169', 'flower', 1, 1, '2023-10-17 01:05:51', 'new'),
(170, '0000000170', 'flower', 1, 1, '2023-10-17 01:08:04', 'new'),
(171, '0000000171', 'flower', 1, 1, '2023-10-17 01:08:04', 'new'),
(172, '0000000172', 'flower', 1, 1, '2023-10-17 01:08:04', 'new'),
(173, '0000000173', 'flower', 1, 1, '2023-10-17 01:08:04', 'new'),
(174, '0000000174', 'flower', 1, 1, '2023-10-17 01:09:12', 'new'),
(175, '0000000175', 'flower', 1, 1, '2023-10-17 01:09:12', 'new'),
(176, '0000000176', 'flower', 1, 1, '2023-10-17 01:09:12', 'new'),
(177, '0000000177', 'flower', 1, 1, '2023-10-17 01:09:12', 'new'),
(178, '0000000178', 'flower', 1, 1, '2023-10-17 01:10:20', 'new'),
(179, '0000000179', 'flower', 1, 1, '2023-10-17 01:10:21', 'new'),
(180, '0000000180', 'flower', 1, 1, '2023-10-17 01:10:20', 'new'),
(181, '0000000181', 'flower', 1, 1, '2023-10-17 01:10:21', 'new'),
(182, '0000000182', 'flower', 1, 1, '2023-10-17 01:13:19', 'new'),
(183, '0000000183', 'flower', 1, 1, '2023-10-17 01:13:19', 'new'),
(184, '0000000184', 'flower', 1, 1, '2023-10-17 01:13:19', 'new'),
(185, '0000000185', 'flower', 1, 1, '2023-10-17 01:13:19', 'new'),
(186, '0000000186', 'flower', 1, 1, '2023-10-17 01:13:44', 'new'),
(187, '0000000187', 'flower', 1, 1, '2023-10-17 01:13:44', 'new'),
(188, '0000000188', 'flower', 1, 1, '2023-10-17 01:13:44', 'new'),
(189, '0000000189', 'flower', 1, 1, '2023-10-17 01:13:44', 'new'),
(190, '0000000190', 'flower', 1, 1, '2023-10-17 01:42:30', 'new'),
(191, '0000000191', 'flower', 1, 1, '2023-10-17 01:42:30', 'new'),
(192, '0000000192', 'flower', 1, 1, '2023-10-17 01:42:30', 'new'),
(193, '0000000193', 'flower', 1, 1, '2023-10-17 01:42:30', 'new'),
(194, '0000000194', 'flower', 1, 1, '2023-10-17 01:43:12', 'new'),
(195, '0000000195', 'flower', 1, 1, '2023-10-17 01:43:12', 'new'),
(196, '0000000196', 'flower', 1, 1, '2023-10-17 01:43:12', 'new'),
(197, '0000000197', 'flower', 1, 1, '2023-10-17 01:43:12', 'new'),
(198, '0000000198', 'flower', 1, 1, '2023-10-17 01:46:48', 'new'),
(199, '0000000199', 'flower', 1, 1, '2023-10-17 01:46:48', 'new'),
(200, '0000000200', 'flower', 1, 1, '2023-10-17 01:46:48', 'new'),
(201, '0000000201', 'flower', 1, 1, '2023-10-17 01:46:48', 'new'),
(202, '0000000202', 'flower', 1, 1, '2023-10-17 01:55:10', 'new'),
(203, '0000000203', 'flower', 1, 1, '2023-10-17 01:55:10', 'new'),
(204, '0000000204', 'flower', 1, 1, '2023-10-17 01:55:18', 'new'),
(205, '0000000205', 'flower', 1, 1, '2023-10-17 01:55:18', 'new'),
(206, '0000000206', 'flower', 1, 1, '2023-10-17 01:55:32', 'ordering'),
(207, '0000000207', 'flower', 1, 1, '2023-10-17 01:55:32', 'new'),
(208, '0000000208', 'flower', 1, 1, '2023-10-17 01:58:34', 'new'),
(209, '0000000209', 'flower', 1, 1, '2023-10-17 01:58:34', 'new'),
(210, '0000000210', 'flower', 1, 1, '2023-10-17 01:58:34', 'new'),
(211, '0000000211', 'flower', 1, 1, '2023-10-17 01:58:34', 'new'),
(212, '0000000212', 'flower', 1, 1, '2023-10-17 02:01:38', 'new'),
(213, '0000000213', 'flower', 1, 1, '2023-10-17 02:01:51', 'ordering'),
(214, '0000000214', 'flower', 1, 1, '2023-10-17 02:03:48', 'ordering'),
(215, '0000000215', 'flower', 1, 1, '2023-10-17 02:03:55', 'ordering'),
(216, '0000000216', 'flower', 1, 1, '2023-10-17 02:04:06', 'ordering'),
(217, '0000000217', 'flower', 1, 1, '2023-10-17 02:04:17', 'ordering'),
(218, '0000000218', 'flower', 1, 1, '2023-10-17 02:04:45', 'ordering'),
(219, '0000000219', 'flower', 1, 1, '2023-10-17 02:05:32', 'ordering'),
(220, '0000000220', 'flower', 1, 1, '2023-10-17 02:05:35', 'ordering'),
(221, '0000000221', 'flower', 1, 1, '2023-10-17 02:13:14', 'ordering'),
(222, '0000000222', 'flower', 1, 1, '2023-10-17 02:35:44', 'ordering'),
(223, '0000000223', 'flower', 1, 1, '2023-10-17 02:48:51', 'ordering'),
(224, '0000000224', 'flower', 1, 1, '2023-10-17 04:51:11', 'ordering'),
(225, '0000000225', 'flower', 1, 1, '2023-10-17 05:28:49', 'ordering'),
(226, '0000000226', 'flower', 1, 1, '2023-10-17 06:20:17', 'ordering'),
(227, '0000000227', 'flower', 1, 1, '2023-10-17 06:20:31', 'ordering'),
(228, '0000000228', 'flower', 1, 1, '2023-10-17 07:14:29', 'ordering'),
(229, '0000000229', 'flower', 1, 10, '2023-10-18 07:53:41', 'ordering'),
(230, '0000000230', 'flower', 1, 10, '2023-10-18 07:55:44', 'ordering'),
(231, '0000000231', 'flower', 1, 1, '2023-10-20 02:37:30', 'processing'),
(232, '0000000232', 'flower', 1, 2, '2023-10-20 03:29:08', 'new'),
(233, '0000000233', 'hotel', 2, 1, '2023-10-20 08:48:54', 'new');

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

--
-- Dumping data for table `discounts`
--

INSERT INTO `discounts` (`discount_id`, `customer_id`, `product_id`, `quantity`) VALUES
(18, 228, 1, 0),
(19, 227, 4, 0),
(20, 231, 1, 0),
(21, 230, 1, 0),
(22, 230, 3, 0),
(23, 230, 4, 0),
(24, 230, 2, 0);

-- --------------------------------------------------------

--
-- Table structure for table `orders`
--

CREATE TABLE `orders` (
  `order_id` bigint(20) UNSIGNED NOT NULL,
  `product_id` bigint(20) UNSIGNED NOT NULL DEFAULT '0',
  `customer_id` bigint(20) UNSIGNED NOT NULL DEFAULT '0',
  `quantity` int(6) UNSIGNED NOT NULL DEFAULT '0',
  `created_at` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `orders`
--

INSERT INTO `orders` (`order_id`, `product_id`, `customer_id`, `quantity`, `created_at`) VALUES
(245, 1, 231, 1, '2023-10-23 09:22:40'),
(246, 3, 231, 1, '2023-10-23 09:22:40'),
(247, 2, 231, 1, '2023-10-23 09:22:40'),
(248, 4, 231, 1, '2023-10-23 09:22:40'),
(249, 1, 230, 1, '2023-10-23 09:27:01'),
(250, 3, 230, 1, '2023-10-23 09:27:01'),
(251, 4, 230, 1, '2023-10-23 09:27:01'),
(252, 2, 230, 1, '2023-10-23 09:27:01');

--
-- Triggers `orders`
--
DELIMITER $$
CREATE TRIGGER `order_discount` BEFORE INSERT ON `orders` FOR EACH ROW BEGIN
DECLARE ctype VARCHAR(20) DEFAULT '';
DECLARE ptype VARCHAR(20) DEFAULT '';
DECLARE number INT(11) DEFAULT 0;
DECLARE discount INT(11) DEFAULT 0;
SELECT customer_type INTO ctype FROM customers WHERE customer_id=new.customer_id;
SELECT customer_number INTO number FROM customers WHERE customer_id=new.customer_id;
SELECT product_type INTO ptype FROM products WHERE product_id=new.product_id;
SELECT count(*) INTO discount FROM discounts WHERE customer_id=new.customer_id;
IF( ctype='flower' && ptype='water' AND discount<number )
THEN
   INSERT INTO discounts (customer_id, product_id) VALUES (new.customer_id, new.product_id);
END IF;
END
$$
DELIMITER ;

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
(1, 'Nước chanh', 15000, 0, 'water', 'Ly', 7),
(2, 'Trà lipton', 15000, 0, 'water', 'Ly', 7),
(3, 'Trà gừng', 15000, 0, 'water', 'Ly', 7),
(4, 'Trà đào', 15000, 0, 'water', 'Ly', 7),
(5, 'Heo rừng', 200000, 0, 'food', 'Phần', 41),
(6, 'Chồn', 200000, 0, 'food', 'Phần', 45),
(7, 'Nhím', 200000, 0, 'food', 'Phần', 45);

-- --------------------------------------------------------

--
-- Table structure for table `tickets`
--

CREATE TABLE `tickets` (
  `ticket_id` int(11) UNSIGNED NOT NULL,
  `ticket_key` varchar(20) NOT NULL DEFAULT '',
  `ticket_name` varchar(20) NOT NULL DEFAULT '',
  `ticket_price` double UNSIGNED NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `tickets`
--

INSERT INTO `tickets` (`ticket_id`, `ticket_key`, `ticket_name`, `ticket_price`) VALUES
(1, 'flower', 'Khách Vường hoa', 45000),
(2, 'hotel', 'Khách Khách Sạn', 0);

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
  ADD KEY `product_id` (`product_id`,`customer_id`);

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
  MODIFY `customer_id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=234;

--
-- AUTO_INCREMENT for table `discounts`
--
ALTER TABLE `discounts`
  MODIFY `discount_id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=25;

--
-- AUTO_INCREMENT for table `orders`
--
ALTER TABLE `orders`
  MODIFY `order_id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=253;

--
-- AUTO_INCREMENT for table `products`
--
ALTER TABLE `products`
  MODIFY `product_id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `tickets`
--
ALTER TABLE `tickets`
  MODIFY `ticket_id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
