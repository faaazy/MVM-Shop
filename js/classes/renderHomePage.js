export default class RenderHomePageItems {
  constructor(data, container) {
    this.data = data;
    this.container = document.querySelector(container);
  }

  createPopularCategories() {
    for (let i = 0; i < 4; i++) {
      const popularCategoryItem = document.createElement("div");
      popularCategoryItem.className = "popular-categories__item product-card";
      popularCategoryItem.dataset.category = this.data[i].category;
      popularCategoryItem.dataset.id = this.data[i].id;

      popularCategoryItem.innerHTML = `
          <div class="placeholder"></div>
          <div class="popular-categories__item-img">
            <img src="${this.data[i].images[0]}" alt="" />
          </div>
          <div class="popular-categories__item-title">${this.data[i].category.toUpperCase()}</div>
        `;

      const img = popularCategoryItem.querySelector("img");
      img.onload = () => {
        popularCategoryItem.querySelector(".placeholder").remove();
        img.style.display = "inline";
      };

      this.container.insertAdjacentElement("beforeend", popularCategoryItem);
    }
  }

  fillCatalogList() {
    this.data.forEach((item) => {
      const categoryName =
        item.category.charAt(0).toUpperCase() + item.category.slice(1).toLowerCase();

      const categoryItem = `<a href="#" class="catalog__list-item" data-category="${item.category}">${categoryName}</a>`;

      this.container.insertAdjacentHTML("beforeend", categoryItem);
    });
  }
}
