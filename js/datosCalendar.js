var texto = "";
//--------------------------------- CREAR CALENDARIO --------------------------------- 
function datosCalendar(e) {
    var days = document.querySelectorAll(".day");
    // days.forEach(function(element){
    //     element.style = 'background-color: none;';
    //     element.setAttribute('data-original-title', '')
    // });
    for (let i = 0; i < days.length; i++) {
        days[i].style.cssText = 'background-color: none;';
        days[i].setAttribute('data-original-title', '');
    }
    var insertado = false;
    var n;
    if (e == "+1" || e == "-1") {
        n = parseInt(e);
    } else {
        n = parseInt("1");
    }

    var month = document.getElementById('mes').value;
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
                divDays[i].setAttribute('onclick', 'abrirmodal(this.id)');
                j++;
            } else {
                divDays[i].innerHTML = '<o>' + dd + '</o>';
                var db = String(dd)
                divDays[i].setAttribute('class', 'day siguientes');
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
            divDays[i].setAttribute('class', 'day pasados');
            divDays[i].setAttribute('id', '' + da + ' ' + month);
            if (de.length == 1) {
                divDays[i].setAttribute('id', '0' + da + ' ' + month)
            }
            divDays[i].setAttribute('onclick', 'abrirmodal(this.id)');
            da++;
        }
    }
    //---------------------------------INSERTAR TEXTO TOOLTIP ---------------------------------
    if (insertado == false) {
        var diasClick = document.getElementsByClassName('day');
        // for (let i = 0; i < diasClick.length; i++) {
        texto = "";
        if (e == "+1" || e == "-1") {
            e = document.getElementById("selectedSala").value;
        }
        var auxdia = "";
        var auxanio = "";
        for (let j = 0; j < registro.length; j++) {
            if (registro[j].sala == e) {
                var diasplit = registro[j].entrada.substring(10, 8);
                if (auxdia != diasplit) {
                    texto = "";
                }
                var messplit = registro[j].entrada.substring(5, 7);
                var anioN = registro[j].entrada.substring(0, 4);
                var newDiasSplit = parseInt(diasplit, 10);
                var newMesSplit = parseInt(messplit, 10);
                var diaLi = diasplit + ' ' + newMesSplit;
                var coderight = registro[j].Usuario.substring(4, 8)
                var codeleft = registro[j].Usuario.substring(0, 4);
                var employeecode = "00" + coderight;
                var employeeName = "";
                registroCC.forEach(function(e) {
                    if (e.EmployeeCode == undefined) {

                    } else if (e.EmployeeCode == employeecode && e.CompanyCode == codeleft) {
                        employeeName = e.Name;
                    }
                });
                texto += '' + employeeName + ' <br>' + registro[j].entrada.substring(11, 16) + ' - ' + registro[j].salida.substring(11, 16) + '</br>';
                insertado = true;
                try {
                    if (anioN != document.getElementById('anio').value) {
                        texto = '';
                    }
                    document.getElementById(diaLi).setAttribute('data-original-title', texto);
                    var t = document.getElementsByClassName('day');

                    //--------------------------------- INSERTAR COLOR AL CUADRADO DEL CALENDARIO---------------------------------

                    if (anioN != document.getElementById('anio').value) {
                        document.getElementById(diaLi).style.cssText = 'background-color: none;';
                        document.getElementById(diaLi).setAttribute('data-original-title', '');
                    } else {
                        // diaLi.setAttribute('style','background-color: rgba(199, 31, 31, 0.411)')
                        document.getElementById(diaLi).style.cssText = 'background-color: rgba(199, 31, 31, 0.411)';

                    }
                } catch (error) {}
                auxdia = registro[j].entrada.substring(10, 8);
                auxanio = registro[j].entrada.substring(0, 4);
            }

        }
    }
}
//---------------------------------FECHA ORIGINAL---------------------------------
function currDate(e) {
    var currDate = new Date();
    document.getElementById('mes').value = currDate.getMonth() - 1;

    document.getElementById('anio').value = currDate.getFullYear();
    datosCalendar(e);
}
String.prototype.capitalize = function () {
    return this.charAt(0).toUpperCase() + this.slice(1);
}