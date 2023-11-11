<?php
require_once __DIR__ . '../../core/admin.class.php';
require_once __DIR__ . '../../core/function.php';
header('Content-Type: application/json; charset=utf-8');

if(!empty($_GET['start'])) {
    $start = filter_input(INPUT_GET, 'start', FILTER_DEFAULT);
}
if(!empty($_GET['end'])) {
    $end = filter_input(INPUT_GET, 'end', FILTER_DEFAULT);
}
$admin = new Admin();
return send_json(true, 'OK', $admin->getOrders($start, $end));