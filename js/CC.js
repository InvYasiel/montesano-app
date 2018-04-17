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
            console.log(salas);
            crearBtns();
        }
    };
    xmlhttp.open("GET", "php/salas.php", true);
    console.log(xmlhttp)
    xmlhttp.send();
}



function eliminarReserva(e) {
    document.getElementById('calendarioModal').style = ' display:none;'
    var denegar = document.getElementById('cerrarAdmin');
    var den = document.getElementById('cerrarAd');
    var rr = e.getAttribute('reserva');
    denegar.addEventListener('click', function () {
        document.getElementById('calendarioModal').style = ' display:initial;'
    }, false)
    den.addEventListener('click', function () {
        document.getElementById('calendarioModal').style = ' display:initial;'
    }, false)
    var idSala = document.getElementById('selectedSala').value;
    var aceptar = document.getElementById('borrarAdmin');
    aceptar.addEventListener('click', function () {
        var usu = document.getElementById('usu').value;
        var pass = document.getElementById('pass').value;
        for (let i = 0; i < admin.length; i++) {
            if (admin[i].usuario == usu && admin[i].password == pass) {


                var infoParaEnviar = {
                    reserva: rr
                };
                $.ajax({
                    type: "POST",
                    url: "php/delete.php",
                    data: infoParaEnviar,
                    dataType: "text",
                    asycn: false,
                    success: function () {
                        
                    }
                });
                $('#ModalAdmin').modal('hide');
                $('#calendarioModal').modal('hide');
                $('#mensajeModal').modal();
              
                var titleC = document.getElementById('titleC');
                titleC.innerHTML = 'Reserva eliminada correctamente </br>';

               
                var close = document.getElementById('close');
                close.addEventListener('click',function () {
                    window.location.reload();
                })

            } else {
                alert('Usuario o contraseña incorrectos!')
            }

        }

    }, false)



}