/* Shared header for all portfolio pages. Paths relative to this script. */
(() => {
  const root = new URL('../', document.currentScript.src);
  const href = path => new URL(path, root).href;
  const pages = [
    ['Home', 'index.html'],
    ['AI Commercials', 'ai-commercials/index.html'],
    ['AI Art', 'ai-art/index.html'],
    ['Drone Photography', 'drone-photography/index.html'],
    ['Drone Videos', 'drone-videos/index.html'],
    ['CV', 'cv/index.html']
  ];
  const here = location.pathname;
  const links = pages.map(([label, path]) => {
    const target = new URL(href(path)).pathname;
    const active = here === target || (path === 'index.html' && here === root.pathname);
    return `<a href="${href(path)}"${active ? ' aria-current="page"' : ''}>${label}</a>`;
  }).join('');
  const mount = document.getElementById('shared-navbar');
  if (!mount) return;
  mount.innerHTML = `
    <header class="site-header">
      <div class="header-inner">
        <a class="wordmark" href="${href('index.html')}" aria-label="Home">
          <span class="wordmark-monogram">KB<span class="monogram-dot">.</span></span>
          <span class="wordmark-name">KRZYSZTOF <strong>BRONISZEWSKI</strong><small>AI CREATIVE &amp; DRONE VISUALS</small></span>
        </a>
        <button class="menu-toggle" type="button" aria-expanded="false" aria-controls="primary-nav" aria-label="Toggle navigation"><span></span><span></span><span></span></button>
        <nav id="primary-nav" class="site-nav" aria-label="Main navigation">${links}</nav>
        <a class="channel-logo youtube-logo" href="https://www.youtube.com/channel/UCCAHD3K9D9tyEpvwcsluTtA" target="_blank" rel="noopener noreferrer" aria-label="King of Drone — YouTube channel" title="King of Drone on YouTube">
          <img src="${href('assets/king-of-drone-logo.png')}" alt="King of Drone logo">
          <span class="youtube-logo-text"><strong>KING OF DRONE</strong><small>YOUTUBE CHANNEL ↗</small></span>
        </a>
      </div>
    </header>`;
})();
