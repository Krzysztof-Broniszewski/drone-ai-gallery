// Sci-Fi gallery: thumbnails and full-resolution WebP images, without GitHub API requests.
(async function () {
  const gallery = document.getElementById('portfolio-gallery');
  const overlay = document.getElementById('lightbox');
  if (!gallery || !overlay) return;
  const large = overlay.querySelector('img');
  let items = [], current = 0;
  const fileUrl = (folder, name) => `assets/${folder}/${encodeURIComponent(name)}`;
  const titleOf = name => name.replace(/\.[^.]+$/, '').replace(/[_-]+/g, ' ').trim();
  const show = index => {
    if (!items.length) return;
    current = (index + items.length) % items.length;
    large.src = fileUrl('full', items[current]);
    large.alt = titleOf(items[current]);
    overlay.classList.add('open');
    document.body.style.overflow = 'hidden';
  };
  const close = () => {
    overlay.classList.remove('open');
    document.body.style.overflow = '';
    large.removeAttribute('src');
  };
  overlay.querySelector('.lightbox-close').addEventListener('click', close);
  overlay.querySelector('.lightbox-prev').addEventListener('click', () => show(current - 1));
  overlay.querySelector('.lightbox-next').addEventListener('click', () => show(current + 1));
  overlay.addEventListener('click', e => { if (e.target === overlay) close(); });
  document.addEventListener('keydown', e => {
    if (!overlay.classList.contains('open')) return;
    if (e.key === 'Escape') close();
    if (e.key === 'ArrowRight') show(current + 1);
    if (e.key === 'ArrowLeft') show(current - 1);
  });
  gallery.innerHTML = '<p class="status">Loading gallery…</p>';
  try {
    const response = await fetch('images.json');
    if (!response.ok) throw new Error(`images.json: ${response.status}`);
    items = await response.json();
    gallery.replaceChildren();
    items.forEach((name, i) => {
      const figure = document.createElement('figure');
      figure.className = 'gallery-item';
      const media = document.createElement('div');
      media.className = 'gallery-media';
      const img = document.createElement('img');
      img.src = fileUrl('thumbs', name);
      img.alt = titleOf(name);
      img.loading = i < 3 ? 'eager' : 'lazy';
      img.decoding = 'async';
      media.append(img);
      const caption = document.createElement('figcaption');
      caption.className = 'gallery-caption';
      const title = document.createElement('span');
      title.textContent = titleOf(name);
      const chip = document.createElement('span');
      chip.className = 'gallery-chip';
      chip.textContent = 'SCI-FI';
      caption.append(title, chip);
      figure.append(media, caption);
      figure.addEventListener('click', () => show(i));
      gallery.append(figure);
    });
    if (!items.length) gallery.innerHTML = '<p class="status">No images in this gallery yet.</p>';
  } catch (err) {
    console.error('Sci-Fi gallery:', err);
    gallery.innerHTML = '<p class="status">Could not load images. Open via Live Server or GitHub Pages.</p>';
  }
})();
