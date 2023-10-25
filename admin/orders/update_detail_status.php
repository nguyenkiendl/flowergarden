<?php
require_once __DIR__ . '../../core/orders.class.php';
require_once __DIR__ . '../../core/function.php';
header('Content-type: application/json');
$error = false;
$request_body = file_get_contents('php://input');
$input = json_decode($request_body, true);
if (empty($input['detail_id'])) {
    $error = true;
    return send_json(false, 'Not Found Detail');
}

if (empty($input['status'])) {
    $error = true;
    return send_json(false, 'Not Found Status');
}

if ($error==false) {
    $detailId = $input['detail_id'];
    $status = $input['status'];
    $orders = new Orders();
    $response = $orders->updateDetailStatus($detailId, $status);
    return send_json(true, 'OK', $response);
} else {
    return send_json(false, 'FAILED');
}