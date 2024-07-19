<?php 

include "connectdb.php";
$findmax = "SELECT MAX(number) AS NUMBERONE FROM $table";
echo $findmax;
if(!$result = $conn->query($findmax)){
    echo "errorerone";
}
else{
    while($row = $result->fetch_assoc()) 
    {
        $maxvalue = $row['NUMBERONE'];
    }
}

echo "IL VALORONE VALEEEE " .$maxvalue;
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
        $sql = "INSERT INTO $table (name) VALUES ('aaaa')";
        if(!$conn->query($sql)){
            echo "error";
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
        $oldname = substr($name,1);
        //echo "A PUTTAN E " .$value;
        //usa update e set where value = value
        $sql = "UPDATE $table SET name = '$name' 
        WHERE name = '$oldname'";
        if(!$conn->query($sql)){
            echo "errore update tabella";
        } 
        else echo $value . $name;

        break;

    case "deletefromtable":
        $value = $_POST['value'];
        $sql = "DELETE FROM $table WHERE number = '$value'";
        if(!$conn->query($sql)){
            echo "errore delete";
        }
 
}
/*/*case "ordertable":
        // Find missing sequence numbers
        $missingNumbersQuery = "
            SELECT n.number + 1 AS missingNumber
            FROM $table n
            LEFT JOIN $table n1 ON n.number + 1 = n1.number
            WHERE n1.number IS NULL
            AND n.number < (SELECT MAX(number) FROM $table)
            ORDER BY missingNumber
        ";
        
        if (!$missingResult = $conn->query($missingNumbersQuery)) {
            echo "Error finding missing numbers";
        } else {
            while ($missingRow = $missingResult->fetch_assoc()) {
                $missingNumber = $missingRow['missingNumber'];
                $insertSql = "INSERT INTO $table (name, number) VALUES ('', $missingNumber)";
                if (!$conn->query($insertSql)) {
                    echo "Error inserting missing number: " . $missingNumber;
                } else {
                    echo "Inserted missing number: " . $missingNumber;
                }
            }
        }
        break;
        */
        
?>

