export function initProfilePage() {
  renderProfilePage();

  handleDeleteOrderCLick();

  renderEmptyOrderPage();
}

function renderProfilePage() {
  const checkoutData = JSON.parse(localStorage.getItem("checkoutData")) || [];

  const profileOrdersContainer = document.querySelector(".profile__content");

  profileOrdersContainer.innerHTML = "";

  let orderPriceTotal = 0;

  function renderProfileOrderProducts(cartItems) {
    const ProfileOrderProduct = cartItems
      .map((item) => {
        return `
             <div class="profile__content-order__product catalog__items-product" data-id="${
               item.id
             }">
                  <div class="profile__content-order__product-img recent__item-img__image">
                      <img src="${item.images[0]}" alt="${item.title}" />
                  </div>
                  <div class="profile__content-order__product-info">
                      <div class="profile__content-order__product-info__title recent__item-title">${
                        item.title
                      }</div>
                      <div class="profile__content-order__product-info__code">Product code: <span>${
                        item.sku
                      }</span></div>
                  </div>
                  <div class="profile__content-order__product-price">
                      <div class="profile__content-order__product-price__total">
                          Price: <span>$ ${item.cart * item.price}</span>
                      </div>
                      <div class="profile__content-order__product-price__qty">
                          ${item.cart} pc x $ ${item.price}
                      </div>
                  </div>
              </div> 
          `;
      })
      .join("");

    orderPriceTotal = 0;

    const totalPrice = cartItems.reduce((total, item) => {
      return total + parseFloat(item.price) * item.cart;
    }, 0);

    orderPriceTotal += parseFloat(totalPrice.toFixed(2));

    return ProfileOrderProduct;
  }

  let deliveryMethod = "";

  const profileOrders = checkoutData
    .map((item, index) => {
      if (item.mapData.mapData?.title == undefined) {
        deliveryMethod = item.mapData.mapData.address;
      } else {
        deliveryMethod = `${item.mapData.mapData.title} ${item.mapData.mapData.description}`;
      }

      return `
          <div class="profile__content-order section-bg" data-order="${index}">
              <div class="profile__content-order__date">
                  <span>Order 0${index + 1}</span> dated ${item.orderDate}
                </div>
                <div class="profile__content-order__info">
                  <div class="profile__content-order__info-phone"><i class="fa-solid fa-phone"></i> Phone number: <span>${
                    item.userPhone
                  }</span></div>
                  <div class="profile__content-order__info-delivery">
                    <i class="fa-solid fa-location-dot"></i> Delivery Method: <span>${deliveryMethod}</span>
                  </div>
                  <div class="profile__content-order__info-payment">
                    <i class="fa-solid fa-credit-card"></i> Payment method: <span>${
                      item.paymentMethod
                    }</span>
                  </div>
                </div>

                <div class="profile__content-order__products">
                  ${renderProfileOrderProducts(item.cartItems)}
                </div>

                <div class="profile__content-order__bottom">
                  <div class="profile__content-order__bottom-delete">Delete</div>
                  <div class="profile__content-order__bottom-total">Total: <span>$ ${orderPriceTotal}</span> </div>
                </div>
              </div>
      `;
    })
    .join("");

  profileOrdersContainer.innerHTML = profileOrders;
}

function handleDeleteOrderCLick() {
  document.addEventListener("click", (event) => {
    if (event.target.closest(".profile__content-order__bottom-delete")) {
      const checkoutData = JSON.parse(localStorage.getItem("checkoutData")) || [];
      const orderItem = event.target.parentElement.parentElement;

      const filteredCheckoutData = checkoutData.filter((item, index) => {
        return index != parseInt(orderItem.dataset.order);
      });

      localStorage.setItem("checkoutData", JSON.stringify(filteredCheckoutData));
      renderProfilePage();
    }
  });
}

function renderEmptyOrderPage() {
  const checkoutData = JSON.parse(localStorage.getItem("checkoutData")) || [];

  if (checkoutData.length == 0) {
    const orderContainer = document.querySelector(".profile__content");

    orderContainer.insertAdjacentHTML(
      "beforeend",
      `
    <div class="cart__empty section-bg">
      <div class="cart__empty-img"><i class="fa-solid fa-bag-shopping"></i></div>
      <div class="cart__empty-text">You have no Orders</div>
      <div class="cart__empty-advice">
        Use the <span class="cart__empty-advice__link">catalog</span> or search 
      </div>
    </div>
    `
    );
  }
}
