<?php
    require 'dbconfig.php';

    if(!isset($_GET["q"])){
        echo "non dovresti essere qui";
        exit;
    }
    
    header('Content-Type: application/json');

    $conn = mysqli_connect($dbconfig['host'], $dbconfig['user'], $dbconfig['password'], $dbconfig['name']) or die(mysqli_error($conn));

    $email = mysqli_real_escape_string($conn, $_GET['q']); 

    $query = "SELECT email FROM utente WHERE email = '$email'";
    $res = mysqli_query($conn, $query) or die(mysqli_error($conn));

    $json = json_encode(array('exists' => mysqli_num_rows($res) > 0 ? true : false));
    echo $json;

    mysqli_close($conn);


?>