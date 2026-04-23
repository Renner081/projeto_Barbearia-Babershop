const API = "http://localhost:3000";

async function agendar() {
  try {
    const usuario = JSON.parse(localStorage.getItem("usuario"));

    if (!usuario) {
      alert("Você precisa estar logado!");
      window.location.href = "Login_Registro.html";
      return;
    }

    const data = document.getElementById("date").value;
    const hora = document.getElementById("time").value;

    if (!data || !hora) {
      alert("Preencha data e hora");
      return;
    }

    const res = await fetch(API + "/agendar", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        id_Usuario: usuario.id_Usuario,
        id_Barbeiro: 1,
        data_hora: data + " " + hora
      })
    });

    const dataRes = await res.json();

    console.log("RESPOSTA BACKEND:", dataRes);

    if (dataRes.success) {
      alert("Agendamento realizado!");
      window.location.href = "Usuario.html";
    } else {
      alert("Erro ao agendar: " + (dataRes.error || "desconhecido"));
    }

  } catch (err) {
    console.error("ERRO FETCH:", err);
    alert("Erro de conexão com servidor");
  }
}