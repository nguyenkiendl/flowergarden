<?php
date_default_timezone_set('Asia/Ho_Chi_Minh');
class Database {
    private $servername = 'localhost';
    private $username = 'root';
    private $password = '123456';
    private $dbname = 'flowergarden';

    protected function connect()
    {
        $conn = new mysqli($this->servername, $this->username, $this->password, $this->dbname);
        $conn->set_charset("utf8");
        return $conn;
    }

}