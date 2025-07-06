document.addEventListener("DOMContentLoaded", function () {
  const selectVariante = document.querySelector('select[name="id"]');
  const camposPersonalizacao = document.getElementById("personalizacao-camisa");

  if (!selectVariante || !camposPersonalizacao) return;

  function exibirCamposSeForPersonalizavel() {
    const selectedText = selectVariante.options[selectVariante.selectedIndex].textContent.toLowerCase();

    // Exemplo: exibe os campos apenas se o nome da variante contiver "personalizar"
    if (selectedText.includes("personalizar")) {
      camposPersonalizacao.style.display = "block";
    } else {
      camposPersonalizacao.style.display = "none";
      document.getElementById("custom-name").value = "";
      document.getElementById("custom-number").value = "";
    }
  }

  // Rodar ao carregar
  exibirCamposSeForPersonalizavel();

  // Rodar sempre que a variante mudar
  selectVariante.addEventListener("change", exibirCamposSeForPersonalizavel);
});