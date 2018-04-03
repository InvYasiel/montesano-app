var registro = [];
if (window.XMLHttpRequest) {
    // code for IE7+, Firefox, Chrome, Opera, Safari
    xmlhttp = new XMLHttpRequest();
} else {
    // code for IE6, IE5
    xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
}
xmlhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
        registro.push(JSON.parse(this.response));
        console.log(registro);

    }
};
xmlhttp.open("GET", "php/master.php", true);
xmlhttp.send();


$("#btn-ingresar").click(function () {
    var fechaEntrada = document.getElementById('fechaEntrada').value;
    var fechaSalida = document.getElementById('fechaSalida').value;

    
        var xml = new XMLHttpRequest();

        xml.onreadystatechange = function () {
            if (xml.readyState == 4 && xml.status == 200) {
                alert(xml.responseText);
            }
        }
        xml.open("POST", "php/inserar.php", true);
        xml.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        xml.send("fechaEntrada=" + fechaEntrada + "&fechaSalida=" + fechaSalida);
    

});