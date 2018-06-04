var departamentos = [];
tablerosR();

function tablerosR() {
    tableros = [];
    if (window.XMLHttpRequest) {
        xmlhttp = new XMLHttpRequest();
    } else {
        xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
    }
    xmlhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            var tab = JSON.parse(this.responseText);
            for (let i = 0; i < tab.length; i++) {
                departamentos.push(tab[i]);
            }
            btn_trello();
        }
    };
    xmlhttp.open("GET", "php/departamentos.php?_=" + new Date().getTime(), true); // new Date().getTime() lo usamos porque en explorer estaba cacheando la consulta y 
    //así modificamos la url consiguiendo que sea otra consulta
    xmlhttp.send();
}
informaciontrello()
var infoTrello = []

function informaciontrello() {
    infoTrello = [];
    if (window.XMLHttpRequest) {
        xmlhttp = new XMLHttpRequest();
    } else {
        xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
    }
    xmlhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            var usu = JSON.parse(this.responseText);
            for (let i = 0; i < usu.length; i++) {
                infoTrello.push(usu[i]);
            }
            opciones();
        }

    };
    xmlhttp.open("GET", "php/incidencias.php?_=" + new Date().getTime(), true); // new Date().getTime() lo usamos porque en explorer estaba cacheando la consulta y 
    //así modificamos la url consiguiendo que sea otra consulta
    xmlhttp.send();
}
var pill = document.getElementById('pills-Agenda')
var mincidencia = document.getElementById('Incidencias')
function limpiarInci(){
    document.getElementById('containerReservas').style.cssText ='display:none;'
    mincidencia.style.cssText = 'display:flex'
    pill.style.cssText = 'display:none'
    
}
function btn_trello() {

    var contDepartamentos = document.getElementById("Incidencias");
    for (let i = 0; i < departamentos.length; i++) {
        var cbtn = document.createElement('button');
        cbtn.setAttribute('type', 'button');
        cbtn.setAttribute('style', 'display:flex;');
        cbtn.setAttribute('class', 'btn btn-outline-primary departamentos btn-departamentos');
        cbtn.setAttribute('id', departamentos[i].departamento);
        cbtn.setAttribute('onclick', 'crearForm(this.id)');
        cbtn.innerHTML = 'Incidencias  ' + departamentos[i].departamento;
        contDepartamentos.appendChild(cbtn);
    }
}

function crearForm(e) {
    var dato = document.getElementById(e + 'form');
    var btn =document.getElementById(e);
    if (dato.getAttribute("style") == 'display: block;') {
        dato.style.cssText = 'display:none';
    } else {
        dato.style.cssText = 'display:block';
    }
    var contRH = document.getElementById('RRHHform');

    var contInfo = document.getElementById('INFORMATICAform');

    if(dato.getAttribute("style") == 'display: block;'){
        if(dato == contRH ){
            contInfo.style.cssText = 'display:none';
        }else{
            
            contRH.style.cssText = 'display:none';
        }
    }
           
}