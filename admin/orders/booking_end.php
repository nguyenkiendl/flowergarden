<?php
require_once __DIR__ . '../../core/orders.class.php';
require_once __DIR__ . '../../core/function.php';

header('Content-type: application/json');
$error = false;
$request_body = file_get_contents('php://input');
$input = json_decode($request_body, true);
if (empty($input['table_id'])) {
    $error = true;
    return send_json(false, 'Not Found Table');
}

if ($error==false) {
    $tableId = $input['table_id'];
    $orders = new Orders();
    $response = $orders->bookingEnd($tableId);
    return send_json(true, 'OK', $response);
} else {
    return send_json(false, 'FAILED');
}