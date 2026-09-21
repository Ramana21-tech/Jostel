import { icon } from "./icons.js";

export function getRole(){
  return localStorage.getItem("jostel-role") || "faculty";
}
export function setRole(role){
  localStorage.setItem("jostel-role", role);
}
export function renderApp(){
  const app=document.querySelector("#app");
  app.innerHTML=`
    <header class="site-header">
      <div class="container topbar">
        <a class="brand" href="#/home">
          <div class="brand-mark">J</div>
          <div><div class="brand-title">JosTEL</div><div class="brand-sub">Joseph's Technology Enhanced Learning</div></div>
        </a>
        <div class="header-actions">
          <span class="badge" id="role-badge"></span>
          <a class="btn" href="#/search">${icon("search")} Search</a>
          <button class="btn" id="switch-role">Switch Role</button>
        </div>
      </div>
      <nav class="secondary-nav"><div class="container nav-inner" id="nav"></div></nav>
    </header>
    <main><div class="container" id="page"></div></main>
    <footer class="footer"><div class="container footer-inner">
      <div><strong>JosTEL</strong> — Joseph's Technology Enhanced Learning.</div>
      <div>Discover → Try → Think → Assess → Capture → Reflect.</div>
    </div></footer>
    <div id="toast-root"></div>
  `;
  document.querySelector("#switch-role").addEventListener("click",()=>{
    setRole(getRole()==="faculty"?"trainer":"faculty");
    location.hash="#/home"; location.reload();
  });
  updateShell();
}
export function updateShell(){
  const role=getRole();
  document.querySelector("#role-badge").textContent=`${role==="faculty"?"Faculty":"Trainer"} Companion`;
  const nav=role==="faculty"
    ? [["home","Home"],["pedagogies","Pedagogies"],["activities","Activities"],["hots","LOTS / MOTS / HOTS"],["assessment","Assessments"],["evidence","Evidence"],["report","Activity Report"],["toolkit","My Toolkit"]]
    : [["home","Home"],["departments","Departments"],["conversation","Conversation Guide"],["pedagogies","Pedagogies"],["hots","HOTS"],["assessment","Assessment"],["evidence","Evidence"],["follow-up","Follow-Up"],["toolkit","My Toolkit"]];
  document.querySelector("#nav").innerHTML=nav.map(([r,l])=>`<a class="nav-link" data-route="${r}" href="#/${r}">${l}</a>`).join("");
}
export function setActive(route){
  document.querySelectorAll(".nav-link").forEach(a=>a.classList.toggle("active",a.dataset.route===route));
}
export function toast(msg){
  const root=document.querySelector("#toast-root"); root.innerHTML=`<div class="toast">${msg}</div>`;
  setTimeout(()=>root.innerHTML="",2200);
}
export function saveToolkit(item){
  const list=JSON.parse(localStorage.getItem("jostel-toolkit")||"[]");
  if(!list.some(x=>x.id===item.id)){list.push(item);localStorage.setItem("jostel-toolkit",JSON.stringify(list));toast("Saved to My Toolkit");}
  else toast("Already in My Toolkit");
}
export function loadToolkit(){return JSON.parse(localStorage.getItem("jostel-toolkit")||"[]");}

