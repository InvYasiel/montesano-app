
let nombreRRHH = document.getElementById("incidenciasNombreRRHH");
let incidenCheckRRHH = document.getElementById("incidenciasCheckRRHH");
let tituloRRHH = document.getElementById("incidenciasTituloRRHH");
let descripcionRRHH = document.getElementById("incidenciasDescripcionRRHH").value;
var tnameRRHH = true;
let chooserRRHH = document.getElementById('chooserRRHH');
let archivoRRHH = document.getElementById('archivoRRHH');
let grandeRRHH = document.getElementById('muyGrandeRRHH');
let tel = document.getElementsByName('incidenciasTelefono');
let em = document.getElementById('incidenciasEmail');
///KEYS para conectar con trello
var appkeyRRHH = "151bcd104f1742fdcf0b8c2f4a4c8764";
var secretRRHH = "c5a52ad53cef30fb0539bab09df6967178a40d187ef829ae9c93faf700ea6d16";

var tokenRRHH = "ddc55434f6f11fbc1a3379adde4d5f66cd8be4be97d4d90eaca39322af045925";
var idlistRRHH = "5afecefa968161adb800c49f";
var usuario1RRHH = "5aabca240fa2e0ee00d049ce";
var usuario2RRHH = "5374f51c6cbf7d6d1aab77a6";


///--------------------COMPROBAR CAMPOS OBLIGATORIOS--------------------
function comprobarCamposRRHH() {
    let res = true;
    if (nombreRRHH.value == "" || tituloRRHH.value == "" || tel.value == "" ||em.value == "") {
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
function getBrowserInfoRRHH() {
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
function incidenciasCrearRRHH() {
    for (let t = 0; t < registroCC.length; t++) {
        if (registroCC[t].CompleteName == nombreRRHH.value) {
            var tnameRRHH = false
        }
    }
    if (tnameRRHH == false) {
        var OSName = "Desconocido";
        if (navigator.appVersion.indexOf("Win") != -1) OSName = "Windows";
        if (navigator.appVersion.indexOf("Linux") != -1) OSName = "Linux";
        //--------------------OTENER FECHA ACTUAL--------------------
        var fecha = new Date();
        var fechaTrello = fecha.getFullYear() + ("0" + (fecha.getMonth() + 1)).slice(-2) + ("0" + fecha.getDate()).slice(-2);
        var hora = fecha.getHours() + ":" + fecha.getMinutes() + ":" + fecha.getSeconds();
       

        //--------------------EN CASO DE QUE SE USE INTERNET EXPLORER O EDJE--------------------
        var es_ie = navigator.userAgent.indexOf("MSIE") > -1;
        if (getBrowserInfoRRHH() == 'IE 11' || getBrowserInfoRRHH() == 'Edge 16') {
            let descripcionRRHH = document.getElementById("incidenciasDescripcionRRHH").value;
            var desc = descripcionRRHH + '%0A' + " Ip no disponible al usar Internet Explore. " + "Sistema operativo: " + OSName;
            crearCartaRRHH(desc, OSName, fechaTrello, hora);
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
                if (comprobarCamposRRHH()) {
                    if (ice && ice.candidate && ice.candidate.candidate) {
                        var myIP = /([0-9]{1,3}(\.[0-9]{1,3}){3}|[a-f0-9]{1,4}(:[a-f0-9]{1,4}){7})/.exec(ice.candidate.candidate)[1];

                        pc.onicecandidate = noop;
                    }
                    //--------------------VALORES DE LA DESCRIPCIÓN--------------------
                    let descripcionRRHH = document.getElementById("incidenciasDescripcionRRHH").value;
                    var desc = descripcionRRHH + '%0A' + " Ip: " + myIP + " Sistema operativo: " + OSName;
                    ///--------------------LLAMADA A CREAR CARTA--------------------
                    crearCartaRRHH(desc, myIP, OSName, fechaTrello, hora);
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
function crearCartaRRHH(desc, myIP, OSName, fechaTrello, hora) {
    var h = "";
    var data = null;
    var name = fechaTrello + ' ' + hora + ' ' + tituloRRHH.value + " Creado por: " + nombreRRHH.value +' Teléfono: '+tel.value+' Email: '+em.value;
    var xhr = new XMLHttpRequest();
    desc = desc.replace(/\n/g, '%0A');
    xhr.open("POST", "https://api.trello.com/1/cards?name=" + name + "&desc=" + desc + "&pos=top&idList=" + idlistRRHH + "&keepFromSource=all&key=" + appkeyRRHH + "&token=" + tokenRRHH);
    xhr.send(data);
    xhr.addEventListener("readystatechange", function () {
        if (this.readyState === this.DONE) {
            var dt = this.responseText;
            h = JSON.parse(dt).id;
            spiner.style.cssText = 'display:block';
            //------------LLAMADA A FUNCIONES PARA RELLENAR LA CARTA -------------
            selecLabelRRHH(h);
            if (archivosRRHH.length > 0) {
                adjuntosRRHH(h, name);
            }
            usuarioPredefinidoRRHH(h, name);
        }
    });
}
///--------------------MOSTRAR MENSAJE EN CASO DE QUE ESTÉ MARCADO EL CHECKBOX--------------------
var importanteRRHH = document.getElementById('incidenciasCheckRRHH');
var dpImportanteRRHH = document.getElementById('dpImportanteRRHH');
importanteRRHH.addEventListener('click', function () {
    if (importanteRRHH.checked == true) {
        dpImportanteRRHH.style.cssText = 'display:true';
    } else {
        dpImportanteRRHH.style.cssText = 'display:none';
    }
}, false)
///--------------------CREAR LABEL IMPORTANTERRHH--------------------
function selecLabelRRHH(data) {
    var datas = null;
    if (importanteRRHH.checked == true) {
        var checkRQ = new XMLHttpRequest();
        checkRQ.open("POST", "https://api.trello.com/1/cards/" + data + "/idLabels?value=5aaf6396841642c2a8277156&key=" + appkeyRRHH + "&token=" + tokenRRHH);
        checkRQ.send(datas);
    }
}
///--------------------CREAR Y ENVIAR LOS ARCHIVOSRRHH ADJUNTOSRRHH--------------------
function adjuntosRRHH(data, name) {
    var arrData = [];
    var formData = new FormData();
    formData.append("token", tokenRRHH);
    formData.append("key", appkeyRRHH);
    for (let i = 0; i < archivosRRHH.length; i++) {
        formData.append("file", archivosRRHH[i]);
        var request = new XMLHttpRequest();
        request.open("POST", "https://api.trello.com/1/cards/" + data + "/attachments?key=" + appkeyRRHH + "&token=" + tokenRRHH);
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
///--------------------ELIMINAR ADJUNTOSRRHH--------------------
function eliminar(e) {
    var eliminarPapelera = document.getElementById(e);
    eliminarPapelera.parentElement.remove();
    e = e.slice(9)
    archivosRRHH.splice(e, 1);

}

///--------------------CREAR LOS USUARIOS PREDEFINIDOS--------------------
function usuarioPredefinidoRRHH(data, name) {
    var arrRQ = [];
    var datas = null;
    var usuRQ1 = new XMLHttpRequest();
    usuRQ1.open("POST", "https://api.trello.com/1/cards/" + data + "/idMembers?value=" + usuario1RRHH + "&key=" + appkeyRRHH + "&token=" + tokenRRHH);
    usuRQ1.send(datas);
    var usuRQ2 = new XMLHttpRequest();
    usuRQ2.open("POST", "https://api.trello.com/1/cards/" + data + "/idMembers?value=" + usuario2RRHH + "&key=" + appkeyRRHH + "&token=" + tokenRRHH);
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
            if (finalizado == true && archivosRRHH.length == 0) {
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
///--------------------CREAR ARCHIVOSRRHH ADJUNTOSRRHH DE MANERA VISIBLE--------------------
var archivosRRHH = []
var rutasRRHH = []
var contRRHH = 0;

function cambioRRHH(e) {
    var chooserRRHH = document.getElementById("" + e)
    var fileSize = chooserRRHH.files[0].size;
    var siezekiloByte = parseInt(fileSize / 1024);
    if (siezekiloByte > chooserRRHH.getAttribute('size')) {
        swal({
            title: "Error!",
            text: "Imagen muy grande",
            icon: "error",
            button: "Volver a intentar",
        });
        return false;
    } else {

        chooserRRHH.files[0];

        var path = document.getElementById("" + e).files[0].name;
        rutasRRHH.push(path)
        var archivoCorrecto = true;
        if (archivosRRHH.length == 0) {
            archivosRRHH.push(chooserRRHH.files[0]);
            var info = document.getElementById('infofileRRHH');
            info.innerHTML += '<b> ' + path + '  <i class="fas fa-trash" id="papelera ' + contRRHH + '" style="color:red" onclick="eliminar(id)"></i><b>';
            contRRHH++;
        } else if (archivosRRHH.length > 0) {
            for (let i = 0; i < archivosRRHH.length; i++) {
                if (chooserRRHH.files[0].name == archivosRRHH[i].name) {
                    archivoCorrecto = false;
                }
            }
            if (archivoCorrecto == true) {
                archivosRRHH.push(chooserRRHH.files[0]);
                var info = document.getElementById('infofileRRHH');
                info.innerHTML += '<b> | ' + path + '  <i class="fas fa-trash" id="papelera ' + contRRHH + '" style="color:red" onclick="eliminar(id)"></i><b>';
                contRRHH++;
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
    document.getElementsByClassName('chooserRRHH')[0].value = '';
}