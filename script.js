// =============================
// 1. Konfiguracja repo na GitHubie
// =============================

const GITHUB = {
  owner: "Krzysztof-Broniszewski",   // Twój login
  repo: "drone-ai-gallery",          // Nazwa repo
  branch: "main"                     // Gałąź (zmień jeśli inna)
};

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

  const img = document.createElement("img");
  img.src = fileData.download_url;       // URL pliku z GitHuba
  img.alt = fileData.name;
  img.loading = "lazy";

  const caption = document.createElement("figcaption");
  caption.className = "gallery-caption";

  const titleSpan = document.createElement("span");
  titleSpan.textContent = fileData.name;

  const chip = document.createElement("span");
  chip.className = "gallery-chip";
  chip.textContent = tagLabel || "Photo";

  caption.appendChild(titleSpan);
  caption.appendChild(chip);

  wrapper.appendChild(img);
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
  // Budujemy galerie:
  // ścieżki są względem root repo, tak jak w strukturze:
  // images/drone  -> <div id="drone-gallery">
  // images/ai     -> <div id="ai-gallery">
  buildGallery("images/drone", "drone-gallery", "Drone");
  buildGallery("images/ai", "ai-gallery", "AI");

  setupTabs();
  setCurrentYear();
});

