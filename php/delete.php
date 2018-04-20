<?php
//---------------------------------Eliminar una reserva--------------------------------- 
$id = $_POST['reserva'];


$del = new PDO("mysql:dbname=salas;host=127.0.0.1", "root", "");
$delete = $del->prepare("DELETE FROM reservas WHERE ID=$id ");
$delete->execute();
?>