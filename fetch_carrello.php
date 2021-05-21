<?php
    require_once "auth.php";
    if(!$userid = checkAuth()){
        exit;
    }

    header("Content-Type: application/json");

    $conn = mysqli_connect($dbconfig['host'], $dbconfig['user'], $dbconfig['password'], $dbconfig['name']);

    $userid = mysqli_real_escape_string($conn, $userid);

    $query = "SELECT id_evento, data_creazione FROM `carrello` WHERE id_utente = '".$userid."'";

    
    $res = mysqli_query($conn, $query) or die(mysqli_error($conn));
    
        
        
    while($entry = mysqli_fetch_assoc($res)){
            
        $query1="SELECT id, name, data, prezzo, citta, image FROM evento WHERE id = '".$entry['id_evento']."'";
        $res1 = mysqli_query($conn, $query1);
        $temp[] = mysqli_fetch_assoc($res1);
            
            
    }
    mysqli_close($conn);

    echo json_encode($temp);
    exit;
?>