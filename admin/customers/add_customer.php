<?php
require_once __DIR__ . '../../core/customers.class.php';
require_once __DIR__ . '../../core/function.php';
header('Content-type: application/json');
$error = false;
$request_body = file_get_contents('php://input');
$input = json_decode($request_body, true);
if (empty($input['type'])) {
    $error = true;
    return send_json(false, 'Not Found Custormer Type');
}

if (empty($input['number'])) {
    $error = true;
    return send_json(false, 'Not Found Custormer Number');
}

if ($error==false) {
    $custormerType = $input['type'];
    $customerNumber = $input['number'] ?? 1;
    $customers = new Customers();
    $response = $customers->addCustomer($custormerType, $customerNumber);
    return send_json(true, 'OK', $response);
} else {
    return send_json(false, 'FAILED');
}