document.addEventListener('DOMContentLoaded', () => {
  // Menú hamburguesa
  const menuToggle = document.getElementById('menu-toggle');
  const menu = document.getElementById('menu');
  menuToggle.addEventListener('click', () => menu.classList.toggle('active'));

  // Pestañas (personal/grupal/conversor)
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

  // Conversor de monedas con exchangerate.host
  const fromCurrency = document.getElementById('from-currency');
  const toCurrency = document.getElementById('to-currency');

  fetch('https://api.exchangerate.host/symbols')
    .then(res => res.json())
    .then(data => {
      Object.entries(data.symbols).forEach(([code, { description }]) => {
        fromCurrency.innerHTML += `<option value="${code}">${code} - ${description}</option>`;
        toCurrency.innerHTML += `<option value="${code}">${code} - ${description}</option>`;
      });
    });

  document.getElementById('currency-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    const amount = document.getElementById('convert-amount').value;
    const from = fromCurrency.value;
    const to = toCurrency.value;
    const response = await fetch(`https://api.exchangerate.host/convert?from=${from}&to=${to}&amount=${amount}`);
    const result = await response.json();
    document.getElementById('conversion-result').textContent =
      `${amount} ${from} = ${result.result.toFixed(2)} ${to}`;
  });

  // Gastos personales
  const expenseForm = document.getElementById('expense-form');
  const expenseList = document.getElementById('expense-list');
  const totalExpenses = document.getElementById('total-expenses');
  const ctx = document.getElementById('expense-chart-canvas').getContext('2d');
  const categories = ['transporte', 'comidas', 'alojamiento', 'actividades', 'otros'];
  let expenses = [];

  const expenseChart = new Chart(ctx, {
    type: 'pie',
    data: { labels: categories, datasets: [{ data: [0, 0, 0, 0, 0], backgroundColor: ['#0077cc', '#ff6600', '#00bfff', '#66cc66', '#cccccc'] }] }
  });

  expenseForm.addEventListener('submit', e => {
    e.preventDefault();
    const expense = {
      name: document.getElementById('expense-name').value,
      category: document.getElementById('expense-category').value,
      amount: parseFloat(document.getElementById('expense-amount').value),
      currency: document.getElementById('expense-currency').value,
      notes: document.getElementById('expense-notes').value
    };
    expenses.push(expense);

    expenseList.innerHTML += `<li>${expense.name}: ${expense.amount} ${expense.currency} (${expense.category})<br>${expense.notes}</li>`;
    const total = expenses.reduce((acc, curr) => acc + curr.amount, 0);
    totalExpenses.textContent = `Total: ${total.toFixed(2)} ${expense.currency}`;

    const totals = categories.map(cat => expenses.filter(e => e.category === cat).reduce((acc, cur) => acc + cur.amount, 0));
    expenseChart.data.datasets[0].data = totals;
    expenseChart.update();
    expenseForm.reset();
  });

  // Gastos grupales (similar a Splitwise)
  const groupExpenseForm = document.getElementById('group-expense-form');
  const groupExpenseList = document.getElementById('group-expense-list');
  const groupTotal = document.getElementById('group-total');
  const groupBalances = document.getElementById('group-balances');

  let groupExpenses = [];
  let balances = {};

  const updateBalances = () => {
    balances = {};
    groupExpenses.forEach(expense => {
      const perPerson = expense.amount / expense.members.length;
      expense.members.forEach(member => {
        balances[member] = (balances[member] || 0) - perPerson;
      });
      balances[expense.paidBy] += expense.amount;
    });

    let balancesHtml = '';
    Object.entries(balances).forEach(([person, balance]) => {
      const status = balance < 0 ? 'debe' : 'recibe';
      balancesHtml += `<li>${person} ${status}: ${Math.abs(balance).toFixed(2)}</li>`;
    });
    groupBalances.innerHTML = balancesHtml;
  };

  groupExpenseForm.addEventListener('submit', e => {
    e.preventDefault();
    const expense = {
      name: document.getElementById('group-name').value,
      amount: parseFloat(document.getElementById('group-amount').value),
      paidBy: document.getElementById('group-paidBy').value,
      members: document.getElementById('group-members').value.split(',').map(m => m.trim())
    };
    groupExpenses.push(expense);
    groupExpenseList.innerHTML += `<li><strong>${expense.name}</strong>: ${expense.amount.toFixed(2)} pagado por ${expense.paidBy} (Participantes: ${expense.members.join(', ')})</li>`;

    const total = groupExpenses.reduce((acc, curr) => acc + curr.amount, 0);
    groupTotal.textContent = `Total Grupal: ${total.toFixed(2)}`;
    updateBalances();
    groupExpenseForm.reset();
  });

  // Registrar pagos directos para saldar deudas
  document.getElementById('payment-form').addEventListener('submit', e => {
    e.preventDefault();
    const from = document.getElementById('payment-from').value;
    const to = document.getElementById('payment-to').value;
    const amount = parseFloat(document.getElementById('payment-amount').value);

    balances[from] += amount;
    balances[to] -= amount;

    groupBalances.innerHTML += `<li>${from} pagó ${amount.toFixed(2)} a ${to}</li>`;
    updateBalances();
    e.target.reset();
  });
});
