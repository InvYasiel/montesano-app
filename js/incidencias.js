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
var appkey = "151bcd104f1742fdcf0b8c2f4a4c8764";
var secret = "c5a52ad53cef30fb0539bab09df6967178a40d187ef829ae9c93faf700ea6d16";

var token = "ddc55434f6f11fbc1a3379adde4d5f66cd8be4be97d4d90eaca39322af045925";
var idlist = "5aaf6422caeb39da694e7dc1";
var usuario1 = "5891c93eb1cfa471ee1fe47c";
var usuario2 = "59a68c4e314350c790512ae9";


///--------------------COMPROBAR CAMPOS OBLIGATORIOS--------------------
function comprobarCampos() {
    let res = true;
    if (nombre.value == "" || titulo.value == "") {
        swal({
            title: "Error!",
            text: "Rellena los campos obligatorios (*)",
            icon: "error",
            button: "Volver a intentar",
        });
        res = false;
    }
    return res;
}
///--------------------LIMPIAR CAMPOS DE LA SOLICITUD DE LA INCIDENCIA--------------------
function incidenciasLimpiar() {
    location.reload();
}
///--------------------IDENTIFAR EL NAVEGADOR--------------------
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

///--------------------CREAR INCIDENDIA--------------------
function incidenciasCrear() {
    for (let t = 0; t < registroCC.length; t++) {
        if (registroCC[t].CompleteName == nombre.value) {
            var tname = false
        }
    }
    if (tname == false) {
        var OSName = "Desconocido";
        if (navigator.appVersion.indexOf("Win") != -1) OSName = "Windows";
        if (navigator.appVersion.indexOf("Linux") != -1) OSName = "Linux";
        //--------------------OTENER FECHA ACTUAL--------------------
        var fecha = new Date();
        var fechaTrello = fecha.getFullYear() + ("0" + (fecha.getMonth() + 1)).slice(-2) + ("0" + fecha.getDate()).slice(-2);
        var hora = fecha.getHours() + ":" + fecha.getMinutes() + ":" + fecha.getSeconds();
       var myIP ='';

        //--------------------EN CASO DE QUE SE USE INTERNET EXPLORER O EDJE--------------------
        var es_ie = navigator.userAgent.indexOf("MSIE") > -1;
        if (getBrowserInfo() == 'IE 11' || getBrowserInfo() == 'Edge 16') {
            let descripcion = document.getElementById("incidenciasDescripcion").value;
            var desc = descripcion + '%0A' + " Ip no disponible al usar Internet Explore. " + "Sistema operativo: " + OSName;
            crearCarta(desc, myIP, OSName, fechaTrello, hora);
        } else { ///--------------------DEMAS NAVEGADORES--------------------
            //--------------------OBTENER IP--------------------
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
                    //--------------------VALORES DE LA DESCRIPCIÓN--------------------
                    let descripcion = document.getElementById("incidenciasDescripcion").value;
                    var inciEm = '';
                    var inciTel = '';
                    var inciMovil = '';
                    for (let i = 0; i < registroCC.length; i++) {
                        if(nombre.value == registroCC[i].CompleteName){
                            if (registroCC[i].Observations == undefined){
                                inciEm = 'Email: '+registroCC[i].Email;
                                inciTel = ' | Teléfono: '+registroCC[i].NumeroFijo;
                                inciMovil =' | Móvil: '+registroCC[i].NumeroMovil;
                            }else{
                            inciEm = 'Email: '+registroCC[i].EmailAddress;
                            inciTel = ' | Teléfono: '+registroCC[i].DirectPhoneNumber;
                            inciMovil =' | Móvil: '+registroCC[i].CompanyMobilePhoneNumber;
                            }
                        }
                        
                    }
                    var desc = descripcion + '%0A' + " Ip: " + myIP + " Sistema operativo: " + OSName+ '%0A' + inciEm + inciTel + inciMovil;
                    ///--------------------LLAMADA A CREAR CARTA--------------------
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
    //--------------------OBTENER SO--------------------

}
///--------------------CREAR CARTA--------------------
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
            var dt = this.responseText;
            h = JSON.parse(dt).id;
            spiner.style.cssText = 'display:block';
            //------------LLAMADA A FUNCIONES PARA RELLENAR LA CARTA -------------
            selecLabel(h);
            if (archivos.length > 0) {
                adjuntos(h, name);
            }
            usuarioPredefinido(h, name);
        }
    });
}
///--------------------MOSTRAR MENSAJE EN CASO DE QUE ESTÉ MARCADO EL CHECKBOX--------------------
var importante = document.getElementById('incidenciasCheck');
var dpImportante = document.getElementById('dpImportante');
importante.addEventListener('click', function () {
    if (importante.checked == true) {
        dpImportante.style.cssText = 'display:true';
    } else {
        dpImportante.style.cssText = 'display:none';
    }
}, false)
///--------------------CREAR LABEL IMPORTANTE--------------------
function selecLabel(data) {
    var datas = null;
    if (importante.checked == true) {
        var checkRQ = new XMLHttpRequest();
        checkRQ.open("POST", "https://api.trello.com/1/cards/" + data + "/idLabels?value=5aaf6396841642c2a8277156&key=" + appkey + "&token=" + token);
        checkRQ.send(datas);
    }
}
///--------------------CREAR Y ENVIAR LOS ARCHIVOS ADJUNTOS--------------------
function adjuntos(data, name) {
    var arrData = [];
    var formData = new FormData();
    formData.append("token", token);
    formData.append("key", appkey);
    for (let i = 0; i < archivos.length; i++) {
        formData.append("file", archivos[i]);
        var request = new XMLHttpRequest();
        request.open("POST", "https://api.trello.com/1/cards/" + data + "/attachments?key=" + appkey + "&token=" + token);
        request.send(formData);
        request.addEventListener("readystatechange", function () {

            if (this.readyState === this.DONE) {
                var finalizado = true;

                for (let i = 0; i < arrData.length; i++) {
                    if (arrData[i].readyState !== this.DONE) {
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
                        .then(function(value) {
                            swal(location.reload());
                        });
                }
            }
        });
    }
}
///--------------------ELIMINAR ADJUNTOS--------------------
function eliminar(e) {
    var eliminarPapelera = document.getElementById(e);
    eliminarPapelera.parentElement.remove();
    e = e.slice(9)
    archivos.splice(e, 1);

}

///--------------------CREAR LOS USUARIOS PREDEFINIDOS--------------------
function usuarioPredefinido(data, name) {
    var arrRQ = [];
    var datas = null;
    var usuRQ1 = new XMLHttpRequest();
    usuRQ1.open("POST", "https://api.trello.com/1/cards/" + data + "/idMembers?value=" + usuario1 + "&key=" + appkey + "&token=" + token);
    usuRQ1.send(datas);
    var usuRQ2 = new XMLHttpRequest();
    usuRQ2.open("POST", "https://api.trello.com/1/cards/" + data + "/idMembers?value=" + usuario2 + "&key=" + appkey + "&token=" + token);
    usuRQ2.send(datas);
    arrRQ.push(usuRQ1);

    usuRQ1.addEventListener("readystatechange", function () {
        if (this.readyState === this.DONE) {
            var finalizado = true;
            for (let i = 0; i < arrRQ.length; i++) {
                if (arrRQ[i].readyState !== this.DONE) {
                    finalizado = false;
                }
            }
            if (finalizado == true && archivos.length == 0) {
                // for (let d = 0; d < registroCC.length; d++) {
                //     if(registroCC[d].CompleteName == nombre.value){
                //         var email = registroCC[d].EmailAddress
                //     }
                // }
                // var infoParaEnviar = {
                //     text: 'Incidencia ' + name,
                //     correo: email
                // };
                // $.ajax({
                //     type: "POST",
                //     url: "php/correo.php",
                //     data: infoParaEnviar,
                //     dataType: "text",
                //     asycn: false,
                //     success: function () {
                        spiner.style.cssText = 'display:none';
                        swal({
                                title: "Completado!",
                                text: 'Incidencia ' + name,
                                icon: "success",
                                button: "Cerrar",
                            })
                            .then(function(value){
                                swal(location.reload());
                            });
                    // }
                // });


            }
        }
    });
}
///--------------------CREAR ARCHIVOS ADJUNTOS DE MANERA VISIBLE--------------------
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