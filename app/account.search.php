<?php

include 'database/connection.php';

if(isset($_GET['name'])){
    
    try{
        $sql = $conn->prepare('SELECT * FROM account
        WHERE name LIKE ' . $conn->quote('%:name%'));

        $saql->bindParam(':name', $_POST['name']);
        $sql->execute();
        
        $result = $sql->fetch();
        
        echo json_encode($result);
        
    }catch(PDOException $e){
        die('ERROR: ' . $e->getMessage());
    }
}

