// traductor-de-voz.js limpio y funcional

const GOOGLE_API_KEY = 'AIzaSyAwz3Oz9kwjud8hHozWyly-CJxZvU94qdI';

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
