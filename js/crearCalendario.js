function calendar() {
    var month = document.getElementById('month').value - 1;
    var year = document.getElementById('year').value;
    var formatter = new Intl.DateTimeFormat("sp", { month: "long" }),
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
    var numDaysOfWeek = { "Mon": 1, "Tue": 2, "Wed": 3, "Thu": 4, "Fri": 5, "Sat": 6, "Sun": 7 };

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
                j++;
            } else {
                divDays[i].innerHTML = '<o>' + dd + '</o>';
                dd++;
            }
        else {
            divDays[i].innerHTML = '<o>' + da + '</o>';
            da++;
        }
    }
    var diasClick = document.getElementsByClassName('days');
for (let i = 0; i < diasClick.length; i++) {
    diasClick[i].setAttribute('onclick', 'abrirmodal(this.id)');
    diasClick[i].setAttribute('id', ''+diasClick[i].textContent);
    
}
}

function currDate(params) {
    var currDate = new Date();
    document.getElementById('month').value = currDate.getMonth() + 1;
    document.getElementById('year').value = currDate.getFullYear();
    calendar();
}