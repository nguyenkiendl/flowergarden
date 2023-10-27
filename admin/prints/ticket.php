<?php
require_once __DIR__ . '../../core/customers.class.php';
require_once __DIR__ . '../../core/function.php';
$customerId = 0;
if(!empty($_GET['customer_id'])) {
    $customerId = filter_input(INPUT_GET, 'customer_id', FILTER_VALIDATE_INT);
    if(false === $customerId) {
        $customerId = 0;
    }
}
$customers = new Customers();
$customer = $customers->getNewCustomerData($customerId);
if(!$customer):
    return '';
else :
?>
<!DOCTYPE html>
<html>
<head>
	<meta charset="utf-8">
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<title>Print Ticket</title>
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
        <h3>PHIẾU THANH TOÁN</h3>
    </div>
    <div class="print-body">
        <table>
            <thead>
                <tr>
                    <th className="text-center">KH</th>
                    <th>Tên</th>
                    <th>SL</th>
                    <th>Đ.Giá</th>
                    <th>T.Tiền</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td width="20" class="text-center">
                        #<?php echo $customer->customer_id; ?>
                    </td>
                    <td>Vé Tham Quan Vườn Hoa</td>
                    <td width="20" class="text-center">
                        <span class="quantity"><?php echo $customer->customer_number; ?></span>
                    </td>
                    <td width="100">
                        <span class="price"><?php echo number_format($customer->ticket_price); ?>đ</span>
                    </td>
                    <td width="100" class="text-right">
                        <strong class="price">
                            <?php echo number_format($customer->ticket_price * $customer->customer_number); ?>đ
                        </strong>
                    </td>
                </tr>
            </tbody>
            <tfoot>
                <tr>
                    <td colspan="3"></td>
                    <td>Tổng</td>
                    <td class="text-right">
                        <strong class="total"><?php echo number_format($customer->ticket_price * $customer->customer_number); ?>đ</strong>
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