<?php
/**
 * ADMIN CLASS
 */
require_once __DIR__ . '/database.php';
class Admin extends Database
{
    function __construct()
    {

    }

    public function getOrders($start, $end)
    {
        $db=$this->connect();
        $results = [];
        $data = $db->query("
            SELECT 
                products.product_name, products.product_price, SUM(detail.quantity) as quantity 
            FROM 
                `products`
            LEFT JOIN 
                `order_detail` as detail on detail.product_id = products.product_id 
            WHERE 
                DATE(detail.created_at) >= '$start' AND DATE(detail.created_at) <= '$end'
            GROUP BY 
                products.product_name, products.product_price
            ORDER BY 
                products.product_name ASC
        ");
        while ($row = $data->fetch_object()){
            $row->product_price = intval($row->product_price);
            $row->quantity = intval($row->quantity);
            $results[] = $row;
        }
        $db->close();
        return $results;
    }

    public function getStores()
    {
        $db=$this->connect();
        $results = [];
        $data = $db->query("
            SELECT 
                products.product_name, products.product_price, products.product_unit,
                SUM(stores.store_quantity) as total_quantity, SUM(stores.store_quantitative) as total_quantitytative, SUM(detail.quantity) as total_used 
            FROM 
                `products`
            LEFT JOIN 
                `stores` on stores.product_id = products.product_id 
            LEFT JOIN 
                `order_detail` as detail on detail.product_id = products.product_id
            GROUP BY 
                products.product_name, products.product_price, products.product_unit
            ORDER BY 
                products.product_name ASC
        ");
        while ($row = $data->fetch_object()){
            $row->product_price = intval($row->product_price);
            $row->total_used = intval($row->total_used);
            $row->total_quantity = intval($row->total_quantity);
            $row->total_quantitytative = intval($row->total_quantitytative);
            $row->total_available = $row->total_quantity - $row->total_used;
            $results[] = $row;
        }

        $db->close();
        return $results;
    }
}