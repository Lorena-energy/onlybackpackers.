document.addEventListener('DOMContentLoaded', () => {

  /************************************************************
   * MENÚ HAMBURGUESA
   ************************************************************/
  const menuToggle = document.getElementById('menu-toggle');
  const menu = document.getElementById('menu');
  menuToggle?.addEventListener('click', () => menu.classList.toggle('active'));

  /************************************************************
   * PESTAÑAS
   ************************************************************/
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

  /************************************************************
   * CONVERSOR DE DIVISAS
   ************************************************************/
  const fromCurrency = document.getElementById('from-currency');
  const toCurrency = document.getElementById('to-currency');
  const conversionResult = document.getElementById('conversion-result');

  // Cargar las monedas automáticamente
  fetch('https://api.exchangerate.host/symbols')
    .then(res => res.json())
    .then(data => {
      Object.entries(data.symbols).forEach(([code, { description }]) => {
        const optionFrom = document.createElement('option');
        optionFrom.value = code;
        optionFrom.textContent = `${code} - ${description}`;
        fromCurrency.appendChild(optionFrom);

        const optionTo = document.createElement('option');
        optionTo.value = code;
        optionTo.textContent = `${code} - ${description}`;
        toCurrency.appendChild(optionTo);
      });
    });

  // Convertir monedas
  document.getElementById('currency-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    const amount = parseFloat(document.getElementById('convert-amount').value);
    const from = fromCurrency.value;
    const to = toCurrency.value;

    if (isNaN(amount) || amount <= 0) {
      conversionResult.textContent = "Por favor, introduce una cantidad válida.";
      return;
    }

    const response = await fetch(`https://api.exchangerate.host/convert?from=${from}&to=${to}&amount=${amount}`);
    const result = await response.json();

    if (result.result) {
      conversionResult.textContent = `${amount} ${from} equivalen a ${result.result.toFixed(2)} ${to}`;
    } else {
      conversionResult.textContent = "Error en la conversión.";
    }
  });

  /************************************************************
   * GASTOS PERSONALES
   ************************************************************/
  const expenseForm = document.getElementById('expense-form');
  const expenseList = document.getElementById('expense-list');
  const totalExpenses = document.getElementById('total-expenses');
  const ctx = document.getElementById('expense-chart-canvas')?.getContext('2d');

  let expenses = [];
  const categories = ["transporte", "comidas", "alojamiento", "actividades", "otros"];

  const expenseChart = new Chart(ctx, {
    type: 'pie',
    data: {
      labels: categories,
      datasets: [{
        data: [0, 0, 0, 0, 0],
        backgroundColor: ['#0077cc', '#ff6600', '#00bfff', '#66cc66', '#cccccc']
      }]
    },
    options: { responsive: true }
  });

  expenseForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = document.getElementById('expense-name').value.trim();
    const category = document.getElementById('expense-category').value;
    const amount = parseFloat(document.getElementById('expense-amount').value);
    const currency = document.getElementById('expense-currency').value.trim();
    const notes = document.getElementById('expense-notes').value.trim();

    if (!name || !category || isNaN(amount) || !currency) {
      alert('Por favor, completa todos los campos obligatorios.');
      return;
    }

    expenses.push({ name, category, amount, currency, notes });

    const li = document.createElement('li');
    li.innerHTML = `<strong>${name}</strong> - ${amount} ${currency} (${category})<br>${notes ? notes : ""}`;
    expenseList.appendChild(li);

    const total = expenses.reduce((sum, exp) => sum + exp.amount, 0);
    totalExpenses.textContent = `Total: ${total.toFixed(2)} ${currency}`;

    const categoryTotals = categories.map(cat =>
      expenses.filter(exp => exp.category === cat).reduce((sum, exp) => sum + exp.amount, 0)
    );
    expenseChart.data.datasets[0].data = categoryTotals;
    expenseChart.update();

    expenseForm.reset();
  });

  /************************************************************
   * GASTOS GRUPALES (tipo Splitwise)
   ************************************************************/
  const groupExpenseForm = document.getElementById('group-expense-form');
  const groupExpenseList = document.getElementById('group-expense-list');
  const groupDebtsList = document.getElementById('group-debts-list');
  const groupTotal = document.getElementById('group-total');

  let groupExpenses = [];

  groupExpenseForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = document.getElementById('group-name').value.trim();
    const amount = parseFloat(document.getElementById('group-amount').value);
    const members = document.getElementById('group-members').value.split(',').map(m => m.trim());

    if (!name || isNaN(amount) || members.length < 2) {
      alert('Completa bien el nombre, cantidad y mínimo dos miembros.');
      return;
    }

    const amountPerMember = (amount / members.length).toFixed(2);

    groupExpenses.push({ name, amount, members, amountPerMember });

    const li = document.createElement('li');
    li.innerHTML = `<strong>${name}</strong>: ${amount.toFixed(2)} dividido entre ${members.length} personas (${amountPerMember} cada uno)<br><em>Participantes:</em> ${members.join(', ')}`;
    groupExpenseList.appendChild(li);

    const total = groupExpenses.reduce((sum, exp) => sum + exp.amount, 0);
    groupTotal.textContent = `Total Grupal: ${total.toFixed(2)}`;

    // Cálculo de deudas (sencillo)
    const debts = {};
    members.forEach(member => debts[member] = debts[member] ? debts[member] + parseFloat(amountPerMember) : parseFloat(amountPerMember));

    groupDebtsList.innerHTML = '';
    for (const [member, debt] of Object.entries(debts)) {
      const liDebt = document.createElement('li');
      liDebt.textContent = `${member} debe pagar ${debt.toFixed(2)}`;
      groupDebtsList.appendChild(liDebt);
    }

    groupExpenseForm.reset();
  });

});
