import { debounce } from "../utils/debounce.js";

export function initSearchItems(productsData, showClickedPage) {
  const search = document.querySelector(".searchItems");

  const debouncedSearch = debounce((value) => {
    const searchValue = value.trim().toLowerCase();

    if (searchValue == "") {
      showClickedPage(document.querySelector(".home"));
      return;
    }

    const filteredProducts = productsData.filter((product) => {
      const title = product.title.toLowerCase();
      let searchIndex = 0;

      for (let i = 0; i < title.length; i++) {
        if (title[i] === searchValue[searchIndex]) {
          searchIndex++;
          if (searchIndex === searchValue.length) return true;
        }
      }
      return false;
    });

    renderSearchItems(filteredProducts);

    showClickedPage(search);
  }, 500);

  const searchInput = document.querySelector(".search__input");

  searchInput.addEventListener("input", () => {
    debouncedSearch(searchInput.value);
  });
}

function renderSearchItems(products) {
  const searchContainer = document.querySelector(".searchItems__grid");
  searchContainer.innerHTML = "";

  products.forEach((item) => {
    const searchItem = document.createElement("div");
    searchItem.className = "catalog__items-product";
    searchItem.dataset.id = item.id;

    searchItem.innerHTML = `
          <div class="placeholder"></div>
          <div class="recent__item-img">
            <img src="${item.images[0]}" alt="" class="recent__item-img__image" />
          </div>
          <div class="catalog__items-product__content">
            <div class="recent__item-title">${item.title}</div>
            <div class="recent__item-bottom">
              <div class="recent__item-rating">
                <div class="recent__item-rating__img">
                  <i class="fa-solid fa-star"></i>
                </div>
                <div class="recent__item-rating__num">${item.rating}</div>
                <div class="recent__item-rating__reviews">${item.reviews.length} reviews</div>
              </div>
              <div class="recent__item-cta">
                <div class="recent__item-cta__price">$ ${item.price}</div>
                <div class="recent__item-cta__favorite recent__item-cta__img">
                  <i class="fa-regular fa-heart"></i>
                </div>
                <div class="recent__item-cta__cart recent__item-cta__img">
                  <img src="./img/cart.svg" alt="" />
                </div>
              </div>
            </div>
          </div>
    `;

    const img = searchItem.querySelector(".catalog__items-product img");
    img.style.display = "none";

    img.onload = () => {
      searchItem.querySelector(".placeholder").remove();
      img.style.display = "inline";
    };

    searchContainer.insertAdjacentElement("beforeend", searchItem);
  });
}
