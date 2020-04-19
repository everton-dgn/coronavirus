import { $, $$ } from './help.js';

// esconde spinners do load após 2s // 
export const spinnerLoad = setInterval(function () {
    clearInterval(spinnerLoad);
    $('[data-fundo-spinner]').style.display = "none";
    animaNumeros();
}, 1900);

// animação contagem de números no painel //
export function animaNumeros() {
    const numeros = $$('[data-contagem]');
    numeros.forEach((item) => {
        const total = +item.innerText;

        const incremento = Math.floor(total / 100);

        let start = 0;
        if (total > 100) {
            const timer = setInterval(() => {

                start = start + incremento;
                item.innerText = start.toLocaleString('pt-BR');

                if (start > total) {
                    item.innerText = total.toLocaleString('pt-BR');
                    clearInterval(timer);
                }
            }, 100 * Math.random());
        } else {
            const timer = setInterval(() => {

                item.innerText = (start++).toLocaleString('pt-BR');

                if (start > total) {
                    item.innerText = total.toLocaleString('pt-BR');
                    clearInterval(timer);
                }
            }, 200);
        }
    });
}



