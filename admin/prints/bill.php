<?php
require_once __DIR__ . '../../core/orders.class.php';
require_once __DIR__ . '../../core/function.php';
header("Access-Control-Allow-Origin: http://localhost:3000");
$orderId = 0;
if(!empty($_GET['order_id'])) {
    $orderId = filter_input(INPUT_GET, 'order_id', FILTER_VALIDATE_INT);
    if(false === $orderId) {
        $orderId = 0;
    }
}
$orders = new Orders();
$table = $orders->getOrdersBill($orderId);
if($table):
?>
<!DOCTYPE html>
<html>
<head>
	<meta charset="utf-8">
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<title>Print Processing</title>
    <style type="text/css">
    *{
        font-family: arial;
    }
    table {
        width: 100%;
        border-collapse: collapse;
        font-size: 14px;
        background: #fff;
        margin-bottom: 10px;
    }
    thead th {
        padding: 5px 7px;
        color: #000;
        border-bottom: 2px solid #000;
        text-align: left;
    }

    tfoot tr:first-child {
        padding: 5px 7px;
        color: #000;
        border-top: 2px solid #000;
        text-align: left;
    }
    th.text-center,
    td.text-center {
        text-align: center;
    }
    th.text-right,
    td.text-right {
        text-align: right;
    }
    td{
        padding: 7px 5px;
    }
    th:first-child,
    td:first-child {
        padding-left: 0;
    }
    th:last-child,
    td:last-child {
        padding-right: 0;
    }
    tbody tr {
        border-bottom: 1px solid #f1f1f1;
        color: #000;
    }
    .print-header{
        margin-top: 30px;
        text-align: center;
    }
    .print-header h1{
        font-size: 22px;
        margin-bottom: 5px;
    }
    .print-header h3{
        margin: 0 0 2px; 
    }
    .print-header p{
        margin: 0 0 10px; 
    }
    .print-info {
        display: flex;
        justify-content: space-around;
        align-items: center;
        margin-bottom: 15px;
    }
    .table-number {
        border: 2px solid #000;
        padding: 20px 30px;
        border-radius: 20px;
        text-transform: uppercase;
        font-weight: 600;
    }
    .print-row {
        display: flex;
        justify-content: space-between;
        margin-bottom: 10px;
    }
    .print-footer{
        text-align: center;
    }
    .print-footer p{
        margin: 0;
        padding: 5px 0 5px;
        border-top: 1px dashed #000;
    }
    .print-footer p:last-child{
        border-bottom: 1px dashed #000;
    }
    .print-qrcode {
        text-align: center;
    }
    .print-qrcode img{
        max-width: 300px;
    }
    </style>
</head>
<body>
	<div class="print-header">
		<h1>VIET UC FLOWER GARDEN</h1>
		<p>08 Huỳnh Thúc Kháng, Măng Đen, Kon Plông, Kon Tum.</p>
        <div class="print-info">
            <span class="table-number"><?php echo $table->table_key; ?></span>
            <span class="table-title">
                <h3>PHIẾU TẠM TÍNH</h3>
                <p><?php echo $table->order_id; ?></p>
            </span>
        </div>
        <div class="print-row">
            <span> Giờ vào: <?php echo date("d/m/Y H:i", strtotime($table->created_at));?></span> <span>Giờ in: <?php echo date('H:i'); ?></span>
        </div>
    </div>
    <div class="print-body">
        
        <table>
            <thead>
                <tr>
                    <th>Tên</th>
                    <th>Đ.Giá</th>
                    <th class="text-center">SL</th>
                    <th class="text-right">T.Tiền</th>
                </tr>
            </thead>
            <tbody>
                <?php 
                $total = 0;
                foreach($table->orders as $k=> $item): 
                    $total += ($item->product_price * $item->quantity);
                    ?>
                <tr>
                    <td><?php echo $item->product_name ?></td>
                    <td>
                        <span class="price"><?php echo number_format($item->product_price); ?></span> &nbsp;  x
                    </td>
                    <td class="text-center">
                         <span class="quantity"><?php echo $item->quantity; ?></span>
                    </td>
                    <td class="text-right">
                        <strong class="price">
                            <?php echo number_format($item->product_price * $item->quantity); ?>
                        </strong>
                    </td>
                </tr>
                <?php endforeach; ?>
            </tbody>
            <tfoot>
                <tr>
                    <td colspan="3">Tổng tiền hàng:</td>
                    <td class="text-right">
                        <strong class="total"><?php echo number_format($total); ?></strong>
                    </td>
                </tr>
                <tr>
                    <td colspan="3">Chiết khấu:</td>
                    <td class="text-right">
                        <strong class="total">0</strong>
                    </td>
                </tr>
                <tr>
                    <td colspan="3"><b>Tổng Cộng:</b></td>
                    <td class="text-right">
                        <strong class="total"><?php echo number_format($total); ?></strong>
                    </td>
                </tr>
            </tfoot>
        </table>
    </div>
    <div class="print-qrcode">
        <img id="qrcode-payment" src="http://flowergarden.test/prints/qrcode-payment.png" width="300">
    </div>
    <div class="print-footer">
        <p><b>NGUYEN HAN PHONG</b></p>
        <p>Tài khoản <b>8282 3738 39</b> - TechcomBank </p>
        <p><b>Cảm ơn quý khách và hẹn gặp lại !!!</b></p>
    </div>
    <script type="text/javascript">
        window.addEventListener("message", function(event) {
            if (event.data.action === 'print-bill') {
                window.focus();
                window.print();
            }
        }); 
    </script>
</body>
</html>
<?php
    endif;
?>