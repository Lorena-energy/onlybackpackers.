// expenses.js actualizado para conversor + gastos personales + gastos grupales

document.addEventListener("DOMContentLoaded", () => {
  /************** MENU HAMBURGUESA ****************/ 
  const menuToggle = document.getElementById("menu-toggle");
  const menu = document.getElementById("menu");
  menuToggle?.addEventListener("click", () => menu.classList.toggle("active"));

  /************** TABS ****************/ 
  const tabButtons = document.querySelectorAll(".tab-btn");
  const tabContents = document.querySelectorAll(".tab-content");

  tabButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      tabButtons.forEach((b) => b.classList.remove("active"));
      tabContents.forEach((content) => content.classList.remove("active"));
      btn.classList.add("active");
      document.getElementById("tab-" + btn.dataset.tab).classList.add("active");
    });
  });

  /************** CONVERSOR DE MONEDA ****************/ 
  const currencyForm = document.getElementById("currency-form");
  const fromCurrency = document.getElementById("from-currency");
  const toCurrency = document.getElementById("to-currency");
  const conversionResult = document.getElementById("conversion-result");

  async function loadCurrencies() {
    const res = await fetch("https://api.exchangerate.host/symbols");
    const data = await res.json();
    Object.values(data.symbols).forEach(symbol => {
      const optionFrom = document.createElement("option");
      optionFrom.value = symbol.code;
      optionFrom.textContent = `${symbol.code} - ${symbol.description}`;
      fromCurrency.appendChild(optionFrom);

      const optionTo = document.createElement("option");
      optionTo.value = symbol.code;
      optionTo.textContent = `${symbol.code} - ${symbol.description}`;
      toCurrency.appendChild(optionTo);
    });
  }

  async function convertCurrency(amount, from, to) {
    const res = await fetch(`https://api.exchangerate.host/convert?from=${from}&to=${to}&amount=${amount}`);
    const data = await res.json();
    return data.result;
  }

  currencyForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const amount = parseFloat(document.getElementById("convert-amount").value);
    const from = fromCurrency.value;
    const to = toCurrency.value;
    if (isNaN(amount)) return;
    const result = await convertCurrency(amount, from, to);
    conversionResult.textContent = `${amount} ${from} = ${result.toFixed(2)} ${to}`;
  });

  loadCurrencies();

  /************** GASTOS PERSONALES ****************/ 
  const expenseForm = document.getElementById("expense-form");
  const expenseList = document.getElementById("expense-list");
  const totalExpenses = document.getElementById("total-expenses");
  const ctx = document.getElementById("expense-chart-canvas").getContext("2d");

  let expenses = [];

  const expenseChart = new Chart(ctx, {
    type: "pie",
    data: {
      labels: ["Transporte", "Comidas", "Alojamiento", "Actividades", "Otros"],
      datasets: [{
        data: [0, 0, 0, 0, 0],
        backgroundColor: ["#0077cc", "#ff6600", "#00bfff", "#66cc66", "#cccccc"]
      }]
    },
    options: { responsive: true }
  });

  function updatePersonalChart() {
    const totals = ["transporte", "comidas", "alojamiento", "actividades", "otros"].map(cat =>
      expenses.filter(exp => exp.category === cat).reduce((sum, exp) => sum + exp.amount, 0)
    );
    expenseChart.data.datasets[0].data = totals;
    expenseChart.update();
  }

  expenseForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const name = document.getElementById("expense-name").value;
    const category = document.getElementById("expense-category").value;
    const amount = parseFloat(document.getElementById("expense-amount").value);
    const currency = document.getElementById("expense-currency").value;
    const notes = document.getElementById("expense-notes").value;

    expenses.push({ name, category, amount, currency, notes });
    const li = document.createElement("li");
    li.innerHTML = `<strong>${name}</strong> - ${amount} ${currency} (${category}) ${notes ? `<br>${notes}` : ""}`;
    expenseList.appendChild(li);

    const total = expenses.reduce((sum, exp) => sum + exp.amount, 0);
    totalExpenses.textContent = `Total: ${total.toFixed(2)} €`;
    expenseForm.reset();
    updatePersonalChart();
  });

  /************** GASTOS GRUPALES ****************/ 
  const groupExpenseForm = document.getElementById("group-expense-form");
  const groupExpenseList = document.getElementById("group-expense-list");
  const groupTotal = document.getElementById("group-total");

  let groupExpenses = [];

  groupExpenseForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const name = document.getElementById("group-name").value;
    const amount = parseFloat(document.getElementById("group-amount").value);
    const members = document.getElementById("group-members").value.split(",").map(m => m.trim());

    const amountPerPerson = (amount / members.length).toFixed(2);
    members.forEach(member => {
      const li = document.createElement("li");
      li.textContent = `${member} debe pagar ${amountPerPerson} € por "${name}"`;
      groupExpenseList.appendChild(li);
    });

    groupExpenses.push({ name, amount, members });

    const total = groupExpenses.reduce((sum, exp) => sum + exp.amount, 0);
    groupTotal.textContent = `Total grupal: ${total.toFixed(2)} €`;

    groupExpenseForm.reset();
  });
});
