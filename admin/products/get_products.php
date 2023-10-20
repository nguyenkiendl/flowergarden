<?php
require_once __DIR__ . '../../core/products.class.php';
require_once __DIR__ . '../../core/function.php';
header('Content-Type: application/json; charset=utf-8');
$products = new Products();

return send_json(true, 'OK', $products->getProducts());