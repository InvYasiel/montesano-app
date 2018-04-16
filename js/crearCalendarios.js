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
            crearBtns();
        }
    };
    xmlhttp.open("GET", "php/reservas.php", true);
    console.log(xmlhttp)
    xmlhttp.send();
}

var salas = ['Juntas', 'Convites'];

var ContReservas = document.getElementById('containerReservas');
//----Crea Botones según el numero de salas----
function crearBtns() {
    var Arbtn = document.getElementsByClassName('salas');
  

    const unique = [...new Set(registro.map(item => item.sala))];
    var contenedorbotones = document.getElementById("contendorbotones");
    for (let i = 1; i <= salas.length; i++) {
        
        var cbtn = document.createElement('button')
        cbtn.setAttribute('type', 'button');
        cbtn.setAttribute('class', 'btn btn-outline-primary salas btn-salas');
        cbtn.setAttribute('id', 'sala' + i);
        cbtn.setAttribute('onclick', 'crearCalendarioGlobal("' + i + '")');
        cbtn.innerHTML = 'Salas ' + salas[i - 1]
        contenedorbotones.appendChild(cbtn);
        
    }
}

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

    var week1 = document.createElement('div');
    week1.setAttribute('class', 'week');
    for (let i = 0; i < 7; i++) {
        var day = document.createElement('div');
        day.setAttribute('class', 'day');
        day.setAttribute('data-toggle', 'tooltip');
        day.setAttribute('data-html', 'true');
        day.setAttribute('data-placement', 'top');
        day.innerHTML = ' dd';
        week1.appendChild(day);
    }
    var week2 = document.createElement('div');
    week2.setAttribute('class', 'week');
    for (let i = 0; i < 7; i++) {
        var day = document.createElement('div');
        day.setAttribute('class', 'day');
        day.setAttribute('data-toggle', 'tooltip');
        day.setAttribute('data-html', 'true');
        day.setAttribute('data-placement', 'top');
        day.innerHTML = ' dd';
        week2.appendChild(day);
    }
    var week2 = document.createElement('div');
    week2.setAttribute('class', 'week');
    for (let i = 0; i < 7; i++) {
        var day = document.createElement('div');
        day.setAttribute('class', 'day');
        day.setAttribute('data-toggle', 'tooltip');
        day.setAttribute('data-html', 'true');
        day.setAttribute('data-placement', 'top');
        day.innerHTML = ' dd';
        week2.appendChild(day);
    }
    var week3 = document.createElement('div');
    week3.setAttribute('class', 'week');
    for (let i = 0; i < 7; i++) {
        var day = document.createElement('div');
        day.setAttribute('class', 'day');
        day.setAttribute('data-toggle', 'tooltip');
        day.setAttribute('data-html', 'true');
        day.setAttribute('data-placement', 'top');
        day.innerHTML = ' dd';
        week3.appendChild(day);
    }
    var week4 = document.createElement('div');
    week4.setAttribute('class', 'week');
    for (let i = 0; i < 7; i++) {
        var day = document.createElement('div');
        day.setAttribute('class', 'day');
        day.setAttribute('data-toggle', 'tooltip');
        day.setAttribute('data-html', 'true');
        day.setAttribute('data-placement', 'top');
        day.innerHTML = ' dd';
        week4.appendChild(day);
    }
    var week5 = document.createElement('div');
    week5.setAttribute('class', 'week');
    for (let i = 0; i < 7; i++) {
        var day = document.createElement('div');
        day.setAttribute('class', 'day');
        day.setAttribute('data-toggle', 'tooltip');
        day.setAttribute('data-html', 'true');
        day.setAttribute('data-placement', 'top');
        day.innerHTML = ' dd';
        week5.appendChild(day);
    }
    var week6 = document.createElement('div');
    week6.setAttribute('class', 'week');
    for (let i = 0; i < 7; i++) {
        var day = document.createElement('div');
        day.setAttribute('class', 'day');
        day.setAttribute('data-toggle', 'tooltip');
        day.setAttribute('data-html', 'true');
        day.setAttribute('data-placement', 'top');
        day.innerHTML = ' dd';
        week6.appendChild(day);
    }
    ContCalendario.appendChild(seleccion);
    ContCalendario.appendChild(lbM);
    ContCalendario.appendChild(lbY);
    ContCalendario.appendChild(dmenos);
    ContCalendario.appendChild(mes);
    ContCalendario.appendChild(dmas);
    ContCalendario.appendChild(dw);
    ContCalendario.appendChild(week1);
    ContCalendario.appendChild(week2);
    ContCalendario.appendChild(week3);
    ContCalendario.appendChild(week4);
    ContCalendario.appendChild(week5);
    ContCalendario.appendChild(week6);
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

    var ho1 = document.createElement('div');
    ho1.setAttribute('id', 'enpunto');
    ho1.innerHTML = '08:00';
    var ho2 = document.createElement('div');
    ho2.setAttribute('id', 'enpunto');
    ho2.innerHTML = '09:00';
    var ho3 = document.createElement('div');
    ho3.setAttribute('id', 'enpunto');
    ho3.innerHTML = '10:00';
    var ho4 = document.createElement('div');
    ho4.setAttribute('id', 'enpunto');
    ho4.innerHTML = '11:00';
    var ho5 = document.createElement('div');
    ho5.setAttribute('id', 'enpunto');
    ho5.innerHTML = '12:00';
    var ho6 = document.createElement('div');
    ho6.setAttribute('id', 'enpunto');
    ho6.innerHTML = '13:00';
    var ho7 = document.createElement('div');
    ho7.setAttribute('id', 'enpunto');
    ho7.innerHTML = '14:00';
    var ho8 = document.createElement('div');
    ho8.setAttribute('id', 'enpunto');
    ho8.innerHTML = '15:00';
    var ho9 = document.createElement('div');
    ho9.setAttribute('id', 'enpunto');
    ho9.innerHTML = '16:00';
    var ho10 = document.createElement('div');
    ho10.setAttribute('id', 'enpunto');
    ho10.innerHTML = '17:00';
    var ho11 = document.createElement('div');
    ho11.setAttribute('id', 'enpunto');
    ho11.innerHTML = '18:00';
    var ho12 = document.createElement('div');
    ho12.setAttribute('id', 'enpunto');
    ho12.innerHTML = '19:00';
    var ho13 = document.createElement('div');
    ho13.setAttribute('id', 'enpunto');
    ho13.innerHTML = '20:00';
    var ho14 = document.createElement('div');
    ho14.setAttribute('id', 'enpunto');
    ho14.innerHTML = '21:00';
    var ho15 = document.createElement('div');
    ho15.setAttribute('id', 'enpunto');
    ho15.innerHTML = '22:00';


    var hora1 = document.createElement('div');
    hora1.setAttribute('id', 'hora');
    hora1.setAttribute('class', 'hora');

    var hh = document.createElement('div');
    hh.setAttribute('class', 'hh');
    hh.setAttribute('id', '08:00');
    var h1 = document.createElement('div');
    h1.setAttribute('class', 'hh');
    h1.setAttribute('id', '08:15');
    var h2 = document.createElement('div');
    h2.setAttribute('class', 'hh');
    h2.setAttribute('id', '08:30');
    var h3 = document.createElement('div');
    h3.setAttribute('class', 'hh');
    h3.setAttribute('id', '08:45');
    hora1.appendChild(hh)
    hora1.appendChild(h1)
    hora1.appendChild(h2)
    hora1.appendChild(h3)

    var hora2 = document.createElement('div');
    hora2.setAttribute('id', 'hora');
    hora2.setAttribute('class', 'hora');

    var fh = document.createElement('div');
    fh.setAttribute('class', 'hh');
    fh.setAttribute('id', '09:00');
    var f1 = document.createElement('div');
    f1.setAttribute('class', 'hh');
    f1.setAttribute('id', '09:15');
    var f2 = document.createElement('div');
    f2.setAttribute('class', 'hh');
    f2.setAttribute('id', '09:30');
    var f3 = document.createElement('div');
    f3.setAttribute('class', 'hh');
    f3.setAttribute('id', '09:45');
    hora2.appendChild(fh)
    hora2.appendChild(f1)
    hora2.appendChild(f2)
    hora2.appendChild(f3)

    var hora3 = document.createElement('div');
    hora3.setAttribute('id', 'hora');
    hora3.setAttribute('class', 'hora');

    var gh = document.createElement('div');
    gh.setAttribute('class', 'hh');
    gh.setAttribute('id', '10:00');
    var g1 = document.createElement('div');
    g1.setAttribute('class', 'hh');
    g1.setAttribute('id', '10:15');
    var g2 = document.createElement('div');
    g2.setAttribute('class', 'hh');
    g2.setAttribute('id', '10:30');
    var g3 = document.createElement('div');
    g3.setAttribute('class', 'hh');
    g3.setAttribute('id', '10:45');
    hora3.appendChild(gh)
    hora3.appendChild(g1)
    hora3.appendChild(g2)
    hora3.appendChild(g3)

    var hora4 = document.createElement('div');
    hora4.setAttribute('id', 'hora');
    hora4.setAttribute('class', 'hora');

    var jh = document.createElement('div');
    jh.setAttribute('class', 'hh');
    jh.setAttribute('id', '11:00');
    var j1 = document.createElement('div');
    j1.setAttribute('class', 'hh');
    j1.setAttribute('id', '11:15');
    var j2 = document.createElement('div');
    j2.setAttribute('class', 'hh');
    j2.setAttribute('id', '11:30');
    var j3 = document.createElement('div');
    j3.setAttribute('class', 'hh');
    j3.setAttribute('id', '11:45');
    hora4.appendChild(jh)
    hora4.appendChild(j1)
    hora4.appendChild(j2)
    hora4.appendChild(j3)


    var hora5 = document.createElement('div');
    hora5.setAttribute('id', 'hora');
    hora5.setAttribute('class', 'hora');

    var kh = document.createElement('div');
    kh.setAttribute('class', 'hh');
    kh.setAttribute('id', '12:00');
    var k1 = document.createElement('div');
    k1.setAttribute('class', 'hh');
    k1.setAttribute('id', '12:15');
    var k2 = document.createElement('div');
    k2.setAttribute('class', 'hh');
    k2.setAttribute('id', '12:30');
    var k3 = document.createElement('div');
    k3.setAttribute('class', 'hh');
    k3.setAttribute('id', '12:45');
    hora5.appendChild(kh)
    hora5.appendChild(k1)
    hora5.appendChild(k2)
    hora5.appendChild(k3)


    var hora6 = document.createElement('div');
    hora6.setAttribute('id', 'hora');
    hora6.setAttribute('class', 'hora');

    var vh = document.createElement('div');
    vh.setAttribute('class', 'hh');
    vh.setAttribute('id', '13:00');
    var v1 = document.createElement('div');
    v1.setAttribute('class', 'hh');
    v1.setAttribute('id', '13:15');
    var v2 = document.createElement('div');
    v2.setAttribute('class', 'hh');
    v2.setAttribute('id', '13:30');
    var v3 = document.createElement('div');
    v3.setAttribute('class', 'hh');
    v3.setAttribute('id', '13:45');
    hora6.appendChild(vh)
    hora6.appendChild(v1)
    hora6.appendChild(v2)
    hora6.appendChild(v3)

    var hora7 = document.createElement('div');
    hora7.setAttribute('id', 'hora');
    hora7.setAttribute('class', 'hora');

    var wh = document.createElement('div');
    wh.setAttribute('class', 'hh');
    wh.setAttribute('id', '14:00');
    var w1 = document.createElement('div');
    w1.setAttribute('class', 'hh');
    w1.setAttribute('id', '14:15');
    var w2 = document.createElement('div');
    w2.setAttribute('class', 'hh');
    w2.setAttribute('id', '14:30');
    var w3 = document.createElement('div');
    w3.setAttribute('class', 'hh');
    w3.setAttribute('id', '14:45');
    hora7.appendChild(wh)
    hora7.appendChild(w1)
    hora7.appendChild(w2)
    hora7.appendChild(w3)

    var hora8 = document.createElement('div');
    hora8.setAttribute('id', 'hora');
    hora8.setAttribute('class', 'hora');

    var qh = document.createElement('div');
    qh.setAttribute('class', 'hh');
    qh.setAttribute('id', '15:00');
    var q1 = document.createElement('div');
    q1.setAttribute('class', 'hh');
    q1.setAttribute('id', '15:15');
    var q2 = document.createElement('div');
    q2.setAttribute('class', 'hh');
    q2.setAttribute('id', '15:30');
    var q3 = document.createElement('div');
    q3.setAttribute('class', 'hh');
    q3.setAttribute('id', '15:45');
    hora8.appendChild(qh)
    hora8.appendChild(q1)
    hora8.appendChild(q2)
    hora8.appendChild(q3)


    var hora9 = document.createElement('div');
    hora9.setAttribute('id', 'hora');
    hora9.setAttribute('class', 'hora');

    var rh = document.createElement('div');
    rh.setAttribute('class', 'hh');
    rh.setAttribute('id', '16:00');
    var r1 = document.createElement('div');
    r1.setAttribute('class', 'hh');
    r1.setAttribute('id', '16:15');
    var r2 = document.createElement('div');
    r2.setAttribute('class', 'hh');
    r2.setAttribute('id', '16:30');
    var r3 = document.createElement('div');
    r3.setAttribute('class', 'hh');
    r3.setAttribute('id', '16:45');
    hora9.appendChild(rh)
    hora9.appendChild(r1)
    hora9.appendChild(r2)
    hora9.appendChild(r3)

    var hora10 = document.createElement('div');
    hora10.setAttribute('id', 'hora');
    hora10.setAttribute('class', 'hora');

    var xh = document.createElement('div');
    xh.setAttribute('class', 'hh');
    xh.setAttribute('id', '17:00');
    var x1 = document.createElement('div');
    x1.setAttribute('class', 'hh');
    x1.setAttribute('id', '17:15');
    var x2 = document.createElement('div');
    x2.setAttribute('class', 'hh');
    x2.setAttribute('id', '17:30');
    var x3 = document.createElement('div');
    x3.setAttribute('class', 'hh');
    x3.setAttribute('id', '17:45');
    hora10.appendChild(xh)
    hora10.appendChild(x1)
    hora10.appendChild(x2)
    hora10.appendChild(x3)

    var hora11 = document.createElement('div');
    hora11.setAttribute('id', 'hora');
    hora11.setAttribute('class', 'hora');

    var nh = document.createElement('div');
    nh.setAttribute('class', 'hh');
    nh.setAttribute('id', '18:00');
    var n1 = document.createElement('div');
    n1.setAttribute('class', 'hh');
    n1.setAttribute('id', '18:15');
    var n2 = document.createElement('div');
    n2.setAttribute('class', 'hh');
    n2.setAttribute('id', '18:30');
    var n3 = document.createElement('div');
    n3.setAttribute('class', 'hh');
    n3.setAttribute('id', '18:45');
    hora11.appendChild(nh)
    hora11.appendChild(n1)
    hora11.appendChild(n2)
    hora11.appendChild(n3)

    var hora12 = document.createElement('div');
    hora12.setAttribute('id', 'hora');
    hora12.setAttribute('class', 'hora');

    var oh = document.createElement('div');
    oh.setAttribute('class', 'hh');
    oh.setAttribute('id', '19:00');
    var o1 = document.createElement('div');
    o1.setAttribute('class', 'hh');
    o1.setAttribute('id', '19:15');
    var o2 = document.createElement('div');
    o2.setAttribute('class', 'hh');
    o2.setAttribute('id', '19:30');
    var o3 = document.createElement('div');
    o3.setAttribute('class', 'hh');
    o3.setAttribute('id', '19:45');
    hora12.appendChild(oh)
    hora12.appendChild(o1)
    hora12.appendChild(o2)
    hora12.appendChild(o3)


    var hora13 = document.createElement('div');
    hora13.setAttribute('id', 'hora');
    hora13.setAttribute('class', 'hora');

    var zh = document.createElement('div');
    zh.setAttribute('class', 'hh');
    zh.setAttribute('id', '20:00');
    var z1 = document.createElement('div');
    z1.setAttribute('class', 'hh');
    z1.setAttribute('id', '20:15');
    var z2 = document.createElement('div');
    z2.setAttribute('class', 'hh');
    z2.setAttribute('id', '20:30');
    var z3 = document.createElement('div');
    z3.setAttribute('class', 'hh');
    z3.setAttribute('id', '20:45');
    hora13.appendChild(zh)
    hora13.appendChild(z1)
    hora13.appendChild(z2)
    hora13.appendChild(z3)

    var hora14 = document.createElement('div');
    hora14.setAttribute('id', 'hora');
    hora14.setAttribute('class', 'hora');

    var eh = document.createElement('div');
    eh.setAttribute('class', 'hh');
    eh.setAttribute('id', '21:00');
    var e1 = document.createElement('div');
    e1.setAttribute('class', 'hh');
    e1.setAttribute('id', '21:15');
    var e2 = document.createElement('div');
    e2.setAttribute('class', 'hh');
    e2.setAttribute('id', '21:30');
    var e3 = document.createElement('div');
    e3.setAttribute('class', 'hh');
    e3.setAttribute('id', '21:45');
    hora14.appendChild(eh)
    hora14.appendChild(e1)
    hora14.appendChild(e2)
    hora14.appendChild(e3)

    var hora15 = document.createElement('div');
    hora15.setAttribute('id', 'hora');
    hora15.setAttribute('class', 'hora');

    var uh = document.createElement('div');
    uh.setAttribute('class', 'hh');
    uh.setAttribute('id', '22:00');
    var u1 = document.createElement('div');
    u1.setAttribute('class', 'hh');
    u1.setAttribute('id', '22:15');
    var u2 = document.createElement('div');
    u2.setAttribute('class', 'hh');
    u2.setAttribute('id', '22:30');
    var u3 = document.createElement('div');
    u3.setAttribute('class', 'hh');
    u3.setAttribute('id', '22:45');
    var u4 = document.createElement('div');
    u4.setAttribute('class', 'hh');
    u4.setAttribute('id', '23:00');
    hora15.appendChild(uh)
    hora15.appendChild(u1)
    hora15.appendChild(u2)
    hora15.appendChild(u3)
    hora15.appendChild(u4)

    horario.appendChild(ho1);
    horario.appendChild(hora1);
    horario.appendChild(ho2);
    horario.appendChild(hora2);
    horario.appendChild(ho3);
    horario.appendChild(hora3);
    horario.appendChild(ho4);
    horario.appendChild(hora4);
    horario.appendChild(ho5);
    horario.appendChild(hora5);
    horario.appendChild(ho6);
    horario.appendChild(hora6);
    horario.appendChild(ho7);
    horario.appendChild(hora7);
    horario.appendChild(ho8);
    horario.appendChild(hora8);
    horario.appendChild(ho9);
    horario.appendChild(hora9);
    horario.appendChild(ho10);
    horario.appendChild(hora10);
    horario.appendChild(ho11);
    horario.appendChild(hora11);
    horario.appendChild(ho12);
    horario.appendChild(hora12);
    horario.appendChild(ho13);
    horario.appendChild(hora13);
    horario.appendChild(ho14);
    horario.appendChild(hora14);

    var contenedordatalist = document.getElementById('personas');

    while (contenedordatalist.firstChild) {
        contenedordatalist.removeChild(contenedordatalist.firstChild);
    }

    registroCC.forEach(e => {
        var name = e.CompleteName;
        var codigocompleto = e.CompanyCode + e.EmployeeCode.substring(2)

        var option = document.createElement("option");
        option.value = codigocompleto;
        option.innerText = name;

        contenedordatalist.appendChild(option);
    });
}