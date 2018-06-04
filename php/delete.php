<?php
//---------------------------------Eliminar una reserva--------------------------------- 
$id = $_POST['reserva'];
$usuario =$_POST['usuario'];
$hoy = date('Y-m-d H:i:s');

$del = new PDO("mysql:dbname=salas;host=127.0.0.1;charset=UTF8", "root", "");
$delete = $del->prepare("UPDATE `reservas` SET `eliminada` = CAST('" . $hoy . "' AS DATETIME), `usuarioEliminar` = '". $usuario ."' WHERE `reservas`.`ID` ='". $id ."' ");
$delete->execute();
?>