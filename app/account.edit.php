<?php

include 'database/connection.php';

if(count($_POST) == 0 || !isset($_POST['id']))
    die(http_response_code(400));

try {
    $sql = $conn->prepare(
        'UPDATE account SET
            name = :name,
            lastname = :lastname,
            dni = :dni,
            password = :password,
            phone = :phone,
            email = :email,
            zipcode = :zipcode,
            age = :age,
            gender = :gender,
            address = :address 
        WHERE id = :id');

    $sql->bindParam(':id', $_POST['id']);
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
    
    echo $sql->rowCount() > 0  ?
        http_response_code(202) :  http_response_code(200);
        
}catch(PDOException $e){
    die('ERROR : ' . $e->getMessage());
}