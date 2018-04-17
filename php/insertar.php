<?php
$fechaEntrada=$_POST['entrada'];
$fechaSalida=$_POST['salida'];

$ins = new PDO("mysql:dbname=reservas;host=127.0.0.1","root","");
    $insert=$ins->prepare("INSERT INTO `registro` (`entrada`, `salida`) VALUES (CAST('". $fechaEntrada ."' AS DATETIME),CAST('". $fechaSalida ."' AS DATETIME) )");
    $insert->execute();
?>