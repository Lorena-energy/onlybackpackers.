document.addEventListener('DOMContentLoaded', () => {

  // Menú hamburguesa
  const menuToggle = document.getElementById('menu-toggle');
  const menu = document.getElementById('menu');
  menuToggle?.addEventListener('click', () => menu.classList.toggle('active'));

  // Cargar monedas automáticamente (Frankfurter API)
  const fromCurrency = document.getElementById('from-currency');
  const toCurrency = document.getElementById('to-currency');

  fetch('https://api.frankfurter.app/currencies')
    .then(res => res.json())
    .then(data => {
      Object.entries(data).forEach(([code, name]) => {
        const optionFrom = document.createElement('option');
        optionFrom.value = code;
        optionFrom.textContent = `${code} - ${name}`;

        const optionTo = document.createElement('option');
        optionTo.value = code;
        optionTo.textContent = `${code} - ${name}`;

        fromCurrency.appendChild(optionFrom);
        toCurrency.appendChild(optionTo);
      });
    })
    .catch(err => {
      console.error('Error al cargar las monedas:', err);
    });

  // Conversor de monedas
  document.getElementById('currency-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    const amount = document.getElementById('convert-amount').value;
    const from = fromCurrency.value;
    const to = toCurrency.value;

    if (!amount || !from || !to) {
      alert('Por favor, completa todos los campos.');
      return;
    }

    try {
      const response = await fetch(`https://api.frankfurter.app/latest?amount=${amount}&from=${from}&to=${to}`);
      const data = await response.json();
      const result = data.rates[to];

      document.getElementById('conversion-result').textContent = 
        `${amount} ${from} equivalen a ${result.toFixed(2)} ${to}`;
    } catch (err) {
      console.error('Error al convertir moneda:', err);
      document.getElementById('conversion-result').textContent = '❌ Error al convertir.';
    }
  });

  // Gestión de gastos personales
  const expenseForm = document.getElementById('expense-form');
  const expenseList = document.getElementById('expense-list');
  const totalExpenses = document.getElementById('total-expenses');
  const ctx = document.getElementById('expense-chart-canvas')?.getContext('2d');

  let expenses = [];

  const categories = ['transporte', 'comidas', 'alojamiento', 'actividades', 'otros'];
  let expenseChart = ctx ? new Chart(ctx, {
    type: 'pie',
    data: {
      labels: categories,
      datasets: [{
        data: [0, 0, 0, 0, 0],
        backgroundColor: ['#0077cc', '#ff6600', '#00bfff', '#66cc66', '#cccccc'],
      }]
    }
  }) : null;

  expenseForm?.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('expense-name').value;
    const category = document.getElementById('expense-category').value;
    const amount = parseFloat(document.getElementById('expense-amount').value);
    const currency = document.getElementById('expense-currency').value;
    const notes = document.getElementById('expense-notes').value;

    if (!name || !category || isNaN(amount) || !currency) {
      alert('Por favor, completa todos los campos obligatorios.');
      return;
    }

    expenses.push({ name, category, amount, currency, notes });
    const li = document.createElement('li');
    li.innerHTML = `<strong>${name}</strong> - ${amount} ${currency} (${category})${notes ? `<br>${notes}` : ''}`;
    expenseList.appendChild(li);

    const total = expenses.reduce((sum, exp) => sum + exp.amount, 0);
    totalExpenses.textContent = `Total: ${total.toFixed(2)} ${currency}`;

    if (expenseChart) {
      const categoryTotals = categories.map(cat =>
        expenses.filter(exp => exp.category === cat).reduce((sum, exp) => sum + exp.amount, 0)
      );
      expenseChart.data.datasets[0].data = categoryTotals;
      expenseChart.update();
    }

    expenseForm.reset();
  });

  // Gestión de gastos grupales
  const groupExpenseForm = document.getElementById('group-expense-form');
  const groupExpenseList = document.getElementById('group-expense-list');
  const groupTotal = document.getElementById('group-total');

  let groupExpenses = [];

  groupExpenseForm?.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('group-name').value;
    const amount = parseFloat(document.getElementById('group-amount').value);
    const members = document.getElementById('group-members').value.split(',').map(m => m.trim());

    if (!name || isNaN(amount) || members.length === 0) {
      alert('Por favor, completa todos los campos.');
      return;
    }

    const amountPerMember = (amount / members.length).toFixed(2);
    groupExpenses.push({ name, amount, members, amountPerMember });

    const li = document.createElement('li');
    li.innerHTML = `<strong>${name}</strong>: ${amount.toFixed(2)} dividido entre ${members.length} personas (cada uno paga: ${amountPerMember})<br>Participantes: ${members.join(', ')}`;
    groupExpenseList.appendChild(li);

    const total = groupExpenses.reduce((sum, exp) => sum + exp.amount, 0);
    groupTotal.textContent = `Total Grupal: ${total.toFixed(2)}`;

    groupExpenseForm.reset();
  });

});
