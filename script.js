// =============================
// 1. Konfiguracja repo na GitHubie
// =============================

const GITHUB = {
  owner: "Krzysztof-Broniszewski",   // Twój login
  repo: "drone-ai-gallery",          // Nazwa repo
  branch: "main"                     // Gałąź (zmień jeśli inna)
};

function getVideoId(input) {
  // jeśli to pełny link typu watch?v=ID
  const match = String(input).match(/[?&]v=([^&]+)/);
  if (match && match[1]) {
    return match[1];
  }
  // w przeciwnym razie traktujemy to jako już-czyste ID
  return String(input).trim();
}

function buildVideoGallery(containerId, videos) {
  const container = document.getElementById(containerId);
  if (!container) return;

  if (!videos || !videos.length) {
    container.innerHTML = "<p style='color:#9ca3af;font-size:0.9rem'>Brak filmów do wyświetlenia.</p>";
    return;
  }

  container.innerHTML = "";

  videos.forEach((video) => {
    const card = document.createElement("article");
    card.className = "video-card";

    const link = document.createElement("a");
    const id = video.id.trim();
    link.href = `https://www.youtube.com/watch?v=${id}`;
    link.target = "_blank";
    link.rel = "noopener noreferrer";
    link.className = "video-thumb-wrapper";

    const thumb = document.createElement("img");
    thumb.src = `https://img.youtube.com/vi/${id}/hqdefault.jpg`;
    thumb.alt = video.title || "Drone video thumbnail";
    thumb.loading = "lazy";

    const playIcon = document.createElement("div");
    playIcon.className = "video-play-icon";
    playIcon.textContent = "▶";

    link.appendChild(thumb);
    link.appendChild(playIcon);

    const body = document.createElement("div");
    body.className = "video-card-body";

    const titleEl = document.createElement("h3");
    titleEl.className = "video-title";
    titleEl.textContent = video.title || "Drone video";

    const metaEl = document.createElement("p");
    metaEl.className = "video-meta";
    metaEl.textContent = video.description || "";

    body.appendChild(titleEl);
    body.appendChild(metaEl);

    card.appendChild(link);
    card.appendChild(body);

    container.appendChild(card);
  });
}



// =============================
// YouTube videos (Drone videos tab)
// =============================

const youtubeVideos = [
  {
    id: "c8EZ8vW3bok",
    title: "Most Macharskiego Kraków - Nowa Huta",
    description: "Ujęcie z kanału King of Drone."
  },
  {
    id: "aQLS8jrc-J0",
    title: "Śpiący Mnich - Słowacja",
    description: "Ujęcie z kanału King of Drone."
  },
  {
    id: "lA6pBAYNE0s",
    title: "Klasztor Benedyktynów - Węgry - Balaton",
    description: "Ujęcie z kanału King of Drone."
  },
  {
    id: "6Cg9QohnTNc",
    title: "Klasztor Benedyktynów - Węgry - Balaton",
    description: "Ujęcie z kanału King of Drone."
  }
];



// =============================
// 2. Pobieranie listy plików z katalogu w repo
// =============================

async function fetchImagesFromFolder(folderPath) {
  const url = `https://api.github.com/repos/${GITHUB.owner}/${GITHUB.repo}/contents/${folderPath}?ref=${GITHUB.branch}`;

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`GitHub API error: ${response.status} ${response.statusText}`);
  }

  const data = await response.json();

  // Bierzemy tylko pliki graficzne: jpg, jpeg, png, webp
  return data.filter(
    (item) =>
      item.type === "file" &&
      /\.(jpe?g|png|webp)$/i.test(item.name)
  );
}

// =============================
// 3. Tworzenie elementu galerii
// =============================

function createGalleryItem(fileData, tagLabel) {
  const wrapper = document.createElement("figure");
  wrapper.className = "gallery-item";

  // losowo wybieramy wariant wysokości
  const media = document.createElement("div");
  media.className = "gallery-media";

  const r = Math.random();
  if (r < 0.25) {
    media.classList.add("gallery-media--short");
  } else if (r > 0.75) {
    media.classList.add("gallery-media--tall");
  } else {
    media.classList.add("gallery-media--medium");
  }

  const img = document.createElement("img");
  img.src = fileData.download_url;
  img.alt = fileData.name;
  img.loading = "lazy";

  media.appendChild(img);

  const caption = document.createElement("figcaption");
  caption.className = "gallery-caption";

  const titleSpan = document.createElement("span");
  titleSpan.textContent = fileData.name;

  const chip = document.createElement("span");
  chip.className = "gallery-chip";
  chip.textContent = tagLabel || "Photo";

  caption.appendChild(titleSpan);
  caption.appendChild(chip);

  wrapper.appendChild(media);
  wrapper.appendChild(caption);

  return wrapper;
}

// =============================
// 4. Budowanie galerii z danego katalogu
// =============================

async function buildGallery(folderPath, containerId, tagLabel) {
  const container = document.getElementById(containerId);
  if (!container) return;

  container.innerHTML = "<p style='color:#9ca3af;font-size:0.9rem'>Ładowanie zdjęć…</p>";

  try {
    const files = await fetchImagesFromFolder(folderPath);
    container.innerHTML = "";

    if (!files.length) {
      container.innerHTML = "<p style='color:#9ca3af;font-size:0.9rem'>Brak zdjęć w tym katalogu.</p>";
      return;
    }

    files.forEach((file) => {
      const item = createGalleryItem(file, tagLabel);
      container.appendChild(item);
    });
  } catch (error) {
    console.error(error);
    container.innerHTML = "<p style='color:#f97373;font-size:0.9rem'>Błąd ładowania zdjęć z GitHuba.</p>";
  }
}

// =============================
// 5. Zakładki (tabs) – to samo co było + używamy istniejącego HTML
// =============================

function setupTabs() {
  const buttons = document.querySelectorAll(".tab-btn");
  const sections = document.querySelectorAll(".tab-section");

  buttons.forEach((btn) => {
    btn.addEventListener("click", () => {
      const tab = btn.getAttribute("data-tab");

      buttons.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");

      sections.forEach((section) => {
        if (section.getAttribute("data-section") === tab) {
          section.classList.add("active");
        } else {
          section.classList.remove("active");
        }
      });
    });
  });
}

function setupMobileMenu() {
  const menuToggle = document.querySelector(".menu-toggle");
  const nav = document.querySelector(".nav");

  if (!menuToggle || !nav) return;

  menuToggle.addEventListener("click", () => {
    nav.classList.toggle("open");
  });

  // zamykamy menu po kliknięciu w link/przycisk
  nav.addEventListener("click", (e) => {
    if (e.target.classList.contains("tab-btn") || e.target.classList.contains("nav-link")) {
      nav.classList.remove("open");
    }
  });
}

// =============================
// 6. Rok w stopce
// =============================

function setCurrentYear() {
  const yearEl = document.getElementById("year");
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }
}

// =============================
// 7. Inicjalizacja po załadowaniu strony
// =============================

document.addEventListener("DOMContentLoaded", () => {
  buildGallery("images/drone", "drone-gallery", "Drone");
  buildGallery("images/ai", "ai-gallery", "AI");

  buildVideoGallery("video-gallery", youtubeVideos);

  setupTabs();
  setupMobileMenu();
  setCurrentYear();
});

// LIGHTBOX: klik — pokaż duży obrazek
document.addEventListener("click", (e) => {
  if (e.target.tagName === "IMG" && e.target.closest(".gallery-media")) {
    const fullSrc = e.target.src;
    const overlay = document.getElementById("lightbox-overlay");
    const img = overlay.querySelector("img");
    img.src = fullSrc;
    overlay.style.display = "flex";
  }
});

// klik poza obrazkiem = zamknięcie lightboxa
document.getElementById("lightbox-overlay").addEventListener("click", () => {
  document.getElementById("lightbox-overlay").style.display = "none";
});




