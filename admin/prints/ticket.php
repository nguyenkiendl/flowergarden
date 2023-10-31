<?php
require_once __DIR__ . '../../core/customers.class.php';
require_once __DIR__ . '../../core/function.php';
$customerId = 0;
if(!empty($_GET['customer_id'])) {
    $customerId = filter_input(INPUT_GET, 'customer_id', FILTER_VALIDATE_INT);
    if(false === $customerId) {
        $customerId = 0;
    }
}
$customers = new Customers();
$customer = $customers->getNewCustomerData($customerId);
return send_json(true, 'OK', $customer);