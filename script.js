document.addEventListener("DOMContentLoaded", () => {

  // ==========================================
  // VISTA 1: CANVAS
  // ==========================================
  const canvas = document.getElementById("captcha-canvas");
  const ctx = canvas.getContext("2d");
  const clearBtn = document.getElementById("clear-canvas-btn");
  const submitBtn = document.getElementById("submit-canvas-btn");
  
  const gatekeeperScreen = document.getElementById("gatekeeper-screen");
  const mainChaosScreen = document.getElementById("main-chaos-screen");

  let isDrawing = false;
  ctx.lineWidth = 5;
  ctx.lineCap = "round";
  ctx.strokeStyle = "#FF0000";

  canvas.addEventListener("mousedown", (e) => {
    isDrawing = true;
    ctx.beginPath();
    ctx.moveTo(e.offsetX, e.offsetY);
  });

  canvas.addEventListener("mousemove", (e) => {
    if (isDrawing) {
      ctx.lineTo(e.offsetX, e.offsetY);
      ctx.stroke();
    }
  });

  canvas.addEventListener("mouseup", () => isDrawing = false);

  clearBtn.addEventListener("click", () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  });

  submitBtn.addEventListener("click", () => {
    alert("¡ARTE VERIFICADO CORRECTAMENTE POR EL SERVIDOR 1999!");
    gatekeeperScreen.classList.add("hidden");
    mainChaosScreen.classList.remove("hidden");
    startBackgroundFlashing();
  });

  // ==========================================
  // VISTA 2: RULETA Y BOTÓN HUYENDE
  // ==========================================
  const spin1Btn = document.getElementById("spin-1-btn");
  const spin10Btn = document.getElementById("spin-10-btn");
  const wheel = document.getElementById("roulette-wheel");
  const popupModal = document.getElementById("popup-modal");

  spin1Btn.addEventListener("mouseover", () => {
    const randomX = Math.floor(Math.random() * 200) - 100;
    const randomY = Math.floor(Math.random() * 200) - 100;
    spin1Btn.style.transform = `translate(${randomX}px, ${randomY}px)`;
  });

  let currentRotation = 0;
  function triggerSpin() {
    currentRotation += Math.floor(Math.random() * 360) + 1440;
    wheel.style.transform = `rotate(${currentRotation}deg)`;

    setTimeout(() => {
      popupModal.classList.remove("hidden");
    }, 3200);
  }

  spin1Btn.addEventListener("click", triggerSpin);
  spin10Btn.addEventListener("click", triggerSpin);

  // ==========================================
  // LÓGICA DE MINIJUEGOS (PROGRESS BAR)
  // ==========================================
  const progressBar = document.getElementById("click-progress");
  const chargeBtn = document.getElementById("charge-btn");
  const stressMeter = document.getElementById("stress-meter");

  chargeBtn.addEventListener("click", () => {
    if (progressBar.value < 100) {
      progressBar.value += 15;
    } else {
      alert("¡CARGA COMPLETA! Has sobrevivido por ahora.");
      progressBar.value = 0;
    }
  });

  // Drenaje constante de la barra cada 350ms
  setInterval(() => {
    if (progressBar.value > 0) {
      progressBar.value -= 6;
    }
    // Variación aleatoria del nivel de estrés
    stressMeter.value = Math.floor(Math.random() * 30) + 70;
  }, 350);

  // ==========================================
  // VISTA 3: POP-UP Y PREGUNTA
  // ==========================================
  const closeModalBtn = document.getElementById("close-modal-btn");
  const quizAnswer = document.getElementById("quiz-answer");

  closeModalBtn.addEventListener("click", () => {
    const val = quizAnswer.value.trim().toLowerCase();
    
    if (val === "no se" || val === "no sé") {
      alert("Respuesta aceptada. Se cierra la ventana.");
      popupModal.classList.add("hidden");
      quizAnswer.value = "";
    } else {
      alert("INCORRECTO. Pista: Escribe 'no se'");
    }
  });

  // MODO PARPADEO EPILÉPTICO
  function startBackgroundFlashing() {
    setInterval(() => {
      document.body.classList.toggle("flash-mode");
    }, 400);
  }

});

// ==========================================
// CINTILLA Y CARRUSEL BOLSARDO
// ==========================================
const stockData = [
  { symbol: "AAPL", price: 242.50, change: 15.4, up: true },
  { symbol: "TSLA", price: 120.10, change: -32.8, up: false },
  { symbol: "NVDA", price: 999.99, change: 420.0, up: true },
  { symbol: "BTC", price: 12.50, change: -99.9, up: false },
  { symbol: "DOGE", price: 1.00, change: 1000.0, up: true },
  { symbol: "MSFT", price: 310.20, change: -5.2, up: false },
  { symbol: "GOOGL", price: 180.45, change: 8.1, up: true },
  { symbol: "BANANA", price: 0.05, change: -80.0, up: false },
  { symbol: "MONO", price: 888.88, change: 88.8, up: true }
];

function initStockTicker() {
  const track = document.getElementById("ticker-track");
  if (!track) return;

  // Duplicamos la lista para crear un bucle perfecto sin cortes visuales
  const fullList = [...stockData, ...stockData];

  track.innerHTML = fullList.map((stock, index) => {
    const classColor = stock.up ? "green" : "red";
    const arrow = stock.up ? "▲ +" : "▼ ";
    return `<span class="stock-item ${classColor}" data-index="${index}">
      ${stock.symbol} $${stock.price.toFixed(2)} ${arrow}${stock.change.toFixed(1)}%
    </span>`;
  }).join('');

  // Cambiar precios aleatoriamente cada 1.5 segundos
  setInterval(() => {
    const items = track.querySelectorAll(".stock-item");
    if (items.length === 0) return;

    // Seleccionamos una acción al azar para actualizarla
    const randomIdx = Math.floor(Math.random() * items.length);
    const item = items[randomIdx];
    
    const isUp = Math.random() > 0.45;
    const symbol = item.innerText.split(' ')[0];
    const newPrice = (Math.random() * 800 + 10).toFixed(2);
    const newPercent = (Math.random() * 80).toFixed(1);

    if (isUp) {
      item.className = "stock-item green";
      item.innerText = `${symbol} $${newPrice} ▲ +${newPercent}%`;
    } else {
      item.className = "stock-item red";
      item.innerText = `${symbol} $${newPrice} ▼ -${newPercent}%`;
    }
  }, 1500);
}

// Iniciar al cargar el DOM
document.addEventListener("DOMContentLoaded", () => {
  initStockTicker();
});