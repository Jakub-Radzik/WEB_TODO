<?php
session_start();
$s_id;
if(isset($_COOKIE['PHPSESSID'])){
    $s_id = $_COOKIE['PHPSESSID'];
}else{
    $s_id = session_id();
    if(empty($s_id)){
        session_start();
        $s_id = session_id();
    }
    setcookie('PHPSESSID', $s_id, time()+8400*30, "/");
}

echo "Session ID: </br>".session_id()." </br>";
$msg = '';

if (isset($_POST['login']) && !empty($_POST['username']) && !empty($_POST['password'])) {
    
    if ($_POST['username'] == 'test' && 
        $_POST['password'] == 'test') {
        $_SESSION['valid'] = true;
        $_SESSION['username'] = 'test';
        
        echo 'You have entered valid use name and password';
    }else {
        $msg = 'Wrong username or password';
    }
}
?>
<html>
    <head></head>
    <body>
    <div class = "container">

<a href="./lista2.php">Lista 2</a>
<form class = "form-signin" role = "form" action = "<?php echo htmlspecialchars($_SERVER['PHP_SELF']); ?>" method = "post">
<h4 class = "form-signin-heading"><?php echo $msg; ?></h4>
<input type = "text" class = "form-control" 
    name = "username" placeholder = "username = test" 
    required autofocus></br>
<input type = "password" class = "form-control"
    name = "password" placeholder = "password = test" required>
<button class = "btn btn-lg btn-primary btn-block" type = "submit" 
    name = "login">Login</button>
</form>

<?php

if(isset($_SESSION['valid'])) {
    echo 'You are logged in as: '.$_SESSION['username'];
}else{
    echo 'You are not logged in.';
}
?>
</br></br>
Click here to clean <a href = "logout.php" tite = "Logout">Session.


    </body>
</html>

<!-- 1 -->
<!-- Cookiesy are sending in headers of http request -->

<!-- 2 -->
<!-- 
setcookie() defines a cookie to be sent 
along with the rest of the HTTP headers. 
Once the cookies have been set, they can be accessed 
on the next page load with the $_COOKIE array. 
Cookie values may also exist in $_REQUEST.
-->

<!-- 3 -->
<!-- 
PHP sessions can also work without cookies 
in case cookies are disabled or rejected by 
the browser that the PHP server is trying 
to communicate with.
-->

<!-- Alternatives: -->
<!-- 
    Session storage,
    url parameters,
 -->

<!-- 4 -->
<!-- 
A PHP session is easily started by making a 
call to the session_start() function.
This function first checks if a session is already 
started and if none is started then it starts one. 
It is recommended to put the call to session_start() 
at the beginning of the page. 

Session variables are stored in associative array called $_SESSION[]. 
These variables can be accessed during lifetime of a session.
-->