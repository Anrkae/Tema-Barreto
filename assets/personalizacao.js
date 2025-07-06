document.addEventListener("DOMContentLoaded", function () {
  const variantSelect = document.querySelector('select[name="id"]');
  const customizationFields = document.getElementById("customization-fields");

  if (!variantSelect || !customizationFields) return;

  // Função que exibe ou oculta os campos
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

  // Observa mudanças no select para garantir que qualquer update seja capturado
  const observer = new MutationObserver(toggleCustomizationFields);

  observer.observe(variantSelect, {
    childList: true,
    subtree: true,
    characterData: true,
  });

  // Garante que funcione se for trocado manualmente também
  variantSelect.addEventListener("change", toggleCustomizationFields);

  // Verifica ao carregar
  toggleCustomizationFields();
});