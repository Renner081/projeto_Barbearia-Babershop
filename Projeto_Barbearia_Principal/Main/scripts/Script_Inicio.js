// Seleciona elementos
const slides = document.querySelectorAll('.slide');
const dotsContainer = document.querySelector('.dots');
const btnPrev = document.querySelector('.prev');
const btnNext = document.querySelector('.next');

let atual = 0;

// Criar bolinhas automaticamente
slides.forEach((_, i) => {
  const dot = document.createElement('span');
  dot.classList.add('dot');

  if (i === 0) dot.classList.add('ativo');

  dot.addEventListener('click', () => irPara(i));

  dotsContainer.appendChild(dot);
});

// Função principal
function irPara(index) {
  const dots = document.querySelectorAll('.dot');

  slides[atual].classList.remove('ativo');
  dots[atual].classList.remove('ativo');

  atual = (index + slides.length) % slides.length;

  slides[atual].classList.add('ativo');
  dots[atual].classList.add('ativo');
}

// Botões
btnNext.addEventListener('click', () => {
  irPara(atual + 1);
});

btnPrev.addEventListener('click', () => {
  irPara(atual - 1);
});