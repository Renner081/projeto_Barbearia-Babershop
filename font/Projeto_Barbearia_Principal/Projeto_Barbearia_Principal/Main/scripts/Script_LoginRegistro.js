function switchTab(tab) {
  const login    = document.getElementById('form-login');
  const register = document.getElementById('form-register');
  const btnLogin = document.getElementById('tabEntrar');
  const btnCad   = document.getElementById('tabCadastro');

  if (tab === 'login') {
    login.classList.add('active');
    register.classList.remove('active');
    btnLogin.classList.add('active');
    btnCad.classList.remove('active');
  } else {
    register.classList.add('active');
    login.classList.remove('active');
    btnCad.classList.add('active');
    btnLogin.classList.remove('active');
  }
}

function toggleOlho(inputId, imgId) {
  const input   = document.getElementById(inputId);
  const img     = document.getElementById(imgId);
  const visivel = input.type === 'text';

  input.type = visivel ? 'password' : 'text';

  img.src = visivel
    ? 'icons/visible.png'
    : 'icons/hidden.png';
}


//redirecionamento do login e registro sem o backend, pessoal do backend pode alterar se precisar.
function fazerlogin() {
  const email = document.querySelector('#form-login input[type="email"]').value.trim();
  const nome  = email ? email.split('@')[0] : 'usuário';

  document.querySelector('#overlaylogin .popup-sub').textContent =
    'Olá, ' + nome + '! Entrando na sua conta, Aguarde...';

  const fc = document.getElementById('flipcard');
  fc.style.animation = 'none';
  fc.offsetHeight;
  fc.style.animation = '';

  abrirPopup('overlaylogin');


  setTimeout(() => {
    window.location.href = 'exemplo:Tela Usuario/index.html'; //link pagina, colar aqui quando usuario fizer login redirecionar para tela usuario ou inicial
  }, 2000);
}


function fazercadastro() {
  abrirPopup('overlayregister');

  setTimeout(() => {
    window.location.href = 'exemplo:Tela Usuario/index.html'; //link pagina, colar aqui quando usuario se cadastrar redirecionar para tela usuario ou inicial
  }, 2500);
}


function abrirPopup(id)  { document.getElementById(id).classList.add('show'); }
function fecharPopup(id) { document.getElementById(id).classList.remove('show'); }
