// expenses.js actualizado con exchangerate.host y estructura limpia + gastos grupales

document.addEventListener("DOMContentLoaded", () => {
  // MENÚ HAMBURGUESA
  const menuToggle = document.getElementById("menu-toggle");
  const menu = document.getElementById("menu");
  menuToggle?.addEventListener("click", () => {
    menu.classList.toggle("active");
  });

  // CONVERSOR DE MONEDA CON exchangerate.host
  const currencyForm = document.getElementById("currency-form");
  const conversionResult = document.getElementById("conversion-result");

  async function loadCurrencyOptions() {
    try {
      const res = await fetch('https://api.exchangerate.host/symbols');
      const data = await res.json();
      const symbols = data.symbols;

      const fromSelect = document.getElementById('from-currency');
      const toSelect = document.getElementById('to-currency');
      fromSelect.innerHTML = '';
      toSelect.innerHTML = '';

      for (const code in symbols) {
        const option = document.createElement('option');
        option.value = code;
        option.textContent = `${code} - ${symbols[code].description}`;
        fromSelect.appendChild(option.cloneNode(true));
        toSelect.appendChild(option);
      }

      fromSelect.value = 'EUR';
      toSelect.value = 'USD';
    } catch (err) {
      console.error('Error al cargar monedas:', err);
    }
  }

  loadCurrencyOptions();

  async function convertCurrency(amount, from, to) {
    try {
      const response = await fetch(`https://api.exchangerate.host/convert?from=${from}&to=${to}&amount=${amount}`);
      const data = await response.json();
      return data.result.toFixed(2);
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

  // FORMULARIO DE GASTOS PERSONALES
  const expenseForm = document.getElementById("expense-form");
  const expenseList = document.getElementById("expense-list");
  const totalExpenses = document.getElementById("total-expenses");
  const ctx = document.getElementById("expense-chart-canvas")?.getContext("2d");

  let expenses = [];
  const categories = ["transporte", "comidas", "alojamiento", "actividades", "otros"];
  const chartData = {
    labels: ["Transporte", "Comidas", "Alojamiento", "Actividades", "Otros"],
    datasets: [{
      data: [0, 0, 0, 0, 0],
      backgroundColor: ["#0077cc", "#ff6600", "#00bfff", "#66cc66", "#cccccc"],
    }],
  };

  let expenseChart = null;
  if (ctx) {
    expenseChart = new Chart(ctx, {
      type: "pie",
      data: chartData,
      options: { responsive: true },
    });
  }

  const updateChart = () => {
    if (!expenseChart) return;
    const categoryTotals = categories.map((cat) =>
      expenses.filter((exp) => exp.category === cat).reduce((sum, exp) => sum + exp.amount, 0)
    );
    expenseChart.data.datasets[0].data = categoryTotals;
    expenseChart.update();
  };

  expenseForm?.addEventListener("submit", (e) => {
    e.preventDefault();
    const name = document.getElementById("expense-name").value.trim();
    const category = document.getElementById("expense-category").value;
    const amount = parseFloat(document.getElementById("expense-amount").value);
    const currency = document.getElementById("expense-currency").value.trim();
    const notes = document.getElementById("expense-notes").value.trim();

    if (name && category && !isNaN(amount) && currency) {
      const expense = { name, category, amount, currency, notes };
      expenses.push(expense);

      const li = document.createElement("li");
      li.innerHTML = `<strong>${name}</strong> - ${amount} ${currency} (${category})<br>${notes ? notes : ""}`;
      expenseList.appendChild(li);

      const total = expenses.reduce((sum, exp) => sum + exp.amount, 0);
      totalExpenses.textContent = `Total: $${total.toFixed(2)}`;

      updateChart();
      expenseForm.reset();
    }
  });

  // GASTOS GRUPALES
  const groupForm = document.getElementById("group-expense-form");
  const groupList = document.getElementById("group-expense-list");
  const groupTotal = document.getElementById("group-total");

  let groupExpenses = [];

  groupForm?.addEventListener("submit", (e) => {
    e.preventDefault();
    const name = document.getElementById("group-name").value.trim();
    const amount = parseFloat(document.getElementById("group-amount").value);
    const members = document.getElementById("group-members").value.trim().split(",").map(m => m.trim()).filter(Boolean);

    if (name && members.length && !isNaN(amount)) {
      const perPerson = (amount / members.length).toFixed(2);
      groupExpenses.push({ name, amount, members });

      const li = document.createElement("li");
      li.innerHTML = `<strong>${name}</strong> - ${amount}€ dividido entre ${members.length} personas (${perPerson}€ cada una)`;
      groupList.appendChild(li);

      const total = groupExpenses.reduce((sum, exp) => sum + exp.amount, 0);
      groupTotal.textContent = `Total grupal: ${total.toFixed(2)}€`;

      groupForm.reset();
    }
  });
});
