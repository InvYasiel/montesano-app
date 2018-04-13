<?php
//---------------------------------Insertar una reserva---------------------------------  
$fechaEntrada=$_POST['entrada'];
$fechaSalida=$_POST['salida'];

$ins = new PDO("mysql:dbname=juntas;host=127.0.0.1","root","");
    $insert=$ins->prepare("INSERT INTO `reservas` (`entrada`, `salida`,) VALUES (CAST('". $fechaEntrada ."' AS DATETIME),CAST('". $fechaSalida ."' AS DATETIME) )");
    $insert->execute();
?>