import {loadToolkit,toast} from "./ui.js";
export function toolkitPage(){
  const items=loadToolkit();
  if(!items.length)return `<div class="empty"><h2>Nothing saved yet.</h2><p>Look for "Save to My Toolkit" on any pedagogy, assessment, or conversation resource.</p><a class="btn btn-primary" href="#/pedagogies">Explore Pedagogies</a></div>`;
  return `<div class="grid grid-2">${items.map((x,i)=>`<article class="card"><div class="eyebrow">${x.type||"Resource"}</div><h3>${x.title}</h3><p>${x.description||""}</p><div class="tags">${(x.tags||[]).map(t=>`<span class="tag">${t}</span>`).join("")}</div><button class="btn" data-remove="${i}">Remove</button></article>`).join("")}</div>`;
}
export function bindToolkit(){
  document.querySelectorAll("[data-remove]").forEach(btn=>btn.onclick=()=>{
    const items=loadToolkit();items.splice(+btn.dataset.remove,1);localStorage.setItem("jostel-toolkit",JSON.stringify(items));toast("Removed");location.reload();
  });
}
