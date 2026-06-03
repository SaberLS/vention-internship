/**
 * @param {HTMLElement} container
 * @param {Array} items
 * @param {string} imageClass
 * @param {string} captionClass
 * @param {(item: any) => string} getImage
 * @param {(item: any) => string} getCaption
 */
function renderImageGrid(
  container,
  items,
  imageClass,
  captionClass,
  getImage,
  getCaption,
) {
  container.innerHTML = items
    .map(
      (item) => `
        <li class="portfolio-grid-card">
          <figure class="grid-card-content">
            <img
              class="${imageClass}"
              src="${getImage(item)}"
              alt="${getCaption(item)}"
            />
            <figcaption class="${captionClass}">
              ${getCaption(item)}
            </figcaption>
          </figure>
        </li>
      `,
    )
    .join("");
}

export { renderImageGrid };
