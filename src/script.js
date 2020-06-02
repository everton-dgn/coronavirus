import './style.css';
import { } from './js/modules/lazyload.js';
import { } from './js/modules/sidebar.js';
import { } from './js/modules/links-internos.js';
import { } from './js/modules/dados-painel.js';
import { } from './js/modules/data.js';
import { } from './js/modules/mortes-paises.js';
import { } from './js/modules/abas-tabela.js';
import { } from './js/modules/tabela-cidade.js';
import { } from './js/modules/tabela-estado.js';
import { } from './js/modules/tabela-pais.js';
import { } from './js/modules/botao-topo.js';

// pwa //
navigator.serviceWorker && !location.href.includes('localhost') && navigator.serviceWorker.register('./sw.js');