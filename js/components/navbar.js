const TABS = {
  faculty: [
    ["home", "Home"],
    ["pedagogies", "Pedagogies"],
    ["activities", "Activities"],
    ["lots-mots-hots", "LOTS / MOTS / HOTS"],
    ["assessments", "Assessments"],
    ["evidence", "Evidence"],
    ["activity-report", "Activity Report"],
    ["my-toolkit", "My Toolkit"],
  ],
  trainer: [
    ["home", "Home"],
    ["departments", "Departments"],
    ["conversation-guide", "Conversation Guide"],
    ["pedagogies", "Pedagogies"],
    ["hots", "HOTS"],
    ["assessment", "Assessment"],
    ["evidence", "Evidence"],
    ["follow-up", "Follow-Up"],
    ["my-toolkit", "My Toolkit"],
  ],
};

const ROLE_LABEL = {
  faculty: "Faculty Companion",
  trainer: "Trainer Companion",
};

export function renderNavbar(role, activePage) {
  const tabs = TABS[role]
    .map(
      ([slug, label]) =>
        `<a class="tab ${slug === activePage ? "active" : ""}" href="#/${role}/${slug}">${label}</a>`
    )
    .join("");

  return `
    <header class="navbar">
      <div class="navbar-top">
        <a class="logo" href="#/${role}/home">
          JosTEL
          <small>Joseph's Technology Enhanced Learning</small>
        </a>
        <div class="navbar-actions">
          <span class="role-badge">${ROLE_LABEL[role]}</span>
          <button class="btn" data-action="search">Search</button>
          <a class="btn btn-accent" href="#/">Switch Role</a>
        </div>
      </div>
      <nav class="tabs">${tabs}</nav>
    </header>`;
}
