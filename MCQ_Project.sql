-- phpMyAdmin SQL Dump
-- version 4.5.2
-- http://www.phpmyadmin.net
--
-- Host: localhost
-- Generation Time: Nov 02, 2023 at 11:27 PM
-- Server version: 10.1.13-MariaDB
-- PHP Version: 5.5.35

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `MCQ_Project`
--

-- --------------------------------------------------------

--
-- Table structure for table `account_table`
--

CREATE TABLE `account_table` (
  `id` bigint(20) NOT NULL,
  `email_id` varchar(255) DEFAULT NULL,
  `level` int(11) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `phone` varchar(255) DEFAULT NULL,
  `role` varchar(255) DEFAULT NULL,
  `user_name` varchar(255) DEFAULT NULL,
  `create_time` varchar(255) DEFAULT NULL,
  `update_time` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `account_table`
--

INSERT INTO `account_table` (`id`, `email_id`, `level`, `password`, `phone`, `role`, `user_name`, `create_time`, `update_time`) VALUES
(1, 'user01@gmail.com', 30, '123', '1234567890', 'user', 'User 01', NULL, '2023-11-02 16:38:15'),
(2, 'admin@gmail.com', 755, '1234', '1234567890', 'admin', 'admin', NULL, '2023-10-26 15:27:02'),
(3, 'super@gmail.com', 777, '1234', '312-213-2576', 'super', 'super Admin', NULL, '2023-10-26 15:26:35'),
(10, 'user02@gmail.com', 15, '1234', '0123456789', 'user', 'user02', NULL, '2023-10-27 16:08:39'),
(11, 'user03@gmail.com', 5, '1234', '0123456789', 'user', 'user03', NULL, NULL),
(12, 'user04@gmail.com', 5, '1234', '0123456789', 'user', 'user04', NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `question_table`
--

CREATE TABLE `question_table` (
  `id` bigint(20) NOT NULL,
  `answer` varchar(255) DEFAULT NULL,
  `body` varchar(255) DEFAULT NULL,
  `correct` bigint(20) DEFAULT NULL,
  `create_time` varchar(255) DEFAULT NULL,
  `point` int(11) DEFAULT NULL,
  `question` varchar(255) DEFAULT NULL,
  `style` varchar(255) DEFAULT NULL,
  `update_time` varchar(255) DEFAULT NULL,
  `wrong` bigint(20) DEFAULT NULL,
  `time` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `question_table`
--

INSERT INTO `question_table` (`id`, `answer`, `body`, `correct`, `create_time`, `point`, `question`, `style`, `update_time`, `wrong`, `time`) VALUES
(2, 'WyJDLiB0ZXN0IiwiQi50ZXN0Il0=', 'WyJBLiB0ZXN0IiwiQy4gdGVzdCIsIkIudGVzdCJd', NULL, '2023-10-24 15:13:26', 2, 'This is a Test Question2', 'Multiple Choice', '2023-10-24 15:13:26', NULL, 4),
(3, 'Answer', '', NULL, '2023-10-26 02:47:03', 3, 'This is a short Answer Question.\nThere are MULTIPLE lines.\nType your answer in following <textarea>', 'Short Answer', '2023-10-26 02:47:03', NULL, 2),
(5, 'WyJBLnRlc3QiXQ==', 'WyJBLnRlc3QiLCJDLnRleHQiXQ==', NULL, '2023-10-27 13:40:42', 2, 'This is a new Question', 'Single Choice', '2023-10-27 13:40:42', NULL, 1),
(6, 'WyJBIEludCIsIkIgZmxvYXQiLCJFIENsaXAiXQ==', 'WyJBIEludCIsIkIgZmxvYXQiLCJDIERvdWJsZSIsIkQgU3RyaW5nIiwiRSBDbGlwIl0=', NULL, '2023-10-27 14:34:52', 5, 'Which are AviSynth primitive data types', 'Multiple Choice', '2023-10-27 14:34:52', NULL, 3),
(7, 'WyJCIGZsb2F0Il0=', 'WyJBLnRlc3QiLCJCIGZsb2F0Il0=', NULL, '2023-10-27 16:04:05', 4, 'this is a question', 'Single Choice', '2023-10-27 16:04:05', NULL, 1),
(8, 'WyJBLnRlc3QiLCJCIGZsb2F0Il0=', 'WyJBLnRlc3QiLCJCIGZsb2F0IiwiQyBEb3VibGUiXQ==', NULL, '2023-10-27 16:05:20', 5, 'test', 'Multiple Choice', '2023-10-27 16:05:20', NULL, 6),
(9, 'WyJCLnRlc3QiXQ==', 'WyJBLiBUZXN0IiwiQi50ZXN0Il0=', NULL, '2023-10-31 16:20:17', 2, 'This is test Question', 'Single Choice', '2023-10-31 16:20:17', NULL, 2),
(11, 'WyJBLnRlc3QiXQ==', 'WyJBLnRlc3QiLCJCLnRlc3QiXQ==', NULL, '2023-11-01 04:06:19', 3, 'test question', 'Single Choice', '2023-11-01 04:06:19', NULL, 10),
(12, 'This is a test Question', '', NULL, '2023-11-01 05:26:47', 20, 'This is a test Question', 'Short Answer', '2023-11-01 05:26:47', NULL, 2),
(14, 'WyIwIiwiMSJd', 'WyIwIiwiMSIsIjIiXQ==', NULL, '2023-11-01 05:31:08', 2, 'this is a multiple question', 'Multiple Choice', '2023-11-01 05:31:08', NULL, 10),
(15, 'WyIxIl0=', 'WyIwIiwiMSIsIjIiXQ==', NULL, '2023-11-01 05:35:12', 2, 'test', 'Single Choice', '2023-11-01 05:35:12', NULL, 1),
(17, 'WyIxIl0=', 'WyIwIiwiMSIsIjIiXQ==', NULL, '2023-11-02 16:30:06', 2, 'question', 'Single Choice', '2023-11-02 16:30:06', NULL, 1),
(18, 'WyIwIiwiMSJd', 'WyIwIiwiMSIsIjIiXQ==', NULL, '2023-11-02 16:35:38', 1, 'question', 'Multiple Choice', '2023-11-02 16:35:38', NULL, 5);

-- --------------------------------------------------------

--
-- Table structure for table `question_to_tast_table`
--

CREATE TABLE `question_to_tast_table` (
  `id` bigint(20) NOT NULL,
  `question_id` bigint(20) DEFAULT NULL,
  `test_id` bigint(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `question_to_tast_table`
--

INSERT INTO `question_to_tast_table` (`id`, `question_id`, `test_id`) VALUES
(4, 3, 3),
(5, 2, 4),
(7, 3, 5),
(9, 2, 2),
(10, 5, 2),
(11, 6, 2),
(18, 3, 2),
(21, 7, 16),
(24, 9, 2),
(26, 11, 16),
(27, 5, 16),
(28, 2, 16),
(29, 14, 16),
(30, 2, 13),
(31, 3, 13),
(33, 8, 2),
(34, 11, 2);

-- --------------------------------------------------------

--
-- Table structure for table `test_result_table`
--

CREATE TABLE `test_result_table` (
  `id` bigint(20) NOT NULL,
  `end_time` varchar(255) DEFAULT NULL,
  `points` int(11) DEFAULT NULL,
  `question_list` varchar(10000) DEFAULT NULL,
  `start_time` varchar(255) DEFAULT NULL,
  `test_topic` varchar(255) DEFAULT NULL,
  `test_id` bigint(20) DEFAULT NULL,
  `total_points` int(11) DEFAULT NULL,
  `test_name` varchar(255) DEFAULT NULL,
  `user_answer_list` varchar(10000) DEFAULT NULL,
  `user_id` bigint(20) DEFAULT NULL,
  `test_level` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `test_result_table`
--

INSERT INTO `test_result_table` (`id`, `end_time`, `points`, `question_list`, `start_time`, `test_topic`, `test_id`, `total_points`, `test_name`, `user_answer_list`, `user_id`, `test_level`) VALUES
(1, '[SystemTime:2023-11-02 13:47:40][ClientTime: 2023-11-02 13:47:40]\n', 9, '[ {\n  "id" : 2,\n  "question" : "This is a Test Question2",\n  "style" : "Multiple Choice",\n  "body" : "WyJBLiB0ZXN0IiwiQy4gdGVzdCIsIkIudGVzdCJd",\n  "answer" : "WyJDLiB0ZXN0IiwiQi50ZXN0Il0=",\n  "correct" : null,\n  "wrong" : null,\n  "point" : 2,\n  "time" : 4,\n  "createTime" : "2023-10-24 15:13:26",\n  "updateTime" : "2023-10-24 15:13:26"\n}, {\n  "id" : 5,\n  "question" : "This is a new Question",\n  "style" : "Single Choice",\n  "body" : "WyJBLnRlc3QiLCJDLnRleHQiXQ==",\n  "answer" : "WyJBLnRlc3QiXQ==",\n  "correct" : null,\n  "wrong" : null,\n  "point" : 2,\n  "time" : 1,\n  "createTime" : "2023-10-27 13:40:42",\n  "updateTime" : "2023-10-27 13:40:42"\n}, {\n  "id" : 6,\n  "question" : "Which are AviSynth primitive data types",\n  "style" : "Multiple Choice",\n  "body" : "WyJBIEludCIsIkIgZmxvYXQiLCJDIERvdWJsZSIsIkQgU3RyaW5nIiwiRSBDbGlwIl0=",\n  "answer" : "WyJBIEludCIsIkIgZmxvYXQiLCJFIENsaXAiXQ==",\n  "correct" : null,\n  "wrong" : null,\n  "point" : 5,\n  "time" : 3,\n  "createTime" : "2023-10-27 14:34:52",\n  "updateTime" : "2023-10-27 14:34:52"\n}, {\n  "id" : 3,\n  "question" : "This is a short Answer Question.\\nThere are MULTIPLE lines.\\nType your answer in following <textarea>",\n  "style" : "Short Answer",\n  "body" : "",\n  "answer" : "Answer",\n  "correct" : null,\n  "wrong" : null,\n  "point" : 3,\n  "time" : 2,\n  "createTime" : "2023-10-26 02:47:03",\n  "updateTime" : "2023-10-26 02:47:03"\n}, {\n  "id" : 9,\n  "question" : "This is test Question",\n  "style" : "Single Choice",\n  "body" : "WyJBLiBUZXN0IiwiQi50ZXN0Il0=",\n  "answer" : "WyJCLnRlc3QiXQ==",\n  "correct" : null,\n  "wrong" : null,\n  "point" : 2,\n  "time" : 2,\n  "createTime" : "2023-10-31 16:20:17",\n  "updateTime" : "2023-10-31 16:20:17"\n} ]', '[SystemTime:2023-11-02 13:47:09][ClientTime: 2023-11-02 13:47:09]\n', 'Core Java', 2, 14, 'core Java test 1', '[ {\n  "qid" : 2,\n  "userAnswer" : "WyJDLiB0ZXN0IiwiQi50ZXN0Il0=",\n  "isCorrect" : "yes"\n}, {\n  "qid" : 5,\n  "userAnswer" : "WyJBLnRlc3QiXQ==",\n  "isCorrect" : "yes"\n}, {\n  "qid" : 6,\n  "userAnswer" : "WyJDIERvdWJsZSJd",\n  "isCorrect" : "No"\n}, {\n  "qid" : 3,\n  "userAnswer" : "Answer",\n  "isCorrect" : "yes"\n}, {\n  "qid" : 9,\n  "userAnswer" : "WyJCLnRlc3QiXQ==",\n  "isCorrect" : "yes"\n} ]', 1, NULL),
(2, '[SystemTime:2023-11-02 14:03:10][ClientTime: 2023-11-02 14:03:10]\n', 12, '[ {\n  "id" : 2,\n  "question" : "This is a Test Question2",\n  "style" : "Multiple Choice",\n  "body" : "WyJBLiB0ZXN0IiwiQy4gdGVzdCIsIkIudGVzdCJd",\n  "answer" : "WyJDLiB0ZXN0IiwiQi50ZXN0Il0=",\n  "correct" : null,\n  "wrong" : null,\n  "point" : 2,\n  "time" : 4,\n  "createTime" : "2023-10-24 15:13:26",\n  "updateTime" : "2023-10-24 15:13:26"\n}, {\n  "id" : 5,\n  "question" : "This is a new Question",\n  "style" : "Single Choice",\n  "body" : "WyJBLnRlc3QiLCJDLnRleHQiXQ==",\n  "answer" : "WyJBLnRlc3QiXQ==",\n  "correct" : null,\n  "wrong" : null,\n  "point" : 2,\n  "time" : 1,\n  "createTime" : "2023-10-27 13:40:42",\n  "updateTime" : "2023-10-27 13:40:42"\n}, {\n  "id" : 6,\n  "question" : "Which are AviSynth primitive data types",\n  "style" : "Multiple Choice",\n  "body" : "WyJBIEludCIsIkIgZmxvYXQiLCJDIERvdWJsZSIsIkQgU3RyaW5nIiwiRSBDbGlwIl0=",\n  "answer" : "WyJBIEludCIsIkIgZmxvYXQiLCJFIENsaXAiXQ==",\n  "correct" : null,\n  "wrong" : null,\n  "point" : 5,\n  "time" : 3,\n  "createTime" : "2023-10-27 14:34:52",\n  "updateTime" : "2023-10-27 14:34:52"\n}, {\n  "id" : 3,\n  "question" : "This is a short Answer Question.\\nThere are MULTIPLE lines.\\nType your answer in following <textarea>",\n  "style" : "Short Answer",\n  "body" : "",\n  "answer" : "Answer",\n  "correct" : null,\n  "wrong" : null,\n  "point" : 3,\n  "time" : 2,\n  "createTime" : "2023-10-26 02:47:03",\n  "updateTime" : "2023-10-26 02:47:03"\n}, {\n  "id" : 9,\n  "question" : "This is test Question",\n  "style" : "Single Choice",\n  "body" : "WyJBLiBUZXN0IiwiQi50ZXN0Il0=",\n  "answer" : "WyJCLnRlc3QiXQ==",\n  "correct" : null,\n  "wrong" : null,\n  "point" : 2,\n  "time" : 2,\n  "createTime" : "2023-10-31 16:20:17",\n  "updateTime" : "2023-10-31 16:20:17"\n} ]', '[SystemTime:2023-11-02 13:47:09][ClientTime: 2023-11-02 13:47:09]\n', 'Core Java', 2, 14, 'core Java test 1', '[ {\n  "qid" : 2,\n  "userAnswer" : "WyJDLiB0ZXN0IiwiQi50ZXN0Il0=",\n  "isCorrect" : "yes"\n}, {\n  "qid" : 5,\n  "userAnswer" : "WyJBLnRlc3QiXQ==",\n  "isCorrect" : "yes"\n}, {\n  "qid" : 6,\n  "userAnswer" : "WyJBIEludCIsIkIgZmxvYXQiLCJFIENsaXAiXQ==",\n  "isCorrect" : "yes"\n}, {\n  "qid" : 3,\n  "userAnswer" : "Answer",\n  "isCorrect" : "yes"\n}, {\n  "qid" : 9,\n  "userAnswer" : "WyJBLiBUZXN0Il0=",\n  "isCorrect" : "No"\n} ]', 1, NULL),
(3, '[SystemTime:2023-11-02 14:04:29][ClientTime: 2023-11-02 14:04:29]\n', 4, '[ {\n  "id" : 2,\n  "question" : "This is a Test Question2",\n  "style" : "Multiple Choice",\n  "body" : "WyJBLiB0ZXN0IiwiQy4gdGVzdCIsIkIudGVzdCJd",\n  "answer" : "WyJDLiB0ZXN0IiwiQi50ZXN0Il0=",\n  "correct" : null,\n  "wrong" : null,\n  "point" : 2,\n  "time" : 4,\n  "createTime" : "2023-10-24 15:13:26",\n  "updateTime" : "2023-10-24 15:13:26"\n}, {\n  "id" : 5,\n  "question" : "This is a new Question",\n  "style" : "Single Choice",\n  "body" : "WyJBLnRlc3QiLCJDLnRleHQiXQ==",\n  "answer" : "WyJBLnRlc3QiXQ==",\n  "correct" : null,\n  "wrong" : null,\n  "point" : 2,\n  "time" : 1,\n  "createTime" : "2023-10-27 13:40:42",\n  "updateTime" : "2023-10-27 13:40:42"\n}, {\n  "id" : 6,\n  "question" : "Which are AviSynth primitive data types",\n  "style" : "Multiple Choice",\n  "body" : "WyJBIEludCIsIkIgZmxvYXQiLCJDIERvdWJsZSIsIkQgU3RyaW5nIiwiRSBDbGlwIl0=",\n  "answer" : "WyJBIEludCIsIkIgZmxvYXQiLCJFIENsaXAiXQ==",\n  "correct" : null,\n  "wrong" : null,\n  "point" : 5,\n  "time" : 3,\n  "createTime" : "2023-10-27 14:34:52",\n  "updateTime" : "2023-10-27 14:34:52"\n}, {\n  "id" : 3,\n  "question" : "This is a short Answer Question.\\nThere are MULTIPLE lines.\\nType your answer in following <textarea>",\n  "style" : "Short Answer",\n  "body" : "",\n  "answer" : "Answer",\n  "correct" : null,\n  "wrong" : null,\n  "point" : 3,\n  "time" : 2,\n  "createTime" : "2023-10-26 02:47:03",\n  "updateTime" : "2023-10-26 02:47:03"\n}, {\n  "id" : 9,\n  "question" : "This is test Question",\n  "style" : "Single Choice",\n  "body" : "WyJBLiBUZXN0IiwiQi50ZXN0Il0=",\n  "answer" : "WyJCLnRlc3QiXQ==",\n  "correct" : null,\n  "wrong" : null,\n  "point" : 2,\n  "time" : 2,\n  "createTime" : "2023-10-31 16:20:17",\n  "updateTime" : "2023-10-31 16:20:17"\n} ]', '[SystemTime:2023-11-02 13:47:09][ClientTime: 2023-11-02 13:47:09]\n', 'Core Java', 2, 14, 'core Java test 1', '[ {\n  "qid" : 2,\n  "userAnswer" : "WyJDLiB0ZXN0Il0=",\n  "isCorrect" : "No"\n}, {\n  "qid" : 5,\n  "userAnswer" : "WyJBLnRlc3QiXQ==",\n  "isCorrect" : "yes"\n}, {\n  "qid" : 6,\n  "userAnswer" : "WyJBIEludCIsIkIgZmxvYXQiLCJEIFN0cmluZyIsIkUgQ2xpcCJd",\n  "isCorrect" : "No"\n}, {\n  "qid" : 3,\n  "userAnswer" : "Answers",\n  "isCorrect" : "No"\n}, {\n  "qid" : 9,\n  "userAnswer" : "WyJCLnRlc3QiXQ==",\n  "isCorrect" : "yes"\n} ]', 1, NULL),
(4, '[SystemTime:2023-11-02 14:07:46][ClientTime: 2023-11-02 14:07:46]\n', 5, '[ {\n  "id" : 2,\n  "question" : "This is a Test Question2",\n  "style" : "Multiple Choice",\n  "body" : "WyJBLiB0ZXN0IiwiQy4gdGVzdCIsIkIudGVzdCJd",\n  "answer" : "WyJDLiB0ZXN0IiwiQi50ZXN0Il0=",\n  "correct" : null,\n  "wrong" : null,\n  "point" : 2,\n  "time" : 4,\n  "createTime" : "2023-10-24 15:13:26",\n  "updateTime" : "2023-10-24 15:13:26"\n}, {\n  "id" : 3,\n  "question" : "This is a short Answer Question.\\nThere are MULTIPLE lines.\\nType your answer in following <textarea>",\n  "style" : "Short Answer",\n  "body" : "",\n  "answer" : "Answer",\n  "correct" : null,\n  "wrong" : null,\n  "point" : 3,\n  "time" : 2,\n  "createTime" : "2023-10-26 02:47:03",\n  "updateTime" : "2023-10-26 02:47:03"\n} ]', '[SystemTime:2023-11-02 13:47:09][ClientTime: 2023-11-02 13:47:09]\n', 'Spring MVC', 13, 5, 'Spring MVC Test 1', '[ {\n  "qid" : 2,\n  "userAnswer" : "WyJDLiB0ZXN0IiwiQi50ZXN0Il0=",\n  "isCorrect" : "yes"\n}, {\n  "qid" : 3,\n  "userAnswer" : "Answer",\n  "isCorrect" : "yes"\n} ]', 1, NULL),
(5, '[SystemTime:2023-11-02 14:14:21][ClientTime: 2023-11-02 14:14:21]\n', 5, '[ {\n  "id" : 2,\n  "question" : "This is a Test Question2",\n  "style" : "Multiple Choice",\n  "body" : "WyJBLiB0ZXN0IiwiQy4gdGVzdCIsIkIudGVzdCJd",\n  "answer" : "WyJDLiB0ZXN0IiwiQi50ZXN0Il0=",\n  "correct" : null,\n  "wrong" : null,\n  "point" : 2,\n  "time" : 4,\n  "createTime" : "2023-10-24 15:13:26",\n  "updateTime" : "2023-10-24 15:13:26"\n}, {\n  "id" : 3,\n  "question" : "This is a short Answer Question.\\nThere are MULTIPLE lines.\\nType your answer in following <textarea>",\n  "style" : "Short Answer",\n  "body" : "",\n  "answer" : "Answer",\n  "correct" : null,\n  "wrong" : null,\n  "point" : 3,\n  "time" : 2,\n  "createTime" : "2023-10-26 02:47:03",\n  "updateTime" : "2023-10-26 02:47:03"\n} ]', '[SystemTime:2023-11-02 14:14:21][ClientTime: 2023-11-02 14:14:21]\n', 'Spring MVC', 13, 5, 'Spring MVC Test 1', '[ {\n  "qid" : 2,\n  "userAnswer" : "WyJDLiB0ZXN0IiwiQi50ZXN0Il0=",\n  "isCorrect" : "yes"\n}, {\n  "qid" : 3,\n  "userAnswer" : "Answer",\n  "isCorrect" : "yes"\n} ]', 1, 30),
(6, '[SystemTime:2023-11-02 14:46:45][ClientTime: 2023-11-02 14:46:45]\n', 5, '[ {\n  "id" : 2,\n  "question" : "This is a Test Question2",\n  "style" : "Multiple Choice",\n  "body" : "WyJBLiB0ZXN0IiwiQy4gdGVzdCIsIkIudGVzdCJd",\n  "answer" : "WyJDLiB0ZXN0IiwiQi50ZXN0Il0=",\n  "correct" : null,\n  "wrong" : null,\n  "point" : 2,\n  "time" : 4,\n  "createTime" : "2023-10-24 15:13:26",\n  "updateTime" : "2023-10-24 15:13:26"\n}, {\n  "id" : 3,\n  "question" : "This is a short Answer Question.\\nThere are MULTIPLE lines.\\nType your answer in following <textarea>",\n  "style" : "Short Answer",\n  "body" : "",\n  "answer" : "Answer",\n  "correct" : null,\n  "wrong" : null,\n  "point" : 3,\n  "time" : 2,\n  "createTime" : "2023-10-26 02:47:03",\n  "updateTime" : "2023-10-26 02:47:03"\n} ]', '[SystemTime:2023-11-02 14:46:45][ClientTime: 2023-11-02 14:46:45]\n', 'Spring MVC', 13, 5, 'Spring MVC Test 1', '[ {\n  "qid" : 2,\n  "userAnswer" : "WyJDLiB0ZXN0IiwiQi50ZXN0Il0=",\n  "isCorrect" : "yes"\n}, {\n  "qid" : 3,\n  "userAnswer" : "Answer",\n  "isCorrect" : "yes"\n} ]', 1, 30),
(7, '[SystemTime:2023-11-02 14:49:11][ClientTime: 2023-11-02 14:49:11]\n', 5, '[ {\n  "id" : 2,\n  "question" : "This is a Test Question2",\n  "style" : "Multiple Choice",\n  "body" : "WyJBLiB0ZXN0IiwiQy4gdGVzdCIsIkIudGVzdCJd",\n  "answer" : "WyJDLiB0ZXN0IiwiQi50ZXN0Il0=",\n  "correct" : null,\n  "wrong" : null,\n  "point" : 2,\n  "time" : 4,\n  "createTime" : "2023-10-24 15:13:26",\n  "updateTime" : "2023-10-24 15:13:26"\n}, {\n  "id" : 3,\n  "question" : "This is a short Answer Question.\\nThere are MULTIPLE lines.\\nType your answer in following <textarea>",\n  "style" : "Short Answer",\n  "body" : "",\n  "answer" : "Answer",\n  "correct" : null,\n  "wrong" : null,\n  "point" : 3,\n  "time" : 2,\n  "createTime" : "2023-10-26 02:47:03",\n  "updateTime" : "2023-10-26 02:47:03"\n} ]', '[SystemTime:2023-11-02 14:49:11][ClientTime: 2023-11-02 14:49:11]\n', 'Spring MVC', 13, 5, 'Spring MVC Test 1', '[ {\n  "qid" : 2,\n  "userAnswer" : "WyJDLiB0ZXN0IiwiQi50ZXN0Il0=",\n  "isCorrect" : "yes"\n}, {\n  "qid" : 3,\n  "userAnswer" : "Answer",\n  "isCorrect" : "yes"\n} ]', 1, 30),
(8, '[SystemTime:2023-11-02 14:58:56][ClientTime: 2023-11-02 14:58:56]\n', 2, '[ {\n  "id" : 2,\n  "question" : "This is a Test Question2",\n  "style" : "Multiple Choice",\n  "body" : "WyJBLiB0ZXN0IiwiQy4gdGVzdCIsIkIudGVzdCJd",\n  "answer" : "WyJDLiB0ZXN0IiwiQi50ZXN0Il0=",\n  "correct" : null,\n  "wrong" : null,\n  "point" : 2,\n  "time" : 4,\n  "createTime" : "2023-10-24 15:13:26",\n  "updateTime" : "2023-10-24 15:13:26"\n}, {\n  "id" : 3,\n  "question" : "This is a short Answer Question.\\nThere are MULTIPLE lines.\\nType your answer in following <textarea>",\n  "style" : "Short Answer",\n  "body" : "",\n  "answer" : "Answer",\n  "correct" : null,\n  "wrong" : null,\n  "point" : 3,\n  "time" : 2,\n  "createTime" : "2023-10-26 02:47:03",\n  "updateTime" : "2023-10-26 02:47:03"\n} ]', '[SystemTime:2023-11-02 14:58:56][ClientTime: 2023-11-02 14:58:56]\n', 'Spring MVC', 13, 5, 'Spring MVC Test 1', '[ {\n  "qid" : 2,\n  "userAnswer" : "WyJDLiB0ZXN0IiwiQi50ZXN0Il0=",\n  "isCorrect" : "yes"\n}, {\n  "qid" : 3,\n  "userAnswer" : "answer",\n  "isCorrect" : "No"\n} ]', 1, 30),
(9, '[SystemTime:2023-11-02 15:00:21][ClientTime: 2023-11-02 15:00:21]\n', 5, '[ {\n  "id" : 2,\n  "question" : "This is a Test Question2",\n  "style" : "Multiple Choice",\n  "body" : "WyJBLiB0ZXN0IiwiQy4gdGVzdCIsIkIudGVzdCJd",\n  "answer" : "WyJDLiB0ZXN0IiwiQi50ZXN0Il0=",\n  "correct" : null,\n  "wrong" : null,\n  "point" : 2,\n  "time" : 4,\n  "createTime" : "2023-10-24 15:13:26",\n  "updateTime" : "2023-10-24 15:13:26"\n}, {\n  "id" : 3,\n  "question" : "This is a short Answer Question.\\nThere are MULTIPLE lines.\\nType your answer in following <textarea>",\n  "style" : "Short Answer",\n  "body" : "",\n  "answer" : "Answer",\n  "correct" : null,\n  "wrong" : null,\n  "point" : 3,\n  "time" : 2,\n  "createTime" : "2023-10-26 02:47:03",\n  "updateTime" : "2023-10-26 02:47:03"\n} ]', '[SystemTime:2023-11-02 15:00:21][ClientTime: 2023-11-02 15:00:21]\n', 'Spring MVC', 13, 5, 'Spring MVC Test 1', '[ {\n  "qid" : 2,\n  "userAnswer" : "WyJDLiB0ZXN0IiwiQi50ZXN0Il0=",\n  "isCorrect" : "yes"\n}, {\n  "qid" : 3,\n  "userAnswer" : "Answer",\n  "isCorrect" : "yes"\n} ]', 1, 30),
(10, '[SystemTime:2023-11-02 15:04:33][ClientTime: 2023-11-02 15:04:33]\n', 5, '[ {\n  "id" : 2,\n  "question" : "This is a Test Question2",\n  "style" : "Multiple Choice",\n  "body" : "WyJBLiB0ZXN0IiwiQy4gdGVzdCIsIkIudGVzdCJd",\n  "answer" : "WyJDLiB0ZXN0IiwiQi50ZXN0Il0=",\n  "correct" : null,\n  "wrong" : null,\n  "point" : 2,\n  "time" : 4,\n  "createTime" : "2023-10-24 15:13:26",\n  "updateTime" : "2023-10-24 15:13:26"\n}, {\n  "id" : 3,\n  "question" : "This is a short Answer Question.\\nThere are MULTIPLE lines.\\nType your answer in following <textarea>",\n  "style" : "Short Answer",\n  "body" : "",\n  "answer" : "Answer",\n  "correct" : null,\n  "wrong" : null,\n  "point" : 3,\n  "time" : 2,\n  "createTime" : "2023-10-26 02:47:03",\n  "updateTime" : "2023-10-26 02:47:03"\n} ]', '[SystemTime:2023-11-02 15:04:33][ClientTime: 2023-11-02 15:04:33]\n', 'Spring MVC', 13, 5, 'Spring MVC Test 1', '[ {\n  "qid" : 2,\n  "userAnswer" : "WyJDLiB0ZXN0IiwiQi50ZXN0Il0=",\n  "isCorrect" : "yes"\n}, {\n  "qid" : 3,\n  "userAnswer" : "Answer",\n  "isCorrect" : "yes"\n} ]', 1, 30),
(11, '[SystemTime:2023-11-02 16:20:33][ClientTime: 2023-11-02 16:20:33]\n', 0, '[ {\n  "id" : 2,\n  "question" : "This is a Test Question2",\n  "style" : "Multiple Choice",\n  "body" : "WyJBLiB0ZXN0IiwiQy4gdGVzdCIsIkIudGVzdCJd",\n  "answer" : "WyJDLiB0ZXN0IiwiQi50ZXN0Il0=",\n  "correct" : null,\n  "wrong" : null,\n  "point" : 2,\n  "time" : 4,\n  "createTime" : "2023-10-24 15:13:26",\n  "updateTime" : "2023-10-24 15:13:26"\n}, {\n  "id" : 3,\n  "question" : "This is a short Answer Question.\\nThere are MULTIPLE lines.\\nType your answer in following <textarea>",\n  "style" : "Short Answer",\n  "body" : "",\n  "answer" : "Answer",\n  "correct" : null,\n  "wrong" : null,\n  "point" : 3,\n  "time" : 2,\n  "createTime" : "2023-10-26 02:47:03",\n  "updateTime" : "2023-10-26 02:47:03"\n} ]', '[SystemTime:2023-11-02 16:20:33][ClientTime: 2023-11-02 16:20:33]\n', 'Spring MVC', 13, 2, 'Spring MVC Test 1', '[ {\n  "qid" : 2,\n  "userAnswer" : "WyJBLiB0ZXN0IiwiQy4gdGVzdCJd",\n  "isCorrect" : "No"\n} ]', 1, 30),
(12, '[SystemTime:2023-11-02 16:22:44][ClientTime: 2023-11-02 16:22:44]\n', 3, '[ {\n  "id" : 2,\n  "question" : "This is a Test Question2",\n  "style" : "Multiple Choice",\n  "body" : "WyJBLiB0ZXN0IiwiQy4gdGVzdCIsIkIudGVzdCJd",\n  "answer" : "WyJDLiB0ZXN0IiwiQi50ZXN0Il0=",\n  "correct" : null,\n  "wrong" : null,\n  "point" : 2,\n  "time" : 4,\n  "createTime" : "2023-10-24 15:13:26",\n  "updateTime" : "2023-10-24 15:13:26"\n}, {\n  "id" : 3,\n  "question" : "This is a short Answer Question.\\nThere are MULTIPLE lines.\\nType your answer in following <textarea>",\n  "style" : "Short Answer",\n  "body" : "",\n  "answer" : "Answer",\n  "correct" : null,\n  "wrong" : null,\n  "point" : 3,\n  "time" : 2,\n  "createTime" : "2023-10-26 02:47:03",\n  "updateTime" : "2023-10-26 02:47:03"\n} ]', '[SystemTime:2023-11-02 16:22:44][ClientTime: 2023-11-02 16:22:44]\n', 'Spring MVC', 13, 5, 'Spring MVC Test 1', '[ {\n  "qid" : 2,\n  "userAnswer" : "WyJBLiB0ZXN0IiwiQy4gdGVzdCJd",\n  "isCorrect" : "No"\n}, {\n  "qid" : 3,\n  "userAnswer" : "Answer",\n  "isCorrect" : "yes"\n} ]', 1, 30),
(13, '[SystemTime:2023-11-02 16:41:09][ClientTime: 2023-11-02 16:41:09]\n', 11, '[ {\n  "id" : 2,\n  "question" : "This is a Test Question2",\n  "style" : "Multiple Choice",\n  "body" : "WyJBLiB0ZXN0IiwiQy4gdGVzdCIsIkIudGVzdCJd",\n  "answer" : "WyJDLiB0ZXN0IiwiQi50ZXN0Il0=",\n  "correct" : null,\n  "wrong" : null,\n  "point" : 2,\n  "time" : 4,\n  "createTime" : "2023-10-24 15:13:26",\n  "updateTime" : "2023-10-24 15:13:26"\n}, {\n  "id" : 5,\n  "question" : "This is a new Question",\n  "style" : "Single Choice",\n  "body" : "WyJBLnRlc3QiLCJDLnRleHQiXQ==",\n  "answer" : "WyJBLnRlc3QiXQ==",\n  "correct" : null,\n  "wrong" : null,\n  "point" : 2,\n  "time" : 1,\n  "createTime" : "2023-10-27 13:40:42",\n  "updateTime" : "2023-10-27 13:40:42"\n}, {\n  "id" : 6,\n  "question" : "Which are AviSynth primitive data types",\n  "style" : "Multiple Choice",\n  "body" : "WyJBIEludCIsIkIgZmxvYXQiLCJDIERvdWJsZSIsIkQgU3RyaW5nIiwiRSBDbGlwIl0=",\n  "answer" : "WyJBIEludCIsIkIgZmxvYXQiLCJFIENsaXAiXQ==",\n  "correct" : null,\n  "wrong" : null,\n  "point" : 5,\n  "time" : 3,\n  "createTime" : "2023-10-27 14:34:52",\n  "updateTime" : "2023-10-27 14:34:52"\n}, {\n  "id" : 3,\n  "question" : "This is a short Answer Question.\\nThere are MULTIPLE lines.\\nType your answer in following <textarea>",\n  "style" : "Short Answer",\n  "body" : "",\n  "answer" : "Answer",\n  "correct" : null,\n  "wrong" : null,\n  "point" : 3,\n  "time" : 2,\n  "createTime" : "2023-10-26 02:47:03",\n  "updateTime" : "2023-10-26 02:47:03"\n}, {\n  "id" : 9,\n  "question" : "This is test Question",\n  "style" : "Single Choice",\n  "body" : "WyJBLiBUZXN0IiwiQi50ZXN0Il0=",\n  "answer" : "WyJCLnRlc3QiXQ==",\n  "correct" : null,\n  "wrong" : null,\n  "point" : 2,\n  "time" : 2,\n  "createTime" : "2023-10-31 16:20:17",\n  "updateTime" : "2023-10-31 16:20:17"\n}, {\n  "id" : 8,\n  "question" : "test",\n  "style" : "Multiple Choice",\n  "body" : "WyJBLnRlc3QiLCJCIGZsb2F0IiwiQyBEb3VibGUiXQ==",\n  "answer" : "WyJBLnRlc3QiLCJCIGZsb2F0Il0=",\n  "correct" : null,\n  "wrong" : null,\n  "point" : 5,\n  "time" : 6,\n  "createTime" : "2023-10-27 16:05:20",\n  "updateTime" : "2023-10-27 16:05:20"\n}, {\n  "id" : 11,\n  "question" : "test question",\n  "style" : "Single Choice",\n  "body" : "WyJBLnRlc3QiLCJCLnRlc3QiXQ==",\n  "answer" : "WyJBLnRlc3QiXQ==",\n  "correct" : null,\n  "wrong" : null,\n  "point" : 3,\n  "time" : 10,\n  "createTime" : "2023-11-01 04:06:19",\n  "updateTime" : "2023-11-01 04:06:19"\n} ]', '[SystemTime:2023-11-02 16:41:09][ClientTime: 2023-11-02 16:41:09]\n', 'Core Java', 2, 19, 'core Java test 1', '[ {\n  "qid" : 2,\n  "userAnswer" : "WyJDLiB0ZXN0IiwiQi50ZXN0Il0=",\n  "isCorrect" : "yes"\n}, {\n  "qid" : 5,\n  "userAnswer" : "WyJBLnRlc3QiXQ==",\n  "isCorrect" : "yes"\n}, {\n  "qid" : 6,\n  "userAnswer" : "WyJBIEludCIsIkIgZmxvYXQiLCJFIENsaXAiXQ==",\n  "isCorrect" : "yes"\n}, {\n  "qid" : 3,\n  "userAnswer" : "answer",\n  "isCorrect" : "No"\n}, {\n  "qid" : 9,\n  "userAnswer" : "WyJCLnRlc3QiXQ==",\n  "isCorrect" : "yes"\n}, {\n  "qid" : 8,\n  "userAnswer" : "WyJBLnRlc3QiLCJDIERvdWJsZSJd",\n  "isCorrect" : "No"\n} ]', 1, 5),
(14, '[SystemTime:2023-11-02 17:06:17][ClientTime: 2023-11-02 17:06:17]\n', 7, '[ {\n  "id" : 2,\n  "question" : "This is a Test Question2",\n  "style" : "Multiple Choice",\n  "body" : "WyJBLiB0ZXN0IiwiQy4gdGVzdCIsIkIudGVzdCJd",\n  "answer" : "WyJDLiB0ZXN0IiwiQi50ZXN0Il0=",\n  "correct" : null,\n  "wrong" : null,\n  "point" : 2,\n  "time" : 4,\n  "createTime" : "2023-10-24 15:13:26",\n  "updateTime" : "2023-10-24 15:13:26"\n}, {\n  "id" : 5,\n  "question" : "This is a new Question",\n  "style" : "Single Choice",\n  "body" : "WyJBLnRlc3QiLCJDLnRleHQiXQ==",\n  "answer" : "WyJBLnRlc3QiXQ==",\n  "correct" : null,\n  "wrong" : null,\n  "point" : 2,\n  "time" : 1,\n  "createTime" : "2023-10-27 13:40:42",\n  "updateTime" : "2023-10-27 13:40:42"\n}, {\n  "id" : 6,\n  "question" : "Which are AviSynth primitive data types",\n  "style" : "Multiple Choice",\n  "body" : "WyJBIEludCIsIkIgZmxvYXQiLCJDIERvdWJsZSIsIkQgU3RyaW5nIiwiRSBDbGlwIl0=",\n  "answer" : "WyJBIEludCIsIkIgZmxvYXQiLCJFIENsaXAiXQ==",\n  "correct" : null,\n  "wrong" : null,\n  "point" : 5,\n  "time" : 3,\n  "createTime" : "2023-10-27 14:34:52",\n  "updateTime" : "2023-10-27 14:34:52"\n}, {\n  "id" : 3,\n  "question" : "This is a short Answer Question.\\nThere are MULTIPLE lines.\\nType your answer in following <textarea>",\n  "style" : "Short Answer",\n  "body" : "",\n  "answer" : "Answer",\n  "correct" : null,\n  "wrong" : null,\n  "point" : 3,\n  "time" : 2,\n  "createTime" : "2023-10-26 02:47:03",\n  "updateTime" : "2023-10-26 02:47:03"\n}, {\n  "id" : 9,\n  "question" : "This is test Question",\n  "style" : "Single Choice",\n  "body" : "WyJBLiBUZXN0IiwiQi50ZXN0Il0=",\n  "answer" : "WyJCLnRlc3QiXQ==",\n  "correct" : null,\n  "wrong" : null,\n  "point" : 2,\n  "time" : 2,\n  "createTime" : "2023-10-31 16:20:17",\n  "updateTime" : "2023-10-31 16:20:17"\n}, {\n  "id" : 8,\n  "question" : "test",\n  "style" : "Multiple Choice",\n  "body" : "WyJBLnRlc3QiLCJCIGZsb2F0IiwiQyBEb3VibGUiXQ==",\n  "answer" : "WyJBLnRlc3QiLCJCIGZsb2F0Il0=",\n  "correct" : null,\n  "wrong" : null,\n  "point" : 5,\n  "time" : 6,\n  "createTime" : "2023-10-27 16:05:20",\n  "updateTime" : "2023-10-27 16:05:20"\n}, {\n  "id" : 11,\n  "question" : "test question",\n  "style" : "Single Choice",\n  "body" : "WyJBLnRlc3QiLCJCLnRlc3QiXQ==",\n  "answer" : "WyJBLnRlc3QiXQ==",\n  "correct" : null,\n  "wrong" : null,\n  "point" : 3,\n  "time" : 10,\n  "createTime" : "2023-11-01 04:06:19",\n  "updateTime" : "2023-11-01 04:06:19"\n} ]', '[SystemTime:2023-11-02 16:56:00][ClientTime: 2023-11-02 16:56:00]\n', 'Core Java', 2, 22, 'core Java test 1', '[ {\n  "qid" : 2,\n  "userAnswer" : "WyJBLiB0ZXN0IiwiQy4gdGVzdCJd",\n  "isCorrect" : "No"\n}, {\n  "qid" : 5,\n  "userAnswer" : "WyJDLnRleHQiXQ==",\n  "isCorrect" : "No"\n}, {\n  "qid" : 6,\n  "userAnswer" : "WyJBIEludCIsIkIgZmxvYXQiLCJEIFN0cmluZyIsIkUgQ2xpcCJd",\n  "isCorrect" : "No"\n}, {\n  "qid" : 3,\n  "userAnswer" : "answer",\n  "isCorrect" : "No"\n}, {\n  "qid" : 9,\n  "userAnswer" : "WyJCLnRlc3QiXQ==",\n  "isCorrect" : "yes"\n}, {\n  "qid" : 8,\n  "userAnswer" : "WyJBLnRlc3QiLCJCIGZsb2F0Il0=",\n  "isCorrect" : "yes"\n}, {\n  "qid" : 11,\n  "userAnswer" : "WyJCLnRlc3QiXQ==",\n  "isCorrect" : "No"\n} ]', 1, 5);

-- --------------------------------------------------------

--
-- Table structure for table `test_table`
--

CREATE TABLE `test_table` (
  `id` bigint(20) NOT NULL,
  `create_time` varchar(255) DEFAULT NULL,
  `level` int(11) DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  `topic` varchar(255) DEFAULT NULL,
  `update_time` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `test_table`
--

INSERT INTO `test_table` (`id`, `create_time`, `level`, `name`, `topic`, `update_time`) VALUES
(2, '2023-10-23 05:10:59', 5, 'core Java test 1', 'Core Java', '2023-10-23 05:10:59'),
(3, '2023-10-23 05:24:32', 10, 'SQL Test', 'SQL', '2023-10-23 05:24:32'),
(4, '2023-10-23 05:25:23', 50, 'JPA Test 1', 'Spring Data JPA', '2023-10-23 05:25:23'),
(5, '2023-10-23 05:27:06', 2, 'core java test 2', 'Core Java', '2023-10-23 05:27:06'),
(8, '2023-10-23 05:36:22', 43, 'Spring Boot Test 2', 'Spring Boot', '2023-10-23 05:36:22'),
(9, '2023-10-23 05:37:34', 70, 'Spring Test 1', 'Spring', '2023-10-23 05:37:34'),
(10, '2023-10-23 05:39:28', 55, 'Spring Boot Test 3', 'Spring Boot', '2023-10-23 05:39:28'),
(13, '2023-10-27 04:20:01', 30, 'Spring MVC Test 1', 'Spring MVC', '2023-10-27 04:20:01'),
(16, '2023-10-27 16:02:57', 70, 'Spring Boot Test 5', 'Spring Boot', '2023-10-27 16:02:57');

-- --------------------------------------------------------

--
-- Table structure for table `topic_table`
--

CREATE TABLE `topic_table` (
  `id` bigint(20) NOT NULL,
  `create_time` varchar(255) DEFAULT NULL,
  `description` varchar(255) DEFAULT NULL,
  `topic` varchar(255) DEFAULT NULL,
  `update_time` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `topic_table`
--

INSERT INTO `topic_table` (`id`, `create_time`, `description`, `topic`, `update_time`) VALUES
(2, '2023-10-23 01:22:45', 'Core Jave, Java 8, Stream API', 'Core Java', '2023-10-23 01:22:45'),
(4, '2023-10-23 02:05:34', '', 'Spring MVC', '2023-10-23 02:05:34'),
(5, '2023-10-23 02:05:51', '', 'Spring Boot', '2023-10-23 02:05:51'),
(6, '2023-10-23 02:10:46', '', 'Spring Data JPA', '2023-10-23 02:10:46'),
(7, '2023-10-23 02:17:05', '', 'SQL', '2023-10-23 02:17:05'),
(9, '2023-10-27 02:48:18', '', 'Spring', '2023-10-27 02:48:18'),
(10, '2023-10-27 10:44:58', 'java 8', 'Core Java 2', '2023-10-27 10:44:58'),
(11, '2023-10-27 16:01:57', '', 'Spring Data', '2023-10-27 16:01:57');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `account_table`
--
ALTER TABLE `account_table`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `question_table`
--
ALTER TABLE `question_table`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `question_to_tast_table`
--
ALTER TABLE `question_to_tast_table`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `test_result_table`
--
ALTER TABLE `test_result_table`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `test_table`
--
ALTER TABLE `test_table`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `topic_table`
--
ALTER TABLE `topic_table`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `account_table`
--
ALTER TABLE `account_table`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=27;
--
-- AUTO_INCREMENT for table `question_table`
--
ALTER TABLE `question_table`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;
--
-- AUTO_INCREMENT for table `question_to_tast_table`
--
ALTER TABLE `question_to_tast_table`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=35;
--
-- AUTO_INCREMENT for table `test_result_table`
--
ALTER TABLE `test_result_table`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;
--
-- AUTO_INCREMENT for table `test_table`
--
ALTER TABLE `test_table`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;
--
-- AUTO_INCREMENT for table `topic_table`
--
ALTER TABLE `topic_table`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
