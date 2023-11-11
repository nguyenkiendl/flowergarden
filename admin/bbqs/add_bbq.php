<?php
require_once __DIR__ . '../../core/bbqs.class.php';
require_once __DIR__ . '../../core/function.php';
header('Content-type: application/json');
$error = false;
$request_body = file_get_contents('php://input');
$input = json_decode($request_body, true);
if (empty($input['name'])) {
    $error = true;
    return send_json(false, 'Not Found Name');
}

if ($error==false) {
    $name = $input['name'];
    $deposit = $input['deposit'];
    $note = $input['note'];
    $date = $input['date'];
    $time = $input['time'];
    $bbqs = new Bbqs();
    $response = $bbqs->addBbq($name, $deposit, $note, $date, $time);
    return send_json(true, 'OK', $response);
} else {
    return send_json(false, 'FAILED');
}