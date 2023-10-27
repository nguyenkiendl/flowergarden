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
$products = $orders->getOrdersProcessing($orderId);
if($products):
?>
<!DOCTYPE html>
<html>
<head>
	<meta charset="utf-8">
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<title>Print Processing</title>
    <style type="text/css">
    table {
        width: 100%;
        border-collapse: collapse;
        font-size: 14px;
        background: #fff;
        margin-bottom: 10px;
    }
    thead th {
        text-transform: uppercase;
        text-align: center;
        padding: 5px 7px;
        color: var(--primary);
        border-bottom: 1px dashed var(--primary);
        text-align: left;
        background: #efefef;
    }
    th.text-center,
    td.text-center {
        text-align: center;
    }
    th.text-right.
    td.text-right {
        text-align: right;
    }
    td{
        padding: 5px;
    }
    td:last-child {
        border-bottom: none;
    }
    tbody tr {
        border-bottom: 1px solid #f1f1f1;
        color: var(--primary);
    }
    .print-header{
        text-align: center;
    }
    </style>
</head>
<body>
	<div class="print-header">
		<h1>VIET UC FLOWER GARDEN</h1>
		<p>08 Huỳnh Thúc Kháng, Măng Đen, Kon Plông, Kon Tum.</p>
        <h3>PHIẾU TÍNH TIỀN</h3>
    </div>
    <div class="print-body">
        <table>
            <thead>
                <tr>
                    <th className="text-center">STT</th>
                    <th>Tên</th>
                    <th>SL</th>
                    <th>Đ.Giá</th>
                    <th>T.Tiền</th>
                </tr>
            </thead>
            <tbody>
                <?php 
                $total = 0;
                foreach($products as $k=> $item): 
                    $total += ($item->product_price * $item->quantity);
                    ?>
                <tr>
                    <td width="20" class="text-center">
                        #<?php echo $k + 1; ?>
                    </td>
                    <td><?php echo $item->product_name ?></td>
                    <td width="20" class="text-center">
                        <span class="quantity"><?php echo $item->quantity; ?></span>
                    </td>
                    <td width="100">
                        <span class="price"><?php echo number_format($item->product_price); ?>đ</span>
                    </td>
                    <td width="100" class="text-right">
                        <strong class="price">
                            <?php echo number_format($item->product_price * $item->quantity); ?>đ
                        </strong>
                    </td>
                </tr>
                <?php endforeach; ?>
            </tbody>
            <tfoot>
                <tr>
                    <td colspan="3"></td>
                    <td>Tổng</td>
                    <td class="text-right">
                        <strong class="total"><?php echo number_format($total); ?>đ</strong>
                    </td>
                </tr>
            </tfoot>
        </table>
    </div>
    <div class="print-footer"></div>
</body>
</html>
<?php
    endif;
?>