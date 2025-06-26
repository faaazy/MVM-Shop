import { debounce } from "./debounce.js";

export function initSearchItems(productsData, showClickedPage) {
  const search = document.querySelector(".search");

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

    showClickedPage(document.querySelector(".search"));
  }, 500);

  const searchInput = document.querySelector(".search__input");

  searchInput.addEventListener("input", () => {
    debouncedSearch(searchInput.value);
  });
}

function renderSearchItems(products) {
  const searchContainer = document.querySelector(".search__grid");

  products.forEach((item) => {
    const searchItemHTML = `
        <div class="catalog__items-product">
          <div class="placeholder"></div>
          <div class="recent__item-img">
            <img src="${item.images[0]}" alt="" class="recent__item-img__image" />
          </div>
          <div class="catalog__items-product__content">
            <div class="recent__item-title">${item.title}</div>
            <div class="recent__item-bottom">
              <div class="recent__item-rating">
                <div class="recent__item-rating__img">
                  <img src="./img/star.svg" alt="" />
                </div>
                <div class="recent__item-rating__num">${item.rating}</div>
                <div class="recent__item-rating__reviews">${item.reviews.length} reviews</div>
              </div>
              <div class="recent__item-cta">
                <div class="recent__item-cta__price">$ ${item.price}</div>
                <div class="recent__item-cta__favorite recent__item-cta__img">
                  <img src="./img/heart.svg" alt="" />
                </div>
                <div class="recent__item-cta__cart recent__item-cta__img">
                  <img src="./img/cart.svg" alt="" />
                </div>
              </div>
            </div>
          </div>
        </div>
    `;

    searchContainer.insertAdjacentHTML("beforeend", searchItemHTML);

    const img = document.querySelector(".catalog__items-product img");
    img.style.display = "none";

    img.onload = () => {
      document.querySelector(".placeholder").remove();
      img.style.display = "inline";
    };
  });
}
