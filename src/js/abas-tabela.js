import { $ } from './help.js';

// exibir tabelas por abas:
$('[data-aba-cidade]').addEventListener('click', () => openCity(event, 'abaCidade'));
$('[data-aba-estado]').addEventListener('click', () => openCity(event, 'abaEstado'));
$('[data-aba-pais]').addEventListener('click', () => openCity(event, 'abaPais'));
function openCity(evt, menuName) {
    var i, tabcontent, tablinks;
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
    }
    document.getElementById(menuName).style.display = "block";
    evt.currentTarget.className += " active";
}