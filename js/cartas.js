registroA3();
var exTMovil = []
var exTfijo = []
var exTfijo2 = []
var extVozIp = []
//función pra recoger los datos de  la BBDD Informática
function recogerExt() {

    if (window.XMLHttpRequest) {
        xmlhttp = new XMLHttpRequest();
    } else {
        xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
    }
    xmlhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            var datos = JSON.parse(this.responseText);

            for (let i = 0; i < datos.length; i++) {
                datos[i].CompleteName = datos[i].Name.toUpperCase();
                registroCC.push(datos[i]);
                exTMovil.push(datos[i].extMovil);
                exTfijo.push(datos[i].Extension);
                exTfijo2.push(datos[i].Extension2);
                extVozIp.push(datos[i].extVozIP);
            }
        }
    };
    xmlhttp.open("GET", "php/extensiones.php", true);
    xmlhttp.send();
}


var registroCC = [];
//función pra recoger los datos de  la BBDD A3
function registroA3() {
    recogerExt();
    if (window.XMLHttpRequest) {
        xmlhttp = new XMLHttpRequest();
    } else {
        xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
    }
    xmlhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            var fechas = JSON.parse(this.responseText);

            for (let i = 0; i < fechas.length; i++) {
                registroCC.unshift(fechas[i]);
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

            registroCC.sort(function (a, b) {
                var nombreCompletoA = '';
                var nombreCompletoB = '';
                
                nombreCompletoA = a.Name + ' ' + a.SecondName1 + ' ' + a.SecondName2
                nombreCompletoB = b.Name + ' ' + b.SecondName1 + ' ' + b.SecondName2
                if (a.SecondName1 == undefined && a.SecondName2 == undefined) {
                    nombreCompletoA = a.Name
                }
                if (b.SecondName1 == undefined && b.SecondName2 == undefined) {
                    nombreCompletoB = b.Name
                }
                if (nombreCompletoA > nombreCompletoB) {
                    return 1;
                }
                if (nombreCompletoA < nombreCompletoB) {
                    return -1;
                }
                return 0;
            });
            var contenedordatalistincidencias = document.getElementById("personasincidencias");
            var contenedordatalistextensiones = document.getElementById('extension');

//Rellenamos los datlist que muestran los nombres en incidencias y las extensiones en la agenda
            registroCC.forEach(function (e) {
                var exten = e.Extension;
                if (exten == "0") {
                } else {
                    var option = document.createElement("option");
                    option.value = exten;
                    option.innerText = exten;
                    contenedordatalistextensiones.appendChild(option);
                }
            });
            
            for (let d = 0; d < exTMovil.length; d++) {
                var exten = exTMovil[d]
                if (exten == "0") {
                } else {
                    var option = document.createElement("option");
                    option.value = exten;
                    option.innerText = exten;
                    contenedordatalistextensiones.appendChild(option);
                }
            }
            
            for (let d = 0; d < exTfijo.length; d++) {
                var exten = exTfijo[d]
                if (exten == "0") {
                } else {
                    var option = document.createElement("option");
                    option.value = exten;
                    option.innerText = exten;
                    contenedordatalistextensiones.appendChild(option);
                }
            }
            
            for (let d = 0; d < exTfijo2.length; d++) {
                var exten = exTfijo2[d]
                if (exten == "0") {

                } else {
                    var option = document.createElement("option");
                    option.value = exten;
                    option.innerText = exten;

                    contenedordatalistextensiones.appendChild(option);
                }
            }
            
            for (let d = 0; d < extVozIp.length; d++) {
                var exten = extVozIp[d]
                if (exten == "0") {
                } else {
                    var option = document.createElement("option");
                    option.value = exten;
                    option.innerText = exten;
                    contenedordatalistextensiones.appendChild(option);
                }
            }
            
            registroCC.forEach(function (e) {
                var name = e.Name + ' ' + e.SecondName1 + ' ' + e.SecondName2;
                if(e.SecondName1 == undefined || e.SecondName2 == undefined ){
                    name = e.Name
                }
                var option = document.createElement("option");
                option.value = name;
                option.innerText = name;

                contenedordatalistincidencias.appendChild(option);
            });
            
            var filteredEmpresas = [];
            registroCC.forEach(function (element) {
                if (filteredEmpresas.indexOf(element.CompanyName) == -1) {
                    filteredEmpresas.push(element.CompanyName);
                }
            });
            
            var conentedorempresas = document.getElementById('empresas');
            filteredEmpresas.forEach(function (e) {
                var option = document.createElement("option");
                option.value = e;
                option.innerText = e;
                conentedorempresas.appendChild(option);
            });
        }
    };
    xmlhttp.open("GET", "php/cartas.php", true);
    xmlhttp.send();
}



var contAgenda = document.getElementById('contagenda');
var buscador = document.getElementById('buscador');
//función que genera todas las cartas de la agenda
function generarCartas() {
    document.getElementById('Incidencias').style.cssText = 'display:none'
    spiner.setAttribute('style', 'display:block');
    setTimeout(function () {
        pill.style.cssText = 'display:flex;'
        contAgenda.innerHTML = '';
        for (let i = 0; i < registroCC.length; i++) {
            carta(i);
            spiner.setAttribute('style', 'display:none');
        }
    }, 1000);
}


//función para filtrar por extensiones  
function search() {
    setTimeout(function () {
        contAgenda.innerHTML = '';
        var extension = document.getElementById('ext').value
        if (extension == "") {
            generarCartas();
        } else {
            for (let i = 0; i < registroCC.length; i++) {
                var exten = ''
                var ex = new RegExp(/#\w+:\w+#/g); //expresión regular
                if (registroCC[i].Observations != undefined) {
                    var texto = registroCC[i].Observations.match(ex); //ejecutamos la expresión regular sobre las Observsiones 
                    if (texto != null) {
                        for (let j = 0; j < texto.length; j++) {
                            if (texto[j] != '') {
                                exten += ' ' + texto[j].split(':')[1].replace('#', '') //dividimos la palabra en dos cadenas y nos quedamos con la segunda, ya que la primera sería [0]
                            }
                        }
                    }
                }
                if (registroCC[i].Observations == undefined) {//Si no existe Observations esque recibimos los datos de Informática y las extensiones son diferentes
                    if (registroCC[i].Extension.indexOf(extension) >= 0) {
                        carta(i);
                    } else if (extension == registroCC[i].Extension || extension == registroCC[i].extMovil) {
                        carta(i);
                    } else if (registroCC[i].Extension2.indexOf(extension) >= 0) {
                        carta(i);
                    } else if (registroCC[i].extMovil.indexOf(extension) >= 0) {
                        carta(i);
                    } else if (registroCC[i].extVozIP.indexOf(extension) >= 0) {
                        carta(i);
                    }
                } else {
                    if (extension == registroCC[i].Extension || exten.indexOf(extension) >= 0 && extension != '') {
                        carta(i);
                    } else if (extension == '') {
                        carta(i);
                        spiner.setAttribute('style', 'display:none');
                    }
                }

            }
        }
    }, 1000);
}

//función que crea una carta cada vez que se ejecuta
function carta(i) {
    //creamos el elemento
    var card = document.createElement('div');
    card.setAttribute('class', 'card text-white border-dark bg-secondary mb-3');
    card.setAttribute('style', 'width: 330px; max-width: 23rem; margin:5px;  height:auto ;');
    card.setAttribute('id', 'carta' + i);
    var header = document.createElement('div');
    header.setAttribute('class', 'card-header');
    header.setAttribute('id', 'cabesera')
    var cardBody = document.createElement('div');
    cardBody.setAttribute('class', 'card-body');
    cardBody.setAttribute('id', 'contenidoCarta');
    var titulo = document.createElement('h5');
    titulo.setAttribute('class', 'card-title');
//si las observations esundefined significa que la información viene desde la BBDD Informática
    if (registroCC[i].Observations == undefined) {
        var exFijo = '(' + registroCC[i].Extension + ') ';
        var exFijo2 = '(' + registroCC[i].Extension2 + ') ';
        var exVozIP = '(IP:' + registroCC[i].extVozIP + ') ';
        var exMovil = '(' + registroCC[i].extMovil + ')';
        var email2 = '<i class="far fa-envelope" style="font-size:20px" > </i> <a  style="color: #ff4747;" href=mailto:' + registroCC[i].Email2 + '>&nbsp;' + registroCC[i].Email2 + '</a></br>';
        var email = '<i class="far fa-envelope" style="font-size:20px" > </i> <a  style="color: #ff4747;" href=mailto:' + registroCC[i].Email + '>&nbsp;' + registroCC[i].Email + '</a></br>';
        var nFijo = registroCC[i].NumeroFijo;
        var nMovil = registroCC[i].NumeroMovil;
        var centro = registroCC[i].Centro;
        if (registroCC[i].Extension == null || exFijo == '(0) ') {
            exFijo = '';
        }
        if (registroCC[i].Extension2 == null || exFijo2 == '(0) ') {
            exFijo2 = '';
        }
        if (registroCC[i].extVozIP == null || exVozIP == '(IP:0) ') {
            exVozIP = '';
        }
        if (registroCC[i].extMovil == null || exMovil == '(0) ') {
            exMovil = '';
        }
        if (registroCC[i].NumeroFijo == null || nFijo == '0') {
            nFijo = '';
        }
        if (registroCC[i].NumeroMovil == null || nMovil == '0') {
            nMovil = '';
        }
        if (registroCC[i].Email == null || registroCC[i].Email == '') {
            email = '';
        }
        if (registroCC[i].Centro == null || centro == '0') {
            centro = '';
        }
        if (centro != '') {
            centro = '<b>Centro: </b>' + registroCC[i].Centro + '</br>';
        }
        if (registroCC[i].Email2 == '' || registroCC[i].Email2 == null ) {
            email2 = ' '
        }
        header.innerHTML = '<b style="width:82%" >' + registroCC[i].Name + '</b>';
        if (registroCC[i].Extension == '0' || registroCC[i].Extension == null || registroCC[i].Extension == '0' || registroCC[i].Extension == undefined) {
            var texto = document.createElement('div');
            texto.innerHTML = registroCC[i].CompanyName + '</br>' + centro;
            texto.innerHTML += '<i class="fas fa-mobile-alt" style="font-size:20px" ></i> &nbsp;&nbsp;' + nMovil + ' ' + '<b>Corto: </b>' + exMovil + '</br>';
        } else if (registroCC[i].extMovil == '0' || registroCC[i].extMovil == null || registroCC[i].extMovil == '0' || registroCC[i].extMovil == undefined) {
            var texto = document.createElement('div');
            texto.innerHTML = registroCC[i].CompanyName + '</br>' + centro;
            texto.innerHTML += '<i class="fas fa-phone" style="font-size:20px" > </i> ' + nFijo + ' ' + exFijo + exFijo2 + exVozIP + '</br>';
        } else {
            var texto = document.createElement('div');
            texto.innerHTML = registroCC[i].CompanyName + '</br>' + centro;
            texto.innerHTML += '<i class="fas fa-phone" style="font-size:20px" > </i> ' + nFijo + ' ' + exFijo + exFijo2 + exVozIP + '</br>';
            texto.innerHTML += '<i class="fas fa-mobile-alt" style="font-size:20px" ></i> &nbsp;&nbsp;' + nMovil + ' ' + '<b>Corto: </b>' + exMovil + '</br>';
        }
        if (email != '') {
            texto.innerHTML += email + email2;
        }
        var t = ''
        for (let i = 0; i < emailsInfo.length; i++) {
            t += emailsInfo[i].direccion + ';'
        }
        var contpp = document.createElement('div');
        contpp.setAttribute('id', 'contpp')
        var info = document.createElement('div');
        info.setAttribute('id', 'info');
        info.innerHTML = '<i title="BBDD Informatica" class="fas fa-info-circle"></i>'

        var sendEmail = document.createElement('a');

        sendEmail.innerHTML = '<i id="cor" title="Sugerir corrección" class="fas fa-user-edit"></i>';
        sendEmail.setAttribute('id', 'email');

        sendEmail.setAttribute('href', 'mailto:' + t + '?Subject=Sugerir correción%20en%20la%20agenda:%20' + registroCC[i].Name + '&body=Nombre: ' + registroCC[i].Name + '%0D%0ALugar de trabajo: ' + registroCC[i].CompanyName + ' (' + registroCC[i].Centro + ') ' + ' %0D%0AEmail: ' + registroCC[i].Email + '%0D%0AFijo: ' + registroCC[i].NumeroFijo + '%0D%0AExtensiones fijo: (' + registroCC[i].Extension + ') (' + registroCC[i].Extension2 + ') ' + '%0D%0AMovil: ' + registroCC[i].NumeroMovil + '%0D%0AExtensión Movil: ' + registroCC[i].extMovil);
        var editar = document.createElement('div');
        editar.setAttribute('id', 'updateInfo');
        editar.innerHTML = '<i class="far fa-edit" style="color:red; cursor:pointer;" id="edit' + i + '" data-toggle="modal" onclick="soloEdit(this.id)"></i>';

        contpp.appendChild(info);
        contpp.appendChild(sendEmail);
        header.appendChild(contpp);
        // texto.appendChild(editar)
    } else {
        var noMostrar = registroCC[i].Observations.indexOf('#NOMOSTRAR#') >= 0;
        if (noMostrar) {
            return;
        }
        var exten = '';
        var extip = '';
        var sufijo = '';
        var depart = '';
        var extnFijo = '';
        var Email2 = '';
        var extFijo1 = ' (' + registroCC[i].Extension + ') ';
        if (registroCC[i].Extension == '0') {
            extFijo1 = '';
        }
        var moExt = '';
        var ex = new RegExp(/#\w+:.+#/g);
        //texto contiene todas las palabras que cumplen la expresión regular.
        var texto = registroCC[i].Observations.match(ex);
        var lugarDeTrabajo = registroCC[i].CompanyName;
        if (texto == null) {
            exten = '';

        } else {
            for (let j = 0; j < texto.length; j++) {
        //gestionamos lo que buscamos en las observasiones.
                sufijo = '' + texto[j].split(':')[0].replace('#', '');
                if (sufijo == 'FIJO2EXT') {
                    exten = '' + texto[j].split(':')[1].replace('#', '');
                    extnFijo = ' (' + exten + ')';
                } else if (sufijo == 'MOVILEXT') {
                    moExt += '(' + texto[j].split(':')[1].replace('#', '') + ')';
                } else if (sufijo == 'VOZIPEXT') {
                    extip = ' ' + texto[j].split(':')[1].replace('#', '');
                    extnFijo += ' (IP:' + extip + ')';
                } else if (sufijo == 'CENTRO') {
                    extip = ' ' + texto[j].split(':')[1].replace('#', '');
                    lugarDeTrabajo += '</br><b>Centro: </b>' + extip + ' ';
                } else if (sufijo == 'EMAIL2') {
                    extip = ' ' + texto[j].split(':')[1].replace('#', '');
                    Email2 += '<i class="far fa-envelope" style="font-size:20px" > </i> <a style="color: #ff4747;" href=mailto:' + extip + '>&nbsp;' + extip + '</a></br>';
                } else if (sufijo == 'DEPARTAMENTO') {
                    extip = ' ' + texto[j].split(':')[1].replace('#', '');
                    depart += '</br><b>Departamento: </b>' + extip + ' ';
                }
            }
        }

        var Email = '<i class="far fa-envelope" style="font-size:20px" > </i> <a style="color: #ff4747;"  href=mailto:' + registroCC[i].EmailAddress + '>&nbsp;' + registroCC[i].EmailAddress + '</a></br>';

        var FijoEx = '<i class="fas fa-phone" style="font-size:20px" > </i> ' + registroCC[i].DirectPhoneNumber + extFijo1 + extnFijo + '</br>';

        var MovilEx = '<i class="fas fa-mobile-alt" style="font-size:20px" ></i> &nbsp;&nbsp;' + registroCC[i].CompanyMobilePhoneNumber + '  <b>Corto: </b> ' + moExt + '</br>';

        var NuFax = '<b>Número de Fax: </b>' + registroCC[i].FaxNumber + '</br>';
        var Observa = '<b>Observaciones: </b>' + registroCC[i].Observations + '</br>';
        Observa = Observa.replace(ex, '');

        if (registroCC[i].WorkplaceName == '' || registroCC[i].WorkplaceName == '0' || registroCC[i].WorkplaceName == null) {
            lugarDeTrabajo = ''
        }
        if (registroCC[i].EmailAddress == 'prueba@prueba.es' ||registroCC[i].EmailAddress == '' || registroCC[i].EmailAddress == '0' || registroCC[i].EmailAddress == null || registroCC[i].EmailAddress == '.') {
            Email = ''
        }
        if ((extFijo1 == '') && (extnFijo == '') && (registroCC[i].DirectPhoneNumber == '') || (registroCC[i].DirectPhoneNumber == '0')) {
            FijoEx = ''
        }
        if (registroCC[i].CompanyMobilePhoneNumber == '' || registroCC[i].CompanyMobilePhoneNumber == '0' || registroCC[i].CompanyMobilePhoneNumber == null) {
            MovilEx = ''
        }
        if (registroCC[i].FaxNumber == '' || registroCC[i].FaxNumber == '0' || registroCC[i].FaxNumber == null) {
            NuFax = ''
        } 
        if (Observa.indexOf('<b>Observaciones: </b>') >= 0 || registroCC[i].Observations == '' || registroCC[i].Observations == '0' || registroCC[i].Observations == null) {
            Observa = ''
        }

        var texto = document.createElement('div');
        header.innerHTML = '<b style="width:82%" >' + registroCC[i].Name + ' ' + registroCC[i].SecondName1 + ' ' + registroCC[i].SecondName2 + '</b>'
        var t = ''
        for (let i = 0; i < emailsRRHH.length; i++) {
            t += emailsRRHH[i].direccion + ';'
        }

        texto.innerHTML = lugarDeTrabajo + depart + '</br>' + Email + Email2 + FijoEx + MovilEx + NuFax + Observa;
        var contpp = document.createElement('div');
        contpp.setAttribute('id', 'contpp')
        var info = document.createElement('div');
        info.setAttribute('id', 'info');
        info.innerHTML = '<i title="BBDD A3" class="fas fa-info-circle"></i>'

        var sendEmail = document.createElement('a');

        sendEmail.innerHTML = '<i id="cor" title="Sugerir corrección"  class="fas fa-user-edit"></i>';
        sendEmail.setAttribute('id', 'email');
        sendEmail.setAttribute('href', 'mailto:' + t + '?Subject=Sugerir corrección en la agenda: ' + registroCC[i].CompleteName + '&body=Nombre: ' + registroCC[i].CompleteName + '%0D%0ALugar de trabajo: ' + registroCC[i].WorkplaceName + ' %0D%0AEmail: ' + registroCC[i].EmailAddress + '%0D%0AFijo: ' + registroCC[i].DirectPhoneNumber + '%0D%0AExtensión fijo: ' + extFijo1 + ' ' + extnFijo + ' %0D%0AMovil: ' + registroCC[i].CompanyMobilePhoneNumber + '%0D%0AExtensión Movil: ' + moExt + ' %0D%0ANumero de Fax: ' + registroCC[i].FaxNumber + ' %0D%0AID de Empresa: ' + registroCC[i].CompanyCode + ' %0D%0AID de Empleado: ' + registroCC[i].EmployeeCode);
        contpp.appendChild(info);
        contpp.appendChild(sendEmail);
        header.appendChild(contpp)
    }

    cardBody.appendChild(texto);
    card.appendChild(header);
    card.appendChild(cardBody);
    contAgenda.appendChild(card);

}

function limpiar() {
    document.getElementById('Incidencias').style.cssText = 'display:none'
    document.getElementById('INFORMATICAform').style.cssText = 'display:none'
    document.getElementById('RRHHform').style.cssText = 'display:none'
    generarCartas();
     
}


//function que filtra por empresa y nombre sumando ambas cosas
function filtradoPorEmpresaYnombre() {
    setTimeout(function () {
        var empresaAcutal = document.getElementById('empresas').value
        var nombreActual = document.getElementById('buscador').value
        nombreActual = nombreActual.toUpperCase(); // convertiemos el nombre en mayuscula 
        contAgenda.innerHTML = '';

        for (let i = 0; i < registroCC.length; i++) {
            var vv = true;
            if (empresaAcutal != 'TODAS') {
                if (empresaAcutal != registroCC[i].CompanyName) {
                    continue;
                }
            }
            if (nombreActual != '') {
                var splitPalabra = nombreActual.split(' ');
                for (let t = 0; t < splitPalabra.length; t++) {
                    if (registroCC[i].CompleteName.indexOf(splitPalabra[t]) == -1) {
                        vv = false;
                    }
                }
                if (!vv) {
                    continue;
                }
            }
            carta(i);
        }

    }, 1000);
}