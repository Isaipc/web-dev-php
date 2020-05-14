<?php

include 'database/connection.php';

if(count($_POST) == 0 || !isset($_POST['id']))
    return http_response_code(400);

try{
    $sql = $conn->prepare('DELETE FROM account WHERE id = :id');
    $sql->bindParam(':id', $_POST['id']);
    $sql->execute();

    echo $sql->rowCount() > 0 ?
        'La cuenta fue borrada con exito.' : 'La cuenta no puede ser borrada.';

}catch(PDOException $e){
    die('ERROR: ' . $e->getMessage());
}

