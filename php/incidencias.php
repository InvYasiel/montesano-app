<?php 
//---------------------------------Select de las reservas---------------------------------  
$pdo=new PDO("mysql:dbname=salas;host=127.0.0.1;charset=UTF8","root","");
$statement=$pdo->prepare("SELECT * FROM incidencias");
$statement->execute();
if (!$statement){
    echo 'Error al ejecutar la consulta';
}else{
    $results = $statement->fetchAll(PDO::FETCH_ASSOC);
    
}
echo  json_encode($results, JSON_UNESCAPED_UNICODE);
?>