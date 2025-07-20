export function initProfilePage() {
  renderProfilePage();
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
      return total + parseFloat(item.price);
    }, 0);

    orderPriceTotal += parseFloat(totalPrice.toFixed(2));

    return ProfileOrderProduct;
  }

  const profileOrders = checkoutData
    .map((item, index) => {
      return `
          <div class="profile__content-order section-bg">
              <div class="profile__content-order__date">
                  <span>Order 0${index + 1}</span> dated ${new Date(
        `${item.mapData.timestamp}`
      ).toLocaleDateString("en-US")}
                </div>
                <div class="profile__content-order__info">
                  <div class="profile__content-order__info-phone"><i class="fa-solid fa-phone"></i> Phone number: <span>${
                    item.userPhone
                  }</span></div>
                  <div class="profile__content-order__info-delivery">
                    <i class="fa-solid fa-location-dot"></i> Delivery Method: <span>${
                      item.mapData.address
                    }</span>
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
                  <div class="profile__content-order__bottom-total">Total: $ ${orderPriceTotal} </div>
                </div>
              </div>
      `;
    })
    .join("");

  profileOrdersContainer.innerHTML = profileOrders;
}
