// === C O N V E R S O R  D E  M O N E D A S ===

document.addEventListener('DOMContentLoaded', () => {
  const currencyForm = document.getElementById('currency-form');
  const fromCurrency = document.getElementById('from-currency');
  const toCurrency = document.getElementById('to-currency');
  const amountInput = document.getElementById('convert-amount');
  const conversionResult = document.getElementById('conversion-result');

  // Cargar todas las monedas disponibles
  fetch('https://api.exchangerate.host/symbols')
    .then(response => response.json())
    .then(data => {
      for (const [code, { description }] of Object.entries(data.symbols)) {
        const optionFrom = document.createElement('option');
        const optionTo = document.createElement('option');
        optionFrom.value = optionTo.value = code;
        optionFrom.textContent = optionTo.textContent = `${code} - ${description}`;
        fromCurrency.appendChild(optionFrom);
        toCurrency.appendChild(optionTo);
      }
      // Por defecto: USD -> EUR
      fromCurrency.value = "USD";
      toCurrency.value = "EUR";
    })
    .catch(error => {
      console.error('Error al cargar las monedas:', error);
    });

  // Convertir la moneda
  currencyForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const amount = parseFloat(amountInput.value);
    const from = fromCurrency.value;
    const to = toCurrency.value;

    if (isNaN(amount) || amount <= 0) {
      conversionResult.textContent = 'Por favor ingresa una cantidad válida.';
      return;
    }

    try {
      const res = await fetch(`https://api.exchangerate.host/convert?from=${from}&to=${to}&amount=${amount}`);
      const data = await res.json();
      conversionResult.textContent = `${amount} ${from} equivale a ${data.result.toFixed(2)} ${to}`;
    } catch (err) {
      console.error('Error en la conversión:', err);
      conversionResult.textContent = 'Error al convertir.';
    }
  });
});
