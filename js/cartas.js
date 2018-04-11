var registroCC = [];
if (window.XMLHttpRequest) {
    // code for IE7+, Firefox, Chrome, Opera, Safari
    xmlhttp = new XMLHttpRequest();
} else {
    // code for IE6, IE5
    xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
}
xmlhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
        var fechas = JSON.parse(this.responseText);
        console.log(fechas);
        for (let i = 0; i < fechas.length; i++) {
            registroCC.push(fechas[i]);
        }


    }
};
xmlhttp.open("GET", "php/cartas.php", true);
console.log(xmlhttp)
xmlhttp.send();

var contAgenda = document.getElementById('contagenda');
var buscador = document.getElementById('buscador')

function generarCartas() {
    contAgenda.innerHTML = '';
    for (let i = 0; i < 400; i++) {
        carta(i);

    }
}

function search() {
    contAgenda.innerHTML = '';
    var palabra = buscador.value.toUpperCase();
    var selIndex = document.getElementById("empresas").selectedIndex;
    var selValue = document.getElementById("empresas").options[selIndex].innerHTML;
    if(palabra == ""){
        generarCartas();
        
    }else{
        for (let i = 0; i < registroCC.length; i++) {
            if (registroCC[i].CompleteName.indexOf(palabra)>=0) {
                carta(i);
            }else if(palabra == (registroCC[i].Name +' '+ registroCC[i].SecondName1) ){
                if(selValue == registroCC[i].CompanyName){
                    carta(i);
                }else if(selValue=='TODAS'){
                    carta(i);
                }
                
            }else if(palabra == (registroCC[i].Name +' '+ registroCC[i].SecondName2)){
                if(selValue == registroCC[i].CompanyName){
                    carta(i);
                }else if(selValue=='TODAS'){
                    carta(i);
                }
            }else if(palabra == (registroCC[i].SecondName1 +' '+ registroCC[i].Name)){
                if(selValue == registroCC[i].CompanyName){
                    carta(i);
                }else if(selValue=='TODAS'){
                    carta(i);
                }
            }else if(palabra == (registroCC[i].Name +' '+ registroCC[i].SecondName1 +' '+registroCC[i].SecondName2)){
                if(selValue == registroCC[i].CompanyName){
                    carta(i);
                }else if(selValue=='TODAS'){
                    carta(i);
                }
            }
            else if(palabra == (registroCC[i].SecondName1 +' '+ registroCC[i].SecondName2 +' '+registroCC[i].Name)){
                if(selValue == registroCC[i].CompanyName){
                    carta(i);
                }else if(selValue=='TODAS'){
                    carta(i);
                }
            }
        }
    }
    
}

function carta(i) {
    var card = document.createElement('div');
    card.setAttribute('class', 'card text-white bg-info mb-3 carta');
    card.setAttribute('style', 'max-width: 23rem; margin:15px;');
    card.setAttribute('id', 'carta' + i);

    var header = document.createElement('div');
    header.setAttribute('class', 'card-header');
    var cardBody = document.createElement('div');
    cardBody.setAttribute('class', 'card-body');
    cardBody.setAttribute('id', 'contenidoCarta');

    var titulo = document.createElement('h5');
    titulo.setAttribute('class', 'card-title');
    // companyCode.innerHTML = 'companyCode'+ registroCC[i].companyCode;

    var texto = document.createElement('div');


    header.innerHTML = '<b>Persona</b>'
    titulo.innerHTML = '<b>' + registroCC[i].Name +' '+registroCC[i].SecondName1+' '+registroCC[i].SecondName2+ '</b>'
    texto.innerHTML = '<b> Código Completo </b> ' + registroCC[i].CompanyCode + registroCC[i].EmployeeCode.substring(2) + '</br>' + '<b> Móvil de la compañía </b>' + registroCC[i].CompanyMobilePhoneNumber + '<br>' +
        '<b> Nombre de la Compañía </b>' + registroCC[i].CompanyName + '<br>' + '<b> Nombre Completo </b>' + registroCC[i].CompleteName.replace(",", "") + '<br>' +
        '<b>Número:  </b>' + registroCC[i].DirectPhoneNumber + '</br>' + '<b> ID del empleado </b>' + registroCC[i].EmployeeID + '</br>' +
        '<b> Extensión </b>' + registroCC[i].Extension + '</br>' + '<b> Número de Fax </b>' + registroCC[i].FaxNumber + '</br>' + '<b> Observaciones </b>' + registroCC[i].Observations +  '</br>' +
        '<b> WorkplaceName </b>' + registroCC[i].WorkplaceName;


    cardBody.appendChild(titulo);
    cardBody.appendChild(texto);

    card.appendChild(header);
    card.appendChild(cardBody);
    contAgenda.appendChild(card);
}

function selEmpresa() {
    contAgenda.innerHTML = '';

    var selIndex = document.getElementById("empresas").selectedIndex;
    var selValue = document.getElementById("empresas").options[selIndex].innerHTML;
    
    getDom(selValue);

}

function getDom(valSelect) {
    var html = '';
    empresa = valSelect;
    if (valSelect === 'TODAS') {
        generarCartas();
    } else {
        for (var i = 0; i < registroCC.length; i++) {
            if (registroCC[i].CompanyName === empresa) {
                carta(i);
            }
        }
    }
}

function limpiar(){
    contAgenda.innerHTML = '';
}