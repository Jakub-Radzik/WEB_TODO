<html>
<head></head>
<body>

 <p>Lista 1</div>
<a href="./lista2.php">Lista 2</a>
<a href="./lista3.php">Lista 3</a>

<?php

echo "This is some <b>bold</b> text."."</br>";
echo htmlspecialchars("This is some <b>bold</b> text.")."</br>"."</br>";

function test_input($data) {
    $data = trim($data); //remove whitespaces at the end and start of string
    $data = stripslashes($data); // remove backslashes (\\ => \) and (\. => .)
    $data = htmlspecialchars($data); //replace html markups into text
    return $data;
  }

function print_type_of_value($val) {
    echo $val." is type of: ".gettype($val)."</br>";
}

echo "Your IP address is: ".$_SERVER['REMOTE_ADDR'];

$nameErr = $emailErr = "";
$name = $email = "";

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    if (empty($_POST["name"])) {
      $nameErr = "Name is required";
    } else {
      $name = test_input($_POST["name"]);
      if (!preg_match("/^[a-zA-Z]*$/",$name)) {
        $nameErr = "Only letters and white space allowed";
      }
    }
    
    if (empty($_POST["email"])) {
      $emailErr = "Email is required";
    } else {
      $email = test_input($_POST["email"]);
      if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        $emailErr = "Invalid email format";
      }
    }
}

?>

<form method="post" action="<?php echo htmlspecialchars($_SERVER["PHP_SELF"]);?>">  
  Name: <input type="text" name="name" value="<?php echo $name;?>">
  <span class="error">* <?php echo $nameErr;?></span>
  <br><br>
  E-mail: <input type="email" name="email" value="<?php echo $email;?>">
  <span class="error">* <?php echo $emailErr;?></span>
  <br><br>
  <input type="submit" name="submit" value="Submit"> 
</form>

<div>dane: </div>
<?php
    echo $emailErr;
    echo $nameErr;

    echo $name;
    echo "</br>";
    echo $email;
    echo "</br>";
    echo "</br>";
    
    print_type_of_value(1);
    print_type_of_value("1");
    print_type_of_value(1.0);
    print_type_of_value((int)"1");
    print_type_of_value((string)1);
    print_type_of_value((float)1);
    print_type_of_value((double)1);
    echo "Plus sign: s</br>";
    print_type_of_value(2+2);
    print_type_of_value(2+"2");
    print_type_of_value("2"+"2");
    echo "minus sign: s</br>";
    print_type_of_value(2-2);
    print_type_of_value(2-"2");
    print_type_of_value("2"-"2");
    echo "asterix * sign: s</br>";
    print_type_of_value(2*2);
    print_type_of_value(2*"2");
    print_type_of_value("2"*"2");
    echo "divide / sign: s</br>";
    print_type_of_value(2/2);
    print_type_of_value(2/"2");
    print_type_of_value("2"/"2");


    const FOO = 0;
    echo FOO."</br>";
    // FOO = 1; //error

    // name, value, caseInsensitive (default: false)
    //caseInsensitive no longer supported
    define("DEFINE", "DEFINE const");
    echo DEFINE;
    echo DEFINE=="DEFINE const";
    echo "</br>";
    echo "</br>";

    echo var_dump(array("Volvo", "BMW", "Toyota"));
    echo "</br>";
    $age = array("Peter"=>"35", "Ben"=>"37", "Joe"=>"43");
    echo var_dump($age);
    echo "</br>";
    foreach($age as $x => $x_value) {
        echo "Key=" . $x . ", Value=" . $x_value;
        echo "<br>";
      }

      for ($x = 0; $x <= 10; $x++) {
        echo "The number is: $x <br>";
      }

      echo "count: ".count($age);
      echo "</br>";
    //   internal pointer of an array ! ! !
      echo "reset (returns first value or false + rewinds array's internal pointer to the first element): ".reset($age);
      echo "</br>";
      echo key($age);
      next($age);
      echo "</br>";
      echo key($age);

      function pregMatchResult($p, $v){
        echo "Pattern: { ".$p." } to value: { ".$v." } returns: ".preg_match($p,$v)." </br>";
      }
      function pregReplaceResult($p, $t, $r){
        echo "Pattern: { ".$p." } replaced in: { ".$r." } with text: { ".$t." } returns: ".preg_replace($p, $t, $r)." </br>";
      }

      echo "</br>";
      echo "</br>";
      echo "reg ex </br>";
      pregMatchResult("/a/i", "a");
      pregMatchResult("/a/i", "A");
      pregMatchResult("/a/", "a");
      pregMatchResult("/a/", "A");
      pregMatchResult("/b/i", "a");
      pregMatchResult("/[ab]/i", "a");
      pregMatchResult("/[a-z]/i", "a");
      pregReplaceResult("/a/i",  "e", "jak ja lub nie ja",);
      pregReplaceResult("/A/",  "e", "jak ja lub nie ja",);
      pregReplaceResult("/A/i",  "0", "jak ja lub nie ja",);


      // \ remoce takes away any special meaning that character may have.
      echo "test";
      echo "\\t";
      echo "test";
      echo "\t";
      echo "test";

      function stringFunctionTest($str) {
        echo "</br></br>";
        echo "Given string: ".$str."</br>";
        echo "Length: ".strlen($str)."</br>";
        echo "Word count: ".str_word_count($str)."</br>";
        echo "Reversed: ".strrev($str)."</br></br>";
      }
      stringFunctionTest("raz dwa trzy cztery  4 4 4 4");
      echo "Superglobals: </br>";
      echo "GET: ".var_dump($_GET)."</br>";
      echo "POST: ".var_dump($_POST)."</br>";
      echo "SERVER: ".var_dump($_SERVER)."</br>";
      echo "REQUEST: ".var_dump($_REQUEST)."</br>";
      echo "</br></br></br>";
    /**
     * 1: <?php ?>
     *  */   

    //2: single line comment
    # this is also comment
    /* this is mutliline
    */

    /**
     * 3.
     */

     $a = 1;

     echo 'value: $a';
     echo "</br>";
     echo "value: $a"; # interpolacja
     echo "</br>";
     echo "value: {$a}"; # interpolacja
     echo "</br>";

    //  4. use $
    // $age != $AGE case-sensitive !!!!

    //5 
    echo 2+2*2;
    echo "</br>";

    //6
    //casting - force variable to be evaluated as a certain type  (int), (float)...
    //conversion - may attempt to convert the type of a value to another depends on context.
// Numeric - arithmetical operator
// String - echo, print, interpolation, concat
// Logical - ternary, logical operators
// Integral and string - bitwise operators
// Comparative - comparision operators
// Function - https://www.php.net/manual/en/language.types.type-juggling.php

// 7 
$a = [];
$a[0] = "Volvo";
$a[1] = "BMW";
$a[2] = "Toyota";
echo var_dump($a);
$b = array();
$age = array("Peter"=>"35", "Ben"=>"37", "Joe"=>"43");

// 8
// var_dump
// loops
    die("Function Die print this messageand terminate the current script");
    echo "should not be visible";

// 9 - inputs text, color, email, number
// 10 - submit, form action
// 11 - tablica asocjacyjna
// 12 - input attributes (eg. required) + phpmethods trim, isset, stripslashes, htmlspecialchars

?>

</body>
</html>