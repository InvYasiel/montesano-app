$(document).ready(function () {
    if (location.hash) {
        $("a[href='" + location.hash + "']").tab("show");
    }
    $(document.body).on("click", "a[data-toggle]", function (event) {
        location.hash = this.getAttribute("href");
    });
});
$(window).on("popstate", function () {
    var anchor = location.hash || $("a[data-toggle='tab']").first().attr("href");
    $("a[href='" + anchor + "']").tab("show");
});

var salas = []
recogerSalas()
//---------------------------------Consulta a Salas.php--------------------------------  
function recogerSalas() {
    if (window.XMLHttpRequest) {
        xmlhttp = new XMLHttpRequest();
    } else {
        xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
    }
    xmlhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            var sala = JSON.parse(this.responseText);

            for (let i = 0; i < sala.length; i++) {
                salas.push(sala[i]);
            }

            crearBtns();
        }
    };
    xmlhttp.open("GET", "php/salas.php", true);

    xmlhttp.send();
}


//---------------------------------Eliminiar Reserva---------------------------------  
function eliminarReserva(e) {
    var fecha = new Date();
    var fechaUsu = fecha.getFullYear() + ("0" + (fecha.getMonth() + 1)).slice(-2) + ("0" + fecha.getDate()).slice(-2);
    var da = e.getAttribute('dd');
    var dd = document.getElementById(da);
    $('#calendarioModal').modal('hide');
    var denegar = document.getElementById('cerrarAdmin');
    var den = document.getElementById('cerrarAd');
    var rr = e.getAttribute('reserva');
    denegar.addEventListener('click', function () {
        rr = '';
        $('#ModalAdmin').modal('hide');

        $('#calendarioModal').modal('show');
    }, false)
    den.addEventListener('click', function () {
        rr = ''
        $('#ModalAdmin').modal('hide');
        $('#calendarioModal').modal('show');
    }, false)
    var idSala = document.getElementById('selectedSala').value;
    var aceptar = document.getElementById('borrarAdmin');
    aceptar.addEventListener('click', function () {
        var usu = document.getElementById('usu').value;
        var pass = document.getElementById('pass').value;
        for (let i = 0; i < admin.length; i++) {
            if (rr != '') {
                if (admin[i].usuario == usu && admin[i].password == pass || admin[i].usuario == usu && fechaUsu == pass) {
                    var infoParaEnviar = {
                        reserva: rr,
                        usuario: usu
                    };
                    $.ajax({
                        type: "POST",
                        url: "php/delete.php",
                        data: infoParaEnviar,
                        dataType: "text",
                        asycn: true,
                        success: function () {

                            recogerDatos(idSala);
                            $('#ModalAdmin').modal('hide');
                            $('#calendarioModal').modal('hide');
                            swal({
                                    title: "Reserva Eliminada",
                                    text: 'Reserva eliminada correctamente',
                                    icon: "success",
                                    button: "Cerrar",
                                })
                                .then(function (value) {
                                    swal(dd.click());
                                });
                        }
                    });
                } else {
                    swal({
                        title: "Error!",
                        text: "Usuario o contraseña incorrectos",
                        icon: "error",
                        button: "Volver a intentar ",
                    });

                }
            }

        }

    }, false)
}