export function initRecentItems() {
  let recentlyViewed = JSON.parse(localStorage.getItem("recentlyViewed")) || [];

  document.addEventListener("clickedProduct", function (event) {
    const productCardData = event.detail.productCardInfo;

    recentlyViewed = recentlyViewed.filter((item) => item.id !== productCardData.id);

    recentlyViewed.unshift(productCardData);

    if (recentlyViewed.length > 10) {
      recentlyViewed.pop();
    }

    localStorage.setItem("recentlyViewed", JSON.stringify(recentlyViewed));

    renderRecentlyViewed(recentlyViewed);
  });
  renderRecentlyViewed(recentlyViewed);
}

function renderRecentlyViewed(recentlyViewedItems) {
  const container = document.querySelector(".recent .container");

  if (recentlyViewedItems.length == 0) {
    container.innerHTML = "";
  }

  const recentlyViewedSlides = recentlyViewedItems
    .map(
      (item) =>
        `<div class="recent__item swiper-slide">
            <div class="recent__item-img">
                <img src="${item.images[0]}" alt="${item.title}" class="recent__item-img__image" />
            </div>
            <div class="recent__item-title">
                ${item.title}
            </div>
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
    `
    )
    .join("");

  const recentlyViewedHTML = `
    <h2 class="recent__title title-2">Recently viewed</h2>
    <div class="recent__grid">
        <div class="recentlyViewedSwiper swiper">
            <div class="swiper-wrapper">
                ${recentlyViewedSlides}
            </div>

            <div class="swiper-button-prev"></div>
            <div class="swiper-button-next"></div>
        </div>
    </div>
    `;

  container.innerHTML = recentlyViewedHTML;

  initRecentlyViewedSwiper();
}

function initRecentlyViewedSwiper() {
  var recentlySwiper = new Swiper(".recentlyViewedSwiper", {
    spaceBetween: 20,
    slidesPerView: 4,

    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
  });
}
