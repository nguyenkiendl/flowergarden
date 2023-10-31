<?php
require_once __DIR__ . '../../core/orders.class.php';
require_once __DIR__ . '../../core/function.php';
$orderId = 0;
if(!empty($_GET['order_id'])) {
    $orderId = filter_input(INPUT_GET, 'order_id', FILTER_VALIDATE_INT);
    if(false === $orderId) {
        $orderId = 0;
    }
}
$orders = new Orders();
$table = $orders->getOrdersBill($orderId);
return send_json(true, 'OK', $table);