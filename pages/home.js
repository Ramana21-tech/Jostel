import {getRole,setActive,saveToolkit} from "../ui.js";
import {toolkitPage,bindToolkit} from "../toolkit.js";
import {searchEverything} from "../search.js";

let pedagogies=[],departments=[];
async function loadData(){
  [pedagogies,departments]=await Promise.all([
    fetch("data/pedagogies.json").then(r=>r.json()),
    fetch("data/departments.json").then(r=>r.json())
  ]);
}
export async function initRouter(){
  await loadData();
  window.addEventListener("hashchange",route);
  route();
}
export async function route(){
  const raw=location.hash.replace(/^#\\//,"")||"home";
  const [routeName,param]=raw.split("/");
  setActive(routeName);
  const role=getRole();
  let html="";
  if(routeName==="home")html=home(role);
  else if(routeName==="pedagogies")html=pedagogyList(role);
  else if(routeName==="pedagogy")html=pedagogyDetail(param,role);
  else if(routeName==="activities")html=activities();
  else if(routeName==="hots")html=hots(role);
  else if(routeName==="assessment")html=assessment(role);
  else if(routeName==="evidence")html=evidence();
  else if(routeName==="report")html=report();
  else if(routeName==="toolkit")html=toolkitPage();
  else if(routeName==="departments")html=departmentsPage();
  else if(routeName==="department")html=departmentDetail(param);
  else if(routeName==="conversation")html=conversation();
  else if(routeName==="follow-up")html=followUp();
  else if(routeName==="search")html=searchPage();
  else html=home(role);
  document.querySelector("#page").innerHTML=html;
  bind();
  if(routeName==="toolkit")bindToolkit();
}
function home(role){
  const faculty=role==="faculty";
  const cards=faculty?[
    ["📚","Explore Pedagogies","Browse teaching approaches and find one worth trying.","#/pedagogies"],
    ["🗓️","Plan My Next Class","Move from a rough idea to a practical classroom activity.","#/activities"],
    ["🧠","LOTS / MOTS / HOTS","Turn recall into application, analysis, evaluation or creation.","#/hots"],
    ["✓","Improve My Assessment","Explore meaningful ways to assess learning.","#/assessment"],
    ["🔎","Evidence Helper","Think about evidence before, during and after an activity.","#/evidence"],
    ["📝","Activity Report","Document what you did and print or save it as PDF.","#/report"],
    ["🧰","My Toolkit","Keep useful ideas in one place on this device.","#/toolkit"]
  ]:[
    ["🏛️","Department Explorer","Explore teaching possibilities by department.","#/departments"],
    ["💬","Faculty Conversation Guide","A seven-stage conversation pathway, not a checklist.","#/conversation"],
    ["📚","Pedagogy Navigator","Find approaches worth raising with faculty.","#/pedagogies"],
    ["🧠","HOTS Development","Help faculty see the difference between recall and deeper thinking.","#/hots"],
    ["✓","Assessment Conversation","Explore whether assessment measures intended learning.","#/assessment"],
    ["🔎","Evidence Conversation","Recognise evidence that naturally comes from teaching activity.","#/evidence"],
    ["↪","Follow-Up Guide","Explore common situations and small, low-risk next steps.","#/follow-up"],
    ["🧰","My Toolkit","Keep useful conversation resources in one place.","#/toolkit"]
  ];
  return `<section class="hero"><div class="eyebrow">${faculty?"Faculty":"Trainer"} Companion</div>
  <h1>${faculty?"What do you want to do in your classroom?":"How can you help a faculty member discover and strengthen their teaching practice?"}</h1>
  <p class="lead">${faculty?"Start from wherever you are — a teaching approach, an assessment, or just a rough idea.":"Prepare for a conversation, or explore possibilities for a specific department."}</p>
  <div class="callout"><strong>I don't know where to start</strong>${faculty?"Tell us what you're trying to achieve in your class, and we'll guide you.":"Tell us what you're trying to help the faculty member with."}</div></section>
  <section class="grid grid-3">${cards.map(c=>`<a class="card card-link" href="${c[3]}"><div class="card-icon">${c[0]}</div><h3>${c[1]}</h3><p>${c[2]}</p></a>`).join("")}</section>`;
}
function pedagogyList(role){
  return `<section class="hero"><div class="eyebrow">${role==="faculty"?"Pedagogy Library":"Pedagogy Navigator"}</div><h1>Teaching approaches worth exploring.</h1><p class="lead">${role==="faculty"?"Browse 20 approaches and find one that fits your next class.":"Approaches worth raising with faculty, framed as options for a conversation — not prescriptions."}</p></section>
  <div class="search-row"><input class="input" id="ped-search" placeholder="Search pedagogies…"><select class="select" id="ped-filter"><option>All levels</option><option>LOTS</option><option>MOTS</option><option>HOTS</option></select></div>
  <div class="grid grid-2" id="ped-grid">${pedagogies.map(p=>pedCard(p)).join("")}</div>`;
}
function pedCard(p){
  return `<a class="card card-link ped-item" data-levels="${p.levels.join(",")}" data-text="${(p.name+" "+p.description+" "+p.tags.join(" ")).toLowerCase()}" href="#/pedagogy/${p.slug}"><h3>${p.name}</h3><p>${p.description}</p><div class="tags">${p.levels.map(l=>`<span class="tag ${l.toLowerCase()}">${l}</span>`).join("")}</div></a>`;
}
function pedagogyDetail(slug,role){
  const p=pedagogies.find(x=>x.slug===slug)||pedagogies[0];
  const full=p.full;
  return `<div class="hero"><div class="eyebrow">${role==="faculty"?"Pedagogy Library":"Pedagogy Navigator"}</div><h1>${p.name}</h1><p class="lead">${p.description}</p><div class="tags">${p.levels.map(l=>`<span class="tag ${l.toLowerCase()}">${l}</span>`).join("")}</div><div class="search-row"><button class="btn btn-primary" data-save-ped="${p.slug}">Save to My Toolkit</button></div></div>
  ${full?`<div class="callout"><strong>Consider using this when…</strong>Students need to work over time on a meaningful product, performance, or solution.</div>
  <div class="info-grid"><div class="info-box"><small>Class duration</small>Multiple sessions</div><div class="info-box"><small>Group size</small>Individual / groups</div><div class="info-box"><small>Preparation</small>Moderate</div><div class="info-box"><small>Materials</small>Course-specific resources</div></div>
  <section class="section"><h2>Try it in your next class</h2><div class="recipe"><div class="recipe-box"><h3>Teacher does</h3><p>Frame a meaningful project, clarify the outcome, establish milestones, and support students as they work.</p></div><div class="recipe-box"><h3>Students do</h3><p>Investigate, plan, create, revise, and present a product, performance, or solution.</p></div><div class="recipe-box"><h3>Teacher looks for</h3><p>Evidence of decision-making, iteration, application, collaboration, and reflection.</p></div></div></section>
  <section class="section"><h2>Why use it?</h2><p class="muted">Project work can connect learning to a meaningful outcome and create opportunities for application, analysis and creation.</p></section>
  <section class="section"><h2>Evidence</h2><p class="muted">Milestones, drafts, final product, presentation and reflection can provide evidence of learning.</p></section>`
  :`<div class="callout blue"><strong>Source detail status</strong>The supplied project specification names this pedagogy and gives its description/tags, but does not provide the full detailed recipe. This page intentionally does not invent missing source content.</div>`}`;
}
function activities(){
  const list=[
    ["Think-Pair-Share","10–15 min","Pairs","Students think independently, compare ideas with a partner, then share with the class."],
    ["Peer Instruction","15–20 min","Pairs / small groups","Students answer a concept question, discuss reasoning, and reconsider their response."],
    ["Case Analysis","30–45 min","Small groups","Students analyse a case, identify issues, and propose a reasoned response."],
    ["Exit Ticket","5 min","Individual","Students capture the most important idea, remaining question, or application."],
    ["Mini Project","Multiple sessions","Individual / groups","Use a bounded project task when the full project details are not required in one session."]
  ];
  return `<section class="hero"><div class="eyebrow">Activities</div><h1>What can I actually do in class?</h1><p class="lead">Practical classroom activity recipes, ready to use.</p></section>
  <div class="search-row"><input class="input" id="activity-search" placeholder="Search activities…"></div>
  <div id="activity-list">${list.map(a=>`<details class="accordion activity-item"><summary><span>${a[0]}</span><span class="small muted">${a[1]} · ${a[2]}</span></summary><div class="accordion-body"><p><strong>Activity:</strong> ${a[3]}</p><div class="recipe"><div class="recipe-box"><h3>Teacher does</h3><p>Set the task, clarify expectations and facilitate.</p></div><div class="recipe-box"><h3>Students do</h3><p>Participate actively and explain their thinking.</p></div><div class="recipe-box"><h3>Assessment / evidence</h3><p>Use responses, discussion, products or reflections as evidence.</p></div></div><div class="tags"><span class="tag mots">MOTS</span><button class="btn" data-save-activity="${a[0]}">Save</button></div></div></details>`).join("")}</div>`;
}
function hots(role){
  return `<section class="hero"><div class="eyebrow">${role==="faculty"?"Thinking Levels":"HOTS Development"}</div><h1>LOTS, MOTS and HOTS</h1><p class="lead">${role==="faculty"?"Understand the difference, then turn an ordinary question into one that asks students to think more deeply.":"Use this to help a faculty member see the difference between recall and deeper thinking, with real examples."}</p></section>
  <div class="grid grid-3"><article class="card"><span class="tag lots">LOTS</span><h2>Remember · Understand</h2><p>Recall information or demonstrate basic understanding.</p><p><strong>Photosynthesis:</strong> Define photosynthesis and describe its basic stages.</p></article>
  <article class="card"><span class="tag mots">MOTS</span><h2>Apply</h2><p>Use knowledge in a situation or task.</p><p><strong>Photosynthesis:</strong> Explain why a plant kept in low light grows differently.</p></article>
  <article class="card"><span class="tag hots">HOTS</span><h2>Analyse · Evaluate · Create</h2><p>Break ideas apart, make judgements, or create a response.</p><p><strong>Photosynthesis:</strong> Analyse declining crop growth and propose a solution.</p></article></div>
  <section class="section"><div class="callout"><strong>Turn This Into HOTS</strong>Start with a recall question, identify the intended capability, then ask students to analyse, evaluate, or create something using the knowledge.</div>
  <div class="card"><h3>Computer Science example</h3><p><span class="tag lots">LOTS</span> Define cloud computing.</p><p><span class="tag mots">MOTS</span> Demonstrate how you would select a cloud service for a small business.</p><p><span class="tag hots">HOTS</span> A small business must choose between two cloud architectures. Analyse the requirements, compare the alternatives, and justify your recommendation.</p></div></section>`;
}
const assessmentMethods=["Quiz","Short Answer","Concept Map","Problem-Solving Task","Case Analysis","Project","Presentation","Viva","Practical Demonstration","Portfolio","Reflective Journal","Peer Assessment","Self Assessment","Debate","Simulation","Performance Task","Rubric-Based Assessment","Exit Ticket","Annotated Bibliography / Source Analysis","Concept Application Interview"];
function assessment(role){
  return `<section class="hero"><div class="eyebrow">Assessment</div><h1>How can I assess this?</h1><p class="lead">${role==="faculty"?"Turn my assessment into something more meaningful.":"Use these to explore whether a faculty member's assessment measures what they actually want students to learn."}</p></section>
  <div>${assessmentMethods.map(m=>`<details class="accordion"><summary>${m}<span>+</span></summary><div class="accordion-body"><p class="muted">Use this method when it aligns with the learning capability you want students to demonstrate.</p><button class="btn" data-save-assessment="${m}">Save to My Toolkit</button></div></details>`).join("")}</div>
  <section class="section card"><h2>Redesign an assessment</h2><p class="muted">Biology example from the supplied source.</p><div class="recipe"><div class="recipe-box"><h3>Original</h3><p>Explain photosynthesis.</p></div><div class="recipe-box"><h3>MOTS</h3><p>Apply your knowledge of photosynthesis to explain why a plant kept in low light grows differently.</p></div><div class="recipe-box"><h3>HOTS</h3><p>A farmer notices declining crop growth despite adequate water and nutrients. Analyse possible causes related to photosynthesis and propose a solution.</p></div></div></section>`;
}
function evidence(){
  return `<section class="hero"><div class="eyebrow">Evidence</div><h1>Capture what learning looks like.</h1><p class="lead">Think about evidence before, during and after an activity.</p></section>
  <div class="grid grid-3"><article class="card"><h2>Before</h2><p>What do students know, understand, or believe before the activity?</p></article><article class="card"><h2>During</h2><p>What can you observe while students are thinking, discussing, creating, applying, or solving?</p></article><article class="card"><h2>After</h2><p>What product, response, performance, reflection, or explanation shows what students learned?</p></article></div>
  <div class="callout blue section"><strong>Important</strong>Evidence does not have to mean a new test. Often, the activity itself naturally produces evidence.</div>`;
}
function report(){
  return `<section class="hero"><div class="eyebrow">Activity Report</div><h1>Document what I did.</h1><p class="lead">Fill this in, then print or save as PDF.</p></section>
  <div class="report-layout"><section class="card report-form"><div class="form-grid">
  ${field("courseCode","Course code")} ${field("courseName","Course name")} ${field("department","Department")}
  ${field("classSemester","Class / semester")} ${field("students","Number of students","number")} ${field("date","Date","date")}
  ${field("title","Activity title")} ${field("pedagogy","Pedagogy used")} ${field("thinking","Thinking level")} 
  ${field("learningOutcome","Learning outcome","textarea",true)} ${field("description","Description","textarea",true)} ${field("assessment","Assessment","textarea",true)}
  ${field("observed","Observed outcome","textarea",true)} ${field("reflection","Reflection","textarea",true)}
  </div><h3 class="section">Evidence captured</h3><div class="check-grid">${["Student responses","Discussion notes","Student product","Presentation / performance","Peer or self-assessment","Reflection"].map((x,i)=>`<label class="check"><input type="checkbox" data-evidence="${i}"> ${x}</label>`).join("")}</div>
  <div class="search-row"><button class="btn btn-primary" id="print-report">Print → Save as PDF</button></div></section>
  <section class="report-preview"><div class="report-sheet" id="report-sheet"><h2 id="pv-title">Activity Report</h2><p class="muted" id="pv-meta">Fill in the form to preview your report.</p><hr><h3 id="pv-outcome">Learning outcome</h3><p id="pv-outcome-text">—</p><h3>Description</h3><p id="pv-description">—</p><h3>Assessment</h3><p id="pv-assessment">—</p><h3>Observed outcome</h3><p id="pv-observed">—</p><h3>Reflection</h3><p id="pv-reflection">—</p></div></section></div>`;
}
function field(id,label,type="text",full=false){
  if(type==="textarea")return `<div class="field ${full?"full":""}"><label for="${id}">${label}</label><textarea class="textarea" rows="4" id="${id}"></textarea></div>`;
  if(id==="department")return `<div class="field"><label for="${id}">${label}</label><select class="select" id="${id}"><option></option>${departments.map(d=>`<option>${d.name}</option>`).join("")}</select></div>`;
  if(id==="thinking")return `<div class="field"><label for="${id}">${label}</label><select class="select" id="${id}"><option></option><option>LOTS</option><option>MOTS</option><option>HOTS</option></select></div>`;
  return `<div class="field"><label for="${id}">${label}</label><input class="input" id="${id}" type="${type}"></div>`;
}
function departmentsPage(){
  return `<section class="hero"><div class="eyebrow">Department Explorer</div><h1>Explore teaching possibilities by department</h1><p class="lead">Options for discussion, not prescriptions.</p></section><div class="grid grid-3">${departments.map(d=>`<a class="card card-link" href="#/department/${d.slug}"><h3>${d.name}</h3><p>${d.full?"Contexts, challenges, pedagogies, assessment, evidence and conversation starters.":"Department is listed in the supplied specification; detailed content was not supplied."}</p></a>`).join("")}</div>`;
}
function departmentDetail(slug){
  const d=departments.find(x=>x.slug===slug)||departments[0];
  if(!d.full)return `<section class="hero"><div class="eyebrow">Department Explorer</div><h1>${d.name}</h1></section><div class="callout blue"><strong>Source detail status</strong>The supplied specification names this department but does not provide its detailed content. This page does not invent missing material.</div>`;
  const block=(title,arr)=>`<div class="card"><h3>${title}</h3><ul>${arr.map(x=>`<li>${x}</li>`).join("")}</ul></div>`;
  return `<section class="hero"><div class="eyebrow">Department Explorer</div><h1>${d.name}</h1><p class="lead">Teaching possibilities to explore in conversation.</p></section><div class="grid grid-2">
  ${block("Typical teaching contexts",d.contexts)}${block("Possible learning challenges",d.challenges)}${block("Pedagogies worth exploring",d.pedagogies)}${block("Assessment possibilities",d.assessment)}${block("Evidence possibilities",d.evidence)}${block("Conversation starters",d.questions)}</div>
  <section class="section"><div class="card"><h3>LOTS / MOTS / HOTS</h3><p><strong>LOTS:</strong> ${d.lots.join(", ")}</p><p><strong>MOTS:</strong> ${d.mots.join(", ")}</p><p><strong>HOTS:</strong> ${d.hots.join(", ")}</p></div></section>`;
}
function conversation(){
  const stages=[
    ["Discover","Understand current practice without judgement.",["What are you currently doing in this course?","Walk me through a typical class session."]],
    ["Understand","Find what works and what struggles.",["What seems to work particularly well?","Where do students struggle?","What have you already tried?"]],
    ["Explore","Clarify desired student capability.",["What would you like students to be able to do?","What would that look like if a student did it really well?"]],
    ["Strengthen","Explore richer thinking, not prescribe.",["Could students analyse, evaluate or create something rather than only recall information?","What is one small change worth trying?"]],
    ["Assess","Check alignment between assessment and intended learning.",["Does the assessment measure what you want students to learn?","If a student did well on your assessment, would that mean they can really do the thing you care about?"]],
    ["Evidence","Recognise existing evidence.",["What evidence naturally comes from the activity?","What would you want to be able to show about this, later?"]],
    ["Follow-Up","Agree a concrete, low-risk next step.",["What small change could you try next?","When should we check in on how it went?"]]
  ];
  return `<section class="hero"><div class="eyebrow">Faculty Conversation Guide</div><h1>A conversation pathway, not a checklist</h1><p class="lead">Move through these stages at the pace the conversation needs — skip back if something earlier needs revisiting.</p></section><div class="timeline">${stages.map((s,i)=>`<div class="timeline-item"><div class="timeline-num">${i+1}</div><article class="card"><h2>${s[0]}</h2><p class="muted">${s[1]}</p><ul>${s[2].map(q=>`<li>${q}</li>`).join("")}</ul><button class="btn" data-save-conversation="${s[0]}">Save to My Toolkit</button></article></div>`).join("")}</div>`;
}
function followUp(){
  const situations=["My students only want lecture notes.","The faculty member has very little class time.","The class is very large.","Students seem passive in class.","The faculty member relies heavily on lectures.","Assessment is mostly recall.","The faculty member wants to introduce HOTS.","The faculty member wants to try project work.","The faculty member is unsure what evidence to collect.","The faculty member already uses innovative teaching.","The faculty member wants something simple rather than a major redesign."];
  return `<section class="hero"><div class="eyebrow">Follow-Up</div><h1>What if…?</h1><p class="lead">Common situations, a way to explore before jumping to a fix, and small, low-risk interventions to suggest.</p></section><input class="input" id="follow-search" placeholder="Tell us what you're trying to help the faculty member with…"><div class="section">${situations.map((s,i)=>`<details class="accordion follow-item"><summary>${i+1}. ${s}<span>+</span></summary><div class="accordion-body"><p><strong>Explore first.</strong> Ask what is happening, what has already been tried, and what constraint matters most.</p><p><strong>Then suggest.</strong> Start with a small change that can be tried without requiring a major redesign.</p><button class="btn" data-save-follow="${s}">Save to My Toolkit</button></div></details>`).join("")}</div>`;
}
function searchPage(){
  return `<section class="hero"><div class="eyebrow">Search</div><h1>Find something in JosTEL.</h1><p class="lead">Search the navigation and core resources.</p></section><div class="search-row"><input class="input" id="global-search" autofocus placeholder="Try “assessment”, “HOTS”, “department”…"></div><div id="search-results" class="grid grid-2"></div>`;
}
function bind(){
  const ps=document.querySelector("#ped-search"),pf=document.querySelector("#ped-filter");
  function filterP(){if(!ps)return;const q=ps.value.toLowerCase(),f=pf.value;document.querySelectorAll(".ped-item").forEach(el=>el.style.display=((!q||el.dataset.text.includes(q))&&(f==="All levels"||el.dataset.levels.includes(f)))?"block":"none")}
  ps?.addEventListener("input",filterP);pf?.addEventListener("change",filterP);
  const as=document.querySelector("#activity-search");as?.addEventListener("input",()=>document.querySelectorAll(".activity-item").forEach(el=>el.style.display=(!as.value||el.textContent.toLowerCase().includes(as.value.toLowerCase()))?"block":"none"));
  const fs=document.querySelector("#follow-search");fs?.addEventListener("input",()=>document.querySelectorAll(".follow-item").forEach(el=>el.style.display=(!fs.value||el.textContent.toLowerCase().includes(fs.value.toLowerCase()))?"block":"none"));
  document.querySelectorAll("[data-save-ped]").forEach(b=>b.onclick=()=>{const p=pedagogies.find(x=>x.slug===b.dataset.savePed);saveToolkit({id:"ped-"+p.slug,type:"Pedagogy",title:p.name,description:p.description,tags:p.tags})});
  document.querySelectorAll("[data-save-assessment]").forEach(b=>b.onclick=()=>saveToolkit({id:"assessment-"+b.dataset.saveAssessment,type:"Assessment",title:b.dataset.saveAssessment,description:"Assessment method from the JosTEL assessment library.",tags:["assessment"]}));
  document.querySelectorAll("[data-save-activity]").forEach(b=>b.onclick=()=>saveToolkit({id:"activity-"+b.dataset.saveActivity,type:"Activity",title:b.dataset.saveActivity,description:"Classroom activity recipe.",tags:["activity"]}));
  document.querySelectorAll("[data-save-conversation]").forEach(b=>b.onclick=()=>saveToolkit({id:"conversation-"+b.dataset.saveConversation,type:"Conversation Guide",title:b.dataset.saveConversation,description:"Conversation stage from the Faculty Conversation Guide.",tags:["conversation"]}));
  document.querySelectorAll("[data-save-follow]").forEach(b=>b.onclick=()=>saveToolkit({id:"follow-"+b.dataset.saveFollow,type:"Follow-Up",title:b.dataset.saveFollow,description:"Follow-up situation from the Trainer Companion.",tags:["follow-up"]}));
  document.querySelector("#global-search")?.addEventListener("input",e=>{
    const results=searchEverything(e.target.value,getRole());
    document.querySelector("#search-results").innerHTML=results.length?results.map(x=>`<a class="card card-link" href="${x[2]}"><h3>${x[0]}</h3><p>${x[1]}</p></a>`).join(""):`<div class="empty">No matching JosTEL resources.</div>`;
  });
  document.querySelector("#print-report")?.addEventListener("click",()=>window.print());
  const fields=["title","courseCode","courseName","department","classSemester","students","date","pedagogy","thinking","learningOutcome","description","assessment","observed","reflection"];
  const sync=()=>{
    const v=id=>document.querySelector("#"+id)?.value||"";
    document.querySelector("#pv-title")&&(document.querySelector("#pv-title").textContent=v("title")||"Activity Report");
    document.querySelector("#pv-meta")&&(document.querySelector("#pv-meta").textContent=[v("courseCode"),v("courseName"),v("department"),v("classSemester"),v("date")].filter(Boolean).join(" · ")||"Fill in the form to preview your report.");
    document.querySelector("#pv-outcome-text")&&(document.querySelector("#pv-outcome-text").textContent=v("learningOutcome")||"—");
    document.querySelector("#pv-description")&&(document.querySelector("#pv-description").textContent=v("description")||"—");
    document.querySelector("#pv-assessment")&&(document.querySelector("#pv-assessment").textContent=v("assessment")||"—");
    document.querySelector("#pv-observed")&&(document.querySelector("#pv-observed").textContent=v("observed")||"—");
    document.querySelector("#pv-reflection")&&(document.querySelector("#pv-reflection").textContent=v("reflection")||"—");
  };
  fields.forEach(id=>document.querySelector("#"+id)?.addEventListener("input",sync));sync();
}
