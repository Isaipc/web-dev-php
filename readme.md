# PHP CRUD con JS y MySQL 

## Acerca de
Este es un pequeño proyecto CRUD usando tecnologias web tradicionales.

## Requerimientos 
- WAMP ó XAMPP 
    - PHP 7.x
    - MySQL 5.6+ | MariaDB 10.4+
- Composer 

## Instalación

1. Clonar o descargar este proyecto en:
    - `C:\xampp\htdocs\` si usas XAMPP 
    - `C:\wamp64\wwww` si usas WAMP
2. Abrir un terminal en la carpeta del proyecto
3. Instalar las dependencias:
```
composer install
```
4. Crear un archivo `.env` especificando las credenciales de tu conexion de BD
Puedes apoyarte del archivo `.env.expample`.
```
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=nombre_bd
DB_USERNAME=username
DB_PASSWORD=password
```
5. Ejecuta en tu gestor de bases de datos el archivo `db.sql`.
6. Listo 👍. Recuerda acceder a la pagina con `localhost/web-de-php`.


