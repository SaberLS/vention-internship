/**
 *
 * @param {{menuToggle: HTMLElement, toggleIcon: HTMLElement, sideMenu: HTMLElement}} param0
 * @param {typeof {open: string, close: string}} icons
 */
function mountSidebar({ sideMenu, toggleIcon, menuToggle }, icons) {
  menuToggle.addEventListener("click", () => {
    const isOpen = sideMenu.classList.toggle("menu-open");

    if (isOpen) toggleIcon.setAttribute("xlink:href", icons.close);
    else toggleIcon.setAttribute("xlink:href", icons.open);
  });
}

export { mountSidebar };
