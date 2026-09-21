import { renderNavbar } from "./js/components/navbar.js";
import { renderFooter } from "./js/services/footer.js";

// URL slug -> page file name
const ROUTES = {
  faculty: {
    home: "home",
    pedagogies: "pedagogies",
    activities: "activities",
    "lots-mots-hots": "lotsMotsHots",
    assessments: "assessments",
    evidence: "evidence",
    "activity-report": "activityReport",
    "my-toolkit": "myToolkit",
  },
  trainer: {
    home: "home",
    departments: "departments",
    "conversation-guide": "conversationGuide",
    pedagogies: "pedagogies",
    hots: "hots",
    assessment: "assessment",
    evidence: "evidence",
    "follow-up": "followUp",
    "my-toolkit": "myToolkit",
  },
};

function renderRoleChooser() {
  return `
    <main class="container">
      <div class="eyebrow">JosTEL</div>
      <h1>Who are you today?</h1>
      <p class="subtext">Choose a role to get started.</p>
      <div class="grid grid-2">
        <div class="card">
          <h3>Faculty Companion</h3>
          <p>Explore pedagogies, activities and assessments for your classroom.</p>
          <a class="open-link" href="#/faculty/home">Open</a>
        </div>
        <div class="card blue">
          <h3>Trainer Companion</h3>
          <p>Prepare for conversations that help faculty strengthen their teaching.</p>
          <a class="open-link" href="#/trainer/home">Open</a>
        </div>
      </div>
    </main>`;
}

function renderNotFound() {
  return `
    <main class="container">
      <h1>Page not found</h1>
      <p><a href="#/">Back to start</a></p>
    </main>`;
}

async function router() {
  const app = document.getElementById("app");
  const [role, page = "home", param] = location.hash
    .replace(/^#\/?/, "")
    .split("/");

  if (!ROUTES[role]) {
    app.innerHTML = renderRoleChooser();
    return;
  }

  const file = ROUTES[role][page];
  if (!file) {
    app.innerHTML = renderNotFound();
    return;
  }

  try {
    const mod = await import(`./js/pages/${role}/${file}.js`);
    const content = await mod.render(param);
    app.innerHTML =
      renderNavbar(role, page) +
      `<main class="container">${content}</main>` +
      renderFooter();
    if (mod.afterRender) mod.afterRender(app);
    window.scrollTo(0, 0);
  } catch (err) {
    console.error(err);
    app.innerHTML = renderNotFound();
  }
}

window.addEventListener("hashchange", router);
window.addEventListener("DOMContentLoaded", router);
