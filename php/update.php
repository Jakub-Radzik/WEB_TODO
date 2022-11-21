<?php
session_start();

$servername = "localhost";
$username = "root";
$password = "P@ssw0rd";
$dbname = "php";

$conn = new mysqli($servername, $username, $password, $dbname);
if ($conn->connect_error) {
  die("Connection failed: " . $conn->connect_error);
}

if(isset($_POST['password'])
    && isset($_POST['firstName'])
    && isset($_POST['lastName'])) {
        $password = $_POST['password'];
        $firstName = $_POST['firstName'];
        $lastName = $_POST['lastName'];
        $id = $_SESSION['userId'];


        $sql = "UPDATE Users SET Password = '{$password}', FirstName = '{$firstName}', LastName = '{$lastName}' WHERE Id = {$id};";
        $result = $conn->query($sql);

        if ($result) {
            echo "Record updated successfully";
        } else {
            echo "Error: " . $sql . "<br>" . $conn->error;
        }

    }else{
        echo "Error: ";
    }

    header('Refresh: 2; URL = lista3.php');
?>