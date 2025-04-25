document.addEventListener("DOMContentLoaded", () => {
  /************************************************************
   * MENÚ HAMBURGUESA
   ************************************************************/
  const menuToggle = document.getElementById("menu-toggle");
  const menu = document.getElementById("menu");

  menuToggle?.addEventListener("click", () => {
    menu.classList.toggle("active");
  });

  /************************************************************
   * CONVERSOR DE MONEDA
   ************************************************************/
  const currencyForm = document.getElementById("currency-form");
  const conversionResult = document.getElementById("conversion-result");

  async function cargarMonedas() {
    try {
      const res = await fetch('https://api.exchangerate.host/symbols');
      const data = await res.json();
      const symbols = data.symbols;
      const fromSelect = document.getElementById("from-currency");
      const toSelect = document.getElementById("to-currency");

      for (let code in symbols) {
        const optionFrom = document.createElement("option");
        optionFrom.value = code;
        optionFrom.textContent = `${code} - ${symbols[code].description}`;
        fromSelect.appendChild(optionFrom);

        const optionTo = document.createElement("option");
        optionTo.value = code;
        optionTo.textContent = `${code} - ${symbols[code].description}`;
        toSelect.appendChild(optionTo);
      }
    } catch (err) {
      console.error("Error cargando monedas", err);
    }
  }
  cargarMonedas();

  currencyForm?.addEventListener("submit", async (e) => {
    e.preventDefault();
    const amount = parseFloat(document.getElementById("convert-amount").value);
    const from = document.getElementById("from-currency").value;
    const to = document.getElementById("to-currency").value;

    if (isNaN(amount) || !from || !to) {
      conversionResult.text
