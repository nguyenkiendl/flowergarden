<?php
date_default_timezone_set('Asia/Ho_Chi_Minh');
class Database {
    private $servername = 'localhost';
    private $username = 'admin_flowergarden';
    private $password = 'UL1M8SrWW';
    private $dbname = 'admin_flowergarden';

    protected function connect()
    {
        $conn = new mysqli($this->servername, $this->username, $this->password, $this->dbname);
        $conn->set_charset("utf8");
        return $conn;
    }

}