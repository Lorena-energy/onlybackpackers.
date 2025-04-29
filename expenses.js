document.addEventListener('DOMContentLoaded', () => {
  /************************************************************
   * MENÚ HAMBURGUESA
   ************************************************************/
  const menuToggle = document.getElementById('menu-toggle');
  const menu = document.getElementById('menu');
  menuToggle?.addEventListener('click', () => {
    menu.classList.toggle('active');
  });

  /************************************************************
   * GASTOS PERSONALES
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
      options: { responsive: true }
    });
  }

  expenseForm?.addEventListener('submit', (e) => {
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

    const expense = { name, category, amount, currency, notes };
    expenses.push(expense);

    const li = document.createElement('li');
    li.innerHTML = `<strong>${name}</strong> - ${amount} ${currency} (${category})<br>${notes ? notes : ""}`;
    expenseList.appendChild(li);

    const total = expenses.reduce((sum, exp) => sum + exp.amount, 0);
    totalExpenses.textContent = `Total: ${total.toFixed(2)} ${currency}`;

    const categoryTotals = categories.map(cat => expenses
      .filter(exp => exp.category === cat)
      .reduce((sum, exp) => sum + exp.amount, 0));
    expenseChart.data.datasets[0].data = categoryTotals;
    expenseChart.update();

    expenseForm.reset();
  });

  /************************************************************
   * GASTOS GRUPALES (VERSIÓN MEJORADA)
   ************************************************************/
  const createGroupForm = document.getElementById('create-group-form');
  const groupsContainer = document.getElementById('groups-container');
  const groupTotal = document.getElementById('group-total');

  let groups = [];

  createGroupForm?.addEventListener('submit', (e) => {
    e.preventDefault();
    const groupName = document.getElementById('group-name').value.trim();
    const membersInput = document.getElementById('group-members').value.trim();
    const members = membersInput.split(',').map(m => m.trim()).filter(m => m);

    if (!groupName || members.length === 0) {
      alert('Por favor, introduce el nombre del grupo y al menos un participante.');
      return;
    }

    const group = {
      name: groupName,
      members,
      expenses: []
    };

    groups.push(group);
    renderGroups();
    createGroupForm.reset();
  });

  function renderGroups() {
    groupsContainer.innerHTML = '';

    groups.forEach((group, index) => {
      const groupDiv = document.createElement('div');
      groupDiv.classList.add('group');

      groupDiv.innerHTML = `
        <h3>${group.name}</h3>
        <p>Participantes: ${group.members.join(', ')}</p>
        <form class="add-expense-form" data-group-index="${index}">
          <input type="text" placeholder="Concepto del gasto" required />
          <input type="number" placeholder="Cantidad" required />
          <select multiple required>
            ${group.members.map(member => `<option value="${member}">${member}</option>`).join('')}
          </select>
          <button type="submit">Añadir Gasto</button>
        </form>
        <ul class="group-expenses">
          ${group.expenses.map(exp => `<li>${exp.name}: ${exp.amount}€ (${exp.paidBy.join(', ')})</li>`).join('')}
        </ul>
      `;

      groupsContainer.appendChild(groupDiv);
    });

    addExpenseFormListeners();
  }

  function addExpenseFormListeners() {
    const expenseForms = document.querySelectorAll('.add-expense-form');
    expenseForms.forEach(form => {
      form.addEventListener('submit', (e) => {
        e.preventDefault();
        const index = form.dataset.groupIndex;
        const name = form.querySelector('input[type="text"]').value;
        const amount = parseFloat(form.querySelector('input[type="number"]').value);
        const paidBy = Array.from(form.querySelector('select').selectedOptions).map(opt => opt.value);

        if (!name || isNaN(amount) || paidBy.length === 0) {
          alert('Completa todos los campos del gasto grupal.');
          return;
        }

        groups[index].expenses.push({ name, amount, paidBy });
        renderGroups();
        updateGroupTotals();
      });
    });
  }

  function updateGroupTotals() {
    let total = 0;
    groups.forEach(group => {
      total += group.expenses.reduce((sum, exp) => sum + exp.amount, 0);
    });
    groupTotal.textContent = `Total Grupal: ${total.toFixed(2)} €`;
  }
});
