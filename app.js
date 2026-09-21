
const $=s=>document.querySelector(s);
const get=async f=>{ if(window.JOSTEL_DATA){ const k=f.replace(/\.json$/,"" ); return window.JOSTEL_DATA[k]; } return fetch("data/"+f).then(r=>r.json()); };
let role=localStorage.getItem("jostel-role")||null;
let data={p:[],d:[],a:[],act:[],h:[],f:[]};

const navFaculty=[["home","Home"],["pedagogies","Pedagogies"],["activities","Activities"],["hots","LOTS / MOTS / HOTS"],["assessment","Assessments"],["evidence","Evidence"],["report","Activity Report"],["toolkit","My Toolkit"]];
const navTrainer=[["home","Home"],["departments","Departments"],["conversation","Conversation Guide"],["pedagogies","Pedagogies"],["hots","HOTS"],["assessment","Assessment"],["evidence","Evidence"],["follow-up","Follow-Up"],["toolkit","My Toolkit"]];


function roleChooser(){
 document.body.innerHTML=`
 <main class="chooser-page">
   <div class="chooser-shell">
     <div class="chooser-brand"><div class="logo">J</div><div><b>JosTEL</b><span>Joseph's Technology Enhanced Learning</span></div></div>
     <section class="chooser-hero">
       <div class="eyebrow">Welcome to JosTEL</div>
       <h1>How would you like to use JosTEL?</h1>
       <p class="lead">Choose the companion that matches your role. Both sides use the same teaching-and-learning foundation, but the content, language and tools change depending on who is using them.</p>
     </section>

     <div class="role-grid">
       <article class="role-card faculty-role">
         <div class="role-top"><span class="role-mark">F</span><span class="role-pill">For Faculty</span></div>
         <h2>Faculty Companion</h2>
         <p>For faculty members who want practical support for planning classes, choosing teaching approaches, improving assessment and documenting learning.</p>
         <div class="role-section"><b>What you can do</b><ul>
           <li>Explore 20 teaching pedagogies and classroom recipes</li>
           <li>Plan activities for your next class</li>
           <li>Turn LOTS and MOTS questions into HOTS</li>
           <li>Redesign assessments to better match learning goals</li>
           <li>Capture evidence of student learning</li>
           <li>Create and print an Activity Report</li>
           <li>Save useful resources to My Toolkit</li>
         </ul></div>
         <div class="role-flow"><span>Discover</span><i>→</i><span>Try</span><i>→</i><span>Think</span><i>→</i><span>Assess</span><i>→</i><span>Reflect</span></div>
         <button class="btn primary role-select" data-role="faculty">Enter Faculty Companion →</button>
       </article>

       <article class="role-card trainer-role">
         <div class="role-top"><span class="role-mark">T</span><span class="role-pill">For Trainers</span></div>
         <h2>Trainer Companion</h2>
         <p>For trainers and academic-support staff who help faculty explore teaching practice through structured conversations and low-risk interventions.</p>
         <div class="role-section"><b>What you can do</b><ul>
           <li>Explore teaching possibilities by department</li>
           <li>Use a seven-stage Faculty Conversation Guide</li>
           <li>Find pedagogies to raise as discussion options</li>
           <li>Help faculty develop LOTS, MOTS and HOTS thinking</li>
           <li>Discuss whether assessment measures intended learning</li>
           <li>Recognise evidence naturally produced by activities</li>
           <li>Work through common situations with Follow-Up guidance</li>
           <li>Save useful conversation resources to My Toolkit</li>
         </ul></div>
         <div class="role-flow"><span>Discover</span><i>→</i><span>Understand</span><i>→</i><span>Explore</span><i>→</i><span>Strengthen</span><i>→</i><span>Follow-Up</span></div>
         <button class="btn dark role-select" data-role="trainer">Enter Trainer Companion →</button>
       </article>
     </div>

     <section class="common-card">
       <div><div class="eyebrow">Shared foundation</div><h2>What is common between the two?</h2><p>Both companions are built around the same JosTEL ideas. What changes is the <b>point of view</b>: faculty use them directly in their classroom practice, while trainers use them to support conversations with faculty.</p></div>
       <div class="common-grid">
         <div><b>Pedagogies</b><span>Faculty: choose and try · Trainer: discuss and explore</span></div>
         <div><b>HOTS</b><span>Faculty: redesign student thinking · Trainer: help faculty strengthen thinking</span></div>
         <div><b>Assessment</b><span>Faculty: improve an assessment · Trainer: examine assessment alignment</span></div>
         <div><b>Evidence</b><span>Faculty: capture learning · Trainer: identify useful evidence</span></div>
       </div>
     </section>
     <p class="chooser-footer">JosTEL — Joseph's Technology Enhanced Learning</p>
   </div>
 </main>`;
 document.querySelectorAll('.role-select').forEach(b=>b.onclick=()=>{role=b.dataset.role;localStorage.setItem('jostel-role',role);location.hash='#/home';render()});
}

function shell(){
 document.body.innerHTML=`<header class="header"><div class="container top">
 <a class="brand" href="#/home"><div class="logo">J</div><div><b>JosTEL</b><span>Joseph's Technology Enhanced Learning</span></div></a>
 <div class="top-actions"><span class="role" id="role"></span><a class="btn" href="#/search">⌕ Search</a><button class="btn" id="switch">Switch Role</button></div></div>
 <div class="nav-wrap"><nav class="container nav" id="nav"></nav></div></header>
 <main><div class="container" id="page"></div></main>
 <footer class="footer"><div class="container footer-inner"><span><b>JosTEL</b> — Joseph's Technology Enhanced Learning.</span><span>Discover → Try → Think → Assess → Capture → Reflect.</span></div></footer>
 <div id="toast"></div>`;
 $("#role").textContent=(role==="faculty"?"Faculty":"Trainer")+" Companion";
 $("#nav").innerHTML=(role==="faculty"?navFaculty:navTrainer).map(([x,t])=>`<a href="#/${x}" data-nav="${x}">${t}</a>`).join("");
 $("#switch").onclick=()=>{role=null;localStorage.removeItem("jostel-role");location.hash="";render()};
}
const tag=x=>`<span class="tag ${String(x).toLowerCase()}">${x}</span>`;
const card=(i,t,d,h)=>`<a class="card card-link" href="${h}"><div class="icon">${i}</div><h3>${t}</h3><p>${d}</p></a>`;
function save(x){let a=JSON.parse(localStorage.getItem("jostel-toolkit")||"[]");if(!a.some(y=>y.id===x.id)){a.push(x);localStorage.setItem("jostel-toolkit",JSON.stringify(a));toast("Saved to My Toolkit")}else toast("Already saved")}
function toast(s){$("#toast").innerHTML=`<div class="toast">${s}</div>`;setTimeout(()=>$("#toast").innerHTML="",1800)}
function active(x){document.querySelectorAll("[data-nav]").forEach(a=>a.classList.toggle("active",a.dataset.nav===x))}
function page(x){const el=$("#page");if(!el)return;el.innerHTML=x;bind()}

function home(){
 const trainer=role==="trainer";
 return `<section class="hero"><div class="eyebrow">${trainer?"Trainer":"Faculty"} Companion</div>
 <h1>${trainer?"How can you help a faculty member discover and strengthen their teaching practice?":"What do you want to do in your classroom?"}</h1>
 <p class="lead">${trainer?"Prepare for a conversation, or explore possibilities for a specific department.":"Start from wherever you are — a teaching approach, an assessment, or just a rough idea."}</p>
 <div class="callout"><b>I don't know where to start</b>${trainer?"Tell us what you're trying to help the faculty member with.":"Tell us what you're trying to achieve in your class, and we'll guide you."}</div></section>
 <div class="grid g3">${trainer?
 [card("🏛","Department Explorer","Explore teaching possibilities by department.","#/departments"),card("💬","Faculty Conversation Guide","A seven-stage conversation pathway, not a checklist.","#/conversation"),card("📚","Pedagogy Navigator","Find approaches worth raising with faculty.","#/pedagogies"),card("🧠","HOTS Development","Explore recall, application and deeper thinking.","#/hots"),card("✓","Assessment Conversation","Explore whether assessment measures intended learning.","#/assessment"),card("🔎","Evidence Conversation","Recognise evidence naturally produced by activities.","#/evidence"),card("↪","Follow-Up Guide","Work through common situations and low-risk next steps.","#/follow-up"),card("🧰","My Toolkit","Keep useful resources together.","#/toolkit")]
 :
 [card("📚","Explore Pedagogies","Browse teaching approaches and find one worth trying.","#/pedagogies"),card("🗓","Plan My Next Class","Use practical classroom activity recipes.","#/activities"),card("🧠","LOTS / MOTS / HOTS","Turn recall into deeper thinking.","#/hots"),card("✓","Improve My Assessment","Explore meaningful ways to assess learning.","#/assessment"),card("🔎","Evidence Helper","Think about evidence before, during and after.","#/evidence"),card("📝","Activity Report","Document what you did and save it as PDF.","#/report"),card("🧰","My Toolkit","Keep useful ideas in one place.","#/toolkit")]}</div>`;
}
function pedagogies(){
 return `<section class="hero"><div class="eyebrow">${role==="faculty"?"Pedagogy Library":"Pedagogy Navigator"}</div><h1>Explore teaching approaches.</h1><p class="lead">${role==="faculty"?"Practical approaches you can explore for your classroom.":"Approaches worth raising with faculty, framed as options for a conversation — not prescriptions."}</p></section>
 <div class="search"><input class="input" id="ps" placeholder="Search pedagogies…"><select class="select" id="pf"><option>All levels</option><option>LOTS</option><option>MOTS</option><option>HOTS</option></select></div>
 <div class="grid g2" id="pg">${data.p.map(p=>`<a class="card card-link p" data-text="${(p.name+" "+p.description+" "+p.tags.join(" ")).toLowerCase()}" data-level="${p.levels.join(" ")}" href="#/pedagogy/${p.slug}"><h3>${p.name}</h3><p>${p.description}</p><div class="tags">${p.levels.map(tag).join("")}</div></a>`).join("")}</div>`;
}
function pedagogy(slug){
 const p=data.p.find(x=>x.slug===slug)||data.p[0];
 return `<section class="hero"><div class="eyebrow">Pedagogy Library</div><h1>${p.name}</h1><p class="lead">${p.description}</p><div class="tags">${p.levels.map(tag).join("")}</div><div class="hero-actions"><button class="btn primary" data-save="p:${p.slug}">Save to My Toolkit</button></div></section>
 <div class="callout soft"><b>Consider discussing / trying this when…</b>${p.consider}</div>
 <div class="info"><div><small>Class duration</small>${p.duration}</div><div><small>Group size</small>${p.groupSize}</div><div><small>Preparation</small>${p.preparation}</div><div><small>Materials</small>Course-specific resources</div></div>
 <section class="section"><h2>What is it?</h2><div class="card"><p>${p.description}</p></div></section>
 <section class="section"><h2>Try it in your next class</h2><div class="card"><ol>${p.steps.map(s=>`<li>${s}</li>`).join("")}</ol></div>
 <div class="recipe section"><div class="mini"><h3>Teacher does</h3><p>${p.teacher}</p></div><div class="mini"><h3>Students do</h3><p>${p.students}</p></div><div class="mini"><h3>Teacher looks for</h3><p>${p.looks}</p></div></div></section>
 <div class="callout blue section"><b>Evidence</b>${p.evidence}</div>`;
}
function activities(){
 return `<section class="hero"><div class="eyebrow">Activities</div><h1>What can I actually do in class?</h1><p class="lead">Practical classroom activity recipes, ready to use.</p></section>
 <input class="input" id="as" placeholder="Search activities…"><section class="section">${data.act.map(a=>`<details class="accordion ai"><summary>${a.name}<span class="muted">${a.duration} · ${a.groupSize}</span></summary><div class="body"><p>${a.hook}</p><div class="recipe"><div class="mini"><h3>Teacher does</h3><p>${a.teacher}</p></div><div class="mini"><h3>Students do</h3><p>${a.students}</p></div><div class="mini"><h3>Assessment</h3><p>${a.assessment}</p></div></div><p><b>Evidence:</b> ${a.evidence}</p><p><b>Expected outcome:</b> ${a.outcome}</p><div class="tags">${a.levels.map(tag).join("")}</div><button class="btn" data-act="${a.name}">Save to My Toolkit</button></div></details>`).join("")}</section>`;
}
function hots(){
 return `<section class="hero"><div class="eyebrow">${role==="faculty"?"Thinking Levels":"HOTS Development"}</div><h1>LOTS, MOTS and HOTS</h1><p class="lead">${role==="faculty"?"Understand the difference, then turn an ordinary question into one that asks students to think more deeply.":"Help a faculty member see the difference between recall and deeper thinking, with real examples."}</p></section>
 <div class="grid g3"><article class="card"><div class="tags">${tag("LOTS")}</div><h2>Remember · Understand</h2><p>Recall information or demonstrate basic understanding.</p><p><b>Photosynthesis:</b> Define photosynthesis and describe its basic stages.</p></article>
 <article class="card"><div class="tags">${tag("MOTS")}</div><h2>Apply</h2><p>Use knowledge in a situation or task.</p><p><b>Photosynthesis:</b> Apply your knowledge to explain why a plant kept in low light grows differently.</p></article>
 <article class="card"><div class="tags">${tag("HOTS")}</div><h2>Analyse · Evaluate · Create</h2><p>Break ideas apart, make judgements, or create a response.</p><p><b>Photosynthesis:</b> Analyse declining crop growth and propose a solution.</p></article></div>
 <section class="section"><div class="section-head"><h2>Discipline examples</h2><span class="muted">Use the same thinking progression across subjects.</span></div><div class="grid g2">${data.h.map(x=>`<article class="card"><h3>${x.discipline}</h3><p>${tag("LOTS")} ${x.lots}</p><p>${tag("MOTS")} ${x.mots}</p><p>${tag("HOTS")} ${x.hots}</p></article>`).join("")}</div></section>
 <div class="callout soft section"><b>Turn This Into HOTS</b>Start with what students currently recall, identify the intended capability, then ask them to analyse, evaluate or create using that knowledge.</div>`;
}
function assessment(){
 return `<section class="hero"><div class="eyebrow">Assessment</div><h1>How can I assess this?</h1><p class="lead">${role==="faculty"?"Turn my assessment into something more meaningful.":"Explore whether an assessment measures what faculty actually want students to learn."}</p></section>
 ${data.a.map(a=>`<details class="accordion"><summary>${a.name}<span>+</span></summary><div class="body"><p>${a.description}</p><div class="recipe"><div class="mini"><h3>Teacher</h3><p>${a.teacher}</p></div><div class="mini"><h3>Students</h3><p>${a.students}</p></div><div class="mini"><h3>Evidence</h3><p>${a.evidence}</p></div></div><p><b>Redesign question:</b> ${a.redesign}</p><button class="btn" data-assess="${a.name}">Save to My Toolkit</button></div></details>`).join("")}
 <section class="card section"><div class="eyebrow">Biology example</div><h2>Redesign an assessment</h2><div class="recipe"><div class="mini"><h3>Original</h3><p>Explain photosynthesis.</p></div><div class="mini"><h3>LOTS</h3><p>Describe the stages of photosynthesis.</p></div><div class="mini"><h3>MOTS</h3><p>Apply your knowledge of photosynthesis to explain why a plant kept in low light grows differently.</p></div></div><div class="callout soft"><b>HOTS</b>A farmer notices declining crop growth despite adequate water and nutrients. Analyse possible causes related to photosynthesis and propose a solution.</div></section>`;
}
function evidence(){
 return `<section class="hero"><div class="eyebrow">Evidence</div><h1>Capture what learning looks like.</h1><p class="lead">Think about evidence before, during and after an activity.</p></section><div class="grid g3"><article class="card"><div class="icon">01</div><h2>Before</h2><p>What do students know, understand, or believe before the activity?</p></article><article class="card"><div class="icon">02</div><h2>During</h2><p>What can you observe while students are thinking, discussing, creating, applying, or solving?</p></article><article class="card"><div class="icon">03</div><h2>After</h2><p>What product, response, performance, reflection, or explanation shows what students learned?</p></article></div><div class="callout blue section"><b>Important</b>Evidence does not have to mean a new test. Often, the activity itself naturally produces evidence.</div>`;
}
function departments(){
 return `<section class="hero"><div class="eyebrow">Department Explorer</div><h1>Explore teaching possibilities by department</h1><p class="lead">Options for discussion, not prescriptions.</p></section><div class="grid g3">${data.d.map(d=>`<a class="card card-link" href="#/department/${d.slug}"><h3>${d.name}</h3><p>Teaching contexts, possible challenges, pedagogies, thinking levels, assessment, evidence and conversation starters.</p></a>`).join("")}</div>`;
}
function department(slug){
 const d=data.d.find(x=>x.slug===slug)||data.d[0],box=(t,a)=>`<article class="card"><h3>${t}</h3><ul>${a.map(x=>`<li>${x}</li>`).join("")}</ul></article>`;
 return `<section class="hero"><div class="eyebrow">Department Explorer</div><h1>${d.name}</h1><p class="lead">Teaching possibilities to explore in conversation.</p></section><div class="grid g2">${box("Typical teaching contexts",d.contexts)}${box("Possible learning challenges",d.challenges)}${box("Pedagogies worth exploring",d.pedagogies)}${box("Assessment possibilities",d.assessment)}${box("Evidence possibilities",d.evidence)}${box("Conversation starters",d.questions)}</div><div class="card section"><h3>LOTS / MOTS / HOTS</h3><p><b>LOTS:</b> ${d.lots.join(", ")}</p><p><b>MOTS:</b> ${d.mots.join(", ")}</p><p><b>HOTS:</b> ${d.hots.join(", ")}</p></div>`;
}
function conversation(){
 const s=[["Discover","understand current practice without judgement",["What are you currently doing in this course?","Walk me through a typical class session."]],["Understand","find what works and what struggles",["What seems to work particularly well?","Where do students struggle?","What have you already tried?"]],["Explore","clarify desired student capability",["What would you like students to be able to do?","What would that look like if a student did it really well?"]],["Strengthen","explore richer thinking, not prescribe",["Could students analyse, evaluate or create something rather than only recall information?","What is one small change worth trying?"]],["Assess","check alignment",["Does the assessment measure what you want students to learn?","If a student did well on your assessment, would that mean they can really do the thing you care about?"]],["Evidence","recognise existing evidence",["What evidence naturally comes from the activity?","What would you want to be able to show about this, later?"]],["Follow-Up","agree a concrete low-risk next step",["What small change could you try next?","When should we check in on how it went?"]]];
 return `<section class="hero"><div class="eyebrow">Faculty Conversation Guide</div><h1>A conversation pathway, not a checklist</h1><p class="lead">Move through these stages at the pace the conversation needs — skip back if something earlier needs revisiting.</p></section><div class="timeline">${s.map((x,i)=>`<div class="timeline-item"><div class="num">${i+1}</div><article class="card"><h2>${x[0]}</h2><p class="muted">Use this stage to ${x[1]}.</p><ul>${x[2].map(q=>`<li>${q}</li>`).join("")}</ul><button class="btn" data-conv="${x[0]}">Save to My Toolkit</button></article></div>`).join("")}</div>`;
}
function followup(){
 return `<section class="hero"><div class="eyebrow">Follow-Up</div><h1>What if…?</h1><p class="lead">Common situations, a way to explore before jumping to a fix, and small, low-risk interventions to suggest.</p></section><input class="input" id="fs" placeholder="Tell us what you're trying to help the faculty member with…"><section class="section">${data.f.map((x,i)=>`<details class="accordion fi"><summary>${i+1}. ${x.situation}<span>+</span></summary><div class="body"><h3>Explore first</h3><ul>${x.explore.map(q=>`<li>${q}</li>`).join("")}</ul><h3>Then suggest questions</h3><ul>${x.questions.map(q=>`<li>${q}</li>`).join("")}</ul><h3>Low-risk interventions</h3><ul>${x.interventions.map(q=>`<li>${q}</li>`).join("")}</ul><button class="btn" data-follow="${i}">Save to My Toolkit</button></div></details>`).join("")}</section>`;
}
function toolkit(){
 let t=JSON.parse(localStorage.getItem("jostel-toolkit")||"[]");
 if(!t.length)return `<div class="empty"><div class="icon" style="margin:0 auto 14px">🧰</div><h1>Nothing saved yet.</h1><p>Look for “Save to My Toolkit” on any pedagogy, assessment, activity, conversation stage or follow-up.</p><a class="btn primary" href="#/pedagogies">Explore Pedagogies</a></div>`;
 return `<section class="hero"><div class="eyebrow">My Toolkit</div><h1>Saved resources.</h1><p class="lead">Your saved resources stay on this browser.</p></section><div class="grid g2">${t.map((x,i)=>`<article class="card"><div class="eyebrow">${x.type}</div><h3>${x.title}</h3><p>${x.description||""}</p><button class="btn" data-remove="${i}">Remove</button></article>`).join("")}</div>`;
}
function report(){
 return `<section class="hero"><div class="eyebrow">Activity Report</div><h1>Document what I did.</h1><p class="lead">Fill this in, then print or save as PDF.</p></section><div class="report"><section class="card report-form"><div class="form">${field("courseCode","Course code")}${field("courseName","Course name")}${field("department","Department","select")}${field("semester","Class / semester")}${field("students","Number of students","number")}${field("date","Date","date")}${field("title","Activity title")}${field("pedagogy","Pedagogy used")}${field("thinking","Thinking level","thinking")}${field("outcome","Learning outcome","textarea",1)}${field("description","Description","textarea",1)}${field("assessment","Assessment","textarea",1)}${field("observed","Observed outcome","textarea",1)}${field("reflection","Reflection","textarea",1)}</div><h3 class="section">Evidence captured</h3><div class="grid g2">${["Student responses","Discussion notes","Student product","Presentation / performance","Peer or self-assessment","Reflection"].map(x=>`<label><input type="checkbox"> ${x}</label>`).join("")}</div><button class="btn primary section" id="print">Print → Save as PDF</button></section><section><div class="sheet" id="sheet"><h2 id="ptitle">Activity Report</h2><p class="muted" id="pmeta">Fill in the form to preview your report.</p><hr><h3>Learning outcome</h3><p id="pout">—</p><h3>Description</h3><p id="pdesc">—</p><h3>Assessment</h3><p id="passess">—</p><h3>Observed outcome</h3><p id="pobs">—</p><h3>Reflection</h3><p id="pref">—</p></div></section></div>`;
}
function field(id,label,type="text",full=0){
 if(type==="textarea")return `<div class="field ${full?"full":""}"><label>${label}</label><textarea class="textarea" id="${id}" rows="4"></textarea></div>`;
 if(type==="select")return `<div class="field"><label>${label}</label><select class="select" id="${id}"><option></option>${data.d.map(d=>`<option>${d.name}</option>`).join("")}</select></div>`;
 if(type==="thinking")return `<div class="field"><label>${label}</label><select class="select" id="${id}"><option></option><option>LOTS</option><option>MOTS</option><option>HOTS</option></select></div>`;
 return `<div class="field"><label>${label}</label><input class="input" id="${id}" type="${type}"></div>`;
}
function searchPage(){
 return `<section class="hero"><div class="eyebrow">Search</div><h1>Find something in JosTEL.</h1><p class="lead">Search across pedagogies, assessments, activities and departments.</p></section><input class="input" id="gs" autofocus placeholder="Try pedagogy, assessment, department…"><div class="grid g2 section" id="results"></div>`;
}
function bind(){
 const ps=$("#ps"),pf=$("#pf"),filter=()=>{document.querySelectorAll(".p").forEach(x=>x.style.display=(!ps.value||x.dataset.text.includes(ps.value.toLowerCase()))&&(pf.value==="All levels"||x.dataset.level.includes(pf.value))?"block":"none")};ps?.addEventListener("input",filter);pf?.addEventListener("change",filter);
 $("#as")?.addEventListener("input",e=>document.querySelectorAll(".ai").forEach(x=>x.style.display=x.textContent.toLowerCase().includes(e.target.value.toLowerCase())?"block":"none"));
 $("#fs")?.addEventListener("input",e=>document.querySelectorAll(".fi").forEach(x=>x.style.display=x.textContent.toLowerCase().includes(e.target.value.toLowerCase())?"block":"none"));
 document.querySelectorAll("[data-save]").forEach(b=>b.onclick=()=>{let p=data.p.find(x=>x.slug===b.dataset.save.split(":")[1]);save({id:b.dataset.save,type:"Pedagogy",title:p.name,description:p.description})});
 document.querySelectorAll("[data-act]").forEach(b=>b.onclick=()=>save({id:"act:"+b.dataset.act,type:"Activity",title:b.dataset.act,description:"JosTEL classroom activity recipe."}));
 document.querySelectorAll("[data-assess]").forEach(b=>b.onclick=()=>save({id:"assess:"+b.dataset.assess,type:"Assessment",title:b.dataset.assess,description:"JosTEL assessment method."}));
 document.querySelectorAll("[data-conv]").forEach(b=>b.onclick=()=>save({id:"conv:"+b.dataset.conv,type:"Conversation",title:b.dataset.conv,description:"Faculty Conversation Guide stage."}));
 document.querySelectorAll("[data-follow]").forEach(b=>b.onclick=()=>save({id:"follow:"+b.dataset.follow,type:"Follow-Up",title:data.f[+b.dataset.follow].situation,description:"JosTEL Follow-Up Guide."}));
 document.querySelectorAll("[data-remove]").forEach(b=>b.onclick=()=>{let a=JSON.parse(localStorage.getItem("jostel-toolkit")||"[]");a.splice(+b.dataset.remove,1);localStorage.setItem("jostel-toolkit",JSON.stringify(a));render()});
 $("#print")?.addEventListener("click",()=>print());
 const ids=["title","courseCode","courseName","department","semester","students","date","pedagogy","thinking","outcome","description","assessment","observed","reflection"];
 const sync=()=>{const v=id=>$("#"+id)?.value||"";if(!$("#ptitle"))return;$("#ptitle").textContent=v("title")||"Activity Report";$("#pmeta").textContent=[v("courseCode"),v("courseName"),v("department"),v("semester"),v("date")].filter(Boolean).join(" · ")||"Fill in the form to preview your report.";$("#pout").textContent=v("outcome")||"—";$("#pdesc").textContent=v("description")||"—";$("#passess").textContent=v("assessment")||"—";$("#pobs").textContent=v("observed")||"—";$("#pref").textContent=v("reflection")||"—"};
 ids.forEach(id=>$("#"+id)?.addEventListener("input",sync));sync();
 $("#gs")?.addEventListener("input",e=>{let q=e.target.value.toLowerCase(),all=[...data.p.map(x=>["Pedagogy",x.name,x.description,"#/pedagogy/"+x.slug]),...data.a.map(x=>["Assessment",x.name,x.description,"#/assessment"]),...data.d.map(x=>["Department",x.name,"Explore teaching possibilities.","#/department/"+x.slug]),...data.act.map(x=>["Activity",x.name,x.students,"#/activities"])];$("#results").innerHTML=all.filter(x=>x.join(" ").toLowerCase().includes(q)).slice(0,40).map(x=>`<a class="card card-link" href="${x[3]}"><div class="eyebrow">${x[0]}</div><h3>${x[1]}</h3><p>${x[2]}</p></a>`).join("")});
}
function route(){
 if(!role)return;
 let parts=location.hash.replace(/^#\//,"").split("/"),r=parts[0]||"home",id=parts[1];active(r);
 let html={home, pedagogies, activities, hots, assessment, evidence, departments, conversation, "follow-up":followup, toolkit, report, search:searchPage, pedagogy:()=>pedagogy(id), department:()=>department(id)}[r]||home;
 page(html());
}
async function render(){
 if(!role){roleChooser();return;}
 shell();
 try{[data.p,data.d,data.a,data.act,data.h,data.f]=await Promise.all(["pedagogies.json","departments.json","assessments.json","activities.json","hots.json","follow-up.json"].map(get));route()}catch(e){$("#page").innerHTML=`<div class="callout"><b>Preview could not load the content files.</b><p>Open the project through a local web server or GitHub Pages rather than directly as a file.</p></div>`}
}
addEventListener("hashchange",route);render();
