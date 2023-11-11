<?php
require_once __DIR__ . '../../core/orders.class.php';
require_once __DIR__ . '../../core/function.php';
$orderId = 0;
if(!empty($_GET['order_id'])) {
    $orderId = filter_input(INPUT_GET, 'order_id', FILTER_VALIDATE_INT);
    if(false === $orderId) {
        $orderId = 0;
    }
}
$orders = new Orders();
$print = $orders->getOrdersBill($orderId);
if($print):
    $printtext = "";
    // Độ rộng của từng cột (đơn vị là ký tự)
    $column_widths = [3, 40, 5];

    // Dữ liệu bảng
    $table_data = [
        ["STT", "Tên", "SL"]
    ];
    foreach ($print->orders as $k => $item) {
        $table_data[] = [$k + 1, mb_convert_encoding($item->product_name, 'UTF-8', 'UTF-8'), $item->quantity];
    }

    // Tạo bảng với độ rộng cố định cho từng cột
    $table = "";
    foreach ($table_data as $k => $row) {
        for ($i = 0; $i < count($row); $i++) {
            $table .= str_pad($row[$i], $column_widths[$i]) . " "; // Sử dụng str_pad để căn lề phải
        }
        $table .= "\n";
    }

    $title ="                PHIẾU CHẾ BIẾN                  ";
    $timeIn  = date("d/m/Y H:i", strtotime($print->created_at));
    $printIn = date('H:i');
    $head = "";
    $head .="------------------------------------------------\n";
    $head .="                HÓA ĐƠN MUA NƯỚC                \n";
    $head .="          08 Huỳnh Thúc Kháng, Măng Đen,        \n";
    $head .="               Kon Plông, Kon Tum.              \n";
    $head .="------------------------------------------------\n";
    $head .=mb_convert_encoding($title, 'UTF-8', 'UTF-8')."  \n";
    $head .="Giờ vào: $timeIn   Giờ in: $printIn\n";
    $head .="------------------------------------------------\n";

    $foot = "";
    $foot .="------------------------------------------------\n";
    $foot .="                NGUYEN HAN PHONG                \n";
    $foot .="------------------------------------------------\n";
    $foot .="      Tài khoản 8282 3738 39 - TechcomBank      \n";
    $foot .="------------------------------------------------\n";
    $foot .="       Cảm ơn quý khách và hẹn gặp lại !!!      \n";
    $foot .="------------------------------------------------\n";

    $qrcode = file_get_contents('/qrcode-payment.png');

    $printtext = $head . $table . $qrcode . $foot;
    echo $printtext;
endif;
?>