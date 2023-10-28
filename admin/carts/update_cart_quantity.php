<?php
require_once __DIR__ . '../../core/carts.class.php';
require_once __DIR__ . '../../core/function.php';
header('Content-type: application/json');
$error = false;
$request_body = file_get_contents('php://input');
$input = json_decode($request_body, true);
if (empty($input['detail_id'])) {
    $error = true;
    return send_json(false, 'Not Found Order');
}

if ($error==false) {
    $detailId = $input['detail_id'];
    $quantity = $input['quantity'];
    $carts = new Carts();
    $response = $carts->updateCartQuantity($detailId, $quantity);
    return send_json(true, 'OK', $response);
} else {
    return send_json(false, 'FAILED');
}