export default class Catalog {
  constructor(data, container) {
    this.data = data;
    this.container = document.querySelector(container);
    this.uniqueCategoies = new Set();
    this.uniqueItems = [];
  }

  createCatalog() {
    this.container.innerHTML = "";

    this.data.filter((item) => {
      if (this.uniqueCategoies.has(item.category)) return;

      this.uniqueCategoies.add(item.category);
      this.uniqueItems.push(item);
    });

    this.uniqueItems.forEach((item) => {
      const catalogItem = document.createElement("div");

      catalogItem.className = `catalog__item`;
      catalogItem.dataset.category = item.category;

      catalogItem.innerHTML = `
              <div class="placeholder"></div>
              <div class="catalog__item-img">
                <img src="${item.images[0]}" alt="" />
              </div>
              <div class="catalog__item-title">${item.category.toUpperCase()}</div>
            `;

      const img = catalogItem.querySelector("img");
      img.onload = () => {
        catalogItem.querySelector(".placeholder").remove();
        img.style.display = "block";
      };

      this.container.insertAdjacentElement("beforeend", catalogItem);
    });
  }

  createCatalogByCategory(elem) {
    this.container.innerHTML = "";

    this.data.forEach((item) => {
      if (item.category == elem.dataset.category) {
        const categoryProduct = document.createElement("div");

        categoryProduct.className = `catalog__items-product`;
        categoryProduct.dataset.category = item.category;

        categoryProduct.innerHTML = `
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
          `;

        const img = categoryProduct.querySelector(".catalog__items-product img");
        img.style.display = "none";

        img.onload = () => {
          categoryProduct.querySelector(".placeholder").remove();
          img.style.display = "inline";
        };

        this.container.insertAdjacentElement("beforeend", categoryProduct);

        const catalogItemsTitle = document.querySelector(".catalog__items-heading__title");
        catalogItemsTitle.innerHTML = `${
          item.category.charAt(0).toUpperCase() + item.category.slice(1)
        } ${this.container.children.length} items`;

        const catalogItemsRatingCount = document.querySelector(
          ".catalog__items-left__rating .checkbox-fake"
        );

        const catalogItemsRatingsArr = document.querySelectorAll(
          ".catalog__items-grid .recent__item-rating__num"
        );

        let ratingCount = 0;
        catalogItemsRatingsArr.forEach((item) =>
          parseFloat(item.innerHTML) >= 4 ? ratingCount++ : true
        );

        catalogItemsRatingCount.innerHTML = `Rating 4 or more (${ratingCount})`;
      }
    });
  }
}
