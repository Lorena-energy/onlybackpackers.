document.addEventListener('DOMContentLoaded', () => {

  // ===== MENÚ HAMBURGUESA =====
  const menuToggle = document.getElementById('menu-toggle');
  const menu = document.getElementById('menu');
  menuToggle.addEventListener('click', () => menu.classList.toggle('active'));

  // ===== PESTAÑAS =====
  const tabs = document.querySelectorAll('.tab-btn');
  const tabContents = document.querySelectorAll('.tab-content');

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('active'));
      tabContents.forEach(c => c.classList.remove('active'));

      tab.classList.add('active');
      document.getElementById(`tab-${tab.dataset.tab}`).classList.add('active');
    });
  });

  // ===== CARGAR MONEDAS EN CONVERSOR =====
  const fromCurrency = document.getElementById('from-currency');
  const toCurrency = document.getElementById('to-currency');

  fetch('https://api.exchangerate.host/symbols')
    .then(res => res.json())
    .then(data => {
      if (data.symbols) {
        Object.entries(data.symbols).forEach(([code, { description }]) => {
          const option1 = document.createElement('option');
          option1.value = code;
          option1.textContent = `${code} - ${description}`;
          fromCurrency.appendChild(option1);

          const option2 = document.createElement('option');
          option2.value = code;
          option2.textContent = `${code} - ${description}`;
          toCurrency.appendChild(option2);
        });
      }
    })
    .catch(error => {
      console.error("Error cargando monedas:", error);
    });

  // ===== CONVERTIR MONEDA =====
  document.getElementById('currency-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    const amount = parseFloat(document.getElementById('convert-amount').value);
    const from = fromCurrency.value;
    const to = toCurrency.value;

    if (isNaN(amount) || !from || !to) {
      document.getElementById('conversion-result').textContent = "Por favor, completa todos los campos.";
      return;
    }

    try {
      const response = await fetch(`https://api.exchangerate.host/convert?from=${from}&to=${to}&amount=${amount}`);
      const result = await response.json();
      if (result.result !== undefined) {
        document.getElementById('conversion-result').textContent =
          `${amount} ${from} equivale a ${result.result.toFixed(2)} ${to}`;
      } else {
        document.getElementById('conversion-result').textContent = "Error en la conversión.";
      }
    } catch (err) {
      console.error("Error al convertir moneda:", err);
    }
  });

  // ===== GESTIÓN GASTOS PERSONALES =====
  const expenseForm = document.getElementById('expense-form');
  const expenseList = document.getElementById('expense-list');
  const totalExpenses = document.getElementById('total-expenses');
  const ctx = document.getElementById('expense-chart-canvas')?.getContext('2d');

  let expenses = [];

  const categories = ["transporte", "comidas", "alojamiento", "actividades", "otros"];
  let expenseChart = new Chart(ctx, {
    type: 'pie',
    data: {
      labels: categories,
      datasets: [{
        data: [0, 0, 0, 0, 0],
        backgroundColor: ['#0077cc', '#ff6600', '#00bfff', '#66cc66', '#cccccc'],
      }],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false
    }
  });

  expenseForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('expense-name').value;
    const category = document.getElementById('expense-category').value;
    const amount = parseFloat(document.getElementById('expense-amount').value);
    const currency = document.getElementById('expense-currency').value;
    const notes = document.getElementById('expense-notes').value;

    if (!name || !category || isNaN(amount) || !currency) {
      alert('Completa todos los campos obligatorios.');
      return;
    }

    expenses.push({ name, category, amount, currency, notes });

    const li = document.createElement('li');
    li.innerHTML = `<strong>${name}</strong>: ${amount} ${currency} (${category})<br>${notes || ""}`;
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

  // ===== GASTOS GRUPALES =====
  const groupExpenseForm = document.getElementById('group-expense-form');
  const groupExpenseList = document.getElementById('group-expense-list');
  const groupTotal = document.getElementById('group-total');

  let groupExpenses = [];

  groupExpenseForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('group-name').value;
    const amount = parseFloat(document.getElementById('group-amount').value);
    const members = document.getElementById('group-members').value.split(',').map(m => m.trim()).filter(m => m);

    if (!name || isNaN(amount) || members.length === 0) {
      alert('Completa correctamente los campos.');
      return;
    }

    const amountPerMember = (amount / members.length).toFixed(2);

    groupExpenses.push({ name, amount, members, amountPerMember });

    const li = document.createElement('li');
    li.innerHTML = `
      <strong>${name}</strong>: ${amount.toFixed(2)} dividido entre ${members.length} personas
      (Cada uno paga: ${amountPerMember})
      <br><em>Participantes: ${members.join(', ')}</em>
    `;
    groupExpenseList.appendChild(li);

    const total = groupExpenses.reduce((sum, exp) => sum + exp.amount, 0);
    groupTotal.textContent = `Total Grupal: ${total.toFixed(2)}`;

    groupExpenseForm.reset();
  });

});
