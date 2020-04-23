import { $ } from './help.js';
import { animaNumeros } from './anima-numeros.js';

// // esconde spinners do load // 
setTimeout(spinnerLoad, 2500);
function spinnerLoad() {
    $('[data-fundo-spinner]').style.display = "none";
    animaNumeros();
}