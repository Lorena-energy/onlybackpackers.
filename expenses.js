const expenseForm = document.getElementById("expense-form");
const expenseList = document.getElementById("expense-list");
const totalExpenses = document.getElementById("total-expenses");
const ctx = document.getElementById("expense-chart-canvas").getContext("2d");

let expenses = [];

// Crear instancia del gráfico al inicio
const categories = ["Transporte", "Comidas", "Alojamiento", "Actividades", "Otros"];
const chartData = {
  labels: categories,
  datasets: [
    {
      data: [0, 0, 0, 0, 0], // Valores iniciales para cada categoría
      backgroundColor: ["#0077cc", "#ff6600", "#00bfff", "#66cc66", "#cccccc"],
    },
  ],
};

const expenseChart = new Chart(ctx, {
  type: "pie",
  data: chartData,
  options: {
    responsive: true,
  },
});

// Función para actualizar el gráfico
const updateChart = () => {
  // Calcular totales por categoría
  const categoryTotals = categories.map((cat) =>
    expenses
      .filter((exp) => exp.category === cat.toLowerCase())
      .reduce((sum, exp) => sum + exp.amount, 0)
  );

  // Actualizar los datos del gráfico
  expenseChart.data.datasets[0].data = categoryTotals;
  expenseChart.update();
};

// Manejar la adición de un gasto
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

    // Añadir el gasto a la lista visual
    const li = document.createElement("li");
    li.innerHTML = `
      <strong>${name}</strong> - ${amount} ${currency} (${category})
      <br>${notes ? notes : ""}
    `;
    expenseList.appendChild(li);

    // Actualizar el total de gastos
    const total = expenses.reduce((sum, exp) => sum + exp.amount, 0);
    totalExpenses.textContent = `Total: $${total.toFixed(2)}`;

    // Actualizar el gráfico
    updateChart();

    // Limpiar el formulario
    expenseForm.reset();
  }
});
