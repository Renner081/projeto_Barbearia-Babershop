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
async function fazerlogin() {
  const email = document.querySelector('#login-email').value;
  const senha = document.querySelector('#pass-login').value;

  const res = await fetch("http://localhost:3000/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, senha })
  });

  const data = await res.json();

  if (data.success) {
    localStorage.setItem("usuario", JSON.stringify(data.user));
    window.location.href = "Usuario.html";
  } else {
    alert("Email ou senha inválidos");
  }
}


async function fazercadastro() {
  const nome = document.getElementById("register-nome").value;
  const email = document.getElementById("register-email").value;
  const senha = document.getElementById("pass-register").value;

  if (!nome || !email || !senha) {
    alert("Preencha todos os campos");
    return;
  }

  const res = await fetch("http://localhost:3000/cadastro", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ nome, email, senha })
  });

  const data = await res.json();

  if (data.success) {
    localStorage.setItem("usuario", JSON.stringify(data.user));
    window.location.href = "Usuario.html";
  } else {
    alert("Erro ao cadastrar");
    console.log(data);
  }
}

function abrirPopup(id)  { document.getElementById(id).classList.add('show'); }
function fecharPopup(id) { document.getElementById(id).classList.remove('show'); }
