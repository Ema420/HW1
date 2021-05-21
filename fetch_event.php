<?php
    require_once "auth.php";
    if(!$userid = checkAuth()){
        exit;
    }

    header("Content-Type: application/json");

    $conn = mysqli_connect($dbconfig['host'], $dbconfig['user'], $dbconfig['password'], $dbconfig['name']);

    $userid = mysqli_real_escape_string($conn, $userid);

    $query = "SELECT * FROM evento";

    $res = mysqli_query($conn, $query) or die(mysqli_error($conn));
    $eventArray = array();
    while($entry = mysqli_fetch_assoc($res)){
        $eventArray[] = array('id' => $entry['id'], 'name' => $entry['name'], 'data' => $entry['data'], 'prezzo' => $entry['prezzo'],
                        'citta' => $entry['citta'], 'image' => $entry['image']);
    }

    
    echo json_encode($eventArray);

    exit;

?>