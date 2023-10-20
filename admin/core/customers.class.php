<?php
/**
 * CUSTOMER CLASS
 */
require_once __DIR__ . './database.php';
class Customers extends Database
{
	function __construct()
	{
		
	}

	public function getCustomers($perPage, $page, $keyword='', $filters=[])
    {

    	$db=$this->connect();
        $offset = ($page - 1) * $perPage;
        $where = "1=1 ";
        if ($filters && $filters['status']) {
            $status = $filters['status'];
            $where .= "AND customers.customer_status = '$status'";
        }
        if ($keyword!='') {
            $where .= "AND customers.customer_code LIKE '%$keyword%'";
        }
        $data = $db->query("
            SELECT 
                customers.customer_id, customers.customer_code, customers.customer_number, customers.customer_type, customers.created_at, customers.customer_status, tickets.ticket_price 
            FROM 
                `customers` 
            LEFT JOIN
                `tickets` ON tickets.ticket_id = customers.ticket_id
            WHERE 
                $where
            ORDER BY 
                customers.customer_id DESC
            LIMIT $offset,$perPage
        ");
        $db->close();
        $customers = [];
        while ($row = $data->fetch_object()){
            if ($row->customer_id) {
                $row->customer_id = intval($row->customer_id);
                $row->customer_number = intval($row->customer_number);
                $row->ticket_price = intval($row->ticket_price);
                $row->orders = $this->countOrders($row->customer_id);
                $customers[] = $row;
            }
        }

        return $customers;
    }

    public function countOrders($customerId)
    {
    	$db=$this->connect();
        $data = $db->query("
            SELECT 
                COUNT(*) as count
            FROM 
                `orders` 
            WHERE 
                customer_id = $customerId
        ");
        $db->close();
        $count = 0;
        while ($row = $data->fetch_object()){
            $count = $row->count;
        }
        return $count;
    }

    public function getCustomer($customerId)
    {
        $db=$this->connect();
        $data = $db->query("
            SELECT 
                customers.customer_id, customers.customer_code, customers.customer_number, customers.customer_type, customers.created_at, customers.customer_status, tickets.ticket_price 
            FROM 
                `customers` 
            LEFT JOIN
                `tickets` ON tickets.ticket_id = customers.ticket_id
            WHERE 
                customers.customer_id = $customerId
            ORDER BY 
                customers.customer_id DESC
        ");
        $db->close();
        $customer = [];
        while ($row = $data->fetch_object()){
            if ($row->customer_id) {
                $row->customer_id = intval($row->customer_id);
                $row->customer_number = intval($row->customer_number);
                $row->ticket_price = intval($row->ticket_price);
                $row->orders = $this->getOrders($row->customer_id);
                $row->discounts = $this->getDiscounts($row->customer_id);
                $customer = $row;
            }
        }

        return $customer;
    }

    public function getOrders($customerId)
    {
        $db=$this->connect();
        $data = $db->query("
            SELECT 
                customers.customer_id, orders.order_id, products.product_id, products.product_name, products.product_price, products.product_store, products.product_type, orders.quantity 
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
        $db->close();
        $orders = [];
        while ($row = $data->fetch_object()){
            $row->customer_id = intval($row->customer_id);
            $row->order_id = intval($row->order_id);
            $row->product_id = intval($row->product_id);
            $row->product_price = intval($row->product_price);
            $row->product_store = intval($row->product_store);
            $row->quantity = intval($row->quantity);
            $orders[] = $row;
        }
        return $orders;
    }

    public function getDiscounts($customerId)
    {
        
        $db=$this->connect();
        $data = $db->query("
            SELECT 
                customers.customer_id, discounts.discount_id, products.product_id, products.product_name, products.product_price, products.product_store, products.product_type, discounts.quantity 
            FROM 
                `discounts` 
            LEFT JOIN 
                `customers` on customers.customer_id = discounts.customer_id
            LEFT JOIN 
                `products` on products.product_id = discounts.product_id 
            WHERE 
                customers.customer_id = $customerId
            ORDER BY 
                discounts.discount_id DESC
        ");
        $discounts = [];
        while ($row = $data->fetch_object()){
            $row->customer_id = intval($row->customer_id);
            $row->discount_id = intval($row->discount_id);
            $row->product_id = intval($row->product_id);
            $row->product_price = intval($row->product_price);
            $row->product_store = intval($row->product_store);
            $row->quantity = intval($row->quantity);
            $discounts[] = $row;
        }
        $db->close();
        return $discounts;
    }

    public function addCustomer($customerType, $customerNumber)
    {
        $db = $this->connect();
        $createdAt = date('Y-m-d H:i:s');
        $customerCode = sprintf("%010d", $this->getMaxCustomerId());
        $ticketId = $this->getTicketId($customerType);
        $db->query("
            INSERT INTO `customers` (`customer_code`, `customer_type`, `ticket_id`, `customer_number`, `created_at`) 
            VALUES ('$customerCode', '$customerType', $ticketId, $customerNumber, '$createdAt')
        ");
        $customer = false;
        if ($db->insert_id) {
            $customer_id = $db->insert_id;
            $data = $db->query("SELECT * FROM `customers` WHERE customer_id=$customer_id");
            while ($row = $data->fetch_object()){
                $row->customer_id = intval($row->customer_id);
                $row->customer_number = intval($row->customer_number);
                $customer = $row;
                $customer->orders = [];
            }
        }
        $db->close();
        return $customer;
    }

    public function getTicketId($customerType)
    {
        $ticketId = 0;
        $db = $this->connect();
        $data = $db->query("SELECT ticket_id FROM `tickets` WHERE ticket_key='$customerType'");
        while ($row = $data->fetch_object()){
            $ticketId = intval($row->ticket_id);
        }
        $db->close();

        return $ticketId;
    }

    public function getMaxCustomerId()
    {
        $maxID = 1;
        $db = $this->connect();
        $data = $db->query("SELECT MAX(customer_id) as max_id FROM `customers`");
        $db->close();
        $customer_code = 0;
        while ($row = $data->fetch_object()){
            $maxID = intval($row->max_id) + 1;
        }

        return $maxID;
    }

    public function updateCustomerStatus($customerId, $customerStatus)
    {
        $db = $this->connect();
        $db->query("UPDATE `customers` SET customer_status='$customerStatus' WHERE customer_id=$customerId");
        $db->close();
        return true;
    }
}