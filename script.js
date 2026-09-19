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