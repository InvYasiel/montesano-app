var ref = [];
var numeroCodeBar = 0
datos();

function datos() {
    if (window.XMLHttpRequest) {
        xmlhttp = new XMLHttpRequest();
    } else {
        xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
    }
    xmlhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            var datos = JSON.parse(this.responseText);
            for (let i = 0; i < datos.length; i++) {
                ref.push(datos[i]);
            }
            if (ref.length == 0) {
                v = {
                    ACTIVOFIJO: 0
                }
                ref.push(v)
            } else {
                var ultimo = ref[ref.length - 1];
                /* Número requerido */

                var numero = parseInt(ultimo.ACTIVOFIJO);
                /* Los ceros los almacenamos como cadena, no como número */
                var cadenaNumerica = '0000000';
                /* Esto concatenará cadenas, convirtiendo "numero" en una */
                var resultado = cadenaNumerica + numero;
                /* Nos quedamos con la parte final (con la misma longitud que los 0 iniciales) */
                resultado = resultado.substring(resultado.length - cadenaNumerica.length)
                /* Mostramos el resultado */
                numeroCodeBar = resultado;
            }

        }
    };
    xmlhttp.open("GET", "php/select.php", true);
    xmlhttp.send();
};