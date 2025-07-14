import RenderHomePageItems from "./js/classes/renderHomePage.js";
import Catalog from "./js/classes/catalog.js";
import CatalogItems from "./js/classes/filterItems.js";
import { initEvents } from "./js/handlers/initEvents.js";
import { initCatalogHandlers } from "./js/handlers/catalogHandlers.js";
import { initCatalogItemsHandlers } from "./js/handlers/catalogItemsHandlers.js";
import { initRecentItems } from "./js/components/recentItems.js";
import { initSearchItems } from "./js/components/searchItems.js";
import { toggleFavoritesClasses } from "./js/components/favorites.js";
import { toggleCartIcons } from "./js/components/cart.js";

// import { AsYouType } from "libphonenumber-js";

async function getData() {
  try {
    const res = await fetch("https://dummyjson.com/products?limit=0");
    if (!res) throw new Error("HTTP error ", res.status);

    return await res.json();
  } catch (error) {
    console.error(error);
  }
}

const productsData = [];
const uniqueCategories = [];

const catalogItems = document.querySelector(".catalog-items");

async function initApp() {
  try {
    const data = await getData();

    data.products.forEach((item) => {
      productsData.push(item);

      if (uniqueCategories.some((el) => el.category === item.category)) return;

      uniqueCategories.push(item);
    });

    const popularCategories = new RenderHomePageItems(
      uniqueCategories,
      ".popular-categories__grid"
    );
    popularCategories.createPopularCategories();

    const catalogList = new RenderHomePageItems(uniqueCategories, ".header__catalog-content");
    catalogList.fillCatalogList();

    // initProductPage(productsData, showClickedPage);
    initSearchItems(productsData, showClickedPage);
    initRecentItems();
    toggleFavoritesClasses();
    toggleCartIcons();

    initEvents(productsData);
  } catch (error) {
    console.error(error);
  }
}

initApp();

export function showClickedPage(requiredPage) {
  const mainChildren = document.querySelector("main").children;
  for (const item of mainChildren) item.classList.add("hidden");

  requiredPage.classList.remove("hidden");

  toggleFavoritesClasses();
  toggleCartIcons();
}

export function showCatalogItemsPage(clickedItem, catalogContainer) {
  if (clickedItem) {
    showClickedPage(catalogItems);

    const itemsClass = new Catalog(productsData, catalogContainer);
    itemsClass.createCatalogByCategory(clickedItem);

    toggleFavoritesClasses();
    toggleCartIcons();
  }
}

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

initCatalogItemsHandlers();
