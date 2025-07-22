import { showClickedPage } from "../../index.js";
import { initProductPage } from "../components/productPage.js";
import {
  renderFavoritesPage,
  toggleFavorites,
  toggleFavoritesClasses,
} from "../components/favorites.js";
import {
  renderCartPage,
  toggleCart,
  changeCartItemCounter,
  toggleCartIcons,
} from "../components/cart.js";
import Catalog from "../classes/catalog.js";
import { initCheckoutPage, initCheckoutTabs, saveCheckoutData } from "../components/checkout.js";
import { initProfilePage } from "../components/profile.js";

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

      toggleFavoritesClasses();
      toggleCartIcons();
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

      toggleFavoritesClasses();
      toggleCartIcons();
    }

    // init counter
    if (event.target.closest(".recent__item-counter")) {
      changeCartItemCounter(event.target, productsData);
    }

    // init empty cart catalog click
    if (event.target.classList.contains("cart__empty-advice__link")) {
      showClickedPage(document.querySelector(".catalog"));

      const uniqueCategories = [];

      productsData.forEach((item) => {
        if (uniqueCategories.some((el) => el.category === item.category)) return;

        uniqueCategories.push(item);
      });

      const allCategories = new Catalog(uniqueCategories, ".catalog__grid");
      allCategories.createCatalog();
    }

    // init checkout
    if (event.target.classList.contains("cart__right-btn")) {
      showClickedPage(document.querySelector(".checkout"));

      initCheckoutPage();
    }

    if (event.target.classList.contains("checkout__delivery-tabs__method")) {
      initCheckoutTabs(event.target);
    }

    if (event.target.classList.contains("checkout-submit__btn")) {
      saveCheckoutData();
    }

    if (event.target.classList.contains("checkout__return")) {
      const cartPage = document.querySelector(".cart");

      showClickedPage(cartPage);
    }

    // init profile
    if (event.target.closest("[data-nav-profile]")) {
      const profilePage = document.querySelector(".profile");

      showClickedPage(profilePage);
      initProfilePage();
    }

    // init header burger menu
    if (event.target.closest(".menu-icon-wrapper")) {
      const headerRow = document.querySelector(".header__row");
      const nav = document.querySelector(".header .container");

      document.querySelector(".menu-icon").classList.toggle("menu-icon-active");
      headerRow.classList.toggle("header__row--mobile");
      nav.classList.toggle("nav--mobile");
    }

    // show main menu
    if (event.target.closest(".logo")) {
      showClickedPage(mainHome);
    }
  });
}
