<?php
require_once __DIR__ . '../../core/settings.class.php';
require_once __DIR__ . '../../core/function.php';
header('Content-Type: application/json; charset=utf-8');
$settings = new Settings();
return send_json(true, 'OK', $settings->getTickets());