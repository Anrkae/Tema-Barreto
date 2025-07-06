function iniciarObservadorComboBox(context = document) {
  // Seletores mais genéricos para pegar os campos pelos nomes, pois IDs podem variar
  const customizationFields = context.querySelector('#customization-fields');
  const form = context.querySelector('form[action^="/cart"]');
  const nomeInput = context.querySelector('input[name="properties[Nome personalizado]"]');
  const numeroInput = context.querySelector('input[name="properties[Número personalizado]"]');

  if (!customizationFields) {
    console.log('[Personalização] Campos de personalização não existem neste produto. Encerrando.');
    return;
  }

  // Injeta estilo uma vez (no documento global)
  if (!document.getElementById('customizacao-style')) {
    const style = document.createElement("style");
    style.id = 'customizacao-style';
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
  }

  const blocos = context.querySelectorAll('.product-form__option-selector');
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

  function limparCampos() {
    if (nomeInput) nomeInput.value = "";
    if (numeroInput) {
      numeroInput.value = "";
      numeroInput.removeAttribute('required');
    }
  }

  function verificarPersonalizacao(texto) {
    const valor = texto?.toLowerCase().trim() || '';
    console.log('[Personalização] Valor selecionado (PERSONALIZAR):', valor);

    if (valor.includes('personalizar') || valor.includes('personalizada')) {
      customizationFields.style.display = 'block';
      setTimeout(() => {
        customizationFields.classList.add('visible');
        numeroInput?.setAttribute('required', 'required');
        console.log('[Personalização] Campos exibidos ✅');
      }, 1000); // Delay na exibição
    } else {
      customizationFields.classList.remove('visible');
      setTimeout(() => {
        customizationFields.style.display = 'none';
        limparCampos();
        console.log('[Personalização] Campos ocultos ❌');
      }, 200);
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

document.addEventListener("DOMContentLoaded", () => {
  iniciarObservadorComboBox();

  const observerQuickView = new MutationObserver((mutations) => {
    mutations.forEach(mutation => {
      mutation.addedNodes.forEach(node => {
        if (node.nodeType === 1 && node.tagName === "QUICK-BUY-DRAWER") {
          const drawer = node;
          const innerObserver = new MutationObserver(() => {
            const customization = drawer.querySelector("#customization-fields");
            if (customization) {
              console.log('[Quick View] Campos detectados no drawer, iniciando observador...');
              iniciarObservadorComboBox(drawer);
              innerObserver.disconnect();
            }
          });
          innerObserver.observe(drawer, { childList: true, subtree: true });
        }
      });
    });
  });

  observerQuickView.observe(document.body, { childList: true, subtree: true });
});