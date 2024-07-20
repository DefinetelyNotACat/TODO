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
    <div id="audiocontainers">
        <button onclick="changeaudio()" id="audio" class="audioon">
            <svg fill="#000000" width="75px" height="75px" viewBox="0 0 1920 1920" xmlns="http://www.w3.org/2000/svg" class="svg" id = "audioon">
                <path d="M1129.432 113v1694.148H936.638l-451.773-451.773h-315.45C76.01 1355.375 0 1279.365 0 1185.96V734.187c0-93.404 76.01-169.414 169.415-169.414h315.45L936.638 113h192.794Zm-112.943 112.943h-33.093l-418.68 418.68v630.901l418.68 418.68h33.093V225.944Zm655.488 135.114C1831.904 521.097 1920 733.77 1920 960.107c0 226.226-88.096 438.898-248.023 598.938l-79.851-79.85c138.694-138.695 214.93-323.018 214.93-519.087 0-196.183-76.236-380.506-214.93-519.2Zm-239.112 239.745c95.663 97.018 148.294 224.644 148.294 359.272s-52.631 262.254-148.294 359.272l-80.529-79.286c74.769-75.785 115.88-175.175 115.88-279.986 0-104.811-41.111-204.201-115.88-279.986Zm-981.092 76.914H169.415c-31.06 0-56.472 25.3-56.472 56.471v451.773c0 31.172 25.412 56.472 56.472 56.472h282.358V677.716Z" fill-rule="evenodd"/>
            </svg>
            <svg fill="#000000" width="75px" height="75px" viewBox="0 0 1920 1920" xmlns="http://www.w3.org/2000/svg" class="svg hidden" id = "audiooff">
                 <path d="M1129.432 113v1694.148H936.638l-451.773-451.773h-315.45c-92.47 0-167.893-74.498-169.392-166.618L0 1185.96V734.187c0-92.47 74.498-167.892 166.618-169.392l2.797-.022h315.45L936.638 113h192.794Zm-112.943 112.943h-33.093l-418.68 418.68v630.901l418.68 418.68h33.093V225.944Zm823.662 411.78L1920 717.571l-242.372 242.372L1920 1202.428l-79.85 79.85-242.484-242.372-242.372 242.372-79.85-79.85 242.372-242.484-242.371-242.372 79.85-79.85 242.37 242.372 242.486-242.372ZM451.773 677.715H169.415c-30.749 0-55.963 24.796-56.464 55.538l-.008.933v451.773c0 30.86 24.907 55.965 55.542 56.464l.93.008h282.358V677.716Z" fill-rule="evenodd"/>
            </svg>
        </button>
    </div>
   
   
    <?php 

        include "connectdb.php";
       /* ==================== INSERT VALUES =================
       
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
    ---------------------------------------------------------------*/
        $getstuff = "SELECT * FROM $table";
        $result = $conn->query($getstuff);
        echo '<div class="container">';

        if ($result->num_rows > 0) 
        {
            echo '<div class = "containerrows">';
            // output data of each row
            while($row = $result->fetch_assoc()) 
            {
                    echo '<div class="rowdata">';
                    $value = $row['number'];
                    $name = $row['name'];
                    echo "<input type = 'text' class = 'name' value = '$name' number = '$value'>"   . '</input>';
                    echo '<div class = "buttonsgroup">';
                        echo "<button class = 'markbutton' onclick = 'deletetask()' value = '$value'>"; echo"</button>";
                        echo "<button class = 'editbutton editsvg' onclick = 'edittask()' value = '$value'>"; echo "</button>";
                        echo "<button class = 'removebutton' onclick = 'removetask()' value = '$value'>"; echo "</button>";
                    echo '</div>';
                
                echo '</div>';
            }
        }
        echo '</div>';
    echo '<div class = "lastbuttonscontainer">';
    echo '<button onclick="removeAllTask()" id="deletebutton"> 
    <svg width="60px" height="60px" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg"><path fill="#000000" d="M160 256H96a32 32 0 0 1 0-64h256V95.936a32 32 0 0 1 32-32h256a32 32 0 0 1 32 32V192h256a32 32 0 1 1 0 64h-64v672a32 32 0 0 1-32 32H192a32 32 0 0 1-32-32V256zm448-64v-64H416v64h192zM224 896h576V256H224v640zm192-128a32 32 0 0 1-32-32V416a32 32 0 0 1 64 0v320a32 32 0 0 1-32 32zm192 0a32 32 0 0 1-32-32V416a32 32 0 0 1 64 0v320a32 32 0 0 1-32 32z"/></svg> </button>';

        echo 
        '<button onclick="addTask()" id="plusbutton">  
            <svg fill="#228BE6" xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 50 50" width="60px" height="60px"><path d="M 25 2 C 12.309295 2 2 12.309295 2 25 C 2 37.690705 12.309295 48 25 48 C 37.690705 48 48 37.690705 48 25 C 48 12.309295 37.690705 2 25 2 z M 25 4 C 36.609824 4 46 13.390176 46 25 C 46 36.609824 36.609824 46 25 46 C 13.390176 46 4 36.609824 4 25 C 4 13.390176 13.390176 4 25 4 z M 24 13 L 24 24 L 13 24 L 13 26 L 24 26 L 24 37 L 26 37 L 26 26 L 37 26 L 37 24 L 26 24 L 26 13 L 24 13 z"/></svg>
        </button>';

        echo '</div>';
    echo '</div>';
    
    ?>



<script src="animation.js"></script>
</body>
</html>