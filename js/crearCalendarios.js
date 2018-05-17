function limpiar() {
    pill.style.cssText = 'display:none;'
}

var registro = [];
//---------------------------------Llamada a reservas.php---------------------------------  
function recogerDatos(idSala) {
    registro = [];
    if (window.XMLHttpRequest) {
        xmlhttp = new XMLHttpRequest();
    } else {
        xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
    }
    xmlhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            var fechas = JSON.parse(this.responseText);

            for (let i = 0; i < fechas.length; i++) {
                registro.push(fechas[i]);
            }
            if (idSala == undefined) {

            } else {
                document.getElementById('sala' + idSala).click(idSala);
            }
        }
    };
    xmlhttp.open("GET", "php/reservas.php", true);
    xmlhttp.send();
}
var ContReservas = document.getElementById('containerReservas');
//----Crea Botones según el numero de salas----
function crearBtns() {
    var Arbtn = document.getElementsByClassName('salas');
    var unique = [];
    for (let i = 0; i < registro.length; i++) {
        const element = registro[i].sala;
        unique.push(element);

    }
    // const unique = [...new Set(registro.map(item => item.sala))];
    var contenedorbotones = document.getElementById("contendorbotones");
    for (let i = 1; i <= salas.length; i++) {

        var cbtn = document.createElement('button')
        cbtn.setAttribute('type', 'button');
        cbtn.setAttribute('class', 'btn btn-outline-primary salas btn-salas');
        cbtn.setAttribute('id', 'sala' + i);
        cbtn.setAttribute('onclick', 'crearCalendarioGlobal("' + i + '")');
        cbtn.innerHTML = 'Salas ' + salas[i - 1].nombre
        contenedorbotones.appendChild(cbtn);
    }
}
//----Crear calendario----
function crearCalendarioGlobal(e) {
    creaCalendario(e);
    document.getElementById("selectedSala").value = e;
    var titulo = document.getElementById('tituloSala');

}
var ContCalendario = document.getElementById('calendar');
//----Crea los items del calendario----
function creaCalendario(e) {
    ContCalendario.removeAttribute("style");
    while (ContCalendario.firstChild) {
        ContCalendario.removeChild(ContCalendario.firstChild);
    }

    var seleccion = document.createElement('div')
    seleccion.setAttribute('class', 'seleccion')
    seleccion.setAttribute('style', 'margin: 0 auto;display:none;')

    var lbM = document.createElement('label');
    lbM.setAttribute('for', 'mes');

    var spM = document.createElement('span');

    var inpM = document.createElement('input');
    inpM.setAttribute('type', 'number');
    inpM.setAttribute('name', 'mes');
    inpM.setAttribute('id', 'mes')
    inpM.setAttribute('style', 'width: 60px;background-color:slategrey;color:white; display:none');
    inpM.setAttribute('min', '1');
    inpM.setAttribute('max', '12');

    inpM.setAttribute('onchange', 'datosCalendar("' + e + '")');

    lbM.appendChild(spM);
    lbM.appendChild(inpM);

    var lbY = document.createElement('label');
    lbY.setAttribute('for', 'anio');

    var spY = document.createElement('span');

    var inpY = document.createElement('input');
    inpY.setAttribute('type', 'number');
    inpY.setAttribute('name', 'nio');
    inpY.setAttribute('id', 'anio');
    inpY.setAttribute('style', 'width: 82px;background-color:slategrey;color:white;display:none');
    inpY.setAttribute('onchange', 'datosCalendar("' + e + '")');

    lbY.appendChild(spY);
    lbY.appendChild(inpY);

    var dmenos = document.createElement('div');
    dmenos.setAttribute('id', '-1');
    dmenos.setAttribute('style', 'cursor: pointer;font-size: 2em;');

    dmenos.setAttribute('onclick', 'datosCalendar(this.id)');
    dmenos.innerHTML = '<';

    var mes = document.createElement('div');
    mes.setAttribute('class', 'mes');
    mes.innerHTML = 'mmm'

    var dmas = document.createElement('div');
    dmas.setAttribute('id', '+1');
    dmas.setAttribute('style', 'cursor: pointer;font-size: 2em;');
    dmas.setAttribute('onclick', 'datosCalendar(this.id)')
    dmas.innerHTML = '>';

    var dw = document.createElement('div');
    dw.setAttribute('class', 'dw');
    for (let i = 0; i < 7; i++) {
        var diaS = document.createElement('div');
        diaS.setAttribute('class', 'diaSemana');
        diaS.innerHTML = 'dw';
        dw.appendChild(diaS);
    }
    for (let i = 0; i < 6; i++) {
        window['week' + (i + 1)] = document.createElement('div');
        window['week' + (i + 1)].setAttribute('class', 'week');
        for (let j = 0; j < 7; j++) {
            var day = document.createElement('div');
            day.setAttribute('class', 'day');
            day.setAttribute('data-toggle', 'tooltip');
            day.setAttribute('data-html', 'true');
            day.setAttribute('data-placement', 'top');
            day.innerHTML = ' dd';
            window['week' + (i + 1)].appendChild(day);
        }

    }

    ContCalendario.appendChild(seleccion);
    ContCalendario.appendChild(lbM);
    ContCalendario.appendChild(lbY);
    ContCalendario.appendChild(dmenos);
    ContCalendario.appendChild(mes);
    ContCalendario.appendChild(dmas);
    ContCalendario.appendChild(dw);
    for (let i = 0; i < 6; i++) {
        ContCalendario.appendChild(window['week' + (i + 1)]);
    }

    currDate(e);

    $(document).ready(function () {
        $('.day').tooltip();
    });
}

var horario = document.getElementById('horario');
//----Crea el esquema del modal----
function crearEsquema() {

    while (horario.firstChild) {
        horario.removeChild(horario.firstChild);
    }

    var n = 7;
    var horas = [];
    for (let i = 0; i < 15; i++) {
        var t = n + 1
        if (t == 8) {
            t = '08';
        } else if (t == 9) {
            t = '09';
        }
        var m = t + ':00';
        horas.push(m)
        n++

    }
    for (let i = 0; i < horas.length; i++) {
        window['ho' + (i + 1)] = document.createElement('div');
        window['ho' + (i + 1)].setAttribute('id', 'enpunto');
        window['ho' + (i + 1)].setAttribute('class', horas[i]);
        window['ho' + (i + 1)].setAttribute('onclick', 'camhora(this.className)')
        window['ho' + (i + 1)].setAttribute('title', 'click para seleccionar hora')
        window['ho' + (i + 1)].setAttribute('style', 'cursor:pointer;')
        window['ho' + (i + 1)].innerHTML = horas[i];

    }
    var m = 7;
    for (let i = 0; i < 15; i++) {
        window['hora' + (i + 1)] = document.createElement('div');
        window['hora' + (i + 1)].setAttribute('id', 'hora');
        window['hora' + (i + 1)].setAttribute('class', 'hora');
        var t = m + 1
        if (t == 8) {
            t = '08';
        } else if (t == 9) {
            t = '09';
        }
        var d = t + ':00';
        var hh = document.createElement('div');
        hh.setAttribute('class', 'hh');
        hh.setAttribute('id', t + ':00');
        var h1 = document.createElement('div');
        h1.setAttribute('class', 'hh');
        h1.setAttribute('id', t + ':15');
        var h2 = document.createElement('div');
        h2.setAttribute('class', 'hh');
        h2.setAttribute('id', t + ':30');
        var h3 = document.createElement('div');
        h3.setAttribute('class', 'hh');
        h3.setAttribute('id', t + ':45');
        window['hora' + (i + 1)].appendChild(hh)
        window['hora' + (i + 1)].appendChild(h1)
        window['hora' + (i + 1)].appendChild(h2)
        window['hora' + (i + 1)].appendChild(h3)
        m++
    }
    for (let i = 0; i < 15; i++) {
        window['horario'].appendChild(window['ho' + (i + 1)])
        window['horario'].appendChild(window['hora' + (i + 1)])
    }
    var contenedordatalist = document.getElementById('personas');
    while (contenedordatalist.firstChild) {
        contenedordatalist.removeChild(contenedordatalist.firstChild);
    }
    registroCC.forEach(function (e) {
        if (e.CompleteName != undefined) {
            var name = e.CompleteName;

            var codigocompleto = e.CompanyCode + e.EmployeeCode.substring(2)
            var option = document.createElement("option");
            option.value = name;
            option.innerText = name;
            contenedordatalist.appendChild(option);
        } else {

        }
    });
}