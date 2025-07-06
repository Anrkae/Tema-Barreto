function iniciarObservadorComboBox() {
  const customizationFields = document.getElementById("customization-fields");

  if (!customizationFields) {
    console.log('[Personalização] Campos não encontrados. Tentando novamente...');
    return setTimeout(iniciarObservadorComboBox, 200);
  }

  // Busca o bloco de Personalização especificamente
  const blocos = document.querySelectorAll('.product-form__option-selector');

  let valorSelecionado = null;

  blocos.forEach(bloco => {
    const nome = bloco.querySelector('.product-form__option-name');
    if (nome && nome.textContent.trim().toLowerCase().includes('personalizar')) {
      valorSelecionado = bloco.querySelector('.select__selected-value');
    }
  });

  if (!valorSelecionado) {
    console.log('[Personalização] Campo "Personalizar" não encontrado. Tentando novamente...');
    return setTimeout(iniciarObservadorComboBox, 200);
  }

  function verificarPersonalizacao(texto) {
    const valor = texto?.toLowerCase().trim() || '';
    console.log('[Personalização] Valor selecionado (PERSONALIZAR):', valor);

    if (valor.includes('personalizar') || valor.includes('personalizada')) {
      customizationFields.style.display = 'block';
      console.log('[Personalização] Campos exibidos ✅');
    } else {
      customizationFields.style.display = 'none';
      const nome = document.getElementById("custom_name");
      const numero = document.getElementById("custom_number");
      if (nome) nome.value = "";
      if (numero) numero.value = "";
      console.log('[Personalização] Campos ocultos ❌');
    }
  }

  // Rodar ao carregar
  verificarPersonalizacao(valorSelecionado.textContent);

  // Observar mudanças no span que mostra o valor selecionado
  const observer = new MutationObserver(() => {
    verificarPersonalizacao(valorSelecionado.textContent);
  });

  observer.observe(valorSelecionado, {
    childList: true,
    characterData: true,
    subtree: true
  });

  console.log('[Personalização] Observador iniciado!');
}

document.addEventListener("DOMContentLoaded", iniciarObservadorComboBox);