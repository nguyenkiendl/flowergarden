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

    public function addOrders($customerId, $datas=[])
    {
    	$db=$this->connect();
        $createdAt = date('Y-m-d H:i:s');
        $customerId = intval($customerId);
        foreach ($datas as $data) {
            $productId = intval($data['product_id']);
            $quantity = intval($data['quantity']);
            $exists = $this->checkExistOrder($customerId, $productId);
            if ($exists) {
                $this->updateOrder($customerId, $productId, $quantity);
            } else {
                $this->addOrder($customerId, $productId, $quantity);
            }
        }
        $resultsServices = $this->getOrderBy($customerId);
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

    public function checkExistOrder($customerId, $productId)
    {
    	$db=$this->connect();
        $results = $db->query("
            SELECT
                orders.order_id
            FROM 
                `orders`
            WHERE 
                customer_id = $customerId AND product_id=$productId
        ");
        if ($results->num_rows === 0) {
            return false;
        } else {
            return true;
        }
    }

    public function addOrder($customerId, $productId, $quantity=1)
    {
    	$db=$this->connect();
        $createdAt = date('Y-m-d H:i:s');
        $db->query("
            INSERT INTO `orders` (`product_id`, `customer_id`, `quantity`, `created_at`) 
            VALUES ($productId, $customerId, $quantity, '$createdAt')
        ");
        if ($db->insert_id) {
            $this->updateProductStore($productId, $quantity);
        }
        $db->close();
        return true;
    }

    public function updateOrder($customerId, $productId, $quantity)
    {
    	$db=$this->connect();
        $db->query("UPDATE `orders` SET quantity=quantity+$quantity WHERE customer_id=$customerId AND product_id=$productId");
        $db->close();
        return true;
    }

    public function removeService($input=[])
    {
    	$db=$this->connect();
        $order_id = intval($input['order_id']);
        if ($order_id) {
            $productId = intval($input['product_id']);
            $quantity = intval($input['quantity']);
            $updateSql = "UPDATE `products` SET product_store=product_store+$quantity WHERE product_id=$productId";
            if ($db->query($updateSql) === TRUE) {
                $delSql = "DELETE FROM orders WHERE `order_id`=$order_id";
                if ($db->query($delSql) === TRUE) {
                    $customer_id = intval($input['customer_id']);
                    $discountSql = "DELETE FROM discounts WHERE `customer_id`=$customer_id AND product_id=$productId";
                    if ($db->query($discountSql) === TRUE) {
                        return true;
                    } else {
                        return false;
                    }
                } else {
                    return false;
                }
            }
            $db->close();
        }
    }

    public function updateProductStore($productId, $quantity)
    {
    	$db=$this->connect();
        $sql = "UPDATE `products` SET product_store=product_store-$quantity WHERE product_id=$productId";
        $db->query($sql);
        $db->close();
        return true;
    }

    public function getOrderBy($customerId)
    {
    	$db=$this->connect();
        $results = [];
        $data = $db->query("
            SELECT 
                orders.order_id, products.product_id, products.product_name, products.product_price, products.product_store, products.product_type, products.product_unit, orders.quantity 
            FROM 
                `orders` 
            LEFT JOIN 
                `customers` on customers.customer_id = orders.customer_id
            LEFT JOIN 
                `products` on products.product_id = orders.product_id 
            WHERE 
                customers.customer_id = $customerId
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

}