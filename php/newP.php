<?php
//---------------------------------Insertar una reserva--------------------------------- 
$nombre = $_POST['nombre'];
$fijo = $_POST['fijo']; 
$extFijo = $_POST['extFijo'];
$extFijo2 = $_POST['extFijo2'];
$movil = $_POST['movil'];
$extmovil = $_POST['extmovil'];
$extIP = $_POST['extIP']; 
$email = $_POST['email'];
$email2 = $_POST['email2'];
$lugar = $_POST['lugar'];
$centro = $_POST['centro'];

$ins = new PDO("mysql:dbname=salas;host=127.0.0.1;charset=UTF8", "root", "");
$insert = $ins->prepare("INSERT INTO `extensiones` (`Name`, `NumeroFijo`, `Extension`, `Extension2`,`NumeroMovil`,`extMovil`,`extVozIP`,`Email`,`Email2`,`CompanyName`,`Centro`) VALUES ('" . $nombre . "' , '" . $fijo . "','" . $extFijo . "' , '" . $extFijo2 . "', '" . $movil . "','" . $extmovil . "' , '" . $extIP . "','" . $email . "' , '" . $email2 . "','" . $lugar . "' , '" . $centro . "' )");
$insert->execute();
?>