


<html>
<?php
const DAY = 60 * 60 * 24;
$color;
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    if (!empty($_POST["color"])) {
      $color = $_POST["color"];
      setcookie("color", $_POST["color"], time()+DAY*30, "/");
    }
}else{
    if(!isset($_COOKIE["color"])){
        $color = '#ffffff';
    }else{
        $color = $_COOKIE["color"];
        setcookie("color", $color, time()+DAY*30, "/");
    }
}

function printBiscuits(){
foreach($_COOKIE as $x => $x_value) {
    echo '$_COOKIE[' . $x . "] = " . $x_value;
    echo "<br>";
    }
}
printBiscuits();



?>
<head></head>
<body style="background: <?php echo $color; ?>">

<a href="./index.php">Lista 1</a>
<p> lista 2</p>
<a href="./session.php">sesja</a>
<a href="./lista3.php">Lista 3</a>
</br></br></br>



<form method="post" action="<?php echo htmlspecialchars($_SERVER["PHP_SELF"]);?>">  
  Color: <input type="color" name="color" value="<?php echo $color;?>">

  <input type="submit" name="submit" value="Submit"> 
</form>



</div> 

</div> 


<form>
</form>

</body>
</html>