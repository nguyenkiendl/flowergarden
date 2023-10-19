<?php
require_once __DIR__ . '/core/database.php';
require_once __DIR__ . '/core/function.php';
header('Content-Type: application/json; charset=utf-8');
$database = new Database();
$page = 1;
$perPage = 10;
if(!empty($_GET['page'])) {
    $page = filter_input(INPUT_GET, 'page', FILTER_VALIDATE_INT);
    if(false === $page) {
        $page = 1;
    }
}
$keyword = '';
if(!empty($_GET['keyword'])) {
    $keyword = filter_input(INPUT_GET, 'keyword', FILTER_DEFAULT);
}
$filters = [];
if(!empty($_GET['filters'])) {
    $filters = filter_input(INPUT_GET, 'filters', FILTER_DEFAULT, FILTER_REQUIRE_ARRAY);
}

return send_json(true, 'OK', $database->getOrders($perPage, $page, $keyword, $filters));