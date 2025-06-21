export function initSwiper() {
  var swiper = new Swiper(".mySwiper", {
    spaceBetween: 10,
    slidesPerView: 3,
    direction: "horizontal",
    freeMode: true,
    watchSlidesProgress: true,
  });
  var swiper2 = new Swiper(".mySwiperControls", {
    spaceBetween: 10,
    direction: "vertical",
    slidesPerView: 1,
    allowTouchMove: false,
    thumbs: {
      swiper: swiper,
    },
  });
}
