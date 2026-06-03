/** @typedef {'clients' | 'products' | 'feedback'} Section */
/** @typedef { {url: string; transform: (data: any) => any; render: (container: HTMLElement, data: any[]) => void; }} Config*/

import { loadSectionData } from "./loadSectionData";

/**
 * @param {HTMLElement[]} navLinks
 * @param {Section} target
 */
function setActiveNavLinks(navLinks, target) {
  navLinks.forEach((link) => {
    link.classList.toggle("active", link.dataset.target === target);
  });
}

/**
 * @param {HTMLElement} container
 * @param {HTMLElement[]} navLinks
 * @param {Section} section
 * @param {{
 *  url: string;
 *  transform: (data: any) => any;
 *  render: (container: HTMLElement, data: any[]) => void;
 * }} config
 */
function navigateToSection(container, navLinks, section, config) {
  setActiveNavLinks(navLinks, section);
  loadSectionData(container, section, config);
}

/**
 * @param {Section} defaultSection
 * @param {Set<string>} validSections
 * @returns {Section}
 */
function getSectionFromURL(defaultSection, validSections) {
  const path = window.location.pathname.replace(/^\//, "");

  return validSections.has(path)
    ? /** @type {Section} */ (path)
    : defaultSection;
}

/**
 * @param {HTMLElement} container
 * @param {HTMLAnchorElement[]} allNavLinks
 * @param {Section} defaultSection
 * @param {Set<string>} validSections
 * @param {Record<string, Config>} sectionConfig
 */
function mountPortfolioSection(
  container,
  allNavLinks,
  defaultSection,
  validSections,
  sectionConfig,
) {
  document.addEventListener("DOMContentLoaded", () => {
    const initialSection = getSectionFromURL(defaultSection, validSections);

    navigateToSection(
      container,
      allNavLinks,
      initialSection,
      sectionConfig[initialSection],
    );

    history.replaceState({ section: initialSection }, "", `/${initialSection}`);
  });

  allNavLinks.forEach((link) => {
    link.addEventListener("click", (event) => {
      event.preventDefault();

      const selectedSection = /** @type {Section} */ (link.dataset.target);

      history.pushState(
        { section: selectedSection },
        "",
        `/${selectedSection}`,
      );

      navigateToSection(
        container,
        allNavLinks,
        selectedSection,
        sectionConfig[selectedSection],
      );
    });
  });

  window.addEventListener("popstate", (event) => {
    const section =
      event.state?.section ?? getSectionFromURL(defaultSection, validSections);

    navigateToSection(
      container,
      allNavLinks,
      section,
      sectionConfig[selectedSection],
    );
  });
}

export { mountPortfolioSection };
