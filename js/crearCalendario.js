var texto = "";
//--------------------------------- ACTIVAR TOOLTIP --------------------------------- 
$(document).ready(function () {
    $('.days').tooltip();
});
//--------------------------------- CREAR CALENDARIO --------------------------------- 
function calendar(e) {
    var n = parseInt(e);
    var month = document.getElementById('month').value - 1;
    var year = document.getElementById('year').value;
    if (isNaN(n)) {} else if (n == 1) {
        month++
        document.getElementById('month').value++
            if (month > 11) {
                document.getElementById('year').value++;
                document.getElementById('month').value = 1
            }
    } else {
        month--
        document.getElementById('month').value--
            if (month == -1) {
                document.getElementById('year').value--;
                document.getElementById('month').value = 12
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
    var dayweek = document.getElementsByClassName('dayweek');
    for (var i = 0; i < daysOfWeek.length; i++)
        dayweek[i].innerHTML = daysOfWeek[i];
    document.getElementsByClassName('month')[0].innerText = monthName + ' de ' + askedDate.getFullYear();
    var divDays = document.getElementsByClassName('days');
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
                divDays[i].setAttribute('onclick', 'abrirmodal(this.id)');
                j++;
            } else {
                divDays[i].innerHTML = '<o>' + dd + '</o>';
                var db = String(dd)
                divDays[i].setAttribute('class', 'days posteriores');
                divDays[i].setAttribute('id', '' + dd + ' ' + (month + 2));
                if (db.length == 1) {
                    divDays[i].setAttribute('id', '0' + dd + ' ' + (month + 2));
                }
                divDays[i].setAttribute('onclick', 'abrirmodal(this.id)');
                dd++;
            }
        else {
            divDays[i].innerHTML = '<o>' + da + '</o>';
            var de = String(da)
            divDays[i].setAttribute('class', 'days anteriores');
            divDays[i].setAttribute('id', '' + da + ' ' + month);
            if (de.length == 1) {
                divDays[i].setAttribute('id', '0' + da + ' ' + month)
            }
            divDays[i].setAttribute('onclick', 'abrirmodal(this.id)');
            da++;
        }
    }

    //---------------------------------INSERTAR TEXTO TOOLTIP ---------------------------------
    var diasClick = document.getElementsByClassName('days');
    for (let i = 0; i < diasClick.length; i++) {
        texto = "";
        for (let j = 0; j < registro.length; j++) {
            if (registro[j].entrada.substring(10, 8) == diasClick[i].id.substring(2, 0) && String(parseInt(registro[j].entrada.substring(5, 7))) == diasClick[i].id.substring(3)) {
                texto += ' (Nombre) ' + registro[j].entrada.substring(11, 16) + ' || ' + registro[j].salida.substring(11, 16) + '</br>';
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
//---------------------------------FECHA ORIGINAL---------------------------------
function currDate(e) {
    var currDate = new Date();
    document.getElementById('month').value = currDate.getMonth() + 1;

    document.getElementById('year').value = currDate.getFullYear();
    calendar();
}