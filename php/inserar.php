<?php
echo $fechaEntrada=$_POST['fechaEntrada'];
echo $fechaSalida=$_POST['fechaSalida'];

$ins = new PDO("mysql:dbname=reservas;host=127.0.0.1","root","");
    $insert=$ins->prepare("INSERT INTO `registro` (`entrada`, `salida`) VALUES(?, ?)");
    $stmt->execute([$fechaEntrada, $fechaSalida]);
?>