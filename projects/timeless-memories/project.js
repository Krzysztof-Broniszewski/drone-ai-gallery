'use strict';
const comparison = document.querySelector('#tm-compare');
const range = comparison?.querySelector('.tm-compare-range');
if (comparison && range) {
  const update = () => comparison.style.setProperty('--split', `${range.value}%`);
  range.addEventListener('input', update);
  update();
}
const dialog = document.querySelector('#tm-lightbox');
const expanded = dialog?.querySelector('img');
const caption = dialog?.querySelector('p');
if (dialog && expanded && caption) {
  document.querySelectorAll('.tm-image-button').forEach(button => {
    button.addEventListener('click', () => {
      expanded.src = button.dataset.image;
      expanded.alt = button.querySelector('img')?.alt || 'Project photograph';
      caption.textContent = button.dataset.caption || '';
      dialog.showModal();
    });
  });
  dialog.querySelector('.tm-close')?.addEventListener('click', () => dialog.close());
  dialog.addEventListener('click', event => { if (event.target === dialog) dialog.close(); });
}
