var emailsRRHH= []
var emailsInfo= []
eminfo()
function eminfo() {
    if (window.XMLHttpRequest) {
        xmlhttp = new XMLHttpRequest();
    } else {
        xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
    }
    xmlhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            var email = JSON.parse(this.responseText);
            
            for (let i = 0; i < email.length; i++) {
               
                emailsInfo.push(email[i]);
            }
            
            
        }
    };
    xmlhttp.open("GET", "php/emails.php", true);
   
    xmlhttp.send();
}
emiRRHH()
function emiRRHH() {
    if (window.XMLHttpRequest) {
        xmlhttp = new XMLHttpRequest();
    } else {
        xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
    }
    xmlhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            var email = JSON.parse(this.responseText);
            
            for (let i = 0; i < email.length; i++) {
                emailsRRHH.push(email[i]);
               
            }
            
            
        }
    };
    xmlhttp.open("GET", "php/emailsRRHH.php", true);
   
    xmlhttp.send();
}