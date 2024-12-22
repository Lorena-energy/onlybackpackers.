const expenseForm = document.getElementById("expense-form");
const expenseList = document.getElementById("expense-list");
const totalExpenses = document.getElementById("total-expenses");
const ctx = document.getElementById("expense-chart-canvas").getContext("2d");

let expenses = [];

// Actualizar gráfico
const updateChart = () => {
  const categories = ["Transporte", "Comidas", "Alojamiento", "Actividades", "Otros"];
  const categoryTotals = categories.map(cat =>
    expenses
      .filter(exp => exp.category === cat.toLowerCase())
      .reduce((sum, exp) => sum + exp.amount, 0)
  );

  new Chart(ctx, {
    type: 'pie',
    data: {
      labels: categories,
      datasets: [{
        data: categoryTotals,
        backgroundColor: ["#0077cc", "#ff6600", "#00bfff", "#66cc66", "#cccccc"],
      }]
    }
  });
};

// Añadir gasto
expenseForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const name = document.getElementById("expense-name").value;
  const category = document.getElementById("expense-category").value;
  const amount = parseFloat(document.getElementById("expense-amount").value);
  const currency = document.getElementById("expense-currency").value;
  const notes = document.getElementById("expense-notes").value;

  if (name && category && amount && currency) {
    const expense = { name, category, amount, currency, notes };
    expenses.push(expense);

    // Añadir el gasto a la lista
    const li = document.createElement("li");
    li.innerHTML = `
      <strong>${name}</strong> - ${amount} ${currency} (${category})
      <br>${notes ? notes : ""}
    `;
    expenseList.appendChild(li);

    // Actualizar el total de gastos
    const total = expenses.reduce((sum, exp) => sum + exp.amount, 0);
    totalExpenses.textContent = `Total: $${total}`;

    // Actualizar gráfico
    updateChart();

    // Limpiar el formulario
    expenseForm.reset();
  }
});
