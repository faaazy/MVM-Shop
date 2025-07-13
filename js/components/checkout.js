export function initCheckoutPage() {
  initCheckoutSwiper();
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
