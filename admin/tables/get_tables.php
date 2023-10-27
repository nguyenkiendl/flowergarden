<?php
require_once __DIR__ . '../../core/tables.class.php';
require_once __DIR__ . '../../core/function.php';
header('Content-Type: application/json; charset=utf-8');
$tables = new Tables();
return send_json(true, 'OK', $tables->getTables());