document.addEventListener("DOMContentLoaded", function () {
  const priceElement = document.querySelector('.price__regular, .price'); // adapta conforme seu tema
  const customizationFields = document.getElementById("customization-fields");
  const variantSelect = document.querySelector('select[name="id"]');

  if (!priceElement || !customizationFields || !variantSelect) return;

  function toggleCustomizationFields() {
    const selectedText = variantSelect.options[variantSelect.selectedIndex].textContent.toLowerCase();

    if (selectedText.includes("personalizar") || selectedText.includes("personalizada")) {
      customizationFields.style.display = "block";
    } else {
      customizationFields.style.display = "none";
      document.getElementById("custom_name").value = "";
      document.getElementById("custom_number").value = "";
    }
  }

  // Roda ao carregar
  toggleCustomizationFields();

  // Observa mudanças no preço
  const observer = new MutationObserver(() => {
    toggleCustomizationFields();
  });

  observer.observe(priceElement, {
    childList: true,
    characterData: true,
    subtree: true
  });
});