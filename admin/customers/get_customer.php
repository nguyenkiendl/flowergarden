<?php
require_once __DIR__ . '../../core/customers.class.php';
require_once __DIR__ . '../../core/function.php';
header('Content-Type: application/json; charset=utf-8');
$customers = new Customers();
$customerId = 0;
if(!empty($_GET['customer_id'])) {
    $customerId = filter_input(INPUT_GET, 'customer_id', FILTER_VALIDATE_INT);
    if(false === $customerId) {
        $customerId = 0;
    }
}
$orderId = 0;
if(!empty($_GET['order_id'])) {
    $orderId = filter_input(INPUT_GET, 'order_id', FILTER_VALIDATE_INT);
    if(false === $orderId) {
        $orderId = 0;
    }
}
return send_json(true, 'OK', $customers->getCustomer($customerId, $orderId));