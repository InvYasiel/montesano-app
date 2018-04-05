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
        var Personal = JSON.stringify(this.responseText);
        console.log(Personal);
        
            registroCC.push(Personal);
            
        
        console.log(registroCC);
    }
};
xmlhttp.open("GET", "php/cartas.php", true);
console.log(xmlhttp)
xmlhttp.send();
