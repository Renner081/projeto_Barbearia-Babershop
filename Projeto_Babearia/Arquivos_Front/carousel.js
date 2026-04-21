// 1. Pega os elementos do HTML
const track = document.getElementById('track');         // container dos slides
const slides = track.querySelectorAll('.slide');        // todas as imagens
const dotsContainer = document.getElementById('dots'); // container das bolinhas
const btnPrev = document.getElementById('prev');       // botão seta esquerda
const btnNext = document.getElementById('next');       // botão seta direita

// 2. Guarda qual slide está sendo exibido (começa no 0 = primeiro)
let atual = 0;

// 3. Cria as bolinhas automaticamente para cada slide
slides.forEach((_, i) => {
  // Cria um elemento <span> para cada imagem
  const dot = document.createElement('span');
  
  // Adiciona a classe 'dot' para o CSS estilizar
  dot.classList.add('dot');
  
  // A primeira bolinha começa como ativa
  if (i === 0) dot.classList.add('ativo');
  
  // Ao clicar numa bolinha, vai direto para aquele slide
  dot.addEventListener('click', () => irPara(i));
  
  // Adiciona a bolinha no container
  dotsContainer.appendChild(dot);
});

// 4. Função principal que troca o slide
function irPara(index) {
  // Remove a classe 'ativo' do slide atual (some a imagem)
  slides[atual].classList.remove('ativo');
  
  // Remove a classe 'ativo' da bolinha atual
  dotsContainer.children[atual].classList.remove('ativo');

  // Atualiza o índice — o % faz o carrossel ser cíclico
  // Ex: se estiver no último e clicar próximo, volta para o 0
  atual = (index + slides.length) % slides.length;

  // Adiciona 'ativo' no novo slide (aparece a imagem)
  slides[atual].classList.add('ativo');
  
  // Adiciona 'ativo' na nova bolinha
  dotsContainer.children[atual].classList.add('ativo');
}

// 5. Botão de voltar — chama irPara com o índice anterior
btnPrev.addEventListener('click', () => irPara(atual - 1));

// 6. Botão de avançar — chama irPara com o índice seguinte
btnNext.addEventListener('click', () => irPara(atual + 1));