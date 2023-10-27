<?php
require_once __DIR__ . '../../core/carts.class.php';
require_once __DIR__ . '../../core/function.php';
header('Content-Type: application/json; charset=utf-8');
$error = false;
$orderId = 0;
if(!empty($_GET['order_id'])) {
    $orderId = filter_input(INPUT_GET, 'order_id', FILTER_DEFAULT);
}

if ($error==false) {
    $carts = new Carts();
    return send_json(true, 'OK', $carts->getCarts($orderId));
} else {
    return send_json(false, 'FAILED');
}