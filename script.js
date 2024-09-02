const mario = document.querySelector('.mario');
const pipe = document.querySelector('.pipe');

const start = document.querySelector('.start');
const gameOver = document.querySelector('.game-over');
const restartButton = document.querySelector('.restart-button'); // Seleciona o botão de reiniciar

const audioStart = new Audio('./src/audio/MARIO_audio_theme.mp3');
const audioGameOver = new Audio('./src/audio/MARIO_audio_gameover.mp3');

const startGame = () => {
    pipe.classList.add('pipe-animation');
    start.style.display = 'none';

    // Inicia a música do jogo
    audioStart.play();

    loop(); // Inicia o loop do jogo
};

const restartGame = () => {
    gameOver.style.display = 'none';
    pipe.style.left = '';
    pipe.style.right = '0';
    mario.src = './src/img/mario.gif';
    mario.style.width = '150px';
    mario.style.bottom = '0';

    start.style.display = 'none';

    // Reinicia o contador de pulos
    jumpCount = 0;
    document.querySelector('.jump-counter').innerText = `Pulos: ${jumpCount}`;

    // Reinicia os áudios
    audioGameOver.pause();
    audioGameOver.currentTime = 0;

    audioStart.play();
    audioStart.currentTime = 0;

    loop(); // Reinicia o loop do jogo
};

const jump = () => {
    mario.classList.add('jump');

    setTimeout(() => {
        mario.classList.remove('jump');
    }, 800);

    // Incrementa o contador de pulos e atualiza a exibição
    jumpCount++;
    document.querySelector('.jump-counter').innerText = `Pulos: ${jumpCount}`;
};

const loop = () => {
    const gameLoop = setInterval(() => {
        const pipePosition = pipe.offsetLeft;
        const marioPosition = +window.getComputedStyle(mario).bottom.replace('px', '');

        if (pipePosition <= 120 && pipePosition > 0 && marioPosition < 80) {
            pipe.classList.remove('pipe-animation');
            pipe.style.left = `${pipePosition}px`;

            mario.classList.remove('jump');
            mario.style.bottom = `${marioPosition}px`;

            mario.src = './src/img/game-over.png';
            mario.style.width = '80px';
            mario.style.marginLeft = '50px';

            audioStart.pause(); // Para a música de início
            audioGameOver.play(); // Toca o som de game over

            gameOver.style.display = 'flex';

            clearInterval(gameLoop); // Para o loop do jogo
        }
    }, 10);
};

// Eventos de teclado e toque
document.addEventListener('keypress', e => {
    if (e.key === 'Enter') {
        startGame();
    } else if (e.key === ' ') {
        jump();
    }
});

document.addEventListener('touchstart', () => {
    jump();
});

// Adiciona o evento ao botão de reiniciar
if (restartButton) {
    restartButton.addEventListener('click', restartGame);
}
