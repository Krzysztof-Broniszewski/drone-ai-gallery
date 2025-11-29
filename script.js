document.addEventListener("DOMContentLoaded", () => {
  // tabs
  const buttons = document.querySelectorAll(".tab-btn");
  const sections = document.querySelectorAll(".tab-section");

  buttons.forEach(btn => {
    btn.addEventListener("click", () => {
      const tab = btn.getAttribute("data-tab");

      buttons.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");

      sections.forEach(section => {
        if (section.getAttribute("data-section") === tab) {
          section.classList.add("active");
        } else {
          section.classList.remove("active");
        }
      });
    });
  });

  // footer year
  const yearEl = document.getElementById("year");
  yearEl.textContent = new Date().getFullYear();
});
