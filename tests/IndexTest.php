<?php

use PHPUnit\Framework\TestCase;

class IndexTest extends TestCase
{
    private $conn;
    private $table = 'test_table';

    protected function setUp(): void
    {
        $this->conn = new mysqli('localhost', 'test_user', 'test_password', 'test_db');
        $this->conn->query("CREATE TABLE IF NOT EXISTS $this->table (id INT AUTO_INCREMENT PRIMARY KEY, name VARCHAR(255), password VARCHAR(255))");
    }

    protected function tearDown(): void
    {
        $this->conn->query("DROP TABLE IF EXISTS $this->table");
        $this->conn->close();
    }

    public function testDatabaseConnection()
    {
        $this->assertInstanceOf(mysqli::class, $this->conn);
        $this->assertEquals(0, $this->conn->connect_errno);
    }

    public function testInsertAndRetrieveData()
    {
        $name = 'testuser';
        $password = 'testpass';
        
        $sql = "INSERT INTO $this->table (name, password) VALUES ('$name', '$password')";
        $this->conn->query($sql);

        $result = $this->conn->query("SELECT * FROM $this->table WHERE name = '$name'");
        $this->assertEquals(1, $result->num_rows);

        $row = $result->fetch_assoc();
        $this->assertEquals($name, $row['name']);
        $this->assertEquals($password, $row['password']);
    }

    public function testEmptyTable()
    {
        $result = $this->conn->query("SELECT * FROM $this->table");
        $this->assertEquals(0, $result->num_rows);
    }

    public function testMultipleInserts()
    {
        $names = ['user1', 'user2', 'user3'];
        
        foreach ($names as $name) {
            $sql = "INSERT INTO $this->table (name, password) VALUES ('$name', '$name')";
            $this->conn->query($sql);
        }

        $result = $this->conn->query("SELECT * FROM $this->table");
        $this->assertEquals(count($names), $result->num_rows);
    }

    public function testHtmlOutput()
    {
        ob_start();
        include 'index.php';
        $output = ob_get_clean();

        $this->assertStringContainsString('<html lang="en">', $output);
        $this->assertStringContainsString('<h1>Todo</h1>', $output);
        $this->assertStringContainsString('<div class="container">', $output);
        $this->assertStringContainsString('<button onclick="removeAllTask()" id="deletebutton">', $output);
        $this->assertStringContainsString('<button onclick="addTask()" id="plusbutton">', $output);
    }
}
