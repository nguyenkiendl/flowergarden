<?php
require_once __DIR__ . '../../core/orders.class.php';
require_once __DIR__ . '../../core/function.php';

header('Content-type: application/json');
$error = false;
$request_body = file_get_contents('php://input');
$input = json_decode($request_body, true);
if (empty($input['order_id'])) {
    $error = true;
    return send_json(false, 'Not Found Order');
}

if (empty($input['datas'])) {
    $error = true;
    return send_json(false, 'Empty Services');
}

if (!is_array($input['datas'])) {
    $error = true;
    return send_json(false, 'Not Is Array Services');
}

if ( count($input['datas']) == 0){
    $error = true;
    return send_json(false, 'Not Thing Item Services');
}

if ($error==false) {
    $orderId = $input['order_id'];
    $datas = $input['datas'];
    $orders = new Orders();
    $response = $orders->addOrders($orderId, $datas);
    return send_json(true, 'OK', $response);
} else {
    return send_json(false, 'FAILED');
}