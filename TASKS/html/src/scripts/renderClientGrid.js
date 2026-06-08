import { renderImageGrid } from "./renderImageGrid";

/**
 * @param {HTMLElement} container
 * @param {{image: string, name: string}[]} clients
 */
function renderClientsGrid(container, clients) {
  renderImageGrid(
    container,
    clients,
    "client-card-img",
    "client-name",
    (client) => client.image,
    (client) => client.name,
  );
}

export { renderClientsGrid };
