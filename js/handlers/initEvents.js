import { showClickedPage } from "../../index.js";

export function initEvents() {
  const mainHome = document.querySelector(".home");

  // CatalogContent Toggle
  const catalogBtn = document.querySelector(".header__catalog-btn");
  const catalogContent = document.querySelector(".header__catalog-content");
  const catalogIcon = catalogBtn.querySelector("img");

  document.addEventListener("click", (event) => {
    if (event.target.closest(".header__catalog-content a")) {
      catalogContent.classList.add("hidden");
      catalogIcon.style.transform = "rotate(0deg)";
    } else if (event.target.closest(".header__catalog-btn")) {
      const isHidden = catalogContent.classList.toggle("hidden");
      catalogIcon.style.transform = isHidden ? "rotate(0deg)" : "rotate(180deg)";
    } else {
      catalogContent.classList.add("hidden");
      catalogIcon.style.transform = "rotate(0deg)";
    }
  });

  // Show Main Menu
  const logo = document.querySelector(".logo");
  logo.addEventListener("click", () => {
    showClickedPage(mainHome);
  });
}
