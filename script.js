document.addEventListener("DOMContentLoaded", () => {

  // ==========================================
  // VISTA 1: CANVAS DE VERIFICACIÓN
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
      loadRandomPopupVideo(); // CARGA EL VIDEO ALEATORIO
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

  setInterval(() => {
    if (progressBar.value > 0) {
      progressBar.value -= 6;
    }
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

  // ==========================================
  // LÓGICA DE LA LLAVE, COFRE Y MODAL DE MALA SUERTE
  // ==========================================
  let hasKey = false;
  const claimKeyBtn = document.getElementById("claim-key-btn");
  const openChestBtn = document.getElementById("open-chest-btn");
  const chestStatusText = document.getElementById("chest-status-text");
  const treasureChestBox = document.getElementById("treasure-chest-box");
  const converterBox = document.getElementById("converter-box");

  // Elementos del Modal de Mala Suerte (seguridad.jpg)
  const badLuckModal = document.getElementById("bad-luck-modal");
  const closeBadLuckBtn = document.getElementById("close-bad-luck-btn");

  if (claimKeyBtn) {
    claimKeyBtn.addEventListener("click", () => {
      hasKey = true;
      alert("¡Felicidades! Ganaste 0.000001 Bitcoins y obtuviste la 🔑 LLAVE DEL COFRE.");
      
      if (openChestBtn && chestStatusText) {
        openChestBtn.disabled = false;
        openChestBtn.innerText = "🔓 ABRIR COFRE CON LA LLAVE";
        chestStatusText.innerHTML = "¡Tienes la llave en tu poder! Haz clic en el botón para abrir el cofre.";
      }
    });
  }

  if (openChestBtn) {
    openChestBtn.addEventListener("click", () => {
      if (!hasKey) {
        // Despliega el modal emergente con la imagen de seguridad
        if (badLuckModal) badLuckModal.classList.remove("hidden");
        return;
      }

      alert("¡EL COFRE SE HA ABIERTO! Se ha desbloqueado el Convertidor de MP4 a MP3.");
      treasureChestBox.classList.add("hidden");
      converterBox.classList.remove("hidden");
    });
  }

  // Cierre del modal de mala suerte con el botón 'X'
  if (closeBadLuckBtn && badLuckModal) {
    closeBadLuckBtn.addEventListener("click", () => {
      badLuckModal.classList.add("hidden");
    });
  }

  // ==========================================
  // CONVERTIDOR MP4 A MP3 CON WEB AUDIO API
  // ==========================================
  const videoInput = document.getElementById("video-input");
  const convertBtn = document.getElementById("convert-btn");
  const conversionStatus = document.getElementById("conversion-status");
  const audioResultBox = document.getElementById("audio-result-box");
  const audioPreview = document.getElementById("audio-preview");
  const downloadAudioBtn = document.getElementById("download-audio-btn");

  if (convertBtn) {
    convertBtn.addEventListener("click", async () => {
      const file = videoInput.files[0];
      if (!file) {
        alert("Por favor selecciona primero un archivo MP4.");
        return;
      }

      conversionStatus.innerText = "⏳ Decodificando video e hiper-procesando audio...";
      convertBtn.disabled = true;

      try {
        const arrayBuffer = await file.arrayBuffer();
        const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
        const audioBuffer = await audioCtx.decodeAudioData(arrayBuffer);

        const wavBlob = bufferToWave(audioBuffer, audioBuffer.length);
        const audioUrl = URL.createObjectURL(wavBlob);

        audioPreview.src = audioUrl;
        downloadAudioBtn.href = audioUrl;
        downloadAudioBtn.download = file.name.replace(/\.[^/.]+$/, "") + ".mp3";

        conversionStatus.innerText = "✅ ¡Conversión completada!";
        audioResultBox.classList.remove("hidden");
      } catch (err) {
        console.error(err);
        conversionStatus.innerText = "❌ Error al procesar el archivo. Asegúrate de subir un MP4 válido.";
      } finally {
        convertBtn.disabled = false;
      }
    });
  }

  // Inicializar la cinta de acciones al cargar el DOM
  initStockTicker();

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

  const fullList = [...stockData, ...stockData];

  track.innerHTML = fullList.map((stock, index) => {
    const classColor = stock.up ? "green" : "red";
    const arrow = stock.up ? "▲ +" : "▼ ";
    return `<span class="stock-item ${classColor}" data-index="${index}">
      ${stock.symbol} $${stock.price.toFixed(2)} ${arrow}${stock.change.toFixed(1)}%
    </span>`;
  }).join('');

  setInterval(() => {
    const items = track.querySelectorAll(".stock-item");
    if (items.length === 0) return;

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

// ==========================================
// POP-UP CON VIDEO ALEATORIO
// ==========================================
const popupVideos = [
  "utilities/cashea.mp4",
  "utilities/quesillo.mp4",
  "utilities/ronaldo.mp4"
];

function loadRandomPopupVideo() {
  const container = document.getElementById("popup-media");
  if (!container) return;

  const randomIndex = Math.floor(Math.random() * popupVideos.length);
  const selectedVideo = popupVideos[randomIndex];

  container.innerHTML = `
    <video autoplay loop muted playsinline style="width: 100%; height: 100%; object-fit: cover;">
      <source src="${selectedVideo}" type="video/mp4">
      Tu navegador no soporta video.
    </video>
  `;
}

// ==========================================
// HELPER PARA PROCESAMIENTO DE AUDIO (WAV/MP3)
// ==========================================
function bufferToWave(abuffer, len) {
  let numOfChan = abuffer.numberOfChannels,
      length = len * numOfChan * 2 + 44,
      out = new DataView(new ArrayBuffer(length)),
      channels = [], i, sample, offset = 0, pos = 0;

  function setUint16(data) { out.setUint16(pos, data, true); pos += 2; }
  function setUint32(data) { out.setUint32(pos, data, true); pos += 4; }

  setUint32(0x46464952); setUint32(length - 8); setUint32(0x45564157);
  setUint32(0x20746d66); setUint32(16); setUint16(1); setUint16(numOfChan);
  setUint32(abuffer.sampleRate); setUint32(abuffer.sampleRate * 2 * numOfChan);
  setUint16(numOfChan * 2); setUint16(16); setUint32(0x61746164); setUint32(length - pos - 4);

  for (i = 0; i < abuffer.numberOfChannels; i++) channels.push(abuffer.getChannelData(i));

  while (offset < len) {
    for (i = 0; i < numOfChan; i++) {
      sample = Math.max(-1, Math.min(1, channels[i][offset]));
      sample = (0.5 + sample < 0 ? sample * 32768 : sample * 32767) | 0;
      out.setInt16(pos, sample, true); pos += 2;
    }
    offset++;
  }
  return new Blob([out], { type: "audio/mp3" });
}