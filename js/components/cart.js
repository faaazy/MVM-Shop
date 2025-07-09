export function toggleCart(clickedProduct, productsData) {
  const productId = parseInt(clickedProduct.dataset.id);
  const cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];

  const clickedProductIndex = cartItems.findIndex((item) => item.id === productId);
  const product = productsData.find((item) => item.id === productId);

  if (clickedProduct.parentElement.classList.contains("cart__left")) {
    cartItems.splice(clickedProductIndex, 1);

    localStorage.setItem("cartItems", JSON.stringify(cartItems));

    renderCartPage(cartItems);

    return;
  } else {
    if (clickedProductIndex === -1) {
      product.cart = 1;

      cartItems.push(product);

      localStorage.setItem("cartItems", JSON.stringify(cartItems));
    }
  }
}

export function renderCartPage(cartItems) {
  const cartTitle = document.querySelector(".cart__title");

  cartTitle.innerHTML = `Cart <span>${cartItems.length} items</span>`;

  const cartItemsContainer = document.querySelector(".cart__left");

  cartItemsContainer.innerHTML = "";

  cartItems.forEach((item) => {
    const cartItem = document.createElement("div");
    cartItem.className = "catalog__items-product";
    cartItem.dataset.id = item.id;

    cartItem.innerHTML = `
        <div class="placeholder"></div>
        <div class="recent__item-img">
            <img src="${item.images[0]}" alt="" class="recent__item-img__image" />
        </div>
        <div class="catalog__items-product__content">
          <div class="recent__item-title">${item.title}</div>
          <div class="recent__item-bottom">
              <div class="recent__item-cta">
                  <div class="recent__item-cta__price">$ ${item.price}</div>
                  <div class="recent__item-cta__favorite recent__item-cta__img active">
                  <i class="fa-regular fa-heart"></i>
                  </div>
                  <div class="recent__item-cta__cart recent__item-cta__img">
                  <img src="./img/cart.svg" alt="" />
                  </div>
              </div>
          </div>
          <div class="recent__item-stock ${
            item.availabilityStatus == "In Stock" ? "instock" : "outofstock"
          }">${item.availabilityStatus}</div>
          <div class="recent__item-counter">
          <div class="recent__item-counter__decrement" data-counter="minus">
              <i class="fa-solid fa-minus"></i>
          </div>
          <div class="recent__item-counter__num">${item.cart}</div>
          <div class="recent__item-counter__increment" data-counter="plus">
              <i class="fa-solid fa-plus"></i>
          </div>
          </div>
        </div>
      `;

    const img = cartItem.querySelector(".catalog__items-product img");
    img.style.display = "none";

    img.onload = () => {
      cartItem.querySelector(".placeholder").remove();
      img.style.display = "inline";
    };

    cartItemsContainer.insertAdjacentElement("beforeend", cartItem);
  });
}

export function changeCartItemCounter(clickedSymbol, productsData) {
  const cartItem = clickedSymbol.parentElement.parentElement.parentElement;
  const counterNum = clickedSymbol.parentElement.querySelector(".recent__item-counter__num");

  const cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];

  const clickedCartProduct = cartItems.find((item) => item.id === parseInt(cartItem.dataset.id));

  switch (clickedSymbol.dataset.counter) {
    case "minus":
      if (parseInt(counterNum.innerHTML) > 1) {
        clickedCartProduct.cart = parseInt(counterNum.innerHTML) - 1;
        counterNum.innerHTML--;

        localStorage.setItem("cartItems", JSON.stringify(cartItems));
      } else if (parseInt(counterNum.innerHTML) == 1) {
        clickedCartProduct.cart = 0;

        localStorage.setItem("cartItems", JSON.stringify(cartItems));

        toggleCart(cartItem, productsData);
        toggleCartIcons();
      }
      break;

    case "plus":
      clickedCartProduct.cart = parseInt(counterNum.innerHTML) + 1;
      counterNum.innerHTML++;

      localStorage.setItem("cartItems", JSON.stringify(cartItems));
      break;

    default:
      break;
  }
}

export function toggleCartIcons() {
  document.querySelectorAll("[data-id]").forEach((product) => {
    const productId = product.dataset.id;

    const cartIcon = product.querySelector(".recent__item-cta__cart");
    // product.querySelector(".product-page__main-row__right-buy__favorite");

    const cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];

    const cartProduct = cartItems.find((item) => item.id == productId);

    if (cartIcon) {
      cartProduct ? cartIcon.classList.add("active") : cartIcon.classList.remove("active");
    }

    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  });
}
