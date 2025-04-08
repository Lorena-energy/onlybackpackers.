// ⚠️ Solo para pruebas, en producción oculta esta clave en tu backend
const GOOGLE_API_KEY = 'AIzaSyAwz3Oz9kwjud8hHozWyly-CJxZvU94qdI';

const micBtn = document.getElementById('mic-btn');
const inputText = document.getElementById('input-text');
const sourceLang = document.getElementById('source-language');
const targetLang = document.getElementById('target-language');
const translateBtn = document.getElementById('translate-btn');
const translatedText = document.getElementById('translated-text');

let recognition;

// 1) Verificamos compatibilidad con SpeechRecognition (solo Chrome / Android, Edge Chromium, etc.)
if ('webkitSpeechRecognition' in window) {
  recognition = new webkitSpeechRecognition();
  recognition.continuous = false;
  recognition.interimResults = false;

  micBtn.addEventListener('click', () => {
    // Asignamos el idioma tal cual está en sourceLang (e.g. 'es-ES', 'en-US')
    recognition.lang = sourceLang.value;
    recognition.start();
    micBtn.textContent = '🎙️ Escuchando...';
  });

  recognition.onresult = (event) => {
    const result = event.results[0][0].transcript;
    inputText.value = result;
    micBtn.textContent = '🎙️ Hablar';
  };

  recognition.onerror = () => {
    micBtn.textContent = '🎙️ Hablar';
    alert('Error al reconocer la voz. Intenta de nuevo.');
  };

  recognition.onend = () => {
    micBtn.textContent = '🎙️ Hablar';
  };
} else {
  micBtn.disabled = true;
  micBtn.textContent = '🎙️ No compatible';
}

// 2) Función para convertir 'pt-BR' -> 'pt', 'en-US' -> 'en', etc.
// (Google Translate solo necesita el código corto en 'source')
function getShortLangCode(fullCode) {
  // Toma la parte antes del guión, p.e. 'en-US' -> ['en', 'US'] -> 'en'
  return fullCode.split('-')[0]; 
}

// 3) Evento para traducir con la API de Google
translateBtn.addEventListener('click', async () => {
  const text = inputText.value.trim();
  
  if (!text) {
    alert('Por favor, escribe o habla algo primero.');
    return;
  }

  // Convertimos el idioma de origen al código corto (ej. 'es', 'en', 'fr')
  const sourceShort = getShortLangCode(sourceLang.value);
  // El idioma de destino se asume que ya es ISO corto (ej. 'en', 'fr', 'de', etc.)
  const targetShort = targetLang.value;

  try {
    // Llamada a la API de traducción de Google
    const response = await fetch(
      `https://translation.googleapis.com/language/translate/v2?key=${GOOGLE_API_KEY}`, 
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          q: text,
          source: sourceShort,   // idioma de origen
          target: targetShort,   // idioma de destino
          format: 'text'
        })
      }
    );

    const data = await response.json();
    
    if (data.error) {
      console.error('Error en la API de Google:', data.error);
      translatedText.innerText = '❌ Error con la API de traducción.';
      return;
    }

    // Recuperamos el texto traducido
    const translated = data.data.translations[0].translatedText;
    translatedText.innerText = translated;

    // 4) Reproducimos el resultado (Text-to-Speech)
    const utterance = new SpeechSynthesisUtterance(translated);

    // Opcional: if quieres forzar dialectos en la voz sintetizada, usa un switch:
    switch (targetShort) {
      case 'en': utterance.lang = 'en-US'; break;
      case 'es': utterance.lang = 'es-ES'; break;
      case 'pt': utterance.lang = 'pt-BR'; break;
      default:
        utterance.lang = targetShort; 
        break;
    }

    speechSynthesis.speak(utterance);

  } catch (error) {
    console.error('Error en la traducción:', error);
    translatedText.innerText = '❌ Error al traducir. Intenta de nuevo.';
  }
});


// 5) 🧡 Banner informativo para iPhone y usuarios en general
const aviso = document.createElement('div');
aviso.classList.add('aviso-banner');
aviso.innerHTML = `
  ⚠️ En iPhone, la función de reconocimiento de voz aún no está disponible por limitaciones de su navegador.<br>
  Pero no te preocupes, estamos trabajando para que próximamente también puedas usar esta función desde tu dispositivo 🍏.<br>
  Mientras tanto, puedes escribir tu mensaje y traducirlo igual. ¡Gracias por tu comprensión 💛!
`;

document.querySelector('.traductor').insertBefore(aviso, document.querySelector('.translator-box'));
