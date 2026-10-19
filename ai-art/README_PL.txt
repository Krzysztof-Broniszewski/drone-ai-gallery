AI ART — wersja spójna z Twoim portfolio

1. Skopiuj folder ai-art do głównego folderu strony (nadpisz stary ai-art po zrobieniu kopii).
2. Pozostaw istniejące pliki w katalogu głównym bez zmian: theme.css, site.js, gallery.js, components/navbar.css, components/navbar.js i assets/king-of-drone-logo.svg.
3. Nie edytuj głównego index.html — link ai-art/index.html pozostaje bez zmian.
4. Otwieraj przez VS Code Live Server lub GitHub Pages (fetch JSON nie działa poprawnie przy file://).
5. Zdjęcia do kategorii dodawaj do ai-art/categories/<slug>/ i uruchom w folderze ai-art: python build_gallery.py (wymaga Pillow: pip install pillow).
6. Skrypt aktualizuje gallery-data.json; nowe zdjęcia nie są ładowane na stronie głównej AI Art.
7. Navbar, footer, hero, złote ramki i lightbox bazują na oryginalnym index(8).html.
