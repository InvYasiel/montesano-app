var seleccionado = '';
function random_rgba() {

    var colores = ['#00CB4335', '#002471A3', '#00F39C12', '#005D6D7E', '#0027AE60', '#0076448A', '#007B7D7D', '#00117A65', '#00F4D03F', '#00E59866', '#00AED6F1', '#00D98880', '#0048C9B0', '#0073C6B6', '#00512E5F'];
    var rand = colores[Math.floor(Math.random() * colores.length)];
    return rand;
}



var colores = ['red', 'orange', 'yellow', 'green', 'blue', 'pink', 'brown'];

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
    seleccionado = year + '/' + mes + '/' + diaSolo;
    var fechaEntrada = seleccionado + ' ' + horaEntrada + ':00';
    var fechaSalida = seleccionado + ' ' + horaSalida + ':00';
    var dd = document.getElementById(fechaEntrada.substring(8, 10) + ' ' + fechaEntrada.substring(6, 7));
    for (let i = 0; i < hh.length; i++) {
        hh[i].style.cssText = 'margin: 0; height:8px;width: 200px;position:relative;float:right;'

    }
    // ss.innerHTML = 'Reservas para ' + diaSolo + '/' + mes + '/' + year;

    var tituloMdl = document.getElementById('calendarioModalLabel');
    tituloMdl.innerHTML = '';
    tituloMdl.innerHTML = 'Reserva para la sala de ' + salas[boton - 1].nombre + ' el día ' + diaSolo + '/' + mes + '/' + year;
    //---------------------------------DIBUJAR GRAFICO --------------------------------- 
    var tt = 0;
    var selectedSala = document.getElementById("selectedSala").value;
    
    
    for (let i = 0; i < registro.length; i++) {
        var cadena = registro[i].entrada.substring(10, -1);
    var re = /-/g;
    var resultado = cadena.replace(re, '/');
        if (resultado == seleccionado && registro[i].sala == selectedSala) {
            var randomrgba = colores[tt];
            tt++
            if (tt == 6) {
                tt = 0;
            }
            var coderight = registro[i].Usuario.substring(4, 8)
            var codeleft = registro[i].Usuario.substring(0, 4);
            var employeecode = "00" + coderight;
            var employeeName = "";
            registroCC.forEach(function (e) {
                if (e.EmployeeCode == employeecode && e.CompanyCode == codeleft) {
                    employeeName = e.Name;
                }
            });
            for (let t = 0; t < hh.length; t++) {
                if (hh[t].id == registro[i].entrada.substring(11, 16)) {
                    hh[t].style.cssText = 'background-color:' + randomrgba + ';margin: 0; height:8px;width:80%;position:relative;float:right;border-bottom:dashed 1px;cursor:pointer;'
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
                    hh[t].style.cssText = 'background-color:' + randomrgba + ';margin: 0; height:8px;width:80%;position:relative;float:right;border-bottom:dashed 1px;cursor:pointer;'
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
                    hh[t].style.cssText = 'background-color:' + randomrgba + ';margin: 0; height:8px;width:80% ;position:relative;float:right; border-bottom:dashed 1px;cursor:pointer;'
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
                    hh[t].style.cssText = 'background-color:' + randomrgba + ';margin: 0; height:8px;width:80% ;position:relative;float:right;border-bottom:dashed 1px;cursor:pointer;'
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
    if (parseInt(horaEntrada.substring(0, 2)) < 8 || parseInt(horaSalida.substring(0, 2)) > 23) {

        swal({
            title: "Error!",
            text: "La fecha de salida seleccionada esta fuera de horario",
            icon: "error",
            button: "Volver a intentar ",
        });
    } else {
        var fechaEntrada = seleccionado + ' ' + horaEntrada + ':00';
        var fechaSalida = seleccionado + ' ' + horaSalida + ':00';

        var f = new Date();

        var ee = new Date(fechaEntrada);
        if (f < ee) {
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
                    if (parseInt(horaEntrada.substring(0, 2)) < 08 || parseInt(horaEntrada.substring(0, 2)) > 22) {
                        swal({
                            title: "Error!",
                            text: "La fecha de entrada seleccionada esta fuera de horario",
                            icon: "error",
                            button: "Volver a intentar ",
                        });
                        v = false;
                        break;
                    }
                    if (parseInt(horaSalida.substring(0, 2)) < 08 || parseInt(horaSalida.substring(0, 2)) > 23) {
                        swal({
                            title: "Error!",
                            text: "La fecha de salida seleccionada esta fuera de horario",
                            icon: "error",
                            button: "Volver a intentar ",
                        });
                        v = false;
                        break;
                    }

                    if (new Date(fechaEntrada) < new Date(registro[i].entrada) && new Date(fechaSalida) == new Date(registro[i].salida) && registro[i].sala == idSala) {
                        v = true;
                        break;
                    }
                    if (new Date(fechaEntrada) == new Date(registro[i].salida) && new Date(fechaSalida) > new Date(registro[i].salida) && registro[i].sala == idSala) {
                        v = true;
                        break;
                    }
                    if (new Date(fechaEntrada) < new Date(registro[i].entrada) && new Date(fechaSalida) > new Date(registro[i].entrada) && registro[i].sala == idSala) {
                        swal({
                            title: "Error!",
                            text: "Intervalo de horas ocupado",
                            icon: "error",
                            button: "Volver a intentar ",
                        });
                        v = false;
                        break;
                    }
                    if (new Date(fechaEntrada) < new Date(registro[i].entrada) && new Date(fechaSalida) > new Date(registro[i].salida) && registro[i].sala == idSala) {
                        swal({
                            title: "Error!",
                            text: "Intervalo de horas ocupado",
                            icon: "error",
                            button: "Volver a intentar ",
                        });
                        v = false;
                        break;
                    }
                    if (new Date(fechaEntrada) > new Date(registro[i].entrada) && new Date(fechaEntrada) < new Date(registro[i].salida) && new Date(fechaSalida) > new Date(registro[i].salida) && registro[i].sala == idSala) {
                        swal({
                            title: "Error!",
                            text: "Intervalo de horas ocupado",
                            icon: "error",
                            button: "Volver a intentar ",
                        });
                        v = false;
                        break;
                    }
                    if (new Date(fechaEntrada) >= new Date(registro[i].entrada) && new Date(fechaSalida) <= new Date(registro[i].salida) && registro[i].sala == idSala) {
                        swal({
                            title: "Error!",
                            text: "Intervalo de horas ocupado",
                            icon: "error",
                            button: "Volver a intentar ",
                        });
                        v = false;
                        break;
                    }
                    if (new Date(fechaEntrada) == new Date(registro[i].entrada) && new Date(fechaSalida) < new Date(registro[i].salida) && registro[i].sala == idSala) {
                        swal({
                            title: "Error!",
                            text: "Intervalo de horas ocupado",
                            icon: "error",
                            button: "Volver a intentar ",
                        });
                        v = false;
                        break;
                    }
                    if (new Date(fechaEntrada) < new Date(registro[i].entrada) && new Date(fechaSalida) == new Date(registro[i].salida) && registro[i].sala == idSala) {
                        swal({
                            title: "Error!",
                            text: "Intervalo de horas ocupado",
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

                    var name = '';
                    var fullcode = us;
                    var coderight = fullcode.substring(4, 8);
                    var employeecode = "00" + coderight;
                    registroCC.forEach(function (e) {
                        if (e.EmployeeCode == employeecode && e.CompanyCode == fullcode.substring(0, 4)) {
                            name = e.CompleteName;
                        }
                    });
                    var mensaje = "Reserva confirmada para " + name + " desde las " + fechaEntrada.substring(11, 16) + " hasta las " + fechaSalida.substring(11, 16) + " del día " + fechaEntrada.substring(8, 10) + '-' + fechaEntrada.substring(5, 7) + "-" + fechaEntrada.substring(0, 4) + ""

                    swal({
                            title: "Completado!",
                            text: mensaje,
                            icon: "success",
                            button: "Cerrar",
                        })
                        .then(function (value) {
                            swal(dd.click());
                        });

                }
            } else {
                swal({
                    title: "Error!",
                    text: "Seleccione un nombre del desplegable",
                    icon: "error",
                    button: "Volver a intentar",
                });

            }
        } else {
            swal({
                title: "Error!",
                text: "El día seleccionado es menor la fecha actual",
                icon: "error",
                button: "Volver a intentar",
            });
        }

    }

});

