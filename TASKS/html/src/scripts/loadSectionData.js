import { displayErrorState } from "./displayErrorState";
import { displayLoadingState } from "./displayLoadingState";

/**
 * @param {string} url
 */
async function fetchJson(url) {
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`Request failed with status ${response.status}`);
  }

  return response.json();
}

/**
 * @param {HTMLElement} container
 * @param {import("./portfolio.js").Section} targetSection
 * @param {import("./portfolio.js").Config} config
 */
async function loadSectionData(container, targetSection, config) {
  displayLoadingState(container);

  try {
    const data = await fetchJson(config.url);

    config.render(container, config.transform(data));
  } catch (error) {
    console.error("Data pipeline breakdown:", error);

    displayErrorState(
      container,
      error instanceof Error ? error.message : "Unknown error",
    );
  }
}

export { loadSectionData };
