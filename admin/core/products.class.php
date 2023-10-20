<?php
/**
 * PRODUCTS CLASS
 */
require_once __DIR__ . './database.php';
class Products extends Database
{
	function __construct()
	{

	}

	public function getProducts()
    {
        $db = $this->connect();
        $data = $db->query("SELECT * FROM `products`");
        $db->close();
        $products = [];
        while ($row = $data->fetch_object()){
            $row->product_id = intval($row->product_id);
            $row->product_price = doubleval($row->product_price);
            $row->product_parent = intval($row->product_parent);
            $row->product_store = intval($row->product_store);
            $row->quantity = intval(0);
            $products[] = $row;
        }

        return $products;
    }
}