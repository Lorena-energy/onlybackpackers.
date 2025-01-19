// Manejo del formulario de conversión de monedas
const currencyForm = document.getElementById("currency-form");
const conversionResult = document.getElementById("conversion-result");

currencyForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const amount = parseFloat(document.getElementById("convert-amount").value);
  const fromCurrency = document.getElementById("from-currency").value;
  const toCurrency = document.getElementById("to-currency").value;

  if (isNaN(amount) || amount <= 0) {
    conversionResult.textContent = "Por favor, ingresa un monto válido.";
    return;
  }

  try {
    const response = await fetch(`https://api.exchangerate-api.com/v4/latest/${fromCurrency}`);
    const data = await response.json();
    const rate = data.rates[toCurrency];

    if (!rate) {
      conversionResult.textContent = `Error: no se encontró la tasa de cambio para ${toCurrency}`;
      return;
    }

    const convertedAmount = (amount * rate).toFixed(2);
    conversionResult.textContent = `${amount} ${fromCurrency} equivale a ${convertedAmount} ${toCurrency}`;
  } catch (error) {
    console.error("Error al convertir moneda:", error);
    conversionResult.textContent = "Error al obtener las tasas de cambio.";
  }
});

// Manejo del formulario de gastos
const expenseForm = document.getElementById("expense-form");
const expenseList = document.getElementById("expense-list");
const totalExpenses = document.getElementById("total-expenses");
const ctx = document.getElementById("expense-chart-canvas").getContext("2d");

let expenses = [];

// Crear gráfico inicial
const categories = ["Transporte", "Comidas", "Alojamiento", "Actividades", "Otros"];
const chartData = {
  labels: categories,
  datasets: [
    {
      data: [0, 0, 0, 0, 0],
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

// Actualizar el gráfico
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

// Menú hamburguesa en dispositivos móviles
const toggleBtn = document.getElementById("menu-toggle");
const menu = document.getElementById("menu");

toggleBtn.addEventListener("click", () => {
  menu.classList.toggle("active");
});
