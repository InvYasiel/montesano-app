//---------------------------------LLAMADA MASTER.PHP---------------------------------  
var registro = [];

function recogerDatos() {
    if (window.XMLHttpRequest) {
        xmlhttp = new XMLHttpRequest();
    } else {
        xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
    }
    xmlhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            var fechas = JSON.parse(this.responseText);
            console.log(fechas);
            for (let i = 0; i < fechas.length; i++) {
                registro.push(fechas[i]);
            }
            currDate()
        }
    };
    xmlhttp.open("GET", "php/master.php", true);
    console.log(xmlhttp)
    xmlhttp.send();
}


//---------------------------------ABRIR EL MODAL CON LAS RESERVAS ---------------------------------  

function abrirmodal(dia) {
    diaSolo = dia.substring(2, 0);
    var mes = dia.substring(3)
    var diaModal = document.getElementsByClassName('hs');
    var ss = document.getElementById('actual');
    if (mes.length == 1) {
        mes = '0' + mes
    }
    var year = document.getElementById('year').value;
    for (let i = 0; i < diaModal.length; i++) {
        diaModal[i].innerHTML = "";
    }

    var hh = document.getElementsByClassName('hh');
    var seleccionado = year + '-' + mes + '-' + diaSolo;
    for (let i = 0; i < hh.length; i++) {
        hh[i].style = 'margin: 0; height:8px;width: 200px;position:relative;float:right;'
    }
    ss.innerHTML = 'Reservas para ' + year + '-' + mes + '-' + diaSolo;
    //---------------------------------DIBURJAR GRAFICO --------------------------------- 
    for (let i = 0; i < registro.length; i++) {
        if (registro[i].entrada.substring(10, -1) == seleccionado) {

            for (let t = 0; t < hh.length; t++) {
                if (hh[t].id == registro[i].entrada.substring(11, 16)) {
                    hh[t].style = 'background-color:rgba(165, 140, 21, 0.68);margin: 0; height:8px;width: 200px;position:relative;float:right;border-bottom:solid 1px;'
                }
                if (hh[t].id > registro[i].entrada.substring(11, 16) && hh[t].id < registro[i].salida.substring(11, 16)) {
                    hh[t].style = 'background-color:rgba(165, 140, 21, 0.68);margin: 0; height:8px;width: 200px;position:relative;float:right;border-bottom:solid 1px;'
                }
                if (hh[t].id < registro[i].entrada.substring(11, 16) && hh[t].id > registro[i].entrada.substring(11, 16)) {
                    hh[t].style = 'background-color:rgba(165, 140, 21, 0.68);margin: 0; height:8px;width: 200px;position:relative;float:right;border-bottom:solid 1px;'
                }
                if (hh[t].id < registro[i].entrada.substring(11, 16) && hh[t].id > registro[i].salida.substring(11, 16)) {
                    hh[t].style = 'background-color:rgba(165, 140, 21, 0.68);margin: 0; height:8px;width: 200px;position:relative;float:right;border-bottom:solid 1px;'
                }
            }
        }
    }
    //---------------------------------ABRIMOS MODAL ---------------------------------  
    $("#calendarioModal").modal();
    $("#btn-ingresar").click(function () {
    
    //---------------------------------AÑADIMOS NUEVA FECHA ---------------------------------  
    var horaEntrada = document.getElementById('horaEntrada').value;
    var horaSalida = document.getElementById('horaSalida').value;
    var fechaEntrada = seleccionado + ' ' + horaEntrada + ':00';
    var fechaSalida = seleccionado + ' ' + horaSalida + ':00';
    var v = true;
    for (let i = 0; i < registro.length; i++) {
        if (fechaEntrada > fechaSalida || fechaEntrada == fechaSalida) {
            alert('Error salida antes de la entrada');
            v = false;
            break;
        }
        if (new Date(fechaEntrada) >= new Date(registro[i].entrada) && new Date(fechaEntrada) <= new Date(registro[i].salida)) {
            alert('Error esa hora está ocupada');
            v = false;
            break;
        }
        if (new Date(fechaEntrada) <= new Date(registro[i].entrada) && new Date(fechaSalida) >= new Date(registro[i].entrada)) {
            alert('Error esa hora está ocupada');
            v = false;
            break;
        }
        if (new Date(fechaEntrada) <= new Date(registro[i].entrada) && new Date(fechaSalida) >= new Date(registro[i].salida)) {
            alert('Error esa hora está ocupada');
            v = false;
            break;
        }
    }
    //---------------------------------POST A LA BASE DE DATOS---------------------------------  
    if (v == true) {
        var infoParaEnviar = {
            entrada: fechaEntrada,
            salida: fechaSalida
        };
        $.ajax({
            type: "POST",
            url: "php/insertar.php",
            data: infoParaEnviar,
            dataType: "text",
            asycn: false,
            success: function () {
                alert("Ha sido ejecutada la acción.");
            }
        });
    }
});
}
