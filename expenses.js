document.addEventListener('DOMContentLoaded', () => {

  /************************************************************
   * MENÚ HAMBURGUESA
   ************************************************************/
  const menuToggle = document.getElementById('menu-toggle');
  const menu = document.getElementById('menu');
  menuToggle?.addEventListener('click', () => menu.classList.toggle('active'));

  /************************************************************
   * CAMBIO ENTRE PESTAÑAS
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
   * CONVERSOR DE MONEDAS
   ************************************************************/
  const fromCurrency = document.getElementById('from-currency');
  const toCurrency = document.getElementById('to-currency');
  const currencyForm = document.getElementById('currency-form');
  const conversionResult = document.getElementById('conversion-result');

  // Cargar monedas automáticamente
  fetch('https://api.exchangerate.host/symbols')
    .then(res => res.json())
    .then(data => {
      Object.entries(data.symbols).forEach(([code, { description }]) => {
        const optionFrom = document.createElement('option');
        optionFrom.value = code;
        optionFrom.textContent = `${code} - ${description}`;

        const optionTo = document.createElement('option');
        optionTo.value = code;
        optionTo.textContent = `${code} - ${description}`;

        fromCurrency.appendChild(optionFrom);
        toCurrency.appendChild(optionTo);
      });
    });

  // Realizar conversión
  currencyForm?.addEventListener('submit', async (e) => {
    e.preventDefault();
    const amount = document.getElementById('convert-amount').value;
    const from = fromCurrency.value;
    const to = toCurrency.value;

    try {
      const response = await fetch(`https://api.exchangerate.host/convert?from=${from}&to=${to}&amount=${amount}`);
      const data = await response.json();

      if (data.result !== undefined) {
        conversionResult.textContent = `${amount} ${from} equivale a ${data.result.toFixed(2)} ${to}`;
      } else {
        conversionResult.textContent = 'Error en la conversión.';
      }
    } catch (error) {
      console.error('Error en la conversión:', error);
      conversionResult.textContent = 'Error al obtener tasas.';
    }
  });

  /************************************************************
   * GESTIÓN DE GASTOS PERSONALES
   ************************************************************/
  const expenseForm = document.getElementById('expense-form');
  const expenseList = document.getElementById('expense-list');
  const totalExpenses = document.getElementById('total-expenses');
  const ctx = document.getElementById('expense-chart-canvas')?.getContext('2d');

  let expenses = [];
  const categories = ['transporte', 'comidas', 'alojamiento', 'actividades', 'otros'];
  let expenseChart = null;

  if (ctx) {
    expenseChart = new Chart(ctx, {
      type: 'pie',
      data: {
        labels: categories,
        datasets: [{
          data: [0, 0, 0, 0, 0],
          backgroundColor: ['#0077cc', '#ff6600', '#00bfff', '#66cc66', '#cccccc'],
        }]
      },
      options: {
        responsive: true,
      }
    });
  }

  expenseForm?.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = document.getElementById('expense-name').value.trim();
    const category = document.getElementById('expense-category').value;
    const amount = parseFloat(document.getElementById('expense-amount').value);
    const currency = document.getElementById('expense-currency').value.trim();
    const notes = document.getElementById('expense-notes').value.trim();

    if (name && category && !isNaN(amount) && currency) {
      const expense = { name, category, amount, currency, notes };
      expenses.push(expense);

      // Añadir a la lista
      const li = document.createElement('li');
      li.innerHTML = `<strong>${name}</strong> - ${amount} ${currency} (${category})<br>${notes}`;
      expenseList.appendChild(li);

      // Calcular total
      const total = expenses.reduce((sum, exp) => sum + exp.amount, 0);
      totalExpenses.textContent = `Total: ${total.toFixed(2)} ${currency}`;

      // Actualizar gráfico
      const categoryTotals = categories.map(cat =>
        expenses.filter(exp => exp.category === cat).reduce((sum, exp) => sum + exp.amount, 0)
      );
      expenseChart.data.datasets[0].data = categoryTotals;
      expenseChart.update();

      // Resetear formulario
      expenseForm.reset();
    }
  });

  /************************************************************
   * GESTIÓN DE GASTOS GRUPALES
   ************************************************************/
  const groupExpenseForm = document.getElementById('group-expense-form');
  const groupExpenseList = document.getElementById('group-expense-list');
  const groupTotal = document.getElementById('group-total');

  let groupExpenses = [];

  groupExpenseForm?.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = document.getElementById('group-name').value.trim();
    const amount = parseFloat(document.getElementById('group-amount').value);
    const members = document.getElementById('group-members').value.split(',').map(m => m.trim()).filter(m => m);

    if (name && !isNaN(amount) && members.length > 0) {
      const amountPerMember = (amount / members.length).toFixed(2);

      const groupExpense = { name, amount, members, amountPerMember };
      groupExpenses.push(groupExpense);

      // Añadir a la lista
      const li = document.createElement('li');
      li.innerHTML = `
        <strong>${name}</strong>: ${amount.toFixed(2)} dividido entre ${members.length} personas
        <br><em>Cada uno paga:</em> ${amountPerMember}
        <br><em>Participantes:</em> ${members.join(', ')}
      `;
      groupExpenseList.appendChild(li);

      // Calcular total
      const totalGroup = groupExpenses.reduce((sum, exp) => sum + exp.amount, 0);
      groupTotal.textContent = `Total Grupal: ${totalGroup.toFixed(2)}`;

      // Resetear formulario
      groupExpenseForm.reset();
    }
  });

});
