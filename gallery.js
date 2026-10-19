const GITHUB = { owner: 'Krzysztof-Broniszewski', repo: 'drone-ai-gallery', branch: 'main' };

async function loadGallery(folder, id, label, fullFolder = '') {
  const target = document.getElementById(id);
  if (!target) return;
  target.innerHTML = '<p class="status">Loading gallery…</p>';

  try {
    const response = await fetch(
      `https://api.github.com/repos/${GITHUB.owner}/${GITHUB.repo}/contents/${folder}?ref=${GITHUB.branch}`
    );
    if (!response.ok) throw Error('GitHub API: ' + response.status);

    const data = await response.json();
    const images = data
      .filter(f => f.type === 'file' && /\.(jpe?g|png|webp|gif)$/i.test(f.name))
      .sort((a, b) => a.name.localeCompare(b.name, undefined, { numeric: true }));

    target.replaceChildren();
    if (!images.length) {
      target.innerHTML = '<p class="status">No images in this gallery yet.</p>';
      return;
    }

    images.forEach(f => {
      const fig = document.createElement('figure');
      fig.className = 'gallery-item';

      const media = document.createElement('div');
      media.className = 'gallery-media';

      const img = document.createElement('img');
      img.src = f.download_url;
      img.alt = f.name.replace(/\.[^.]+$/, '').replace(/[-_]/g, ' ');
      img.loading = 'lazy';
      img.decoding = 'async';
      if (fullFolder) {
        img.dataset.fullSrc = `https://raw.githubusercontent.com/${GITHUB.owner}/${GITHUB.repo}/${GITHUB.branch}/${fullFolder}/${encodeURIComponent(f.name)}`;
      }
      media.append(img);

      const cap = document.createElement('figcaption');
      cap.className = 'gallery-caption';
      const name = document.createElement('span');
      name.textContent = f.name;
      const chip = document.createElement('span');
      chip.className = 'gallery-chip';
      chip.textContent = label;
      cap.append(name, chip);

      fig.append(media, cap);
      target.append(fig);
    });
  } catch (e) {
    console.error(e);
    target.innerHTML = '<p class="status">Could not load images. Check your GitHub connection and whether the files have been pushed.</p>';
  }
}

function initLightbox() {
  const gallery = document.querySelector('.gallery');
  const overlay = document.getElementById('lightbox');
  if (!gallery || !overlay) return;

  const large = overlay.querySelector('img');
  let images = [], index = 0;

  const show = n => {
    if (!images.length) return;
    index = (n + images.length) % images.length;
    large.src = images[index].dataset.fullSrc || images[index].src;
    large.alt = images[index].alt;
    overlay.classList.add('open');
    document.body.style.overflow = 'hidden';
  };

  const close = () => {
    overlay.classList.remove('open');
    document.body.style.overflow = '';
  };

  gallery.addEventListener('click', e => {
    const img = e.target.closest('.gallery-media img');
    if (!img) return;
    images = [...gallery.querySelectorAll('.gallery-media img')];
    show(images.indexOf(img));
  });

  overlay.querySelector('.lightbox-close').addEventListener('click', close);
  overlay.querySelector('.lightbox-prev').addEventListener('click', () => show(index - 1));
  overlay.querySelector('.lightbox-next').addEventListener('click', () => show(index + 1));
  overlay.addEventListener('click', e => { if (e.target === overlay) close(); });

  document.addEventListener('keydown', e => {
    if (!overlay.classList.contains('open')) return;
    if (e.key === 'Escape') close();
    if (e.key === 'ArrowRight') show(index + 1);
    if (e.key === 'ArrowLeft') show(index - 1);
  });
}

document.addEventListener('DOMContentLoaded', () => {
  const g = document.querySelector('[data-gallery-folder]');
  if (g) {
    loadGallery(
      g.dataset.galleryFolder,
      g.id,
      g.dataset.galleryLabel || 'IMAGE',
      g.dataset.galleryFullFolder || ''
    );
  }
  initLightbox();
});
