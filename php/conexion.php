<?php

function Conectar (){
    $conexion = null;
    $host = '172.26.7.192';
    $db = 'A3LABORAL';
    $user = 'consulta';
    $pwd = 'Monte00!';
    try {
    $conexion = new PDO('sqlsrv:host='.$host.';dbname='.$db, $user, $pwd);
    }
    catch (PDOException $e) {
    echo '<p>No se puede conectar a la base de datos !!</p>';
    exit;
    }
    return $conexion;
   }

?>