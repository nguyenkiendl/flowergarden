<?php
class Database {
    private $servername = 'localhost';
    private $username = 'root';
    private $password = '123456';
    private $dbname = 'flowergarden';
    public function __construct()
    {

    }

    private function connect()
    {
        $conn = new mysqli($this->servername, $this->username, $this->password, $this->dbname);
        $conn->set_charset("utf8");
        return $conn;
    }

    public function getCustomers()
    {
        $sql = $this->connect();
        $data = $sql->query("SELECT * FROM `customers` ORDER BY customer_id DESC");
        $sql->close();
        $customers = [];
        while ($row = $data->fetch_object()){
            $row->customer_id = intval($row->customer_id);
            $row->customer_number = intval($row->customer_number);
            $row->services = [];
            $customers[] = $row;
        }

        return $customers;
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
                $customer->services = [];
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


    public function getOrders($perPage, $page, $keyword='', $filters=[])
    {
        $db = $this->connect();
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
        $orders = [];
        while ($row = $data->fetch_object()){
            if ($row->customer_id) {
                $row->customer_id = intval($row->customer_id);
                $row->customer_number = intval($row->customer_number);
                $row->ticket_price = intval($row->ticket_price);
                $row->services = $this->countServices($row->customer_id);
                $orders[] = $row;
            }
        }

        return $orders;
    }

    public function getCustomer($customerId)
    {
        $db = $this->connect();

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
                $row->services = $this->getServices($row->customer_id);
                $row->discounts = $this->getDiscounts($row->customer_id);
                $customer = $row;
            }
        }

        return $customer;
    }

    public function getDiscounts($customerId)
    {
        
        $db = $this->connect();
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

    public function getServices($customerId)
    {
        $db = $this->connect();
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
        $services = [];
        while ($row = $data->fetch_object()){
            $row->customer_id = intval($row->customer_id);
            $row->order_id = intval($row->order_id);
            $row->product_id = intval($row->product_id);
            $row->product_price = intval($row->product_price);
            $row->product_store = intval($row->product_store);
            $row->quantity = intval($row->quantity);
            $services[] = $row;
        }
        return $services;
    }

    public function countServices($customerId)
    {
        $db = $this->connect();
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

    public function addOrders($customerId, $services=[])
    {
        $db = $this->connect();
        $createdAt = date('Y-m-d H:i:s');
        $customerId = intval($customerId);
        foreach ($services as $service) {
            $productId = intval($service['product_id']);
            $quantity = intval($service['quantity']);
            $this->addOrder($customerId, $productId, $quantity);
        }
        $resultsServices = $this->getServiceBy($customerId);
        $db->close();
        return $resultsServices;
    }

    public function addServices($customerId, $services=[])
    {
        $db = $this->connect();
        $createdAt = date('Y-m-d H:i:s');
        $customerId = intval($customerId);
        foreach ($services as $service) {
            $productId = intval($service['product_id']);
            $quantity = intval($service['quantity']);
            $exists = $this->checkExistService($customerId, $productId);
            if ($exists) {
                $this->updateService($customerId, $productId, $quantity);
            } else {
                $this->addService($customerId, $productId, $quantity);
            }
            $this->updateProductStore($productId, $quantity);
        }
        $resultsServices = $this->getServiceBy($customerId);
        $db->close();
        return $resultsServices;
    }

    public function checkExistService($customerId, $productId)
    {
        $db = $this->connect();
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
        $db = $this->connect();
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

    public function updateService($customerId, $productId, $quantity)
    {
        $db = $this->connect();
        $db->query("UPDATE `orders` SET quantity=quantity+$quantity WHERE customer_id=$customerId AND product_id=$productId");
        $db->close();
        return true;
    }

    public function removeService($input=[])
    {
        $db = $this->connect();
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
        $db = $this->connect();
        $sql = "UPDATE `products` SET product_store=product_store-$quantity WHERE product_id=$productId";
        $db->query($sql);
        $db->close();
        return true;
    }

    public function getServiceBy($customerId)
    {
        $results = [];
        $sql = $this->connect();
        $data = $sql->query("
            SELECT 
                products.product_id, products.product_name, products.product_price, products.product_store, products.product_type, orders.quantity 
            FROM 
                `orders` 
            LEFT JOIN 
                `customers` on customers.customer_id = orders.customer_id
            LEFT JOIN 
                `products` on products.product_id = orders.product_id 
            WHERE 
                customers.customer_id = $customerId
            ORDER BY 
                orders.order_id DESC
        ");
        while ($row = $data->fetch_object()){
            $row->product_id = intval($row->product_id);
            $row->product_price = intval($row->product_price);
            $row->product_store = intval($row->product_store);
            $row->quantity = intval($row->quantity);
            $results[] = $row;
        }
        $sql->close();
        return $results;
    }
    
}