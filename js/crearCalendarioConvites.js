var texto = "";
//--------------------------------- ACTIVAR TOOLTIP --------------------------------- 
$(document).ready(function () {
    $('.day').tooltip();
});
var insertado = false;
//--------------------------------- CREAR CALENDARIO --------------------------------- 
function calendarConvites(e) {
    var n = parseInt(e);
    var month = document.getElementById('mes').value - 1;
    var year = document.getElementById('anio').value;
    if (isNaN(n)) {} else if (n == 1) {
        month++
        document.getElementById('mes').value++
            if (month > 11) {
                document.getElementById('anio').value++;
                document.getElementById('mes').value = 1
            }
    } else {
        month--
        document.getElementById('mes').value--
            if (month == -1) {
                document.getElementById('anio').value--;
                document.getElementById('mes').value = 12
            }
    }

    var formatter = new Intl.DateTimeFormat("sp", {
            month: "long"
        }),
        monthName = formatter.format(new Date(year, month, 1))
    var askedDate = new Date(year, month, 1);
    if (month == 0) {
        prevMonth = 12;
        var prevDate = new Date(year - 1, 12, 0);
    } else {
        var pm = month;
        var prevDate = new Date(year, pm - 1, 0);
    }
    var daysOfWeek = ['L', 'M', 'X', 'J', 'V', 'S', 'D']
    var numDaysOfWeek = {
        "Mon": 1,
        "Tue": 2,
        "Wed": 3,
        "Thu": 4,
        "Fri": 5,
        "Sat": 6,
        "Sun": 7
    };

    var daysInMonth = new Date(year, month + 1, 0).getDate();
    var fdw = askedDate.toDateString().substr(0, 3);
    var FirstdayOfWeek = numDaysOfWeek[fdw];
    var difference = prevDate.getDate() - FirstdayOfWeek + 1;
    var dayweek = document.getElementsByClassName('diaSemana');
    for (var i = 0; i < daysOfWeek.length; i++)
        dayweek[i].innerHTML = daysOfWeek[i];
    document.getElementsByClassName('mes')[0].innerText = monthName + ' de ' + askedDate.getFullYear();
    var divDays = document.getElementsByClassName('day');
    var days;
    for (var i = 0, j = 1, dd = 1, da = difference; i < divDays.length; i++) {
        if (i >= FirstdayOfWeek - 1)
            if (j <= daysInMonth) {
                divDays[i].innerHTML = j;
                var dc = String(j)
                divDays[i].setAttribute('id', '' + j + ' ' + (month + 1));
                if (dc.length == 1) {
                    divDays[i].setAttribute('id', '0' + j + ' ' + (month + 1))
                }
                divDays[i].setAttribute('onclick', 'abrirmodalConvites(this.id)');
                j++;
            } else {
                divDays[i].innerHTML = '<o>' + dd + '</o>';
                var db = String(dd)
                divDays[i].setAttribute('class', 'day siguientes');
                divDays[i].setAttribute('id', '' + dd + ' ' + (month + 2));
                if (db.length == 1) {
                    divDays[i].setAttribute('id', '0' + dd + ' ' + (month + 2));
                }
                divDays[i].setAttribute('onclick', 'abrirmodalConvites(this.id)');
                dd++;
            }
        else {
            divDays[i].innerHTML = '<o>' + da + '</o>';
            var de = String(da)
            divDays[i].setAttribute('class', 'day pasados');
            divDays[i].setAttribute('id', '' + da + ' ' + month);
            if (de.length == 1) {
                divDays[i].setAttribute('id', '0' + da + ' ' + month)
            }
            divDays[i].setAttribute('onclick', 'abrirmodalConvites(this.id)');
            da++;
        }
    }

    //---------------------------------INSERTAR TEXTO TOOLTIP ---------------------------------
    if (insertado == false) {
        var diasClick = document.getElementsByClassName('day');
        for (let i = 0; i < diasClick.length; i++) {
            texto = "";
            for (let j = 0; j < registroConvites.length; j++) {
                if (registroConvites[j].entrada.substring(10, 8) == diasClick[i].id.substring(2, 0) && String(parseInt(registroConvites[j].entrada.substring(5, 7))) == diasClick[i].id.substring(3)) {
                    texto += ' (Nombre) ' + registroConvites[j].entrada.substring(11, 16) + ' || ' + registroConvites[j].salida.substring(11, 16) + '</br>';
                    insertado = true;
                }
            }
            diasClick[i].setAttribute('data-original-title', texto);
            var m = diasClick[i].getAttribute('data-original-title');
            //--------------------------------- INSERTAR COLOR AL CUADRADO DEL CALENDARIO---------------------------------
            if (m.length > 0) {
                diasClick[i].style = 'background-color: rgba(199, 31, 31, 0.411)';
            } else {
                diasClick[i].style = 'background-color: none ;';
            }
        }
    }

}
//---------------------------------FECHA ORIGINAL---------------------------------
function currDateConvites(e) {
    var currDate = new Date();
    document.getElementById('mes').value = currDate.getMonth() + 1;

    document.getElementById('anio').value = currDate.getFullYear();
    calendarConvites();
}