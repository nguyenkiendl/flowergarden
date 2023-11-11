<?php
/**
 * BBQ CLASS
 */
require_once __DIR__ . '/database.php';
class Bbqs extends Database
{
	function __construct()
	{
		
	}

	public function getBbqs()
    {
    	$db=$this->connect();
        $data = $db->query("SELECT * FROM `bbqs` ORDER BY bbq_id DESC");
        $db->close();
        $bbqs = [];
        while ($row = $data->fetch_object()){
            if ($row->bbq_id) {
                $row->bbq_id = intval($row->bbq_id);
                $row->deposit = intval($row->deposit);
                $bbqs[] = $row;
            }
        }
        return $bbqs;
    }

    public function getBbqProduct()
    {
        $db = $this->connect();
        $data = $db->query("SELECT * FROM `products` WHERE category_id=2 ORDER BY `product_order` ASC");
        $db->close();
        $products = [];
        while ($row = $data->fetch_object()){
            $row->product_id = intval($row->product_id);
            $row->product_price = doubleval($row->product_price);
            $row->quantity = 0;
            $products[$row->product_type][] = $row;
        }
        $sorts = ['combo', 'beef', 'forest', 'sea', 'vegetable'];
        uksort($products, function ($k1, $k2) use ($sorts) {
            $i1 = array_search($k1, $sorts);
            $i2 = array_search($k2, $sorts);
            return $i1 - $i2;
        });
        return $products;
    }

    public function addBbq($name, $deposit, $note, $date, $time)
    {
        $db = $this->connect();
        $createdAt = date('Y-m-d H:i:s');
        $db->query("
            INSERT INTO `bbqs` (`name`, `deposit`, `note`, `date`, `time`, `created_at`) 
            VALUES ('$name', $deposit, '$note', '$date', '$time', '$createdAt')
        ");
        $bbq = (object)[];
        if ($db->insert_id) {
            $bbqId = $db->insert_id;
            $data = $db->query("
                SELECT * FROM `bbqs` WHERE bbq_id=$bbqId");
            while ($row = $data->fetch_object()){
                $row->bbq_id = intval($row->bbq_id);
                $row->deposit = intval($row->deposit);
                $bbq = $row;
            }
        }
        $db->close();
        return $bbq;
    }

    public function updateBbqStatus($bbqId, $status)
    {
        $db=$this->connect();
        $updateAt = date('Y-m-d H:i:s');
        $db->query("UPDATE `bbqs` SET status=$status, updated_at='$updateAt' WHERE bbq_id=$bbqId");
        $db->close();
        return true;
    }

}