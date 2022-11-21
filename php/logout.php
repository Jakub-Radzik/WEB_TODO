<?php
   session_start();
   unset($_COOKIE["PHPSESSID"]);
   unset($_SESSION["username"]);
   unset($_SESSION["valid"]);


   echo 'You have cleaned session';
   header('Refresh: 2; URL = session.php');
?>