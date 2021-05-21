<?php
    require_once "dbconfig.php";

    session_start();
    
    function checkAuth(){
        if(isset($_SESSION["username_id"])){
            return $_SESSION["username_id"];
        } else {
            return 0;
        }
    }
?>