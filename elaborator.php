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
    break;
    case "addelement":
       
        //echo "A PUTTAN E NONNT";
        $sql = "INSERT INTO $table (name) VALUES ('')";
        if(!$conn->query($sql)){
            echo "errore inserimento dati";
        }
    break;

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
    break;
    case "edittable":
        $value = $_POST['value'];
        $name = $_POST['content'];
        //echo "A PUTTAN E " .$value;
        //usa update e set where value = value
        $sql = "UPDATE $table SET name = '$name' 
        WHERE id = '$value'";
        if(!$conn->query($sql)){
            echo "errore update tabella";
        } 
        else echo $value . $name;

        break;
    case "deletefromtable":
        $value = $_POST['value'];
        echo "CANCELLAMENTO " .$value;
        //usa update e set where value = value
        $sql = "DELETE FROM $table WHERE id = '$value'";
        if(!$conn->query($sql)){
            echo "errore cancellamento elemento tabella";
        } 
    break;
}

?>