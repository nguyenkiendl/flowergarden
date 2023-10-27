<?php
require_once __DIR__ . '../../core/tables.class.php';
require_once __DIR__ . '../../core/function.php';
header('Content-Type: application/json; charset=utf-8');
$tables = new Tables();
$tableId = 0;
if(!empty($_GET['table_id'])) {
    $tableId = filter_input(INPUT_GET, 'table_id', FILTER_VALIDATE_INT);
    if(false === $tableId) {
        $tableId = 0;
    }
}
return send_json(true, 'OK', $tables->getTable($tableId));