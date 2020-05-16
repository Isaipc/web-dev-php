<?php

include 'database/connection.php';

if(count($_POST) == 0)
    die(http_response_code(400));

try {
    $sql = $conn->prepare('INSERT INTO account(name, lastname, dni, password, phone, email, zipcode, age, gender, address)
    VALUES(:name, :lastname, :dni, :password, :phone, :email, :zipcode, :age, :gender, :address)');

    $sql->bindParam(':name', $_POST['name']);
    $sql->bindParam(':lastname', $_POST['lastname']);
    $sql->bindParam(':dni', $_POST['dni']);
    $sql->bindParam(':password', $_POST['password']);
    $sql->bindParam(':phone', $_POST['phone']);
    $sql->bindParam(':email', $_POST['email']);
    $sql->bindParam(':zipcode', $_POST['zipcode']);
    $sql->bindParam(':age', $_POST['age']);
    $sql->bindParam(':gender', $_POST['gender']);
    $sql->bindParam(':address', $_POST['address']);
    $sql->execute();
    
    if($sql->rowCount() > 0)
        die(http_response_code(200));
        
}catch(PDOException $e){
    die('ERROR : ' . $e);
}