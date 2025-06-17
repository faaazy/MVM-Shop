import RenderHomePageItems from "./js/renderHomePage.js";
import Catalog from "./js/catalog.js";
import CatalogItems from "./js/filterItems.js";
import { initEvents } from "./js/initEvents.js";
import { initCatalogHandlers } from "./js/catalogHandlers.js";

async function getData() {
  const res = await fetch("https://dummyjson.com/products?limit=0");
  const data = await res.json();

  return data;
}

const uniqueCategories = [];
const productsData = [];

// Render Home Items
getData().then((data) => {
  data.products.forEach((item) => {
    productsData.push(item);

    if (uniqueCategories.some((el) => el.category === item.category)) return;

    uniqueCategories.push(item);
  });

  const popularCategories = new RenderHomePageItems(uniqueCategories, ".popular-categories__grid");
  popularCategories.createPopularCategories();

  const catalogList = new RenderHomePageItems(uniqueCategories, ".header__catalog-content");
  catalogList.fillCatalogList();
});

// showClickedPage function
export function showClickedPage(requiredPage) {
  const mainChildren = document.querySelector("main").children;
  for (const item of mainChildren) item.classList.add("hidden");

  requiredPage.classList.remove("hidden");
}

// ShowCatalogItemsPage function
export function showCatalogItemsPage(clickedItem, catalogContainer) {
  if (clickedItem) {
    showClickedPage(catalogItems);

    const itemsClass = new Catalog(productsData, catalogContainer);
    itemsClass.createCatalogByCategory(clickedItem);
  }
}

// init events
initEvents();

// init catalog handlers
const catalogItems = document.querySelector(".catalog-items");

initCatalogHandlers(showClickedPage, Catalog, productsData, uniqueCategories);

// Popular Categories items
const popularCategoriesContainer = document.querySelector(".popular-categories__grid");
popularCategoriesContainer.addEventListener("click", (event) => {
  const clickedItem = event.target.closest(".popular-categories__item");

  showCatalogItemsPage(clickedItem, ".catalog__items-grid");

  CatalogItems.setCatalogFilterPricesValues();

  const form = document.querySelector(".catalog__items-left");
  form.reset();
});

// Init Catalog Class func
let catalogItemsClass;

function initCatalogClass() {
  const catalogItemsCategory = document
    .querySelector(".catalog__items-heading__title")
    .innerText.split(" ")[0]
    .toLowerCase();

  const catalogItemsContainer = document.querySelector(".catalog__items-grid");

  if (catalogItemsContainer && productsData.length > 0) {
    if (!catalogItemsClass || catalogItemsClass.category !== catalogItemsCategory) {
      catalogItemsClass = new CatalogItems(productsData);
    }
  }
}

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
