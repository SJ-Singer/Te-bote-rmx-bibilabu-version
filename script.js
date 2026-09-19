document.addEventListener("DOMContentLoaded", () => {

  // ==========================================
  // VISTA 1: LÓGICA DEL CANVAS (DIBUJO)
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

  // Falsa verificación: Entra sin importar lo que haya dibujado
  submitBtn.addEventListener("click", () => {
    alert("¡ARTE VERIFICADO CORRECTAMENTE POR LA IA! BIENVENIDO.");
    gatekeeperScreen.classList.add("hidden");
    mainChaosScreen.classList.remove("hidden");
    
    // Iniciar parpadeo loco de fondo
    startBackgroundFlashing();
  });

  // ==========================================
  // VISTA 2: RULETA Y BOTÓN QUE HUYE
  // ==========================================
  const spin1Btn = document.getElementById("spin-1-btn");
  const spin10Btn = document.getElementById("spin-10-btn");
  const wheel = document.getElementById("roulette-wheel");
  const popupModal = document.getElementById("popup-modal");

  // El botón de Spin 1 huye del ratón
  spin1Btn.addEventListener("mouseover", () => {
    const randomX = Math.floor(Math.random() * 200) - 100;
    const randomY = Math.floor(Math.random() * 200) - 100;
    spin1Btn.style.transform = `translate(${randomX}px, ${randomY}px)`;
  });

  let currentRotation = 0;

  function triggerSpin() {
    currentRotation += Math.floor(Math.random() * 360) + 1440;
    wheel.style.transform = `rotate(${currentRotation}deg)`;

    // Mostrar Pop-up molesto tras girar
    setTimeout(() => {
      popupModal.classList.remove("hidden");
    }, 3200);
  }

  spin1Btn.addEventListener("click", triggerSpin);
  spin10Btn.addEventListener("click", triggerSpin);

  // ==========================================
  // VISTA 3: POP-UP Y MINIJUEGO
  // ==========================================
  const closeModalBtn = document.getElementById("close-modal-btn");
  const quizAnswer = document.getElementById("quiz-answer");

  closeModalBtn.addEventListener("click", () => {
    const val = quizAnswer.value.trim().toLowerCase();
    
    // Solo se cierra si la respuesta es exactamente "no se"
    if (val === "no se" || val === "no sé") {
      alert("Respuesta correcta por falta de lógica. Se cierra la ventana.");
      popupModal.classList.add("hidden");
      quizAnswer.value = "";
    } else {
      alert("RESPUESTA INCORRECTA. Intenta con: 'no se'");
    }
  });

  // ==========================================
  // MODO CLARO / OSCURO CAÓTICO (EXTRA)
  // ==========================================
  function startBackgroundFlashing() {
    setInterval(() => {
      document.body.classList.toggle("flash-mode");
    }, 400); // Cambia el color cada 400ms
  }

});