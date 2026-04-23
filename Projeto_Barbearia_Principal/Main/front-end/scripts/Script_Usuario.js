document.addEventListener('DOMContentLoaded', () => {
  const botoes = document.querySelectorAll('.menu-item');
  const secoes = document.querySelectorAll('.content-section');
  const cardLogout = document.getElementById("card-logout"); // Card de logout
  const userIcon = document.querySelector('.icon_LG'); // Ícone de usuário (link)

  // 🔥 limpa qualquer active bugado
  secoes.forEach(s => s.classList.remove('active'));
  botoes.forEach(b => b.classList.remove('active'));

  // define inicial
  document.getElementById("Perfil").classList.add("active");
  document.querySelector('[data-target="Perfil"]').classList.add("active");

  const usuario = JSON.parse(localStorage.getItem("usuario"));

  if (!usuario) {
    window.location.href = "Login_Registro.html";
    return;
  }

  // 🔥 preencher dados no HTML
  document.querySelector(".user-info h3").innerText = usuario.Nome;
  document.querySelector(".user-info p").innerText = "CLIENTE";

  // CARD PERFIL
  const detalhes = document.querySelector(".card-perfil .card-conteudo");

  if (detalhes) {
    detalhes.innerHTML = `
          <p>Nome de Usuário <strong>${usuario.Nome}</strong></p>
          <p>Email <strong>${usuario.Email}</strong></p>
        `;
  }

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

      // Ocultar o card de logout ao mudar de seção
      cardLogout.style.display = "none";
    });
  });

  // Função para mostrar/ocultar o card de logout ao clicar no ícone de usuário
  userIcon.addEventListener('click', () => {
    // Se o card de logout estiver escondido, mostra ele. Caso contrário, esconde.
    if (cardLogout.style.display === "none" || cardLogout.style.display === "") {
      cardLogout.style.display = "block";
    } else {
      cardLogout.style.display = "none";
    }
  });

  // Chama a função para carregar os dados de agendamentos do usuário
  carregarAgendamentos();
});

async function carregarAgendamentos() {
  const usuario = JSON.parse(localStorage.getItem("usuario"));
  if (!usuario) return;

  try {
    const res = await fetch(`http://localhost:3000/agendamentos/${usuario.id_Usuario}`);
    const data = await res.json();

    console.log("AGENDAMENTOS:", data); // 👈 DEBUG

    if (!data.success || data.agendamentos.length === 0) {
      document.getElementById("proximoCorte").innerText = "Nenhum agendamento encontrado.";
      document.getElementById("barbeiroNome").innerText = "";
      document.getElementById("totalCortes").innerText = "0";
      document.getElementById("ultimaVisita").innerText = "--";
      document.getElementById("historicoLista").innerHTML = "<p>Histórico vazio.</p>";
      return;
    }

    const agendamentos = data.agendamentos;

    // 🔹 PRÓXIMO CORTE
    const futuro = agendamentos
      .filter(a => new Date(a.data_hora) > new Date())  // Filtra apenas os futuros
      .sort((a, b) => new Date(a.data_hora) - new Date(b.data_hora))[0];  // Ordena e pega o mais próximo
    if (futuro) {
      document.getElementById("proximoCorte").innerText = new Date(futuro.data_hora).toLocaleString();
      document.getElementById("barbeiroNome").innerText = futuro.barbeiro;
    } else {
      document.getElementById("proximoCorte").innerText = "Nenhum agendamento futuro.";
      document.getElementById("barbeiroNome").innerText = "";
    }

    // 🔹 ESTATÍSTICAS
    document.getElementById("totalCortes").innerText = agendamentos.length;
    if (agendamentos.length > 0) {
      document.getElementById("ultimaVisita").innerText = new Date(agendamentos[0].data_hora).toLocaleDateString();
    }

    // 🔹 HISTÓRICO
    const historico = document.getElementById("historicoLista");
    historico.innerHTML = ""; // Limpa o conteúdo anterior

    agendamentos.slice(0, 5).forEach(a => {
      historico.innerHTML += `
                <p>${new Date(a.data_hora).toLocaleDateString()} - <strong>${a.barbeiro}</strong></p>
            `;
    });
  } catch (error) {
    console.error("Erro ao carregar agendamentos", error);
    alert("Erro ao carregar agendamentos");
  }
}

// Função de logout
function logout() {
  localStorage.removeItem("usuario");
  window.location.href = "Login_Registro.html";
}