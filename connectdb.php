<?php
$servername = "localhost";
$username = "root";
$password = "";

// Create connection
$conn = new mysqli($servername, $username, $password);

$checksql = "DROP DATABASE IF EXISTS CRUD";
if($conn->query($checksql)){}

$sql = "CREATE DATABASE IF NOT EXISTS CRUD";
if($conn->query($sql)){}
$db = "CRUD";
$conn = new mysqli($servername, $username, $password,$db);

$table = "DATA";

$tablesql = "CREATE TABLE IF NOT EXISTS $table(
    id int auto_increment,
    name varchar(255),
    password varchar(255),
    primary key (id)
    )";
if($conn->query($tablesql)){
}
else echo "impossibile fare questa table ";

// Check connection
if ($conn->connect_error) {
  die("Connection failed: " . $conn->connect_error);
}
?>