function iniciarObservadorPersonalizacao() {
  const valorSelecionado = document.querySelector('.select__selected-value');
  const customizationFields = document.getElementById("customization-fields");

  if (!valorSelecionado || !customizationFields) {
    // Se ainda não existe no DOM, tenta novamente em 200ms
    return setTimeout(iniciarObservadorPersonalizacao, 200);
  }

  function verificarPersonalizacao(texto) {
    const valor = texto?.toLowerCase() || '';
    if (valor.includes("personalizar") || valor.includes("personalizada")) {
      customizationFields.style.display = "block";
    } else {
      customizationFields.style.display = "none";
      const nome = document.getElementById("custom_name");
      const numero = document.getElementById("custom_number");
      if (nome) nome.value = "";
      if (numero) numero.value = "";
    }
  }

  // Rodar ao carregar
  verificarPersonalizacao(valorSelecionado.textContent);

  // Observar mudanças no span com o valor selecionado
  const observer = new MutationObserver(() => {
    verificarPersonalizacao(valorSelecionado.textContent);
  });

  observer.observe(valorSelecionado, {
    childList: true,
    characterData: true,
    subtree: true
  });
}

// Inicia o processo quando o DOM estiver carregado
document.addEventListener("DOMContentLoaded", iniciarObservadorPersonalizacao);