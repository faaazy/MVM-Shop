import { showClickedPage } from "../../index.js";
import { initProductPage } from "../components/productPage.js";
import { renderFavoritesPage, toggleFavorites } from "../components/favorites.js";
import {
  renderCartPage,
  toggleCart,
  changeCartItemCounter,
  toggleCartIcons,
} from "../components/cart.js";

export function initEvents(productsData) {
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

    // init product page
    if (
      event.target.classList.contains("recent__item-title") ||
      event.target.classList.contains("recent__item-img__image")
    ) {
      const clickedProduct =
        event.target.closest(".catalog__items-product") || event.target.closest(".recent__item");
      initProductPage(productsData, showClickedPage, clickedProduct);
    }

    // init favorites page
    if (event.target.closest("[data-nav-favorites]")) {
      const favoritesPage = document.querySelector(".favorites");

      renderFavoritesPage(JSON.parse(localStorage.getItem("favorites")));

      showClickedPage(favoritesPage);
    }

    // init cart page
    if (event.target.closest("[data-nav-cart]")) {
      const cartPage = document.querySelector(".cart");

      renderCartPage(JSON.parse(localStorage.getItem("cartItems")));

      showClickedPage(cartPage);
    }

    // initFavorites
    if (
      event.target.classList.contains("recent__item-cta__favorite") ||
      event.target.classList.contains("product-page__main-row__right-buy__favorite")
    ) {
      const clickedProduct = event.target.closest("[data-id]");

      toggleFavorites(clickedProduct, productsData);

      event.target.classList.toggle("active");
    }

    // initCart
    if (
      event.target.classList.contains("recent__item-cta__cart") ||
      event.target.classList.contains("product-page__main-row__right-buy__btn")
    ) {
      const clickedProduct = event.target.closest("[data-id]");
      const cartPage = document.querySelector(".cart");

      toggleCart(clickedProduct, productsData);

      if (event.target.classList.contains("active")) {
        showClickedPage(cartPage);
        renderCartPage(JSON.parse(localStorage.getItem("cartItems")));
      }

      toggleCartIcons();

      // event.target.classList.toggle("active");
    }

    // init counter
    if (event.target.closest(".recent__item-counter")) {
      changeCartItemCounter(event.target, productsData);
    }
  });

  // Show Main Menu
  const logo = document.querySelector(".logo");
  logo.addEventListener("click", () => {
    showClickedPage(mainHome);
  });
}
