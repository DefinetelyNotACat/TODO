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
    case "addelement":
        $sql = "INSERT INTO $table (name) VALUES ('$name')";
    case "createtable":
        $tablesql = "CREATE TABLE IF NOT EXISTS $table(
            id int auto_increment,
            name varchar(255),
            done boolean,
            primary key (id)
            )";
        if(!$conn->query($tablesql)){
            echo "errore";
        }
    

}

?>