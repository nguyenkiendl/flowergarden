<?php
require_once __DIR__ . '../../core/customers.class.php';
require_once __DIR__ . '../../core/function.php';
header('Content-Type: application/json; charset=utf-8');
$customers = new Customers();

return send_json(true, 'OK', $customers->getCustomers());