const recommendationForm = document.getElementById("recommendation-form");
const recommendationList = document.getElementById("recommendation-list");

recommendationForm.addEventListener("submit", (e) => {
  e.preventDefault();

  // Obtener los valores del formulario
  const category = document.getElementById("recommendation-category").value;
  const text = document.getElementById("recommendation-text").value;

  if (text.trim() !== "") {
    // Crear un nuevo elemento de recomendación
    const newRecommendation = document.createElement("div");
    newRecommendation.classList.add("recommendation-item");
    newRecommendation.innerHTML = `
      <h3>Categoría: ${category}</h3>
      <p>${text}</p>
    `;

    // Agregar la nueva recomendación al inicio de la lista
    recommendationList.prepend(newRecommendation);

    // Limpiar el formulario
    recommendationForm.reset();
  }
});
