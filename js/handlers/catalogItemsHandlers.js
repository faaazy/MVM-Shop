import { initCatalogClass, catalogItemsClass, showCatalogItemsPage } from "../../index.js";
import CatalogItems from "../classes/filterItems.js";

export function initCatalogItemsHandlers() {
  // Catalog Items
  const formApplyBtn = document.querySelector(".catalog__items-left__apply-btn");

  formApplyBtn.addEventListener("click", () => {
    initCatalogClass();

    const form = document.querySelector(".catalog__items-left");
    const formData = new FormData(form);

    catalogItemsClass.filterItems(formData);
  });

  // catalogItemsFilterSort Toggle
  const catalogFilterSort = document.querySelector(".catalog__items-filter__sort");
  const catalogFilterSortList = document.querySelector(".catalog__items-filter__sort-list");
  const catalogFilterSortIcon = catalogFilterSort.querySelector("img");

  document.addEventListener("click", (event) => {
    if (event.target.closest(".catalog__items-filter__sort-list__item")) {
      initCatalogClass();

      catalogFilterSortList.classList.add("hidden");
      catalogFilterSortIcon.style.transform = "rotate(0deg)";

      catalogItemsClass.sortCatalogItems(event.target.dataset.sort);

      [...catalogFilterSortList.children].forEach((item) => item.classList.remove("active"));

      event.target.classList.add("active");
    } else if (event.target.closest(".catalog__items-filter__sort")) {
      const isHidden = catalogFilterSortList.classList.toggle("hidden");
      catalogFilterSortIcon.style.transform = isHidden ? "rotate(0deg)" : "rotate(180deg)";
    } else {
      catalogFilterSortList.classList.add("hidden");
      catalogFilterSortIcon.style.transform = "rotate(0deg)";
    }
  });

  // Popular Categories items
  const popularCategoriesContainer = document.querySelector(".popular-categories__grid");
  popularCategoriesContainer.addEventListener("click", (event) => {
    const clickedItem = event.target.closest(".popular-categories__item");

    showCatalogItemsPage(clickedItem, ".catalog__items-grid");
    resetActiveItems();

    CatalogItems.setCatalogFilterPricesValues();

    const form = document.querySelector(".catalog__items-left");
    form.reset();
  });

  // change layout
  const changeLayoutContainer = document.querySelector(".catalog__items-filter__change");

  changeLayoutContainer.addEventListener("click", (event) => {
    const catalogGrid = document.querySelector(".catalog__items-grid");

    switch (event.target.dataset.layout) {
      case "rows":
        catalogGrid.classList.add("layout-rows");
        catalogGrid.classList.remove("layout-grid");
        break;

      case "grid":
        catalogGrid.classList.add("layout-grid");
        catalogGrid.classList.remove("layout-rows");
        break;

      default:
        break;
    }
  });
}

function resetActiveItems() {
  const catalogItemsFilterList = document.querySelector(
    ".catalog__items-filter__sort-list"
  ).children;

  for (const item of catalogItemsFilterList) {
    item.classList.remove("active");
  }
}
