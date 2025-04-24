// traductor-de-voz.js actualizado para traducir por voz e imagen

const GOOGLE_API_KEY = 'AIzaSyAwz3Oz9kwjud8hHozWyly-CJxZvU94qdI' <!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>Traductor por Voz e Imagen - OnlyBackpackers</title>
  <link rel="stylesheet" href="traductor-de-voz.css" />
  <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;600&display=swap" rel="stylesheet" />
</head>
<body>
  <header class="main-header">
    <nav>
      <div class="menu-toggle" id="menu-toggle">
        <span class="bar"></span>
        <span class="bar"></span>
        <span class="bar"></span>
      </div>
      <ul class="menu" id="menu">
        <li><a href="index.html">Inicio</a></li>
        <li><a href="login-register.html">Iniciar Sesión</a></li>
        <li><a href="muro.html">Muro Comunidad</a></li>
        <li><a href="muro-personal.html">Muro Personal</a></li>
        <li><a href="chats.html">Chat por Destino</a></li>
        <li><a href="traductor-de-voz.html" class="active">Traductor</a></li>
        <li><a href="recomendaciones.html">Recomendaciones</a></li>
        <li><a href="eventos.html">Eventos</a></li>
        <li><a href="configurador.html">Configurador de Rutas</a></li>
        <li><a href="expenses.html">Gastos</a></li>
        <li><a href="zona-camper.html">Zona Camper</a></li>
        <li><a href="recompensas.html">Recompensas</a></li>
      </ul>
    </nav>
  </header>

  <main class="traductor">
    <h1>🗣️🖼️ Traductor por Voz e Imagen</h1>
    <p>Habla, escribe o sube una imagen. Nosotros lo traducimos por ti. 🌍</p>

    <div class="traductor-flex">
      <!-- 🎙️ Sección de voz -->
      <div class="voz-box">
        <h2>🎧 Traductor de Voz</h2>
        <textarea id="input-text" placeholder="Escribe aquí lo que quieras decir..."></textarea>

        <div class="selectors">
          <label for="source-language">🗣️ Idioma de entrada:</label>
          <select id="source-language">
            <option value="af">Afrikáans</option>
            <option value="ar">Árabe</option>
            <option value="bn">Bengalí</option>
            <option value="bg">Búlgaro</option>
            <option value="ca">Catalán</option>
            <option value="zh">Chino (Mandarín)</option>
            <option value="hr">Croata</option>
            <option value="cs">Checo</option>
            <option value="da">Danés</option>
            <option value="nl">Neerlandés</option>
            <option value="en">Inglés</option>
            <option value="et">Estonio</option>
            <option value="fi">Finés</option>
            <option value="fr">Francés</option>
            <option value="de">Alemán</option>
            <option value="el">Griego</option>
            <option value="he">Hebreo</option>
            <option value="hi">Hindi</option>
            <option value="hu">Húngaro</option>
            <option value="id">Indonesio</option>
            <option value="it">Italiano</option>
            <option value="ja">Japonés</option>
            <option value="ko">Coreano</option>
            <option value="lt">Lituano</option>
            <option value="ms">Malayo</option>
            <option value="no">Noruego</option>
            <option value="pl">Polaco</option>
            <option value="pt">Portugués</option>
            <option value="ro">Rumano</option>
            <option value="ru">Ruso</option>
            <option value="sk">Eslovaco</option>
            <option value="sl">Esloveno</option>
            <option value="sv">Sueco</option>
            <option value="th">Tailandés</option>
            <option value="tr">Turco</option>
            <option value="uk">Ucraniano</option>
            <option value="vi">Vietnamita</option>
            <option value="es" selected>Español</option>
          </select>

          <button id="swap-btn" type="button">⇄</button>

          <label for="target-language">🌐 Idioma de destino:</label>
          <select id="target-language">
            <option value="af">Afrikáans</option>
            <option value="ar">Árabe</option>
            <option value="bn">Bengalí</option>
            <option value="bg">Búlgaro</option>
            <option value="ca">Catalán</option>
            <option value="zh">Chino (Mandarín)</option>
            <option value="hr">Croata</option>
            <option value="cs">Checo</option>
            <option value="da">Danés</option>
            <option value="nl">Neerlandés</option>
            <option value="en">Inglés</option>
            <option value="et">Estonio</option>
            <option value="fi">Finés</option>
            <option value="fr">Francés</option>
            <option value="de">Alemán</option>
            <option value="el">Griego</option>
            <option value="he">Hebreo</option>
            <option value="hi">Hindi</option>
            <option value="hu">Húngaro</option>
            <option value="id">Indonesio</option>
            <option value="it">Italiano</option>
            <option value="ja">Japonés</option>
            <option value="ko">Coreano</option>
            <option value="lt">Lituano</option>
            <option value="ms">Malayo</option>
            <option value="no">Noruego</option>
            <option value="pl">Polaco</option>
            <option value="pt">Portugués</option>
            <option value="ro">Rumano</option>
            <option value="ru">Ruso</option>
            <option value="sk">Eslovaco</option>
            <option value="sl">Esloveno</option>
            <option value="sv">Sueco</option>
            <option value="th">Tailandés</option>
            <option value="tr">Turco</option>
            <option value="uk">Ucraniano</option>
            <option value="vi">Vietnamita</option>
            <option value="es" selected>Español</option>
          </select>
        </div>

        <div class="botones-traductor">
          <button id="mic-btn">🎧 Hablar</button>
          <button id="translate-btn">🔄 Traducir y Reproducir</button>
        </div>

        <div id="translated-text" class="output"></div>
      </div>

      <!-- 🖼️ Sección de imagen -->
      <div class="imagen-box">
        <h2>📷 Traductor de Imagen</h2>
        <label for="image-upload">Sube una imagen con texto para traducir:</label>
        <input type="file" id="image-upload" accept="image/*" />

        <div class="selectors">
          <label for="image-target-language">🌐 Idioma de destino:</label>
          <select id="image-target-language">
            <option value="af">Afrikáans</option>
            <option value="ar">Árabe</option>
            <option value="bn">Bengalí</option>
            <option value="bg">Búlgaro</option>
            <option value="ca">Catalán</option>
            <option value="zh">Chino (Mandarín)</option>
            <option value="hr">Croata</option>
            <option value="cs">Checo</option>
            <option value="da">Danés</option>
            <option value="nl">Neerlandés</option>
            <option value="en">Inglés</option>
            <option value="et">Estonio</option>
            <option value="fi">Finés</option>
            <option value="fr">Francés</option>
            <option value="de">Alemán</option>
            <option value="el">Griego</option>
            <option value="he">Hebreo</option>
            <option value="hi">Hindi</option>
            <option value="hu">Húngaro</option>
            <option value="id">Indonesio</option>
            <option value="it">Italiano</option>
            <option value="ja">Japonés</option>
            <option value="ko">Coreano</option>
            <option value="lt">Lituano</option>
            <option value="ms">Malayo</option>
            <option value="no">Noruego</option>
            <option value="pl">Polaco</option>
            <option value="pt">Portugués</option>
            <option value="ro">Rumano</option>
            <option value="ru">Ruso</option>
            <option value="sk">Eslovaco</option>
            <option value="sl">Esloveno</option>
            <option value="sv">Sueco</option>
            <option value="th">Tailandés</option>
            <option value="tr">Turco</option>
            <option value="uk">Ucraniano</option>
            <option value="vi">Vietnamita</option>
            <option value="es" selected>Español</option>
          </select>
        </div>

        <div class="botones-traductor">
          <button id="image-translate-btn">🖼️ Traducir Imagen</button>
        </div>

        <div id="image-output" class="output"></div>
      </div>
    </div>
  </main>

  <footer>
    <p>&copy; 2024 OnlyBackpackers. Traductor por Voz e Imagen powered by IA.</p>
  </footer>

  <script src="traductor-de-voz.js"></script>
  <script>
    const menuToggle = document.getElementById("menu-toggle");
    const menu = document.getElementById("menu");
    if (menuToggle && menu) {
      menuToggle.addEventListener("click", () => {
        menu.classList.toggle("active");
      });
    }
  </script>
</body>
</html>
'; // <-- Sustituye esto por tu clave real

const micBtn = document.getElementById('mic-btn');
const inputText = document.getElementById('input-text');
const sourceLang = document.getElementById('source-language');
const targetLang = document.getElementById('target-language');
const translateBtn = document.getElementById('translate-btn');
const translatedText = document.getElementById('translated-text');
const swapBtn = document.getElementById('swap-btn');

let recognition;

if ('webkitSpeechRecognition' in window) {
  recognition = new webkitSpeechRecognition();
  recognition.continuous = false;
  recognition.interimResults = false;

  micBtn.addEventListener('click', () => {
    recognition.lang = sourceLang.value + '-' + sourceLang.value.toUpperCase();
    recognition.start();
    micBtn.textContent = '🎧 Escuchando...';
  });

  recognition.onresult = (event) => {
    inputText.value = event.results[0][0].transcript;
    micBtn.textContent = '🎧 Hablar';
  };

  recognition.onerror = () => {
    micBtn.textContent = '🎧 Hablar';
    alert('Error al reconocer la voz.');
  };

  recognition.onend = () => {
    micBtn.textContent = '🎧 Hablar';
  };
} else {
  micBtn.disabled = true;
  micBtn.textContent = '🎧 No compatible';
}

translateBtn.addEventListener('click', async () => {
  const text = inputText.value.trim();
  if (!text) return alert('Por favor, escribe o habla algo primero.');

  try {
    const response = await fetch(
      `https://translation.googleapis.com/language/translate/v2?key=${GOOGLE_API_KEY}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          q: text,
          source: sourceLang.value,
          target: targetLang.value,
          format: 'text'
        })
      }
    );

    const data = await response.json();
    if (data.error) throw new Error(data.error.message);

    const translated = data.data.translations[0].translatedText;
    translatedText.innerText = translated;

    const utterance = new SpeechSynthesisUtterance(translated);
    utterance.lang = targetLang.value;
    speechSynthesis.speak(utterance);
  } catch (err) {
    translatedText.innerText = '❌ Error en la traducción';
    console.error(err);
  }
});

swapBtn.addEventListener('click', () => {
  const temp = sourceLang.value;
  sourceLang.value = targetLang.value;
  targetLang.value = temp;
});

// Traductor de imagen
const imageUpload = document.getElementById('image-upload');
const imageTranslateBtn = document.getElementById('image-translate-btn');
const imageTargetLang = document.getElementById('image-target-language');
const imageOutput = document.getElementById('image-output');

imageTranslateBtn.addEventListener('click', async () => {
  const file = imageUpload.files[0];
  if (!file) return alert('Por favor, sube una imagen.');

  const reader = new FileReader();
  reader.onloadend = async () => {
    const base64Image = reader.result.replace(/^data:image\/\w+;base64,/, '');
    try {
      const visionRes = await fetch(
        `https://vision.googleapis.com/v1/images:annotate?key=${GOOGLE_API_KEY}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            requests: [
              {
                image: { content: base64Image },
                features: [{ type: 'TEXT_DETECTION' }]
              }
            ]
          })
        }
      );

      const visionData = await visionRes.json();
      const text = visionData.responses[0].fullTextAnnotation?.text || '';

      if (!text) return (imageOutput.innerText = '❌ No se encontró texto.');

      const translateRes = await fetch(
        `https://translation.googleapis.com/language/translate/v2?key=${GOOGLE_API_KEY}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            q: text,
            target: imageTargetLang.value,
            format: 'text'
          })
        }
      );

      const translated = await translateRes.json();
      const translatedText = translated.data.translations[0].translatedText;
      imageOutput.innerText = translatedText;

      const utterance = new SpeechSynthesisUtterance(translatedText);
      utterance.lang = imageTargetLang.value;
      speechSynthesis.speak(utterance);
    } catch (err) {
      imageOutput.innerText = '❌ Error procesando la imagen o traducción';
      console.error(err);
    }
  };
  reader.readAsDataURL(file);
});

