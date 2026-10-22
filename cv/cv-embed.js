// Receive height only from our CV GitHub Pages origin.
(() => {
  const frame = document.getElementById('cv-frame');
  if (!frame) return;
  const allowedOrigin = 'https://krzysztof-broniszewski.github.io';
  window.addEventListener('message', (event) => {
    if (event.origin !== allowedOrigin || event.source !== frame.contentWindow) return;
    const data = event.data;
    if (!data || data.type !== 'KRZYSZTOF_CV_HEIGHT') return;
    const height = Number(data.height);
    if (!Number.isFinite(height) || height < 200 || height > 50000) return;
    frame.style.height = `${Math.ceil(height + 2)}px`;
  });
})();
