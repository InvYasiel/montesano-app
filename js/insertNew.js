function soloEdit(e){
    var nNombre =document.getElementById('newNombre').value; 
    var nFijo =document.getElementById('newFijo').value; 
    var nExt =document.getElementById('newExtension').value; 
    var nExt2 =document.getElementById('newExtension2').value; 
    var nMovil =document.getElementById('newNumeroMovil').value; 
    var nExtMovil =document.getElementById('newExtensionMovil').value; 
    var nExtIP =document.getElementById('newExtensionIP').value; 
    var nEmail =document.getElementById('newEmail').value; 
    var nEmail2 =document.getElementById('newEmail2').value; 
    var nLugar =document.getElementById('newLugar').value; 
    var nCentro =document.getElementById('newCentro').value; 
    var editAdmin = document.getElementById('editAdmin');
    $('#ModalEditar').modal('show');
   
    editAdmin.addEventListener("click", function(){
        for (let i = 0; i < admin.length; i++) {
            if (admin[i].usuario == usuInfo && admin[i].password == passInfo) {
                document.getElementById('newNombre').value = registroCC[e].Name
                $('#ModalEditar').modal('hide');
                $('#ModalNew').modal('show');
                
            }
        }
    },false)
    

   var edit = document.getElementById(e);

}
function soloinfo(){
    var usuInfo = document.getElementById('usuInfo').value;
    var passInfo = document.getElementById('passInfo').value;
    var t = false;
    for (let i = 0; i < admin.length; i++) {
        if (admin[i].usuario == usuInfo && admin[i].password == passInfo) {
            $('#ModalInformatica').modal('hide');
            $('#ModalNew').modal('show');
            t= true;
        }
    }
    if(!t){
        swal({
            title: "Error!",
            text: "Usuario o contraseña incorrectos",
            icon: "error",
            button: "Volver a intentar ",
          });
    }
}
function insert(){
    var nNombre =document.getElementById('newNombre').value; 
    var nFijo =document.getElementById('newFijo').value; 
    var nExt =document.getElementById('newExtension').value; 
    var nExt2 =document.getElementById('newExtension2').value; 
    var nMovil =document.getElementById('newNumeroMovil').value; 
    var nExtMovil =document.getElementById('newExtensionMovil').value; 
    var nExtIP =document.getElementById('newExtensionIP').value; 
    var nEmail =document.getElementById('newEmail').value; 
    var nEmail2 =document.getElementById('newEmail2').value; 
    var nLugar =document.getElementById('newLugar').value; 
    var nCentro =document.getElementById('newCentro').value; 

    var infoParaEnviar = {
        nombre: nNombre,
        fijo: nFijo,
        extFijo: nExt,
        extFijo2: nExt2,
        movil: nMovil,
        extmovil: nExtMovil,
        extIP: nExtIP,
        email: nEmail,
        email2: nEmail2,
        lugar: nLugar,
        centro: nCentro

    };
    $.ajax({
        type: "POST",
        url: "php/newP.php",
        data: infoParaEnviar,
        dataType: "text",
        asycn: false,
        success: function () {
            swal({
                title: "Completado!",
                text: 'Incidencia ' + name,
                icon: "success",
                button: "Cerrar",
            })
            .then(function(value) {
                swal(location.reload());
            });
        }
    });
}