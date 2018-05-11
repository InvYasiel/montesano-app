<?php
$text = $_POST['text'];
$correo = $_POST['correo'];
$mail =  $correo;
//Titulo
$titulo = "PRUEBA DE TITULO";
//cabecera
$headers = "MIME-Version: 1.0\r\n"; 
$headers .= "Content-type: text/html; charset=iso-8859-1\r\n"; 
//dirección del remitente 
$headers .= "From: Geeky Theory < ysiel.dev@gmail.com >\r\n";
//Enviamos el mensaje a tu_dirección_email 
$bool = mail("yhernandez@montesano.es",$titulo,$mail,$headers);
if($bool){
    echo "Mensaje enviado";
}else{
    echo "Mensaje no enviado";
}
?>