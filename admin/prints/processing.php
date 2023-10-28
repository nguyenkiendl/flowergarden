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
$table = $orders->getOrdersProcessing($orderId);
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
        max-width: 200px;
        padding: 20px;
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
                <h3>PHIẾU CHẾ BIẾN</h3>
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
                    <th className="text-center">STT</th>
                    <th>Tên</th>
                    <th>SL</th>
                </tr>
            </thead>
            <tbody>
                <?php 
                foreach($table->orders as $k=> $item): ?>
                <tr>
                    <td width="20" class="text-center">
                        #<?php echo $k + 1; ?>
                    </td>
                    <td><?php echo $item->product_name ?></td>
                    <td width="40" class="text-center">
                        <span class="quantity"><?php echo $item->quantity; ?></span>
                    </td>
                </tr>
                <?php endforeach; ?>
            </tbody>
        </table>
    </div>
    <div class="print-footer"></div>
    <script type="text/javascript">
        window.addEventListener("message", function(event) {
            if (event.data.action === 'print-processing') {
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