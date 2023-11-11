<?php
require_once __DIR__ . '../../core/admin.class.php';
require_once __DIR__ . '../../core/function.php';
header('Content-Type: application/json; charset=utf-8');
$admin = new Admin();
return send_json(true, 'OK', $admin->getStores());