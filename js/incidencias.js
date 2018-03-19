
//Variables donde recogemos los elementos del formulario
let nombre = document.getElementById("incidenciasNombre");
let apellido = document.getElementById("incidenciasApellido");
let titulo = document.getElementById("incidenciasTitulo");
let descripcion = document.getElementById("incidenciasDescripcion").value;
//Fecha actual
var fecha = new Date();
var s = fecha.getFullYear() + ("0" + (fecha.getMonth() + 1)).slice(-2) + ("0" + fecha.getDate()).slice(-2);
console.log(s);

// function agragarimagen(){
//     function handleFileSelect(evt) {
//         var files = evt.target.files; // FileList object

//         // Loop through the FileList and render image files as thumbnails.
//         for (var i = 0, f; f = files[i]; i++) {

//           // Only process image files.
//           if (!f.type.match('image.*')) {
//             continue;
//           }

//           var reader = new FileReader();

//           // Closure to capture the file information.
//           reader.onload = (function(theFile) {
//             return function(e) {
//               // Render thumbnail.
//               var span = document.createElement('span');
//               span.innerHTML = ['<img class="thumb" src="', e.target.result,'" title="', escape(theFile.name), '"/>'].join('');
//               document.getElementById('list').insertBefore(span, null);
//             };
//           })(f);

//           // Read in the image file as a data URL.
//           reader.readAsDataURL(f);
//         }
//       }

//       document.getElementById('files').addEventListener('change', handleFileSelect, false);
// }
// agragarimagen();

///Función para limpiar los campos del formulario
function incidenciasLimpiar() {


    nombre.value = "";
    apellido.value = "";
    titulo.value = "";
    descripcion.value = "";
    ///framework de notificaciones 
    $.toast({
        heading: 'Information',
        text: 'Campos vaciados correctamente.',
        showHideTransition: 'fade',
        icon: 'info',
        position: 'top-right'
    })
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

            ///KEYS para conectar con trello
            var appkey = "151bcd104f1742fdcf0b8c2f4a4c8764";
            var token = "ddc55434f6f11fbc1a3379adde4d5f66cd8be4be97d4d90eaca39322af045925";
            var idlist = "5aaf6422caeb39da694e7dc1";

            ///Conectando con trello
            var authenticationSuccess = function () { console.log('Successful authentication'); };
            var authenticationFailure = function () { console.log('Failed authentication'); };

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


            var myList = 'my list';
            var creationSuccess = function (data) {
                console.log('Card created successfully. Data returned:' +
                    JSON.stringify(data));
            };
            var newCard = {
                name: s + ' ' + titulo.value + " Creado por: " + nombreApellido,
                desc: descripcion + " \x0A " + " \x0A " + " Ip: " + myIP + " Sistema operativo: " + OSName,
                attachments: url = s,
                idList: '5aaf6422caeb39da694e7dc1',
                pos: 'top'
            };
            Trello.post("cards", newCard, creationSuccess);

            ///framework para tarjetas de notificaciones
            $.toast({
                heading: 'Exito',
                text: 'Incidencia creada correctamente.',
                showHideTransition: 'fade',
                icon: 'success',
                position: 'top-right'
            })
        } else {
            $.toast({
                heading: 'Error',
                text: 'Hay que rellenar todos los campos.',
                showHideTransition: 'fade',
                icon: 'error',
                position: 'top-right'
            })

        };

    }
}


