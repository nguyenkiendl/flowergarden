<?php
require_once __DIR__ . '../../core/carts.class.php';
require_once __DIR__ . '../../core/function.php';
header('Content-type: application/json');
$error = false;
$request_body = file_get_contents('php://input');
$input = json_decode($request_body, true);

if (empty($input['order_id'])) {
    $error = true;
    return send_json(false, 'Not Found Order');
}

if (empty($input['product_id'])) {
    $error = true;
    return send_json(false, 'Not Found Product');
}

if ($error==false) {
    $orderId = $input['order_id'] ?? 1;
    $productId = $input['product_id'] ?? 1;
    $carts = new Carts();
    $response = $carts->addToCart($orderId, $productId);
    return send_json(true, 'OK', $response);
} else {
    return send_json(false, 'FAILED');
}