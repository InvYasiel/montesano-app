<?php
//---------------------------------Consulta Agenda---------------------------------   
$pdo=new PDO("sqlsrv:Server=172.26.7.192;Database=A3LABORAL", "consulta", "Monte00!");
$statement=$pdo->prepare("select * from [master].[dbo].[ZMontesano_Vista_Agenda]");
$statement->execute();
if (!$statement){
    echo 'Error al ejecutar la consulta';
}else{
    $results = $statement->fetchAll(PDO::FETCH_ASSOC);
    echo  json_encode($results);
}
?>