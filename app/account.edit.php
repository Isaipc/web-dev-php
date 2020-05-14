<?php

include 'database/connection.php';

if(count($_POST) == 0 || !isset($_POST['id']))
    return http_response_code(400);

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
            sex = :sex,
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
    $sql->bindParam(':sex', $_POST['sex']);
    $sql->bindParam(':address', $_POST['address']);
    $sql->execute();
    
    echo $sql->rowCount() > 0  ?
        'Cuenta actualizada con exito.' : 'Operación fallida: La cuenta no se pudo actualizar.';

}catch(PDOException $e){
    die('ERROR : ' . $e->getMessage());
}