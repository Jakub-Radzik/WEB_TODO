<?php
ob_start();
session_start();

$servername = "localhost";
$username = "root";
$password = "P@ssw0rd";
$dbname = "php";

$conn = new mysqli($servername, $username, $password, $dbname);
if ($conn->connect_error) {
  die("Connection failed: " . $conn->connect_error);
}
?>

<html>
<head></head>
<body>

<html lang = "en">
   <head>
   </head>
   <body>
   <a href="./index.php">Lista 1</a>
<a href="./lista2.php">Lista 2</a>
<p> lista 3</p>
      <h2>Enter Username and Password</h2> 
      <div>
         <?php
            $msg = '';
            
            if (isset($_POST['login']) && !empty($_POST['username']) 
               && !empty($_POST['password'])) {

                $sql = "SELECT * FROM Users WHERE Login = '{$_POST['username']}' AND Password = '{$_POST['password']}';";
                $result = $conn->query($sql);
                if ($result->num_rows > 0) {
                    $row = $result->fetch_assoc();
                    echo "id: {$row['Id']}, login: {$row['Login']}, password: {$row['Password']}<br>";

                     $_SESSION['valid'] = true;
                     $_SESSION['timeout'] = time();
                     $_SESSION['username'] = $_POST['username'];
                     $_SESSION['password'] = $_POST['password'];
                     $_SESSION['firstName'] = $row['FirstName'];
                     $_SESSION['lastName'] = $row['LastName'];
                     $_SESSION['userId'] = $row['Id'];

                     // save session id in cookie
                     setcookie("PHPSSID", session_id(), time() + 60 * 60 * 24 * 30, '/');


                } else {
                    echo "0 results";
                }



            }
         ?>
      </div>
      
      <div class = "container">
      
      <form action = "<?php echo htmlspecialchars($_SERVER['PHP_SELF']); ?>" method = "post">
            <h4><?php echo $msg; ?></h4>
            <input type="text" name = "username" placeholder="username=test" required></br>
            <input type = "password" name="password" placeholder="password = test" required>
            <button type="submit" name = "login">Login</button>
         </form>

         <form action= "register.php" method = "post">
            <h4><?php echo $msg; ?></h4>
            <input type="text" name="firstName" placeholder="First Name">
            <input type="text" name="lastName" placeholder="Last Name">
            <input type="text" name = "username" placeholder="username" required></br>
            <input type = "password" name="password" placeholder="password " required>
            <button type="submit" name = "register">Register</button>
         </form>


         <form action= "update.php" method = "post">
            <h4><?php echo $msg; ?></h4>
            <input type="text" name="firstName" placeholder="First Name">
            <input type="text" name="lastName" placeholder="Last Name">
            <input type = "password" name="password" placeholder="password " required>
            <button type="submit" name = "register">Update User</button>
         </form>

			
         Click here to clean <a href = "logout.php" tite = "Logout">Session.</a>
         
      </div> 
      
   </body>
</html>


<?php

// fetch all
$sql = "SELECT * FROM Users";

$result = $conn->query($sql);

if ($result->num_rows > 0) {
  // output data of each row
  while($row = $result->fetch_assoc()) {
    echo "id: {$row['Id']}, login: {$row['Login']}, password: {$row['Password']}, First: {$row['FirstName']}, Last Name: {$row['LastName']}<br>";
  }
} else {
  echo "0 results";
}

$a = "w";
$w = "www";

echo $a."</br>";
echo $$a."</br>";




$conn->close();
?>


<!-- 
mysqli_error(mysqli $mysql): string
- Returns the last error message for the most 
recent MySQLi function call that can succeed or fail.

quotemeta(string $string): string 
- Returns a version of str with a backslash character (\) 
before every character that is among these:
. \ + * ? [ ^ ] ( $ )






 -->