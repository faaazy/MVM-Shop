export function initItemPage(showClickedPage) {
  document.addEventListener("click", (event) => {
    if (event.target.closest(".catalog__items-product")) {
      console.log(123123);
    }
  });
}
