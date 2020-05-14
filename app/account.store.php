<?php

include 'database/connection.php';

if(count($_POST) == 0)
    return http_response_code(400);

try {
    $sql = $conn->prepare('INSERT INTO account VALUES(
        :name, :lastname, :dni, :password, :phone, :email, :zipcode, :age, :sex, :address)');

    $sql->bindParam(':name', $_POST['name']);
    $sql->bindParam(':lastname', $_POST['lastname']);
    $sql->bindParam(':dni', $_POST['dni']);
    $sql->bindParam(':password', $_POST['password']);
    $sql->bindParam(':phone', $_POST['phone']);
    $sql->bindParam(':email', $_POST['email']);
    $sql->bindParam(':zipcode', $_POST['zipcode']);
    $sql->bindParam(':age', $_POST['age']);
    $sql->bindParam(':sex', $_POST['sex']);
    $sql->bindParam(':address', $_POST['address']);
    $sql->execute();
    
    echo $sql->rowCount() > 0 ?
        'Cuenta agregada con exito' : 'Operación fallida: La cuenta no puede ser agregada';

}catch(PDOException $e){
    die('ERROR : ' . $e->getMessage());
}