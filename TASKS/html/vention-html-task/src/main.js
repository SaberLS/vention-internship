import { mountPortfolioSection } from "./scripts/portfolio";
import { renderClientsGrid } from "./scripts/renderClientGrid";
import { renderFeedbackGrid } from "./scripts/renderFeedbackGrid";
import { renderProductsGrid } from "./scripts/renderProductsGrid";
import { mountSidebar } from "./scripts/sidebar";

const menuToggle = document.getElementById("menu-toggle");
const toggleIcon = document.getElementById("toggle-icon").querySelector("use");
const sideMenu = document.getElementById("side-menu");

const portfolioGrid = document.getElementById("portfolio-grid");
// Gather both sets of link elements across the entire page
const allNavLinks = document.querySelectorAll(".menu-link, .nav-tab");

const icons = {
  open: "./src/assets/svg-spreedsheet.svg#burger-menu",
  close: "./src/assets/svg-spreedsheet.svg#close-menu",
};

const VALID_SECTIONS = new Set(["clients", "products", "feedback"]);
const SECTION_CONFIG = {
  clients: {
    url: "https://rickandmortyapi.com/api/character",
    transform: (data) => data.results.slice(0, 6),
    render: renderClientsGrid,
  },

  products: {
    url: "https://fakestoreapi.com/products?limit=6",
    transform: (data) => data,
    render: renderProductsGrid,
  },

  feedback: {
    url: "https://fakerapi.it/api/v1/texts?_quantity=6&_characters=300",
    transform: (data) => data.data,
    render: renderFeedbackGrid,
  },
};

mountSidebar({ menuToggle, toggleIcon, sideMenu }, icons);
mountPortfolioSection(
  portfolioGrid,
  allNavLinks,
  "clients",
  VALID_SECTIONS,
  SECTION_CONFIG,
);
