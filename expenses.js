document.addEventListener('DOMContentLoaded', () => {

  // Menú hamburguesa
  const menuToggle = document.getElementById('menu-toggle');
  const menu = document.getElementById('menu');
  menuToggle.addEventListener('click', () => menu.classList.toggle('active'));

  // Cambio entre pestañas
  const tabs = document.querySelectorAll('.tab-btn');
  const tabContents = document.querySelectorAll('.tab-content');

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');

      tabContents.forEach(content => content.classList.remove('active'));
      document.getElementById(`tab-${tab.dataset.tab}`).classList.add('active');
    });
  });

  // Cargar monedas en el conversor automáticamente
  const fromCurrency = document.getElementById('from-currency');
  const toCurrency = document.getElementById('to-currency');

  fetch('https://api.exchangerate.host/symbols')
    .then(res => res.json())
    .then(data => {
      Object.entries(data.symbols).forEach(([code, { description }]) => {
        const optionFrom = new Option(`${code} - ${description}`, code);
        const optionTo = new Option(`${code} - ${description}`, code);
        fromCurrency.appendChild(optionFrom);
        toCurrency.appendChild(optionTo);
      });
    });

  // Conversión de monedas
  document.getElementById('currency-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    const amount = document.getElementById('convert-amount').value;
    const from = fromCurrency.value;
    const to = toCurrency.value;

    const response = await fetch(`https://api.exchangerate.host/convert?from=${from}&to=${to}&amount=${amount}`);
    const result = await response.json();

    document.getElementById('conversion-result').textContent =
      `${amount} ${from} equivale a ${result.result.toFixed(2)} ${to}`;
  });

  // Gestión de gastos personales
  const expenseForm = document.getElementById('expense-form');
  const expenseList = document.getElementById('expense-list');
  const totalExpenses = document.getElementById('total-expenses');
  const ctx = document.getElementById('expense-chart-canvas').getContext('2d');

  let expenses = [];
  const categories = ['transporte', 'comidas', 'alojamiento', 'actividades', 'otros'];
  let expenseChart = new Chart(ctx, {
    type: 'pie',
    data: { labels: categories, datasets: [{ data: [0, 0, 0, 0, 0], backgroundColor: ['#0077cc', '#ff6600', '#00bfff', '#66cc66', '#cccccc'] }] }
  });

  expenseForm.addEventListener('submit', e => {
    e.preventDefault();
    const name = document.getElementById('expense-name').value;
    const category = document.getElementById('expense-category').value;
    const amount = parseFloat(document.getElementById('expense-amount').value);
    const currency = document.getElementById('expense-currency').value;
    const notes = document.getElementById('expense-notes').value;

    expenses.push({ name, category, amount, currency, notes });
    expenseList.innerHTML += `<li>${name}: ${amount} ${currency} (${category})<br>${notes}</li>`;

    const total = expenses.reduce((sum, exp) => sum + exp.amount, 0);
    totalExpenses.textContent = `Total: ${total.toFixed(2)} ${currency}`;

    const categoryTotals = categories.map(cat => expenses.filter(exp => exp.category === cat).reduce((sum, exp) => sum + exp.amount, 0));
    expenseChart.data.datasets[0].data = categoryTotals;
    expenseChart.update();

    expenseForm.reset();
  });

  // Gastos grupales (tipo Splitwise)
  const groupExpenseForm = document.getElementById('group-expense-form');
  const groupExpenseList = document.getElementById('group-expense-list');
  const groupTotal = document.getElementById('group-total');

  let groupExpenses = [];

  groupExpenseForm.addEventListener('submit', e => {
    e.preventDefault();
    const name = document.getElementById('group-name').value;
    const amount = parseFloat(document.getElementById('group-amount').value);
    const members = document.getElementById('group-members').value.split(',').map(m => m.trim());

    const amountPerMember = (amount / members.length).toFixed(2);
    groupExpenses.push({ name, amount, members, amountPerMember });

    groupExpenseList.innerHTML += `<li>${name}: ${amount.toFixed(2)} € dividido entre ${members.length} personas (${amountPerMember} € cada uno)</li>`;

    const total = groupExpenses.reduce((sum, exp) => sum + exp.amount, 0);
    groupTotal.textContent = `Total Grupal: ${total.toFixed(2)} €`;

    groupExpenseForm.reset();
  });
});
