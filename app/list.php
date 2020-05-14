<?php

include 'database/connection.php';

try {
    $sql = $conn->prepare('SELECT * FROM account');
    $sql->execute();

    $result = $sql->fetchAll();
    
    echo json_encode($result);

} catch (PDOException $e) {
    die('ERROR: ' . $e->getMessage());
}
