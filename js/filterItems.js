export default class CatalogItems {
  constructor(data) {
    this.data = data;
    this.container = document.querySelector(".catalog__items-grid");
    this.category = document
      .querySelector(".catalog__items-heading__title")
      .innerText.split(" ")[0]
      .toLowerCase();

    this.baseItems = this.data.filter((item) => item.category === this.category);
    this.filteredItemsArr = [...this.baseItems];
  }

  renderCatalogItemsProduct = (item) => {
    const categoryProduct = document.createElement("div");

    categoryProduct.className = `catalog__items-product`;
    categoryProduct.dataset.category = item.category;

    categoryProduct.innerHTML = `
          <div class="placeholder"></div>
          <div class="recent__item-img">
            <img src="${item.images[0]}" alt="${item.title}" class="recent__item-img__image" />
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
  };

  filterItems(formData) {
    let isRatingSelected = false;

    for (const [key] of formData) {
      if (key == "value-rating") {
        isRatingSelected = true;
        break;
      }
    }

    const priceFrom = parseFloat(document.querySelector('input[name="value-price-from"]').value);
    const priceTo = parseFloat(document.querySelector('input[name="value-price-to"]').value);

    const filtered = this.baseItems.filter((item) => {
      const isRatingOk = isRatingSelected ? item.rating >= 4 : true;

      const isPriceFromValid = isNaN(priceFrom) || item.price >= priceFrom;
      const isPriceToValid = isNaN(priceTo) || item.price <= priceTo;

      const isPriceOk = isPriceFromValid && isPriceToValid;

      return isRatingOk && isPriceOk;
    });

    this.filteredItemsArr = filtered;

    this.container.innerHTML = "";

    filtered.forEach((item) => this.renderCatalogItemsProduct(item));
  }

  static setCatalogFilterPricesValues() {
    let catalogItemsPricesArr = [];

    const filterPriceItems = document.querySelectorAll(".catalog__items-left__price-num");

    const catalogItemsPricesItems = document
      .querySelector(".catalog__items-grid")
      .querySelectorAll(".recent__item-cta__price");

    for (const elem of catalogItemsPricesItems) {
      catalogItemsPricesArr.push(parseFloat(elem.innerHTML.slice(1).trim()));
    }

    const highestPrice = Math.max(...catalogItemsPricesArr),
      lowestPrice = Math.min(...catalogItemsPricesArr);

    const valuePriceFromItem = document.querySelector('input[name="value-price-from"]');
    const valuePriceToItem = document.querySelector('input[name="value-price-to"]');

    filterPriceItems.forEach((item) => {
      item.setAttribute("min", lowestPrice);
      item.setAttribute("max", highestPrice);

      valuePriceFromItem.setAttribute("placeholder", lowestPrice);
      valuePriceToItem.setAttribute("placeholder", highestPrice);
    });

    function validatePrices() {
      let fromValue = parseFloat(valuePriceFromItem.value) || lowestPrice;
      let toValue = parseFloat(valuePriceToItem.value) || highestPrice;

      if (fromValue > toValue) {
        fromValue = toValue;
        valuePriceToItem.value = parseFloat(valuePriceFromItem.value);

        valuePriceFromItem.value = fromValue;
      }

      if (toValue < fromValue) {
        toValue = fromValue;
        valuePriceToItem.value = toValue;
      }

      if (fromValue < valuePriceFromItem.getAttribute("min")) {
        valuePriceFromItem.value = valuePriceFromItem.getAttribute("min");
      }

      if (toValue > valuePriceToItem.getAttribute("max")) {
        valuePriceToItem.value = valuePriceToItem.getAttribute("max");
      }
    }

    const filterPriceContainer = document.querySelector(".catalog__items-left__price-row");
    filterPriceContainer.addEventListener("input", validatePrices);
  }

  sortCatalogItems(sortType) {
    switch (sortType) {
      case "cheap":
        this.filteredItemsArr.sort((a, b) => a.price - b.price);
        break;

      case "expensive":
        this.filteredItemsArr.sort((a, b) => b.price - a.price);
        break;

      case "rating":
        this.filteredItemsArr.sort((a, b) => b.rating - a.rating);

      default:
        break;
    }

    this.container.innerHTML = "";
    this.filteredItemsArr.forEach((item) => this.renderCatalogItemsProduct(item));
  }
}
