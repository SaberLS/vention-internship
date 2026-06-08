/**
 * @param {HTMLElement} container
 * @param {{content: string, title: string, author?: string}[]} posts
 */
function renderFeedbackGrid(container, posts) {
  container.innerHTML = posts
    .map(
      (post) => `
        <li class="portfolio-grid-card">
          <article class="grid-card-content">
            <h3 class="feedback-card-title">
              ${post.title}
            </h3>

            <p>${post.content}</p>

            ${
              post.author
                ? `
                  <footer class="feedback-card-author">
                    <cite>${post.author}</cite>
                  </footer>
                `
                : ""
            }
          </article>
        </li>
      `,
    )
    .join("");
}

export { renderFeedbackGrid };
