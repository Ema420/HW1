<?php
    require_once "auth.php";
       if(!$userid = checkAuth()){
           header("Location: homepage.php");
           exit;
    }

    $conn = mysqli_connect($dbconfig['host'], $dbconfig['user'], $dbconfig['password'], $dbconfig['name']);
    $userid = mysqli_real_escape_string($conn, $userid);
  
   
    $query = "SELECT id_evento, data FROM pren_passata WHERE id_utente = '".$userid."'";
    $res = mysqli_query($conn, $query);

    $temp = array();
    
    while($array = mysqli_fetch_assoc($res)){
        
        $query1 = "SELECT * FROM evento WHERE id = '".$array['id_evento']."'";
        $res1 = mysqli_query($conn, $query1);
        $temp[] = mysqli_fetch_assoc($res1);
;       
    }
   
    mysqli_close($conn);
    echo json_encode($temp);
    exit;
?>