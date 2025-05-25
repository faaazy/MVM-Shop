import RenderHomePageItems from "./js/renderHomePage.js";
import Catalog from "./js/catalog.js";
import CatalogItems from "./js/filterItems.js";

async function getData() {
  const res = await fetch("https://dummyjson.com/products?limit=0");
  const data = await res.json();

  return data;
}

const uniqueCategories = [];
const productsData = [];

const mainHome = document.querySelector(".home");
const mainCatalog = document.querySelector(".catalog");
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
});

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

// Show Clicked Page Function
function showClickedPage(requiredPage) {
  const mainChildren = document.querySelector("main").children;
  for (const item of mainChildren) item.classList.add("hidden");

  requiredPage.classList.remove("hidden");
}

// Show Catalog
const categoriesBtn = document.querySelector(".banner__text-btn");
categoriesBtn.addEventListener("click", () => {
  showClickedPage(mainCatalog);

  const allCategories = new Catalog(uniqueCategories, ".catalog__grid");
  allCategories.createCatalog();
});

// Show Main Menu
const logo = document.querySelector(".logo");
logo.addEventListener("click", () => {
  showClickedPage(mainHome);
});

// ShowCatalogItemsPage function
function showCatalogItemsPage(clickedItem, catalogContainer) {
  if (clickedItem) {
    showClickedPage(catalogItems);

    const itemsClass = new Catalog(productsData, catalogContainer);
    itemsClass.createCatalogByCategory(clickedItem);
  }
}

// Items in category
const catalogContainer = document.querySelector(".catalog__grid");
catalogContainer.addEventListener("click", (event) => {
  const clickedItem = event.target.closest(".catalog__item");

  showCatalogItemsPage(clickedItem, ".catalog__items-grid");
});

// Popular Categories items
const popularCategoriesContainer = document.querySelector(".popular-categories__grid");
popularCategoriesContainer.addEventListener("click", (event) => {
  const clickedItem = event.target.closest(".popular-categories__item");

  showCatalogItemsPage(clickedItem, ".catalog__items-grid");

  CatalogItems.setCatalogFilterPricesValues();

  const form = document.querySelector(".catalog__items-left");
  form.reset();
});

// Catalog List items
const catalogList = document.querySelector(".header__catalog-content");
catalogList.addEventListener("click", (event) => {
  const clickedItem = event.target.closest(".catalog__list-item");

  showCatalogItemsPage(clickedItem, ".catalog__items-grid");
});

// Catalog Items
const formApplyBtn = document.querySelector(".catalog__items-left__apply-btn");

// const catalogItemsClass = new CatalogItems(productsData);
formApplyBtn.addEventListener("click", () => {
  const form = document.querySelector(".catalog__items-left");
  const formData = new FormData(form);

  new CatalogItems(productsData).filterItems(formData);
});

// catalogItemsFilterSort Toggle
const catalogFilterSort = document.querySelector(".catalog__items-filter__sort");
const catalogFilterSortList = document.querySelector(".catalog__items-filter__sort-list");
const catalogFilterSortIcon = catalogFilterSort.querySelector("img");

document.addEventListener("click", (event) => {
  if (event.target.closest(".catalog__items-filter__sort-list__item")) {
    catalogFilterSortList.classList.add("hidden");
    catalogFilterSortIcon.style.transform = "rotate(0deg)";

    new CatalogItems().sortCatalogItems(productsData, event.target.dataset.sort);

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

// catalogItemsFilter
