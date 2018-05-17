$('.clockpicker').clockpicker()
    .find('input').change(function () {
        console.log(this.value);
    });
var input = $('#horaEntrada').clockpicker({
    placement: 'bottom',
    align: 'left',
    autoclose: true,
    'default': 'now'
});
$('.clockpicker-with-callbacks').clockpicker({
        donetext: 'Done',
        init: function () {
            console.log("colorpicker initiated");
        },
        beforeShow: function () {
            console.log("before show");
        },
        afterShow: function () {
            console.log("after show");
        },
        beforeHide: function () {
            console.log("before hide");
        },
        afterHide: function () {
            console.log("after hide");
        },
        beforeHourSelect: function () {
            console.log("before hour selected");
        },
        afterHourSelect: function () {
            console.log("after hour selected");
        },
        beforeDone: function () {
            console.log("before done");
        },
        afterDone: function () {
            console.log("after done");
        }
    })
    .find('input').change(function () {
        console.log(this.value);
    });
// Manually toggle to the minutes view
$('#check-minutes').click(function (e) {
    // Have to stop propagation here
    e.stopPropagation();
    input.clockpicker('show')
        .clockpicker('toggleView', 'minutes');
});
if (/mobile/i.test(navigator.userAgent)) {
    $('input').prop('readOnly', true);
}


$('.clockpicker').clockpicker()
    .find('input').change(function () {
        console.log(this.value);
    });
var input = $('#horaSalida').clockpicker({
    placement: 'bottom',
    align: 'left',
    autoclose: true,
    'default': 'now'
});
$('.clockpicker-with-callbacks').clockpicker({
        donetext: 'Done',
        init: function () {
            console.log("colorpicker initiated");
        },
        beforeShow: function () {
            console.log("before show");
        },
        afterShow: function () {
            console.log("after show");
        },
        beforeHide: function () {
            console.log("before hide");
        },
        afterHide: function () {
            console.log("after hide");
        },
        beforeHourSelect: function () {
            console.log("before hour selected");
        },
        afterHourSelect: function () {
            console.log("after hour selected");
        },
        beforeDone: function () {
            console.log("before done");
        },
        afterDone: function () {
            console.log("after done");
        }
    })
    .find('input').change(function () {
        console.log(this.value);
    });
// Manually toggle to the minutes view
$('#check-minutes').click(function (e) {
    // Have to stop propagation here
    e.stopPropagation();
    input.clockpicker('show')
        .clockpicker('toggleView', 'minutes');
});
if (/mobile/i.test(navigator.userAgent)) {
    $('input').prop('readOnly', true);
}
var entrada = document.getElementById('horaEntrada').value
var salida = document.getElementById('horaSalida').value

function calcHora(e) {
    var x = document.getElementById(e).value
    x = x.substring(3, 5)
    var r = parseInt(x) % 15;
    if (r < 08) {
        var nMin = x - r
        var t = document.getElementById(e).value
        t = t.substring(0, 2);
        
        if (nMin == '0') {
            nMin = '00';
        }
        var nn = t + ':' + nMin;
        t++
        var nsalida = parseInt(t)
        if (nsalida==9) {
            nsalida ='09'
        }
        document.getElementById(e).value = nn;
        if (e != 'horaSalida') {

            document.getElementById('horaSalida').value = nsalida + ':' + nMin;
        } else {
            if (document.getElementById('horaSalida').value < document.getElementById('horaEntrada').value) {
                nsalida++
                document.getElementById('horaSalida').value = nsalida + ':' + nMin;
                swal({
                    title: "Error!",
                    text: "La fecha de salida no puede ser menor a la de entrada",
                    icon: "error",
                    button: "Volver a intentar ",
                });

            }
        }
    } else {
        x = parseInt(x);
        var nMin = x + (15 - r)
        var t = document.getElementById(e).value
        t = t.substring(0, 2);

        if (nMin == 60) {
            nMin = 45;
        }
        var nn = t + ':' + nMin
        t++
        var nsalida = parseInt(t)
        document.getElementById(e).value = nn;
        if (e != 'horaSalida') {
            document.getElementById('horaSalida').value = nsalida + ':' + nMin;
        } else {
            if (document.getElementById('horaSalida').value < document.getElementById('horaEntrada').value) {
                nsalida++
                document.getElementById('horaSalida').value = nsalida + ':' + nMin;
                swal({
                    title: "Error!",
                    text: "La fecha de salida no puede ser menor a la de entrada",
                    icon: "error",
                    button: "Volver a intentar ",
                });

            }
        }
    }
}

function camhora(e) {
    var t = parseInt(e.substring(0, 2));
    var h=t.toString()
    if(h.length ==1){
        h ='0'+h
    }
    document.getElementById('horaEntrada').value = h + ':00';
   var n = 'horaEntrada';
    calcHora(n)
    
    // document.getElementById('horaSalida').value =
}