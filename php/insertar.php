<?php
//---------------------------------Insertar una reserva--------------------------------- 
$sala = $_POST['sala'];
$usuario = $_POST['usuario']; 
$fechaEntrada = $_POST['entrada'];
$fechaSalida = $_POST['salida'];
$motivo = $_POST['motivo'];

$ins = new PDO("mysql:dbname=salas;host=127.0.0.1;charset=UTF8", "root", "");
$insert = $ins->prepare("INSERT INTO `reservas` (`entrada`, `salida`, `sala`, `Usuario`,`motivo`) VALUES (CAST('" . $fechaEntrada . "' AS DATETIME),CAST('" . $fechaSalida . "' AS DATETIME), CAST('" . $sala . "' AS UNSIGNED), '" . $usuario . "' , '" . $motivo . "' )");
$insert->execute();
?>