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
        
        for($i = 1; $i < 10; $i++)
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
                    $name = $row['name'];
                    echo "<input type = 'text' class = 'name' value = '$name'>"   . '</input>';
                    echo '<div class = "buttonsgroup">';
                        echo "<button class = 'markbutton' onclick = 'deletetask()' value = '$value'>"; echo"</button>";
                        echo "<button class = 'editbutton editsvg' onclick = 'edittask()' value = '$value'>"; echo "</button>";
                    echo '</div>';
                
                echo '</div>';
            }
        }
    echo '<div class = "lastbuttonscontainer">';
    echo '<button onclick="removeAllTask()" id="deletebutton"> 
    <svg width="75px" height="75px" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg"><path fill="#000000" d="M160 256H96a32 32 0 0 1 0-64h256V95.936a32 32 0 0 1 32-32h256a32 32 0 0 1 32 32V192h256a32 32 0 1 1 0 64h-64v672a32 32 0 0 1-32 32H192a32 32 0 0 1-32-32V256zm448-64v-64H416v64h192zM224 896h576V256H224v640zm192-128a32 32 0 0 1-32-32V416a32 32 0 0 1 64 0v320a32 32 0 0 1-32 32zm192 0a32 32 0 0 1-32-32V416a32 32 0 0 1 64 0v320a32 32 0 0 1-32 32z"/></svg>
    
    </button>';

        echo '<button onclick="addTask()" id="plusbutton">  
        <svg fill="#228BE6" xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 50 50" width="75px" height="75px"><path d="M 25 2 C 12.309295 2 2 12.309295 2 25 C 2 37.690705 12.309295 48 25 48 C 37.690705 48 48 37.690705 48 25 C 48 12.309295 37.690705 2 25 2 z M 25 4 C 36.609824 4 46 13.390176 46 25 C 46 36.609824 36.609824 46 25 46 C 13.390176 46 4 36.609824 4 25 C 4 13.390176 13.390176 4 25 4 z M 24 13 L 24 24 L 13 24 L 13 26 L 24 26 L 24 37 L 26 37 L 26 26 L 37 26 L 37 24 L 26 24 L 26 13 L 24 13 z"/></svg>
        </button>';

    echo '</div>';
    echo '</div>';
    
    ?>

<div id="daje"></div>

<script src="animation.js"></script>
</body>
</html>