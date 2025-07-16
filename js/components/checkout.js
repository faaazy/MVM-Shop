import { initMap } from "../components/map.js";

export function initCheckoutPage() {
  validateCheckoutPhone();

  initCheckoutSwiper();

  renderCheckoutPage();
  // renderCheckoutTotalSection();
}

function validateCheckoutPhone() {
  const checkoutPhoneInput = document.querySelector(".checkout__details-item__input");
  const checkoutDetailsItem = document.querySelector(".checkout__details-item");

  let lastValue = "";

  checkoutPhoneInput.addEventListener("input", (event) => {
    let checkoutPhoneNumber = new libphonenumber.AsYouType("US").input(event.target.value);

    if (checkoutPhoneInput.value.at(0) != 1 || checkoutPhoneInput.value.at(1) == 1) {
      checkoutPhoneInput.value = 1;
      checkoutPhoneInput.setAttribute("value", 1);

      checkoutDetailsItem.style.border = "2px solid red";
    } else {
      if (checkoutPhoneInput.value.length > 16) {
        if (checkoutPhoneInput.value.length >= lastValue.length) {
          checkoutPhoneNumber = checkoutPhoneNumber.slice(0, 16);
          checkoutPhoneInput.value = lastValue;
          checkoutPhoneInput.setAttribute("value", lastValue);
          return;
        }
      } else {
        checkoutDetailsItem.style.border = "2px solid #2b2b2b";
        checkoutPhoneInput.value = checkoutPhoneNumber;
        checkoutPhoneInput.setAttribute("value", checkoutPhoneNumber);
        lastValue = checkoutPhoneNumber;
      }
    }
  });

  checkoutPhoneInput.addEventListener("keydown", (event) => {
    const pressedKey = event.key;
    const physicalKey = event.code;

    if (pressedKey == "Backspace" && checkoutPhoneInput.value.length == 1) {
      checkoutPhoneInput.value = "";
      checkoutPhoneInput.setAttribute("value", "");
    }

    if (pressedKey == "Backspace" && checkoutPhoneInput.value.length == 7) {
      checkoutPhoneInput.value = lastValue.slice(0, -1);
    }
  });
}

function renderCheckoutTotalSection() {
  const cartTotalContainer = document.querySelector(".checkout__row-right");

  const cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];

  const cartItemsLength = cartItems.reduce((total, item) => {
    return total + parseInt(item.cart);
  }, 0);

  const cartItemsTotal = cartItems.reduce((total, item) => {
    return total + parseFloat(item.price) * item.cart;
  }, 0);

  cartTotalContainer.innerHTML = `
      <div class="cart__right-title">Total:</div>
      <div class="cart__right-sum">
        <div class="cart__right-sum__items">${cartItemsLength} items</div>
        <div class="cart__right-sum__total">$ ${cartItemsTotal.toFixed(2)}</div>
      </div>
      <div class="cart__right-btn">
        <button>Confirm order</button>
      </div>
    `;
}

function renderCheckoutPage() {
  const cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];

  const cartItemsContainer = document.querySelector(".checkout__items");

  cartItemsContainer.innerHTML = "";

  cartItems.forEach((item) => {
    const cartItem = document.createElement("div");
    cartItem.className = "catalog__items-product section-bg";

    cartItem.innerHTML = `
          <div class="placeholder"></div>
          <div class="recent__item-title">${item.shippingInformation}</div>
          <div class="recent__item-amount">${item.cart} items</div>
          <div class="recent__item-img">
              <img src="${item.images[0]}" alt="" class="recent__item-img__image" />
          </div>
          <div class="catalog__items-product__content">
            <div class="recent__item-bottom">
                <div class="recent__item-cta">
                    <div class="recent__item-cta__price">$ ${item.price * item.cart}</div>
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

    renderCheckoutTotalSection();
  });
}

export function initCheckoutTabs(clickedTab) {
  const TabsContentContainer = document.querySelector(".checkout__delivery-content");

  switch (clickedTab.dataset.checkoutTabs) {
    case "pickup":
      TabsContentContainer.innerHTML = `
        <div class="checkout__delivery-content__img">
          <i class="fa-solid fa-location-dot"></i>
        </div>
        <div class="checkout__delivery-content__place">
          <div class="checkout__delivery-content__place-title">MVM Shop</div>
          <div class="checkout__delivery-content__place-address">
            207 S Memorial Dr, Tulsa, OK 74112, USA
          </div>
        </div>
      `;

      break;

    case "delivery":
      initMap();
      break;

    default:
      break;
  }
}

function initCheckoutSwiper() {
  var paymentSwiper = new Swiper(".paymentSwiper", {
    spaceBetween: 20,
    slidesPerView: 4,

    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
  });
}
