<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>
    <h1>Todo</h1>
    <?php 

        include "connectdb.php";
        $names = ["armandoo","lurnandoo","federicaa","ziopero","ziomelo",
        "asa","uusu","kkkk","ssndsnsd","isisd","usussusu","snusnu"];
        
        for($i = 1; $i < 12; $i++)
        {
            $name = $names[$i];
            $sql = "INSERT INTO $table (name, password) VALUES ('$name','$name')";
            if($conn->query($sql)){
                //echo "ho inserito ".$i;
            }
        }

        $getstuff = "SELECT * FROM $table";
        $result = $conn->query($getstuff);
        echo '<div class="container">';

        if ($result->num_rows > 0) 
        {
            // output data of each row
            while($row = $result->fetch_assoc()) 
            {
                    echo '<div class="rowdata">';
                    $value = $row['id'];
                    echo '<div class = "name">' .$row['name'] . "<br>" . '</div>';
                    echo  "<button class = 'markbutton' onclick = 'deletetask()' value = '$value'>";
                
                echo '</div>';
            }
    }
    echo '</div>';
    
    ?>

    <script src="animation.js"></script>
</body>
</html>