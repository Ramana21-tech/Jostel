export function searchEverything(term, role="faculty"){
  const q=term.trim().toLowerCase();
  if(!q)return [];
  const common=[
    ["Pedagogies","Explore 20 teaching approaches.","#/pedagogies"],
    ["Assessments","Explore assessment methods and redesign ideas.","#/assessment"],
    ["HOTS","Explore LOTS, MOTS and HOTS examples.","#/hots"],
    ["Evidence","Plan evidence before, during and after an activity.","#/evidence"],
    ["My Toolkit","Review your saved resources.","#/toolkit"]
  ];
  const trainer=[["Departments","Explore possibilities by department.","#/departments"],["Conversation Guide","Use the seven-stage faculty conversation pathway.","#/conversation"],["Follow-Up","Explore common faculty situations and low-risk interventions.","#/follow-up"]];
  return [...common,...(role==="trainer"?trainer:[])]
    .filter(x=>(x[0]+" "+x[1]).toLowerCase().includes(q));
}
