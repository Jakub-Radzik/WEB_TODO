<?php
$servername = "localhost";
$username = "root";
$password = "P@ssw0rd";
$dbname = "php";

$conn = new mysqli($servername, $username, $password, $dbname);
if ($conn->connect_error) {
  die("Connection failed: " . $conn->connect_error);
}

if(isset($_POST['username']) 
    && isset($_POST['password'])
    && isset($_POST['firstName'])
    && isset($_POST['lastName'])) {
        $username = $_POST['username'];
        $password = $_POST['password'];
        $firstName = $_POST['firstName'];
        $lastName = $_POST['lastName'];

        $sql = "INSERT INTO Users (Login, Password, FirstName, LastName) VALUES ('{$username}', '{$password}', '{$firstName}', '{$lastName}');";
        $result = $conn->query($sql);

        if ($result) {
            echo "New record created successfully";
        } else {
            echo "Error: " . $sql . "<br>" . $conn->error;
        }


        $result = $conn->query($sql);
    }else{
        echo "Error: ";
    }



    header('Refresh: 2; URL = lista3.php');
?>