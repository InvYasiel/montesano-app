var admin= []
recogerUsu()
function recogerUsu() {
    if (window.XMLHttpRequest) {
        xmlhttp = new XMLHttpRequest();
    } else {
        xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
    }
    xmlhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            var sala = JSON.parse(this.responseText);
            
            for (let i = 0; i < sala.length; i++) {
                admin.push(sala[i]);
            }
            
            
        }
    };
    xmlhttp.open("GET", "php/admin.php", true);
   
    xmlhttp.send();
}