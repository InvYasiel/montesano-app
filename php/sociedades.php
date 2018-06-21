<?php
//---------------------------------Consulta Agenda---------------------------------   
$pdo=new PDO("sqlsrv:Server=172.26.11.13,49188;Database=InventarioAF", "sa", "Monte01!");
$statement=$pdo->prepare("SELECT [NOMBRE], [VALOR]
FROM [dbo].[SOCIEDADES]");
$statement->execute();
if (!$statement){
    echo 'Error al ejecutar la consulta';
}else{
    $results = $statement->fetchAll(PDO::FETCH_ASSOC);
    echo  json_encode($results, JSON_UNESCAPED_UNICODE);
}
?>