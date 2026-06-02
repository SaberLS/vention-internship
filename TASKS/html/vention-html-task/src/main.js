import { mountSidebar } from "./scripts/sidebar";

const menuToggle = document.getElementById("menu-toggle");
const toggleIcon = document.getElementById("toggle-icon").querySelector("use");
const sideMenu = document.getElementById("side-menu");

const icons = {
  open: "./src/assets/svg-spreedsheet.svg#burger-menu",
  close: "./src/assets/svg-spreedsheet.svg#close-menu",
};

mountSidebar({ menuToggle, toggleIcon, sideMenu }, icons);
