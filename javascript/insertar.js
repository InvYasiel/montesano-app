var departamento = document.getElementById('departamento');
var sociedad = document.getElementById('sociedad');
var cadenaNumerica = '0000000';
var acFijo = document.getElementById('acFijo');
var anio = document.getElementById('anio');
var cantidad = document.getElementById('cant');
var f = new Date();
var fechaActual = f.getDate() + "/" + (f.getMonth() + 1) + "/" + f.getFullYear();
var cont = 0;
var datos = []
function comprobar(){
    if(acFijo.value == '' || anio.value == '' || departamento.value == ''|| sociedad.value == ''|| cantidad.value == "" || parseInt(cantidad.value) < 1 || parseInt(anio.value) < 2000 || parseInt(anio.value) > 2030 ) {
        swal({
            title: "Error!",
            text: 'Rellene correctamente los campos correctamente',
            icon: "error",
            button: "Intentar de nuevo",
        })
    }else{
        generar();
    }
}
function generar() {
    for (let i = 0; i < cantidad.value; i++) {
        numeroCodeBar = parseInt(numeroCodeBar) + 1;
        var resultado = cadenaNumerica + numeroCodeBar;
        resultado = resultado.toString().substring(resultado.length - cadenaNumerica.length);

        var codeBar = departamento.value + sociedad.value + acFijo.value + anio.value.substring(2, 4) + resultado;
        var subcodigo = departamento.value + '-' + sociedad.value + '-' + acFijo.value + '-' + anio.value.substring(2, 4) + '-' + resultado;
        var infoParaEnviar = {
            departamento: departamento.value,
            sociedad: sociedad.value,
            acFijo: acFijo.value,
            anio: anio.value,
            fechaActual: fechaActual,
            codeBar: codeBar,
            subcodigo: subcodigo
        };
        datos.push(infoParaEnviar)
    }
    enviar();
}
var crear = document.getElementById('crear');
var n = 0
function enviar(){
    n++
    $.ajax({
        type: "POST",
        url: "php/insertar.php",
        data: datos[n-1],
        dataType: "text",
        async:true,
        complete: function (sam) {
            var datos = JSON.parse(sam.responseText);
            if(cantidad.value != n){
                crear.setAttribute('onclick','enviar()');
               document.getElementById('crear').click()
            }else{
                if(datos != "0" ){
                    swal({
                        title: "Etiquetas Enviadas ",
                        text: 'Las estiquetas ya están disponibles en la base de datos',
                        icon: "success",
                        button: "Cerrar",
                    }).then(function (value) {
                        location.reload();
                    }); 
                }else{
                    swal({
                        title: "Error en la base de datos ",
                        text: 'Contacte con Yasiel Hernández',
                        icon: "error",
                        button: "Aceptar",
                    }).then(function (value) {
                        location.reload();
                    }); 
                }
            }
        }
    });
}
