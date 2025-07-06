document.addEventListener("DOMContentLoaded", function () {
  const priceElement = document.querySelector('.price-list');
  const customizationFields = document.getElementById("customization-fields");
  const variantSelect = document.querySelector('select[name="id"]');

  if (!priceElement || !customizationFields || !variantSelect) return;

  function toggleCustomizationFields() {
    const selectedOption = variantSelect.options[variantSelect.selectedIndex];
    const selectedText = selectedOption ? selectedOption.textContent.toLowerCase() : "";

    if (selectedText.includes("personalizar") || selectedText.includes("personalizada")) {
      customizationFields.style.display = "block";
    } else {
      customizationFields.style.display = "none";
      document.getElementById("custom_name").value = "";
      document.getElementById("custom_number").value = "";
    }
  }

  // Executa ao carregar
  toggleCustomizationFields();

  // Observa mudanças no bloco de preço (gatilho confiável do Focal)
  const observer = new MutationObserver(() => {
    toggleCustomizationFields();
  });

  observer.observe(priceElement, {
    childList: true,
    characterData: true,
    subtree: true
  });
});