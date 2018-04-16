//---------------------------------LLAMADA A CARTAS.PHP---------------------------------  
var registroCC = [];
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
            registroCC.push(fechas[i]);

        }
        ag();

        var contenedordatalistagenda = document.getElementById("personasagenda");
        var contenedordatalistincidencias = document.getElementById("personasincidencias");

        registroCC.forEach(e => {
            var name = e.CompleteName;

            var option = document.createElement("option");
            option.value = name;
            option.innerText = name;

            contenedordatalistagenda.appendChild(option);
        });

        registroCC.forEach(e => {
            var name = e.CompleteName;

            var option = document.createElement("option");
            option.value = name;
            option.innerText = name;

            contenedordatalistincidencias.appendChild(option);
        });

        var filteredEmpresas = [];

        registroCC.forEach(element => {
            if (filteredEmpresas.indexOf(element.CompanyName) == -1) {
                filteredEmpresas.push(element.CompanyName);
            }
        });

        var conentedorempresas = document.getElementById('empresas');

        filteredEmpresas.forEach(e => {
            var option = document.createElement("option");
            option.value = e;
            option.innerText = e;

            conentedorempresas.appendChild(option);
        });
    }
};
xmlhttp.open("GET", "php/cartas.php", true);
console.log(xmlhttp)
xmlhttp.send();



//---------------------------------GENERAR TODAS LA AGENDA COMO CARTAS---------------------------------  
var contAgenda = document.getElementById('contagenda');
var buscador = document.getElementById('buscador');

function generarCartas() {
    pill.style = 'display:flex;'
    contAgenda.innerHTML = '';
    for (let i = 0; i < registroCC.length; i++) {
        carta(i);
    }
}

//---------------------------------FILTRO PARA BUSCAR---------------------------------  
function search() {
    contAgenda.innerHTML = '';
    var palabra = buscador.value.toUpperCase();
    var selIndex = document.getElementById("empresas").selectedIndex;
    var selValue = document.getElementById("empresas").options[selIndex].innerHTML;

    if (palabra == "") {
        generarCartas();
    } else {
        for (let i = 0; i < registroCC.length; i++) {
            if (registroCC[i].CompleteName.indexOf(palabra) >= 0) {
                carta(i);
            } else if (palabra == (registroCC[i].Name + ' ' + registroCC[i].SecondName1)) {
                if (selValue == registroCC[i].CompanyName) {
                    carta(i);
                } else if (selValue == 'TODAS') {
                    carta(i);
                }
            } else if (palabra == (registroCC[i].Name + ' ' + registroCC[i].SecondName2)) {
                if (selValue == registroCC[i].CompanyName) {
                    carta(i);
                } else if (selValue == 'TODAS') {
                    carta(i);
                }
            } else if (palabra == (registroCC[i].SecondName1 + ' ' + registroCC[i].Name)) {
                if (selValue == registroCC[i].CompanyName) {
                    carta(i);
                } else if (selValue == 'TODAS') {
                    carta(i);
                }
            } else if (palabra == (registroCC[i].Name + ' ' + registroCC[i].SecondName1 + ' ' + registroCC[i].SecondName2)) {
                if (selValue == registroCC[i].CompanyName) {
                    carta(i);
                } else if (selValue == 'TODAS') {
                    carta(i);
                }
            } else if (palabra == (registroCC[i].SecondName1 + ' ' + registroCC[i].SecondName2 + ' ' + registroCC[i].Name)) {
                if (selValue == registroCC[i].CompanyName) {
                    carta(i);
                } else if (selValue == 'TODAS') {
                    carta(i);
                }
            }
        }
    }
}

//---------------------------------CREACIÓN DE LOS ELEMENTOS ---------------------------------  
function carta(i) {
    var card = document.createElement('div');
    card.setAttribute('class', 'card text-black border-dark bg-info  mb-3 carta');
    card.setAttribute('style', 'max-width: 23rem; margin:10px;');
    card.setAttribute('id', 'carta' + i);
    var header = document.createElement('div');
    header.setAttribute('class', 'card-header');
    var cardBody = document.createElement('div');
    cardBody.setAttribute('class', 'card-body');
    cardBody.setAttribute('id', 'contenidoCarta');
    var titulo = document.createElement('h5');
    titulo.setAttribute('class', 'card-title');

    var texto = document.createElement('div');
    header.innerHTML = '<b>Persona</b>'
    titulo.innerHTML = '<b>' + registroCC[i].Name + ' ' + registroCC[i].SecondName1 + ' ' + registroCC[i].SecondName2 + '</b>'
    texto.innerHTML = '<b> Código Completo </b> ' + registroCC[i].CompanyCode + registroCC[i].EmployeeCode.substring(2) + '</br>' + '<b> Móvil de la compañía </b>' + registroCC[i].CompanyMobilePhoneNumber + '<br>' +
        '<b> Nombre de la Compañía </b>' + registroCC[i].CompanyName + '<br>' + '<b> Nombre Completo </b>' + registroCC[i].CompleteName.replace(",", "") + '<br>' +
        '<b>Número:  </b>' + registroCC[i].DirectPhoneNumber + '</br>' + '<b> ID del empleado </b>' + registroCC[i].EmployeeID + '</br>' +
        '<b> Extensión </b>' + registroCC[i].Extension + '</br>' + '<b> Número de Fax </b>' + registroCC[i].FaxNumber + '</br>' + '<b> Observaciones </b>' + registroCC[i].Observations + '</br>' +
        '<b> WorkplaceName </b>' + registroCC[i].WorkplaceName;
    cardBody.appendChild(titulo);
    cardBody.appendChild(texto);
    card.appendChild(header);
    card.appendChild(cardBody);
    contAgenda.appendChild(card);
}

//---------------------------------CAMBIAR DE EMPRESA ---------------------------------  
function selEmpresa() {
    contAgenda.innerHTML = '';
    var selIndex = document.getElementById("empresas").selectedIndex;
    var selValue = document.getElementById("empresas").options[selIndex].innerHTML;
    getDom(selValue);
}

//---------------------------------BUSCADOR POR EMPRESA ---------------------------------  
function getDom(valSelect) {
    var palabra = buscador.value.toUpperCase();
    empresa = valSelect;
    if (empresa === 'TODAS' && palabra == "") {
        generarCartas();
    }
    for (let i = 0; i < registroCC.length; i++) {
        if (empresa == registroCC[i].CompanyName && palabra == (registroCC[i].Name + ' ' + registroCC[i].SecondName1)) {
            carta(i);
        } else if (empresa == registroCC[i].CompanyName && palabra == (registroCC[i].Name + ' ' + registroCC[i].SecondName2)) {
            carta(i);
        } else if (empresa == registroCC[i].CompanyName && palabra == (registroCC[i].SecondName1 + ' ' + registroCC[i].Name)) {
            carta(i);
        } else if (empresa == registroCC[i].CompanyName && palabra == (registroCC[i].Name + ' ' + registroCC[i].SecondName1 + ' ' + registroCC[i].SecondName2)) {
            carta(i);
        } else if (empresa == registroCC[i].CompanyName && palabra == (registroCC[i].SecondName1 + ' ' + registroCC[i].SecondName2 + ' ' + registroCC[i].Name)) {
            carta(i);
        } else if (empresa == registroCC[i].CompanyName && palabra == '') {
            carta(i);
        } else if (empresa == registroCC[i].CompanyName && palabra == registroCC[i].Name) {
            carta(i);
        } else if (empresa === 'TODAS' && palabra == (registroCC[i].Name + ' ' + registroCC[i].SecondName1)) {
            carta(i);
        } else if (empresa === 'TODAS' && palabra == (registroCC[i].Name + ' ' + registroCC[i].SecondName2)) {
            carta(i);
        } else if (empresa === 'TODAS' && palabra == (registroCC[i].SecondName1 + ' ' + registroCC[i].Name)) {
            carta(i);
        } else if (empresa === 'TODAS' && palabra == (registroCC[i].Name + ' ' + registroCC[i].SecondName1 + ' ' + registroCC[i].SecondName2)) {
            carta(i);
        } else if (empresa === 'TODAS' && palabra == (registroCC[i].SecondName1 + ' ' + registroCC[i].SecondName2 + ' ' + registroCC[i].Name)) {
            carta(i);
        } else if (empresa === 'TODAS' && palabra == '') {
            carta(i);
        } else if (empresa === 'TODAS' && palabra == registroCC[i].Name) {
            carta(i);
        }
    }
}

//---------------------------------LIMPIAR EL CONTENEDOR DE LA AGENDA ---------------------------------  
var pill = document.getElementById('pills-Agenda')

function limpiar() {
    pill.style = 'display:none;'
}


