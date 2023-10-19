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

if (empty($input['customer_status'])) {
    $error = true;
    return send_json(false, 'Not Found Custormer Status');
}

if ($error==false) {
    $custormerId = $input['customer_id'];
    $customerStatus = $input['customer_status'];
    $database = new Database();
    $response = $database->updateCustomerStatus($custormerId, $customerStatus);
    return send_json(true, 'OK', $response);
} else {
    return send_json(false, 'FAILED');
}