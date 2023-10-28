<?php
require_once __DIR__ . '../../core/carts.class.php';
require_once __DIR__ . '../../core/function.php';
header('Content-type: application/json');
$error = false;
$request_body = file_get_contents('php://input');
$input = json_decode($request_body, true);
if (empty($input['detail_id'])) {
    $error = true;
    return send_json(false, 'Not Found Detail');
}

if ($error==false) {
    $detailId = $input['detail_id'];
    $carts = new Carts();
    $response = $carts->removeCartItem($detailId);
    return send_json(true, 'OK', $response);
} else {
    return send_json(false, 'FAILED');
}