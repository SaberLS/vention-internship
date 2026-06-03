import { renderImageGrid } from "./renderImageGrid";

/**
 * @param {HTMLElement} container
 * @param {{image: string, title: string}[]} products
 */
function renderProductsGrid(container, products) {
  renderImageGrid(
    container,
    products,
    "product-card-img",
    "product-card-title",
    (product) => product.image,
    (product) => product.title,
  );
}

export { renderProductsGrid };
