<?php

include 'database/connection.php';

if(isset($_GET['id'])){

    try{
        $sql = $conn->prepare('SELECT * FROM account WHERE id = :id');
        $sql->bindParam(':id', $_GET['id']);
        $sql->execute();
        
        $result = $sql->fetch();
        
        echo json_encode($result);
        
    }catch(PDOException $e){
        die('ERROR: ' . $e->getMessage());
    }
}