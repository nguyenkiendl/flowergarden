<?php
/**
 * ORDERS CLASS
 */
require_once __DIR__ . '/database.php';
class Orders extends Database
{
    function __construct()
    {

    }

    public function addOrders($orderId, $datas=[])
    {
        $db=$this->connect();
        $createdAt = date('Y-m-d H:i:s');
        $orderId = intval($orderId);
        foreach ($datas as $data) {
            $productId = intval($data['product_id']);
            $quantity = intval($data['quantity']);
            $detailId = $this->checkOrderExist($orderId, $productId, $quantity);
            if ($detailId!=0) {
                $this->updateOrder($detailId, $quantity);
            } else{
                $this->addOrder($orderId, $productId, $quantity);
            }
        }
        $db->close();
        return true;
    }

    public function checkOrderExist($orderId, $productId, $quantity)
    {
        $db=$this->connect();
        $detailId = 0;
        $data = $db->query("SELECT detail_id FROM `order_detail` WHERE order_id=$orderId AND product_id=$productId");
        while ($row = $data->fetch_object()){
            if ($row->detail_id) {
                $detailId = intval($row->detail_id);
            }
        }
        $db->close();
        return $detailId;
    }

    public function addOrder($orderId, $productId, $quantity)
    {
        if($quantity > 0){
            $db=$this->connect();
            $createdAt = date('Y-m-d H:i:s');

            $db->query("
                INSERT INTO `order_detail` (`product_id`, `order_id`, `quantity`, `created_at`) 
                VALUES ($productId, $orderId, $quantity, '$createdAt')
            ");
            $db->close();
        }
        return true;
    }

    public function updateOrder($detailId, $quantity)
    {
        $db=$this->connect();
        if ($quantity === 0) {
            $db->query("DELETE FROM `order_detail` WHERE `detail_id`=$detailId");
        } else {
            $db->query("UPDATE `order_detail` SET quantity=$quantity WHERE detail_id=$detailId");
        }
        $db->close();
        return true;
    }

    public function getOrderBy($orderId)
    {
        $db=$this->connect();
        $results = [];
        $data = $db->query("
            SELECT 
                detail.order_id, products.product_id, products.product_name, products.product_price, products.product_store, products.product_type, products.product_unit, detail.quantity, detail.status 
            FROM 
                `order_detail` as detail
            LEFT JOIN 
                `products` on products.product_id = detail.product_id 
            WHERE 
                detail.order_id = $orderId
            ORDER BY 
                products.product_name ASC
        ");
        while ($row = $data->fetch_object()){
            $row->order_id = intval($row->order_id);
            $row->product_id = intval($row->product_id);
            $row->product_price = intval($row->product_price);
            $row->product_store = intval($row->product_store);
            $row->quantity = intval($row->quantity);
            $results[] = $row;
        }
        $db->close();
        return $results;
    }

    public function updateOrderStatus($orderId, $status)
    {
        $db=$this->connect();
        $updateAt = date('Y-m-d H:i:s');
        $db->query("UPDATE `orders` SET order_status=$status, updated_at='$updateAt' WHERE order_id=$orderId");
        $db->close();
        return true;
    }

    public function updateDetailStatus($detailId, $status)
    {
        $db=$this->connect();
        $updateAt = date('Y-m-d H:i:s');
        $db->query("UPDATE `order_detail` SET status='$status', updated_at='$updateAt' WHERE detail_id=$detailId");
        $db->close();
        return true;
    }

    public function bookingBegin($tableId, $type)
    {
        $db=$this->connect();
        $createdAt = date('Y-m-d H:i:s');
        $ticketId = $this->getTicketId($type);
        $db->query("
            INSERT INTO `orders` ( `table_id`, `ticket_id`, `created_at`) 
            VALUES ($tableId, $ticketId, '$createdAt')
        ");
        $order=(object)[];
        if ($db->insert_id) {
            $db->query("UPDATE `tables` SET table_status=1 WHERE table_id=$tableId");
            $data = $db->query("
                SELECT 
                    orders.order_id, tickets.ticket_payment, orders.created_at 
                FROM 
                    `orders` 
                LEFT JOIN 
                    `tickets` on tickets.ticket_id = orders.ticket_id
                WHERE 
                    orders.table_id = $tableId AND orders.order_status = 0
                ORDER BY 
                    orders.order_id ASC
            ");
            while ($row = $data->fetch_object()){
                $row->order_id = intval($row->order_id);
                $order = $row;
            }
        }
        $db->close();
        return $order;
    }

    public function bookingEnd($tableId)
    {
        $db=$this->connect();
        $db->query("UPDATE `tables` SET table_status=0 WHERE table_id=$tableId");
        $db->close();
        return true;
    }

    public function getTicketId($type)
    {
        $ticketId = 0;
        $db = $this->connect();
        $data = $db->query("SELECT ticket_id FROM `tickets` WHERE ticket_key='$type'");
        while ($row = $data->fetch_object()){
            $ticketId = intval($row->ticket_id);
        }
        $db->close();
        return $ticketId;
    }

    public function getOrdersProcessing($orderId)
    {
        $db=$this->connect();
        $updateAt = date('Y-m-d H:i:s');
        $table = (object)[];
        $table->orders = [];
        $data = $db->query("SELECT tables.* ,orders.* FROM `tables` LEFT JOIN orders ON orders.table_id = tables.table_id WHERE orders.order_id=$orderId");
        while ($row = $data->fetch_object()){
            if ($row->table_id) {
                $tableId = intval($row->table_id);
                $table=$row;
            }
        }
        if ($table) {
            $orders = [];
            $data = $db->query("
                SELECT 
                    detail.*, products.*
                FROM 
                    `order_detail` as detail
                LEFT JOIN 
                    `products` on products.product_id = detail.product_id 
                WHERE 
                    detail.order_id = $orderId AND detail.status = 0
                ORDER BY 
                    products.product_name ASC
            ");
            while ($row = $data->fetch_object()){
                $row->order_id = intval($row->order_id);
                $row->product_id = intval($row->product_id);
                $row->product_price = intval($row->product_price);
                $row->quantity = intval($row->quantity);
                $orders[] = $row;
            }

            $table->orders = $orders;
        }
        
        $db->close();
        return $table;
    }

    public function getOrdersBill($orderId)
    {
        $db=$this->connect();
        $updateAt = date('Y-m-d H:i:s');
        $table = (object)[];
        $table->orders = [];
        $data = $db->query("SELECT tables.* ,orders.* FROM `tables` LEFT JOIN orders ON orders.table_id = tables.table_id WHERE orders.order_id=$orderId");
        while ($row = $data->fetch_object()){
            if ($row->table_id) {
                $tableId = intval($row->table_id);
                $table=$row;
            }
        }
        if ($table) {
            $orders = [];
            $data = $db->query("
                SELECT 
                    detail.*, products.*
                FROM 
                    `order_detail` as detail
                LEFT JOIN 
                    `products` on products.product_id = detail.product_id 
                WHERE 
                    detail.order_id = $orderId
                ORDER BY 
                    products.product_name ASC
            ");
            while ($row = $data->fetch_object()){
                $row->order_id = intval($row->order_id);
                $row->product_id = intval($row->product_id);
                $row->product_price = intval($row->product_price);
                $row->quantity = intval($row->quantity);
                $orders[] = $row;
            }

            $table->orders = $orders;
        }
        
        $db->close();
        return $table;
    }
}