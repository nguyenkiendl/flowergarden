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

if (empty($input['services'])) {
    $error = true;
    return send_json(false, 'Empty Services');
}

if (!is_array($input['services'])) {
    $error = true;
    return send_json(false, 'Not Is Array Services');
}

if ( count($input['services']) == 0){
    $error = true;
    return send_json(false, 'Not Thing Item Services');
}

if ($error==false) {
    $customerId = $input['customer_id'];
    $services = $input['services'];
    $database = new Database();
    $response = $database->addOrders($customerId, $services);
    return send_json(true, 'OK', $response);
} else {
    return send_json(false, 'FAILED');
}