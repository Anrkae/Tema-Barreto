document.addEventListener('DOMContentLoaded', function () {
  const customizationWrapper = document.getElementById('customization-fields');
  const customNumberInput = document.getElementById('custom_number');
  const form = document.querySelector('form[action^="/cart"]');
  let selectObserverStarted = false;

  // Injeta o CSS no <head>
  const estilo = document.createElement('style');
  estilo.innerHTML = `
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
  document.head.appendChild(estilo);

  const mostrarCampos = () => {
    customizationWrapper?.classList.add('visible');
    customNumberInput?.setAttribute('required', 'required');
  };

  const esconderCampos = () => {
    customizationWrapper?.classList.remove('visible');
    customNumberInput?.removeAttribute('required');
  };

  const verificarValor = () => {
    const select = document.querySelector('select[aria-label="Personalizar"], select[aria-label="Personalização"]');
    const valor = select?.value?.trim().toLowerCase();

    if (valor === 'personalizar') {
      mostrarCampos();
    } else {
      esconderCampos();
    }
  };

  const iniciarObservador = () => {
    if (selectObserverStarted) return;
    selectObserverStarted = true;

    const wrapper = document.querySelector('.product-form__option-selector');
    if (!wrapper) return console.log('[Personalização] Wrapper não encontrado');

    const observer = new MutationObserver(() => {
      verificarValor();
    });

    observer.observe(wrapper, { childList: true, subtree: true });
    verificarValor();
    console.log('[Personalização] Observador iniciado!');
  };

  iniciarObservador();

  // Validação extra no envio do formulário
  if (form) {
    form.addEventListener('submit', function (e) {
      if (customizationWrapper?.classList.contains('visible')) {
        if (!customNumberInput.value.trim()) {
          e.preventDefault();
          customNumberInput.classList.add('shake');
          setTimeout(() => customNumberInput.classList.remove('shake'), 500);
        }
      }
    });
  }
});