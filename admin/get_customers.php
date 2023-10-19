<?php
require_once __DIR__ . '/core/database.php';
require_once __DIR__ . '/core/function.php';
header('Content-Type: application/json; charset=utf-8');
$database = new Database();
return send_json(true, 'OK', $database->getCustomers());