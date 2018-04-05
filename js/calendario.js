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
        var fechas = JSON.parse(this.responseText);
        console.log(fechas);
        for (let i = 0; i < fechas.length; i++) {
            registro.push(fechas[i]);

        }
        console.log(registro);
    }
};
xmlhttp.open("GET", "php/master.php", true);
console.log(xmlhttp)
xmlhttp.send();

//-----------------------------------------------------------------------------
function generarlista(){
    
}
function abrirmodal(dia) {
    var diaModal = document.getElementById('diaCC');
    var ss = document.getElementById('actual');
    var mes = document.getElementById('month').value;
    var year = document.getElementById('year').value;

    diaModal.innerHTML = "";
    if (dia.length == 1) {
        dia = '0' + dia;
    }
    if (mes.length == 1) {
        mes = '0' + mes;
    }
    var seleccionado = year + '-' + mes + '-' + dia;
    
    ss.innerHTML = 'Reservas para ' + year + '-' + mes + '-' + dia;
    for (let i = 0; i < registro.length; i++) {
        if (registro[i].entrada.substring(10, -1) == seleccionado) {
            diaModal.innerHTML += 'Reservado de: ' + registro[i].entrada.substring(11) + ' salida a las: ' + registro[i].salida.substring(11) + '</br>';
        }

    }
    $("#btn-ingresar").click(function () {
       
        var horaEntrada = document.getElementById('horaEntrada').value;
        var horaSalida = document.getElementById('horaSalida').value;
        var fechaEntrada = seleccionado + ' ' + horaEntrada + ':00';
        var fechaSalida = seleccionado + ' ' + horaSalida + ':00';
        var v = true;
        for (let i = 0; i < registro.length; i++) {
            if(fechaEntrada>fechaSalida||fechaEntrada==fechaSalida){
                alert('Error salida antes de la entrada');
                v = false;
                break;
            }
            if (new Date(fechaEntrada)>=new Date(registro[i].entrada)&&new Date(fechaEntrada)<=new Date(registro[i].salida)) {
                alert('Error esa hora está ocupada');
                v = false;
                break;
            }
            
            if(new Date(fechaEntrada)<=new Date(registro[i].entrada)&&new Date(fechaSalida)>=new Date(registro[i].entrada)){
                alert('Error esa hora está ocupada');
                v = false;
                break;
            }
            if(new Date(fechaEntrada)<=new Date(registro[i].entrada)&&new Date(fechaSalida)>=new Date(registro[i].salida)){
                alert('Error esa hora está ocupada');
                v = false;
                break;
            }
            
        }
       if(v==true){
           var infoParaEnviar = {
            entrada: fechaEntrada,
            salida: fechaSalida
        };

        $.ajax({
            type: "POST",
            url: "php/insertar.php",
            data: infoParaEnviar,
            dataType: "text",
            asycn: false, //el error que cometí de sintaxis, es async
            success: function () {
                alert("Ha sido ejecutada la acción.");
            }
        });
       }
        
    });

    $("#calendarioModal").modal();

}