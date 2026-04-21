// Aguarda o HTML carregar totalmente, não remover nada do java script.
document.addEventListener('DOMContentLoaded', () => {
    

    const botoes = document.querySelectorAll('.menu-item');
    const secoes = document.querySelectorAll('.content-section');


    botoes.forEach(botao => {
        botao.addEventListener('click', () => {
            

            const alvoId = botao.getAttribute('data-target');


            botoes.forEach(b => b.classList.remove('active'));
            secoes.forEach(s => s.classList.remove('active'));


            botao.classList.add('active');

            const secaoAlvo = document.getElementById(alvoId);
            if (secaoAlvo) {
                secaoAlvo.classList.add('active');
            }
        });
    });
});