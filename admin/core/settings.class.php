<?php
/**
 * SETTINGS CLASS
 */
require_once __DIR__ . '/database.php';
class Settings extends Database
{
	function __construct()
	{
		
	}
	public function getTickets()
    {
    	$db=$this->connect();
        $data = $db->query("
            SELECT * FROM `tickets` ORDER BY ticket_id ASC
        ");
        $db->close();
        $tickets = [];
        while ($row = $data->fetch_object()){
            if ($row->ticket_id) {
                $row->ticket_id = intval($row->ticket_id);
                $row->ticket_price = intval($row->ticket_price);
                $tickets[] = $row;
            }
        }

        return $tickets;
    }
}