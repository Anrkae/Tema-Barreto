function iniciarObservadorComboBox() {
  const customizationFields = document.getElementById("customization-fields");
  const form = document.querySelector('form[action^="/cart"]');
  const numeroInput = document.getElementById("custom_number");

  if (!customizationFields) {
    console.log('[Personalização] Campos de personalização não existem neste produto. Encerrando.');
    return;
  }

  // Injeta CSS para animação e shake
  const style = document.createElement("style");
  style.innerHTML = `
    #customization-fields {
      opacity: 0;
      max-height: 0;
      overflow: hidden;
      transform: translateY(-10px);
      transition: opacity 0.4s ease, transform 0.4s ease, max-height 0.4s ease;
      transition-delay: 1s;
    }
    #customization-fields.visible {
      opacity: 1;
      max-height: 200px;
      transform: translateY(0);
    }
    .input__field.shake {
      animation: shake 0.4s ease;
      border-color: #e53935;
    }
    @keyframes shake {
      0% { transform: translateX(0); }
      25% { transform: translateX(-5px); }
      50% { transform: translateX(5px); }
      75% { transform: translateX(-3px); }
      100% { transform: translateX(0); }
    }
  `;
  document.head.appendChild(style);

  const blocos = document.querySelectorAll('.product-form__option-selector');
  let valorSelecionado = null;

  blocos.forEach(bloco => {
    const nome = bloco.querySelector('.product-form__option-name');
    if (nome && nome.textContent.trim().toLowerCase().includes('personalizar')) {
      valorSelecionado = bloco.querySelector('.select__selected-value');
    }
  });

  if (!valorSelecionado) {
    console.log('[Personalização] Produto sem opção de personalização. Encerrando.');
    customizationFields.style.display = 'none';
    return;
  }

  function verificarPersonalizacao(texto) {
    const valor = texto?.toLowerCase().trim() || '';
    console.log('[Personalização] Valor selecionado (PERSONALIZAR):', valor);

    if (valor.includes('personalizar') || valor.includes('personalizada')) {
      customizationFields.classList.add('visible');
      customizationFields.style.display = 'block';
      numeroInput?.setAttribute('required', 'required');
      console.log('[Personalização] Campos exibidos ✅');
    } else {
      customizationFields.classList.remove('visible');
      setTimeout(() => customizationFields.style.display = 'none', 400); // espera animação
      const nome = document.getElementById("custom_name");
      if (nome) nome.value = "";
      if (numeroInput) {
        numeroInput.value = "";
        numeroInput.removeAttribute('required');
      }
      console.log('[Personalização] Campos ocultos ❌');
    }
  }

  verificarPersonalizacao(valorSelecionado.textContent);

  const observer = new MutationObserver(() => {
    verificarPersonalizacao(valorSelecionado.textContent);
  });

  observer.observe(valorSelecionado, {
    childList: true,
    characterData: true,
    subtree: true
  });

  console.log('[Personalização] Observador iniciado!');

  // Evita envio se campo número estiver vazio
  if (form && numeroInput) {
    form.addEventListener('submit', function (e) {
      if (customizationFields.classList.contains('visible')) {
        if (!numeroInput.value.trim()) {
          e.preventDefault();
          numeroInput.classList.add('shake');
          setTimeout(() => numeroInput.classList.remove('shake'), 500);
        }
      }
    });
  }
}

document.addEventListener("DOMContentLoaded", iniciarObservadorComboBox);