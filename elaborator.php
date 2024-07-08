<?php 

include "connectdb.php";

$request = $_POST['request'];

switch($request)
{
    case "deletetable":
        $sql = "DROP TABLE $table";
        if(!$conn->query($sql))
        {
            echo "errore di connessione";
        }
}

?>