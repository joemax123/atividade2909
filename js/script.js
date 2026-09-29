const audio = document.getElementById('meuaudio');
const btnPlayPause = document.getElementById('btnPlayPause');
const barra = document.getElementById('barraprogresso');
const voltar = document.getElementById('voltar');
const proximo = document.getElementById('proximo');
const tempoAtual = document.getElementById('tempoAtual');
const tempoTotal = document.getElementById('tempoTotal');
const nomeMusica = document.getElementById('nomeMusica');


function musica(nome, src) {
    audio.src = src;
    nomeMusica.textContent = nome;

    audio.play().then(() => {
        atualizarBotao(true);
    }).catch(error => {
        console.log("O navegador barrou o autoplay, clique no Play manual.");
    });
}


btnPlayPause.addEventListener('click', () => {
    if (!audio.src) return; 

    if (audio.paused) {
        audio.play();
        atualizarBotao(true);
    } else {
        audio.pause();
        atualizarBotao(false);
    }
});


function formatarTempo(segundos) {
    if (isNaN(segundos)) return "0:00";
    const min = Math.floor(segundos / 60);
    const seg = Math.floor(segundos % 60);
    return `${min}:${seg < 10 ? '0' : ''}${seg}`;
}


audio.addEventListener('loadedmetadata', () => {
    barra.max = audio.duration;
    tempoTotal.textContent = formatarTempo(audio.duration);
});

audio.addEventListener('timeupdate', () => {
    if (!barra.dataset.clicking) {
        barra.value = audio.currentTime;
    }
    tempoAtual.textContent = formatarTempo(audio.currentTime);
});


barra.addEventListener('input', () => {
    barra.dataset.clicking = 'true';
    audio.currentTime = barra.value;
    tempoAtual.textContent = formatarTempo(barra.value);
});

barra.addEventListener('change', () => {
    barra.dataset.clicking = '';
});

function atualizarBotao(estaTocando) {
    if (estaTocando) {
        btnPlayPause.textContent = 'Pause';
        btnPlayPause.style.backgroundColor = '#ef4444';
    } else {
        btnPlayPause.textContent = 'Play';
        btnPlayPause.style.backgroundColor = '#10b981';
    }
}


audio.addEventListener('ended', () => {
    atualizarBotao(false);
    barra.value = 0;
});