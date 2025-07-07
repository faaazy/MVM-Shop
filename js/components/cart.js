export function toggleCart(clickedProduct, productsData) {
  const productId = parseInt(clickedProduct.dataset.id);
  const cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];

  const clickedProductIndex = cartItems.findIndex((item) => item.id === productId);

  if (clickedProductIndex === -1) {
    const product = productsData.find((item) => item.id === productId);

    if (product) {
      cartItems.push(product);
    }
  } else {
    cartItems.splice(clickedProductIndex, 1);

    renderCartPage(cartItems);
  }

  localStorage.setItem("cartItems", JSON.stringify(cartItems));
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
          <div class="recent__item-counter__num">1</div>
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
  console.log(clickedSymbol.parentElement.parentElement.parentElement);
  const cartItem = clickedSymbol.parentElement.parentElement.parentElement;
  const counterNum = clickedSymbol.parentElement.querySelector(".recent__item-counter__num");

  switch (clickedSymbol.dataset.counter) {
    case "minus":
      if (parseInt(counterNum.innerHTML) > 1) {
        counterNum.innerHTML--;
      } else if (parseInt(counterNum.innerHTML) == 1) {
        toggleCart(cartItem, productsData);
      }

      break;
    case "plus":
      if (parseInt(counterNum.innerHTML) >= 1) {
        counterNum.innerHTML++;
      }
      break;

    default:
      break;
  }
}
