<?php
/**
 * ORDERS CLASS
 */
require_once __DIR__ . './database.php';
class Orders extends Database
{
	function __construct()
	{

	}

    public function ping()
    {
        $db=$this->connect();
        $data = $db->query("SELECT COUNT(*) as count FROM `orders` WHERE orders.status='processing' AND orders.updated_at >= NOW() - INTERVAL 1 MINUTE");
        
        $count = 0;
        $orders = [];
        while ($row = $data->fetch_object()){
            $count = intval($row->count);
        }
        if ($count > 0) {
            $data = $db->query("
                SELECT 
                    customers.customer_id, customers.customer_code, customers.customer_status, detail.detail_id, detail.order_id, products.product_name, products.product_price, products.product_type, products.product_unit, detail.quantity, detail.created_at, detail.updated_at, detail.status  
                FROM 
                    `order_detail` as detail
                LEFT JOIN
                    `orders` ON orders.order_id = detail.order_id
                LEFT JOIN
                    `customers` ON customers.customer_id = orders.customer_id
                LEFT JOIN
                    `products` ON products.product_id = detail.product_id
                WHERE 
                    orders.status='processing' AND orders.updated_at >= NOW() - INTERVAL 1 MINUTE
                ORDER BY 
                    orders.order_id DESC
            ");
            while ($row = $data->fetch_object()){
                if ($row->order_id) {
                    $row->detail_id = intval($row->detail_id);
                    $row->order_id = intval($row->order_id);
                    $row->product_price = intval($row->product_price);
                    $row->quantity = intval($row->quantity);
                    $orders[] = $row;
                }
            }
        }
        $db->close();
        return $orders;
    }

    public function getOrders($perPage, $page, $keyword='')
    {
        $db=$this->connect();
        $offset = ($page - 1) * $perPage;
        $where = "1=1 AND detail.status IN ('processing', 'done')";
        if ($keyword!='') {
            $where .= "AND customers.customer_code LIKE '%$keyword%'";
        }
        $data = $db->query("
            SELECT 
                customers.customer_id, customers.customer_code, customers.customer_status, detail.detail_id, detail.order_id, products.product_name, products.product_price, products.product_type, products.product_unit, detail.quantity, detail.created_at, detail.updated_at, detail.status  
            FROM 
                `order_detail` as detail
            LEFT JOIN
                `orders` ON orders.order_id = detail.order_id
            LEFT JOIN
                `customers` ON customers.customer_id = orders.customer_id
            LEFT JOIN
                `products` ON products.product_id = detail.product_id
            WHERE 
                $where
            ORDER BY 
                detail.detail_id ASC
            LIMIT $offset,$perPage
        ");
        $db->close();
        $orders = [];
        while ($row = $data->fetch_object()){
            if ($row->order_id) {
                $row->detail_id = intval($row->detail_id);
                $row->order_id = intval($row->order_id);
                $row->product_price = intval($row->product_price);
                $row->quantity = intval($row->quantity);
                $orders[] = $row;
            }
        }

        return $orders;
    }

    public function getOrdersBy($customerId)
    {
        $db=$this->connect();

        $data = $db->query("
            SELECT 
                customers.customer_id, customers.customer_code, customers.customer_status,
                orders.order_id, products.product_name, products.product_price, products.product_type, products.product_unit, orders.quantity, orders.created_at, orders.status  
            FROM 
                `orders` 
            LEFT JOIN
                `customers` ON customers.customer_id = orders.customer_id
            LEFT JOIN
                `products` ON products.product_id = orders.product_id
            WHERE 
                customers.customer_id=$customerId
            ORDER BY 
                orders.order_id DESC
        ");
        $db->close();
        $orders = [];
        while ($row = $data->fetch_object()){
            if ($row->order_id) {
                $row->order_id = intval($row->order_id);
                $row->product_price = intval($row->product_price);
                $row->quantity = intval($row->quantity);
                $orders[] = $row;
            }
        }

        return $orders;
    }

    public function addOrders($orderId, $datas=[])
    {
    	$db=$this->connect();
        $createdAt = date('Y-m-d H:i:s');
        $orderId = intval($orderId);
        foreach ($datas as $data) {
            $productId = intval($data['product_id']);
            $quantity = intval($data['quantity']);
            $exists = $this->checkExistOrder($orderId, $productId);
            if ($exists) {
                $this->updateOrder($orderId, $productId, $quantity);
            } else {
                $this->addOrder($orderId, $productId, $quantity);
            }
        }
        $resultsServices = $this->getOrderBy($orderId);
        $db->close();
        return $resultsServices;
    }

    public function updateOrders($customerId, $datas=[])
    {
        $db=$this->connect();
        $createdAt = date('Y-m-d H:i:s');
        $customerId = intval($customerId);
        foreach ($datas as $data) {
            $orderId = intval($data['order_id']);
            $quantity = intval($data['quantity']);
            if ($quantity == 0) {
                $db->query("DELETE FROM orders WHERE order_id=$orderId");
            } else {
                $order = $db->query("SELECT product_id, quantity FROM `orders` WHERE order_id=$orderId");
                while($row = $order->fetch_object()){
                    if ($row && $row->product_id && $row->quantity) {
                        $db->query("UPDATE `orders` SET quantity=$quantity WHERE order_id=$orderId");
                        $newQuantity = $quantity - $row->quantity;
                        $this->updateProductStore($row->product_id, $newQuantity);
                    }
                }
            }
        }
        $resultsServices = $this->getOrderBy($customerId);
        $db->close();
        return $resultsServices;
    }

    public function checkExistOrder($orderId, $productId)
    {
    	$db=$this->connect();
        $results = $db->query("
            SELECT
                detail_id
            FROM 
                `order_detail`
            WHERE 
                order_id = $orderId AND product_id=$productId
        ");
        if ($results->num_rows === 0) {
            return false;
        } else {
            return true;
        }
    }

    public function addOrder($orderId, $productId, $quantity=1)
    {
    	$db=$this->connect();
        $createdAt = date('Y-m-d H:i:s');
        $db->query("
            INSERT INTO `order_detail` (`product_id`, `order_id`, `quantity`, `created_at`) 
            VALUES ($productId, $orderId, $quantity, '$createdAt')
        ");
        if ($db->insert_id) {

            $this->updateProductStore($productId, $quantity);
        }
        $db->close();
        return true;
    }

    public function updateOrder($orderId, $productId, $quantity)
    {
    	$db=$this->connect();
        $db->query("UPDATE `order_detail` SET quantity=quantity+$quantity WHERE order_id=$orderId AND product_id=$productId");
        $db->close();
        return true;
    }

    public function removeOrder($orderId)
    {
    	$db=$this->connect();
        $order = $db->query("SELECT product_id, quantity FROM `order_detail` WHERE order_id=$orderId");
        while($row = $order->fetch_object()){
            if ($row && $row->product_id && $row->quantity) {
                $productId = intval($row->product_id);
                $quantity = intval($row->quantity);
                $db->query("start transaction;");
                $updated=$db->query("UPDATE `products` SET product_store=product_store+$quantity WHERE product_id=$productId");
                $removed=$db->query("DELETE FROM order_detail WHERE `order_id`=$orderId");
                if ($updated && $removed) {
                    $db->query("commit;");
                } else {
                    $db->query("rollback;");
                }
            }
        }
        $db->close();
        return true;
    }

    public function updateProductStore($productId, $quantity)
    {
    	$db=$this->connect();
        $sql = "UPDATE `products` SET product_store=product_store-$quantity WHERE product_id=$productId";
        $db->query($sql);
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
        $db->query("UPDATE `order_detail` SET status='$status', updated_at='$updateAt' WHERE order_id=$orderId AND status IN ('new')");
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

    public function getOrdersByCustomer($customerId)
    {
        $db=$this->connect();
        $customer = (object)[];
        $customer->orders = [];
        $data = $db->query("
            SELECT 
                customers.customer_id, customers.customer_number, tickets.ticket_name, customers.created_at, customers.customer_status
            FROM 
                `customers` 
            LEFT JOIN 
                `tickets` on tickets.ticket_id = customers.ticket_id 
            WHERE 
                customers.customer_id = $customerId
        ");
        while ($row = $data->fetch_object()){
            $row->customer_id = intval($row->customer_id);
            $row->customer_number = intval($row->customer_number);
            $customer = $row;
        }
        if ($customer) {
            $orders = [];
            $data = $db->query("
                SELECT 
                    orders.order_id, tickets.ticket_payment, orders.created_at 
                FROM 
                    `orders` 
                LEFT JOIN 
                    `customers` on customers.customer_id = orders.customer_id 
                LEFT JOIN 
                    `tickets` on tickets.ticket_id = orders.ticket_id 
                WHERE 
                    customers.customer_id = $customerId
                ORDER BY 
                    orders.order_id ASC
            ");
            while ($row = $data->fetch_object()){
                $row->order_id = intval($row->order_id);
                $orders[] = $row;
            }
            $customer->orders = $orders;
        }
        $db->close();
        return $customer;
    }

    public function addNewOrder($customerId)
    {
        $db=$this->connect();
        $createdAt = date('Y-m-d H:i:s');
        $db->query("
            INSERT INTO `orders` ( `customer_id`, `ticket_id`, `created_at`) 
            VALUES ($customerId, 2, '$createdAt')
        ");
        $order=(object)[];
        if ($db->insert_id) {
            $data = $db->query("
                SELECT 
                    orders.order_id, tickets.ticket_payment, orders.created_at 
                FROM 
                    `orders` 
                LEFT JOIN 
                    `tickets` on tickets.ticket_id = orders.ticket_id
                WHERE 
                    orders.customer_id = $customerId
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
}