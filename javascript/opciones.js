var Ardepart = [];
depart();

function depart() {
    
    if (window.XMLHttpRequest) {
        xmlhttp = new XMLHttpRequest();
    } else {
        xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
    }
    xmlhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            var datos = JSON.parse(this.responseText);
            for (let i = 0; i < datos.length; i++) {
                Ardepart.push(datos[i]);
            }
            actFijo();
        }
    };
    xmlhttp.open("GET", "php/departamentos.php", true);
    xmlhttp.send();
};

var AractFijo = [];


function actFijo() {
    
    if (window.XMLHttpRequest) {
        xmlhttp = new XMLHttpRequest();
    } else {
        xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
    }
    xmlhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            var datos = JSON.parse(this.responseText);
            for (let i = 0; i < datos.length; i++) {
                AractFijo.push(datos[i]);
            }
            socie();
        }
    };
    xmlhttp.open("GET", "php/tipoaf.php", true);
    xmlhttp.send();
};

var ArSocie = [];

function socie() {
   
    if (window.XMLHttpRequest) {
        xmlhttp = new XMLHttpRequest();
    } else {
        xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
    }
    xmlhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            var datos = JSON.parse(this.responseText);
            for (let i = 0; i < datos.length; i++) {
                ArSocie.push(datos[i]);
            }
            rellenarOP()
        }
    };
    xmlhttp.open("GET", "php/sociedades.php", true);
    xmlhttp.send();
};


function rellenarOP() {
    var departamento = document.getElementById('departamento');
    for (let i = 0; i < Ardepart.length; i++) {
        var option = document.createElement("option");
        option.text = Ardepart[i].NOMBRE;
        option.setAttribute('value',Ardepart[i].LETRA)
        departamento.add(option);
    }

    var sociedad = document.getElementById('sociedad');
    for (let i = 0; i < ArSocie.length; i++) {
        var option = document.createElement("option");
        option.text = ArSocie[i].NOMBRE;
        option.setAttribute('value',ArSocie[i].VALOR)
        sociedad.add(option);
    }

    var acFijo = document.getElementById('acFijo');
    for (let i = 0; i < AractFijo.length; i++) {
        var option = document.createElement("option");
        option.text = AractFijo[i].NOMBRE;
        option.setAttribute('value',AractFijo[i].LETRA)
        acFijo.add(option);
    }


}