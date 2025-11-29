# Drone & AI Gallery

Interaktywna galeria zdjęć z drona i grafik AI, z automatycznym ładowaniem obrazów z repozytorium GitHub, układem typu masonry, podglądem w lightboxie oraz sekcją z filmami z YouTube i zakładką z CV autora.

**Live:**  
https://krzysztof-broniszewski.github.io/drone-ai-gallery/

---

## Funkcje

- 📂 **Automatyczna galeria** – wszystkie pliki `.jpg` / `.jpeg` / `.png` z katalogów:
  - `images/drone`
  - `images/ai`  
  są pobierane przez GitHub API i wyświetlane bez ręcznego dopisywania ich w kodzie.

- 🧱 **Masonry layout** – układ mozaiki (różne wysokości kafelków, brak „dziur”), wspólny dla zdjęć z drona i AI.

- 🔍 **Lightbox** – kliknięcie na miniaturę otwiera powiększony obraz na ciemnym tle.

- 🎥 **Drone videos** – zakładka z kartami wideo, każda karta prowadzi do konkretnego filmu na YouTube (bez trzymania w repo ciężkich plików wideo).

- 📄 **CV autora** – osobna zakładka z osadzoną stroną CV:
  - https://krzysztof-broniszewski.github.io/krzysztof-cv

- 🌙 **Dark theme** – całość zaprojektowana pod ciemny motyw (spójne z pozostałymi projektami).

---

## Struktura projektu

```text
drone-ai-gallery/
├─ index.html         # główny plik strony, layout, sekcje i zakładki
├─ styles.css         # stylizacja (dark theme, masonry, lightbox, navbar)
├─ script.js          # logika galerii, GitHub API, YouTube, lightbox, zakładki
├─ assets/
│  └─ king-of-drone-logo.png   # logo w nagłówku
└─ images/
   ├─ drone/         # zdjęcia z drona (JPG/PNG)
   └─ ai/            # wygenerowane obrazy AI (JPG/PNG)
