import { $ } from './help.js';
import { $$ } from './help.js';

// controlar exibição automática da sidebar/menu retrátil:
if (window.matchMedia("(min-width:800px)").matches) clickFunction();

if (window.matchMedia("(max-width:800px)").matches) {
    $$('#sidebar a').forEach(item => {
        item.addEventListener('click', clickFunction);
    });
}

// exibir/ocultar barra de navegação sidebar/menu:
$("button.toggle-sidebar, span.toggle-sidebar").addEventListener('click', clickFunction);
$("span.toggle-sidebar").addEventListener('click', clickFunction);
function clickFunction() {

    $("#sidebar").classList.toggle("collapsed");
    $("#content").classList.toggle("col-md-12");
    $('nav').classList.toggle('changeMenu');
    $('span.toggle-sidebar').classList.toggle('changeMenu');
    $('button.toggle-sidebar').classList.toggle('changeMenu');
}