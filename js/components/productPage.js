import { initSwiper } from "../utils/swiper.js";

export function initProductPage(productsData, showClickedPage) {
  document.addEventListener("click", (event) => {
    if (
      event.target.classList.contains("recent__item-title") ||
      event.target.classList.contains("recent__item-img__image")
    ) {
      const productCard =
        event.target.closest(".catalog__items-product") || event.target.closest(".recent__item");
      const productCardTitle = productCard.querySelector(".recent__item-title");

      const productCardInfo = productsData.find(
        (item) => item.title === productCardTitle.innerText
      );

      const productPage = document.querySelector(".product-page");
      showClickedPage(productPage);

      const productPageContainer = document.querySelector(".product-page .container");

      productPageContainer.innerHTML = renderProductPage(productCardInfo);

      initSwiper();

      document.dispatchEvent(
        new CustomEvent("clickedProduct", {
          detail: { productCardInfo },
        })
      );
    }
  });
}

function renderProductPage(productCardInfo) {
  const slidesHTML = productCardInfo.images
    .map(
      (img) =>
        `<div class="swiper-slide">
        <img src="${img}" />
      </div>
    `
    )
    .join("");

  const reviewsHTML = productCardInfo.reviews
    .map(
      (review) =>
        `
      <div class="product-page__reviews-item">
        <div class="product-page__reviews-item__person">
          <div class="product-page__reviews-item__person-img"><img src="./img/person.svg"></div>
          <div class="product-page__reviews-item__person-name">
            ${review.reviewerName}
          </div>
        </div>


        <div class="product-page__reviews-item__rating">
          ${'<img src="./img/star.svg" alt="" />'.repeat(review.rating)}
        </div>

        <div class="product-page__reviews-item__text">${review.comment}</div>

        <div class="product-page__reviews-item__date">${new Date(review.date).toLocaleDateString(
          "en-US"
        )}</div>
      </div>
    `
    )
    .join("");

  const productPageHTML = `
    <div class="product-page__title title-2">${productCardInfo.title}</div>

    <div class="product-page__main"> 
      <div class="product-page__main-row">
        <div class="product-page__main-row__left">
          <div class="swiper mySwiper">
            <div class="swiper-wrapper">
              ${slidesHTML}
            </div>
          </div>
          <div thumbsSlider="" class="swiper mySwiperControls">
            <div class="swiper-wrapper">
              ${slidesHTML}
            </div>
          </div>
        </div>
        <div class="product-page__main-row__right">
          <div class="product-page__main-row__right-desc">${productCardInfo.description}</div>

          <div class="product-page__main-row__right-rating">
            <div class="product-page__main-row__right-rating__img">
              <img src="./img/star.svg" alt="" />
            </div>
            <div class="product-page__main-row__right-rating__num">${productCardInfo.rating}</div>
            <div class="product-page__main-row__right-rating__reviews">
              | ${productCardInfo.reviews.length} reviews
            </div>
          </div>

          <div class="product-page__main-row__right-buy">
            <div class="product-page__main-row__right-buy__price">$${productCardInfo.price}</div>
            <div class="product-page__main-row__right-buy__favorite">
              <img src="./img/heart.svg" alt="" />
            </div>
            <div class="product-page__main-row__right-buy__btn">Add to cart</div>
          </div>

          <div class="product-page__main-row__right-stock">
            ${productCardInfo.availabilityStatus}: <span>${productCardInfo.stock}</span>
          </div>
        </div>
      </div>
    </div>

    <div class="product-page__reviews">
      <div class="product-page__reviews__title title-2">Reviews</div>

      ${reviewsHTML}
    </div>
  `;

  return productPageHTML;
}
