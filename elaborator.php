<?php 

include "connectdb.php";
$findmax = "SELECT MAX(number) AS NUMBERONE FROM $table";
$maxnumbas = 1000000;

if(!$result = $conn->query($findmax)){
    echo "errorerone";
}
else{
    while($row = $result->fetch_assoc()) 
    {
        $maxvalue = $row['NUMBERONE'];
    }
}

echo "IL VALORONE VALEEEE " .$maxvalue ."\n";
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
        for($i=1; $i<=$maxnumbas; $i++)
        {
            $checksql = "SELECT * FROM $table WHERE number = '$i'";
            if($result = $conn->query($checksql))
            {
                if($result->num_rows == 0)
                {
                    $insertnumba = $i;
                    break;
                }
            }
        }
        $insert = "INSERT INTO $table (name, number) VALUES ('','$insertnumba')";
        if(!$conn->query($insert)){
            echo "errore di inserimento";
        }
       
    break;

    case "createtable":
        $tablesql = "CREATE TABLE IF NOT EXISTS $table(
            id int auto_increment,
            name varchar(255),
            number int,
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
        //usa update e set where value = value
        $sql = "UPDATE $table SET name = '$name' 
        WHERE number = '$value'";
        if(!$conn->query($sql)){
            echo "errore update tabella";
        } 
        else echo $value . $name;

        break;
    case "deletefromtable":
        $value = $_POST['value'];
        echo "CANCELLAMENTO " .$value;
        //usa update e set where value = value
        $sql = "DELETE FROM $table WHERE number = '$value'";
        if(!$conn->query($sql)){
            echo "errore cancellamento elemento tabella";
        }
        else echo "HO CANCELLATO IL VALORE ".$value; 
    break;

    case "markdone":
        $value = $_POST['value'];
        $sql = "UPDATE $table SET done = true WHERE number = '$value'";
        if(!$conn->query($sql)){
            echo "errore markdone";
        }
        else echo "HO DONNATO IL VALORE ".$value;
    break;
    case "removedone":
        $value = $_POST['value'];
        $sql = "UPDATE $table SET done = false WHERE number = '$value'";
        if(!$conn->query($sql)){
            echo "errore markdone";
        }
        else echo "HO TOLTO IL VALORE ".$value;
    break;

}

?>