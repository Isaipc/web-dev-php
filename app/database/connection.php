<?php

/** constante con el directorio raiz */

const ROOT_DIR  = __DIR__ . '/../../';

try
{
    /** Se cargan las librerias:*/
    $autoload = ROOT_DIR . 'vendor/autoload.php';
    
    if(!file_exists($autoload) || !is_readable($autoload))
    throw new Exception('El archivo que desea incluir no existe o no se puede leer: ' . $autoload);
    
    require_once $autoload;
    
    /** Se cargan las variables de entorno desde el archivo ".env" :*/
    $dotenv = Dotenv\Dotenv::createImmutable(ROOT_DIR);
    $dotenv->load();

}catch(Dotenv\Exception\InvalidPathException $ipe)
{
    die('No se puede encontrar ".env" en la ruta: ' . ROOT_DIR);
}catch(Exception $e)
{
    die($e->getMessage());
}

/** Se extraen los datos de conexión y las credenciales desde las variables de entorno del sistema */
$hostname = getenv('DB_HOST');
$database = getenv('DB_DATABASE');
$username = getenv('DB_USERNAME');
$password = getenv('DB_PASSWORD');

try {

    /** Se realiza la conexión */
    $conn = new PDO("mysql:host=$hostname;dbname=$database;charset=utf8", $username, $password);
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    // echo "connection successfully\n";

} catch (PDOException $e) {
    echo "Connection failed" . $e->getMessage() . "\n";
}