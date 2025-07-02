import RenderHomePageItems from "./js/classes/renderHomePage.js";
import Catalog from "./js/classes/catalog.js";
import CatalogItems from "./js/classes/filterItems.js";
import { initEvents } from "./js/handlers/initEvents.js";
import { initCatalogHandlers } from "./js/handlers/catalogHandlers.js";
import { initCatalogItemsHandlers } from "./js/handlers/catalogItemsHandlers.js";
import { initProductPage } from "./js/components/productPage.js";
import { initRecentItems } from "./js/components/recentItems.js";
import { initSearchItems } from "./js/components/searchItems.js";
import { addToFavorites } from "./js/components/favorites.js";

async function getData() {
  const res = await fetch("https://dummyjson.com/products?limit=0");
  const data = await res.json();

  return data;
}

const uniqueCategories = [];
const productsData = [];

const catalogItems = document.querySelector(".catalog-items");

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

  // init Game Page
  initProductPage(productsData, showClickedPage);

  // init Recent Items
  initRecentItems();

  // init Search Items
  initSearchItems(productsData, showClickedPage);
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
initCatalogHandlers(showClickedPage, Catalog, productsData, uniqueCategories);

// Init Catalog Class func
export let catalogItemsClass;

export function initCatalogClass() {
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

// init Catalog Items Handlers
initCatalogItemsHandlers();

// initFavorites
document.addEventListener("click", (event) => {
  if (
    event.target.classList.contains("recent__item-cta__favorite") ||
    event.target.classList.contains("product-page__main-row__right-buy__favorite")
  ) {
    const clickedProduct = event.target.closest("[data-id]");

    addToFavorites(clickedProduct, productsData);

    event.target.classList.contains("active")
      ? event.target.classList.remove("active")
      : event.target.classList.add("active");
  }
});
