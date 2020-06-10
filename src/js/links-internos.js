import { $, $$ } from './help.js';

// rolagem suave links internos:
const menuLinksInternos = $$('a[href^="#"]');

if (menuLinksInternos.length) {

    menuLinksInternos.forEach((item) => {
        item.addEventListener('click', menuTop);
    });

    function menuTop(e) {
        e.preventDefault();

        const id = this.getAttribute('href');
        const alturaMenu = $('nav').scrollHeight;
        const topo = $('nav').offsetTop;
        const distanciaTopo = $(id).offsetTop - alturaMenu - topo;

        scrollSuave($('html').scrollTop, distanciaTopo, 0);
    }

    function scrollSuave(old, des, atu) { // Função que faz o scroll suave
        const easing = function (t) {
            return (--t) * t * t + 1
        };
        atu += .7; // move de 2 em 2 pixel. Aumentando o valor, irá aumentar a velocidade
        let ease = easing(atu / 100);
        let del = des - old;
        del *= ease;
        del += old;
        $('html').scrollTo(0, del);
        if (atu < 100) {
            window.requestAnimationFrame(function () {
                scrollSuave(old, des, atu);
            });
        }
    }

}