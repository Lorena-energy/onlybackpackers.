// 🔐 Pon aquí tu API Key de Google Cloud Translation
const GOOGLE_API_KEY = AIzaSyAwz3Oz9kwjud8hHozWyly-CJxZvU94qdI;

// 🎙️ Captura de voz a texto
const micBtn = document.getElementById('mic-btn');
const inputText = document.getElementById('input-text');
const targetLang = document.getElementById('target-language');
const translateBtn = document.getElementById('translate-btn');
const translatedText = document.getElementById('translated-text');

let recognition;
if ('webkitSpeechRecognition' in window) {
  recognition = new webkitSpeechRecognition();
  recognition.lang = 'es-ES'; // idioma de entrada
  recognition.continuous = false;
  recognition.interimResults = false;

  micBtn.addEventListener('click', () => {
    recognition.start();
    micBtn.textContent = '🎙️ Escuchando...';
  });

  recognition.onresult = (event) => {
    const result = event.results[0][0].transcript;
    inputText.value = result;
    micBtn.textContent = '🎙️ Hablar';
  };

  recognition.onerror = (event) => {
    console.error('Error en reconocimiento de voz:', event.error);
    micBtn.textContent = '🎙️ Hablar';
  };

  recognition.onend = () => {
    micBtn.textContent = '🎙️ Hablar';
  };
} else {
  micBtn.disabled = true;
  micBtn.textContent = '🎙️ No compatible 😢';
}

// 🔄 Traducir texto con Google Translate
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

    // 🔊 Hablar traducción con voz (SpeechSynthesis)
    const utterance = new SpeechSynthesisUtterance(translated);
    utterance.lang = target;
    speechSynthesis.speak(utterance);

  } catch (error) {
    console.error('Error en la traducción:', error);
    translatedText.innerText = '❌ Error al traducir. Intenta de nuevo.';
  }
});
