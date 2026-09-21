export function renderCallout({ title = "", text = "", type = "note", href = "" }) {
  const inner = `
    ${title ? `<div class="callout-title">${title}</div>` : ""}
    ${text ? `<div>${text}</div>` : ""}`;

  return href
    ? `<a class="callout ${type}" href="${href}" style="display:block;color:inherit">${inner}</a>`
    : `<div class="callout ${type}">${inner}</div>`;
}
