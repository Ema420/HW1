<?php
    require_once 'auth.php';

    // Se la sessione è scaduta, esco
    if (!checkAuth()) exit;
    
    // Imposto l'header della risposta
    header('Content-Type: application/json');
    
    if(!empty($_GET['type'])){
        searchEvent();
    }else{
        randomEvent();
    }

    function searchEvent(){
        $apikey = '4rb9NzZjOVxGdVAX36YotRlqgACBa6LV';
        
        $ch = curl_init();
        curl_setopt($ch, CURLOPT_URL, 'https://app.ticketmaster.com/discovery/v2/events.json?size=10&keyword='.$_GET['type'].'&apikey='.$apikey);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);

        $res = curl_exec($ch);
        $json = json_decode($res, true);
        curl_close($ch);

        echo json_encode($json['_embedded']['events']);
        exit;
    }

    function randomEvent(){
        $apikey = '4rb9NzZjOVxGdVAX36YotRlqgACBa6LV';
        
        $ch = curl_init();
        curl_setopt($ch, CURLOPT_URL, 'https://app.ticketmaster.com/discovery/v2/events.json?size=10&apikey='.$apikey);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);

        $res = curl_exec($ch);
        $json = json_decode($res, true);
        

        curl_close($ch);
        echo json_encode($json['_embedded']['events']);
        exit;
    }

?>