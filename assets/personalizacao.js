// assets/personalizacao.js
document.addEventListener("DOMContentLoaded", function () {
  const selectEl = document.querySelector('form select[name="id"]');
  const personalizationDiv = document.getElementById("personalizacao-camisa");

  if (!selectEl || !personalizationDiv) return;

  function verificarPersonalizacao() {
    const selectedText = selectEl.options[selectEl.selectedIndex].textContent.toLowerCase();

    if (selectedText.includes("personalizar")) {
      personalizationDiv.style.display = "block";
    } else {
      personalizationDiv.style.display = "none";
      document.getElementById("custom-name").value = "";
      document.getElementById("custom-number").value = "";
    }
  }

  verificarPersonalizacao();
  selectEl.addEventListener("change", verificarPersonalizacao);
});