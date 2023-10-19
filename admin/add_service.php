<?php
require_once __DIR__ . '/core/database.php';
require_once __DIR__ . '/core/function.php';

header('Content-type: application/json');
$error = false;
$request_body = file_get_contents('php://input');
$input = json_decode($request_body, true);
if (empty($input['customer_id'])) {
    $error = true;
    return send_json(false, 'Not Found Custormer');
}

if (empty($input['product_id'])) {
    $error = true;
    return send_json(false, 'Empty Service');
}


if ($error==false) {
    $customerId = $input['customer_id'];
    $productId = $input['product_id'];
    $database = new Database();
    $response = $database->addService($customerId, $productId);
    return send_json(true, 'OK', $response);
} else {
    return send_json(false, 'FAILED');
}