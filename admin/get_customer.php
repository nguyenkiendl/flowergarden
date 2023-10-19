<?php
require_once __DIR__ . '/core/database.php';
require_once __DIR__ . '/core/function.php';
header('Content-Type: application/json; charset=utf-8');
$database = new Database();
$customerId = 0;
if(!empty($_GET['customer_id'])) {
    $customerId = filter_input(INPUT_GET, 'customer_id', FILTER_VALIDATE_INT);
    if(false === $customerId) {
        $customerId = 0;
    }
}
return send_json(true, 'OK', $database->getCustomer($customerId));