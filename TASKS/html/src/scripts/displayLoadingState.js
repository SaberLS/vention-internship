/**
 * @param {HTMLElement} container
 */
function displayLoadingState(container) {
  container.innerHTML = `
    <li class="content-loading">
      Loading dynamic content...
    </li>
  `;
}

export { displayLoadingState };
