(() => {
"use strict";
const D = window.PORTFOLIO_DATA;
const $ = (s,r=document)=>r.querySelector(s), $$=(s,r=document)=>[...r.querySelectorAll(s)];
const esc = s => String(s).replace(/[&<>"']/g,m=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[m]));
const icon = n => `<i data-lucide="${n}"></i>`;

function bindData(){
  $$("[data-bind]").forEach(el=>{const path=el.dataset.bind.split(".");let v=D;path.forEach(k=>v=v?.[k]);if(v!=null)el.textContent=v});
  $$("[data-html]").forEach(el=>{const path=el.dataset.html.split(".");let v=D;path.forEach(k=>v=v?.[k]);if(v!=null)el.innerHTML=v});
  $$("[data-site-link]").forEach(el=>{
    const t=el.dataset.siteLink;
    const map={linkedin:D.site.linkedin,github:D.site.github,email:`mailto:${D.site.email}`,phone:`tel:+212689925275`,cv:D.site.cv};
    if(map[t]) el.href=map[t];
  });
}
function renderIcons(){if(window.lucide)lucide.createIcons()}
function renderHero(){
  $("#heroTech").innerHTML=D.hero.techChips.map(x=>`<span>${icon("check-circle")}${esc(x)}</span>`).join("");
  const t=D.hero.terminal;
  const lines=[
    ["comment","# Marwa Halli - AI & Data Profile"],
    ["plain","profile = {"],
    ["key",'  "focus": ["Machine Learning", "Computer Vision", "RAG / LLM"],'],
    ["key",`  "location": "${t.location}",`],
    ["key",`  "education": "${t.education}",`],
    ["key",`  "experience": "${t.experience}",`],
    ["plain","}"],
    ["last","# RESULT: AI applications & intelligent systems"]
  ];
  const panel=$("#codePanel"); let line=0, char=0; panel.innerHTML="";
  const tick=()=>{if(line>=lines.length){panel.insertAdjacentHTML("beforeend",'<span class="cursor"></span>');return}
    if(char===0)panel.insertAdjacentHTML("beforeend",`<div class="code-line ${lines[line][0]}"></div>`);
    const current=$$(".code-line",panel).at(-1), text=lines[line][1]; current.textContent=text.slice(0,++char);
    if(char<text.length){setTimeout(tick,13)}else{line++;char=0;setTimeout(tick,80)}
  };tick();
}
const skillIcons=["sparkles","database","code","globe","layers","cpu","server","users"];
function renderSkills(){
  $("#skillsGrid").innerHTML=D.skills.map((s,i)=>`<article class="skill-card reveal ${s.dominant?"dominant":""}">
    <div class="skill-top"><span class="icon-tile">${icon(skillIcons[i])}</span>${s.tag?`<span class="tag">${esc(s.tag)}</span>`:""}</div>
    <h3>${esc(s.title)}</h3><p>${esc(s.desc)}</p>
    <div class="checklist">${s.items.map(x=>`<div>${icon("check-circle")}<span>${esc(x)}</span></div>`).join("")}</div>
  </article>`).join("");
}
function renderAbout(){
$("#aboutStatement").textContent = D.about.statement;
$("#aboutSummary").textContent = D.about.summary;

$("#certGrid").innerHTML = D.about.certifications.map(c => `     <article class="cert-card">       <img
        src="${c.image}"
        alt="${esc(c.title)} certificate"
        loading="lazy"       >       <b>${esc(c.title)}</b>       <small>${esc(c.issuer)} · ${esc(c.date)}</small>     </article>
  `).join("");

$("#languageChips").innerHTML = D.about.languages
.map(x => `<span class="chip">${esc(x)}</span>`)
.join("");
}

function selectorCard(p,i){return `<button class="selector ${i===0?"active":""}" data-featured="${p.id}"><div class="selector-top"><span class="icon-tile">${icon(i===0?"sparkles":"layers")}</span><span class="tag">${esc(p.tag)}</span></div><h3>${esc(p.title)}</h3><p>${esc(p.subtitle)}</p></button>`}
function renderFeaturedSelectors(){
  $("#featuredSelectors").innerHTML=D.featuredProjects.map(selectorCard).join("");
  $$(".selector").forEach(b=>b.addEventListener("click",()=>{ $$(".selector").forEach(x=>x.classList.remove("active"));b.classList.add("active");renderFeatured(b.dataset.featured); }));
}
function renderFeatured(id){
  const p=D.featuredProjects.find(x=>x.id===id)||D.featuredProjects[0];
  let html=`<div class="detail-inner">
    <div class="detail-top"><div><span class="section-badge">${icon("sparkles")}${esc(p.title)} — Highness Internship</span><h3>${esc(p.title)}</h3>${p.description?`<p>${esc(p.description)}</p>`:""}</div><a class="btn btn-outline" ${p.github?`href="${p.github}" target="_blank" rel="noreferrer"`:`href="#" onclick="return false"`}>Open GitHub ↗</a></div>`;
  if(p.id==="projectx"){
    const max=Math.max(...p.benchmarks.map(b=>b.seconds));
    html+=`<div class="detail-columns"><div>
      <div class="detail-block"><h4>Objective</h4><p>Provide AI services while maintaining strict regional data isolation.</p></div>
      <div class="detail-block"><h4>My contribution</h4><p>AI Developer Intern at Highness, including the implementation areas below.</p></div>
      <div class="detail-block"><h4>Technologies</h4><div class="implementation">${p.technologies.map(x=>`<span class="chip">${esc(x)}</span>`).join("")}</div></div>
      <div class="detail-block" style="margin-top:22px"><h4>Features</h4><div class="feature-list">${p.features.map(x=>`<div>${icon("check-circle")}${esc(x)}</div>`).join("")}</div></div>
      <div class="detail-block" style="margin-top:22px"><h4>Implementation</h4><div class="implementation">${p.implementation.map(x=>`<span class="chip">${esc(x)}</span>`).join("")}</div></div>
    </div><div>
      <div class="detail-block"><h4>Benchmark results</h4><div class="bench">${p.benchmarks.map(b=>`<div class="bench-row"><div class="bench-label"><span>${esc(b.label)}</span><b>${esc(b.value)}</b></div><div class="bar-track"><div class="bar" data-width="${(b.seconds/max)*100}%"></div></div></div>`).join("")}</div></div>
      <div class="detail-block" style="margin-top:24px"><h4>Visual evidence</h4><div class="browser"><div class="browser-head"><i></i><i></i><i></i><span class="url">projectx.local / MVP</span></div><img src="${p.screenshot}" alt="ProjectX screenshot placeholder"></div></div>
    </div></div>`;
  } else {
    html+=`<div class="template-grid">${p.template.map(f=>`<div class="template-field"><b>${esc(f)}</b><span>To be completed</span></div>`).join("")}</div>`;
  }
  html+="</div>"; $("#projectDetail").innerHTML=html; renderIcons(); observeReveals(); setTimeout(()=>$$(".bar").forEach(b=>b.style.width=b.dataset.width),120);
}
function categories(p){return [p.category,p.extraCategory].filter(Boolean)}
function renderOther(filter="all"){
  const list=D.otherProjects.filter(p=>filter==="all"||categories(p).includes(filter));
  $("#otherGrid").innerHTML=list.map((p,i)=>`<article class="other-card reveal" style="transition-delay:${i*45}ms">
    <div class="other-head tint-${p.tint}"><span class="category-pill">${esc(p.category)}</span><h3>${esc(p.title)}</h3><span class="other-icon">${icon(p.category==="IoT & Embedded"?"cpu":p.category==="AI & Vision"?"scan-face":"layers")}</span></div>
    <div class="other-body"><h4>${esc(p.subtitle)}</h4><p>${esc(p.description)}</p><div class="tech-chips">${p.technologies.slice(0,5).map(x=>`<span class="chip">${esc(x)}</span>`).join("")}</div><div class="highlight">${icon("sparkles")}${esc(p.highlight)}</div><div class="card-links"><a href="#" data-open-project="${p.id}">Details ↗</a><a href="#" onclick="return false">GitHub ↗</a></div></div>
  </article>`).join("");
  $$("[data-open-project]").forEach(a=>a.addEventListener("click",e=>{e.preventDefault();openModal(a.dataset.openProject)}));
  renderIcons(); observeReveals();
}
function openModal(id){
  const p=D.otherProjects.find(x=>x.id===id); if(!p)return;
  $("#modalContent").innerHTML=`<span class="section-badge">${icon("layers")}${esc(p.category)}</span><h3 id="modalTitle">${esc(p.title)}</h3><p>${esc(p.description)}</p><div class="implementation">${p.technologies.map(x=>`<span class="chip">${esc(x)}</span>`).join("")}</div><div class="highlight">${icon("sparkles")}${esc(p.highlight)}</div><div class="modal-shot browser"><div class="browser-head"><i></i><i></i><i></i><span class="url">portfolio / ${esc(p.id)}</span></div><img src="${p.screenshot}" alt="Screenshot placeholder for ${esc(p.title)}"></div>`;
  renderIcons(); $("#projectModal").classList.add("open");$("#projectModal").setAttribute("aria-hidden","false");$("#modalClose").focus();document.body.style.overflow="hidden";
}
function closeModal(){ $("#projectModal").classList.remove("open");$("#projectModal").setAttribute("aria-hidden","true");document.body.style.overflow=""; }
function renderExperience(){
  $("#experienceTimeline").innerHTML=D.experience.map(e=>`<div class="timeline-item reveal"><span class="timeline-dot"></span><article class="timeline-card glass ${e.featured?"featured":""} ${e.subtle?"subtle":""}">${e.featured?'<span class="featured-label">Featured</span>':""}<h3>${esc(e.role)}</h3><div class="company">${esc(e.company)}</div><div class="period">${esc(e.period)}</div>${e.areas?`<div class="area-chips">${e.areas.map(x=>`<span class="chip">${esc(x)}</span>`).join("")}</div><div class="subhead">PROJECTS</div><div class="project-chips">${e.projects.map(p=>p.link?`<a class="chip" href="${p.link}">${esc(p.name)}</a>`:`<span class="chip">${esc(p.name)}</span>`).join("")}</div>`:""}${e.bullets?`<ul class="timeline-list">${e.bullets.map(x=>`<li>${esc(x)}</li>`).join("")}</ul>`:""}</article></div>`).join("");
}
function renderEducation(){
  $("#educationTimeline").innerHTML=D.education.map(e=>`<div class="timeline-item reveal"><span class="timeline-dot"></span><article class="timeline-card glass edu-card">${e.obtained?`<span class="obtained">${esc(e.obtained)}</span>`:""}<h3>${esc(e.degree)}</h3><div class="company">${esc(e.institution)}</div><div class="period">${esc(e.location)} · ${esc(e.period)}</div></article></div>`).join("");
}
function renderContacts(){
  const rows=[
    [icon("mail"),D.site.email,`mailto:${D.site.email}`,"Email →"],
    [icon("phone"),D.site.phone,"tel:+212689925275","Phone →"],
    [icon("github"),"github.com/Mar000906",D.site.github,"GitHub →"],
    [icon("map-pin"),D.site.location,"",""]
  ];
  $("#contactRows").innerHTML=rows.map(r=>`<div class="contact-row">${r[0]}<span>${esc(r[1])}</span>${r[2]?`<a href="${r[2]}" ${r[2].startsWith("http")?'target="_blank" rel="noreferrer"':''}>${r[3]}</a>`:""}</div>`).join("");
}
function observeReveals(){
  const io=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add("visible");io.unobserve(e.target)}}),{threshold:.08});
  $$(".reveal:not(.visible)").forEach(x=>io.observe(x));
}
function scrollSystems(){
  const bar=$("#progressBar"),top=$("#backTop"),sections=$$("main section[id]"),links=$$(".nav-link");
  const update=()=>{const h=document.documentElement.scrollHeight-innerHeight;bar.style.width=(scrollY/Math.max(h,1))*100+"%";top.classList.toggle("show",scrollY>600)};
  addEventListener("scroll",update,{passive:true});update();
  const spy=new IntersectionObserver(entries=>entries.forEach(en=>{if(en.isIntersecting){links.forEach(a=>a.classList.toggle("active",a.getAttribute("href")==="#"+en.target.id))}}),{rootMargin:"-35% 0px -55% 0px"});
  sections.forEach(s=>spy.observe(s));
  $("#backTop").onclick=()=>scrollTo({top:0,behavior:"smooth"});
}
function mobileMenu(){
  $("#menuToggle").onclick=()=>{const m=$("#navMenu"),open=m.classList.toggle("open");$("#menuToggle").setAttribute("aria-expanded",open)};
  $$(".nav-link").forEach(a=>a.addEventListener("click",()=>$("#navMenu").classList.remove("open")));
}
function filters(){
  $$("#filterTabs button").forEach(b=>b.addEventListener("click",()=>{$$("#filterTabs button").forEach(x=>x.classList.remove("active"));b.classList.add("active");renderOther(b.dataset.filter)}));
}
function form(){
  const f=$("#contactForm"), msg=$("#formMessage");
  f.addEventListener("submit",async e=>{
    e.preventDefault();msg.className="form-message";msg.textContent="";
    if(!f.checkValidity()){f.reportValidity();msg.classList.add("error");msg.textContent="Please complete all required fields.";return}
    const fd=new FormData(f);
    if(D.site.formspreeEndpoint){
      try{const r=await fetch(D.site.formspreeEndpoint,{method:"POST",body:fd,headers:{Accept:"application/json"}});if(!r.ok)throw new Error();msg.classList.add("success");msg.textContent="Message sent successfully.";f.reset()}catch{msg.classList.add("error");msg.textContent="The message could not be sent. Please try again or use direct contact."}
    }else{
      const body=`Company / Organization: ${fd.get("company")||""}\nType of opportunity: ${fd.get("opportunity")}\n\n${fd.get("message")}`;
      window.location.href=`mailto:${D.site.email}?subject=${encodeURIComponent("Portfolio contact — "+fd.get("name"))}&body=${encodeURIComponent(body)}`;
      msg.classList.add("success");msg.textContent="Opening your email client…";
    }
  });
}
function modalEvents(){
  $("#modalClose").onclick=closeModal;$(".modal-backdrop").onclick=closeModal;
  addEventListener("keydown",e=>{if(e.key==="Escape")closeModal()});
}
function init(){
  bindData();renderHero();renderAbout();renderSkills();renderFeaturedSelectors();renderFeatured("projectx");renderOther();renderExperience();renderEducation();renderContacts();renderIcons();mobileMenu();filters();scrollSystems();form();modalEvents();observeReveals();
}
document.readyState==="loading"?document.addEventListener("DOMContentLoaded",init):init();
})();