export function renderTags(levels = []) {
  return levels
    .map((l) => `<span class="tag ${l.toLowerCase()}">${l}</span>`)
    .join(" ");
}

export function renderCard({
  title,
  description = "",
  href = "",
  variant = "",   // "", "blue" or "plain"
  tags = [],
  linkLabel = "",
}) {
  const body = `
    <h3>${title}</h3>
    ${description ? `<p>${description}</p>` : ""}
    ${tags.length ? `<div>${renderTags(tags)}</div>` : ""}
    ${href && linkLabel ? `<span class="open-link">${linkLabel}</span>` : ""}`;

  // "Open"-style cards: whole card is clickable
  return href
    ? `<a class="card ${variant}" href="${href}">${body}</a>`
    : `<div class="card ${variant}">${body}</div>`;
}
