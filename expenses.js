document.addEventListener('DOMContentLoaded', () => {
  /****************** MENÚ HAMBURGUESA ******************/
  const menuToggle = document.getElementById('menu-toggle');
  const menu = document.getElementById('menu');
  menuToggle.addEventListener('click', () => {
    menu.classList.toggle('active');
  });

  /****************** CONVERSOR DE MONEDAS ******************/
  const currencyForm = document.getElementById('currency-form');
  const fromCurrency = document.getElementById('from-currency');
  const toCurrency = document.getElementById('to-currency');
  const conversionResult = document.getElementById('conversion-result');

  // Cargar monedas
  fetch('https://api.exchangerate.host/symbols')
    .then(response => response.json())
    .then(data => {
      Object.keys(data.symbols).forEach(code => {
        const option1 = document.createElement('option');
        option1.value = code;
        option1.textContent = `${code} - ${data.symbols[code].description}`;
        fromCurrency.appendChild(option1);

        const option2 = document.createElement('option');
        option2.value = code;
        option2.textContent = `${code} - ${data.symbols[code].description}`;
        toCurrency.appendChild(option2);
      });
    });

  // Convertir moneda
  currencyForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const amount = document.getElementById('convert-amount').value;
    const from = fromCurrency.value;
    const to = toCurrency.value;

    const res = await fetch(`https://api.exchangerate.host/convert?from=${from}&to=${to}&amount=${amount}`);
    const data = await res.json();

    if (data.result) {
      conversionResult.textContent = `${amount} ${from} ≈ ${data.result.toFixed(2)} ${to}`;
    } else {
      conversionResult.textContent = '❌ Error al convertir';
    }
  });

  /****************** GASTOS PERSONALES ******************/
  const expenseForm = document.getElementById('expense-form');
  const expenseList = document.getElementById('expense-list');
  const totalExpenses = document.getElementById('total-expenses');
  const ctx = document.getElementById('expense-chart-canvas').getContext('2d');

  let expenses = [];
  const categories = ['transporte', 'comidas', 'alojamiento', 'actividades', 'otros'];

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

  expenseForm.addEventListener('submit', e => {
    e.preventDefault();

    const name = document.getElementById('expense-name').value;
    const category = document.getElementById('expense-category').value;
    const amount = parseFloat(document.getElementById('expense-amount').value);
    const currency = document.getElementById('expense-currency').value;
    const notes = document.getElementById('expense-notes').value;

    expenses.push({ name, category, amount, currency, notes });

    const li = document.createElement('li');
    li.innerHTML = `<strong>${name}</strong> - ${amount} ${currency} (${category})<br>${notes}`;
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

  /****************** GASTOS GRUPALES ******************/
  const groupExpenseForm = document.getElementById('group-expense-form');
  const groupExpenseList = document.getElementById('group-expense-list');
  const groupDebtsList = document.getElementById('group-debts-list');

  let groupExpenses = [];

  groupExpenseForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = document.getElementById('group-expense-name').value;
    const amount = parseFloat(document.getElementById('group-expense-amount').value);
    const members = document.getElementById('group-members').value.split(',').map(m => m.trim());

    if (members.length < 2) {
      alert('Introduce al menos dos participantes.');
      return;
    }

    const share = amount / members.length;

    members.forEach(member => {
      const existing = groupExpenses.find(g => g.member === member);
      if (existing) {
        existing.amount += share;
      } else {
        groupExpenses.push({ member, amount: share });
      }
    });

    const li = document.createElement('li');
    li.textContent = `${name}: ${amount.toFixed(2)}€ dividido entre ${members.join(', ')}`;
    groupExpenseList.appendChild(li);

    updateGroupDebts();
    groupExpenseForm.reset();
  });

  function updateGroupDebts() {
    groupDebtsList.innerHTML = '';

    const average = groupExpenses.reduce((sum, g) => sum + g.amount, 0) / groupExpenses.length;

    groupExpenses.forEach(g => {
      const balance = g.amount - average;
      const li = document.createElement('li');
      if (balance > 0.01) {
        li.textContent = `${g.member} debe recibir ${balance.toFixed(2)}€`;
      } else if (balance < -0.01) {
        li.textContent = `${g.member} debe pagar ${Math.abs(balance).toFixed(2)}€`;
      } else {
        li.textContent = `${g.member} está equilibrado.`;
      }
      groupDebtsList.appendChild(li);
    });
  }
});
