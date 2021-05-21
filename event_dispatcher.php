<?php
    require_once 'auth.php';
    if (!$userid = checkAuth()) exit;

    header("Content-Type: application/json");

    $conn = mysqli_connect($dbconfig['host'], $dbconfig['user'], $dbconfig['password'], $dbconfig['name']);
        
    # Costruisco la query
    $userid = mysqli_real_escape_string($conn, $userid);
    
    $json = json_encode($_GET['id_evento']);
    
    
    $date_now = new DateTime(date("Y-m-d"));
    $query = "SELECT MAX(id) as id, MAX(data_creazione) as data_creazione FROM carrello WHERE id_utente = '".$userid."'";
    $res = mysqli_query($conn, $query);
    

    $array = mysqli_fetch_assoc($res);
   
    if($array['data_creazione']){
        $date_cart = new DateTime($array['data_creazione']);
        $diff = date_diff($date_now, $date_cart);
    }
   
    if(mysqli_num_rows($res) > 0 && ($diff->days <= 7)){
      
       
            $query1 = "INSERT INTO `carrello` (`id`, `id_utente`, `id_evento`, `data_creazione`) VALUES ('".$array['id']."', '".$userid."', '".$_GET['id_evento']."', '".date("Y-m-d")."')";
            $res1 = mysqli_query($conn,$query1);
            if($res1){
                $json = json_encode(array('ok_cart' => true));
            } else {
                $json = json_encode(array('ok_cart' => false));
            }
            mysqli_free_result($res1);
        
    } else {
        
        $query1 = "INSERT INTO `carrello` (`id`, `id_utente`, `id_evento`, `data_creazione`) VALUES (NULL, '".$userid."', '".$_GET['id_evento']."', '".date("Y-m-d")."')";
        $res1 = mysqli_query($conn,$query1);
        if($res1){
            $json = true;
        } else {
            $json = false; 
        }
        mysqli_free_result($res1);
    }
    $check = "SELECT * FROM evento WHERE id = '".$_GET['id_evento']."'";
    $result_check = mysqli_query($conn, $check);
    if(mysqli_num_rows($result_check) <= 0){
       
        mysqli_free_result($check);
        $insert = "INSERT INTO `evento` (`id`, `name`, `data`, `prezzo`, `citta`, `image`) VALUES ('".$_GET['id_evento']."', '".$_GET['name']."', '".$_GET['data']."', '".$_GET['prezzo']."', '".$_GET['citta']."', '".$_GET['image']."')";
        $temp = mysqli_query($conn, $insert);
        if($temp && $json){
           $json = json_encode(array('ok_cart' => true, 'ok_event' => true));
        } else if(!$json) {
            $json = json_encode(array('ok_cart' => false, 'ok_event' => true));
        } else if(!$temp){
            $json = json_encode(array('ok_cart' => true, 'ok_event' => false));
        } else {
            $json = json_encode(array('ok_cart' => false, 'ok_event' => false));
        }
        mysqli_free_result($temp);
        
    }
   
  
    
    mysqli_close($conn);
    echo $json;
    exit;

   
?>