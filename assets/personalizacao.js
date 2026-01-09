function iniciarObservadorComboBox() {
  const customizationFields = document.getElementById("customization-fields");
  const form = document.querySelector('form[action^="/cart"]');
  const nomeInput = document.getElementById("custom_name");
  const numeroInput = document.getElementById("custom_number");

  if (!customizationFields) {
    console.log('[Personalização] Campos não existem. Encerrando.');
    return;
  }

  /* =========================
     CSS DINÂMICO
  ========================= */
  const style = document.createElement("style");
  style.innerHTML = `
    #customization-fields {
      opacity: 0;
      max-height: 0;
      overflow: hidden;
      transform: translateY(-10px);
      transition: opacity 0.4s ease, transform 0.4s ease, max-height 0.4s ease;
      transition-delay: 0.2s;
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

  /* =========================
     FUNÇÕES UTILITÁRIAS
  ========================= */
  function limparCampos() {
    if (nomeInput) nomeInput.value = "";
    if (numeroInput) {
      numeroInput.value = "";
      numeroInput.removeAttribute("required");
    }
  }

  function verificarPersonalizacao(texto) {
    const valor = texto?.toLowerCase().trim() || '';
    console.log('[Personalização] Valor detectado:', valor);

    if (valor.includes('personalizar') || valor.includes('personalizada')) {
      customizationFields.style.display = 'block';
      setTimeout(() => {
        customizationFields.classList.add('visible');
        numeroInput?.setAttribute('required', 'required');
        console.log('[Personalização] Campos exibidos ✅');
      });
    } else {
      customizationFields.classList.remove('visible');
      setTimeout(() => {
        customizationFields.style.display = 'none';
        limparCampos();
        console.log('[Personalização] Campos ocultos ❌');
      }, 200);
    }
  }

  /* =========================
     IDENTIFICA BLOCO PERSONALIZAR
  ========================= */
  const blocos = document.querySelectorAll('.product-form__option-selector');
  let valorDropdown = null;

  blocos.forEach(bloco => {
    const nome = bloco.querySelector('.product-form__option-name');
    if (!nome) return;

    if (nome.textContent.toLowerCase().includes('personalizar')) {

      /* =========================
         DROPDOWN
      ========================= */
      valorDropdown = bloco.querySelector('.select__selected-value');
      if (valorDropdown) {
        verificarPersonalizacao(valorDropdown.textContent);

        const observerDropdown = new MutationObserver(() => {
          verificarPersonalizacao(valorDropdown.textContent);
        });

        observerDropdown.observe(valorDropdown, {
          childList: true,
          characterData: true,
          subtree: true
        });

        console.log('[Personalização] Observando DROPDOWN');
      }

      /* =========================
         BLOCK (CLICK / CHANGE)
      ========================= */
      const opcoesBlock = bloco.querySelectorAll(
        'button, label, input[type="radio"], .option-value'
      );

      opcoesBlock.forEach(opcao => {
        const handler = () => {
          const texto =
            opcao.textContent ||
            opcao.value ||
            opcao.getAttribute('data-value') ||
            '';

          verificarPersonalizacao(texto);
        };

        opcao.addEventListener('click', handler);
        opcao.addEventListener('change', handler);
      });

      /* =========================
         BLOCK (CLASSE ATIVA – FALLBACK)
      ========================= */
      const observerBlock = new MutationObserver(() => {
        const ativo = bloco.querySelector('.active, .is-selected, [aria-checked="true"]');
        if (ativo) {
          verificarPersonalizacao(ativo.textContent);
        }
      });

      observerBlock.observe(bloco, {
        attributes: true,
        subtree: true,
        attributeFilter: ['class', 'aria-checked']
      });

      console.log('[Personalização] Observando BLOCK');
    }
  });

  /* =========================
     VALIDAÇÃO NO SUBMIT
  ========================= */
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

  console.log('[Personalização] Sistema híbrido iniciado 🚀');
}

document.addEventListener("DOMContentLoaded", iniciarObservadorComboBox);
