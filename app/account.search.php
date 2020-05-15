<?php

include 'database/connection.php';

if(isset($_GET['name'])){
    
    try{
        $search = 'SELECT * FROM account WHERE name LIKE :name';
        $sql = $conn->prepare($search);

        $name = "%". $_GET['name'] . "%";
        $sql->bindParam(':name', $name, PDO::PARAM_STR);
        $sql->execute();
        
        $result = $sql->fetchAll();
        echo json_encode($result);
        
    }catch(PDOException $e){
        die('ERROR: ' . $e->getMessage());
    }
}

