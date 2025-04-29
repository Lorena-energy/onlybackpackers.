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
  const personalForm = document.getElementById('expense-form');
  const personalList = document.getElementById('expense-list');
  const personalTotal = document.getElementById('total-expenses');

  let personalExpenses = [];

  personalForm?.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('expense-name').value.trim();
    const amount = parseFloat(document.getElementById('expense-amount').value);
    const currency = document.getElementById('expense-currency').value.trim().toUpperCase();
    const notes = document.getElementById('expense-notes').value.trim();

    if (name && !isNaN(amount) && currency) {
      personalExpenses.push({ name, amount, currency, notes });

      const li = document.createElement('li');
      li.innerHTML = `<strong>${name}</strong>: ${amount.toFixed(2)} ${currency}<br>${notes ? notes : ''}`;
      personalList.appendChild(li);

      const total = personalExpenses.reduce((sum, exp) => sum + exp.amount, 0);
      personalTotal.textContent = `Total: ${total.toFixed(2)} ${currency}`;

      personalForm.reset();
    }
  });

  /************************************************************
   * GASTOS GRUPALES
   ************************************************************/
  const createGroupForm = document.getElementById('create-group-form');
  const groupExpenseForm = document.getElementById('group-expense-form');
  const groupMembersList = document.getElementById('group-members-list');
  const groupExpenseList = document.getElementById('group-expense-list');
  const groupTotal = document.getElementById('group-total');

  let group = {
    name: '',
    members: [],
    expenses: []
  };

  createGroupForm?.addEventListener('submit', (e) => {
    e.preventDefault();
    const groupName = document.getElementById('group-name').value.trim();
    const membersInput = document.getElementById('group-members').value.trim();

    if (!membersInput) {
      alert('Debes introducir al menos un miembro.');
      return;
    }

    group.name = groupName || 'Grupo Sin Nombre';
    group.members = membersInput.split(',').map(m => m.trim());
    group.expenses = [];

    // Mostrar miembros
    groupMembersList.innerHTML = `<strong>Miembros:</strong> ${group.members.join(', ')}`;

    // Reset gastos anteriores
    groupExpenseList.innerHTML = '';
    groupTotal.textContent = 'Total grupal: 0 €';

    createGroupForm.reset();
  });

  groupExpenseForm?.addEventListener('submit', (e) => {
    e.preventDefault();
    const expenseName = document.getElementById('group-expense-name').value.trim();
    const expenseAmount = parseFloat(document.getElementById('group-expense-amount').value);
    const paidBy = document.getElementById('paid-by').value.trim();

    if (!expenseName || isNaN(expenseAmount) || !paidBy) {
      alert('Por favor, rellena todos los campos.');
      return;
    }

    if (!group.members.includes(paidBy)) {
      alert('El pagador debe ser un miembro del grupo.');
      return;
    }

    const amountPerPerson = (expenseAmount / group.members.length).toFixed(2);

    group.expenses.push({
      name: expenseName,
      amount: expenseAmount,
      paidBy,
      amountPerPerson
    });

    const li = document.createElement('li');
    li.innerHTML = `
      <strong>${expenseName}</strong> - Total: ${expenseAmount.toFixed(2)} €
      <br>Pagado por: ${paidBy}
      <br>Cada uno debe: ${amountPerPerson} €
    `;
    groupExpenseList.appendChild(li);

    const total = group.expenses.reduce((sum, exp) => sum + exp.amount, 0);
    groupTotal.textContent = `Total grupal: ${total.toFixed(2)} €`;

    groupExpenseForm.reset();
  });
});
