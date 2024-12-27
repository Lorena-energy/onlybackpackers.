const expenseForm = document.getElementById("expense-form");
const expenseList = document.getElementById("expense-list");
const totalExpenses = document.getElementById("total-expenses");
const ctx = document.getElementById("expense-chart-canvas").getContext("2d");
const currencyForm = document.getElementById("currency-form");
const conversionResult = document.getElementById("conversion-result");

let expenses = [];

// Crear instancia del gráfico al inicio
const categories = ["Transporte", "Comidas", "Alojamiento", "Actividades", "Otros"];
const chartData = {
  labels: categories,
  datasets: [
    {
      data: [0, 0, 0, 0, 0], // Valores iniciales para cada categoría
      backgroundColor: ["#0077cc", "#ff6600", "#00bfff", "#66cc66", "#cccccc"],
    },
  ],
};

const expenseChart = new Chart(ctx, {
  type: "pie",
  data: chartData,
  options: {
    responsive: true,
  },
});

// Función para actualizar el gráfico
const updateChart = () => {
  const categoryTotals = categories.map((cat) =>
    expenses
      .filter((exp) => exp.category === cat.toLowerCase())
      .reduce((sum, exp) => sum + exp.amount, 0)
  );

  expenseChart.data.datasets[0].data = categoryTotals;
  expenseChart.update();
};

// Manejar la adición de un gasto
expenseForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const name = document.getElementById("expense-name").value;
  const category = document.getElementById("expense-category").value;
  const amount = parseFloat(document.getElementById("expense-amount").value);
  const currency = document.getElementById("expense-currency").value;
  const notes = document.getElementById("expense-notes").value;

  if (name && category && amount && currency) {
    const expense = { name, category, amount, currency, notes };
    expenses.push(expense);

    const li = document.createElement("li");
    li.innerHTML = `
      <strong>${name}</strong> - ${amount} ${currency} (${category})
      <br>${notes ? notes : ""}
    `;
    expenseList.appendChild(li);

    const total = expenses.reduce((sum, exp) => sum + exp.amount, 0);
    totalExpenses.textContent = `Total: $${total.toFixed(2)}`;

    updateChart();
    expenseForm.reset();
  }
});

// Tasa de cambio con soporte para destinos globales
const supportedCurrencies = {
  USD: "Dólar estadounidense",
  EUR: "Euro",
  GBP: "Libra esterlina",
  JPY: "Yen japonés",
  AUD: "Dólar australiano",
  CAD: "Dólar canadiense",
  CNY: "Yuan chino",
  INR: "Rupia india",
  MXN: "Peso mexicano",
  ZAR: "Rand sudafricano",
  MAD: "Dírham marroquí",
  IDR: "Rupia indonesia (Bali)",
  JMD: "Dólar jamaicano",
  MUR: "Rupia de Mauricio",
  MVR: "Rupia maldiva",
  ARS: "Peso argentino",
  CLP: "Peso chileno",
  COP: "Peso colombiano",
  PEN: "Sol peruano",
  XCD: "Dólar del Caribe Oriental (Aruba)",
  VND: "Dong vietnamita",
  THB: "Baht tailandés",
  XPF: "Franco CFP (Tahití)",
};

// Rellenar opciones de moneda en el formulario
const populateCurrencyOptions = () => {
  const fromCurrency = document.getElementById("from-currency");
  const toCurrency = document.getElementById("to-currency");

  Object.keys(supportedCurrencies).forEach((currency) => {
    const optionFrom = document.createElement("option");
    const optionTo = document.createElement("option");

    optionFrom.value = currency;
    optionFrom.textContent = `${supportedCurrencies[currency]} (${currency})`;

    optionTo.value = currency;
    optionTo.textContent = `${supportedCurrencies[currency]} (${currency})`;

    fromCurrency.appendChild(optionFrom);
    toCurrency.appendChild(optionTo);
  });
};

// Ejecutar al cargar
populateCurrencyOptions();

// Función para realizar conversión
const convertCurrency = async (amount, from, to) => {
  try {
    const response = await fetch(`https://api.exchangerate-api.com/v4/latest/${from}`);
    const data = await response.json();
    const rate = data.rates[to];

    if (!rate) {
      conversionResult.textContent = `Error: no se encontró la tasa de cambio para ${to}`;
      return null;
    }

    return (amount * rate).toFixed(2);
  } catch (error) {
    console.error("Error al convertir moneda:", error);
    conversionResult.textContent = "Error al obtener las tasas de cambio.";
    return null;
  }
};

// Manejar conversión de moneda
currencyForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const amount = parseFloat(document.getElementById("convert-amount").value);
  const fromCurrency = document.getElementById("from-currency").value;
  const toCurrency = document.getElementById("to-currency").value;

  if (isNaN(amount) || amount <= 0) {
    conversionResult.textContent = "Por favor, ingresa un monto válido.";
    return;
  }

  const convertedAmount = await convertCurrency(amount, fromCurrency, toCurrency);

  if (convertedAmount !== null) {
    conversionResult.textContent = `${amount} ${fromCurrency} equivale a ${convertedAmount} ${toCurrency}`;
  }
});
