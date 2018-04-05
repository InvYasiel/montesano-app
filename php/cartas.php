<?php 
require('conexion.php');
$con = Conectar();
$SQL = "SELECT TOP (2000) a.[EmployeeID] 
,[DirectPhoneNumber]
,[EmailAddress]
,[Name]
,[SecondName1]
,[SecondName2]
,[CompleteName]
FROM [A3LABORAL].[dbo].[Employee_Locations] as a
    INNER JOIN [A3LABORAL].[dbo].[A3VEmployees] as b
    ON b.[EmployeeID] = a.[EmployeeID]'";
$stmt = $con->prepare($SQL);
$result = $stmt->execute();
$rows = $stmt->fetchAll(\PDO::FETCH_OBJ);
echo json_encode($rows);
?>