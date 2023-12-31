<?php
/**
 * PRODUCTS CLASS
 */
require_once __DIR__ . '/database.php';
class Products extends Database
{
	function __construct()
	{

	}

	public function getProducts()
    {
        $db = $this->connect();
        $data = $db->query("SELECT * FROM `categories` ORDER BY `category_order` ASC");
        $db->close();
        $categories = [];
        while ($row = $data->fetch_object()){
            $row->category_id = intval($row->category_id);
            $row->products = $this->getProductsBy($row->category_id);
            $categories[] = $row;
        }

        return $categories;
    }

    public function getProductsBy($category_id)
    {
        $db = $this->connect();
        $data = $db->query("SELECT * FROM `products` WHERE category_id=$category_id ORDER BY `product_order` ASC");
        $db->close();
        $products = [];
        while ($row = $data->fetch_object()){
            $row->product_id = intval($row->product_id);
            $row->product_price = doubleval($row->product_price);
            $products[$row->product_type][] = $row;
        }
        $sorts = ['coffee', 'tea', 'juice', 'cream', 'soda', 'beer', 'combo', 'beef', 'forest', 'sea', 'vegetable'];
        uksort($products, function ($k1, $k2) use ($sorts) {
            $i1 = array_search($k1, $sorts);
            $i2 = array_search($k2, $sorts);
            return $i1 - $i2;
        });
        return $products;
    }
}