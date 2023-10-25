<?php
require_once __DIR__ . '../../core/orders.class.php';
require_once __DIR__ . '../../core/function.php';
header('Content-Type: application/json; charset=utf-8');
$error = false;
$customerId = 0;
if(!empty($_GET['customer_id'])) {
    $customerId = filter_input(INPUT_GET, 'customer_id', FILTER_DEFAULT);
}

if ($customerId == 0) {
    $error = true;
    return send_json(false, 'Not Found Custormer');
}

if ($error==false) {
    $orders = new Orders();
    return send_json(true, 'OK', $orders->getOrdersByCustomer($customerId));
} else {
    return send_json(false, 'FAILED');
}