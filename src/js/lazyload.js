import { $$ } from './help.js';

// lazyload   
const container = $$('[data-left], [data-bottom]');
const windowMetade = window.innerHeight * 0.6;
function lazyload() {
    container.forEach((item) => {
        const sectionTop = item.getBoundingClientRect().top;
        const sectionVisivel = (sectionTop - windowMetade) < 0;

        if (sectionVisivel)
            item.classList.add('animar');
        else if (item.classList.contains('animar'))
            item.classList.remove('animar');
    });
}
lazyload();
window.addEventListener('scroll', lazyload);
