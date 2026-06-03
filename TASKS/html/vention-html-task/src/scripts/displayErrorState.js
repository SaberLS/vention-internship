/**
 * @param {HTMLElement} container
 * @param {string} errorText
 */
function displayErrorState(container, errorText) {
  container.innerHTML = `
    <li class="content-error">
      Error fetching data: ${errorText}
    </li>
  `;
}

export { displayErrorState };
