<?php
$tiempo = $_POST['tiempo'];

$del = new PDO("sqlsrv:Server=172.26.11.13,49188;Database=InventarioAF", "sa", "Monte01!");
$delete = $del->prepare("UPDATE [dbo].[ACTIVOFIJOSINASIGNAR] SET [IMPRESO] = 'Si',[FECHAIMPRESO] = '$tiempo' WHERE [IMPRESO] = 'No' ");
$delete->execute();
if($delete){
    echo json_encode('1');
    }
else {
    echo json_encode('0');
    }
?>