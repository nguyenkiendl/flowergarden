<?php

function send_json($status=true, $message='', $data=[])
{
	echo json_encode(
		[
			'status' => $status,
			'message' => $message,
			'data' => $data
		]
		, JSON_UNESCAPED_UNICODE
	);
}