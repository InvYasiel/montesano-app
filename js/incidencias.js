//Variables donde recogemos los elementos del formulario
let nombre = document.getElementById("incidenciasNombre");
let incidenCheck = document.getElementById("incidenCheck");
let titulo = document.getElementById("incidenciasTitulo");
let descripcion = document.getElementById("incidenciasDescripcion").value;
var tname = true;
let spiner = document.getElementById('spiner');
let chooser = document.getElementById('chooser');
let archivo = document.getElementById('archivo');
let grande = document.getElementById('muyGrande');

///KEYS para conectar con trello
var appkey = "";
var secret = "c5a52ad53cef30fb0539bab09df6967178a40d187ef829ae9c93faf700ea6d16";
var token = "";
// var idlist = "5890852c1e1dc7fb0bd94521"; //incidencias informática.
var usuario1 = "5891c93eb1cfa471ee1fe47c";//bibiana
var usuario2 = "59a68c4e314350c790512ae9";//borja
var idlist = ''
var tipoInfo = document.getElementById("tipoInfo");
var tipoRH = document.getElementById('tipoRH');

function opciones(){
    var x = document.getElementById("tipoInfo");
    var y = document.getElementById('tipoRH');
    var n = 0
   var nn = 0
    for (let i = 0; i < infoTrello.length; i++) {
        if(infoTrello[i].ID == '1'){
            var option = document.createElement("option");
            option.text = infoTrello[i].nombre; 
            option.setAttribute('value',infoTrello[i].nombre)
            tipoInfo.appendChild(option);
            n++
            if(n == 2){
                var option = document.createElement("option");
            option.text = 'Seleccione tipo de incidencia'; 
            option.setAttribute('slected',true)
            tipoInfo.appendChild(option);
            }else{
                changeidlistInfo();
            }
        }
        
        if(infoTrello[i].ID == '2'){
            var option = document.createElement("option");
           
            option.text = infoTrello[i].nombre; 
            option.setAttribute('value',infoTrello[i].nombre)
            tipoRH.appendChild(option);
            nn++
            if(nn == 2){
                var option = document.createElement("option");
            option.text = 'Seleccione tipo de incidencia'; 
            option.setAttribute('selected',true)
            tipoRH.appendChild(option);
            }else{
                changeidlistRRHH()
            }
        }
        // if(n==1){
        //     document.getElementById('select').remove();
        // }
    }
}
function changeidlistInfo(){
    for (let i = 0; i < infoTrello.length; i++) {
        if(tipoInfo.value == infoTrello[i].nombre){
            idlist = infoTrello[i].idlist
            appkey = infoTrello[i].appkey;
            token= infoTrello[i].token;
        }

    }
}


//comprovamos que los campos obligatorios están rellenados
function comprobarCampos() {
    let res = true;
    if (nombre.value == "" || titulo.value == "" || tipoInfo.value == "") {
        swal({
            title: "Error!",
            text: "Rellena los campos obligatorios (*)",
            icon: "error",
            button: "Volver a intentar",
        });
        res = false;
    }
    if(tipoRH.value == 0){
        swal({
            title: "Error!",
            text: "Selecciona un tipo de incidencia(*)",
            icon: "error",
            button: "Volver a intentar",
        });
        res = false;
    }
    return res;
}
// a la hora de limpiar la insidencia damos un aviso y recargamos la página
function incidenciasLimpiar() {
    swal({
            title: "¿Deseas limpiar la incidencia?",
            text: "Se borrarán todos los campos",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
        .then(function (willDelete) {
            if (willDelete) {
                location.reload()
            } else {
                swal("Continue con su incidencia");
            }
        });
}
//recogemos información del navegador en el que estamos actualmente
function getBrowserInfo() {
    var ua = navigator.userAgent,
        tem,
        M = ua.match(/(opera|chrome|safari|firefox|msie|trident(?=\/))\/?\s*(\d+)/i) || [];
    if (/trident/i.test(M[1])) {
        tem = /\brv[ :]+(\d+)/g.exec(ua) || [];
        return 'IE ' + (tem[1] || '');
    }
    if (M[1] === 'Chrome') {
        tem = ua.match(/\b(OPR|Edge)\/(\d+)/);
        if (tem != null) return tem.slice(1).join(' ').replace('OPR', 'Opera');
    }
    M = M[2] ? [M[1], M[2]] : [navigator.appName, navigator.appVersion, '-?'];
    if ((tem = ua.match(/version\/(\d+)/i)) != null) M.splice(1, 1, tem[1]);
    return M.join(' ');
};

//Función que se inicia al crear la incidencia
function incidenciasCrear() {
    for (let t = 0; t < registroCC.length; t++) {
        if (registroCC[t].Name + ' ' + registroCC[t].SecondName1 + ' ' + registroCC[t].SecondName2 == nombre.value) {
            var tname = false
        }
    }
    if (tname == false) {
        var OSName = "Desconocido";
        //Obtenemos sistema operativo
        if (navigator.appVersion.indexOf("Win") != -1) OSName = "Windows";
        if (navigator.appVersion.indexOf("Linux") != -1) OSName = "Linux";
        //Obtenemos fecha actual
        var fecha = new Date();
        var fechaTrello = fecha.getFullYear() + ("0" + (fecha.getMonth() + 1)).slice(-2) + ("0" + fecha.getDate()).slice(-2);
        var hora = fecha.getHours() + ":" + fecha.getMinutes() + ":" + fecha.getSeconds();
        var myIP = '';

        //en caso de que se use internet explorer no podemos disponer de la IP
        var es_ie = navigator.userAgent.indexOf("MSIE") > -1;
        if (getBrowserInfo() == 'IE 11' || getBrowserInfo() == 'Edge 16') {
            let descripcion = document.getElementById("incidenciasDescripcion").value;
            var desc = descripcion + '%0A' + " **Ip no disponible** al usar Internet Explore. " + " **Sistema operativo:** " + OSName;
            crearCarta(desc, myIP, OSName, fechaTrello, hora);
        } else { //demás navegadores
            //obtenemos la IP
            window.RTCPeerConnection = window.RTCPeerConnection || window.mozRTCPeerConnection || window.webkitRTCPeerConnection; //compatibility for Firefox and chrome
            var pc = new RTCPeerConnection({
                    iceServers: []
                }),
                noop = function () {};
            pc.createDataChannel('');
            pc.createOffer(pc.setLocalDescription.bind(pc), noop);
            pc.onicecandidate = function (ice) {
                if (comprobarCampos()) {
                    if (ice && ice.candidate && ice.candidate.candidate) {
                        var myIP = /([0-9]{1,3}(\.[0-9]{1,3}){3}|[a-f0-9]{1,4}(:[a-f0-9]{1,4}){7})/.exec(ice.candidate.candidate)[1];

                        pc.onicecandidate = noop;
                    }
                    //Valores de la descripción en la incidensia
                    let descripcion = document.getElementById("incidenciasDescripcion").value;
                    var inciEm = '';
                    var inciTel = '';
                    var inciMovil = '';
                    for (let i = 0; i < registroCC.length; i++) {
                        if (nombre.value == registroCC[i].CompleteName) {
                            if (registroCC[i].Observations == undefined) {
                                inciEm = 'Email: ' + registroCC[i].Email;
                                inciTel = ' | Teléfono: ' + registroCC[i].NumeroFijo;
                                inciMovil = ' | Móvil: ' + registroCC[i].NumeroMovil;
                            } else {
                                inciEm = 'Email: ' + registroCC[i].EmailAddress;
                                inciTel = ' | Teléfono: ' + registroCC[i].DirectPhoneNumber;
                                inciMovil = ' | Móvil: ' + registroCC[i].CompanyMobilePhoneNumber;
                            }
                        }

                    }
                    var desc = descripcion + '%0A' + " **Ip:** " + myIP + " **Sistema operativo:** " + OSName + '%0A' + inciEm + inciTel + inciMovil;
                    //llamamos a la función crear carta pasandole las variables necesarias
                    crearCarta(desc, myIP, OSName, fechaTrello, hora);
                }
            }
        }
    } else {
        swal({
            title: "Error!",
            text: "Seleccione un nombre del desplegable",
            icon: "error",
            button: "Volver a intentar",
        });
    }
}
//POST a trello creando una carta
function crearCarta(desc, myIP, OSName, fechaTrello, hora) {
    var h = "";
    var data = null;
    var name = fechaTrello + ' ' + hora + ' ' + titulo.value + " Creado por: " + nombre.value;
    var xhr = new XMLHttpRequest();
    desc = desc.replace(/\n/g, '%0A');
    xhr.open("POST", "https://api.trello.com/1/cards?name=" + name + "&desc=" + desc + "&pos=top&idList=" + idlist + "&keepFromSource=all&key=" + appkey + "&token=" + token);
    xhr.send(data);
    xhr.addEventListener("readystatechange", function () {
        if (this.readyState === this.DONE) {
            //recogemos el id de la carta creada
            var dt = this.responseText;
            h = JSON.parse(dt).id;
            spiner.style.cssText = 'display:block';
            //llamada a las funciones para rellenar la carta
            selecLabel(h);
            if (archivos.length > 0) {
                adjuntos(h, name);
            }
            usuarioPredefinido(h, name);
        }
    });
}
//En caso de que el checkbox "importante" esté marcado mostramos mensaje
var importante = document.getElementById('incidenciasCheck');
var dpImportante = document.getElementById('dpImportante');
importante.addEventListener('click', function () {
    if (importante.checked == true) {
        dpImportante.style.cssText = 'display:true';
    } else {
        dpImportante.style.cssText = 'display:none';
    }
}, false)
//El label se crea si le damos a marcar importante, el label es añadirle el color rojo a la incidencia "Color rojo: 5aaf6396841642c2a8277156"
function selecLabel(data) {
    var datas = null;
    if (importante.checked == true) {
        var checkRQ = new XMLHttpRequest();
        checkRQ.open("POST", "https://api.trello.com/1/cards/" + data + "/idLabels?value=5890850bced82109ff07b701&key=" + appkey + "&token=" + token);
        checkRQ.send(datas);
    }
}
//función para adjuntar archivos a la "carta"
function adjuntos(data, name) {
    var arrData = [];
    var formData = new FormData();
    formData.append("token", token);
    formData.append("key", appkey);
    for (let i = 0; i < archivos.length; i++) { //recorremos todos los archivos seleccionados y los vamos enviando uno a uno
        formData.append("file", archivos[i]);
        var request = new XMLHttpRequest();
        request.open("POST", "https://api.trello.com/1/cards/" + data + "/attachments?key=" + appkey + "&token=" + token);
        request.send(formData);
        request.addEventListener("readystatechange", function () {

            if (this.readyState === this.DONE) {
                var finalizado = true;

                for (let i = 0; i < arrData.length; i++) {
                    if (arrData[i].readyState !== this.DONE) { //cuando esté finalizado mensaje de completado
                        finalizado = false;
                    }
                }
                if (finalizado == true) {
                    spiner.style.cssText = 'display:none';
                    swal({
                            title: "Completado!",
                            text: 'Incidencia ' + name,
                            icon: "success",
                            button: "Cerrar",
                        })
                        .then(function (value) {
                            swal(location.reload());
                        });
                }
            }
        });
    }
}
//eliminamos tanto visualmente como del array que contienen los archivos adjuntos
function eliminar(e) {
    var eliminarPapelera = document.getElementById(e);
    eliminarPapelera.parentElement.remove();
    e = e.slice(9)
    archivos.splice(e, 1);

}

//creamos  usuarios predefinidos los cuales estarán etiquetados por defecto
function usuarioPredefinido(data, name) {
    var ArrUsu = [usuario1, usuario2]
    var arrRQ = [];
    var datas = null;
    var usuRQ1 = new XMLHttpRequest();
    for (let i = 0; i < ArrUsu.length; i++) {
        usuRQ1.open("POST", "https://api.trello.com/1/cards/" + data + "/idMembers?value=" + ArrUsu[i] + "&key=" + appkeyRRHH + "&token=" + tokenRRHH);
        usuRQ1.send(datas);
    }
    usuRQ1.addEventListener("readystatechange", function () {
        if (this.readyState === this.DONE) {
            var finalizado = true;
            for (let i = 0; i < arrRQ.length; i++) {
                if (arrRQ[i].readyState !== this.DONE) {
                    finalizado = false;
                }
            }
            if (finalizado == true && archivos.length == 0) {
                spiner.style.cssText = 'display:none';
                swal({
                        title: "Completado!",
                        text: 'Incidencia ' + name,
                        icon: "success",
                        button: "Cerrar",
                    })
                    .then(function (value) {
                        swal(location.reload());
                    });
            }
        }
    });
}

var archivos = []
var rutas = []
var cont = 0;

function cambio(e) {
    var chooser = document.getElementById("" + e)
    var fileSize = chooser.files[0].size;
    var siezekiloByte = parseInt(fileSize / 1024);
    if (siezekiloByte > chooser.getAttribute('size')) {
        swal({
            title: "Error!",
            text: "Imagen muy grande",
            icon: "error",
            button: "Volver a intentar",
        });
        return false;
    } else {

        chooser.files[0];

        var path = document.getElementById("" + e).files[0].name;
        rutas.push(path)
        var archivoCorrecto = true;
        if (archivos.length == 0) {
            archivos.push(chooser.files[0]);
            var info = document.getElementById('infofile');
            info.innerHTML += '<b> ' + path + '  <i class="fas fa-trash" id="papelera ' + cont + '" style="color:red" onclick="eliminar(id)"></i><b>';
            cont++;
        } else if (archivos.length > 0) {
            for (let i = 0; i < archivos.length; i++) {
                if (chooser.files[0].name == archivos[i].name) {
                    archivoCorrecto = false;
                }
            }
            if (archivoCorrecto == true) {
                archivos.push(chooser.files[0]);
                var info = document.getElementById('infofile');
                info.innerHTML += '<b> | ' + path + '  <i class="fas fa-trash" id="papelera ' + cont + '" style="color:red" onclick="eliminar(id)"></i><b>';
                cont++;
            } else {
                swal({
                    title: "Error!",
                    text: "No puedes agregar otro archivo con el mismo nombre",
                    icon: "error",
                    button: "Volver a intentar",
                });

            }
        }
    }
    document.getElementsByClassName('chooser')[0].value = '';
}