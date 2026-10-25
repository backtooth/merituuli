const dialog = document.querySelector('.lightbox');
const dialogImage = dialog?.querySelector('img');
const dialogTitle = dialog?.querySelector('.lightbox-title');
const closeButton = dialog?.querySelector('.lightbox-close');

document.querySelectorAll('[data-lightbox]').forEach((button) => {
  button.addEventListener('click', () => {
    dialogImage.src = button.dataset.lightbox;
    dialogImage.alt = button.querySelector('img').alt;
    dialogTitle.textContent = button.dataset.title;
    dialog.showModal();
    document.body.classList.add('modal-open');
  });
});

function closeLightbox() {
  dialog?.close();
  document.body.classList.remove('modal-open');
}

closeButton?.addEventListener('click', closeLightbox);
dialog?.addEventListener('click', (event) => {
  if (event.target === dialog) closeLightbox();
});
dialog?.addEventListener('close', () => document.body.classList.remove('modal-open'));
