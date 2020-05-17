<?php

include 'database/connection.php';

if(isset($_GET['search'])){
    
    try{

        $search = $_GET['search'] == '' ? 0 : 1;

        $sql = $conn->prepare("SELECT * FROM account WHERE name LIKE :name OR :search = 0");

        $name = "%". $_GET['search'] . "%";
        $sql->bindParam(':name', $name, PDO::PARAM_STR);
        $sql->bindParam(':search', $search);
        $sql->execute();
        
        $result = $sql->fetchAll();
        echo json_encode($result);
        
    }catch(PDOException $e){
        die('ERROR: ' . $e->getMessage());
    }
}

