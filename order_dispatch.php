<?php
    require_once "auth.php";
    if(!$userid = checkAuth()){
        header("Location: homepage.php");
        exit;
    }

    $conn = mysqli_connect($dbconfig['host'], $dbconfig['user'], $dbconfig['password'], $dbconfig['name']);
    $userid = mysqli_real_escape_string($conn, $userid);
    $date = date("Y-m-d");
    

    for($i=0; $i <= count($_POST); $i++){
        $query = "SELECT * FROM pren_corrente WHERE id_utente = '".$userid."' AND id_evento = '".$_POST[$i]."'";
        $res = mysqli_query($conn, $query);
        if(mysqli_num_rows($res) <= 0){
            mysqli_free_result($res);
            $query = "INSERT INTO `pren_corrente` (`id_evento`, `id_utente`, `data`) VALUES ('".$_POST[$i]."', '".$userid."', '".$date."')";
            $res = mysqli_query($conn, $query);
            if($res){
                $json = json_encode(array('ok' => true));
            } else {
                $json = json_encode(array('ok' => false));
            }
            mysqli_free_result($res);
        }
    }


    mysqli_close($conn);
    echo $json;
    exit;
?>