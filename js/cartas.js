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

        for (let i = 0; i < fechas.length; i++) {
            registroCC.push(fechas[i]);
            if (registroCC[i].Observations != undefined) {
                var ex = new RegExp(/#\w+:\w+#/g)
                var texto = registroCC[i].Observations.match(ex);
                if (texto == null) {
                    exten = '';

                } else {
                    for (let j = 0; j < texto.length; j++) {
                        exten = '' + texto[j].split(':')[1].replace('#', '');
                        exTMovil.push(exten);
                    }
                }
            }
        }
        recogerExt();

        var contenedordatalistagenda = document.getElementById("personasagenda");
        var contenedordatalistincidencias = document.getElementById("personasincidencias");
        var contenedordatalistextenciones = document.getElementById('extencion');

        registroCC.forEach(function(e) {
            var name = e.CompleteName;
            if (e.CompleteName == undefined) {
                var name = e.Name;
            }
            var option = document.createElement("option");
            option.value = name;
            option.innerText = name;

            contenedordatalistagenda.appendChild(option);
        });
        registroCC.forEach(function(e) {
            var exten = e.Extension;
            if (exten == "0") {

            } else {
                var option = document.createElement("option");
                option.value = exten;
                option.innerText = exten;

                contenedordatalistextenciones.appendChild(option);
            }
        });

        for (let d = 0; d < exTMovil.length; d++) {
            var exten = exTMovil[d]
            if (exten == "0") {

            } else {
                var option = document.createElement("option");
                option.value = exten;
                option.innerText = exten;

                contenedordatalistextenciones.appendChild(option);
            }

        }


        registroCC.forEach(function(e) {
            var name = e.CompleteName;

            var option = document.createElement("option");
            option.value = name;
            option.innerText = name;

            contenedordatalistincidencias.appendChild(option);
        });

        var filteredEmpresas = [];

        registroCC.forEach(function(element) {
            if (filteredEmpresas.indexOf(element.CompanyName) == -1) {
                filteredEmpresas.push(element.CompanyName);
            }
        });

        var conentedorempresas = document.getElementById('empresas');

        filteredEmpresas.forEach(function(e) {
            var option = document.createElement("option");
            option.value = e;
            option.innerText = e;

            conentedorempresas.appendChild(option);
        });

    }

};
xmlhttp.open("GET", "php/cartas.php", true);

xmlhttp.send();



//---------------------------------GENERAR TODAS LA AGENDA COMO CARTAS---------------------------------  
var contAgenda = document.getElementById('contagenda');
var buscador = document.getElementById('buscador');

function generarCartas() {
    pill.style.cssText = 'display:flex;'
    contAgenda.innerHTML = '';
    for (let i = 0; i < registroCC.length; i++) {
        carta(i);
    }
}

//---------------------------------FILTRO PARA BUSCAR---------------------------------  
function search() {

    contAgenda.innerHTML = '';
    var extencion = document.getElementById('ext').value
    var palabra = buscador.value.toUpperCase();
    var selIndex = document.getElementById("empresas").selectedIndex;
    var selValue = document.getElementById("empresas").options[selIndex].innerHTML;
    if (palabra == "" && extencion == "") {
        generarCartas();
    } else {
        for (let i = 0; i < registroCC.length; i++) {
            var exten = ''
            var ex = new RegExp(/#\w+:\w+#/g);
            if (registroCC[i].Observations != undefined) {
                var texto = registroCC[i].Observations.match(ex);
                if (texto != null) {
                    for (let j = 0; j < texto.length; j++) {
                        if (texto[j] != '') {
                            exten += ' ' + texto[j].split(':')[1].replace('#', '')
                        }
                    }

                }
            }
            if (registroCC[i].Observations == undefined) {
                var nameEx = registroCC[i].Name.toUpperCase()
                if (nameEx.indexOf(palabra) >= 0 && registroCC[i].Extension.indexOf(extencion) >= 0) {
                    carta(i);
                } else if (extencion == registroCC[i].Extension || extencion == registroCC[i].extMovil) {
                    carta(i);
                }

            } else if (registroCC[i].CompleteName.indexOf(palabra) >= 0 && registroCC[i].Extension.indexOf(extencion) >= 0) {
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
            } else if (extencion == registroCC[i].Extension || exten.indexOf(extencion) >= 0 && extencion != '') {
                carta(i);
            }
        }
    }
}

//---------------------------------CREACIÓN DE LOS ELEMENTOS ---------------------------------  

function carta(i) {
    var card = document.createElement('div');
    card.setAttribute('class', 'card text-white border-dark bg-secondary mb-3');
    card.setAttribute('style', 'width: 400px; max-width: 23rem; margin:10px;  height:auto ;');
    card.setAttribute('id', 'carta' + i);
    var header = document.createElement('div');
    header.setAttribute('class', 'card-header');
    var cardBody = document.createElement('div');
    cardBody.setAttribute('class', 'card-body');
    cardBody.setAttribute('id', 'contenidoCarta');
    var titulo = document.createElement('h5');
    titulo.setAttribute('class', 'card-title');

    if (registroCC[i].Observations == undefined) {
        header.innerHTML = '<b>' + registroCC[i].Name + '</b>';
        if (registroCC[i].Extension == '0' || registroCC[i].Extension == null || registroCC[i].Extension == '0' || registroCC[i].Extension == undefined) {
            var texto = document.createElement('div');
            texto.innerHTML = '<b> Extensión Móvil </b> ' + registroCC[i].extMovil;
        } else if (registroCC[i].extMovil == '0' || registroCC[i].extMovil == null || registroCC[i].extMovil == '0' || registroCC[i].extMovil == undefined) {
            var texto = document.createElement('div');
            texto.innerHTML = '<b> Extensión Fijo </b> ' + registroCC[i].Extension + '</br>';
        } else if (registroCC[i].CompanyName.length >= 0) {

            var texto = document.createElement('div');
            texto.innerHTML = '<b> Extensión Fijo </b> ' + registroCC[i].Extension + '</br>' + '<b>Lugar de trabajo: </b>' + registroCC[i].CompanyName;
        } else {
            var texto = document.createElement('div');
            texto.innerHTML = '<b> Extensión Fijo </b> ' + registroCC[i].Extension + '</br>' + '<b> Extensión Móvil </b> ' + registroCC[i].extMovil;

        }

    } else {
        var exten = '';
        var extip = '';
        var sufijo = '';
        var extnFijo = '';
        var moExt = '';
        var ex = new RegExp(/#\w+:\w+#/g)
        var texto = registroCC[i].Observations.match(ex);
        if (texto == null) {
            exten = '';

        } else {
            for (let j = 0; j < texto.length; j++) {
                sufijo = '' + texto[j].split(':')[0].replace('#', '');
                if (sufijo == 'FIJO2EXT') {
                    exten += '' + texto[j].split(':')[1].replace('#', '');
                    extnFijo = ' (' + exten + ')';
                } else if (sufijo == 'MOVILEXT') {
                    moExt += ' ' + texto[j].split(':')[1].replace('#', '');
                } else if (sufijo == 'VOZIPEXT') {
                    extip += ' ' + texto[j].split(':')[1].replace('#', '');
                    extnFijo += ' (IP:' + extip + ')';
                }

            }
        }

        var lugarDeTrabajo = registroCC[i].WorkplaceName + '</br>';
        var Email = '<b>Email: </b>' + registroCC[i].EmailAddress + '</br>';
        var FijoEx = '<b>Fijo:  </b>' + registroCC[i].DirectPhoneNumber + ' (' + registroCC[i].Extension + ')' + extnFijo + '</br>';

        var MovilEx = '<b>Móvil: </b>' + registroCC[i].CompanyMobilePhoneNumber + '  <b>Corto: </b> ' + moExt + '</br>';

        var NuFax = '<b>Número de Fax: </b>' + registroCC[i].FaxNumber + '</br>';
        var Observa = '<b>Observaciones: </b>' + registroCC[i].Observations + '</br>';
        Observa = Observa.replace(ex, '');

        if (registroCC[i].WorkplaceName == '' || registroCC[i].WorkplaceName == '0' || registroCC[i].WorkplaceName == null) {
            lugarDeTrabajo = ''
        }
        if (registroCC[i].EmailAddress == '' || registroCC[i].EmailAddress == '0' || registroCC[i].EmailAddress == null || registroCC[i].EmailAddress == '.') {
            Email = ''
        }
        if (registroCC[i].DirectPhoneNumber == '' || registroCC[i].DirectPhoneNumber == '0' || registroCC[i].DirectPhoneNumber == null) {
            FijoEx = ''
        }
        if (registroCC[i].CompanyMobilePhoneNumber == '' || registroCC[i].CompanyMobilePhoneNumber == '0' || registroCC[i].CompanyMobilePhoneNumber == null) {
            MovilEx = ''
        }
        if (registroCC[i].FaxNumber == '' || registroCC[i].FaxNumber == '0' || registroCC[i].FaxNumber == null) {
            NuFax = ''
        }
        if (registroCC[i].Observations == '' || registroCC[i].Observations == '0' || registroCC[i].Observations == null) {
            Observa = ''
        }

        var texto = document.createElement('div');
        header.innerHTML = '<b>' + registroCC[i].Name + ' ' + registroCC[i].SecondName1 + ' ' + registroCC[i].SecondName2 + '</b>'

        texto.innerHTML = lugarDeTrabajo + Email + FijoEx + MovilEx + NuFax + Observa;
    }

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
    pill.style.cssText = 'display:none;'
}