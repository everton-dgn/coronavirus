import { $ } from './help.js';

// controlar exibição automática da sidebar/menu retrátil:
if (window.matchMedia("(min-width:800px)").matches) clickFunction();

// exibir/ocultar barra de navegação sidebar/menu:
$("button.toggle-sidebar, span.toggle-sidebar").addEventListener('click', clickFunction);
$("span.toggle-sidebar").addEventListener('click', clickFunction);
export function clickFunction() {

    $("#sidebar").classList.toggle("collapsed");
    $("#content").classList.toggle("col-md-12");

}