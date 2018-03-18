function incidenciasLimpiar() {

    let nombre = document.getElementById("incidenciasNombre");
    let apellido = document.getElementById("incidenciasApellido");
    let titulo = document.getElementById("incidenciasTitulo");
    let descripcion = document.getElementById("incidenciasDescripcion");

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
    let nombre = document.getElementById("incidenciasNombre");
    let apellido = document.getElementById("incidenciasApellido");
    let titulo = document.getElementById("incidenciasTitulo");
    let descripcion = document.getElementById("incidenciasDescripcion");

    let res = true;

    if (nombre.value == "" || apellido.value == "" || titulo.value == "") {

        res = false;
    }

    return res;
}

function incidenciasCrear() {

    if (comprobarCampos()) {

        let nombre = document.getElementById("incidenciasNombre").value;
        let apellido = document.getElementById("incidenciasApellido").value;
        let titulo = document.getElementById("incidenciasTitulo").value;
        let descripcion = document.getElementById("incidenciasDescripcion").value;

        var appkey = "151bcd104f1742fdcf0b8c2f4a4c8764";
        var token = "ddc55434f6f11fbc1a3379adde4d5f66cd8be4be97d4d90eaca39322af045925";
        var idlist = "5aabcaa60e192d016bdaafdc";

        var hora = new Date().toLocaleString();
        var nombreApellido = nombre + " " + apellido;

        var desc = "Creado por: " + nombreApellido + " a las: " + hora + "\x0A" + descripcion;
        var url = "https://api.trello.com/1/cards?name=" + titulo + "&desc=" + desc + "&idList=" + idlist + "&keepFromSource=all&key=" + appkey + "&token=" + token;


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

}