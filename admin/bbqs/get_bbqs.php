<?php
require_once __DIR__ . '../../core/bbqs.class.php';
require_once __DIR__ . '../../core/function.php';
header('Content-Type: application/json; charset=utf-8');
$bbqs = new Bbqs();
return send_json(true, 'OK', $bbqs->getBbqs());