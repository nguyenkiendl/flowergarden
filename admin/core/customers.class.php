<?php
/**
 * CUSTOMER CLASS
 */
require_once __DIR__ . '/database.php';
class Customers extends Database
{
	function __construct()
	{
		
	}

	public function getCustomers()
    {
    	$db=$this->connect();
        $data = $db->query("
            SELECT 
                customers.customer_id, customers.customer_number, customers.customer_type, customers.created_at, tickets.ticket_price, tickets.ticket_name, tickets.ticket_payment
            FROM 
                `customers` 
            LEFT JOIN
                `tickets` ON tickets.ticket_id = customers.ticket_id
            WHERE 
                 customers.created_at >= NOW() - INTERVAL 24 HOUR
            ORDER BY 
                customers.customer_id DESC
        ");
        $db->close();
        $customers = [];
        while ($row = $data->fetch_object()){
            if ($row->customer_id) {
                $row->customer_id = intval($row->customer_id);
                $row->customer_number = intval($row->customer_number);
                $row->ticket_price = intval($row->ticket_price);
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
                orders.order_id, orders.created_at, customers.customer_id, tickets.ticket_payment
            FROM 
                `orders`
            LEFT JOIN 
                `customers` on customers.customer_id = orders.customer_id 
            LEFT JOIN
                `tickets` ON tickets.ticket_id = orders.ticket_id
            WHERE 
                customers.customer_id = $customerId
            ORDER BY 
                customers.customer_id DESC
        ");
        $db->close();
        $customer = [];
        while ($row = $data->fetch_object()){
            if ($row->customer_id) {
                $row->order_id = intval($row->order_id);
                $row->customer_id = intval($row->customer_id);
                $row->orders = $this->getOrders($row->customer_id);
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
                detail.detail_id, customers.customer_id, orders.order_id, products.product_id, products.product_name, products.product_price, products.product_store, products.product_type, products.product_unit, detail.quantity, detail.status 
            FROM 
                `orders` 
            LEFT JOIN 
                `order_detail` as detail on detail.order_id = orders.order_id
            LEFT JOIN 
                `customers` on customers.customer_id = orders.customer_id
            LEFT JOIN 
                `products` on products.product_id = detail.product_id 
            WHERE 
                customers.customer_id = $customerId
            ORDER BY 
                products.product_name ASC
        ");
        $db->close();
        $orders = [];
        while ($row = $data->fetch_object()){
            if($row->detail_id){
                $row->detail_id = intval($row->detail_id);
                $row->customer_id = intval($row->customer_id);
                $row->order_id = intval($row->order_id);
                $row->product_id = intval($row->product_id);
                $row->product_price = intval($row->product_price);
                $row->product_store = intval($row->product_store);
                $row->quantity = intval($row->quantity);
                $orders[] = $row;
            }
        }
        return $orders;
    }

    public function getDiscounts($customerId)
    {
        
        $db=$this->connect();
        $data = $db->query("
            SELECT 
                customers.customer_id, discounts.discount_id, products.product_id, products.product_name, products.product_price, products.product_store, products.product_type, products.product_unit, discounts.quantity 
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

    public function addCustomer($customerNumber, $customerPhone)
    {
        $db = $this->connect();
        $createdAt = date('Y-m-d H:i:s');
        $ticketId = $this->getTicketId('flower');
        $db->query("
            INSERT INTO `customers` (`customer_phone`, `customer_type`, `ticket_id`, `customer_number`, `created_at`) 
            VALUES ('$customerPhone', 'flower', $ticketId, $customerNumber, '$createdAt')
        ");
        $customer = (object)[];
        if ($db->insert_id) {
            $customerId = $db->insert_id;
            $data = $db->query("
                SELECT customers.*, tickets.* FROM `customers` LEFT JOIN `tickets` ON tickets.ticket_id = customers.ticket_id WHERE customers.customer_id=$customerId");
            while ($row = $data->fetch_object()){
                $row->customer_id = intval($row->customer_id);
                $row->customer_number = intval($row->customer_number);
                $row->ticket_price = intval($row->ticket_price);
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

    public function getNewCustomerData($customerId)
    {
        $db=$this->connect();
        $data = $db->query("
            SELECT 
                customers.customer_id, customers.customer_number, customers.customer_phone, customers.created_at, tickets.ticket_price
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
        $customer = false;
        while ($row = $data->fetch_object()){
            if ($row->customer_id) {
                $row->customer_id = intval($row->customer_id);
                $row->customer_number = intval($row->customer_number);
                $customer = $row;
            }
        }

        return $customer;
    }
}