export function initSwiper() {
  const swiper = new Swiper(".mySwiper", {
    spaceBetween: 10,
    slidesPerView: 3,
    freeMode: true,
    watchSlidesProgress: true,
  });
  const swiper2 = new Swiper(".mySwiper2", {
    spaceBetween: 10,
    direction: "vertical",
    slidesPerView: 1,
    thumbs: {
      swiper: swiper,
    },
  });
}
