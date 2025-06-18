import { showCatalogItemsPage } from "./../index.js";

export function initCatalogHandlers(showClickedPage, Catalog, uniqueCategories) {
  const mainCatalog = document.querySelector(".catalog");

  // Show Catalog
  const categoriesBtn = document.querySelector(".banner__text-btn");
  categoriesBtn.addEventListener("click", () => {
    showClickedPage(mainCatalog);

    const allCategories = new Catalog(uniqueCategories, ".catalog__grid");
    allCategories.createCatalog();
  });

  // Items in category
  const catalogContainer = document.querySelector(".catalog__grid");
  catalogContainer.addEventListener("click", (event) => {
    const clickedItem = event.target.closest(".catalog__item");

    showCatalogItemsPage(clickedItem, ".catalog__items-grid");
  });

  // Catalog List items
  const catalogList = document.querySelector(".header__catalog-content");
  catalogList.addEventListener("click", (event) => {
    const clickedItem = event.target.closest(".catalog__list-item");

    showCatalogItemsPage(clickedItem, ".catalog__items-grid");
  });
}
