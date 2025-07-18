import { initStoresMap, initDeliveryMap } from "../components/map.js";

export function initCheckoutPage() {
  renderCheckoutPage();

  validateCheckoutPhone();

  initCheckoutSwiper();

  initCheckoutPayment();

  if (document.querySelectorAll(".ymaps-2-1-79-map").length > 1) return;
  initStoresMap();
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

    if (pressedKey == "Backspace" && checkoutPhoneInput.value.length == 1) {
      checkoutPhoneInput.value = "";
      checkoutPhoneInput.setAttribute("value", "");
      checkoutDetailsItem.style.border = "2px solid #2b2b2b";
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
      <div class="checkout-submit__btn">
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
          <div class="checkout__item-title">${item.shippingInformation}</div>
          <div class="recent__item-amount">${item.cart} items</div>
          <div class="checkout__item-img">
              <img src="${item.images[0]}" alt="" class="checkout__item-img__image" />
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
  const tabsContentContainer = document.querySelector(".checkout__delivery-content");
  const tabsContainer = document.querySelector(`.${clickedTab.parentElement.classList}`);

  tabsContentContainer.innerHTML = "";

  for (const item of tabsContainer.children) {
    item.classList.remove("active");
  }

  switch (clickedTab.dataset.checkoutTabs) {
    case "pickup":
      clickedTab.classList.add("active");

      tabsContentContainer.innerHTML = `
      <div>
        <div id="map"></div>
        <div class="map__confirm">
          <button class="map__confirm-btn" type="button">Deliver here</button>
        </div>
      </div>
      `;

      initStoresMap();
      break;

    case "delivery":
      clickedTab.classList.add("active");

      tabsContentContainer.innerHTML = `
      <div>
        <div id="map"></div>
        <div class="map__confirm">
          <button class="map__confirm-btn" type="button">Deliver here</button>
        </div>
      </div>

      `;
      initDeliveryMap();
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

    on: {
      click: function (swiper, event) {
        if (event.target.closest(".swiper-slide")) {
          swiper.slideTo(0);
        }
      },
    },
  });
}

function initCheckoutPayment() {
  const checkoutPaymentBadgesSwiper = document.querySelector(".checkout__payment-badges__swiper");
  const checkoutPaymentBadges =
    checkoutPaymentBadgesSwiper.querySelectorAll(".paymentSwiper__slide");
  const checkoutPaymentBadgesContainer =
    checkoutPaymentBadgesSwiper.querySelector(".swiper-wrapper");

  const paymentBadge = document.querySelector(".paymentSwiper__slide.active");
  paymentBadge.dataset.payment = paymentBadge.children[0].getAttribute("src").split("/")[2];

  checkoutPaymentBadgesSwiper.addEventListener("click", (event) => {
    if (event.target.closest(".paymentSwiper__slide")) {
      let badgesArr = [];

      checkoutPaymentBadges.forEach((item) => item.classList.remove("active"));
      event.target.classList.add("active");

      checkoutPaymentBadges.forEach((badge) => {
        badge.dataset.payment = badge.children[0].getAttribute("src").split("/")[2];

        badgesArr.push(badge);
        if (badge.classList == event.target.classList) {
          const filteredArr = badgesArr.filter(
            (item) => item.classList.contains("active") == false
          );

          badgesArr = [...filteredArr];

          badgesArr.unshift(badge);
        }
      });

      checkoutPaymentBadgesContainer.insertAdjacentElement("afterbegin", badgesArr[0]);
    }
  });
}

let selectedMapInfo = {};

document.addEventListener("mapData", (event) => {
  const mapData = event.detail.selectedInfo;

  selectedMapInfo = { mapData };
});

export function saveCheckoutData() {
  const cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
  const paymentBadge = document.querySelector(".paymentSwiper__slide.active");
  const paymentMethod = paymentBadge.dataset.payment.split(".")[0].toLowerCase();
  const userPhone = document.querySelector(".checkout__details-item__input").value;

  const checkoutAlert = document.querySelector(".checkout__alert");

  let isValid = true;

  if (userPhone.length !== 16) {
    isValid = false;

    checkoutAlert.classList.remove("hidden");
    checkoutAlert.innerHTML = "Phone number must be 16 characters long";

    setTimeout(() => {
      checkoutAlert.classList.add("hidden");
    }, 2000);

    return;
  } else {
    isValid = true;
    checkoutAlert.classList.add("hidden");
  }

  if (selectedMapInfo.mapData == undefined) {
    isValid = false;

    checkoutAlert.classList.remove("hidden");
    checkoutAlert.innerHTML = "Select delivery method and location";

    alertTimeout = setTimeout(() => {
      checkoutAlert.classList.add("hidden");
    }, 2000);

    return;
  } else {
    isValid = true;
    checkoutAlert.classList.add("hidden");
  }

  if (isValid) {
    const checkoutData = {
      cartItems: cartItems,
      paymentMethod: paymentMethod,
      mapData: selectedMapInfo.mapData,
      userPhone: userPhone,
    };

    console.log(checkoutData);
  }
}
