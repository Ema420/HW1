<?php
    require_once "auth.php";
        if(!$userid = checkAuth()){
            header("Location: homepage.php");
            exit;
        }

    $conn = mysqli_connect($dbconfig['host'], $dbconfig['user'], $dbconfig['password'], $dbconfig['name']);
    $userid = mysqli_real_escape_string($conn, $userid);
  
   
    $query = "SELECT id_evento, data FROM pren_corrente WHERE id_utente = '".$userid."'";
    $res = mysqli_query($conn, $query);
    

    while($array = mysqli_fetch_assoc($res)){
        
        $date_now = new DateTime(date("Y-m-d"));
        $date_cart = new DateTime($array['data']);
        $diff = date_diff($date_now, $date_cart);
        
        if($diff->days <= 7){
            

            $query1="SELECT id, name, data, prezzo, citta, image FROM evento WHERE id = '".$array['id_evento']."'";
            $res1 = mysqli_query($conn, $query1);
            $temp[] = mysqli_fetch_assoc($res1);
            
            mysqli_free_result($res1);
        } else {
            $query1 = "DELETE FROM pren_corrente WHERE id_utente = '".$userid."' AND id_evento = '".$array['id_evento']."' AND data = '".$array['data']."'";
            $res1 = mysqli_query($conn, $query1);
            mysqli_free_result($res1);

            $check = "SELECT * FROM pren_passata WHERE id_evento = '".$array['id_evento']."' AND data = '".$array['data']."' AND id_utente = '".$userid."'";
            $result_check = mysqli_query($conn, $check);
                if(mysqli_num_rows($result_check) <= 0){
                    $query2 = "INSERT INTO `pren_passata` (`id_utente`, `id_evento`, `data`) VALUES ('".$userid."', '".$array['id_evento']."', '".$array['data']."')";
                    $res2 = mysqli_query($conn, $query2);
                    mysqli_free_result($res2);
                }
            
           
        }
    
    }

   
    mysqli_free_result($res);

    mysqli_close($conn);

    echo json_encode($temp);
    exit;
?>