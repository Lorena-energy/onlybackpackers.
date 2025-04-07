// 🔐 Reemplaza esta línea con tu API key real de Google Cloud
const GOOGLE_API_KEY = 'AIzaSyAwz3Oz9kwjud8hHozWyly-CJxZvU94qdI';

const micBtn = document.getElementById('mic-btn');
const inputText = document.getElementById('input-text');
const sourceLang = document.getElementById('source-language');
const targetLang = document.getElementById('target-language');
const translateBtn = document.getElementById('translate-btn');
const translatedText = document.getElementById('translated-text');

let recognition;

if ('webkitSpeechRecognition' in window) {
  recognition = new webkitSpeechRecognition();
  recognition.continuous = false;
  recognition.interimResults = false;

  micBtn.addEventListener('click', () => {
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

// 🔄 Traducción con Google Translate API
translateBtn.addEventListener('click', async () => {
  const text = inputText.value.trim();
  const target = targetLang.value;

  if (!text) {
    alert('Por favor escribe o habla algo primero.');
    return;
  }

  try {
    const response = await fetch(`https://translation.googleapis.com/language/translate/v2?key=${GOOGLE_API_KEY}`, {
      method: 'POST',
      body: JSON.stringify({
        q: text,
        target: target,
        format: 'text'
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    });

    const data = await response.json();
    const translated = data.data.translations[0].translatedText;

    translatedText.innerText = translated;

    // 🗣️ Voz del resultado traducido
    const utterance = new SpeechSynthesisUtterance(translated);
    utterance.lang = target;
    speechSynthesis.speak(utterance);

  } catch (error) {
    console.error('Error en la traducción:', error);
    translatedText.innerText = '❌ Error al traducir. Intenta de nuevo.';
  }
});
