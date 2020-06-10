import { $ } from './help.js';

// voltar ao topo:
function botaoTopo() {
    window.onscroll = function () {
        if (window.scrollY > 400) {
            $('[data-topo]').classList.add('mostrar');
        } else {
            $('[data-topo]').classList.remove('mostrar');
        }
    };
}
botaoTopo();