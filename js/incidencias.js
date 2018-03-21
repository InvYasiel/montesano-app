
//Variables donde recogemos los elementos del formulario
let nombre = document.getElementById("incidenciasNombre");
let apellido = document.getElementById("incidenciasApellido");
let titulo = document.getElementById("incidenciasTitulo");
let descripcion = document.getElementById("incidenciasDescripcion").value;

///KEYS para conectar con trello
var appkey = "151bcd104f1742fdcf0b8c2f4a4c8764";
var secret = "c5a52ad53cef30fb0539bab09df6967178a40d187ef829ae9c93faf700ea6d16";

var token = "ddc55434f6f11fbc1a3379adde4d5f66cd8be4be97d4d90eaca39322af045925";
var idlist = "5aaf6422caeb39da694e7dc1";

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
    if (nombre.value == "" || apellido.value == "" || titulo.value == "") {

        res = false;
    }

    return res;
}

/// función para crear la incidencia
function incidenciasCrear() {
    /// sitema operativo del cliente 
    var OSName = "Desconocido";
    if (navigator.appVersion.indexOf("Win") != -1) OSName = "Windows";
    if (navigator.appVersion.indexOf("Linux") != -1) OSName = "Linux";
    //Fecha actual
    var fecha = new Date();
    var fechaTrello = fecha.getFullYear() + ("0" + (fecha.getMonth() + 1)).slice(-2) + ("0" + fecha.getDate()).slice(-2);

    /// averiguamos la ip 
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

            ///recogemos el valor de la descripción 
            let descripcion = document.getElementById("incidenciasDescripcion").value;
            var nombreApellido = nombre.value + " " + apellido.value;
            var desc = descripcion + " \x0A " + " \x0A " + " Ip: " + myIP + " Sistema operativo: " + OSName;
            ///Conectando con trello

            var authenticationSuccess = function () {
                console.log('Successful authentication');
                var creationSuccess = function (data) {
                    var formData = new FormData();

                    formData.append("token", token);
                    formData.append("key", appkey);
                    var t = 1;
                    // HTML file input, chosen by user
                    
                    var ch = document.querySelectorAll(".chooser");
                    var request = new XMLHttpRequest();
                    console.log('primero '+ request.readyState);
                        for (let i = 0; i < ch.length - t; i++) {
                            if (document.getElementById('chooser' + i) == null) {
                                t--;
                            } else {
                                formData.append("file", document.getElementById('chooser' + i).files[0]);
                                
                                request.open("POST", "https://api.trello.com/1/cards/" + data.id + "/attachments");
                                request.send(formData);               
                               
                            }
                
                        }
                        console.log('segundo '+request.readyState);
                        if(request.readyState == 1){
                            location.reload();
                        }else{
                            location.reload();
                        }
                };
                var newCard = {
                    name: fechaTrello + ' ' + titulo.value + " Creado por: " + nombreApellido,
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
                expiration: 'never',
                success: authenticationSuccess,
                error: authenticationFailure
            });



        }
    }

}

var chooser = document.getElementById('chooser');
var archivo = document.getElementById('archivo');
var cont = 0;
function cambio() {
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

    inp.setAttribute('onchange', 'cambio()')

    archivo.appendChild(inp);

}


function eliminar(e) {
    var eliminarPapelera = document.getElementById(e);
    eliminarPapelera.parentElement.remove();

    e = e.slice(9)
    var eliminado = document.getElementById('chooser' + e);

    eliminado.remove(eliminado);
}
