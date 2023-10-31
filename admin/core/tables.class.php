<?php
/**
 * TABLES CLASS
 */
require_once __DIR__ . '/database.php';
class Tables extends Database
{
	function __construct()
	{
		
	}

    public function ping()
    {
        
    }

	public function getTables()
    {
    	$db=$this->connect();
        $data = $db->query("
            SELECT * FROM `tables` ORDER BY table_id ASC
        ");
        $db->close();
        $tables = [];
        while ($row = $data->fetch_object()){
            if ($row->table_id) {
                $row->table_id = intval($row->table_id);
                $row->table_status = intval($row->table_status);
                $tables[] = $row;
            }
        }

        return $tables;
    }

    public function getTable($tableId)
    {
        $db=$this->connect();
        $table = (object)[];
        $table->orders = [];
        $data = $db->query("
            SELECT * FROM `tables` WHERE table_id = $tableId
        ");
        while ($row = $data->fetch_object()){
            if($row->table_id){
                $row->table_id = intval($row->table_id);
                $row->table_status = intval($row->table_status);
                $table = $row;
            }
        }
        if ($table) {
            $data = $db->query("
                SELECT 
                    tables.table_id, tables.table_name, orders.order_id, orders.created_at, orders.order_status, tickets.ticket_payment
                FROM 
                    `orders`
                LEFT JOIN 
                    `tables` on tables.table_id = orders.table_id 
                LEFT JOIN
                    `tickets` ON tickets.ticket_id = orders.ticket_id
                WHERE 
                    tables.table_id = $tableId AND orders.created_at >= NOW() - INTERVAL 24 HOUR
                ORDER BY 
                    orders.order_id DESC
            ");
            
            $orders = [];
            while ($row = $data->fetch_object()){
                if ($row->order_id) {
                    $row->order_id = intval($row->order_id);
                    $row->order_status = intval($row->order_status);
                    $orders[] = $row;
                }
            }
            $table->orders = $orders;
        }
        $db->close();
        return $table;
    }

    public function getTableOrders($tableId, $orderId)
    {
        $db=$this->connect();
        $table = (object)[];
        $table->orders = [];
        $data = $db->query("
            SELECT 
                tables.table_id, tables.table_name, tables.table_status, orders.order_id 
            FROM 
                `tables` 
            LEFT JOIN
                `orders` ON orders.table_id = tables.table_id
            WHERE 
                tables.table_id = $tableId AND orders.order_id = $orderId
        ");
        while ($row = $data->fetch_object()){
            if($row->table_id){
                $row->table_id = intval($row->table_id);
                $row->table_status = intval($row->table_status);
                $row->order_id = intval($row->order_id);
                $table = $row;
            }
        }
        if ($table) {
            $data = $db->query("
                SELECT 
                    detail.order_id, products.*, detail.quantity, detail.status 
                FROM 
                    `order_detail` as detail
                LEFT JOIN 
                    `products` on products.product_id = detail.product_id 
                WHERE 
                    detail.order_id = $orderId
                ORDER BY 
                    products.product_name ASC
            ");
            
            $orders = [];
            while ($row = $data->fetch_object()){
                if ($row->order_id) {
                    $row->order_id = intval($row->order_id);
                    $orders[] = $row;
                }
            }
            $table->orders = $orders;
        }
        $db->close();
        return $table;
    }

    public function addOrder($tableId, $ticketId)
    {
        $db=$this->connect();
        $createdAt = date('Y-m-d H:i:s');
        $db->query("
            INSERT INTO `orders` ( `table_id`, `ticket_id`, `created_at`) 
            VALUES ($tableId, $ticketId, '$createdAt')
        ");
        $db->close();
        return true;
    }

    public function updateStatus($tableId, $status)
    {
        $db = $this->connect();
        $db->query("UPDATE `tables` SET table_status='$status' WHERE table_id=$tableId");
        $db->close();
        return true;
    }
}