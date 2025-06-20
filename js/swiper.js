export function initSwiper() {
  var swiper = new Swiper(".mySwiper", {
    spaceBetween: 10,
    slidesPerView: 3,
    freeMode: true,
    watchSlidesProgress: true,
  });
  var swiper2 = new Swiper(".mySwiper2", {
    spaceBetween: 10,
    direction: "horizontal",
    slidesPerView: 1,
    thumbs: {
      swiper: swiper,
    },
  });
}
