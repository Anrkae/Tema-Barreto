function iniciarObservadorComboBox() {
  const customizationFields = document.getElementById("customization-fields");
  const form = document.querySelector('form[action^="/cart"]');
  const nomeInput = document.getElementById("custom_name");
  const numeroInput = document.getElementById("custom_number");

  if (!customizationFields) {
    console.log('[Personalização] Campos não encontrados.');
    return;
  }

  const selectPersonalizar = document.querySelector('select[name="option2"]');
  if (!selectPersonalizar) {
    console.log('[Personalização] Select da personalização não encontrado.');
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

  function atualizarCampos(valor) {
    if (valor.includes('personalizar')) {
      customizationFields.style.display = 'block';
      setTimeout(() => {
        customizationFields.classList.add('visible');
        numeroInput?.setAttribute('required', 'required');
      }, 1000);
    } else {
      customizationFields.classList.remove('visible');
      setTimeout(() => {
        customizationFields.style.display = 'none';
        limparCampos();
      }, 200);
    }
  }

  // inicializa com o valor atual
  atualizarCampos(selectPersonalizar.value.toLowerCase());

  selectPersonalizar.addEventListener('change', (e) => {
    atualizarCampos(e.target.value.toLowerCase());
  });

  if (form && numeroInput) {
    form.addEventListener('submit', function (e) {
      if (customizationFields.classList.contains('visible') && !numeroInput.value.trim()) {
        e.preventDefault();
        numeroInput.classList.add('shake');
        setTimeout(() => numeroInput.classList.remove('shake'), 500);
      }
    });
  }
}

document.addEventListener("DOMContentLoaded", iniciarObservadorComboBox);