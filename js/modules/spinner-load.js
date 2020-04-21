import { $ } from './help.js';
import { animaNumeros } from './anima-numeros.js';

// // esconde spinners do load após 2s // 
setTimeout(spinnerLoad, 1900);
export function spinnerLoad() {
    $('[data-fundo-spinner]').style.display = "none";
    animaNumeros();
}