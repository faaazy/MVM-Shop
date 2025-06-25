import { debounce } from "./debounce.js";

export function initSearchItems(productsData, showClickedPage) {
  const search = document.querySelector(".search");
  const searchContainer = document.querySelector(".search__grid");

  const debouncedSearch = debounce((value) => {
    const searchValue = value.trim().toLowerCase();

    if (searchValue == "") {
      showClickedPage(document.querySelector(".home"));
    }

    const filteredProducts = productsData.filter((product) => {
      const title = product.title.toLowerCase();
      let searchIndex = 0;

      for (let i = 0; i < title.length; i++) {
        if (title[i] === searchValue[searchIndex]) {
          searchIndex++;
          if (searchIndex === searchValue.length) return true;
        }
      }
      return false;
    });

    console.log(filteredProducts);

    showClickedPage(search);
  }, 500);

  const searchInput = document.querySelector(".search__input");

  searchInput.addEventListener("input", () => {
    debouncedSearch(searchInput.value);
  });
}
