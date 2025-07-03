export function toggleFavorites(clickedProduct, productsData) {
  const productId = parseInt(clickedProduct.dataset.id);
  const favorites = JSON.parse(localStorage.getItem("favorites")) || [];

  const clickedProductIndex = favorites.findIndex((item) => item.id === productId);

  if (clickedProductIndex === -1) {
    const product = productsData.find((item) => item.id === productId);

    product ? favorites.push(product) : true;
  } else {
    favorites.splice(clickedProductIndex, 1);
  }

  localStorage.setItem("favorites", JSON.stringify(favorites));
}

export function renderFavoritesPage(favorites) {
  const favoritesHeadingTitle = document.querySelector(".favorites__heading-title");

  favoritesHeadingTitle.innerHTML = `${favorites.length} items worth: $${favorites.reduce(
    (total, product) => (parseFloat(total) + product.price).toFixed(2),
    0
  )}`;

  const favoritesContainer = document.querySelector(".favorites__main");

  favoritesContainer.innerHTML = "";

  favorites.forEach((item) => {
    const favoritesItem = document.createElement("div");
    favoritesItem.className = "catalog__items-product";
    favoritesItem.dataset.id = item.id;

    favoritesItem.innerHTML = `
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
                  <i class="fa-regular fa-heart"></i>
                </div>
                <div class="recent__item-cta__cart recent__item-cta__img">
                  <img src="./img/cart.svg" alt="" />
                </div>
              </div>
            </div>
          </div>
    `;

    const img = favoritesItem.querySelector(".catalog__items-product img");
    img.style.display = "none";

    img.onload = () => {
      favoritesItem.querySelector(".placeholder").remove();
      img.style.display = "inline";
    };

    favoritesContainer.insertAdjacentElement("beforeend", favoritesItem);
  });
}
