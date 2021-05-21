<?php
	require_once "auth.php";
	if(!$userid = checkAuth()){
		header("Location: homepage.php");
		exit;
	}

    header("Content-Type: application/json");

    $conn = mysqli_connect($dbconfig['host'], $dbconfig['user'], $dbconfig['password'], $dbconfig['name']);

    $userid = mysqli_real_escape_string($conn, $userid);

    
    $query = "DELETE FROM `carrello` WHERE id_utente = '".$userid."' AND id_evento = '".$_GET['id_evento']."' AND id = (SELECT MAX(id) FROM carrello WHERE id_utente = '".$userid."')";

    
    $res = mysqli_query($conn, $query) or die(mysqli_error($conn));
   
    if($res){
        
        mysqli_close($conn);
        $temp = array('ok' => true);
        echo json_encode($temp);
        exit;
    }
    
    mysqli_close($conn);
    $temp = array('ok' => false);
    echo json_encode($temp);
    
    exit;

?>