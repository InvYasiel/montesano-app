var calendarioJuntas = document.getElementById('Juntas');
var calendarioConvites = document.getElementById('Convites')
var tituloSala = document.getElementById('tituloSala')
ocultarCalendario();
function ocultarCalendario() {
    calendarioJuntas.style='display:none;'
    calendarioConvites.style='display:none;'
}
function convites(){
    calendarioConvites.style='display:block;'
    calendarioJuntas.style='display:none;'
    tituloSala.innerHTML = 'Sala de Convites'
    

}
function juntas(){
    calendarioJuntas.style='display:block;';
    calendarioConvites.style='display:none;';
    tituloSala.innerHTML = 'Sala de Juntas';
    
}