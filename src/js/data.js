import { $ } from './help.js';

// mostra data atual:
const agora = new Date();
const dia = agora.getDate();
const mes = agora.getUTCMonth() + 1;
const ano = agora.getUTCFullYear();
const hoje = dia.toString().padStart(2, '0') + '/' + mes.toString().padStart(2, '0') + '/' + ano;

$('[data-date]').innerHTML = hoje;