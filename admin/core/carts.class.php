<?php
/**
 * CARTS CLASS
 */
require_once __DIR__ . '/database.php';
class Carts extends Database
{
	function __construct()
	{
		
	}

    public function addToCart($orderId, $productId)
    {
        $db = $this->connect();
        $createdAt = date('Y-m-d H:i:s');
        $exists = $db->query("SELECT detail_id FROM `order_detail` WHERE order_id = $orderId AND product_id=$productId");
        if ($exists->num_rows === 0) {
            $db->query("
                INSERT INTO `order_detail` (`product_id`, `order_id`, `quantity`, `created_at`) 
                VALUES ($productId, $orderId, 1, '$createdAt')
            ");
        } else {
            $db=$this->connect();
            $db->query("UPDATE `order_detail` SET quantity=quantity+1 WHERE order_id=$orderId AND product_id=$productId");
        }
        $count = 0;
        $data = $db->query("SELECT SUM(quantity) as count FROM `order_detail` WHERE order_id = $orderId AND product_id=$productId");
        while ($row = $data->fetch_object()){
            if ($row->count) {
                $count = intval($row->count);
            }
        }
        $db->close();
        $count = $this->getCartCount($orderId);
        return $count;
    }

    public function updateCartQuantity($detailId, $quantity)
    {
        $db=$this->connect();
        $updateAt = date('Y-m-d H:i:s');
        $orderId=0;
        $detail = $db->query("SELECT order_id, detail_id FROM `order_detail` WHERE detail_id=$detailId");
        while($row = $detail->fetch_object()){
            if ($row->detail_id) {
                $orderId = intval($row->order_id);
                if ($quantity>0) {
                    $db->query("UPDATE `order_detail` SET quantity=$quantity, updated_at='$updateAt' WHERE detail_id=$detailId");
                } else {
                    $db->query("DELETE FROM `order_detail` WHERE `detail_id`=$detailId");
                }
            }
        }
        $count = $this->getCartCount($orderId);
        return $count;
    }

    public function removeCartItem($detailId)
    {
        $db=$this->connect();
        $orderId = 0;
        $detail = $db->query("SELECT order_id, detail_id FROM `order_detail` WHERE detail_id=$detailId");
        while($row = $detail->fetch_object()){
            if ($row->detail_id) {
                $orderId = intval($row->order_id);
                $db->query("DELETE FROM `order_detail` WHERE `detail_id`=$detailId");
            }
        }
        $db->close();
        $count = $this->getCartCount($orderId);
        return $count;
    }

    public function getCartCount($orderId)
    {
        $db=$this->connect();
        $count = 0;
        $detail = $db->query("SELECT COUNT(detail_id) as count FROM `order_detail` WHERE order_id=$orderId");
        while($row = $detail->fetch_object()){
            if ($row->count) {
                $count = intval($row->count);
            }
        }
        $db->close();
        return $count;
    }

    public function getCarts($orderId)
    {
        $db=$this->connect();
        $results = [];
        $data = $db->query("
            SELECT 
                detail.detail_id, detail.order_id, products.*, detail.quantity, detail.status 
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
            $row->detail_id = intval($row->detail_id);
            $row->order_id = intval($row->order_id);
            $row->status = intval($row->status);
            $row->product_id = intval($row->product_id);
            $row->product_price = intval($row->product_price);
            $row->quantity = intval($row->quantity);
            $results[] = $row;
        }
        $db->close();
        return $results;
    }
}