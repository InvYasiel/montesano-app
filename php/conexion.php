<?php
/* Nombre del servidor. */
$serverName = "172.26.7.192";
/* Usuario y clave.  */
$uid = "consulta";
$pwd = "Monte00!";
/* Array asociativo con la información de la conexion */
$connectionInfo = array("Database"=>"A3LABORAL","UID"=>$uid,"PWD"=>$pwd,"CharacterSet"=>"UTF-8");

/* Nos conectamos mediante la autenticación de SQL Server . */
$conn = sqlsrv_connect( $serverName, $connectionInfo);
if( $conn){
    echo "conexión existosa";
}else{
    echo "fallo en la conxión";
    die(print_r(sqlsrv_errors(), true));
}
?>