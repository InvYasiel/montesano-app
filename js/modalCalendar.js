var seleccionado = '';
function abrirmodal(dia) {
    var horaEntrada = document.getElementById('horaEntrada').value = "00:00";
    var horaSalida = document.getElementById('horaSalida').value = "00:00";
    crearEsquema();
    diaSolo = dia.substring(2, 0);
    var mes = dia.substring(3)
    var diaModal = document.getElementsByClassName('hs');
    var ss = document.getElementById('actual');
    if (mes.length == 1) {
        mes = '0' + mes
    }
    var year = document.getElementById('anio').value;
    for (let i = 0; i < diaModal.length; i++) {
        diaModal[i].innerHTML = "";
    }
    var hh = document.getElementsByClassName('hh');
    seleccionado = year + '-' + mes + '-' + diaSolo;
    var fechaEntrada = seleccionado + ' ' + horaEntrada + ':00';
    var fechaSalida = seleccionado + ' ' + horaSalida + ':00';
    var dd = document.getElementById(fechaEntrada.substring(8, 10) + ' ' + fechaEntrada.substring(6, 7));
    for (let i = 0; i < hh.length; i++) {
        hh[i].style = 'margin: 0; height:8px;width: 200px;position:relative;float:right;'
      
    }
    ss.innerHTML = 'Reservas para ' + year + '-' + mes + '-' + diaSolo;
    //---------------------------------DIBUJAR GRAFICO --------------------------------- 
    var selectedSala = document.getElementById("selectedSala").value;
    for (let i = 0; i < registro.length; i++) {
        if (registro[i].entrada.substring(10, -1) == seleccionado && registro[i].sala == selectedSala) {
            var randomrgba = random_rgba();
            var coderight = registro[i].Usuario.substring(4, 8)
            var codeleft = registro[i].Usuario.substring(0, 4);
            var employeecode = "00" + coderight;
            var employeeName = "";
            registroCC.forEach(e => {
                if (e.EmployeeCode == employeecode && e.CompanyCode == codeleft) {
                    employeeName = e.Name;
                }
            });
            for (let t = 0; t < hh.length; t++) {
                if (hh[t].id == registro[i].entrada.substring(11, 16)) {
                    hh[t].style = 'background-color:' + randomrgba + ';margin: 0; height:8px;width:80%;position:relative;float:right;border-bottom:dashed 1px;cursor:pointer;'
                    hh[t].setAttribute('data-toggle', "modal");
                    hh[t].setAttribute('dd', dd.id);
                    hh[t].setAttribute('data-html', "true");
                    hh[t].setAttribute('data-placement', "top");
                    hh[t].setAttribute('data-original-title', employeeName + '<br><p>Concepto: ' + registro[i].motivo + '<br> <b>Click para eliminar</br>');
                    hh[t].setAttribute('data-target', '#ModalAdmin');
                    hh[t].setAttribute('onclick', 'eliminarReserva(this)')
                    hh[t].setAttribute('reserva', registro[i].ID);
                    
                }
                if (hh[t].id > registro[i].entrada.substring(11, 16) && hh[t].id < registro[i].salida.substring(11, 16)) {
                    hh[t].style = 'background-color:' + randomrgba + ';margin: 0; height:8px;width:80%;position:relative;float:right;border-bottom:dashed 1px;cursor:pointer;'
                    hh[t].setAttribute('data-toggle', "modal");
                    hh[t].setAttribute('data-html', "true");
                    hh[t].setAttribute('dd', dd.id);
                    hh[t].setAttribute('data-placement', "top");
                    hh[t].setAttribute('data-original-title', employeeName + '<br><p>Concepto: ' + registro[i].motivo + '<br> <b>Click para eliminar</br>');
                    hh[t].setAttribute('data-target', '#ModalAdmin');
                    hh[t].setAttribute('onclick', 'eliminarReserva(this)')
                    hh[t].setAttribute('reserva', registro[i].ID);
                    
                }
                if (hh[t].id < registro[i].entrada.substring(11, 16) && hh[t].id > registro[i].entrada.substring(11, 16)) {
                    hh[t].style = 'background-color:' + randomrgba + ';margin: 0; height:8px;width:80% ;position:relative;float:right; border-bottom:dashed 1px;cursor:pointer;'
                    hh[t].setAttribute('data-toggle', "modal");
                    hh[t].setAttribute('data-html', "true");
                    hh[t].setAttribute('dd', dd.id);
                    hh[t].setAttribute('data-placement', "top");
                    hh[t].setAttribute('data-original-title', employeeName + '<br><p>Concepto: ' + registro[i].motivo + '<br> <b>Click para eliminar</br>');
                    hh[t].setAttribute('data-target', '#ModalAdmin');
                    hh[t].setAttribute('onclick', 'eliminarReserva(this)')
                    hh[t].setAttribute('reserva', registro[i].ID);
                    
                }
                if (hh[t].id < registro[i].entrada.substring(11, 16) && hh[t].id > registro[i].salida.substring(11, 16)) {
                    hh[t].style = 'background-color:' + randomrgba + ';margin: 0; height:8px;width:80% ;position:relative;float:right;border-bottom:dashed 1px;cursor:pointer;'
                    hh[t].setAttribute('data-toggle', "modal");
                    hh[t].setAttribute('data-html', "true");
                    hh[t].setAttribute('dd', dd.id);
                    hh[t].setAttribute('data-placement', "top");
                    hh[t].setAttribute('data-original-title', employeeName + '<br><p>Concepto: ' + registro[i].motivo + '<br> <b>Click para eliminar</br>');
                    hh[t].setAttribute('data-target', '#ModalAdmin');
                    hh[t].setAttribute('onclick', 'eliminarReserva(this)')
                    hh[t].setAttribute('reserva', registro[i].ID);
                    
                }
            }
        }
        $(document).ready(function () {
            $('.hh').tooltip();
        });
    }
    //---------------------------------ABRIMOS MODAL ---------------------------------  
    $("#calendarioModal").modal();
}
$("#btn-ingresar").click(function () {
    var v = true;
    //---------------------------------AÑADIMOS NUEVA FECHA ---------------------------------  
    var horaEntrada = document.getElementById('horaEntrada').value;
    var horaSalida = document.getElementById('horaSalida').value;
    var fechaEntrada = seleccionado + ' ' + horaEntrada + ':00';
    var fechaSalida = seleccionado + ' ' + horaSalida + ':00';
    var idUsuario = document.getElementById('usuarioElegido').value;
    for (let t = 0; t < registroCC.length; t++) {
        if (registroCC[t].CompleteName == idUsuario) {
            v = false;
        }
    }
    if (v == false) {
        var motivo = document.getElementById('motivoReserva').value;
        var idSala = document.getElementById('selectedSala').value;
        var dd = document.getElementById(fechaEntrada.substring(8, 10) + ' ' + fechaEntrada.substring(6, 7));
        var us = ''
        var v = true;
        for (let i = 0; i < registro.length; i++) {
            if (fechaEntrada > fechaSalida || fechaEntrada == fechaSalida) {
                swal({
                    title: "Error!",
                    text: "Fecha de entrada superior a la de salida",
                    icon: "error",
                    button: "Volver a intentar ",
                  });
                v = false;
                break;
            }
            if (new Date(fechaEntrada) >= new Date(registro[i].entrada) && new Date(fechaEntrada) <= new Date(registro[i].salida) && registro[i].sala == idSala) {
                swal({
                    title: "Error!",
                    text: "Reserva con 15 minutos de diferencia!",
                    icon: "error",
                    button: "Volver a intentar ",
                  });
               
                v = false;
                break;
            }
            if (new Date(fechaEntrada) <= new Date(registro[i].entrada) && new Date(fechaSalida) >= new Date(registro[i].entrada) && registro[i].sala == idSala) {
                swal({
                    title: "Error!",
                    text: "Hay horas ocupadas en tu selección",
                    icon: "error",
                    button: "Volver a intentar ",
                  });
                v = false;
                break;
            }
            if (new Date(fechaEntrada) <= new Date(registro[i].entrada) && new Date(fechaSalida) >= new Date(registro[i].salida) && registro[i].sala == idSala) {
                swal({
                    title: "Error!",
                    text: "Hora ya ocupada",
                    icon: "error",
                    button: "Volver a intentar ",
                  });
                v = false;
                break;
            }
        }
        for (let i = 0; i < registroCC.length; i++) {
            if (registroCC[i].CompleteName == idUsuario) {
                us = registroCC[i].CompanyCode + registroCC[i].EmployeeCode.substring(2);
            }
        }
        if (idUsuario == '' || idUsuario == null) {
            swal({
                title: "Error!",
                text: "Seleccionar un usuario",
                icon: "error",
                button: "Volver a intentar",
              });
            
            v = false;
        }
        if (motivo == '' || motivo == null) {
            swal({
                title: "Error!",
                text: "Añada un motivo",
                icon: "error",
                button: "Volver a intentar",
              });
            v = false;
        }
        //---------------------------------POST A LA BASE DE DATOS---------------------------------  
        if (v == true) {
            var infoParaEnviar = {
                sala: idSala,
                usuario: us,
                entrada: fechaEntrada,
                salida: fechaSalida,
                motivo: motivo
            };
            $.ajax({
                type: "POST",
                url: "php/insertar.php",
                data: infoParaEnviar,
                dataType: "text",
                asycn: false,
                success: function () {
                    recogerDatos(idSala)
                }
            });
            var dd = document.getElementById(fechaEntrada.substring(8, 10) + ' ' + fechaEntrada.substring(6, 7));
            $("#calendarioModal").modal("hide");
            $("#modalreservas").modal();
            var name = '';
            var fullcode = us;
            var coderight = fullcode.substring(4, 8);
            var employeecode = "00" + coderight;
            registroCC.forEach(e => {
                if (e.EmployeeCode == employeecode && e.CompanyCode == fullcode.substring(0, 4)) {
                    name = e.CompleteName;
                }
            });
            var mensaje = "Reserva confirmada para <b>" + name + "</b> desde las <b>" + fechaEntrada.substring(11, 16) + "</b> hasta las <b>" + fechaSalida.substring(11, 16) + "</b> del día <b>" + fechaEntrada.substring(8, 10) + '-' + fechaEntrada.substring(5, 7) + "-" + fechaEntrada.substring(0, 4) + "</b>"
            document.getElementById("reservaInformacion").innerHTML = mensaje;
            var close = document.getElementById('closeReserva');
            close.addEventListener('click', function () {
                dd.click();
            }, false)
        }
    }else{
        swal({
            title: "Error!",
            text: "Seleccione un nombre del desplegable",
            icon: "error",
            button: "Volver a intentar",
          });
        
    }
});
function random_rgba() {
    var o = Math.round,
        r = Math.random,
        s = 255;
    return 'rgba(' + o(r() * s) + ',' + o(r() * s) + ',' + o(r() * s) + ',' + r().toFixed(1) + ')';
}