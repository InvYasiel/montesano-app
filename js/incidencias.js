
//Variables donde recogemos los elementos del formulario
let nombre = document.getElementById("incidenciasNombre");
let incidenCheck = document.getElementById("incidenCheck");
let titulo = document.getElementById("incidenciasTitulo");
let descripcion = document.getElementById("incidenciasDescripcion").value;
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


///Función para limpiar los campos del formulario
function incidenciasLimpiar() {
    ///framework de notificaciones 
    $.toast({
        heading: 'Information',
        text: 'Campos vaciados correctamente.',
        showHideTransition: 'fade',
        icon: 'info',
        position: 'top-right'
    })
    location.reload();
}

///fuunción para comprobar que los campos no estén sin rellenar
function comprobarCampos() {
    let res = true;
    if (nombre.value == "" || titulo.value == "") {

        res = false;
    }

    return res;
}
function SO(){
    
}
///--------------------CREAR INCIDENDIA--------------------
function incidenciasCrear() {
    ///--------------------OBTENER SO--------------------
    var OSName = "Desconocido";
    if (navigator.appVersion.indexOf("Win") != -1) OSName = "Windows";
    if (navigator.appVersion.indexOf("Linux") != -1) OSName = "Linux";
    ///--------------------OTENER FECHA ACTUAL--------------------
    var fecha = new Date();
    var fechaTrello = fecha.getFullYear() + ("0" + (fecha.getMonth() + 1)).slice(-2) + ("0" + fecha.getDate()).slice(-2);

    ///--------------------OBTENER IP--------------------
    window.RTCPeerConnection = window.RTCPeerConnection || window.mozRTCPeerConnection || window.webkitRTCPeerConnection;//compatibility for Firefox and chrome
    var pc = new RTCPeerConnection({ iceServers: [] }), noop = function () { };
    pc.createDataChannel('');//create a bogus data channel
    pc.createOffer(pc.setLocalDescription.bind(pc), noop);// create offer and set local description
    pc.onicecandidate = function (ice) {
        if (comprobarCampos()) {
            if (ice && ice.candidate && ice.candidate.candidate) {
                var myIP = /([0-9]{1,3}(\.[0-9]{1,3}){3}|[a-f0-9]{1,4}(:[a-f0-9]{1,4}){7})/.exec(ice.candidate.candidate)[1];
                console.log('my IP: ', myIP);
                pc.onicecandidate = noop;
            }
            ///--------------------VALORES DE LA DESCRIPCIÓN--------------------
            let descripcion = document.getElementById("incidenciasDescripcion").value;
            var desc = descripcion + " \x0A " + " \x0A " + " Ip: " + myIP + " Sistema operativo: " + OSName;

            ///--------------------CREAR CARTA Y LOGUEARTE--------------------
            var authenticationSuccess = function () {
                // window.location.replace("/auth?token="+token);
                console.log('Successful authentication');
                var creationSuccess = function (data) {
                    selecLabel(data);
                    usuarioPredefinido(data);
                    adjuntos(data);

                };

                var newCard = {
                    name: fechaTrello + ' ' + titulo.value + " Creado por: " + nombre.value,
                    desc: descripcion + " \x0A " + " \x0A " + " Ip: " + myIP + " Sistema operativo: " + OSName,
                    idList: '5aaf6422caeb39da694e7dc1',
                    pos: 'top'
                };
                Trello.post("cards", newCard, creationSuccess, );
            };


            var authenticationFailure = function () { alert('error en la conexión') };

            Trello.authorize({
                type: 'POST',
                name: titulo.value,
                scope: {
                    read: true,
                    write: true
                },
                interactive:true,
                expiration: 'never',
                success: authenticationSuccess,
                error: authenticationFailure
            });
        }
    }

}
var importante = document.getElementById('incidenciasCheck');
var dpImportante = document.getElementById('dpImportante');
importante.addEventListener('click', function () {
    if (importante.checked == true) {
        dpImportante.style = 'display:true';
    } else {
        dpImportante.style = 'display:none';
    }
}, false)

///--------------------CREAR LABEL IMPORTANTE--------------------
function selecLabel(data) {

    var datas = null;

    if (importante.checked == true) {
        var checkRQ = new XMLHttpRequest();
        checkRQ.open("POST", "https://api.trello.com/1/cards/" + data.id + "/idLabels?value=5aaf6396841642c2a8277156&key=" + appkey + "&token=" + token);
        checkRQ.send(datas);
    }
}
///--------------------CREAR ADJUNTOS--------------------
function adjuntos(data) {
    var formData = new FormData();
    formData.append("token", token);
    formData.append("key", appkey);
    var t = 1;
    var ch = document.querySelectorAll(".chooser");
    var arrData = []
    for (let i = 0; i < ch.length - t; i++) {
        if (document.getElementById('chooser' + i) == null) {
            t--;
        } else {
            formData.append("file", document.getElementById('chooser' + i).files[0]);
            var request = new XMLHttpRequest();
            request.open("POST", "https://api.trello.com/1/cards/" + data.id + "/attachments");
            request.send(formData);
            arrData.push(request);
            spiner.style = 'display:block;';
            request.addEventListener("readystatechange", function () {
                if (this.readyState === this.DONE) {
                    var finalizado = true;

                    for (let i = 0; i < arrData.length; i++) {
                        if (arrData[i].readyState !== this.DONE) {
                            finalizado = false;
                        }
                    }
                    if (finalizado == true) {
                        spiner.style = 'display:none';
                        $("#mensajeModal").modal();
                        var close = document.getElementById('close');
                        close.addEventListener('click', function () {
                            location.reload();
                        }, false)

                    }
                }
            });
        }
    }

}
///--------------------ELIMINAR ADJUNTOS--------------------
function eliminar(e) {
    var eliminarPapelera = document.getElementById(e);
    eliminarPapelera.parentElement.remove();

    e = e.slice(9)
    var eliminado = document.getElementById('chooser' + e);

    eliminado.remove(eliminado);
}
function usuarioPredefinido(data) {
    ///--------------------USUARIOS ASOCIADOS--------------------
    var arrRQ = [];
    var datas = null;
    var usuRQ1 = new XMLHttpRequest();
    usuRQ1.open("POST", "https://api.trello.com/1/cards/" + data.id + "/idMembers?value=" + usuario1 + "&key=" + appkey + "&token=" + token);
    usuRQ1.send(datas);
    var usuRQ2 = new XMLHttpRequest();
    usuRQ2.open("POST", "https://api.trello.com/1/cards/" + data.id + "/idMembers?value=" + usuario2 + "&key=" + appkey + "&token=" + token);
    usuRQ2.send(datas);
    arrRQ.push(usuRQ1);
    spiner.style = 'display:block;';
    usuRQ1.addEventListener("readystatechange", function () {
        if (this.readyState === this.DONE) {
            var finalizado = true;
            for (let i = 0; i < arrRQ.length; i++) {
                if (arrRQ[i].readyState !== this.DONE) {
                    finalizado = false;
                }
            }
            if (finalizado == true) {
                spiner.style = 'display:none';
                $("#mensajeModal").modal();
                var close = document.getElementById('close');
                close.addEventListener('click', function () {
                    location.reload();
                }, false)
            }
        }
    });
}


var cont = 0;
function cambio(e) {

    var fileSize = $('#' + e)[0].files[0].size;
    var siezekiloByte = parseInt(fileSize / 1024);
    if (siezekiloByte > $('#' + e).attr('size')) {
        alert("Imagen muy grande");
        return false;
    } {
        cont++;

        var n = document.querySelectorAll(".chooser");

        var info = document.getElementById('infofile');

        for (let i = 0; i < n.length; i++) {
            if (n[i].style.display == "none") {

            } else {
                n[i].style = 'display:none';
                info.innerHTML += '<b> | ' + n[i].value + '  <i class="fas fa-trash" id="papelera ' + i + '" style="color:red" onclick="eliminar(id)"></i><b>';
            }
        }

        var inp = document.createElement('input');
        inp.setAttribute('type', 'file');
        inp.setAttribute('id', 'chooser' + cont);
        inp.setAttribute('class', 'chooser');
        inp.style = 'color: transparent';
        inp.setAttribute('onchange', 'cambio(this.id)')
        inp.setAttribute('size', '10000')

        archivo.appendChild(inp);
    }
}