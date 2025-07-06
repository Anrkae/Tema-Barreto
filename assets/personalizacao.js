document.addEventListener("DOMContentLoaded", function () {
  const selectVariant = document.querySelector('select[name="id"]');
  const customizationFields = document.getElementById("customization-fields");

  if (!selectVariant || !customizationFields) return;

  function toggleCustomizationFields() {
    const selectedText = selectVariant.options[selectVariant.selectedIndex].textContent.toLowerCase();

    if (selectedText.includes("personalizar") || selectedText.includes("personalizada")) {
      customizationFields.style.display = "block";
    } else {
      customizationFields.style.display = "none";
      // Limpa os campos
      document.getElementById("custom_name").value = "";
      document.getElementById("custom_number").value = "";
    }
  }

  selectVariant.addEventListener("change", toggleCustomizationFields);
});