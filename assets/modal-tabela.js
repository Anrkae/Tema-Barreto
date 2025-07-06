document.addEventListener('DOMContentLoaded', function () {
  const btnTabela = document.getElementById('btn-tabela-medidas');
  const modal = document.getElementById('modal-tabela');
  const fechar = modal?.querySelector('.modal-tabela__fechar');
  const overlay = modal?.querySelector('.modal-tabela__overlay');

  if (btnTabela && modal && fechar && overlay) {
    btnTabela.addEventListener('click', () => {
      modal.style.display = 'flex';
    });

    const fecharModal = () => {
      modal.style.display = 'none';
    };

    fechar.addEventListener('click', fecharModal);
    overlay.addEventListener('click', fecharModal);
  }
});