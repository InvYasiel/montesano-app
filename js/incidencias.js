
    let nombre = document.getElementById("incidenciasNombre");
    let apellido = document.getElementById("incidenciasApellido");
    let titulo = document.getElementById("incidenciasTitulo");
    let descripcion = document.getElementById("incidenciasDescripcion").value;

function incidenciasLimpiar() {


    nombre.value = "";
    apellido.value = "";
    titulo.value = "";
    descripcion.value = "";

    $.toast({
        heading: 'Information',
        text: 'Campos vaciados correctamente.',
        showHideTransition: 'fade',
        icon: 'info',
        position: 'top-right'
    })
}

function comprobarCampos() {


    let res = true;

    if (nombre.value == "" || apellido.value == "" || titulo.value == "") {

        res = false;
    }

    return res;
}

function incidenciasCrear() {


    window.RTCPeerConnection = window.RTCPeerConnection || window.mozRTCPeerConnection || window.webkitRTCPeerConnection;//compatibility for Firefox and chrome
    var pc = new RTCPeerConnection({ iceServers: [] }), noop = function () { };
    pc.createDataChannel('');//create a bogus data channel
    pc.createOffer(pc.setLocalDescription.bind(pc), noop);// create offer and set local description
    pc.onicecandidate = function (ice) {
        if (comprobarCampos()) {

            var appkey = "151bcd104f1742fdcf0b8c2f4a4c8764";
            var token = "ddc55434f6f11fbc1a3379adde4d5f66cd8be4be97d4d90eaca39322af045925";
            var idlist = "5aaf6422caeb39da694e7dc1";
     
            let descripcion = document.getElementById("incidenciasDescripcion").value;
            var hora = new Date().toLocaleString();
            var nombreApellido = nombre.value + " " + apellido.value;
            if (ice && ice.candidate && ice.candidate.candidate) {
                var myIP = /([0-9]{1,3}(\.[0-9]{1,3}){3}|[a-f0-9]{1,4}(:[a-f0-9]{1,4}){7})/.exec(ice.candidate.candidate)[1];
                console.log('my IP: ', myIP);
                pc.onicecandidate = noop;
            }
            var desc = "Creado por: " + nombreApellido + " a las: " + hora + " \x0A " + " con la ip: " + myIP + " " + descripcion;
           
            var url = "https://api.trello.com/1/cards?name=" + titulo.value + "&desc=" + desc + "&idList=" + idlist + "&keepFromSource=all&key=" + appkey + "&token=" + token;
            url = url.replace(/(?:\r\n|\r|\n)/g, ' '+ ' <br> ');


            $.ajax({
                url: url,
                error: function (e) {
                    console.log(e);
                },
                success: function (data) {
                    console.log(data);
                },
                type: 'POST'
            });

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
        }
    };

}
