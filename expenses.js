document.addEventListener('DOMContentLoaded', () => {

  // Menú hamburguesa
  const menuToggle = document.getElementById('menu-toggle');
  const menu = document.getElementById('menu');
  if (menuToggle && menu) {
    menuToggle.addEventListener('click', () => {
      menu.classList.toggle('active');
    });
  }

  // =====================
  // GASTOS PERSONALES
  // =====================
  const expenseForm = document.getElementById('expense-form');
  const expenseList = document.getElementById('expense-list');
  const totalExpenses = document.getElementById('total-expenses');

  let personalExpenses = [];

  if (expenseForm) {
    expenseForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const name = document.getElementById('expense-name').value;
      const category = document.getElementById('expense-category').value;
      const amount = parseFloat(document.getElementById('expense-amount').value);
      const notes = document.getElementById('expense-notes').value;

      if (!name || isNaN(amount)) return;

      personalExpenses.push({ name, category, amount, notes });

      const li = document.createElement('li');
      li.innerHTML = `<strong>${name}</strong> - ${amount.toFixed(2)}€ (${category})<br>${notes}`;
      expenseList.appendChild(li);

      const total = personalExpenses.reduce((sum, e) => sum + e.amount, 0);
      totalExpenses.textContent = `Total: ${total.toFixed(2)}€`;

      expenseForm.reset();
    });
  }

  // =====================
  // GASTOS GRUPALES
  // =====================
  const groupForm = document.getElementById('group-form');
  const groupList = document.getElementById('group-list');
  const groupSelect = document.getElementById('group-select');
  const groupSummary = document.getElementById('group-summary');

  let groups = {};

  if (groupForm) {
    groupForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const groupName = document.getElementById('group-name').value.trim();
      const members = document.getElementById('group-members').value.split(',').map(m => m.trim()).filter(Boolean);

      if (!groupName || members.length < 2) return;

      groups[groupName] = { members, expenses: [] };

      const option = document.createElement('option');
      option.value = groupName;
      option.textContent = groupName;
      groupSelect.appendChild(option);

      const li = document.createElement('li');
      li.textContent = `${groupName}: ${members.join(', ')}`;
      groupList.appendChild(li);

      groupForm.reset();
    });
  }

  // Añadir gastos a un grupo
  const groupExpenseForm = document.getElementById('group-expense-form');
  const groupExpenseList = document.getElementById('group-expense-list');

  if (groupExpenseForm) {
    groupExpenseForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const groupName = groupSelect.value;
      if (!groupName || !groups[groupName]) return;

      const payer = document.getElementById('payer').value;
      const amount = parseFloat(document.getElementById('group-amount').value);
      const description = document.getElementById('group-description').value;

      if (!payer || isNaN(amount) || !description) return;

      const expense = { payer, amount, description };
      groups[groupName].expenses.push(expense);

      const li = document.createElement('li');
      li.innerHTML = `<strong>${description}</strong> - ${amount.toFixed(2)}€ pagado por ${payer}`;
      groupExpenseList.appendChild(li);

      updateGroupSummary(groupName);

      groupExpenseForm.reset();
    });
  }

  function updateGroupSummary(groupName) {
    const group = groups[groupName];
    const balances = {};

    group.members.forEach(member => balances[member] = 0);

    group.expenses.forEach(exp => {
      const share = exp.amount / group.members.length;
      group.members.forEach(member => {
        if (member === exp.payer) {
          balances[member] += exp.amount - share;
        } else {
          balances[member] -= share;
        }
      });
    });

    groupSummary.innerHTML = `<h3>Resumen de saldos (${groupName}):</h3>`;
    Object.entries(balances).forEach(([member, balance]) => {
      const p = document.createElement('p');
      p.textContent = `${member}: ${balance.toFixed(2)}€`;
      groupSummary.appendChild(p);
    });
  }

});

