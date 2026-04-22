document.addEventListener('DOMContentLoaded', () => {
    
    const botoes = document.querySelectorAll('.menu-item');
    const secoes = document.querySelectorAll('.content-section');

    // 🔥 limpa qualquer active bugado
    secoes.forEach(s => s.classList.remove('active'));
    botoes.forEach(b => b.classList.remove('active'));

    // define inicial
    document.getElementById("Perfil").classList.add("active");
    document.querySelector('[data-target="Perfil"]').classList.add("active");

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