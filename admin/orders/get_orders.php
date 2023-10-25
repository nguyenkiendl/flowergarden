<?php
require_once __DIR__ . '../../core/orders.class.php';
require_once __DIR__ . '../../core/function.php';
header('Content-Type: application/json; charset=utf-8');
$orders = new Orders();
$page = 1;
$perPage = 10;
if(!empty($_GET['page'])) {
    $page = filter_input(INPUT_GET, 'page', FILTER_VALIDATE_INT);
    if(false === $page) {
        $page = 1;
    }
}
$keyword = '';
if(!empty($_GET['keyword'])) {
    $keyword = filter_input(INPUT_GET, 'keyword', FILTER_DEFAULT);
}
return send_json(true, 'OK', $orders->getOrders($perPage, $page, $keyword));
