import { initSwiper } from "./swiper.js";

export function initProductPage(productsData, showClickedPage) {
  document.addEventListener("click", (event) => {
    if (
      event.target.classList.contains("recent__item-title") ||
      event.target.classList.contains("recent__item-img__image")
    ) {
      const productCard = event.target.closest(".catalog__items-product");
      const productCardTitle = productCard.querySelector(".recent__item-title");

      let productCardInfo;

      productsData.forEach((item) => {
        if (item.title == productCardTitle.innerText) {
          productCardInfo = item;
        }
      });

      showClickedPage(document.querySelector(".product-page"));

      initSwiper();
      console.log(productCardInfo);

      // if(itemCard){
      //   const itemInfo = {
      //     title: itemCard.querySelector('.recent__item-title')
      //     img: itemCard.querySelector('.recent__item-img__image')
      //   }
      // }
    }
  });
}
