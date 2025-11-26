// Frases motivacionais para o botão principal
const frases = [
  "💪 Não limite os seus desafios. Desafie os seus limites.",
  "🌟 Acredite em si mesmo e você será imparável.",
  "☀️ Cada dia é uma nova oportunidade para brilhar.",
  "🌈 Se você pode sonhar, pode realizar.",
  "🔥 A persistência leva ao sucesso.",
  "💚 Sua determinação é sua maior força."
];

document.getElementById("botaoFrase").addEventListener("click", () => {
  const fraseAleatoria = frases[Math.floor(Math.random() * frases.length)];
  document.getElementById("frase").textContent = fraseAleatoria;
});

// --- JOGO DA MEMÓRIA ---
const frasesJogo = [
  "💪 Não limite os seus desafios, desafie os seus limites.",
  "🌟 Acredite em si mesmo e você será imparável.",
  "☀️ Cada dia é uma nova oportunidade para brilhar.",
  "🌈 Se você pode sonhar, pode realizar.",
  "🔥 A persistência leva ao sucesso.",
  "💚 Sua determinação é sua maior força."
];

const cartas = [...frasesJogo, ...frasesJogo]; // duplica
let cartasViradas = [];
let bloqueado = false;

// 🔊 Sons de acerto e erro
const somAcerto = new Audio("https://cdn.pixabay.com/download/audio/2022/03/15/audio_9c31e4fbe5.mp3?filename=success-1-6297.mp3");
const somErro = new Audio("https://cdn.pixabay.com/download/audio/2021/09/03/audio_6ab03b7f2a.mp3?filename=error-126627.mp3");

function embaralhar(array) {
  return array.sort(() => Math.random() - 0.5);
}

function criarJogo() {
  const tabuleiro = document.getElementById("tabuleiro");
  tabuleiro.innerHTML = "";
  embaralhar(cartas).forEach((frase) => {
    const carta = document.createElement("div");
    carta.classList.add("carta");
    carta.textContent = "❓";
    carta.dataset.valor = frase;
    carta.addEventListener("click", virarCarta);
    tabuleiro.appendChild(carta);
  });
}

function virarCarta() {
  if (bloqueado || this.classList.contains("virada")) return;
  this.classList.add("virada");
  this.textContent = this.dataset.valor;
  cartasViradas.push(this);

  if (cartasViradas.length === 2) {
    bloqueado = true;
    setTimeout(verificarPar, 800);
  }
}

function verificarPar() {
  const [c1, c2] = cartasViradas;
  if (c1.dataset.valor === c2.dataset.valor) {
    c1.style.backgroundColor = "#b2dfdb";
    c2.style.backgroundColor = "#b2dfdb";
    c1.removeEventListener("click", virarCarta);
    c2.removeEventListener("click", virarCarta);
    somAcerto.play();
  } else {
    somErro.play();
    setTimeout(() => {
      c1.classList.remove("virada");
      c1.textContent = "❓";
      c2.classList.remove("virada");
      c2.textContent = "❓";
    }, 500);
  }
  cartasViradas = [];
  bloqueado = false;
}

criarJogo();
