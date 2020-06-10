import '../css/scss/style.scss';
import './lazyload.js';
import './sidebar.js';
import './links-internos.js';
import './dados-painel.js';
import './data.js';
import './mortes-paises.js';
import './abas-tabela.js';
import './tabela-cidade.js';
import './tabela-estado.js';
import './tabela-pais.js';
import './botao-topo.js';

// CONFIGURAÇÕES PWA //
// sw.js //
navigator.serviceWorker && !location.href.includes('localhost') && navigator
    .serviceWorker.register('/sw.js');

// notificações //
let deferredPrompt;
const botaoApp = document.querySelector('#installApp');

window.addEventListener('beforeinstallprompt', (e) => {
    // Impedir que o mini-infobar apareça no celular
    // e.preventDefault();
    // Armazena o evento para que possa ser acionado mais tarde.
    deferredPrompt = e;
    // Atualizar a interface e notifica o usuário para instalar o PWA
    botaoApp.style.display = 'block';
});

botaoApp.addEventListener('click', (e) => {
    // Ocultar a opção de instalação fornecida pelo aplicativo
    botaoApp.remove();
    // Mostra o prompt de instalação
    deferredPrompt.prompt();
    // Aguarde o usuário responder ao prompt
    deferredPrompt.userChoice.then((choiceResult) => {
        if (choiceResult.outcome === 'accepted') {
            console.log('Você aceitou a instalação do App');
        } else {
            console.log(
                'Infelizmente você não aceitou a instalação do App, pressione "ctrl + F5" e tente novamente'
            );
        }
    });
});