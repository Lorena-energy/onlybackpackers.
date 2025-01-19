document.addEventListener("DOMContentLoaded", () => {
  /************************************************************
   * MENÚ HAMBURGUESA
   ************************************************************/
  const menuToggle = document.getElementById("menu-toggle");
  const menu = document.getElementById("menu");

  menuToggle?.addEventListener("click", () => {
    // Al hacer clic, se alterna la clase "active" en el <ul id="menu">
    menu.classList.toggle("active");
  });

  /************************************************************
   * FORMULARIO DE GASTOS (con Chart.js)
   ************************************************************/
  const expenseForm = document.getElementById("expense-form");
  const expenseList = document.getElementById("expense-list");
  const totalExpenses = document.getElementById("total-expenses");
  const ctx = document.getElementById("expense-chart-canvas")?.getContext("2d");

  let expenses = [];

  // Categorías y datos iniciales (si usas un gráfico circular)
  const categories = ["transporte", "comidas", "alojamiento", "actividades", "otros"];
  const chartData = {
    labels: ["Transporte", "Comidas", "Alojamiento", "Actividades", "Otros"],
    datasets: [
      {
        data: [0, 0, 0, 0, 0],
        backgroundColor: ["#0077cc", "#ff6600", "#00bfff", "#66cc66", "#cccccc"],
      },
    ],
  };

  // Crear el gráfico si existe un canvas
  let expenseChart = null;
  if (ctx) {
    expenseChart = new Chart(ctx, {
      type: "pie",
      data: chartData,
      options: { responsive: true },
    });
  }

  // Función para actualizar el gráfico
  const updateChart = () => {
    if (!expenseChart) return; // si no hay canvas, salimos
    const categoryTotals = categories.map((cat) =>
      expenses
        .filter((exp) => exp.category === cat)
        .reduce((sum, exp) => sum + exp.amount, 0)
    );
    expenseChart.data.datasets[0].data = categoryTotals;
    expenseChart.update();
  };

  // Manejar envío de un nuevo gasto
  expenseForm?.addEventListener("submit", (e) => {
    e.preventDefault();

    const name = document.getElementById("expense-name").value;
    const category = document.getElementById("expense-category").value;
    const amount = parseFloat(document.getElementById("expense-amount").value);
    const currency = document.getElementById("expense-currency").value;
    const notes = document.getElementById("expense-notes").value;

    if (name && category && !isNaN(amount) && currency) {
      const expense = { name, category, amount, currency, notes };
      expenses.push(expense);

      // Mostrar en la lista
      const li = document.createElement("li");
      li.innerHTML = `
        <strong>${name}</strong> - ${amount} ${currency} (${category})
        <br>${notes ? notes : ""}
      `;
      expenseList.appendChild(li);

      // Calcular total
      const total = expenses.reduce((sum, exp) => sum + exp.amount, 0);
      totalExpenses.textContent = `Total: $${total.toFixed(2)}`;

      // Actualizar gráfico
      updateChart();
      expenseForm.reset();
    }
  });

  /************************************************************
   * CONVERSOR DE MONEDAS
   ************************************************************/
  const currencyForm = document.getElementById("currency-form");
  const conversionResult = document.getElementById("conversion-result");

  async function convertCurrency(amount, from, to) {
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
  }

  currencyForm?.addEventListener("submit", async (e) => {
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
});

 
