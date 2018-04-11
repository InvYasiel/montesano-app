<?php 
$pdo=new PDO("sqlsrv:Server=172.26.7.192;Database=A3LABORAL", "consulta", "Monte00!");
$statement=$pdo->prepare("SELECT  a.[EmployeeID] 
,[DirectPhoneNumber]
,[CompanyMobilePhoneNumber]
,[Extension]
,[FaxNumber]
,[EmailAddress]
,[Observations]
,[WorkplaceName]
,[EmployeeCode]
,[CompanyCode]
,[CompanyName]
,[Name]
,[SecondName1]
,[SecondName2]
,[CompleteName]
FROM [A3LABORAL].[dbo].[Employee_Locations] as a
    INNER JOIN [A3LABORAL].[dbo].[A3VEmployees] as b
    ON b.[EmployeeID] = a.[EmployeeID]");
$statement->execute();
if (!$statement){
    echo 'Error al ejecutar la consulta';
}else{
    $results = $statement->fetchAll(PDO::FETCH_ASSOC);
    echo  json_encode($results);
}

?>