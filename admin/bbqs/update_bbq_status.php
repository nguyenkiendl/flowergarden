<?php
require_once __DIR__ . '../../core/bbqs.class.php';
require_once __DIR__ . '../../core/function.php';
header('Content-type: application/json');
$error = false;
$request_body = file_get_contents('php://input');
$input = json_decode($request_body, true);
if (empty($input['bbq_id'])) {
    $error = true;
    return send_json(false, 'Not Found BBQ');
}

if (empty($input['status'])) {
    $error = true;
    return send_json(false, 'Not Found Status');
}

if ($error==false) {
    $bbqId = $input['bbq_id'];
    $status = $input['status'];
    $bbqs = new Bbqs();
    $response = $bbqs->updateBbqStatus($bbqId, $status);
    return send_json(true, 'OK', $response);
} else {
    return send_json(false, 'FAILED');
}