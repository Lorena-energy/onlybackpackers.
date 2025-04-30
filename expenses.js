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
  const groupSelect = document.getElementById('group-select');
  const groupSummary = document.getElementById('group-summary');
  const payerSelect = document.getElementById('group-expense-payer');
  const groupExpenseForm = document.getElementById('group-expense-form');
  const groupExpenseList = document.getElementById('group-expense-list');

  let groups = {};

  // Crear grupo
  if (groupForm) {
    groupForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const groupName = document.getElementById('group-name').value.trim();
      const members = document.getElementById('group-members').value
        .split(',')
        .map(m => m.trim())
        .filter(Boolean);

      if (!groupName || members.length < 2) return;

      groups[groupName] = { members, expenses: [] };

      const option = document.createElement('option');
      option.value = groupName;
      option.textContent = groupName;
      groupSelect.appendChild(option);

      document.getElementById('group-create-msg').textContent = `Grupo "${groupName}" creado con éxito`;

      groupForm.reset();
    });
  }

  // Cambiar miembros cuando se selecciona un grupo
  groupSelect.addEventListener('change', () => {
    const group = groups[groupSelect.value];
    payerSelect.innerHTML = '';
    if (group) {
      group.members.forEach(member => {
        const option = document.createElement('option');
        option.value = member;
        option.textContent = member;
        payerSelect.appendChild(option);
      });
    }
  });

  // Añadir gasto al grupo
  if (groupExpenseForm) {
    groupExpenseForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const groupName = groupSelect.value;
      if (!groupName || !groups[groupName]) return;

      const payer = document.getElementById('group-expense-payer').value;
      const amount = parseFloat(document.getElementById('group-expense-amount').value);
      const description = document.getElementById('group-expense-name').value;
      const splitType = document.querySelector('input[name="split-type"]:checked').value;

      if (!payer || isNaN(amount) || !description) return;

      let shares = {};
      const members = groups[groupName].members;

      if (splitType === 'equal') {
        const share = amount / members.length;
        members.forEach(m => shares[m] = share);
      } else {
        const inputs = document.querySelectorAll('.custom-share-input');
        inputs.forEach(input => {
          const member = input.dataset.member;
          shares[member] = parseFloat(input.value) || 0;
        });
      }

      groups[groupName].expenses.push({ payer, amount, description, shares });

      const li = document.createElement('li');
      li.innerHTML = `<strong>${description}</strong> - ${amount.toFixed(2)}€ pagado por ${payer}`;
      groupExpenseList.appendChild(li);

      updateGroupSummary(groupName);

      groupExpenseForm.reset();
      document.getElementById('custom-split-container').style.display = 'none';
    });
  }

  // Mostrar campos personalizados si se elige "custom"
  document.querySelectorAll('input[name="split-type"]').forEach(input => {
    input.addEventListener('change', () => {
      const customContainer = document.getElementById('custom-split-container');
      if (input.value === 'custom') {
        const group = groups[groupSelect.value];
        customContainer.innerHTML = '';
        if (group) {
          group.members.forEach(member => {
            const div = document.createElement('div');
            div.innerHTML = `${member}: <input type="number" data-member="${member}" class="custom-share-input" placeholder="€" />`;
            customContainer.appendChild(div);
          });
        }
        customContainer.style.display = 'block';
      } else {
        document.getElementById('custom-split-container').style.display = 'none';
      }
    });
  });

  function updateGroupSummary(groupName) {
    const group = groups[groupName];
    const balances = {};

    group.members.forEach(member => balances[member] = 0);

    group.expenses.forEach(exp => {
      Object.entries(exp.shares).forEach(([member, share]) => {
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
