import { $ } from './help.js';

// exibe dados do covid-19 do Brasil e do mundo no topo do site em 5 paineis //
async function dadosPainel() {
    let resposta = await fetch('https://corona-stats.online/brazil?format=json');
    let data = await resposta.json();
    
        // Brasil:        
        $('[data-confirmed]').innerHTML = data.data[0].confirmed;
        $('[data-hoje]').innerHTML = data.data[0].todayDeaths;
        $('[data-novos]').innerHTML = data.data[0].todayCases;
        $('[data-deaths]').innerHTML = data.data[0].deaths;
        $('[data-mortalidade]').innerHTML = parseFloat((data.data[0].deaths * 100 / data.data[0].confirmed).toFixed(1));

        // Mundo:
        $('[data-mundo-confirmed]').innerHTML = data.worldStats.confirmed;
        $('[data-mundo-hoje]').innerHTML = data.worldStats.todayDeaths;
        $('[data-mundo-novos]').innerHTML = data.worldStats.todayCases;
        $('[data-mundo-deaths]').innerHTML = data.worldStats.deaths;
        $('[data-mundo-mortalidade]').innerHTML = parseFloat((data.worldStats.deaths * 100 / data.worldStats.confirmed).toFixed(1));
}
dadosPainel();