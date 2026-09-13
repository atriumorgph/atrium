/* ============================================================
   Atrium — Content, team and money system
   app.js — data model, views, charts and interaction
   ============================================================ */

"use strict";

/* ============================================================
   0. SUPABASE (persistence)
   ============================================================ */
const SUPABASE_URL = 'https://iuoomlxoxmaakrftchez.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Iml1b29tbHhveG1hYWtyZnRjaGV6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODkxOTcyODAsImV4cCI6MjEwNDc3MzI4MH0.oHBxOHQ-ZRsQ3fPBBLpXziOrExBstprP2LVQHBKkxvE';
const sb = window.supabase ? window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY) : null;

/* ============================================================
   1. ICONS
   ============================================================ */
const P = {
  dashboard:'<rect x="3" y="3" width="7" height="9" rx="1.5"/><rect x="14" y="3" width="7" height="5" rx="1.5"/><rect x="14" y="12" width="7" height="9" rx="1.5"/><rect x="3" y="16" width="7" height="5" rx="1.5"/>',
  briefing:'<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
  planner:'<path d="M4 6h16M4 12h16M4 18h9"/><circle cx="18.5" cy="18" r="2.2"/>',
  production:'<rect x="2.5" y="5" width="19" height="14" rx="2"/><path d="M10 9.5l5 2.5-5 2.5z"/>',
  calendar:'<rect x="3" y="4.5" width="18" height="16" rx="2"/><path d="M3 9.5h18M8 3v3M16 3v3"/>',
  library:'<path d="M3 7.5A2 2 0 0 1 5 5.5h4l2 2.2h8a2 2 0 0 1 2 2v8.3a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>',
  publish:'<path d="M21.5 3.2 2.8 10.1l7.2 2.9 2.9 7.2z"/><path d="M21.5 3.2 10 13"/>',
  analytics:'<path d="M4 19.5V12M9.3 19.5V6M14.7 19.5v-6M20 19.5V9"/>',
  platforms:'<circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3a15 15 0 0 1 0 18 15 15 0 0 1 0-18z"/>',
  campaigns:'<path d="M4 10v4a1 1 0 0 0 1 1h3l6 4V5L8 9H5a1 1 0 0 0-1 1z"/><path d="M17.5 8.5a5 5 0 0 1 0 7"/>',
  reports:'<path d="M14 3v5h5"/><path d="M14 3H6.5A1.5 1.5 0 0 0 5 4.5v15A1.5 1.5 0 0 0 6.5 21h11a1.5 1.5 0 0 0 1.5-1.5V8z"/><path d="M8.5 13h7M8.5 17h4"/>',
  team:'<circle cx="9" cy="8" r="3.2"/><path d="M3 20a6 6 0 0 1 12 0"/><path d="M16.5 5.5a3 3 0 0 1 0 5.6M17.5 14.2A5.6 5.6 0 0 1 21 20"/>',
  tasks:'<rect x="3.5" y="4.5" width="17" height="16" rx="2"/><path d="M8 12l2.5 2.5L16 9"/>',
  workload:'<path d="M5.6 19.4a9 9 0 1 1 12.8 0"/><path d="M12 13.2l4.6-4.2"/><circle cx="12" cy="13.2" r="1.1"/>',
  goals:'<circle cx="12" cy="12" r="8.5"/><circle cx="12" cy="12" r="4.5"/><circle cx="12" cy="12" r="1"/>',
  revenue:'<rect x="2.5" y="6" width="19" height="12.5" rx="2"/><circle cx="12" cy="12.2" r="2.6"/><path d="M6 12.2h.01M18 12.2h.01"/>',
  expenses:'<path d="M5 3.5h14v17l-2.3-1.6-2.3 1.6-2.4-1.6L9.6 20.5 7.3 19 5 20.5z"/><path d="M9 8.5h6M9 12.5h6"/>',
  costs:'<ellipse cx="12" cy="6.5" rx="7.5" ry="3"/><path d="M4.5 6.5v11c0 1.7 3.4 3 7.5 3s7.5-1.3 7.5-3v-11"/><path d="M4.5 12c0 1.7 3.4 3 7.5 3s7.5-1.3 7.5-3"/>',
  budget:'<path d="M12 3a9 9 0 1 0 9 9h-9z"/><path d="M14.5 2.6A9 9 0 0 1 21.4 9.5h-6.9z"/>',
  profit:'<path d="M3.5 16.5 9 11l4 3.5 7.5-8"/><path d="M15.5 6.5H21v5.2"/>',
  bank:'<path d="M3.5 9.5 12 4l8.5 5.5"/><path d="M5.5 10.5v7M10 10.5v7M14 10.5v7M18.5 10.5v7M3 20.5h18"/>',
  bell:'<path d="M18 8.5a6 6 0 1 0-12 0c0 5.5-2 7-2 7h16s-2-1.5-2-7z"/><path d="M13.7 20a2 2 0 0 1-3.4 0"/>',
  activity:'<path d="M3 12h4l2.5-6 4 13 2.5-7H21"/>',
  userAccess:'<circle cx="10" cy="8" r="3.4"/><path d="M4 20a6.2 6.2 0 0 1 10.2-4.1"/><path d="M15 18.6l1.9 1.9 3.9-4.2"/>',
  building:'<rect x="4.5" y="3" width="15" height="18" rx="1.5"/><path d="M8.5 7.5h2M13.5 7.5h2M8.5 11.5h2M13.5 11.5h2"/><path d="M9.8 21v-4.2h4.4V21"/>',
  settings:'<circle cx="12" cy="12" r="3"/><path d="M19.4 14.4a1.7 1.7 0 0 0 .3 1.9l.1.1a2 2 0 1 1-2.9 2.9l-.1-.1a1.7 1.7 0 0 0-2.9 1.2v.1a2 2 0 0 1-4 0v-.2a1.7 1.7 0 0 0-3-1.1l-.1.1a2 2 0 1 1-2.9-2.9l.1-.1a1.7 1.7 0 0 0-1.2-2.9h-.1a2 2 0 0 1 0-4h.2a1.7 1.7 0 0 0 1.1-3l-.1-.1a2 2 0 1 1 2.9-2.9l.1.1a1.7 1.7 0 0 0 2.9-1.2v-.1a2 2 0 0 1 4 0v.2a1.7 1.7 0 0 0 3 1.1l.1-.1a2 2 0 1 1 2.9 2.9l-.1.1a1.7 1.7 0 0 0 1.2 2.9h.1a2 2 0 0 1 0 4h-.2a1.7 1.7 0 0 0-1.5 1z"/>',
  search:'<circle cx="11" cy="11" r="6.5"/><path d="M20 20l-3.7-3.7"/>',
  chevR:'<path d="M9 5l7 7-7 7"/>', chevD:'<path d="M5 9l7 7 7-7"/>', chevU:'<path d="M19 15l-7-7-7 7"/>',
  plus:'<path d="M12 5v14M5 12h14"/>',
  filter:'<path d="M3.5 5.5h17l-6.6 7.8v5.4l-3.8 2v-7.4z"/>',
  download:'<path d="M12 3.5v11M7.5 10.5 12 15l4.5-4.5"/><path d="M4 17.5v2a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1v-2"/>',
  more:'<circle cx="5" cy="12" r="1.4"/><circle cx="12" cy="12" r="1.4"/><circle cx="19" cy="12" r="1.4"/>',
  close:'<path d="M6 6l12 12M18 6 6 18"/>',
  arrUp:'<path d="M12 19V5M6 11l6-6 6 6"/>', arrDn:'<path d="M12 5v14M6 13l6 6 6-6"/>',
  ext:'<path d="M14 4h6v6"/><path d="M20 4 10.5 13.5"/><path d="M19 14.5V19a1.5 1.5 0 0 1-1.5 1.5h-12A1.5 1.5 0 0 1 4 19V7a1.5 1.5 0 0 1 1.5-1.5H10"/>',
  clock:'<circle cx="12" cy="12" r="8.5"/><path d="M12 7v5.3l3.3 2"/>',
  alert:'<path d="M10.3 3.9 2.6 17a2 2 0 0 0 1.7 3h15.4a2 2 0 0 0 1.7-3L13.7 3.9a2 2 0 0 0-3.4 0z"/><path d="M12 9.5v4M12 17.2h.01"/>',
  check:'<path d="M4.5 12.5 9.5 17.5 19.5 6.5"/>',
  checkC:'<circle cx="12" cy="12" r="8.5"/><path d="M8.5 12.2l2.4 2.4 4.6-5"/>',
  sun:'<circle cx="12" cy="12" r="4"/><path d="M12 2.5v2M12 19.5v2M4.2 4.2l1.4 1.4M18.4 18.4l1.4 1.4M2.5 12h2M19.5 12h2M4.2 19.8l1.4-1.4M18.4 5.6l1.4-1.4"/>',
  moon:'<path d="M20 14.2A8.5 8.5 0 0 1 9.8 4 8.5 8.5 0 1 0 20 14.2z"/>',
  menu:'<path d="M4 7h16M4 12h16M4 17h16"/>',
  sparkle:'<path d="M12 3.5 13.8 9l5.7 1.8-5.7 1.8L12 18.3l-1.8-5.7L4.5 10.8 10.2 9z"/>',
  user:'<circle cx="12" cy="8" r="3.6"/><path d="M4.5 20.5a7.5 7.5 0 0 1 15 0"/>',
  file:'<path d="M13.5 3v5.5H19"/><path d="M13.5 3H7a1.8 1.8 0 0 0-1.8 1.8v14.4A1.8 1.8 0 0 0 7 21h10a1.8 1.8 0 0 0 1.8-1.8V8.5z"/>',
  image:'<rect x="3.5" y="4.5" width="17" height="15" rx="2"/><circle cx="9" cy="10" r="1.6"/><path d="M4.5 17.5 9.5 13l3.5 3 2.5-2.2 4 4"/>',
  video:'<rect x="2.5" y="5.5" width="14" height="13" rx="2"/><path d="M16.5 10.5 21.5 7.5v9l-5-3z"/>',
  audio:'<path d="M9 18V5.5l10-2V16"/><circle cx="6.5" cy="18" r="2.6"/><circle cx="16.5" cy="16" r="2.6"/>',
  tag:'<path d="M3.5 11.6V4.5a1 1 0 0 1 1-1h7.1a1 1 0 0 1 .7.3l8 8a1 1 0 0 1 0 1.4l-7.1 7.1a1 1 0 0 1-1.4 0l-8-8a1 1 0 0 1-.3-.7z"/><circle cx="7.8" cy="7.8" r="1.1"/>',
  grip:'<circle cx="9" cy="6" r="1.3"/><circle cx="15" cy="6" r="1.3"/><circle cx="9" cy="12" r="1.3"/><circle cx="15" cy="12" r="1.3"/><circle cx="9" cy="18" r="1.3"/><circle cx="15" cy="18" r="1.3"/>',
  eye:'<path d="M2.5 12S6 5.5 12 5.5 21.5 12 21.5 12 18 18.5 12 18.5 2.5 12 2.5 12z"/><circle cx="12" cy="12" r="2.8"/>',
  heart:'<path d="M12 20s-7.5-4.6-7.5-9.5A4.3 4.3 0 0 1 12 7.6a4.3 4.3 0 0 1 7.5 2.9C19.5 15.4 12 20 12 20z"/>',
  print:'<path d="M6.5 9V3.5h11V9"/><rect x="3.5" y="9" width="17" height="7" rx="1.5"/><path d="M6.5 14h11v6.5h-11z"/>',
  layers:'<path d="M12 3 2.5 8 12 13l9.5-5z"/><path d="M2.5 15.5 12 20.5l9.5-5"/>',
  refresh:'<path d="M20.5 11.5A8.5 8.5 0 0 0 6 6.2L3.5 8.5"/><path d="M3.5 12.5A8.5 8.5 0 0 0 18 17.8l2.5-2.3"/><path d="M3.5 4.5v4h4M20.5 19.5v-4h-4"/>',
  pin:'<path d="M12 21s6.5-6.2 6.5-11a6.5 6.5 0 1 0-13 0C5.5 14.8 12 21 12 21z"/><circle cx="12" cy="10" r="2.3"/>',
  lock:'<rect x="4.5" y="10.5" width="15" height="10" rx="2"/><path d="M8 10.5V7.5a4 4 0 0 1 8 0v3"/>',
  sheet:'<rect x="3.5" y="3.5" width="17" height="17" rx="2"/><path d="M3.5 9.5h17M3.5 15h17M9.5 3.5v17M15 3.5v17"/>'
};
const icon = (n,s=15,cls='') => '<svg class="ic '+cls+'" width="'+s+'" height="'+s+'" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">'+(P[n]||'')+'</svg>';

/* ============================================================
   2. FORMATTERS & SMALL HELPERS
   ============================================================ */
const $  = (s,r=document)=>r.querySelector(s);
const $$ = (s,r=document)=>Array.from(r.querySelectorAll(s));
const esc = s => String(s==null?'':s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const sum = (a,f=x=>x)=>a.reduce((t,x)=>t+(+f(x)||0),0);
const by  = (a,k)=>a.reduce((m,x)=>((m[x[k]]=m[x[k]]||[]).push(x),m),{});
const clamp=(v,a,b)=>Math.max(a,Math.min(b,v));
const uniq = a => Array.from(new Set(a));

const F = {
  peso: (n,d=0)=> (n<0?'-':'')+'₱'+Math.abs(+n||0).toLocaleString('en-PH',{minimumFractionDigits:d,maximumFractionDigits:d}),
  pesoK: n => { n=+n||0; const a=Math.abs(n), s=n<0?'-':'';
    if(a>=1e6) return s+'₱'+(a/1e6).toFixed(a>=1e7?1:2)+'M';
    if(a>=1e3) return s+'₱'+(a/1e3).toFixed(a>=1e5?0:1)+'k';
    return s+'₱'+a.toFixed(0); },
  num: n => (+n||0).toLocaleString('en-PH'),
  numK: n => { n=+n||0; const a=Math.abs(n);
    if(a>=1e6) return (n/1e6).toFixed(a>=1e7?1:2)+'M';
    if(a>=1e3) return (n/1e3).toFixed(a>=1e5?0:1)+'k';
    return String(Math.round(n)); },
  pct: (n,d=1)=> isFinite(n) ? (+n).toFixed(d)+'%' : '—',
  sign: (n,d=1)=> isFinite(n) ? (n>0?'+':'')+(+n).toFixed(d)+'%' : '—',
  date: s => { const d=new Date(s+'T00:00:00'); return isNaN(d)?s:d.toLocaleDateString('en-PH',{month:'short',day:'numeric'}); },
  dateFull: s => { const d=new Date(s+'T00:00:00'); return isNaN(d)?s:d.toLocaleDateString('en-PH',{month:'short',day:'numeric',year:'numeric'}); },
  dur: h => h<1 ? Math.round(h*60)+'m' : (h%1===0?h:h.toFixed(1))+'h',
  secs: s => isFinite(s) ? Math.floor(s/60)+':'+String(Math.round(s%60)).padStart(2,'0') : '—',
  initials: n => { const w=String(n||'').trim().split(/\s+/).filter(Boolean);
    return !w.length ? '' : (w.length===1 ? w[0].slice(0,2) : w[0][0]+w[w.length-1][0]).toUpperCase(); }
};
let TODAY = new Date(); TODAY.setHours(0,0,0,0);          /* the real today */
const YEAR  = () => TODAY.getFullYear();
const MONTH = () => TODAY.getMonth();
const iso   = d => `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`;
const monthKey = i => `${YEAR()}-${String(i+1).padStart(2,'0')}`;
const daysInMonth = (y,m) => new Date(y, m+1, 0).getDate();
const daysFrom = s => Math.round((new Date(s+'T00:00:00') - TODAY)/864e5);
const relDays = s => { const d=daysFrom(s);
  if(d===0) return 'Today'; if(d===1) return 'Tomorrow'; if(d===-1) return 'Yesterday';
  return d<0 ? Math.abs(d)+'d overdue' : 'in '+d+'d'; };

/* deterministic pseudo-random so the prototype looks identical on every load */
let _seed = 20260911;
const rnd = () => (_seed = (_seed*1664525 + 1013904223) % 4294967296) / 4294967296;
const rr = (a,b)=> a + rnd()*(b-a);

/* ============================================================
   3. DATA MODEL
   Everything below is one connected graph:
   content -> campaign -> budget -> expenses -> revenue -> profit
   ============================================================ */

const MONTHS = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
/* Monthly figures are DERIVED from what has actually been entered.
   Record a peso anywhere and every chart and KPI moves with it. */
const SERIES = {revenue:[],direct:[],opex:[],expenses:[],published:[],views:[],
                engage:[],followers:[],cashIn:[],cashOut:[]};
function recomputeSeries(){
  const n = MONTHS.length;
  const blank = () => new Array(n).fill(0);
  const S2 = {revenue:blank(),direct:blank(),opex:blank(),published:blank(),views:blank(),
              engage:blank(),followers:blank(),cashIn:blank(),cashOut:blank()};
  const erCount = blank(), erSum = blank();
  REVENUE.forEach(r=>{ const i = +String(r.month||'').slice(5,7)-1;
    if(i>=0 && i<n && String(r.month||'').startsWith(YEAR())){
      S2.revenue[i]+=r.amount||0;
      if(r.status==='Paid') S2.cashIn[i]+=r.amount||0; } });
  EXPENSES.forEach(e=>{ const i=+String(e.month||'').slice(5,7)-1;
    if(i>=0 && i<n && String(e.month||'').startsWith(YEAR())){
      if(e.direct) S2.direct[i]+=e.amount||0; else S2.opex[i]+=e.amount||0;
      S2.cashOut[i]+=e.amount||0; } });
  CONTENT.filter(c=>c.isPublished && c.published).forEach(c=>{
    const i=+String(c.published).slice(5,7)-1;
    if(i>=0 && i<n && String(c.published).startsWith(YEAR())){
      S2.published[i]++; S2.views[i]+=c.views||0; S2.followers[i]+=c.followers||0;
      if(c.er){ erSum[i]+=c.er; erCount[i]++; } } });
  S2.engage = erSum.map((v,i)=> erCount[i] ? +(v/erCount[i]).toFixed(2) : 0);
  S2.expenses = S2.direct.map((d,i)=>d+S2.opex[i]);
  Object.keys(S2).forEach(k=>{ SERIES[k] = S2[k]; });
}

const PLATFORMS = [
  {id:'tiktok', name:'TikTok',          color:'#1D1D1F', handle:''},
  {id:'ig',     name:'Instagram',       color:'#C0392B', handle:''},
  {id:'yt',     name:'YouTube',         color:'#8A3C6B', handle:''},
  {id:'shorts', name:'YouTube Shorts',  color:'#6A4BC4', handle:''},
  {id:'fb',     name:'Facebook',        color:'#2F6E8F', handle:''}
];
const PLAT = Object.fromEntries(PLATFORMS.map(p=>[p.id,p]));

const STAGES = ['Idea','Planned','Script','Pre-production','Production','Editing','Review','Revision','Approved','Scheduled','Published'];
const STAGE_TONE = {Idea:'neutral',Planned:'neutral',Script:'info',['Pre-production']:'info',Production:'info',
  Editing:'warn',Review:'warn',Revision:'neg',Approved:'pos',Scheduled:'violet',Published:'pos',Archived:'neutral'};

const DEPTS = ['Creative','Strategy','Production','Post-production','Growth','Operations','Finance'];

/* ---- access levels ---- */
const PERM_AREAS = [['content','Content'],['publishing','Publishing'],['team','Team & tasks'],
  ['campaigns','Campaigns'],['finance','Finance'],['reports','Reports'],['settings','Settings & users']];
const PERM_TONE = {Full:'pos', Edit:'info', Own:'violet', View:'neutral', None:'ghost'};
const ROLES = [
  {id:'owner', name:'Owner', note:'Full control, including company details and who else gets in. One person holds this.',
   views:'Everything',
   perms:{content:'Full',publishing:'Full',team:'Full',campaigns:'Full',finance:'Full',reports:'Full',settings:'Full'}},
  {id:'admin', name:'Admin', note:'Runs the workspace day to day. Everything the owner can do except hand over ownership.',
   views:'Everything except transferring ownership',
   perms:{content:'Full',publishing:'Full',team:'Full',campaigns:'Full',finance:'Full',reports:'Full',settings:'Edit'}},
  {id:'manager', name:'Manager', note:'Plans and ships the work. Can see what things cost and earn, but does not record money.',
   views:'All content, team and campaign screens; finance read-only',
   perms:{content:'Full',publishing:'Full',team:'Edit',campaigns:'Full',finance:'View',reports:'Full',settings:'None'}},
  {id:'finance', name:'Finance', note:'Owns the ledgers, budgets and reporting. Reads content but cannot change it.',
   views:'All finance screens and reports; content read-only',
   perms:{content:'View',publishing:'None',team:'View',campaigns:'View',finance:'Full',reports:'Full',settings:'None'}},
  {id:'creator', name:'Creator', note:'Makes the work. Their own content and tasks, and no money at all.',
   views:'Planner, production, library, publishing, their own tasks',
   perms:{content:'Own',publishing:'Edit',team:'View',campaigns:'View',finance:'None',reports:'None',settings:'None'}},
  {id:'viewer', name:'Viewer', note:'Looks, does not touch. For a client, an investor or your accountant.',
   views:'Dashboards and reports only, nothing editable',
   perms:{content:'View',publishing:'View',team:'View',campaigns:'View',finance:'View',reports:'View',settings:'None'}}
];
const ROLE = Object.fromEntries(ROLES.map(r=>[r.id,r]));
const roleName = id => (ROLE[id]||{}).name || '—';

/* ---- team ---- */
const TEAM = [
 // id, name, job title, dept, colour, done, onTime, turnaround, active, capacity, allocated,
 // joined, email, access level, account status, last active
 ['tm9','Jaymar Bomiel','Owner','Operations','#1D1D1F',0,100,0,0,40,0,iso(new Date()),
  'jaymar@atrium.ph','owner','Active','now']
].map(r=>({id:r[0],name:r[1],role:r[2],dept:r[3],color:r[4],done:r[5],onTime:r[6],turn:r[7],active:r[8],
  capacity:r[9],allocated:r[10],joined:r[11],initials:F.initials(r[1]),
  email:r[12], access:r[13], status:r[14], lastActive:r[15],
  load:r[9]?Math.round(r[10]/r[9]*100):0}));
const MEM = Object.fromEntries(TEAM.map(t=>[t.id,t]));
const ME  = TEAM[0] || {id:'',name:'',role:'',dept:''};   /* whoever is signed in */
const memName = id => (MEM[id]||{name:'Unassigned'}).name;
const nickOf = id => { const t=MEM[id]; if(!t) return 'Unassigned'; return t.nickname || t.name.split(' ')[0]; };

/* ---- campaigns ---- */
const CAMPAIGNS = [].map(r=>({id:r[0],name:r[1],objective:r[2],start:r[3],end:r[4],budget:r[5],spent:r[6],revenue:r[7],
  status:r[8],team:r[9],platforms:r[10]}));
const CMP = Object.fromEntries(CAMPAIGNS.map(c=>[c.id,c]));
const cmpName = id => (CMP[id]||{name:'—'}).name;

/* ---- content ---- */
const C_COLS = ['id','title','type','category','platform','campaign','status','owner','editor','priority',
  'deadline','estCost','cost','views','er','followers','revenue','published','watch','completion'];
const CONTENT = [].map(r=>{ const o={}; C_COLS.forEach((k,i)=>o[k]=r[i]); return o; });

/* per-content cost breakdown (stable, derived once) */
const COST_LINES = ['Talent fee','Transportation','Food & crew','Editing','Props & ingredients','Music licence','Paid boost'];
const WEIGHTS   = [0.26,0.11,0.09,0.30,0.12,0.04,0.08];
CONTENT.forEach(c=>{
  let left=c.cost, lines=[];
  WEIGHTS.forEach((w,i)=>{
    const v = i===WEIGHTS.length-1 ? left : Math.round(c.cost*w*rr(.82,1.18)/50)*50;
    const val = Math.max(0,Math.min(v,left)); left-=val;
    if(val>0) lines.push({label:COST_LINES[i],amount:val});
  });
  c.costLines=lines;
  c.profit = c.revenue - c.cost;
  c.roi = c.cost>0 ? (c.revenue-c.cost)/c.cost*100 : 0;
  c.engagements = Math.round(c.views * c.er/100);
  c.isPublished = c.status==='Published';
  c.stageIndex = STAGES.indexOf(c.status);
});
const CT = Object.fromEntries(CONTENT.map(c=>[c.id,c]));
const PUBLISHED = CONTENT.filter(c=>c.isPublished);

/* ---- production stage log (per content, per stage) ---- */
const STAGE_FLOW = ['Idea','Script','Pre-production','Shoot','Edit','Review','Revision','Approval','Publish'];
CONTENT.forEach(c=>{
  const done = Math.max(1, Math.min(STAGE_FLOW.length, Math.round((c.stageIndex+1)/STAGES.length*STAGE_FLOW.length)));
  c.stages = STAGE_FLOW.map((s,i)=>({
    name:s,
    owner: i<3 ? c.owner : (i<5 ? c.editor : c.owner),
    state: i<done-1 ? 'Done' : (i===done-1 ? 'In progress' : 'Not started'),
    hours: i<done ? +rr(1.5,9).toFixed(1) : 0,
    days: +rr(.4,3.2).toFixed(1)
  }));
});

/* ---- tasks ---- */
const TASKS = [].map(r=>({id:r[0],title:r[1],content:r[2],assignee:r[3],due:r[4],status:r[5],priority:r[6],dept:r[7],hours:r[8],
  overdue: r[5]!=='Done' && daysFrom(r[4])<0}));

/* ============================================================
   3b. SUPABASE HYDRATION & PERSISTENCE
   Content and team are the two record types with a working
   create form — they load from and write through to Supabase.
   ============================================================ */
function buildStages(status, owner, editor){
  const idx = STAGES.indexOf(status);
  const done = Math.max(1, Math.min(STAGE_FLOW.length, Math.round((idx+1)/STAGES.length*STAGE_FLOW.length)));
  return STAGE_FLOW.map((s,i)=>({
    name:s, owner: i<3 ? owner : (i<5 ? editor : owner),
    state: i<done-1 ? 'Done' : (i===done-1 ? 'In progress' : 'Not started'),
    hours:0, days:0
  }));
}
function hydrateContentRow(r){
  const c = {id:r.id, title:r.title, type:r.type, category:r.category, platform:r.platform, campaign:r.campaign,
    status:r.status, owner:r.owner, editor:r.editor, priority:r.priority, deadline:r.deadline,
    estCost:+r.est_cost||0, cost:+r.cost||0, views:+r.views||0, er:+r.er||0, followers:+r.followers||0,
    revenue:+r.revenue||0, published:r.published||'', watch:+r.watch||0, completion:+r.completion||0, costLines:[]};
  c.profit = c.revenue - c.cost;
  c.roi = c.cost>0 ? (c.revenue-c.cost)/c.cost*100 : 0;
  c.engagements = Math.round(c.views * c.er/100);
  c.isPublished = c.status==='Published';
  c.stageIndex = STAGES.indexOf(c.status);
  c.stages = buildStages(c.status, c.owner, c.editor);
  return c;
}
function hydrateTeamRow(r){
  const cap=+r.capacity||40, alloc=+r.allocated||0;
  return {id:r.id, name:r.name, role:r.role, dept:r.dept, color:r.color||'#1D1D1F',
    done:0, onTime:100, turn:0, active:0, capacity:cap, allocated:alloc,
    joined:r.joined||'', initials:F.initials(r.name), email:r.email||'', access:r.access||'creator',
    status:r.status||'Active', lastActive:r.last_active||'', load: cap?Math.round(alloc/cap*100):0,
    restrictedNav:r.restricted_nav||[], nickname:r.nickname||''};
}
function newId(prefix){ return prefix+'-'+Date.now().toString(36)+Math.random().toString(36).slice(2,5); }
function hydrateCampaignRow(r){
  return {id:r.id, name:r.name, objective:r.objective, start:r.start, end:r.end,
    budget:+r.budget||0, spent:+r.spent||0, revenue:+r.revenue||0, status:r.status||'Active',
    team:r.team||[], platforms:r.platforms||[]};
}
function hydrateTaskRow(r){
  return {id:r.id, title:r.title, content:r.content, assignee:r.assignee, due:r.due,
    status:r.status||'To do', priority:r.priority, dept:r.dept, hours:+r.hours||0,
    overdue: r.status!=='Done' && daysFrom(r.due)<0};
}
function hydrateRevenueRow(r){
  return {id:r.id, date:r.date, source:r.source, client:r.client, campaign:r.campaign, content:r.content,
    platform:r.platform, amount:+r.amount||0, status:r.status||'Pending', invoice:r.invoice, month:(r.date||'').slice(0,7)};
}
function hydrateExpenseRow(r){
  return {id:r.id, date:r.date, category:r.category, vendor:r.vendor, description:r.description, amount:+r.amount||0,
    method:r.method, dept:r.dept, campaign:r.campaign, content:r.content, recurrence:r.recurrence, approval:r.approval||'Pending',
    month:(r.date||'').slice(0,7), direct:['Production','Freelancers','Transportation','Food'].includes(r.category)};
}
function hydrateBudgetRow(r){
  const o={id:r.id, name:r.name, type:r.type, period:r.period, budget:+r.budget||0, actual:+r.actual||0, dept:r.dept};
  o.remaining=o.budget-o.actual; o.util=o.budget? o.actual/o.budget*100:0; return o;
}
function hydrateGoalRow(r){
  const o={id:r.id, name:r.name, owner:r.owner, target:+r.target||0, actual:+r.actual||0, fmt:r.fmt||'num', inverse:!!r.inverse};
  o.pct = o.inverse ? (o.actual? o.target/o.actual*100:0) : (o.target? o.actual/o.target*100:0);
  o.variance = o.inverse ? o.target-o.actual : o.actual-o.target; return o;
}
function hydrateAssetRow(r){
  return {id:r.id, name:r.name, type:r.type, content:r.content, campaign:r.campaign, creator:r.creator,
    date:r.date, version:+r.version||1, status:r.status||'Draft', tags:r.tags||''};
}
function hydratePublishingRow(r){
  return {id:r.id, content:r.content, platform:r.platform, account:r.account||'', date:r.date, time:r.time||'',
    status:r.status||'Scheduled', url:r.url||'', hashtags:r.hashtags||''};
}
async function loadFromSupabase(){
  if(!sb) return;
  try{
    const [
      {data:contentRows,error:e1}, {data:teamRows,error:e2}, {data:activityRows,error:e3},
      {data:campaignRows,error:e4}, {data:taskRows,error:e5}, {data:revenueRows,error:e6},
      {data:expenseRows,error:e7}, {data:budgetRows,error:e8}, {data:goalRows,error:e9},
      {data:assetRows,error:e10}, {data:publishingRows,error:e11}
    ] = await Promise.all([
      sb.from('content').select('*').order('created_at',{ascending:true}),
      sb.from('team').select('*').order('created_at',{ascending:true}),
      sb.from('activity').select('*').order('created_at',{ascending:false}).limit(200),
      sb.from('campaigns').select('*').order('created_at',{ascending:true}),
      sb.from('tasks').select('*').order('created_at',{ascending:true}),
      sb.from('revenue').select('*').order('created_at',{ascending:true}),
      sb.from('expenses').select('*').order('created_at',{ascending:true}),
      sb.from('budgets').select('*').order('created_at',{ascending:true}),
      sb.from('goals').select('*').order('created_at',{ascending:true}),
      sb.from('assets').select('*').order('created_at',{ascending:true}),
      sb.from('publishing').select('*').order('created_at',{ascending:true})
    ]);
    const err = e1||e2||e3||e4||e5||e6||e7||e8||e9||e10||e11;
    if(err){ console.error('Supabase load error', err); return; }
    if(teamRows && teamRows.length){
      TEAM.length=0; Object.keys(MEM).forEach(k=>delete MEM[k]);
      teamRows.forEach(r=>{ const t=hydrateTeamRow(r); TEAM.push(t); MEM[t.id]=t; });
      try{
        const {data:{session}} = await sb.auth.getSession();
        const email = session && session.user && session.user.email;
        const match = email && TEAM.find(t=>t.email && t.email.toLowerCase()===email.toLowerCase());
        if(match) Object.assign(ME, match);
      }catch(e){}
    }
    if(contentRows){
      CONTENT.length=0; Object.keys(CT).forEach(k=>delete CT[k]);
      contentRows.forEach(r=>{ const c=hydrateContentRow(r); CONTENT.push(c); CT[c.id]=c; });
      PUBLISHED.length=0; PUBLISHED.push(...CONTENT.filter(c=>c.isPublished));
    }
    if(activityRows){
      ACTIVITY.length=0;
      activityRows.forEach(r=>ACTIVITY.push({id:r.id,date:r.date,time:r.time,who:r.who,what:r.what,ref:r.ref,label:r.label,type:r.type}));
    }
    if(campaignRows){
      CAMPAIGNS.length=0; Object.keys(CMP).forEach(k=>delete CMP[k]);
      campaignRows.forEach(r=>{ const c=hydrateCampaignRow(r); CAMPAIGNS.push(c); CMP[c.id]=c; });
    }
    if(taskRows){ TASKS.length=0; taskRows.forEach(r=>TASKS.push(hydrateTaskRow(r))); }
    if(revenueRows){ REVENUE.length=0; revenueRows.forEach(r=>REVENUE.push(hydrateRevenueRow(r))); }
    if(expenseRows){ EXPENSES.length=0; expenseRows.forEach(r=>EXPENSES.push(hydrateExpenseRow(r))); }
    if(budgetRows){ BUDGETS.length=0; budgetRows.forEach(r=>BUDGETS.push(hydrateBudgetRow(r))); }
    if(goalRows){ GOALS.length=0; goalRows.forEach(r=>GOALS.push(hydrateGoalRow(r))); }
    if(assetRows){ ASSETS.length=0; assetRows.forEach(r=>ASSETS.push(hydrateAssetRow(r))); }
    if(publishingRows){ PUBLISHING.length=0; publishingRows.forEach(r=>PUBLISHING.push(hydratePublishingRow(r))); }
    recomputeSeries();
  }catch(err){ console.error('Supabase load failed', err); }
}
function logActivity(entry){
  ACTIVITY.unshift(entry);
  if(sb) sb.from('activity').insert(entry).then(({error})=>{ if(error) console.error('activity insert failed',error); });
}
function persistContent(c){
  if(!sb) return;
  sb.from('content').upsert({id:c.id,title:c.title,type:c.type,category:c.category,platform:c.platform,
    campaign:c.campaign,status:c.status,owner:c.owner,editor:c.editor,priority:c.priority,deadline:c.deadline||null,
    est_cost:c.estCost,cost:c.cost,views:c.views,er:c.er,followers:c.followers,revenue:c.revenue,
    published:c.published||null,watch:c.watch,completion:c.completion}).then(({error})=>{ if(error) console.error('content save failed',error); });
}
function persistTeam(t){
  if(!sb) return;
  sb.from('team').upsert({id:t.id,name:t.name,role:t.role,dept:t.dept,color:t.color,capacity:t.capacity,
    allocated:t.allocated,joined:t.joined||null,email:t.email,access:t.access,status:t.status,last_active:t.lastActive,
    restricted_nav:t.restrictedNav||[], nickname:t.nickname||null})
    .then(({error})=>{ if(error) console.error('team save failed',error); });
}
function persistCampaign(c){
  if(!sb) return;
  sb.from('campaigns').upsert({id:c.id,name:c.name,objective:c.objective,start:c.start||null,end:c.end||null,
    budget:c.budget,spent:c.spent,revenue:c.revenue,status:c.status,team:c.team,platforms:c.platforms})
    .then(({error})=>{ if(error) console.error('campaign save failed',error); });
}
function persistTask(t){
  if(!sb) return;
  sb.from('tasks').upsert({id:t.id,title:t.title,content:t.content||null,assignee:t.assignee,due:t.due||null,
    status:t.status,priority:t.priority,dept:t.dept,hours:t.hours})
    .then(({error})=>{ if(error) console.error('task save failed',error); });
}
function persistRevenue(r){
  if(!sb) return;
  sb.from('revenue').upsert({id:r.id,date:r.date||null,source:r.source,client:r.client,campaign:r.campaign||null,
    content:r.content||null,platform:r.platform,amount:r.amount,status:r.status,invoice:r.invoice})
    .then(({error})=>{ if(error) console.error('revenue save failed',error); });
}
function persistExpense(e){
  if(!sb) return;
  sb.from('expenses').upsert({id:e.id,date:e.date||null,category:e.category,vendor:e.vendor,description:e.description,
    amount:e.amount,method:e.method,dept:e.dept,campaign:e.campaign||null,content:e.content||null,
    recurrence:e.recurrence,approval:e.approval})
    .then(({error})=>{ if(error) console.error('expense save failed',error); });
}
function persistBudget(b){
  if(!sb) return;
  sb.from('budgets').upsert({id:b.id,name:b.name,type:b.type,period:b.period,budget:b.budget,actual:b.actual,dept:b.dept})
    .then(({error})=>{ if(error) console.error('budget save failed',error); });
}
function persistGoal(g){
  if(!sb) return;
  sb.from('goals').upsert({id:g.id,name:g.name,owner:g.owner,target:g.target,actual:g.actual,fmt:g.fmt,inverse:g.inverse})
    .then(({error})=>{ if(error) console.error('goal save failed',error); });
}
function persistAsset(a){
  if(!sb) return;
  sb.from('assets').upsert({id:a.id,name:a.name,type:a.type,content:a.content||null,campaign:a.campaign||null,
    creator:a.creator,date:a.date||null,version:a.version,status:a.status,tags:a.tags})
    .then(({error})=>{ if(error) console.error('asset save failed',error); });
}
function persistPublishing(p){
  if(!sb) return;
  sb.from('publishing').upsert({id:p.id,content:p.content||null,platform:p.platform,account:p.account,
    date:p.date||null,time:p.time,status:p.status,url:p.url,hashtags:p.hashtags})
    .then(({error})=>{ if(error) console.error('publishing save failed',error); });
}
function syncPublishingForContent(c){
  let p=PUBLISHING.find(x=>x.content===c.id);
  if(!p){ p={id:'PUB-'+c.id,content:c.id,platform:c.platform,account:'',date:c.published||iso(TODAY),
    time:'',status:'Published',url:'',hashtags:''}; PUBLISHING.push(p); }
  else { p.status='Published'; p.date=c.published||p.date; }
  persistPublishing(p);
}

/* ============================================================
   3c. DELETE — owner-only, everywhere
   ============================================================ */
function canDelete(){ return ME.access==='owner'; }
function removeById(arr,id){ const i=arr.findIndex(x=>x.id===id); if(i>-1) arr.splice(i,1); }
async function deleteRow(table,id){
  if(!sb) return true;
  const {error} = await sb.from(table).delete().eq('id',id);
  if(error){ console.error('delete failed',table,error); toast('Delete failed — '+error.message,'alert'); return false; }
  return true;
}
async function deleteContent(id){
  if(!canDelete()) return;
  const c=CT[id]; if(!c) return;
  if(!confirm('Delete "'+c.title+'" permanently? This cannot be undone.')) return;
  if(!await deleteRow('content',id)) return;
  removeById(CONTENT,id); delete CT[id]; removeById(PUBLISHED,id); removeById(PUBLISHING,id);
  logActivity({id:newId('LOG'),date:iso(TODAY),time:new Date().toTimeString().slice(0,5),who:ME.id,what:'deleted content',ref:id,label:c.title,type:'Content'});
  closeLayers(); go('planner'); toast('Deleted — '+c.title,'close');
}
async function deleteCampaign(id){
  if(!canDelete()) return;
  const c=CMP[id]; if(!c) return;
  if(!confirm('Delete campaign "'+c.name+'" permanently? Content and ledger entries pointing to it will stay, just unlinked.')) return;
  if(!await deleteRow('campaigns',id)) return;
  removeById(CAMPAIGNS,id); delete CMP[id];
  logActivity({id:newId('LOG'),date:iso(TODAY),time:new Date().toTimeString().slice(0,5),who:ME.id,what:'deleted campaign',ref:id,label:c.name,type:'Campaign'});
  closeLayers(); go('campaigns'); toast('Deleted — '+c.name,'close');
}
async function deleteTask(id){
  if(!canDelete()) return;
  const t=TASKS.find(x=>x.id===id); if(!t) return;
  if(!confirm('Delete task "'+t.title+'"?')) return;
  if(!await deleteRow('tasks',id)) return;
  removeById(TASKS,id);
  logActivity({id:newId('LOG'),date:iso(TODAY),time:new Date().toTimeString().slice(0,5),who:ME.id,what:'deleted task',ref:id,label:t.title,type:'Task'});
  render(); toast('Deleted — '+t.title,'close');
}
async function deleteRevenue(id){
  if(!canDelete()) return;
  const r=REVENUE.find(x=>x.id===id); if(!r) return;
  if(!confirm('Delete this revenue entry ('+F.peso(r.amount)+')?')) return;
  if(!await deleteRow('revenue',id)) return;
  removeById(REVENUE,id);
  logActivity({id:newId('LOG'),date:iso(TODAY),time:new Date().toTimeString().slice(0,5),who:ME.id,what:'deleted revenue entry',ref:id,label:r.client+' — '+F.peso(r.amount),type:'Revenue'});
  closeLayers(); render(); toast('Deleted revenue entry','close');
}
async function deleteExpense(id){
  if(!canDelete()) return;
  const e=EXPENSES.find(x=>x.id===id); if(!e) return;
  if(!confirm('Delete this expense ('+F.peso(e.amount)+')?')) return;
  if(!await deleteRow('expenses',id)) return;
  removeById(EXPENSES,id);
  logActivity({id:newId('LOG'),date:iso(TODAY),time:new Date().toTimeString().slice(0,5),who:ME.id,what:'deleted expense',ref:id,label:e.description,type:'Expense'});
  closeLayers(); render(); toast('Deleted expense','close');
}
async function deleteBudget(id){
  if(!canDelete()) return;
  const b=BUDGETS.find(x=>x.id===id); if(!b) return;
  if(!confirm('Delete budget "'+b.name+'"?')) return;
  if(!await deleteRow('budgets',id)) return;
  removeById(BUDGETS,id);
  logActivity({id:newId('LOG'),date:iso(TODAY),time:new Date().toTimeString().slice(0,5),who:ME.id,what:'deleted budget',ref:id,label:b.name,type:'Budget'});
  render(); toast('Deleted — '+b.name,'close');
}
async function deleteGoal(id){
  if(!canDelete()) return;
  const g=GOALS.find(x=>x.id===id); if(!g) return;
  if(!confirm('Delete target "'+g.name+'"?')) return;
  if(!await deleteRow('goals',id)) return;
  removeById(GOALS,id);
  logActivity({id:newId('LOG'),date:iso(TODAY),time:new Date().toTimeString().slice(0,5),who:ME.id,what:'deleted target',ref:id,label:g.name,type:'Goal'});
  render(); toast('Deleted — '+g.name,'close');
}
async function deleteAsset(id){
  if(!canDelete()) return;
  const a=ASSETS.find(x=>x.id===id); if(!a) return;
  if(!confirm('Delete asset "'+a.name+'"?')) return;
  if(!await deleteRow('assets',id)) return;
  removeById(ASSETS,id);
  logActivity({id:newId('LOG'),date:iso(TODAY),time:new Date().toTimeString().slice(0,5),who:ME.id,what:'deleted asset',ref:id,label:a.name,type:'Asset'});
  closeLayers(); go('library'); toast('Deleted — '+a.name,'close');
}
async function deletePublishing(id){
  if(!canDelete()) return;
  const p=PUBLISHING.find(x=>x.id===id); if(!p) return;
  if(!confirm('Delete this publishing record? This does not un-publish the content itself.')) return;
  if(!await deleteRow('publishing',id)) return;
  removeById(PUBLISHING,id);
  logActivity({id:newId('LOG'),date:iso(TODAY),time:new Date().toTimeString().slice(0,5),who:ME.id,what:'deleted publishing record',ref:id,label:p.content,type:'Publishing'});
  render(); toast('Deleted publishing record','close');
}
async function deleteMember(id){
  if(!canDelete()) return;
  const t=MEM[id]; if(!t) return;
  if(t.id===ME.id){ toast('You cannot delete your own account','lock'); return; }
  if(!confirm('Delete '+t.name+'’s account permanently? They will need a new invite to come back.')) return;
  if(!await deleteRow('team',id)) return;
  removeById(TEAM,id); delete MEM[id];
  logActivity({id:newId('LOG'),date:iso(TODAY),time:new Date().toTimeString().slice(0,5),who:ME.id,what:'deleted the account of',ref:id,label:t.name,type:'Access'});
  render(); toast('Deleted — '+t.name,'close');
}

/* ---- revenue ledger ---- */
const REVENUE = [].map((r,i)=>({id:'REV-'+String(i+1).padStart(3,'0'),date:r[0],source:r[1],client:r[2],campaign:r[3],content:r[4],
  platform:r[5],amount:r[6],status:r[7],invoice:r[8],month:r[0].slice(0,7)}));

/* ---- expense ledger ---- */
const EXPENSES = [].map((r,i)=>({id:'EXP-'+String(i+1).padStart(3,'0'),date:r[0],category:r[1],vendor:r[2],description:r[3],amount:r[4],
  method:r[5],dept:r[6],campaign:r[7],content:r[8],recurrence:r[9],approval:r[10],month:r[0].slice(0,7),
  direct:['Production','Freelancers','Transportation','Food'].includes(r[1])}));

/* ---- publishing schedule ---- */
const PUBLISHING = PUBLISHED.map(c=>({
  id:'PUB-'+c.id.slice(4), content:c.id, platform:c.platform, account:PLAT[c.platform].handle,
  date:c.published, time:['09:00','11:30','12:00','18:00','19:30','20:00'][c.id.charCodeAt(6)%6],
  status:'Published', url:'farmfresh.ph/'+c.id.toLowerCase(),
  hashtags:'#farmfreshph #lutongbahay #'+c.category.toLowerCase().replace(/\s+/g,'')
}));


/* ---- asset library ---- */
const ASSETS = [].map(r=>({id:r[0],name:r[1],type:r[2],content:r[3],campaign:r[4],creator:r[5],date:r[6],version:r[7],status:r[8],tags:r[9]}));

/* ---- budgets ---- */
const BUDGETS = [].map(r=>{const o={name:r[0],type:r[1],period:r[2],budget:r[3],actual:r[4],dept:r[5]};
  o.remaining=o.budget-o.actual; o.util=o.actual/o.budget*100; return o;});

/* ---- goals & KPIs ---- */
const GOALS = [].map(r=>{const o={name:r[0],owner:r[1],target:r[2],actual:r[3],fmt:r[4],inverse:r[5]};
  o.pct = o.inverse ? (o.target/o.actual*100) : (o.actual/o.target*100);
  o.variance = o.inverse ? o.target-o.actual : o.actual-o.target; return o;});

/* ---- activity / audit ---- */
const ACTIVITY = [].map((r,i)=>({id:'LOG-'+i,date:r[0],time:r[1],who:r[2],what:r[3],ref:r[4],label:r[5],type:r[6]}));

/* ---- notifications ---- */
const NOTIFS = [].map((r,i)=>({id:'NTF-'+i,kind:r[0],text:r[1],ref:r[2],tone:r[3],date:r[4],time:r[5],read:i>4}));

/* ---- configurable content performance score ---- */
const SCORE_WEIGHTS = {views:25,engagement:20,shares:10,watch:15,completion:10,followers:10,revenue:10};

/* ============================================================
   4. DERIVED BUSINESS METRICS
   ============================================================ */
const FIN = {openingCash:0, ap:0};
recomputeSeries();   /* fill the monthly figures once, before anything reads them */

function metrics(i){
  const g=(k,j=i)=>SERIES[k][j]||0, prev=i>0?i-1:0;
  const rev=g('revenue'), dir=g('direct'), op=g('opex'), exp=dir+op;
  const gross=rev-dir, net=gross-op;
  const pubCount=g('published');
  const cash = FIN.openingCash + sum(SERIES.cashIn.slice(0,i+1)) - sum(SERIES.cashOut.slice(0,i+1));
  const pRev=g('revenue',prev), pExp=g('direct',prev)+g('opex',prev), pNet=pRev-g('direct',prev)-g('opex',prev);
  const ar = sum(REVENUE.filter(r=>r.status==='Invoiced'||r.status==='Overdue'), r=>r.amount)
           + sum(REVENUE.filter(r=>r.status==='Partially paid'), r=>r.amount*0.5);
  const d=(a,b)=> b? (a-b)/b*100 : 0;
  return {
    i, month:MONTHS[i], revenue:rev, direct:dir, opex:op, expenses:exp, gross, net,
    grossMargin: rev? gross/rev*100:0, netMargin: rev? net/rev*100:0,
    published:pubCount, views:g('views'), engage:g('engage'), followers:g('followers'),
    cash, ar, ap:FIN.ap,
    costPerContent: pubCount? dir/pubCount:0,
    revPerContent: pubCount? rev/pubCount:0,
    profitPerContent: pubCount? gross/pubCount:0,
    roi: dir? (rev-dir)/dir*100:0,
    dRevenue:d(rev,pRev), dExpenses:d(exp,pExp), dNet:d(net,pNet),
    dViews:d(g('views'),g('views',prev)), dEngage:d(g('engage'),g('engage',prev)),
    dFollowers:d(g('followers'),g('followers',prev)), dPublished:d(pubCount,g('published',prev)),
    dCost:d(pubCount?dir/pubCount:0, g('published',prev)? g('direct',prev)/g('published',prev):0)
  };
}
const YTD = () => {
  const upto = S.month+1;                      /* January through the selected month */
  const cut = a => a.slice(0, upto);
  const rev=sum(cut(SERIES.revenue)), dir=sum(cut(SERIES.direct)), op=sum(cut(SERIES.opex));
  return {revenue:rev,direct:dir,opex:op,expenses:dir+op,gross:rev-dir,net:rev-dir-op,
    grossMargin: rev?(rev-dir)/rev*100:0, netMargin: rev?(rev-dir-op)/rev*100:0,
    published:sum(cut(SERIES.published)), views:sum(cut(SERIES.views)), followers:sum(cut(SERIES.followers))};
};

/* pipeline, bottlenecks, workload */
const pipeline = () => STAGES.map(s=>({stage:s, items:CONTENT.filter(c=>c.status===s)}));
const inProduction = () => CONTENT.filter(c=>!['Published','Idea','Planned'].includes(c.status));
const overdueContent = () => CONTENT.filter(c=>!c.isPublished && daysFrom(c.deadline)<0);
const openTasks = () => TASKS.filter(t=>t.status!=='Done');
const overdueTasks = () => TASKS.filter(t=>t.overdue);
const teamLoad = () => Math.round(sum(TEAM,t=>t.allocated)/sum(TEAM,t=>t.capacity)*100);
const loadBand = p => p>=100?{t:'Overloaded',tone:'neg'}:p>=75?{t:'Balanced',tone:'pos'}:{t:'Underutilised',tone:'warn'};

function byPlatform(){
  return PLATFORMS.map(p=>{
    const items=PUBLISHED.filter(c=>c.platform===p.id);
    const rev=sum(items,c=>c.revenue), cost=sum(items,c=>c.cost);
    return {...p, count:items.length, views:sum(items,c=>c.views), engagements:sum(items,c=>c.engagements),
      followers:sum(items,c=>c.followers), revenue:rev, cost, profit:rev-cost,
      roi: cost? (rev-cost)/cost*100:0, er: sum(items,c=>c.views)? sum(items,c=>c.engagements)/sum(items,c=>c.views)*100:0};
  }).sort((a,b)=>b.revenue-a.revenue);
}
function groupStats(key){
  const g=by(PUBLISHED,key);
  return Object.keys(g).map(k=>{
    const items=g[k], rev=sum(items,c=>c.revenue), cost=sum(items,c=>c.cost);
    return {key:k, count:items.length, views:sum(items,c=>c.views), revenue:rev, cost, profit:rev-cost,
      roi:cost?(rev-cost)/cost*100:0, er: sum(items,c=>c.views)? sum(items,c=>c.engagements)/sum(items,c=>c.views)*100:0};
  }).sort((a,b)=>b.revenue-a.revenue);
}
/* configurable performance score */
function score(c){
  const mx = {views:Math.max(...PUBLISHED.map(x=>x.views)), engagement:Math.max(...PUBLISHED.map(x=>x.er)),
    shares:Math.max(...PUBLISHED.map(x=>x.engagements)), watch:Math.max(...PUBLISHED.map(x=>x.watch)),
    completion:100, followers:Math.max(...PUBLISHED.map(x=>x.followers)), revenue:Math.max(...PUBLISHED.map(x=>x.revenue))};
  const v = {views:c.views, engagement:c.er, shares:c.engagements, watch:c.watch,
    completion:c.completion, followers:c.followers, revenue:c.revenue};
  const tot = sum(Object.values(SCORE_WEIGHTS));
  return Math.round(Object.keys(SCORE_WEIGHTS).reduce((t,k)=> t + (mx[k]? v[k]/mx[k]:0)*SCORE_WEIGHTS[k], 0)/tot*100);
}
const scoreBand = s => s>=70?{t:'Excellent',tone:'pos'}:s>=45?{t:'Solid',tone:'info'}:s>=25?{t:'Average',tone:'warn'}:{t:'Under target',tone:'neg'};

/* business health */
function health(){
  if(!CONTENT.length && !REVENUE.length && !EXPENSES.length && !TASKS.length && !BUDGETS.length)
    return {checks:[], state:'No data yet', tone:'neutral', pct:null};
  const m=metrics(S.month);
  const mk=(name,pending,ok,warn,value,hint)=>({name,pending,ok:!pending&&ok,warn:!pending&&warn,
    value: pending?'not yet':value, hint});
  const checks=[
    mk('Net margin', m.revenue===0, m.netMargin>=30, m.netMargin>=18, F.pct(m.netMargin), 'Target is 30% or better'),
    mk('Cash runway', m.expenses===0, m.cash>m.expenses*4, m.cash>m.expenses*2, (m.cash/m.expenses).toFixed(1)+' months', 'Cash divided by monthly spend'),
    mk('Cost per video', m.published===0, m.costPerContent<=7500, m.costPerContent<=9000, F.peso(m.costPerContent), 'Ceiling is ₱7,500'),
    mk('On-time delivery', TASKS.length===0, overdueTasks().length<=2, overdueTasks().length<=5, overdueTasks().length+' overdue', 'Tasks past their due date'),
    mk('Budget discipline', BUDGETS.length===0, BUDGETS.every(b=>b.util<90), BUDGETS.filter(b=>b.util>=95).length<=1, BUDGETS.filter(b=>b.util>=90).length+' near limit', 'Budgets above 90% used'),
    mk('Receivables', m.revenue===0, m.ar<m.revenue*0.4, m.ar<m.revenue*0.7, F.pesoK(m.ar), 'Unpaid invoices outstanding')
  ];
  const scored=checks.filter(c=>!c.pending);
  const bad=scored.filter(c=>!c.ok && !c.warn).length, mid=scored.filter(c=>!c.ok && c.warn).length;
  const state = !scored.length ? 'No data yet' : bad? 'Critical' : mid>=2 ? 'Needs attention' : 'Healthy';
  return {checks, state,
    tone: state==='Healthy'?'pos':state==='Critical'?'neg':state==='No data yet'?'neutral':'warn',
    pct: scored.length? Math.round(scored.filter(c=>c.ok).length/scored.length*100) : null};
}

/* the written executive summary — storytelling, not just numbers */
function insights(){
  if(!CONTENT.length) return [
    {tone:'info', text:`Nothing is in the system yet. Start in <b>Content planner</b> — create the first video and it will pick up an ID that every cost, task and peso of income attaches to from then on.`},
    {tone:'info', text:`Next, add the people you work with in <b>Team</b>, and the platforms you post to in <b>Settings</b>.`},
    {tone:'warn', text:`Then set a <b>Budget</b> before you spend. It is much easier to stay inside a limit than to explain going past one.`},
    {tone:'info', text:`Once the first video is published, record what it cost and what it earned. That single pair is what makes every other number on this screen possible.`}
  ];
  const m=metrics(S.month), pl=byPlatform(), types=groupStats('type');
  const topViews=[...pl].sort((a,b)=>b.views-a.views)[0];
  const topEng=[...pl].sort((a,b)=>b.er-a.er)[0];
  const topCmp=[...CAMPAIGNS].filter(c=>c.spent>0).sort((a,b)=>(b.revenue-b.spent)/b.spent-(a.revenue-a.spent)/a.spent)[0];
  const bestType=[...types].sort((a,b)=>b.roi-a.roi)[0];
  const bottleneck=[...pipeline()].sort((a,b)=>b.items.length-a.items.length)[0];
  const tightBudget=[...BUDGETS].sort((a,b)=>b.util-a.util)[0];
  const od=overdueTasks().length;
  const costFaster = m.dCost > m.dRevenue;
  const out=[];
  const push=(tone,text)=>out.push({tone,text});

  if(m.revenue || m.expenses){
    push(m.dRevenue>=0?'pos':'neg',
      `Revenue is ${m.dRevenue>=0?'up':'down'} <b>${F.sign(m.dRevenue)}</b> against last month, at ${F.peso(m.revenue)}.`);
    push(costFaster?'warn':'pos', costFaster
      ? `Production cost per video rose <b>${F.sign(m.dCost)}</b> while revenue moved ${F.sign(m.dRevenue)} — costs are outrunning income.`
      : `Cost per video moved <b>${F.sign(m.dCost)}</b>, slower than revenue growth. Margin is holding.`);
  }
  if(topViews && topEng)
    push('info', `<b>${esc(topViews.name)}</b> drove the most views this period; <b>${esc(topEng.name)}</b> holds the highest engagement rate at ${F.pct(topEng.er)}.`);
  if(topCmp && topCmp.spent>0)
    push('info', `<b>${esc(topCmp.name)}</b> is the strongest campaign at ${F.pct((topCmp.revenue-topCmp.spent)/topCmp.spent*100,0)} return on spend.`);
  if(bestType)
    push('info', `<b>${esc(bestType.key)}</b> currently returns the most per peso spent (${F.pct(bestType.roi,0)} ROI).`);
  if(bottleneck && bottleneck.items.length)
    push(bottleneck.items.length>3?'warn':'info',
      `<b>${bottleneck.stage}</b> holds ${bottleneck.items.length} piece${bottleneck.items.length===1?'':'s'} — the deepest queue in the pipeline.`);
  if(TASKS.length){
    const next=TASKS.filter(t=>t.status!=='Done')[0];
    push(od?'neg':'pos', od
      ? `<b>${od} task${od===1?' is':'s are'}</b> past the due date, ${overdueContent().length} of them tied to content with a deadline.`
      : (next ? `Nothing is overdue. The team is clear through ${F.date(next.due)}.` : 'Every task on the board is done.'));
  }
  if(tightBudget)
    push(tightBudget.util>90?'warn':'info',
      `<b>${esc(tightBudget.name)}</b> has used ${F.pct(tightBudget.util)} of its budget.`);

  if(!out.length) push('info',
    `${CONTENT.length} piece${CONTENT.length===1?' is':'s are'} in the pipeline. Once something is published and its costs are logged, this panel starts reading the numbers back to you.`);
  return out;
}

/* ============================================================
   5. CHART ENGINE
   HTML for anything with text (crisp at any width),
   SVG only for the curves.
   ============================================================ */
/* chart styles now live in styles.css */

const Chart = {
  line(o){
    const {labels, height=180, fmt=F.numK, area=true, yTicks=4} = o;
    const series = o.series.map(x=>({...x, values:(x.values||[]).map(v=>isFinite(v)?v:0)}));
    const all = series.flatMap(s=>s.values);
    if(!all.length) return `<div class="chart" style="height:${height}px"></div>`;
    let max = Math.max(...all), min = o.min!=null?o.min:Math.min(0,...all);
    max = max===min ? max+1 : max;
    const pad = (max-min)*0.12; max += pad;
    const n = labels.length, W=1000, H=height;
    const X = i => n<2?W/2:(i/(n-1))*W;
    const Y = v => H - ((v-min)/(max-min))*H;
    const px = v => H - ((v-min)/(max-min))*H;
    let svg='';
    for(let t=0;t<=yTicks;t++){ const y=(t/yTicks)*H;
      svg+=`<line x1="0" y1="${y}" x2="${W}" y2="${y}" stroke="var(--grid-line)" stroke-width="1" vector-effect="non-scaling-stroke"/>`; }
    series.forEach((s,si)=>{
      const pts = s.values.map((v,i)=>[X(i),Y(v)]);
      const d = pts.map((p,i)=>(i?'L':'M')+p[0].toFixed(1)+' '+p[1].toFixed(1)).join(' ');
      if(area && s.area!==false){
        svg+=`<path d="${d} L ${W} ${H} L 0 ${H} Z" fill="${s.fill||'var(--chart-fill)'}" opacity="${si?0.5:1}"/>`;
      }
      svg+=`<path d="${d}" fill="none" stroke="${s.color}" stroke-width="${s.width||2}" ${s.dash?'stroke-dasharray="4 3"':''}
        stroke-linejoin="round" stroke-linecap="round" vector-effect="non-scaling-stroke"/>`;
    });
    let dots='';
    series.forEach(s=>s.values.forEach((v,i)=>{
      dots+=`<i class="lc-dot" style="left:${n<2?50:(i/(n-1))*100}%;top:${px(v).toFixed(1)}px;background:${s.color}"></i>`;
    }));
    let bands='';
    labels.forEach((l,i)=>{
      const tip = `<b>${esc(l)}</b><br>` + series.map(s=>`${esc(s.name)}: ${fmt(s.values[i])}`).join('<br>');
      bands+=`<div class="lc-band" data-tip="${esc(tip)}" data-tip-html="1"></div>`;
    });
    let ys='';
    for(let t=0;t<=yTicks;t++){ const v=max-(t/yTicks)*(max-min); ys+=`<span style="top:${(t/yTicks)*H}px">${fmt(v)}</span>`; }
    return `<div class="chart lc lc-pad">
      <div class="lc-plot" style="height:${H}px">
        <svg class="lc-svg" viewBox="0 0 ${W} ${H}" preserveAspectRatio="none">${svg}</svg>
        <div class="lc-y">${ys}</div>
        <div class="lc-bands">${bands}</div>
        ${dots}
      </div>
      <div class="lc-x">${labels.map(l=>`<span>${esc(l)}</span>`).join('')}</div>
    </div>`;
  },
  cols(o){
    o = {...o, series:(o.series||[]).map(x=>({...x, values:(x.values||[]).map(v=>isFinite(v)?v:0)}))};
    const {labels, series, height=170, fmt=F.pesoK, mode='group', yTicks=4} = o;
    const totals = labels.map((_,i)=> mode==='stack' ? sum(series,s=>s.values[i]) : Math.max(...series.map(s=>s.values[i])));
    let max=Math.max(...totals,1); max*=1.1;
    let ys=''; for(let t=0;t<=yTicks;t++){ const v=max-(t/yTicks)*max; ys+=`<span style="top:${(t/yTicks)*height}px">${fmt(v)}</span>`; }
    let grid=''; for(let t=0;t<=yTicks;t++) grid+=`<div style="position:absolute;left:0;right:0;top:${(t/yTicks)*height}px;border-top:1px solid var(--grid-line)"></div>`;
    const body = labels.map((l,i)=>{
      const tip=`<b>${esc(l)}</b><br>`+series.map(s=>`${esc(s.name)}: ${fmt(s.values[i])}`).join('<br>');
      let inner;
      if(mode==='stack'){
        inner = `<div class="col-stack">`+series.map(s=>`<div class="col-b" style="height:${(s.values[i]/max*100).toFixed(2)}%;background:${s.color};border-radius:0"></div>`).join('')+`</div>`;
      } else {
        inner = series.map(s=>`<div class="col-b" style="height:${(s.values[i]/max*100).toFixed(2)}%;background:${s.color}"></div>`).join('');
      }
      return `<div class="col-g" data-tip="${esc(tip)}" data-tip-html="1">${inner}</div>`;
    }).join('');
    return `<div class="chart lc-pad">
      <div style="position:relative;height:${height}px">
        ${grid}
        <div class="cols" style="height:${height}px;position:relative">${body}</div>
        <div class="lc-y">${ys}</div>
      </div>
      <div class="lc-x">${labels.map(l=>`<span>${esc(l)}</span>`).join('')}</div>
    </div>`;
  },
  hbars(o){
    o = {...o, rows:(o.rows||[]).map(r=>({...r, value:isFinite(r.value)?r.value:0}))};
    const {rows, fmt=F.pesoK, color='var(--ink)', max:mx} = o;
    const max = mx || Math.max(...rows.map(r=>r.value),1);
    return `<div>`+rows.map(r=>`
      <div class="hb" ${r.tip?`data-tip="${esc(r.tip)}" data-tip-html="1"`:''}>
        <div class="truncate muted">${esc(r.label)}</div>
        <div class="hb-t"><div class="hb-f" style="width:${(r.value/max*100).toFixed(1)}%;background:${r.color||color}"></div></div>
        <div class="hb-v">${fmt(r.value)}</div>
      </div>`).join('')+`</div>`;
  },
  donut(o){
    o = {...o, slices:(o.slices||[]).map(x=>({...x, value:isFinite(x.value)?x.value:0}))};
    const {slices, size=132, thickness=15, center='', sub=''} = o;
    const total = sum(slices,s=>s.value)||1, r=(100-thickness)/2, c=2*Math.PI*r;
    let off=0;
    const segs = slices.map(s=>{
      const frac=s.value/total, len=frac*c;
      const el=`<circle cx="50" cy="50" r="${r}" fill="none" stroke="${s.color}" stroke-width="${thickness}"
        stroke-dasharray="${len.toFixed(2)} ${(c-len).toFixed(2)}" stroke-dashoffset="${(-off).toFixed(2)}"
        transform="rotate(-90 50 50)"><title>${esc(s.label)}</title></circle>`;
      off+=len; return el;
    }).join('');
    return `<div class="donut" style="width:${size}px;height:${size}px">
      <svg viewBox="0 0 100 100" style="width:100%;height:100%">${segs}</svg>
      <div class="donut-c"><div><div class="w6 num tight" style="font-size:17px">${center}</div>
      <div class="t-xs dim">${esc(sub)}</div></div></div></div>`;
  },
  spark(values,color,h=30,fill=true){
    const vals=(values&&values.length?values:[0]).map(v=>isFinite(v)?v:0);
    const max=Math.max(...vals), min=Math.min(...vals), W=100, rng=(max-min)||1;
    const y=v=>(h-((v-min)/rng)*h*0.88-2).toFixed(1);
    const d = vals.length<2
      ? `M0 ${y(vals[0])} L ${W} ${y(vals[0])}`
      : vals.map((v,i)=>(i?'L':'M')+(i/(vals.length-1)*W).toFixed(1)+' '+y(v)).join(' ');
    return `<div class="chart kpi-spark" style="height:${h}px"><svg viewBox="0 0 ${W} ${h}" preserveAspectRatio="none" style="width:100%;height:${h}px">
      ${fill?`<path d="${d} L ${W} ${h} L 0 ${h} Z" fill="${color}" opacity=".10"/>`:''}
      <path d="${d}" fill="none" stroke="${color}" stroke-width="1.6" vector-effect="non-scaling-stroke" stroke-linejoin="round"/>
    </svg></div>`;
  },
  ring(pct,size=36,color='var(--pos)'){
    pct = isFinite(pct) ? pct : 0;
    const r=15.5, c=2*Math.PI*r, len=clamp(pct,0,100)/100*c;
    return `<svg class="health-ring" viewBox="0 0 36 36" style="width:${size}px;height:${size}px">
      <circle cx="18" cy="18" r="${r}" fill="none" stroke="var(--surface-3)" stroke-width="3.5"/>
      <circle cx="18" cy="18" r="${r}" fill="none" stroke="${color}" stroke-width="3.5" stroke-linecap="round"
        stroke-dasharray="${len.toFixed(1)} ${c.toFixed(1)}" transform="rotate(-90 18 18)"/></svg>`;
  }
};

/* ============================================================
   6. UI COMPONENTS
   ============================================================ */
/* ------------------------------------------------------------
   Brand artwork. Drawn as vectors so it stays crisp at any size
   and inherits the theme, light or dark.
   ------------------------------------------------------------ */
const MARK_D = 'M143.55 99.82 L111.51 99.76 L92.46 65.29 L91.44 63.76 L84.35 66.65 L75.78 70.67 L67.13 75.35 L58.86 80.39 L53.53 83.98 L46.80 88.95 L40.84 93.65 L36.11 97.79 L34.07 99.77 L1.75 99.88 L0.18 99.85 L0.05 99.63 L13.81 75.41 L17.03 70.04 L43.30 24.22 L56.72 0.28 L57.09 0.11 L58.66 0.05 L85.82 0.05 L86.98 0.18 L106.27 34.07 L114.50 48.16 L116.99 52.58 L116.97 52.85 L112.25 52.58 L103.22 52.54 L93.37 53.22 L86.92 54.08 L70.55 24.59 L70.26 24.44 L59.07 44.57 L50.46 60.73 L49.32 62.52 L46.24 68.42 L42.45 75.18 L29.10 84.51 L25.05 87.53 L19.15 92.40 L31.61 83.43 L38.67 78.73 L44.61 75.14 L54.21 69.89 L60.45 66.85 L71.36 62.23 L77.44 60.07 L84.81 57.80 L91.80 56.19 L98.43 55.19 L102.67 54.87 L109.21 54.55 L114.00 54.71 L118.14 55.02 L119.15 56.18 L143.00 98.18 L143.74 99.54 L143.55 99.82 Z';
const WORD_D = 'M384.00 98.00 L368.00 97.83 L367.00 97.50 L363.00 92.67 L343.73 66.00 L342.00 65.24 L317.00 65.67 L316.50 66.67 L316.42 97.67 L315.33 98.06 L311.00 98.10 L297.33 98.05 L296.30 97.67 L296.13 10.00 L296.23 4.00 L296.67 3.06 L304.00 2.69 L341.67 2.74 L357.67 3.20 L363.67 4.68 L368.67 6.86 L373.13 10.00 L377.59 14.33 L380.67 18.86 L383.46 26.33 L384.27 34.00 L383.49 40.67 L381.38 46.67 L376.67 53.82 L371.33 58.47 L367.69 60.67 L365.05 61.67 L364.71 62.33 L390.58 97.33 L390.00 97.94 L384.00 98.00 Z M800.67 98.01 L784.00 98.04 L782.78 97.33 L782.67 49.67 L782.00 48.73 L780.34 50.00 L750.00 83.18 L749.08 82.67 L728.00 59.77 L718.67 49.00 L717.67 48.66 L717.28 49.67 L717.40 97.33 L716.00 98.03 L699.67 98.04 L698.67 97.71 L698.67 0.21 L700.17 0.00 L701.70 1.33 L743.00 49.44 L749.12 56.33 L750.00 56.77 L754.43 52.33 L797.00 2.90 L799.67 0.08 L801.00 0.12 L801.44 10.33 L801.64 94.33 L801.56 97.33 L800.67 98.01 Z M589.67 99.35 L581.00 99.47 L573.33 98.79 L565.00 96.67 L559.33 94.48 L554.05 91.67 L550.29 88.67 L543.89 79.67 L540.95 72.67 L539.32 61.33 L539.29 8.00 L539.41 3.67 L540.00 2.85 L557.00 2.74 L558.25 3.33 L558.47 60.00 L559.03 65.67 L559.89 69.33 L563.00 75.25 L565.19 77.67 L568.00 79.77 L574.47 82.67 L578.33 83.60 L584.33 84.08 L592.67 83.48 L596.33 82.48 L600.67 80.55 L603.67 78.42 L606.65 75.33 L608.62 72.33 L609.84 69.33 L610.78 65.67 L611.26 60.00 L611.67 3.05 L612.67 2.62 L624.00 2.64 L629.33 2.83 L630.13 3.33 L630.45 9.33 L630.30 52.67 L629.68 66.67 L627.61 75.67 L624.67 81.65 L622.33 84.99 L618.97 88.67 L613.71 92.67 L607.67 95.69 L602.67 97.45 L597.67 98.51 L589.67 99.35 Z M109.00 98.05 L89.67 97.97 L88.19 97.33 L60.88 47.33 L55.63 38.00 L54.67 37.35 L54.00 37.78 L25.67 89.66 L21.00 97.37 L20.00 97.91 L13.00 98.10 L0.33 97.56 L0.33 96.87 L4.00 89.96 L54.33 0.36 L55.00 0.27 L55.67 0.84 L98.00 76.38 L101.54 82.00 L109.70 97.00 L109.67 97.67 L109.00 98.05 Z M192.67 98.00 L185.67 98.00 L184.79 97.00 L184.72 19.00 L183.33 18.49 L154.17 18.33 L153.60 16.67 L153.69 3.33 L154.67 2.75 L163.67 2.59 L235.67 2.82 L236.09 3.67 L236.03 17.00 L235.40 18.33 L206.00 18.35 L204.71 19.00 L204.94 97.00 L204.00 97.95 L192.67 98.00 Z M475.67 97.80 L458.00 97.91 L456.93 97.33 L456.83 4.00 L457.67 2.84 L475.00 2.62 L475.86 3.00 L476.14 3.67 L476.23 90.67 L476.18 97.00 L475.67 97.80 Z M349.55 49.67 L353.33 48.86 L357.90 46.67 L361.33 43.47 L363.10 40.00 L364.01 35.67 L363.58 29.00 L361.87 25.00 L359.30 22.00 L355.33 19.56 L352.33 18.59 L348.33 18.05 L317.67 17.99 L316.67 18.38 L316.28 19.33 L316.29 30.33 L316.64 48.33 L317.00 49.56 L349.55 49.67 Z';
const LOGO = {
  /* Traced from the studio's own artwork, so the shapes are the real ones,
     not a font approximation. One path each, evenodd so counters stay open. */
  mark: (h=26, tone='var(--ink)') =>
    `<svg viewBox="0 0 143.9 100" height="${h}" width="${(h*1.4392).toFixed(1)}" `
    + `fill="${tone}" fill-rule="evenodd" role="img" aria-label="Atrium">`
    + `<path d="${MARK_D}"/></svg>`,

  /* the mark set in a rounded tile, the way an app icon sits */
  tile: (size=28, box='var(--ink)', ink='var(--surface)', r=27) =>
    `<svg viewBox="0 0 100 100" width="${size}" height="${size}" role="img" aria-label="Atrium">`
    + `<rect width="100" height="100" rx="${r}" ry="${r}" fill="${box}"/>`
    + `<g transform="translate(19.00 28.46) scale(0.43085)" fill="${ink}" fill-rule="evenodd">`
    + `<path d="${MARK_D}"/></g></svg>`,

  word: (h=13, tone='var(--ink)') =>
    `<svg viewBox="0 0 802.0 100" height="${h}" width="${(h*8.0200).toFixed(1)}" `
    + `fill="${tone}" fill-rule="evenodd" role="img" aria-label="ATRIUM">`
    + `<path d="${WORD_D}"/></svg>`
};

/* the studio's own registered details — editable at runtime from Settings > Company profile */
const CO = {
  name:    'Atrium',
  address: ''
};
function paintUser(){
  const el=$('#userChip'); if(!el) return;
  if(!ME.id){ el.innerHTML=''; el.style.display='none'; return; }
  el.style.display='';
  el.innerHTML = `<span class="av" style="background:${ME.color}">${esc(ME.initials)}</span>
    <span class="user-meta truncate" style="text-align:left">
      <span class="truncate" style="display:block;font-size:12.5px;font-weight:560">${esc(ME.name)}</span>
      <span class="truncate" style="display:block;font-size:11px;color:var(--ink-3)">${esc(ME.role)}</span>
    </span>`;
}
function paintBrand(){
  const m=$('#brandMark'); if(m) m.innerHTML = LOGO.mark(26);
  const w=$('#brandWord'); if(w) w.innerHTML = LOGO.word(14);
}
function syncBrand(){
  /* the rail shows the logo only — the registered name lives on Company profile,
     in Settings and on anything printed */
  const a=$('#coPrevAddr'); if(a) a.textContent = CO.address || 'No registered address on file yet';
}

const S = {
  view:'dashboard', month:new Date().getMonth(), theme:'light', collapsed:false, navOpen:false,
  guide:true, sort:{}, filters:{}, tab:{}, widgets:{summary:1,money:1,charts:1,pipeline:1,platforms:1,team:1,activity:1,alerts:1},
  weights:{...SCORE_WEIGHTS}, search:''
};

const UI = {
  av(id,cls=''){ const m=MEM[id]; if(!m) return `<span class="av ${cls}" style="background:var(--ink-4)">?</span>`;
    return `<span class="av ${cls}" style="background:${m.color}" data-tip="${esc(m.name)} · ${esc(m.role)}">${m.initials}</span>`; },
  avStack(ids){ return `<span class="av-stack">${ids.slice(0,4).map(i=>UI.av(i,'sm')).join('')}
    ${ids.length>4?`<span class="av sm" style="background:var(--surface-3);color:var(--ink-2)">+${ids.length-4}</span>`:''}</span>`; },
  person(id,sub){ const m=MEM[id]; if(!m) return '<span class="dim">Unassigned</span>';
    return `<span class="row" style="gap:7px"><span class="av sm" style="background:${m.color}">${m.initials}</span>
      <span class="truncate">${esc(m.name)}${sub?`<span class="cell-sub">${esc(m.role)}</span>`:''}</span></span>`; },
  badge(t,tone='neutral',dot){ return `<span class="badge ${tone}">${dot?`<i class="dot ${tone}"></i>`:''}${esc(t)}</span>`; },
  stage(s){ return UI.badge(s, STAGE_TONE[s]||'neutral', true); },
  prio(p){ const tone={Critical:'neg',High:'warn',Medium:'neutral',Low:'ghost'}[p]||'neutral';
    return `<span class="badge ${tone}">${p}</span>`; },
  delta(v,{invert=false,suffix='%',label=''}={}){
    if(!isFinite(v)) return '';
    const good = invert? v<0 : v>0;
    const cls = Math.abs(v)<0.05?'flat':(good?'up':'down');
    const ar = Math.abs(v)<0.05?'':(v>0?icon('arrUp',10):icon('arrDn',10));
    return `<span class="delta ${cls}">${ar}${(v>0?'+':'')+v.toFixed(1)}${suffix}${label?' '+label:''}</span>`; },
  kpi(o){
    return `<div class="kpi ${o.open?'clickable':''}" ${o.open?`data-open="${o.open}"`:''}>
      <div class="kpi-label">${esc(o.label)}${o.tip?`<span data-tip="${esc(o.tip)}" style="display:inline-flex;color:var(--ink-4)">${icon('briefing',12)}</span>`:''}</div>
      <div class="kpi-val ${o.small?'sm':''}">${o.value}</div>
      <div class="kpi-foot">${o.delta!=null?UI.delta(o.delta,o.deltaOpts||{}):''}${o.sub?`<span class="t-xs dim truncate">${o.sub}</span>`:''}</div>
      ${o.spark||''}</div>`;
  },
  card(o){
    return `<section class="card ${o.cls||''}">
      ${o.title?`<header class="card-head">
        <div><div class="card-title">${esc(o.title)}</div>${o.note?`<div class="card-note">${o.note}</div>`:''}</div>
        ${o.actions?`<div class="card-actions">${o.actions}</div>`:''}</header>`:''}
      <div class="card-body ${o.flush?'flush':''}" ${o.pad?`style="padding:${o.pad}"`:''}>${o.body}</div>
      ${o.foot?`<footer class="card-foot">${o.foot}</footer>`:''}</section>`;
  },
  meter(pct,tone,mark){
    pct = isFinite(pct) ? pct : 0;
    const p=clamp(pct,0,100);
    return `<div class="meter">${mark!=null?`<i class="meter-mark" style="left:${clamp(mark,0,100)}%"></i>`:''}<i class="${tone||''}" style="width:${p}%"></i></div>`;
  },
  table(o){
    const id=o.id||'t'+Math.random().toString(36).slice(2,7);
    const st=S.sort[id];
    let rows=[...o.rows];
    if(st){ const col=o.cols.find(c=>c.k===st.k);
      rows.sort((a,b)=>{ const va=col.sortVal?col.sortVal(a):a[st.k], vb=col.sortVal?col.sortVal(b):b[st.k];
        const r = typeof va==='number'&&typeof vb==='number' ? va-vb : String(va).localeCompare(String(vb));
        return st.dir==='asc'?r:-r; }); }
    const head=o.cols.map(c=>`<th class="${c.align||''} ${c.sortable!==false?'sortable':''} ${st&&st.k===c.k?'sorted':''}"
        ${c.sortable!==false?`data-sort="${id}|${c.k}"`:''} ${c.w?`style="width:${c.w}"`:''}>${esc(c.label)}
        <span class="sort-ind">${st&&st.k===c.k&&st.dir==='asc'?icon('chevU',10):icon('chevD',10)}</span></th>`).join('');
    const body=rows.length? rows.map(r=>`<tr class="${o.open?'clickable':''}" ${o.open?`data-open="${o.open(r)}"`:''}>
      ${o.cols.map(c=>`<td class="${c.align||''}" data-label="${esc(c.label)}">${c.cell?c.cell(r):esc(r[c.k])}</td>`).join('')}</tr>`).join('')
      : `<tr><td colspan="${o.cols.length}">${UI.empty(o.emptyTitle||'Nothing here yet',o.emptyText||'Adjust the filters to widen the search.')}</td></tr>`;
    return `<div class="tbl-wrap"><table class="tbl ${o.responsive===false?'':'responsive'}">
      <thead><tr>${head}</tr></thead><tbody>${body}</tbody>
      ${o.foot?`<tfoot><tr class="tbl-foot-row">${o.foot}</tr></tfoot>`:''}</table></div>`;
  },
  empty(title,text,action){
    return `<div class="empty"><div class="empty-icon">${icon('search',18)}</div>
      <div class="empty-title">${esc(title)}</div><div class="empty-text">${esc(text)}</div>${action||''}</div>`;
  },
  seg(name,opts,cur){
    return `<div class="seg">${opts.map(o=>`<button data-seg="${name}|${o}" class="${o===cur?'on':''}">${esc(o)}</button>`).join('')}</div>`;
  },
  tabs(name,opts,cur){
    return `<div class="tabs">${opts.map(o=>`<button data-seg="${name}|${o}" class="${o===cur?'on':''}">${esc(o)}</button>`).join('')}</div>`;
  },
  select(name,opts,cur,w='auto'){
    return `<select class="select" data-filter="${name}" style="width:${w}">${opts.map(o=>{
      const v=typeof o==='string'?o:o.v, l=typeof o==='string'?o:o.l;
      return `<option value="${esc(v)}" ${v===cur?'selected':''}>${esc(l)}</option>`;}).join('')}</select>`;
  },
  toolbar(items){ return `<div class="row wrap" style="gap:8px;margin-bottom:14px">${items.join('')}</div>`; },
  dl(pairs){ return `<dl class="dl">${pairs.map(p=>`<dt>${esc(p[0])}</dt><dd>${p[1]}</dd>`).join('')}</dl>`; },
  insightRow(i){
    const ico={pos:'arrUp',neg:'alert',warn:'alert',info:'sparkle'}[i.tone];
    const col={pos:'var(--pos)',neg:'var(--neg)',warn:'var(--warn)',info:'var(--accent)'}[i.tone];
    return `<div class="insight"><span class="insight-i" style="color:${col}">${icon(ico,14)}</span>
      <span class="insight-t">${i.text}</span></div>`;
  }
};

/* ---------- overlays ---------- */
function closeLayers(){ const l=$('#layers'); if(l.innerHTML){ l.innerHTML=''; document.body.style.overflow=''; } }
function openDrawer(o){
  $('#layers').innerHTML = `<div class="overlay" data-close="1"></div>
    <aside class="drawer" role="dialog" aria-modal="true" aria-label="${esc(o.title)}">
      <header class="drawer-head">
        <div class="row"><div style="min-width:0">
          ${o.eyebrow?`<div class="t-xs dim">${o.eyebrow}</div>`:''}
          <h2 style="font-size:17px;font-weight:640;letter-spacing:-.025em" class="truncate">${esc(o.title)}</h2>
          ${o.sub?`<div class="t-sm dim" style="margin-top:2px">${o.sub}</div>`:''}
        </div>
        <button class="icon-btn" data-close="1" style="margin-left:auto" aria-label="Close">${icon('close',16)}</button></div>
      </header>
      <div class="drawer-body">${o.body}</div>
      ${o.foot?`<footer class="drawer-foot">${o.foot}</footer>`:''}
    </aside>`;
  document.body.style.overflow='hidden';
}
function openModal(o){
  $('#layers').innerHTML = `<div class="overlay" data-close="1"></div>
    <div class="modal" role="dialog" aria-modal="true" aria-label="${esc(o.title)}">
      <header class="modal-head"><div class="row">
        <h2 style="font-size:15.5px;font-weight:640;letter-spacing:-.02em">${esc(o.title)}</h2>
        <button class="icon-btn" data-close="1" style="margin-left:auto" aria-label="Close">${icon('close',16)}</button></div>
        ${o.sub?`<div class="t-sm dim" style="margin-top:3px">${esc(o.sub)}</div>`:''}</header>
      <div class="modal-body">${o.body}</div>
      ${o.foot!==false?`<footer class="modal-foot">${o.foot||'<button class="btn" data-close="1">Close</button>'}</footer>`:''}
    </div>`;
  document.body.style.overflow='hidden';
}
let toastTimer;
function toast(msg,ic='check'){
  const el=document.createElement('div');
  el.className='toast'; el.innerHTML=icon(ic,15)+'<span>'+msg+'</span>';
  $('#toasts').appendChild(el);
  setTimeout(()=>{ el.classList.add('out'); setTimeout(()=>el.remove(),220); },2600);
}

/* ---------- tooltips ---------- */
const tip=$('#tip');
document.addEventListener('mouseover',e=>{
  const t=e.target.closest('[data-tip]'); if(!t) return;
  tip.innerHTML = t.dataset.tipHtml ? t.dataset.tip : esc(t.dataset.tip);
  tip.classList.add('show'); moveTip(e);
});
document.addEventListener('mousemove',e=>{ if(tip.classList.contains('show')) moveTip(e); });
document.addEventListener('mouseout',e=>{ if(e.target.closest('[data-tip]')) tip.classList.remove('show'); });
function moveTip(e){
  const r=tip.getBoundingClientRect();
  let x=e.clientX+14, y=e.clientY+16;
  if(x+r.width>innerWidth-8) x=e.clientX-r.width-12;
  if(y+r.height>innerHeight-8) y=e.clientY-r.height-12;
  tip.style.left=x+'px'; tip.style.top=y+'px';
}

/* ---------- csv export ---------- */
function exportCSV(name,cols,rows){
  const head=cols.map(c=>`"${c.label}"`).join(',');
  const body=rows.map(r=>cols.map(c=>{
    const v = c.raw? c.raw(r) : r[c.k];
    return `"${String(v==null?'':v).replace(/"/g,'""')}"`;
  }).join(',')).join('\n');
  const blob=new Blob([head+'\n'+body],{type:'text/csv;charset=utf-8'});
  const a=document.createElement('a'); a.href=URL.createObjectURL(blob); a.download=name+'.csv'; a.click();
  setTimeout(()=>URL.revokeObjectURL(a.href),1000);
  toast('Exported '+name+'.csv','download');
}


/* ============================================================
   7. NAVIGATION MAP
   ============================================================ */
const NAV = [
  {group:'Command centre', items:[
    {id:'dashboard',  label:'Dashboard', icon:'dashboard'},
    {id:'briefing',   label:'Management view', icon:'briefing'},
    {id:'approvals',  label:'Approvals', icon:'checkC'}]},
  {group:'Content', items:[
    {id:'planner',    label:'Content planner', icon:'planner'},
    {id:'production', label:'Production', icon:'production'},
    {id:'calendar',   label:'Calendar', icon:'calendar'},
    {id:'library',    label:'Content library', icon:'library'},
    {id:'publishing', label:'Publishing', icon:'publish'}]},
  {group:'Performance', items:[
    {id:'analytics', label:'Analytics', icon:'analytics'},
    {id:'platforms', label:'Platforms', icon:'platforms'},
    {id:'campaigns', label:'Campaigns', icon:'campaigns'},
    {id:'reports',   label:'Reports', icon:'reports'}]},
  {group:'Team', items:[
    {id:'team',     label:'Team', icon:'team'},
    {id:'tasks',    label:'Tasks', icon:'tasks'},
    {id:'workload', label:'Workload', icon:'workload'},
    {id:'goals',    label:'Goals and KPIs', icon:'goals'}]},
  {group:'Finance', items:[
    {id:'revenue',       label:'Revenue', icon:'revenue'},
    {id:'expenses',      label:'Expenses', icon:'expenses'},
    {id:'costs',         label:'Production costs', icon:'costs'},
    {id:'budget',        label:'Budget', icon:'budget'},
    {id:'profitability', label:'Profitability', icon:'profit'},
    {id:'financials',    label:'Financial reports', icon:'bank'}]},
  {group:'System', items:[
    {id:'notifications', label:'Notifications', icon:'bell'},
    {id:'activity',      label:'Activity log', icon:'activity'},
    {id:'users',         label:'Users and roles', icon:'userAccess'},
    {id:'company',       label:'Company profile', icon:'building'},
    {id:'settings',      label:'Settings', icon:'settings'}]}
];
const NAV_INDEX = {};
NAV.forEach(g=>g.items.forEach(i=>NAV_INDEX[i.id]={...i,group:g.group}));

function pendingApprovals(){
  return {
    expenses: EXPENSES.filter(e=>e.approval==='Pending'),
    content: CONTENT.filter(c=>c.status==='Review'),
    members: TEAM.filter(t=>t.status==='Invited')
  };
}
function canAccess(id){ return !(ME.restrictedNav||[]).includes(id); }
function navCount(id){
  let c = null;
  if(id==='tasks'){ const n=overdueTasks().length; c = n?{n,alert:true}:{n:openTasks().length}; }
  else if(id==='notifications'){ const n=NOTIFS.filter(x=>!x.read).length; c = n?{n,alert:true}:null; }
  else if(id==='planner') c = {n:CONTENT.filter(x=>!x.isPublished).length};
  else if(id==='production') c = {n:inProduction().length};
  else if(id==='approvals'){ const p=pendingApprovals();
    const n=p.expenses.length+p.content.length+p.members.length; c = n?{n,alert:true}:null; }
  return c && c.n ? c : null;        /* a badge with nothing to count is just noise */
}
function renderNav(){
  $('#nav').innerHTML = NAV.map(g=>{
    const items=g.items.filter(i=>canAccess(i.id));
    if(!items.length) return '';
    return `<div class="nav-group">
    <div class="nav-head">${esc(g.group)}</div>
    ${items.map(i=>{ const c=navCount(i.id);
      return `<button class="nav-item ${S.view===i.id?'active':''}" data-go="${i.id}">
        ${icon(i.icon,15)}<span class="truncate">${esc(i.label)}</span>
        ${c?`<span class="nav-count ${c.alert?'alert':''}">${c.n}</span>`:''}</button>`;}).join('')}
  </div>`;}).join('');
}

/* ============================================================
   7b. THE GUIDE — what each screen is, learned by clicking
   ============================================================ */
const GUIDE = {
dashboard:{line:'Your morning read. This screen owns no data of its own — it summarises every other module and writes out, in sentences, what changed and what it means.',
  you:['Read the health rating and the written summary','Clear alerts, then click straight through to whatever needs you','Use Customise to choose what sits at the top'],
  from:['Finance, performance, team and pipeline totals','The thresholds you set in Settings'],
  feeds:[], note:'Nothing — this is a mirror, not a source'},
briefing:{line:'The 30-second version, for an owner, a bank or an investor who will not click anything.',
  you:['Open it before a meeting','Press PDF and take it with you'],
  from:['Monthly finance totals','The strongest campaign of the period'],
  feeds:[], note:'Nothing — this is an exit door for data'},
approvals:{line:'One queue for everything that needs the owner’s sign-off before it moves further.',
  you:['Approve or send back content sitting in Review','Approve expenses before they count as final','Activate a newly invited team member'],
  from:['Expenses recorded as Pending','Content moved into the Review stage','Team members just invited'],
  feeds:[['expenses','Expenses'],['planner','Content planner'],['team','Team']],
  watch:'Approving here is the same as editing the record directly — there is no separate audit trail beyond the Activity log.'},
planner:{line:'Where content is born. Every video in the system starts life as a card on this screen, and gets the ID that everything else hangs off.',
  you:['Create content and give it an owner, editor and deadline','Drag cards between stages as work moves','Set the estimated cost before you spend anything'],
  from:['What you type — this screen is a source, not a mirror'],
  feeds:[['production','Production'],['calendar','Calendar'],['tasks','Tasks'],['costs','Production costs'],['publishing','Publishing']],
  watch:'The estimate you set here is what the actual spend gets judged against later. A lazy estimate makes a meaningless variance.'},
production:{line:'Work in progress, and where it is stuck. The same content records as the planner, grouped so a queue becomes visible before it becomes a missed deadline.',
  you:['Read the stage load — how many pieces sit at each step','Check the bottleneck watch'],
  from:['Content records and the stage each one is in'],
  feeds:[['workload','Workload'],['dashboard','Dashboard alerts']],
  watch:'A stage with a queue is usually a person who needs help, not a process that needs a meeting.'},
calendar:{line:'What is landing and when — deadlines and publish dates on one grid.',
  you:['Scan the month for empty weeks and overloaded days','Spot clashes before they happen'],
  from:['Deadlines from the planner','Publish dates from publishing'],
  feeds:[['planner','Content planner']]},
library:{line:'The archive. Every finished file, with the version history that ends arguments about which cut is the real one.',
  you:['Find an old asset and check which version is current','See who made it and when'],
  from:['Files attached to content records'],
  feeds:[['publishing','Publishing']],
  watch:'Version history is what stops "final_v3_FINAL.mp4" from ever happening again.'},
publishing:{line:'The moment a video meets a platform — and the only screen that records the live URL.',
  you:['Schedule a post to a platform and account','Paste the live URL after it goes out'],
  from:['Content that has cleared approval'],
  feeds:[['analytics','Analytics'],['platforms','Platforms'],['calendar','Calendar']],
  watch:'Pasting the live URL is the step everyone skips. It is also the one that makes automatic YouTube figures possible later — without it, nothing can be matched.'},
analytics:{line:'How content actually performed once it was live.',
  you:['Compare views, engagement, watch time, completion and followers','Rank pieces against each other','Break performance down by type, category and platform'],
  from:['Platform figures attached to published content'],
  feeds:[['profitability','Profitability'],['platforms','Platforms'],['goals','Goals'],['settings','The score']],
  watch:'Views with no watch time means a hook that worked and a video that did not.'},
platforms:{line:'Which channel is actually worth the effort — measured on money, not just views.',
  you:['Compare the five platforms on cost, revenue and return','Open one to see its top posts'],
  from:['Published content grouped by platform'],
  feeds:[['planner','Where next month\u2019s hours go']]},
campaigns:{line:'A group of content with one budget and one objective. The only place that can say "this whole push returned 230%".',
  you:['Set a budget, dates and objective','Attach content','Watch spend against budget and revenue against both'],
  from:['Content, costs and revenue tagged to the campaign'],
  feeds:[['profitability','Profitability'],['budget','Budget']]},
reports:{line:'Packaged summaries for someone outside the studio.',
  you:['Pick a report and a period','Export to CSV or print to PDF'],
  from:['Every other module'],
  feeds:[], note:'Nothing — this is an exit door for data'},
team:{line:'Who is in the studio, and how they are actually delivering.',
  you:['Check completed work, on-time rate and average turnaround','Open a person to see their open tasks and content'],
  from:['Tasks and content they finished'],
  feeds:[['workload','Workload'],['planner','Assignment decisions']]},
tasks:{line:'The real to-do list — and every task is attached to the video it serves.',
  you:['Create tasks, assign them, set hours and a due date','Tick them off as they finish'],
  from:['What you type, linked to a content record'],
  feeds:[['workload','Workload'],['team','Team performance'],['activity','Activity log']],
  watch:'Ticking a task moves someone\u2019s workload immediately. Hour estimates you never update make the workload screen lie.'},
workload:{line:'Capacity. Who is drowning, and who has room to take something on.',
  you:['Look for anyone above 100%','Move a job before the deadline moves itself'],
  from:['Hours allocated on open tasks, divided by each person\u2019s capacity'],
  feeds:[['dashboard','Dashboard alerts'],['tasks','Reassignment']],
  watch:'This screen is only as honest as your task hour estimates.'},
goals:{line:'Targets, with the actuals filled in automatically so nobody has to argue about progress.',
  you:['Set targets for views, revenue, output and followers','Read the scorecard'],
  from:['Analytics and finance totals'],
  feeds:[['dashboard','Health rating']]},
revenue:{line:'Every peso coming in — and, just as importantly, whether it has actually arrived.',
  you:['Record income and tag it to a campaign and a video','Set the status: Paid, Invoiced, Partially paid or Overdue','Chase what is overdue'],
  from:['What you type'],
  feeds:[['financials','Profit and loss'],['financials','Cash'],['profitability','Per-video profit'],['campaigns','Campaign return']],
  watch:'"Invoiced" is not "Paid". The gap between them is your receivables, and it is what kills otherwise profitable studios.'},
expenses:{line:'Every peso going out, split into two buckets that decide both your margins.',
  you:['Record spend with category, vendor and department','Tick direct or operating','Tag it to the video it belongs to'],
  from:['What you type'],
  feeds:[['costs','Production costs'],['budget','Budget'],['financials','Gross and net profit'],['profitability','Profitability']],
  watch:'Direct = spent to make a specific video. Operating = spent to keep the studio open whether or not you film. Wrong bucket, wrong margins.'},
costs:{line:'What each individual video cost — your estimate against what you actually spent, line by line.',
  you:['Compare estimate against actual per piece','Read the variance column for surprises'],
  from:['Expenses tagged to a content record'],
  feeds:[['profitability','Profitability'],['dashboard','Cost per video']],
  watch:'Over a few months this screen teaches you what a video of each type really costs — which makes every future estimate better.'},
budget:{line:'Limits set in advance, so overspend is caught before it happens rather than explained afterwards.',
  you:['Create monthly, quarterly or campaign budgets','Watch utilisation — 85% warns, 95% is critical'],
  from:['Expenses matched to budget lines'],
  feeds:[['notifications','Alerts'],['dashboard','Health rating']]},
profitability:{line:'Where the money is actually made. The screen that should change what you film next month.',
  you:['Read the rankings: content, campaigns, platforms, types, categories','Look at return on cost, not just revenue'],
  from:['Revenue minus direct cost, for every item'],
  feeds:[['planner','What you make next']],
  watch:'Make more of what returns. Stop making what does not. This screen exists to make that conversation short.'},
financials:{line:'The formal statements — profit and loss, cash movement, and who owes whom.',
  you:['Read the P&L for the month and year to date','Check the cash position and the runway','Chase the overdue invoices'],
  from:['The revenue and expense ledgers'],
  feeds:[], note:'Your bank, your accountant, and any future investor',
  watch:'Profit says the business model works. Cash says you can pay people on Friday. They are different on purpose — watch both.'},
notifications:{line:'Things that need attention, raised automatically from the thresholds you set.',
  you:['Clear them','Click one to jump straight to the thing it is about'],
  from:['Settings thresholds applied to live data'],
  feeds:[['dashboard','Your morning']]},
activity:{line:'Who changed what, and when. Read-only on purpose.',
  you:['Read it when a number looks wrong or a deadline moved unexpectedly','Filter by person or type of change'],
  from:['Every change made anywhere in the system'],
  feeds:[], note:'Nothing — it exists so the numbers can be trusted'},
users:{line:'Who can get into the system, and what each of them is allowed to touch. A person here is both a team member and an account.',
  you:['Invite someone and set their access level','Change a role as responsibilities change','Disable an account when someone leaves'],
  from:['You \u2014 nothing else writes to this screen'],
  feeds:[['team','Team'],['workload','Workload'],['tasks','Tasks']],
  watch:'Roles are recorded here but not enforced, because there is no sign-in yet. Anyone who opens the file still sees everything until the login is built.'},
company:{line:'Your studio\u2019s own registered details. Right now that is the trading name and the address \u2014 the tax fields come when the BIR registration does.',
  you:['Set the registered name the system prints everywhere','Add the registered address for reports','Change either one at any time'],
  from:['You \u2014 nothing else writes to this screen'],
  feeds:[['dashboard','The greeting'],['briefing','Management view'],['financials','Printed reports']],
  watch:'Typing updates the sidebar straight away, but the change only sticks for this session \u2014 saving between sessions is still on the build list.'},
settings:{line:'The rules the whole system runs on. Change something here and it changes everywhere.',
  you:['Set the scoring weights that define "good content"','Maintain master data: platforms, types, categories, departments','Set the thresholds that trigger alerts'],
  from:['You'],
  feeds:[['analytics','Every ranking'],['notifications','Every alert'],['dashboard','Health rating']],
  watch:'Drag a scoring slider and every ranking in the system rebuilds in front of you. That is the point of it.'}
};

const guideBlock=()=>{
  const g=GUIDE[S.view];
  if(!S.guide||!g) return '';
  return `<section class="guide">
    <div class="guide-off">
      <button class="guide-x" data-act="tour">Take the tour</button>
      <button class="guide-x" data-act="guide">Hide</button>
    </div>
    <p class="guide-line">${g.line}</p>
    <div class="guide-grid">
      <div class="guide-col"><div class="label">What you do here</div>
        <ul>${g.you.map(x=>`<li>${x}</li>`).join('')}</ul></div>
      <div class="guide-col"><div class="label">Where its numbers come from</div>
        <ul>${g.from.map(x=>`<li>${x}</li>`).join('')}</ul></div>
      <div class="guide-col"><div class="label">What it feeds</div>
        ${g.feeds && g.feeds.length
          ? `<div class="guide-chips">${g.feeds.map(f=>`<span class="guide-chip" data-go="${f[0]}">${f[1]} ${icon('chevR',11)}</span>`).join('')}</div>`
          : `<ul><li>${g.note||'Nothing — this screen is a mirror'}</li></ul>`}</div>
    </div>
    ${g.watch?`<div class="guide-watch">${icon('alert',14)}<span>${g.watch}</span></div>`:''}
  </section>`;
};
const pageHead=(title,sub,actions='')=>`<div class="page-head">
  <div style="min-width:0"><h1 class="page-title">${esc(title)}</h1>${sub?`<p class="page-sub">${sub}</p>`:''}</div>
  ${actions?`<div class="page-actions">${actions}</div>`:''}</div>`+guideBlock();
const btnExport=(what)=>`<button class="btn" data-export="${what}">${icon('download',14)} Export</button>`;
const btnExportXL=(what)=>`<button class="icon-btn bordered" data-export="${what}" data-tip="Download as spreadsheet" style="color:#1D7A46">${icon('sheet',16)}</button>`;
const btnPrint=`<button class="btn" data-act="print">${icon('print',14)} PDF</button>`;

const V = {};

/* ============================================================
   8. VIEW — EXECUTIVE DASHBOARD
   ============================================================ */
V.dashboard = () => {
  const m=metrics(S.month), h=health(), pl=byPlatform(), w=S.widgets;
  const greet = greeting();
  const lbl=MONTHS.slice(0,S.month+1);
  const cut=n=>SERIES[n].slice(0,S.month+1);
  const prevGM = S.month>0 ? (SERIES.revenue[S.month-1]-SERIES.direct[S.month-1])/SERIES.revenue[S.month-1]*100 : m.grossMargin;

  const money = `<div class="grid g-6">
    ${UI.kpi({label:'Revenue', value:F.peso(m.revenue), delta:m.dRevenue, sub:'vs '+MONTHS[Math.max(0,S.month-1)],
      spark:Chart.spark(cut('revenue'),'var(--accent)'), open:'view:revenue', tip:'All income recognised in the period'})}
    ${UI.kpi({label:'Gross profit', value:F.peso(m.gross), delta:m.grossMargin-prevGM, sub:F.pct(m.grossMargin)+' margin',
      spark:Chart.spark(cut('revenue').map((r,i)=>r-SERIES.direct[i]),'var(--pos)'), open:'view:profitability',
      tip:'Revenue less direct production cost'})}
    ${UI.kpi({label:'Net profit', value:F.peso(m.net), delta:m.dNet, sub:F.pct(m.netMargin)+' margin',
      spark:Chart.spark(cut('revenue').map((r,i)=>r-SERIES.direct[i]-SERIES.opex[i]),'var(--pos)'), open:'view:financials'})}
    ${UI.kpi({label:'Total expenses', value:F.peso(m.expenses), delta:m.dExpenses, deltaOpts:{invert:true},
      sub:F.peso(m.direct)+' direct', spark:Chart.spark(cut('expenses'),'var(--neg)'), open:'view:expenses'})}
    ${UI.kpi({label:'Cash position', value:F.peso(m.cash), sub:(m.expenses>0?(m.cash/m.expenses).toFixed(1)+' months of runway':'no spend recorded yet'),
      spark:Chart.spark(cut('cashIn').map((v,i)=>FIN.openingCash+sum(SERIES.cashIn.slice(0,i+1))-sum(SERIES.cashOut.slice(0,i+1))),'var(--accent)'),
      open:'view:financials'})}
    ${UI.kpi({label:'Return on content spend', value:F.pct(m.roi,0), sub:F.peso(m.costPerContent)+' per video',
      delta:m.dCost, deltaOpts:{invert:true},
      spark:Chart.spark(cut('revenue').map((r,i)=>(r-SERIES.direct[i])/SERIES.direct[i]*100),'var(--violet)'), open:'view:profitability'})}
  </div>`;

  const hScored = h.checks.filter(c=>!c.pending);
  const healthBody = h.checks.length
    ? `<div class="row" style="gap:12px;margin-bottom:12px">
        ${Chart.ring(h.pct||0,44,`var(--${h.tone})`)}
        <div><div class="w6" style="font-size:14.5px;letter-spacing:-.02em">Business health</div>
        <div class="t-sm dim">${hScored.length? hScored.filter(c=>c.ok).length+' of '+hScored.length+' checks are clear' : 'Not enough data to score yet'}</div></div>
      </div>
      ${h.checks.map(c=>`<div class="row" style="padding:5px 0;border-bottom:1px solid var(--line-2)" data-tip="${esc(c.hint)}">
        <i class="dot ${c.pending?'':(c.ok?'pos':c.warn?'warn':'neg')}"></i><span class="t-sm ${c.pending?'dim':''}">${esc(c.name)}</span>
        <span class="t-sm num w5 ${c.pending?'dim':''}" style="margin-left:auto">${esc(c.value)}</span></div>`).join('')}`
    : UI.empty('No data yet','These checks read real content, tasks, revenue and expenses — once something is entered, this panel starts scoring it.');

  const summary = UI.card({
    title:'What changed this period',
    note:`${MONTHS[S.month]} ${YEAR()} · read from live operating data`,
    actions:`<span class="badge ${h.tone}"><i class="dot ${h.tone}"></i>${h.state}</span>`,
    body:`<div class="grid g-1-2" style="gap:22px">
      <div>${healthBody}</div>
      <div>${insights().map(UI.insightRow).join('')}</div>
    </div>`});

  const charts = `<div class="grid g-2">
    ${UI.card({title:'Revenue against total spend', note:`Monthly, ${YEAR()}`, body:
      `<div class="legend" style="margin-bottom:12px">
        <span class="legend-item"><i class="legend-swatch" style="background:var(--accent)"></i>Revenue</span>
        <span class="legend-item"><i class="legend-swatch" style="background:var(--neg)"></i>Expenses</span>
        <span class="legend-item"><i class="legend-swatch" style="background:var(--pos)"></i>Net profit</span></div>`+
      Chart.line({labels:lbl, height:190, fmt:F.pesoK, series:[
        {name:'Revenue', values:cut('revenue'), color:'var(--accent)'},
        {name:'Expenses', values:cut('expenses'), color:'var(--neg)', area:false},
        {name:'Net profit', values:cut('revenue').map((r,i)=>r-SERIES.direct[i]-SERIES.opex[i]), color:'var(--pos)', area:false, dash:true}]})})}
    ${UI.card({title:'Output and unit cost', note:'Videos published, and what each one costs to make', body:
      Chart.cols({labels:lbl, height:170, fmt:n=>Math.round(n), series:[{name:'Published', values:cut('published'), color:'var(--ink)'}]})
      + `<div style="margin-top:14px;border-top:1px solid var(--line-2);padding-top:12px">
         <div class="label" style="margin-bottom:6px">Direct cost per video</div>`+
      Chart.line({labels:lbl, height:70, fmt:F.pesoK, yTicks:2, series:[
        {name:'Cost per video', values:cut('direct').map((d,i)=>d/SERIES.published[i]), color:'var(--warn)'}]})+`</div>`})}
  </div>`;

  const audience = `<div class="grid g-2">
    ${UI.card({title:'Audience growth', note:'Views, engagement and followers', body:
      Chart.line({labels:lbl, height:170, fmt:F.numK, series:[{name:'Views', values:cut('views'), color:'var(--violet)'}]})
      +`<div class="split" style="margin-top:14px;border-top:1px solid var(--line-2)">
        <div style="padding-left:0"><div class="label">Engagement rate</div><div class="w6 num t-lg">${F.pct(m.engage)}</div>${UI.delta(m.dEngage)}</div>
        <div><div class="label">Followers gained</div><div class="w6 num t-lg">+${F.num(m.followers)}</div>${UI.delta(m.dFollowers)}</div>
        <div><div class="label">Views</div><div class="w6 num t-lg">${F.numK(m.views)}</div>${UI.delta(m.dViews)}</div>
      </div>`})}
    ${UI.card({title:'Where the money comes from', note:'Content revenue by platform', body:
      `<div class="donut-wrap">
        ${Chart.donut({slices:pl.map(p=>({label:p.name,value:p.revenue,color:p.color})), center:F.pesoK(sum(pl,p=>p.revenue)), sub:'content revenue'})}
        <div style="flex:1;min-width:180px">${pl.map(p=>`<div class="row" style="padding:5px 0;border-bottom:1px solid var(--line-2)">
          <i class="legend-swatch" style="background:${p.color}"></i><span class="t-sm truncate">${p.name}</span>
          <span class="t-sm num w5" style="margin-left:auto">${F.pesoK(p.revenue)}</span>
          <span class="t-xs dim num" style="width:44px;text-align:right">${F.pct(p.revenue/sum(pl,x=>x.revenue)*100,0)}</span>
        </div>`).join('')}</div></div>`})}
  </div>`;

  const pipe = UI.card({title:'Production pipeline', note:'Every unpublished piece, by stage',
    actions:`<button class="btn btn-sm" data-go="planner">Open planner</button>`, flush:true,
    body:`<div class="pipe">${pipeline().filter(p=>p.stage!=='Published').map(p=>{
      const late=p.items.filter(c=>daysFrom(c.deadline)<0).length;
      return `<div class="pipe-step ${p.items.length>=4?'hot':''}" data-go="planner"
        data-tip="${p.items.map(c=>esc(c.title)).join('<br>')||'Empty'}" data-tip-html="1">
        <div class="pipe-n">${p.items.length}</div><div class="pipe-l">${p.stage}</div>
        ${late?`<div class="t-xs" style="color:var(--neg);margin-top:4px">${late} late</div>`:''}</div>`;}).join('')}</div>`});

  const platformTable = UI.card({title:'Platform performance', note:'Published content only',
    actions:`<button class="btn btn-sm" data-go="platforms">Details</button>`, flush:true,
    body: UI.table({id:'dashPlat', cols:[
      {k:'name',label:'Platform',cell:r=>`<span class="row"><i class="dot" style="background:${r.color}"></i><span class="cell-main">${r.name}</span></span>`},
      {k:'count',label:'Posts',align:'r'},
      {k:'views',label:'Views',align:'r',cell:r=>F.numK(r.views)},
      {k:'er',label:'Engagement',align:'r',cell:r=>F.pct(r.er)},
      {k:'followers',label:'Followers',align:'r',cell:r=>'+'+F.num(r.followers)},
      {k:'revenue',label:'Revenue',align:'r',cell:r=>`<span class="w5">${F.peso(r.revenue)}</span>`},
      {k:'roi',label:'ROI',align:'r',cell:r=>`<span class="w5" style="color:${r.roi>200?'var(--pos)':'inherit'}">${F.pct(r.roi,0)}</span>`}
    ], rows:pl, open:r=>'platform:'+r.id})});

  const load=teamLoad();
  const teamCard = UI.card({title:'Team workload', note:`${load}% of capacity allocated this week`,
    actions:`<button class="btn btn-sm" data-go="workload">Balance</button>`,
    body: TEAM.slice(0,6).map(t=>{ const b=loadBand(t.load);
      return `<div class="row" style="padding:6px 0;gap:10px;cursor:pointer" data-open="member:${t.id}">
        ${UI.av(t.id)}<div style="min-width:0;flex:1">
          <div class="row"><span class="t-sm w5 truncate">${t.name}</span>
          <span class="t-xs num w5" style="margin-left:auto;color:var(--${b.tone})">${t.load}%</span></div>
          ${UI.meter(t.load,b.tone)}</div></div>`;}).join('')});

  const alertsCard = UI.card({title:'Needs a decision', note:`${NOTIFS.filter(n=>!n.read).length} unread`,
    actions:`<button class="btn btn-sm" data-go="notifications">All</button>`,
    body: NOTIFS.slice(0,6).map(n=>`<div class="row-t" style="padding:7px 0;border-bottom:1px solid var(--line-2);cursor:pointer"
      ${n.ref.startsWith('CNT')?`data-open="content:${n.ref}"`:''}>
      <i class="dot ${n.tone}" style="margin-top:6px"></i>
      <div style="min-width:0"><div class="t-sm">${esc(n.text)}</div>
      <div class="t-xs faint">${n.kind} · ${F.date(n.date)} ${n.time}</div></div></div>`).join('')});

  const activityCard = UI.card({title:'Latest activity', note:'Audit trail',
    actions:`<button class="btn btn-sm" data-go="activity">Full log</button>`,
    body:`<div class="feed">${ACTIVITY.slice(0,7).map(a=>`<div class="feed-item">
      <span class="feed-time">${a.time}</span>${UI.av(a.who)}
      <span class="feed-line"><b class="w6">${esc(nickOf(a.who))}</b> ${esc(a.what)}
      ${a.label?`<span class="w5" ${a.ref.startsWith('CNT')?`data-open="content:${a.ref}" style="cursor:pointer;border-bottom:1px solid var(--line-strong)"`:''}>${esc(a.label)}</span>`:''}</span>
    </div>`).join('')}</div>`});

  return pageHead(`${greet}, ${esc(nickOf(ME.id))}`, '',
    `<button class="btn" data-act="customise">${icon('layers',14)} Customise</button>${btnPrint}
     <button class="btn btn-primary" data-act="new-content">${icon('plus',14)} New content</button>`)
    + `<div class="stack">
      ${w.summary?summary:''}${w.money?money:''}${w.charts?charts:''}${w.pipeline?pipe:''}
      ${w.charts?audience:''}${w.platforms?platformTable:''}
      <div class="grid g-3">${w.team?teamCard:''}${w.alerts?alertsCard:''}${w.activity?activityCard:''}</div>
    </div>`;
};

/* ============================================================
   9. VIEW — MANAGEMENT BRIEFING (the 30-second read)
   ============================================================ */
V.briefing = () => {
  const m=metrics(S.month), h=health(), pl=byPlatform();
  const top=[...PUBLISHED].sort((a,b)=>b.revenue-a.revenue)[0];
  const topCmp=[...CAMPAIGNS].sort((a,b)=>(b.revenue-b.spent)-(a.revenue-a.spent))[0];
  const ar=REVENUE.filter(r=>['Invoiced','Overdue','Partially paid'].includes(r.status));
  const risk=BUDGETS.filter(b=>b.util>=85);
  const strip=(txt)=>txt.replace(/<\/?b>/g,'');

  const block=(title,rows)=>UI.card({title, flush:true, body:`<div>${rows.map(r=>`
    <div class="row" style="padding:9px 16px;border-bottom:1px solid var(--line-2)">
      <span class="t-sm muted">${esc(r[0])}</span>
      <span style="margin-left:auto;text-align:right;padding-left:10px">
        <span class="w6 num" style="font-size:13.5px">${r[1]}</span>
        ${r[2]?`<div class="t-xs dim">${r[2]}</div>`:''}</span></div>`).join('')}</div>`});

  return pageHead('Management view',
    `One screen for the owner. Everything below is the current position for ${MONTHS[S.month]} ${YEAR()}.`,
    `${btnPrint}${btnExport('briefing')}`)
  + `<div class="note ${h.tone}" style="margin-bottom:16px"><b>${h.state}.</b> ${strip(insights()[0].text)} ${strip(insights()[1].text)}</div>
    <div class="grid g-4">
      ${block('Company performance',[
        ['Revenue',F.peso(m.revenue),F.sign(m.dRevenue)+' vs last month'],
        ['Expenses',F.peso(m.expenses),F.sign(m.dExpenses)+' vs last month'],
        ['Gross profit',F.peso(m.gross),F.pct(m.grossMargin)+' margin'],
        ['Net profit',F.peso(m.net),F.pct(m.netMargin)+' margin'],
        ['Cash position',F.peso(m.cash),(m.expenses>0?(m.cash/m.expenses).toFixed(1)+' months of runway':'no spend recorded yet')],
        ['Return on content spend',F.pct(m.roi,0)]])}
      ${block('Content performance',[
        ['Videos published',m.published,F.sign(m.dPublished)],
        ['Total views',F.numK(m.views),F.sign(m.dViews)],
        ['Engagement rate',F.pct(m.engage)],
        ['Followers gained','+'+F.num(m.followers)],
        ['Top content',top?esc(top.title.length>20?top.title.slice(0,20)+'…':top.title):'—',top?F.peso(top.revenue)+' revenue':'nothing published yet'],
        ['Top platform',pl.length?pl[0].name:'—',pl.length?F.pesoK(pl[0].revenue):'no posts yet']])}
      ${block('Operations',[
        ['Open tasks',openTasks().length],
        ['Overdue tasks',overdueTasks().length, overdueTasks().length?'needs attention':'all clear'],
        ['Pieces in production',inProduction().length],
        ['Largest queue',[...pipeline()].sort((a,b)=>b.items.length-a.items.length)[0].stage],
        ['Team utilisation',teamLoad()+'%',loadBand(teamLoad()).t],
        ['Ready to publish',CONTENT.filter(c=>['Approved','Scheduled'].includes(c.status)).length]])}
      ${block('Financial alerts',[
        ['Outstanding receivables',F.peso(m.ar),ar.length+' invoices open'],
        ['Overdue receivables',F.peso(sum(REVENUE.filter(r=>r.status==='Overdue'),r=>r.amount))],
        ['Accounts payable',F.peso(m.ap)],
        ['Budgets above 85%',risk.length,risk.map(r=>r.name).join(', ').slice(0,30)],
        ['Cost per video',F.peso(m.costPerContent),F.sign(m.dCost)+' vs last month'],
        ['Spend growth',F.sign(m.dExpenses)]])}
    </div>
    <div class="grid g-2-1 mt-l">
      ${UI.card({title:'Nine months of trading', note:'Revenue, spend and net profit', body:
        Chart.line({labels:MONTHS, height:210, fmt:F.pesoK, series:[
          {name:'Revenue',values:SERIES.revenue,color:'var(--accent)'},
          {name:'Expenses',values:SERIES.expenses,color:'var(--neg)',area:false},
          {name:'Net profit',values:SERIES.revenue.map((r,i)=>r-SERIES.direct[i]-SERIES.opex[i]),color:'var(--pos)',area:false,dash:true}]})})}
      ${UI.card({title:'Strongest campaign', body: topCmp ? `
        <div class="w6" style="font-size:16px;letter-spacing:-.025em">${esc(topCmp.name)}</div>
        <div class="t-sm dim" style="margin-bottom:14px">${esc(topCmp.objective)}</div>
        ${UI.meter(topCmp.spent/topCmp.budget*100,'accent')}
        <div class="row t-xs dim" style="margin-top:5px"><span>${F.peso(topCmp.spent)} spent</span>
          <span style="margin-left:auto">${F.peso(topCmp.budget)} budget</span></div>
        <div class="split" style="margin-top:14px;border-top:1px solid var(--line-2)">
          <div style="padding-left:0"><div class="label">Revenue</div><div class="w6 num t-lg">${F.peso(topCmp.revenue)}</div></div>
          <div><div class="label">Return</div><div class="w6 num t-lg" style="color:var(--pos)">${F.pct((topCmp.revenue-topCmp.spent)/topCmp.spent*100,0)}</div></div>
        </div>
        <button class="btn mt-l" style="width:100%" data-open="campaign:${topCmp.id}">Open campaign</button>` : UI.empty('No campaigns yet','Group content under a budget and an objective, and the best performer shows up here.')})}
    </div>`;
};

/* ============================================================
   9b. VIEW — APPROVALS
   Everything in the system that needs the owner's sign-off
   before it goes further, in one queue.
   ============================================================ */
V.approvals = () => {
  const p=pendingApprovals();
  const total=p.expenses.length+p.content.length+p.members.length;
  const row=(left,right,actions)=>`<div class="row" style="padding:11px 16px;border-bottom:1px solid var(--line-2);gap:10px">
    <span style="min-width:0">${left}</span>
    <span style="margin-left:auto;text-align:right;white-space:nowrap">${right}</span>
    <span class="row" style="gap:6px">${actions}</span></div>`;
  const btn=(label,act,id,cls='btn-sm')=>`<button class="btn ${cls}" data-act="${act}" data-id="${id}">${label}</button>`;

  return pageHead('Approvals',
    total ? `${total} item${total===1?' is':'s are'} waiting on you — expenses, content and people, in one place.`
      : 'Nothing is waiting on you right now. New expenses, content in Review, and invited team members will show up here.',
    '')
  + UI.card({title:'Expenses',note:p.expenses.length+' pending', flush:true,
      body: p.expenses.length ? p.expenses.map(e=>row(
        `<span class="cell-main truncate" style="display:block">${esc(e.description)}</span>
         <span class="cell-sub">${esc(e.vendor)} · ${esc(e.category)} · ${F.date(e.date)}</span>`,
        `<span class="w6 num">${F.peso(e.amount)}</span>`,
        btn('Approve','approve-expense',e.id,'btn-sm btn-primary')
      )).join('') : UI.empty('Nothing pending','Every recorded expense is already approved.')})
  + UI.card({title:'Content in review',note:p.content.length+' pending', flush:true,
      body: p.content.length ? p.content.map(c=>row(
        `<span class="cell-main truncate" style="display:block">${esc(c.title)}</span>
         <span class="cell-sub">${esc(c.type)} · owned by ${esc(memName(c.owner))} · due ${F.date(c.deadline)}</span>`,
        '',
        btn('Send back','reject-content',c.id)+btn('Approve','approve-content',c.id,'btn-sm btn-primary')
      )).join('') : UI.empty('Nothing pending','No content is sitting in Review right now.')})
  + UI.card({title:'Team invites',note:p.members.length+' pending', flush:true,
      body: p.members.length ? p.members.map(t=>row(
        `<span class="cell-main truncate" style="display:block">${esc(t.name)}</span>
         <span class="cell-sub">${esc(t.role)} · ${esc(t.email)} · ${roleName(t.access)}</span>`,
        '',
        btn('Activate','approve-member',t.id,'btn-sm btn-primary')
      )).join('') : UI.empty('Nothing pending','No invited member is waiting to be activated.')});
};

/* ============================================================
   10. VIEW — CONTENT PLANNER
   ============================================================ */
function filteredContent(){
  const f=S.filters;
  return CONTENT.filter(c=>
    (!f.cmp || f.cmp==='all' || c.campaign===f.cmp) &&
    (!f.plat || f.plat==='all' || c.platform===f.plat) &&
    (!f.owner || f.owner==='all' || c.owner===f.owner) &&
    (!f.type || f.type==='all' || c.type===f.type) &&
    (!f.q || (c.title+' '+c.id+' '+c.category+' '+c.status).toLowerCase().includes(f.q.toLowerCase())));
}
const contentToolbar = () => UI.toolbar([
  `<div class="row" style="gap:6px;flex:1;min-width:180px;max-width:280px">
    <span style="position:relative;flex:1;display:block">
      <span style="position:absolute;left:9px;top:50%;transform:translateY(-50%);color:var(--ink-4)">${icon('search',14)}</span>
      <input class="input" id="searchInput" data-input="q" placeholder="Search content" value="${esc(S.filters.q||'')}" style="padding-left:29px">
    </span></div>`,
  UI.select('cmp',[{v:'all',l:'All campaigns'},...CAMPAIGNS.map(c=>({v:c.id,l:c.name}))],S.filters.cmp||'all'),
  UI.select('plat',[{v:'all',l:'All platforms'},...PLATFORMS.map(p=>({v:p.id,l:p.name}))],S.filters.plat||'all'),
  UI.select('owner',[{v:'all',l:'All owners'},...TEAM.map(t=>({v:t.id,l:t.name}))],S.filters.owner||'all'),
  UI.select('type',[{v:'all',l:'All types'},...uniq(CONTENT.map(c=>c.type)).map(t=>({v:t,l:t}))],S.filters.type||'all'),
  `<button class="btn btn-ghost btn-sm" data-act="clear-filters">Reset</button>`
]);

const kanbanCard = c => `<article class="kcard" draggable="true" data-id="${c.id}" data-open="content:${c.id}">
  <div class="row" style="margin-bottom:6px">
    <span class="t-xs faint mono">${c.id}</span>
    ${daysFrom(c.deadline)<0 && !c.isPublished ? `<span class="badge neg" style="margin-left:auto">${Math.abs(daysFrom(c.deadline))}d late</span>`
      : `<span class="t-xs faint" style="margin-left:auto">${F.date(c.deadline)}</span>`}
  </div>
  <div class="kcard-title">${esc(c.title)}</div>
  <div class="kcard-meta">
    <i class="dot" style="background:${PLAT[c.platform].color}" data-tip="${PLAT[c.platform].name}"></i>
    <span class="t-xs dim truncate" style="flex:1">${esc(c.category)}</span>
    ${c.priority==='Critical'||c.priority==='High'?UI.prio(c.priority):''}
    ${UI.av(c.owner,'sm')}
  </div>
  ${c.cost?`<div class="row t-xs dim" style="margin-top:7px;padding-top:7px;border-top:1px solid var(--line-2)">
    <span>${F.peso(c.cost)} spent</span><span style="margin-left:auto">${F.pct(c.cost/c.estCost*100,0)} of estimate</span></div>`:''}
</article>`;

V.planner = () => {
  const tab=S.tab.planner||'Board', items=filteredContent();
  const head = pageHead('Content planner',
    `${items.length} pieces tracked. Drag a card to move it through the pipeline — costs, tasks and campaign totals follow it.`,
    `${btnExport('content')}<button class="btn btn-primary" data-act="new-content">${icon('plus',14)} New content</button>`)
    + UI.tabs('planner',['Board','Table','Calendar','Timeline'],tab) + contentToolbar();

  if(tab==='Board'){
    return head + `<div class="board">${STAGES.map(st=>{
      const list=items.filter(c=>c.status===st);
      return `<div class="col" data-col="${st}">
        <div class="col-head"><i class="dot ${STAGE_TONE[st]}"></i><span class="col-name">${st}</span>
          <span class="col-count">${list.length}</span>
          <span class="t-xs faint" style="margin-left:auto">${list.length?F.pesoK(sum(list,c=>c.estCost)):''}</span></div>
        <div class="col-body">${list.map(kanbanCard).join('') ||
          `<div class="t-xs faint" style="padding:14px 6px;text-align:center">Drop content here</div>`}</div>
      </div>`;}).join('')}</div>`;
  }
  if(tab==='Table'){
    return head + UI.card({flush:true, body: UI.table({id:'plannerTbl', open:r=>'content:'+r.id, cols:[
      {k:'id',label:'ID',cell:r=>`<span class="mono dim">${r.id}</span>`,w:'86px'},
      {k:'title',label:'Content',cell:r=>`<div class="cell-main truncate">${esc(r.title)}</div><div class="cell-sub">${esc(r.type)} · ${esc(r.category)}</div>`},
      {k:'status',label:'Stage',cell:r=>UI.stage(r.status)},
      {k:'platform',label:'Platform',cell:r=>`<span class="row"><i class="dot" style="background:${PLAT[r.platform].color}"></i>${PLAT[r.platform].name}</span>`},
      {k:'campaign',label:'Campaign',cell:r=>esc(cmpName(r.campaign))},
      {k:'owner',label:'Owner',cell:r=>UI.person(r.owner)},
      {k:'priority',label:'Priority',cell:r=>UI.prio(r.priority)},
      {k:'deadline',label:'Deadline',align:'r',cell:r=>`<div>${F.date(r.deadline)}</div>
        <div class="cell-sub" style="color:${!r.isPublished&&daysFrom(r.deadline)<0?'var(--neg)':''}">${r.isPublished?'shipped':relDays(r.deadline)}</div>`},
      {k:'estCost',label:'Est. cost',align:'r',cell:r=>F.peso(r.estCost)},
      {k:'cost',label:'Actual',align:'r',cell:r=>r.cost?`<span class="w5" style="color:${r.cost>r.estCost?'var(--neg)':'var(--pos)'}">${F.peso(r.cost)}</span>`:'<span class="faint">—</span>'}
    ], rows:items})});
  }
  if(tab==='Calendar') return head + calendarGrid(items,'deadline','Deadlines');
  /* Timeline */
  const start=new Date(YEAR(), S.month, 1), days=60;
  const pos=d=>clamp((new Date(d+'T00:00:00')-start)/864e5/days*100,0,100);
  const rows=[...items].filter(c=>!c.isPublished).sort((a,b)=>a.deadline.localeCompare(b.deadline));
  return head + UI.card({title:'Delivery timeline', note:`${MONTHS[S.month]} to ${MONTHS[(S.month+1)%12]} ${YEAR()}`, body:`
    <div class="lc-x" style="margin-bottom:8px;padding-left:242px">${['Sep 1','Sep 15','Oct 1','Oct 15','Oct 31'].map(l=>`<span>${l}</span>`).join('')}</div>
    ${rows.map(c=>{
      const end=pos(c.deadline), w=Math.max(4, end-pos(c.published||iso(start))*0+8);
      const late=daysFrom(c.deadline)<0;
      return `<div class="gantt-row"><div class="truncate"><span class="t-sm w5">${esc(c.title)}</span>
        <div class="cell-sub">${esc(c.status)} · ${esc(memName(c.owner))}</div></div>
        <div class="gantt-track"><div class="gantt-bar" data-open="content:${c.id}"
          data-tip="${esc(c.title)} · due ${F.dateFull(c.deadline)}"
          style="left:${Math.max(0,end-w)}%;width:${w}%;background:${late?'var(--neg)':PLAT[c.platform].color}">${esc(c.id)}</div></div></div>`;
    }).join('')}`});
};

/* month calendar used by planner + calendar view */
function calendarGrid(items,dateKey,label){
  const y=YEAR(), m=S.month;
  const first=new Date(y,m,1), startDow=(first.getDay()+6)%7, dim=daysInMonth(y,m);
  const prevDim=daysInMonth(y, m===0?11:m-1);
  const cells=[];
  for(let i=0;i<startDow;i++) cells.push({out:true,d:prevDim-startDow+i+1});
  for(let d=1;d<=dim;d++) cells.push({d,date:`${monthKey(m)}-${String(d).padStart(2,'0')}`});
  let nxt=1; while(cells.length%7) cells.push({out:true,d:nxt++});
  const dows=['Mon','Tue','Wed','Thu','Fri','Sat','Sun'];
  const monthLabel = first.toLocaleDateString('en-PH',{month:'long', year:'numeric'});
  return UI.card({title:label+' — '+monthLabel,
    note:`${items.filter(i=>i[dateKey]&&i[dateKey].startsWith(monthKey(m))).length} items this month`,
    actions:`<div class="seg"><button class="on">Month</button><button data-tip="Week view is available on the full build">Week</button></div>`,
    flush:true, body:`<div class="cal">
      ${dows.map(d=>`<div class="cal-dow">${d}</div>`).join('')}
      ${cells.map(c=>{
        const day = c.date? items.filter(i=>i[dateKey]===c.date) : [];
        const today = c.date===iso(TODAY);
        return `<div class="cal-cell ${c.out?'out':''} ${today?'today':''}">
          <div class="cal-date">${c.d}</div>
          ${day.slice(0,3).map(i=>`<div class="cal-ev" data-open="content:${i.id||i.content}"
            style="border-left-color:${PLAT[i.platform].color}" data-tip="${esc(i.title||CT[i.content].title)}">
            <span class="truncate">${esc((i.title||CT[i.content].title))}</span></div>`).join('')}
          ${day.length>3?`<div class="cal-more">+${day.length-3} more</div>`:''}
        </div>`;}).join('')}
    </div>`});
}

/* ============================================================
   11. VIEW — PRODUCTION
   ============================================================ */
V.production = () => {
  const items=inProduction();
  const stageStats = STAGES.filter(s=>!['Idea','Planned','Published'].includes(s)).map(s=>{
    const list=CONTENT.filter(c=>c.status===s);
    return {stage:s, count:list.length, late:list.filter(c=>daysFrom(c.deadline)<0).length,
      turn:+(list.length? sum(list,c=>c.stages.reduce((t,x)=>t+x.days,0))/list.length/STAGE_FLOW.length : 0).toFixed(1)};
  });
  const worst=[...stageStats].sort((a,b)=>b.count-a.count)[0];
  const editing=CONTENT.filter(c=>c.status==='Editing');
  const avgEdit=(sum(editing,c=>c.stages[4].days)/(editing.length||1)).toFixed(1);

  return pageHead('Production',
    `${items.length} pieces are moving through the pipeline. ${worst.stage} is the deepest queue.`,
    `${btnExport('production')}<button class="btn" data-go="planner">Open board</button>`)
  + `<div class="note ${worst.count>3?'warn':'info'}" style="margin-bottom:16px">
      <b>${worst.stage} holds ${worst.count} piece${worst.count===1?'':'s'}</b>${worst.late?`, ${worst.late} of them past deadline`:''}.
      ${(()=>{ const stuck=items.filter(c=>c.status===worst.stage).sort((a,b)=>a.deadline.localeCompare(b.deadline))[0];
        return stuck ? `Average editing turnaround is ${avgEdit} days. <b>${esc(stuck.title)}</b> has the nearest deadline in that queue — clear it first.`
                     : 'Nothing is queued yet. Move a card into a production stage on the board and it will show up here.'; })()}</div>
    <div class="grid g-4" style="margin-bottom:14px">
      ${UI.kpi({label:'In production', value:items.length, sub:'excludes ideas and published'})}
      ${UI.kpi({label:'Past deadline', value:overdueContent().length, sub:'needs re-planning'})}
      ${UI.kpi({label:'Average turnaround', value:avgEdit+' days', sub:'editing stage'})}
      ${UI.kpi({label:'Committed cost', value:F.peso(sum(items,c=>c.cost)), sub:'spent on work in progress'})}
    </div>
    <div class="grid g-2-1">
      ${UI.card({title:'Stage load', note:'Where content is sitting and how long it takes', flush:true,
        body:UI.table({id:'stageTbl', responsive:true, cols:[
          {k:'stage',label:'Stage',cell:r=>`<span class="row"><i class="dot ${STAGE_TONE[r.stage]}"></i><span class="cell-main">${r.stage}</span></span>`},
          {k:'count',label:'Items',align:'r'},
          {k:'late',label:'Late',align:'r',cell:r=>r.late?`<span style="color:var(--neg)" class="w5">${r.late}</span>`:'<span class="faint">0</span>'},
          {k:'turn',label:'Avg days',align:'r',cell:r=>r.turn||'—'},
          {k:'load',label:'Load',sortable:false,cell:r=>UI.meter(r.count/Math.max(...stageStats.map(s=>s.count))*100, r.count>3?'warn':'accent')}
        ], rows:stageStats})})}
      ${UI.card({title:'Bottleneck watch', body:
        stageStats.filter(s=>s.count>0).sort((a,b)=>b.count-a.count).slice(0,5).map(s=>`
        <div style="padding:9px 0;border-bottom:1px solid var(--line-2)">
          <div class="row"><span class="t-sm w5">${s.stage}</span>
            <span class="badge ${s.count>3?'warn':'neutral'}" style="margin-left:auto">${s.count} waiting</span></div>
          <div class="t-xs dim" style="margin-top:3px">${CONTENT.filter(c=>c.status===s.stage).map(c=>esc(c.title)).slice(0,2).join(' · ')}</div>
        </div>`).join('')})}
    </div>
    <div class="mt-l">${UI.card({title:'Work in progress', note:'Stage owner, elapsed time and next action', flush:true,
      body:UI.table({id:'wipTbl', open:r=>'content:'+r.id, cols:[
        {k:'title',label:'Content',cell:r=>`<div class="cell-main truncate">${esc(r.title)}</div><div class="cell-sub mono">${r.id}</div>`},
        {k:'status',label:'Stage',cell:r=>UI.stage(r.status)},
        {k:'owner',label:'Stage owner',cell:r=>UI.person(r.status==='Editing'||r.status==='Revision'?r.editor:r.owner)},
        {k:'deadline',label:'Deadline',align:'r',cell:r=>`<div>${F.date(r.deadline)}</div>
          <div class="cell-sub" style="color:${daysFrom(r.deadline)<0?'var(--neg)':''}">${relDays(r.deadline)}</div>`},
        {k:'hours',label:'Hours logged',align:'r',sortVal:r=>sum(r.stages,s=>s.hours),
          cell:r=>F.dur(+sum(r.stages,s=>s.hours).toFixed(1))},
        {k:'cost',label:'Spent',align:'r',cell:r=>F.peso(r.cost)},
        {k:'estCost',label:'Budget',align:'r',cell:r=>`<div>${F.peso(r.estCost)}</div>
          <div class="cell-sub">${UI.meter(r.cost/r.estCost*100, r.cost>r.estCost?'neg':'pos')}</div>`}
      ], rows:items})})}</div>`;
};

/* ============================================================
   12. VIEW — CALENDAR
   ============================================================ */
V.calendar = () => {
  const mode=S.tab.cal||'Publishing';
  const items = mode==='Publishing' ? PUBLISHING.filter(p=>p.date) : CONTENT.filter(c=>!c.isPublished);
  const sched=PUBLISHING.filter(p=>p.status==='Scheduled');
  return pageHead('Calendar',
    `${sched.length} posts are scheduled and ${overdueContent().length} deadlines have slipped. September at a glance.`,
    `${btnExport('publishing')}<button class="btn btn-primary" data-act="schedule">${icon('plus',14)} Schedule a post</button>`)
  + UI.tabs('cal',['Publishing','Deadlines'],mode)
  + (mode==='Publishing' ? calendarGrid(items,'date','Publishing schedule') : calendarGrid(items,'deadline','Content deadlines'))
  + `<div class="grid g-3 mt-l">
      ${UI.kpi({label:'Scheduled this month', value:sched.length, sub:'across '+uniq(sched.map(s=>s.platform)).length+' platforms'})}
      ${UI.kpi({label:'Published this month', value:PUBLISHING.filter(p=>p.status==='Published'&&p.date>=monthKey(S.month)+'-01').length, sub:'live posts'})}
      ${UI.kpi({label:'Failed posts', value:PUBLISHING.filter(p=>p.status==='Failed').length, sub:'needs a retry'})}
    </div>`;
};

/* ============================================================
   13. VIEW — CONTENT LIBRARY
   ============================================================ */
V.library = () => {
  const f=S.filters, types=uniq(ASSETS.map(a=>a.type));
  const rows=ASSETS.filter(a=>
    (!f.atype||f.atype==='all'||a.type===f.atype) &&
    (!f.q||(a.name+a.tags+a.type).toLowerCase().includes(f.q.toLowerCase())));
  const icoFor=t=> t.includes('video')||t.includes('footage')?'video': t.includes('Image')||t.includes('Thumb')?'image':
    t.includes('Audio')?'audio': t.includes('Design')?'image':'file';
  return pageHead('Content library',
    `${ASSETS.length} assets with version history. Every file stays linked to the content and campaign it belongs to.`,
    `${btnExport('assets')}<button class="btn btn-primary" data-act="upload">${icon('plus',14)} Add asset</button>`)
  + UI.toolbar([
    `<span style="position:relative;flex:1;min-width:180px;max-width:280px;display:block">
      <span style="position:absolute;left:9px;top:50%;transform:translateY(-50%);color:var(--ink-4)">${icon('search',14)}</span>
      <input class="input" id="searchInput" data-input="q" placeholder="Search files and tags" value="${esc(f.q||'')}" style="padding-left:29px"></span>`,
    UI.select('atype',[{v:'all',l:'All asset types'},...types.map(t=>({v:t,l:t}))],f.atype||'all'),
    `<button class="btn btn-ghost btn-sm" data-act="clear-filters">Reset</button>`])
  + `<div class="grid g-4" style="margin-bottom:14px">
      ${UI.kpi({label:'Total assets',value:ASSETS.length,sub:uniq(ASSETS.map(a=>a.type)).length+' types'})}
      ${UI.kpi({label:'Approved',value:ASSETS.filter(a=>a.status==='Approved').length,sub:'cleared for use'})}
      ${UI.kpi({label:'Awaiting review',value:ASSETS.filter(a=>['In review','Needs revision','Draft'].includes(a.status)).length,sub:'still moving'})}
      ${UI.kpi({label:'Versions stored',value:sum(ASSETS,a=>a.version),sub:'across all files'})}
    </div>`
  + UI.card({flush:true, body:UI.table({id:'libTbl', open:r=>'asset:'+r.id, cols:[
      {k:'name',label:'File',cell:r=>`<span class="row" style="gap:9px">
        <span style="color:var(--ink-3)">${icon(icoFor(r.type),15)}</span>
        <span style="min-width:0"><span class="cell-main truncate" style="display:block">${esc(r.name)}</span>
        <span class="cell-sub">${esc(r.tags)}</span></span></span>`},
      {k:'type',label:'Type'},
      {k:'content',label:'Linked content',cell:r=>r.content?`<span class="truncate">${esc(CT[r.content].title)}</span>`:'<span class="faint">Unlinked</span>'},
      {k:'campaign',label:'Campaign',cell:r=>r.campaign?esc(cmpName(r.campaign)):'<span class="faint">—</span>'},
      {k:'creator',label:'Creator',cell:r=>UI.person(r.creator)},
      {k:'version',label:'Version',align:'r',cell:r=>`<span class="badge ghost">v${r.version}</span>`},
      {k:'status',label:'Status',cell:r=>UI.badge(r.status, r.status==='Approved'?'pos':r.status==='Needs revision'?'neg':r.status==='In review'?'warn':'neutral')},
      {k:'date',label:'Updated',align:'r',cell:r=>F.date(r.date)}
    ], rows})});
};

/* ============================================================
   14. VIEW — PUBLISHING
   ============================================================ */
V.publishing = () => {
  const f=S.filters;
  const rows=PUBLISHING.filter(p=>
    (!f.pstatus||f.pstatus==='all'||p.status===f.pstatus) &&
    (!f.plat||f.plat==='all'||p.platform===f.plat))
    .sort((a,b)=>b.date.localeCompare(a.date));
  const counts=s=>PUBLISHING.filter(p=>p.status===s).length;
  return pageHead('Publishing',
    `Every post, its account, its schedule and its result. ${counts('Failed')} post failed and needs a retry.`,
    `${btnExport('publishing')}<button class="btn btn-primary" data-act="schedule">${icon('plus',14)} Schedule a post</button>`)
  + `<div class="grid g-4" style="margin-bottom:14px">
      ${UI.kpi({label:'Published',value:counts('Published'),sub:'all time'})}
      ${UI.kpi({label:'Scheduled',value:counts('Scheduled'),sub:'queued and ready'})}
      ${UI.kpi({label:'Failed',value:counts('Failed'),sub:'retry required'})}
      ${UI.kpi({label:'Connected accounts',value:PLATFORMS.length,sub:PLATFORMS.map(p=>p.name).slice(0,3).join(', ')+'…'})}
    </div>`
  + UI.toolbar([
    UI.select('pstatus',[{v:'all',l:'All statuses'},'Published','Scheduled','Failed','Cancelled'],f.pstatus||'all'),
    UI.select('plat',[{v:'all',l:'All platforms'},...PLATFORMS.map(p=>({v:p.id,l:p.name}))],f.plat||'all'),
    `<button class="btn btn-ghost btn-sm" data-act="clear-filters">Reset</button>`])
  + UI.card({flush:true, body:UI.table({id:'pubTbl', open:r=>'content:'+r.content, cols:[
      {k:'content',label:'Content',cell:r=>`<div class="cell-main truncate">${esc(CT[r.content].title)}</div>
        <div class="cell-sub mono">${r.id}</div>`},
      {k:'platform',label:'Platform',cell:r=>`<span class="row"><i class="dot" style="background:${PLAT[r.platform].color}"></i>${PLAT[r.platform].name}</span>`},
      {k:'account',label:'Account',cell:r=>`<span class="mono t-xs dim">${esc(r.account)}</span>`},
      {k:'date',label:'Date',align:'r',cell:r=>`<div>${F.date(r.date)}</div><div class="cell-sub">${r.time}</div>`},
      {k:'hashtags',label:'Hashtags',cell:r=>`<span class="t-xs dim truncate">${esc(r.hashtags)}</span>`},
      {k:'status',label:'Status',cell:r=>UI.badge(r.status, r.status==='Published'?'pos':r.status==='Scheduled'?'violet':r.status==='Failed'?'neg':'neutral',true)},
      {k:'url',label:'Link',align:'r',sortable:false,cell:r=>r.url?`<span class="row" style="justify-content:flex-end;color:var(--accent)">${icon('ext',13)}</span>`:'<span class="faint">—</span>'},
      ...(canDelete()?[{k:'x',label:'',align:'r',sortable:false,cell:r=>
        `<span class="row" style="gap:6px;justify-content:flex-end">
          <button class="btn btn-ghost btn-sm" data-act="edit-schedule" data-id="${r.id}">Edit</button>
          <button class="btn btn-ghost btn-sm" style="color:var(--neg)" data-act="delete-publishing" data-id="${r.id}">Delete</button>
        </span>`}]:[])
    ], rows})});
};

/* ============================================================
   15. VIEW — ANALYTICS
   ============================================================ */
V.analytics = () => {
  const tab=S.tab.analytics||'Overview';
  const m=metrics(S.month), lbl=MONTHS.slice(0,S.month+1), cut=n=>SERIES[n].slice(0,S.month+1);
  const ranked=[...PUBLISHED].map(c=>({...c,score:score(c)})).sort((a,b)=>b.score-a.score);
  const head=pageHead('Analytics',
    `Performance for every published piece, scored on a weighting you control in settings.`,
    `${btnExport('performance')}<button class="btn" data-go="settings">${icon('settings',14)} Scoring</button>`)
    + UI.tabs('analytics',['Overview','Rankings','Breakdown','Compare'],tab);

  if(tab==='Overview') return head + `
    <div class="grid g-6" style="margin-bottom:14px">
      ${UI.kpi({label:'Views',value:F.numK(m.views),delta:m.dViews,spark:Chart.spark(cut('views'),'var(--violet)')})}
      ${UI.kpi({label:'Engagement rate',value:F.pct(m.engage),delta:m.dEngage,spark:Chart.spark(cut('engage'),'var(--accent)')})}
      ${UI.kpi({label:'Followers gained',value:'+'+F.num(m.followers),delta:m.dFollowers,spark:Chart.spark(cut('followers'),'var(--pos)')})}
      ${UI.kpi({label:'Average watch',value:F.secs(sum(PUBLISHED.filter(c=>c.watch),c=>c.watch)/PUBLISHED.filter(c=>c.watch).length),sub:'per video'})}
      ${UI.kpi({label:'Completion rate',value:F.pct(sum(PUBLISHED.filter(c=>c.completion),c=>c.completion)/PUBLISHED.filter(c=>c.completion).length,0),sub:'video content only'})}
      ${UI.kpi({label:'Revenue per 1k views',value:F.peso(sum(PUBLISHED,c=>c.revenue)/sum(PUBLISHED,c=>c.views)*1000,2),sub:'blended across platforms'})}
    </div>
    <div class="grid g-2">
      ${UI.card({title:'Views trend',note:'Monthly total',body:Chart.line({labels:lbl,height:180,fmt:F.numK,
        series:[{name:'Views',values:cut('views'),color:'var(--violet)'}]})})}
      ${UI.card({title:'Engagement trend',note:'Rate across all platforms',body:Chart.line({labels:lbl,height:180,fmt:n=>n.toFixed(1)+'%',
        series:[{name:'Engagement rate',values:cut('engage'),color:'var(--accent)'}]})})}
    </div>
    <div class="grid g-2 mt-l">
      ${UI.card({title:'Follower growth',note:'New followers per month',body:Chart.cols({labels:lbl,height:170,fmt:F.numK,
        series:[{name:'Followers',values:cut('followers'),color:'var(--pos)'}]})})}
      ${UI.card({title:'Performance against cost',note:'Each published piece — cost on the left, revenue on the right',
        body:Chart.hbars({rows:[...PUBLISHED].sort((a,b)=>b.revenue-a.revenue).slice(0,8).map(c=>({
          label:c.title.length>22?c.title.slice(0,22)+'…':c.title, value:c.revenue, color:PLAT[c.platform].color,
          tip:`<b>${esc(c.title)}</b><br>Revenue ${F.peso(c.revenue)}<br>Cost ${F.peso(c.cost)}<br>ROI ${F.pct(c.roi,0)}`})),
          fmt:F.pesoK})})}
    </div>`;

  if(tab==='Rankings'){
    const mini=(title,rows,fmt,key)=>UI.card({title,flush:true,body:`<div style="padding:4px 0">${rows.map((c,i)=>`
      <div class="row" style="padding:8px 16px;border-bottom:1px solid var(--line-2);gap:10px;cursor:pointer" data-open="content:${c.id}">
        <span class="rank ${i===0?'top':''}">${i+1}</span>
        <span style="min-width:0;flex:1"><span class="t-sm w5 truncate" style="display:block">${esc(c.title)}</span>
        <span class="t-xs dim">${PLAT[c.platform].name} · ${esc(c.category)}</span></span>
        <span class="num w6 t-sm">${fmt(c[key])}</span></div>`).join('')}</div>`});
    return head + `<div class="grid g-3">
      ${mini('Highest revenue',[...PUBLISHED].sort((a,b)=>b.revenue-a.revenue).slice(0,6),F.peso,'revenue')}
      ${mini('Highest profit',[...PUBLISHED].sort((a,b)=>b.profit-a.profit).slice(0,6),F.peso,'profit')}
      ${mini('Highest return on cost',[...PUBLISHED].sort((a,b)=>b.roi-a.roi).slice(0,6),v=>F.pct(v,0),'roi')}
      ${mini('Most views',[...PUBLISHED].sort((a,b)=>b.views-a.views).slice(0,6),F.numK,'views')}
      ${mini('Best engagement',[...PUBLISHED].sort((a,b)=>b.er-a.er).slice(0,6),v=>F.pct(v),'er')}
      ${mini('Fastest follower growth',[...PUBLISHED].sort((a,b)=>b.followers-a.followers).slice(0,6),v=>'+'+F.num(v),'followers')}
    </div>
    <div class="grid g-2 mt-l">
      ${UI.card({title:'Full ranking by performance score',note:`Weighted: ${Object.entries(S.weights).map(([k,v])=>k+' '+v+'%').join(' · ')}`,
        flush:true,body:UI.table({id:'rankTbl',open:r=>'content:'+r.id,cols:[
          {k:'score',label:'Score',align:'r',w:'70px',cell:r=>`<span class="w6 num">${r.score}</span>`},
          {k:'title',label:'Content',cell:r=>`<div class="cell-main truncate">${esc(r.title)}</div>
            <div class="cell-sub">${PLAT[r.platform].name} · ${F.date(r.published)}</div>`},
          {k:'views',label:'Views',align:'r',cell:r=>F.numK(r.views)},
          {k:'er',label:'Engagement',align:'r',cell:r=>F.pct(r.er)},
          {k:'revenue',label:'Revenue',align:'r',cell:r=>F.peso(r.revenue)},
          {k:'band',label:'Band',sortVal:r=>r.score,cell:r=>{const b=scoreBand(r.score);return UI.badge(b.t,b.tone,true);}}
        ],rows:ranked})})}
      ${UI.card({title:'Needs attention',note:'Lowest scoring published content',
        body:ranked.slice(-4).reverse().map(c=>`<div style="padding:10px 0;border-bottom:1px solid var(--line-2);cursor:pointer" data-open="content:${c.id}">
          <div class="row"><span class="t-sm w5 truncate">${esc(c.title)}</span>
          <span class="badge ${scoreBand(c.score).tone}" style="margin-left:auto">${c.score}</span></div>
          <div class="t-xs dim" style="margin-top:3px">${F.numK(c.views)} views · ${F.pct(c.er)} engagement · ${F.peso(c.revenue)} revenue</div>
          <div class="t-xs" style="margin-top:5px;color:var(--ink-2)">${c.er<6?'Engagement is below the 6% benchmark. The hook may be too slow.':'Reach held up but revenue did not follow. Worth revisiting the call to action.'}</div>
        </div>`).join('')})}
    </div>`;
  }

  if(tab==='Breakdown'){
    const dim=S.filters.dim||'type';
    const map={type:'Content type',category:'Category',platform:'Platform',owner:'Creator'};
    const rows=groupStats(dim).map(r=>({...r, label: dim==='platform'?PLAT[r.key].name : dim==='owner'?memName(r.key) : r.key}));
    return head + UI.toolbar([
      `<span class="label" style="align-self:center">Group by</span>`,
      UI.select('dim',Object.keys(map).map(k=>({v:k,l:map[k]})),dim,'160px')])
      + `<div class="grid g-2">
      ${UI.card({title:'Revenue by '+map[dim].toLowerCase(),body:Chart.hbars({rows:rows.map(r=>({label:r.label,value:r.revenue,
        tip:`<b>${esc(r.label)}</b><br>${r.count} pieces<br>Revenue ${F.peso(r.revenue)}<br>Cost ${F.peso(r.cost)}<br>ROI ${F.pct(r.roi,0)}`})),fmt:F.pesoK,color:'var(--accent)'})})}
      ${UI.card({title:'Return on cost by '+map[dim].toLowerCase(),body:Chart.hbars({rows:[...rows].sort((a,b)=>b.roi-a.roi).map(r=>({label:r.label,value:Math.round(r.roi),
        color:r.roi>300?'var(--pos)':'var(--ink-3)'})),fmt:v=>F.pct(v,0)})})}
      </div>
      <div class="mt-l">${UI.card({flush:true,body:UI.table({id:'dimTbl',cols:[
        {k:'label',label:map[dim],cell:r=>`<span class="cell-main">${esc(r.label)}</span>`},
        {k:'count',label:'Pieces',align:'r'},
        {k:'views',label:'Views',align:'r',cell:r=>F.numK(r.views)},
        {k:'er',label:'Engagement',align:'r',cell:r=>F.pct(r.er)},
        {k:'cost',label:'Cost',align:'r',cell:r=>F.peso(r.cost)},
        {k:'revenue',label:'Revenue',align:'r',cell:r=>F.peso(r.revenue)},
        {k:'profit',label:'Profit',align:'r',cell:r=>`<span class="w5" style="color:${r.profit>0?'var(--pos)':'var(--neg)'}">${F.peso(r.profit)}</span>`},
        {k:'roi',label:'ROI',align:'r',cell:r=>F.pct(r.roi,0)}
      ],rows})})}</div>`;
  }

  /* Compare */
  const a=CT[S.filters.cmpA]||PUBLISHED[0], b=CT[S.filters.cmpB]||PUBLISHED[1]||PUBLISHED[0];
  if(!a||!b) return head + UI.empty('Nothing to compare yet',
    'Publish at least two pieces and you can put them side by side here.');
  const line=(label,va,vb,fmt)=>{
    const better = va===vb?0:(va>vb?1:2);
    return `<div class="row" style="padding:9px 0;border-bottom:1px solid var(--line-2)">
      <span class="num w6 t-sm" style="width:33%;color:${better===1?'var(--pos)':''}">${fmt(va)}</span>
      <span class="t-sm dim" style="width:34%;text-align:center">${label}</span>
      <span class="num w6 t-sm" style="width:33%;text-align:right;color:${better===2?'var(--pos)':''}">${fmt(vb)}</span></div>`;
  };
  const opts=PUBLISHED.map(c=>({v:c.id,l:c.title}));
  return head + `<div class="grid g-2" style="margin-bottom:14px">
      ${UI.select('cmpA',opts,a.id,'100%')}${UI.select('cmpB',opts,b.id,'100%')}</div>`
    + UI.card({body:`
      <div class="row" style="align-items:flex-start;margin-bottom:12px">
        <div style="width:33%"><div class="w6 tight" style="font-size:14px">${esc(a.title)}</div>
          <div class="t-xs dim">${PLAT[a.platform].name} · ${F.date(a.published)}</div></div>
        <div style="width:34%;text-align:center" class="t-xs faint">side by side</div>
        <div style="width:33%;text-align:right"><div class="w6 tight" style="font-size:14px">${esc(b.title)}</div>
          <div class="t-xs dim">${PLAT[b.platform].name} · ${F.date(b.published)}</div></div>
      </div>
      ${line('Views',a.views,b.views,F.numK)}
      ${line('Engagement rate',a.er,b.er,v=>F.pct(v))}
      ${line('Engagements',a.engagements,b.engagements,F.numK)}
      ${line('Followers gained',a.followers,b.followers,v=>'+'+F.num(v))}
      ${line('Completion rate',a.completion,b.completion,v=>F.pct(v,0))}
      ${line('Production cost',b.cost,a.cost,F.peso).replace('33%;color:var(--pos)','33%;color:var(--pos)')}
      ${line('Revenue',a.revenue,b.revenue,F.peso)}
      ${line('Profit',a.profit,b.profit,F.peso)}
      ${line('Return on cost',a.roi,b.roi,v=>F.pct(v,0))}
      ${line('Performance score',score(a),score(b),v=>String(v))}
      <div class="note info mt-l">${a.roi>b.roi
        ? `<b>${esc(a.title)}</b> returns ${(a.roi/Math.max(b.roi,1)).toFixed(1)}× more per peso spent, even though ${b.views>a.views?'it has fewer views':'it costs less to make'}.`
        : `<b>${esc(b.title)}</b> returns ${(b.roi/Math.max(a.roi,1)).toFixed(1)}× more per peso spent. Worth repeating the format.`}</div>`});
};

/* ============================================================
   16. VIEW — PLATFORMS
   ============================================================ */
V.platforms = () => {
  const pl=byPlatform(), lbl=MONTHS.slice(0,S.month+1);
  return pageHead('Platforms',
    `Five connected accounts. ${pl[0].name} earns the most; ${[...pl].sort((a,b)=>b.roi-a.roi)[0].name} returns the most per peso.`,
    btnExport('platforms'))
  + `<div class="grid g-5" style="margin-bottom:14px">${pl.map(p=>`
      <div class="kpi clickable" data-open="platform:${p.id}">
        <div class="kpi-label"><i class="dot" style="background:${p.color}"></i>${p.name}</div>
        <div class="kpi-val sm">${F.numK(p.views)}</div>
        <div class="kpi-foot"><span class="t-xs dim">${p.count} posts · ${F.pct(p.er)} engagement</span></div>
        <div style="margin-top:9px">${UI.meter(p.views/Math.max(...pl.map(x=>x.views))*100,'accent')}</div>
        <div class="row t-xs dim" style="margin-top:7px"><span>${F.pesoK(p.revenue)}</span>
          <span style="margin-left:auto">${F.pct(p.roi,0)} ROI</span></div>
      </div>`).join('')}</div>
    <div class="grid g-2">
      ${UI.card({title:'Views by platform',body:Chart.hbars({rows:pl.map(p=>({label:p.name,value:p.views,color:p.color})),fmt:F.numK})})}
      ${UI.card({title:'Revenue and profit by platform',body:Chart.cols({labels:pl.map(p=>p.name),height:180,fmt:F.pesoK,series:[
        {name:'Revenue',values:pl.map(p=>p.revenue),color:'var(--accent)'},
        {name:'Profit',values:pl.map(p=>p.profit),color:'var(--pos)'}]})})}
    </div>
    <div class="mt-l">${UI.card({title:'Account detail',flush:true,body:UI.table({id:'platTbl',open:r=>'platform:'+r.id,cols:[
      {k:'name',label:'Platform',cell:r=>`<span class="row"><i class="dot" style="background:${r.color}"></i>
        <span><span class="cell-main">${r.name}</span><span class="cell-sub mono">${esc(r.handle)}</span></span></span>`},
      {k:'count',label:'Posts',align:'r'},
      {k:'views',label:'Views',align:'r',cell:r=>F.num(r.views)},
      {k:'engagements',label:'Engagements',align:'r',cell:r=>F.numK(r.engagements)},
      {k:'er',label:'Rate',align:'r',cell:r=>F.pct(r.er)},
      {k:'followers',label:'Followers',align:'r',cell:r=>'+'+F.num(r.followers)},
      {k:'cost',label:'Cost',align:'r',cell:r=>F.peso(r.cost)},
      {k:'revenue',label:'Revenue',align:'r',cell:r=>F.peso(r.revenue)},
      {k:'roi',label:'ROI',align:'r',cell:r=>`<span class="w5" style="color:${r.roi>300?'var(--pos)':''}">${F.pct(r.roi,0)}</span>`}
    ],rows:pl})})}</div>`;
};

/* ============================================================
   17. VIEW — CAMPAIGNS
   ============================================================ */
const cmpStats = c => {
  const items=CONTENT.filter(x=>x.campaign===c.id);
  const pub=items.filter(x=>x.isPublished);
  return {...c, items, pub:pub.length, views:sum(pub,x=>x.views), followers:sum(pub,x=>x.followers),
    profit:c.revenue-c.spent, roi:c.spent?(c.revenue-c.spent)/c.spent*100:0, util:c.budget?c.spent/c.budget*100:0,
    er: sum(pub,x=>x.views)? sum(pub,x=>x.engagements)/sum(pub,x=>x.views)*100 : 0};
};
V.campaigns = () => {
  const rows=CAMPAIGNS.map(cmpStats).sort((a,b)=>b.roi-a.roi);
  const tot={budget:sum(rows,r=>r.budget),spent:sum(rows,r=>r.spent),revenue:sum(rows,r=>r.revenue)};
  return pageHead('Campaigns',
    rows.length
      ? `${rows.length} campaign${rows.length>1?'s hold':' holds'} ${F.peso(tot.budget)} of budget. ${esc(rows[0].name)} is returning ${F.pct(rows[0].roi,0)} on spend.`
      : 'A campaign groups content under one budget and one objective. Create one before the next push.',
    `${btnExport('campaigns')}<button class="btn btn-primary" data-act="new-campaign">${icon('plus',14)} New campaign</button>`)
  + `<div class="grid g-4" style="margin-bottom:14px">
      ${UI.kpi({label:'Committed budget',value:F.peso(tot.budget),sub:F.pct(tot.spent/tot.budget*100)+' used'})}
      ${UI.kpi({label:'Campaign revenue',value:F.peso(tot.revenue),sub:'across all campaigns'})}
      ${UI.kpi({label:'Campaign profit',value:F.peso(tot.revenue-tot.spent),sub:F.pct((tot.revenue-tot.spent)/tot.spent*100,0)+' return'})}
      ${UI.kpi({label:'Active now',value:CAMPAIGNS.filter(c=>c.status==='Active').length,sub:'plus 1 completed'})}
    </div>
    <div class="grid g-3" style="margin-bottom:14px">${rows.map(c=>`
      <article class="card" style="cursor:pointer" data-open="campaign:${c.id}">
        <div class="card-body">
          <div class="row" style="margin-bottom:4px">
            ${UI.badge(c.status,c.status==='Active'?'pos':'neutral',true)}
            <span class="t-xs faint" style="margin-left:auto">${F.date(c.start)} – ${F.date(c.end)}</span></div>
          <div class="w6 tight" style="font-size:15px;margin-bottom:2px">${esc(c.name)}</div>
          <div class="t-xs dim truncate" style="margin-bottom:12px">${esc(c.objective)}</div>
          ${UI.meter(c.util, c.util>90?'neg':c.util>75?'warn':'accent')}
          <div class="row t-xs dim" style="margin-top:5px">
            <span>${F.pesoK(c.spent)} of ${F.pesoK(c.budget)}</span>
            <span style="margin-left:auto">${F.pct(c.util,0)}</span></div>
          <div class="split" style="margin-top:12px;border-top:1px solid var(--line-2)">
            <div style="padding:10px 0 0"><div class="label">Revenue</div><div class="w6 num t-sm">${F.pesoK(c.revenue)}</div></div>
            <div style="padding:10px 0 0"><div class="label">Profit</div><div class="w6 num t-sm" style="color:var(--pos)">${F.pesoK(c.profit)}</div></div>
            <div style="padding:10px 0 0"><div class="label">ROI</div><div class="w6 num t-sm">${F.pct(c.roi,0)}</div></div>
          </div>
          <div class="row" style="margin-top:12px">${UI.avStack(c.team)}
            <span class="t-xs dim" style="margin-left:auto">${c.items.length} pieces · ${c.pub} live</span></div>
        </div></article>`).join('')}</div>
    <div class="grid g-2">
      ${UI.card({title:'Spend against return',body:Chart.cols({labels:rows.map(r=>r.name.split(' ')[0]),height:180,fmt:F.pesoK,series:[
        {name:'Spent',values:rows.map(r=>r.spent),color:'var(--neg)'},
        {name:'Revenue',values:rows.map(r=>r.revenue),color:'var(--accent)'}]})})}
      ${UI.card({title:'Return on spend',body:Chart.hbars({rows:rows.map(r=>({label:r.name,value:Math.round(r.roi),
        color:r.roi>200?'var(--pos)':r.roi>50?'var(--ink-3)':'var(--warn)',
        tip:`<b>${esc(r.name)}</b><br>Spent ${F.peso(r.spent)}<br>Revenue ${F.peso(r.revenue)}<br>Profit ${F.peso(r.profit)}`})),fmt:v=>F.pct(v,0)})})}
    </div>`;
};

/* ============================================================
   18. VIEW — REPORTS
   ============================================================ */
const REPORTS = [
  {id:'daily',   name:'Daily operations report', desc:'Tasks due, stage movements and anything blocked today.', cadence:'Every weekday, 08:00', owner:'tm9'},
  {id:'weekly',  name:'Weekly content report',   desc:'Output, publishing and stage turnaround for the week.',  cadence:'Mondays, 09:00', owner:'tm2'},
  {id:'perf',    name:'Monthly performance report', desc:'Views, engagement, follower growth and top content.', cadence:'1st of the month', owner:'tm6'},
  {id:'fin',     name:'Monthly financial report', desc:'Profit and loss, cash movement and budget variance.',    cadence:'3rd of the month', owner:'tm10'},
  {id:'camp',    name:'Campaign report',          desc:'Budget, spend, revenue and return for one campaign.',    cadence:'On campaign close', owner:'tm2'},
  {id:'teamrep', name:'Team performance report',  desc:'Completion rate, turnaround and workload by person.',    cadence:'Fortnightly', owner:'tm9'},
  {id:'plat',    name:'Platform report',          desc:'Account-level reach, engagement and revenue.',           cadence:'Monthly', owner:'tm6'},
  {id:'profit',  name:'Profitability report',     desc:'Profit per content, per campaign and per platform.',     cadence:'Monthly', owner:'tm10'}
];
V.reports = () => {
  const m=metrics(S.month), sel=S.filters.report||'fin', r=REPORTS.find(x=>x.id===sel);
  const preview = {
    fin:()=>`${['Revenue','Direct costs','Gross profit','Operating expenses','Net profit'].map((l,i)=>{
      const v=[m.revenue,-m.direct,m.gross,-m.opex,m.net][i];
      return `<div class="pl-row ${i===4?'total':''}"><span class="pl-l">${l}</span><span class="pl-v"
        style="color:${v<0?'var(--neg)':''}">${F.peso(v)}</span></div>`;}).join('')}
      <div class="row t-xs dim mt-l"><span>Gross margin ${F.pct(m.grossMargin)}</span><span style="margin-left:auto">Net margin ${F.pct(m.netMargin)}</span></div>`,
    perf:()=>`<div class="grid g-3">${[['Views',F.numK(m.views)],['Engagement',F.pct(m.engage)],['Followers','+'+F.num(m.followers)],
      ['Published',m.published],['Revenue per video',F.peso(m.revPerContent)],['Cost per video',F.peso(m.costPerContent)]]
      .map(x=>`<div><div class="label">${x[0]}</div><div class="w6 num t-lg">${x[1]}</div></div>`).join('')}</div>`,
    teamrep:()=>UI.table({id:'repTeam',responsive:false,cols:[
      {k:'name',label:'Member',cell:x=>UI.person(x.id)},{k:'done',label:'Completed',align:'r'},
      {k:'onTime',label:'On time',align:'r',cell:x=>F.pct(x.onTime,0)},
      {k:'turn',label:'Turnaround',align:'r',cell:x=>x.turn+'d'},{k:'load',label:'Load',align:'r',cell:x=>x.load+'%'}],
      rows:TEAM}),
    plat:()=>UI.table({id:'repPlat',responsive:false,cols:[
      {k:'name',label:'Platform'},{k:'count',label:'Posts',align:'r'},
      {k:'views',label:'Views',align:'r',cell:x=>F.numK(x.views)},
      {k:'revenue',label:'Revenue',align:'r',cell:x=>F.peso(x.revenue)},
      {k:'roi',label:'ROI',align:'r',cell:x=>F.pct(x.roi,0)}],rows:byPlatform()})
  };
  const body = (preview[sel]||preview.perf)();
  return pageHead('Reports',
    'Standing reports assembled from the same data the dashboard reads. Filter, preview, then export.',
    `${btnPrint}${btnExport('report')}`)
  + `<div class="grid g-1-2">
      <div class="stack">
        ${UI.card({title:'Report library',flush:true,body:REPORTS.map(x=>`
          <button class="row" style="width:100%;text-align:left;padding:11px 16px;border-bottom:1px solid var(--line-2);
            background:${x.id===sel?'var(--surface-3)':'transparent'}" data-filter-set="report|${x.id}">
            <span style="min-width:0"><span class="t-sm w5 truncate" style="display:block">${x.name}</span>
            <span class="t-xs dim">${x.cadence}</span></span>
            <span style="margin-left:auto">${UI.av(x.owner,'sm')}</span></button>`).join('')})}
      </div>
      <div class="stack">
        ${UI.card({title:r.name,note:r.desc,
          actions:`<button class="btn btn-sm" data-export="report">${icon('download',13)} CSV</button>
                   <button class="btn btn-sm" data-act="print">PDF</button>`,
          body:`<div class="row wrap" style="gap:8px;margin-bottom:16px;padding-bottom:14px;border-bottom:1px solid var(--line-2)">
            ${UI.select('repPeriod',MONTHS.map((x,i)=>({v:String(i),l:x+' '+YEAR()})),String(S.month),'130px')}
            ${UI.select('repPlat',[{v:'all',l:'All platforms'},...PLATFORMS.map(p=>({v:p.id,l:p.name}))],S.filters.repPlat||'all')}
            ${UI.select('repCmp',[{v:'all',l:'All campaigns'},...CAMPAIGNS.map(c=>({v:c.id,l:c.name}))],S.filters.repCmp||'all')}
            <span class="t-xs faint" style="align-self:center">Generated ${TODAY.toLocaleDateString('en-PH',{day:'numeric',month:'long',year:'numeric'})}</span>
          </div>${body}`})}
        ${UI.card({title:'Delivery',note:'Where this report goes when it runs',
          body:`<div class="row" style="gap:10px">${UI.avStack(['tm9','tm2','tm10','tm1'])}
            <span class="t-sm dim">Sent to management and the report owner</span>
            <span class="badge ghost" style="margin-left:auto">${r.cadence}</span></div>`})}
      </div>
    </div>`;
};

/* ============================================================
   19. VIEW — TEAM
   ============================================================ */
V.team = () => {
  const f=S.filters;
  const rows=TEAM.filter(t=>(!f.dept||f.dept==='all'||t.dept===f.dept));
  return pageHead('Team',
    `${TEAM.length} people across ${DEPTS.length} departments. This view is for balancing work, not ranking people.`,
    `${btnExport('team')}<button class="btn btn-primary" data-act="new-member">${icon('plus',14)} Add member</button>`)
  + UI.toolbar([UI.select('dept',[{v:'all',l:'All departments'},...DEPTS.map(d=>({v:d,l:d}))],f.dept||'all'),
      `<span class="t-xs dim" style="align-self:center">${rows.length} shown</span>`])
  + `<div class="grid g-4" style="margin-bottom:14px">
      ${UI.kpi({label:'Tasks completed',value:sum(TEAM,t=>t.done),sub:'this year'})}
      ${UI.kpi({label:'On-time rate',value:F.pct(sum(TEAM,t=>t.onTime)/TEAM.length,0),sub:'team average'})}
      ${UI.kpi({label:'Average turnaround',value:(sum(TEAM,t=>t.turn)/TEAM.length).toFixed(1)+' days',sub:'from assignment to done'})}
      ${UI.kpi({label:'Capacity used',value:teamLoad()+'%',sub:loadBand(teamLoad()).t})}
    </div>
    <div class="grid g-4" style="margin-bottom:14px">${rows.map(t=>{const b=loadBand(t.load);
      return `<article class="card" style="cursor:pointer" data-open="member:${t.id}"><div class="card-body">
        <div class="row" style="gap:11px;margin-bottom:12px">${UI.av(t.id,'lg')}
          <div style="min-width:0"><div class="w6 truncate" style="font-size:13.8px;letter-spacing:-.015em">${t.name}</div>
          <div class="t-xs dim truncate">${t.role}</div></div></div>
        <div class="split" style="margin:0 -16px">
          <div><div class="label">Completed</div><div class="w6 num t-md">${t.done}</div></div>
          <div><div class="label">On time</div><div class="w6 num t-md">${t.onTime}%</div></div>
          <div><div class="label">Active</div><div class="w6 num t-md">${t.active}</div></div>
        </div>
        <div style="margin-top:12px">
          <div class="row t-xs" style="margin-bottom:5px"><span class="dim">Workload</span>
            <span class="w5" style="margin-left:auto;color:var(--${b.tone})">${b.t} · ${t.load}%</span></div>
          ${UI.meter(t.load,b.tone)}</div>
      </div></article>`;}).join('')}</div>
    ${UI.card({title:'Performance detail',note:'Sortable. Used for workload planning, not for ranking.',flush:true,
      body:UI.table({id:'teamTbl',open:r=>'member:'+r.id,cols:[
        {k:'name',label:'Member',cell:r=>UI.person(r.id,true)},
        {k:'dept',label:'Department'},
        {k:'done',label:'Completed',align:'r'},
        {k:'active',label:'Active',align:'r'},
        {k:'onTime',label:'On time',align:'r',cell:r=>F.pct(r.onTime,0)},
        {k:'turn',label:'Turnaround',align:'r',cell:r=>r.turn+' days'},
        {k:'load',label:'Workload',align:'r',cell:r=>`<span class="row" style="justify-content:flex-end;gap:8px">
          <span class="num w5" style="color:var(--${loadBand(r.load).tone})">${r.load}%</span>
          <span style="width:54px">${UI.meter(r.load,loadBand(r.load).tone)}</span></span>`},
        {k:'content',label:'Content owned',align:'r',sortVal:r=>CONTENT.filter(c=>c.owner===r.id).length,
          cell:r=>CONTENT.filter(c=>c.owner===r.id||c.editor===r.id).length}
      ],rows})})}`;
};

/* ============================================================
   20. VIEW — TASKS
   ============================================================ */
V.tasks = () => {
  const mine=ME.id;
  const sets={
    'All open':t=>t.status!=='Done',
    'My tasks':t=>t.assignee===mine&&t.status!=='Done',
    'Today':t=>t.status!=='Done'&&daysFrom(t.due)===0,
    'Upcoming':t=>t.status!=='Done'&&daysFrom(t.due)>0,
    'Overdue':t=>t.overdue,
    'Completed':t=>t.status==='Done'
  };
  const tab=sets[S.tab.tasks]?S.tab.tasks:'All open';
  const rows=TASKS.filter(sets[tab]).sort((a,b)=>a.due.localeCompare(b.due));
  const counts=Object.fromEntries(Object.keys(sets).map(k=>[k,TASKS.filter(sets[k]).length]));
  return pageHead('Tasks',
    `${counts['All open']} open, ${counts['Overdue']} overdue. Tasks stay linked to the content and campaign they belong to.`,
    `${btnExport('tasks')}<button class="btn btn-primary" data-act="new-task">${icon('plus',14)} New task</button>`)
  + `<div class="tabs">${Object.keys(sets).map(k=>`<button data-seg="tasks|${k}" class="${k===tab?'on':''}">${k}
      <span class="nav-count ${k==='Overdue'&&counts[k]?'alert':''}" style="margin-left:6px">${counts[k]}</span></button>`).join('')}</div>`
  + UI.card({flush:true,body:UI.table({id:'taskTbl',cols:[
      {k:'done',label:'',sortable:false,w:'34px',cell:r=>`<span class="checkbox ${r.status==='Done'?'on':''}" data-task="${r.id}">
        ${r.status==='Done'?icon('check',11):''}</span>`},
      {k:'title',label:'Task',cell:r=>`<div class="cell-main ${r.status==='Done'?'dim':''}" style="${r.status==='Done'?'text-decoration:line-through':''}">${esc(r.title)}</div>
        ${r.content?`<div class="cell-sub">${esc(CT[r.content]?CT[r.content].title:r.content)}</div>`:''}`},
      {k:'assignee',label:'Assignee',cell:r=>UI.person(r.assignee)},
      {k:'dept',label:'Department'},
      {k:'priority',label:'Priority',cell:r=>UI.prio(r.priority)},
      {k:'status',label:'Status',cell:r=>UI.badge(r.status,r.status==='Done'?'pos':r.status==='Blocked'?'neg':r.status==='In progress'?'info':'neutral',true)},
      {k:'hours',label:'Estimate',align:'r',cell:r=>F.dur(r.hours)},
      {k:'due',label:'Due',align:'r',cell:r=>`<div>${F.date(r.due)}</div>
        <div class="cell-sub" style="color:${r.overdue?'var(--neg)':''}">${r.status==='Done'?'done':relDays(r.due)}</div>`},
      ...(canDelete()?[{k:'x',label:'',align:'r',sortable:false,cell:r=>
        `<span class="row" style="gap:6px;justify-content:flex-end">
          <button class="btn btn-ghost btn-sm" data-act="edit-task" data-id="${r.id}">Edit</button>
          <button class="btn btn-ghost btn-sm" style="color:var(--neg)" data-act="delete-task" data-id="${r.id}">Delete</button>
        </span>`}]:[])
    ],rows,open:r=>r.content?'content:'+r.content:'',
      emptyTitle:'No tasks here',emptyText:'Everything in this view is clear. Pick another tab to see the rest.'})});
};

/* ============================================================
   21. VIEW — WORKLOAD
   ============================================================ */
V.workload = () => {
  const rows=[...TEAM].sort((a,b)=>b.load-a.load);
  const over=rows.filter(t=>t.load>=100), under=rows.filter(t=>t.load<75);
  const deptRows=DEPTS.map(d=>{const l=TEAM.filter(t=>t.dept===d);
    return {key:d,cap:sum(l,t=>t.capacity),alloc:sum(l,t=>t.allocated),n:l.length};}).filter(d=>d.n);
  return pageHead('Workload',
    over.length? `${over.map(t=>t.name.split(' ')[0]).join(' and ')} are over capacity while ${under.length} people have room. Moving two editing tasks would even this out.`
      : 'Everyone is inside capacity this week.',
    btnExport('workload'))
  + `<div class="grid g-4" style="margin-bottom:14px">
      ${UI.kpi({label:'Capacity allocated',value:teamLoad()+'%',sub:sum(TEAM,t=>t.allocated)+'h of '+sum(TEAM,t=>t.capacity)+'h'})}
      ${UI.kpi({label:'Over capacity',value:over.length,sub:over.map(t=>t.name.split(' ')[0]).join(', ')||'nobody'})}
      ${UI.kpi({label:'Room to take on work',value:under.length,sub:under.map(t=>t.name.split(' ')[0]).join(', ')})}
      ${UI.kpi({label:'Unassigned hours',value:F.dur(sum(openTasks().filter(t=>!t.assignee),t=>t.hours)||0),sub:'everything has an owner'})}
    </div>
    <div class="grid g-2-1">
      ${UI.card({title:'Person by person',note:'Allocated hours against a 40-hour week',body:rows.map(t=>{
        const b=loadBand(t.load);
        return `<div style="padding:9px 0;border-bottom:1px solid var(--line-2);cursor:pointer" data-open="member:${t.id}">
          <div class="row" style="gap:10px;margin-bottom:6px">${UI.av(t.id)}
            <span style="min-width:0"><span class="t-sm w5 truncate" style="display:block">${t.name}</span>
            <span class="t-xs dim">${t.role}</span></span>
            <span class="badge ${b.tone}" style="margin-left:auto">${b.t}</span>
            <span class="num w6 t-sm" style="width:44px;text-align:right">${t.load}%</span></div>
          ${UI.meter(t.load,b.tone,100)}
          <div class="row t-xs faint" style="margin-top:4px"><span>${t.allocated}h allocated · ${t.active} active tasks</span>
            <span style="margin-left:auto">${t.capacity}h capacity</span></div></div>`;}).join('')})}
      ${UI.card({title:'By department',body:deptRows.map(d=>{
        const pct=Math.round(d.alloc/d.cap*100), b=loadBand(pct);
        return `<div style="padding:9px 0;border-bottom:1px solid var(--line-2)">
          <div class="row"><span class="t-sm w5">${d.key}</span>
            <span class="t-xs dim" style="margin-left:auto">${d.n} ${d.n>1?'people':'person'}</span>
            <span class="num w6 t-sm" style="width:42px;text-align:right;color:var(--${b.tone})">${pct}%</span></div>
          <div style="margin-top:6px">${UI.meter(pct,b.tone,100)}</div></div>`;}).join('')})}
    </div>
    <div class="mt-l">${UI.card({title:'Suggested moves',note:'Rebalancing that would clear the queue fastest',
      body:(()=>{
        const over  = [...TEAM].filter(t=>t.load>100).sort((a,b)=>b.load-a.load);
        const free  = [...TEAM].filter(t=>t.load<80).sort((a,b)=>a.load-b.load);
        const line=(tone,icn,txt)=>`<div class="insight"><span class="insight-i" style="color:var(--${tone})">${icon(icn,14)}</span>
          <span class="insight-t">${txt}</span></div>`;
        if(!TEAM.length) return UI.empty('No team yet','Add the people you work with and their weekly capacity, and this will show who has room.');
        if(!over.length)  return line('pos','checkC',`Everyone is inside capacity. Nothing needs moving this week.`);
        const out = over.map(t=>{
          const job = TASKS.filter(x=>x.assignee===t.id && x.status!=='Done')
                           .sort((a,b)=>(b.hours||0)-(a.hours||0))[0];
          const to  = free[0];
          return job && to
            ? line('warn','alert',`Move <b>${esc(job.title)}</b> from ${esc(t.name.split(' ')[0])} to ${esc(to.name.split(' ')[0])} — frees ${job.hours||0} hours and brings ${esc(t.name.split(' ')[0])} back under capacity.`)
            : line('warn','alert',`${esc(t.name.split(' ')[0])} is at ${t.load}% with nobody obviously free to take work on. Either move a deadline or bring in help.`);
        }).join('');
        return out + (free.length ? line('pos','checkC',
          `${free.slice(0,2).map(t=>esc(t.name.split(' ')[0])).join(' and ')} ${free.length>1?'have':'has'} room this week.`) : '');
      })()})}</div>`;
};

/* ============================================================
   22. VIEW — GOALS AND KPIs
   ============================================================ */
V.goals = () => {
  const fmt=(g,v)=>({peso:F.peso,num:F.num,numK:F.numK,pct:x=>F.pct(x)})[g.fmt](v);
  const onTrack=GOALS.filter(g=>g.pct>=100).length;
  return pageHead('Goals and KPIs',
    `${onTrack} of ${GOALS.length} targets met with ${30-11} days of September behind us. Targets are set monthly and reviewed on the first Monday.`,
    `${btnExport('goals')}<button class="btn btn-primary" data-act="new-goal">${icon('plus',14)} Set a target</button>`)
  + `<div class="grid g-2" style="margin-bottom:14px">
      ${UI.card({title:'September at a glance',body:`<div class="grid g-3">
        ${[['Targets met',onTrack+' of '+GOALS.length],['Average achievement',F.pct(sum(GOALS,g=>Math.min(g.pct,150))/GOALS.length,0)],
           ['Behind target',GOALS.filter(g=>g.pct<100).length]].map(x=>
          `<div><div class="label">${x[0]}</div><div class="w6 num" style="font-size:19px">${x[1]}</div></div>`).join('')}</div>`})}
      ${UI.card({title:'Revenue pacing',note:'Actual against the monthly target',body:
        Chart.line({labels:MONTHS,height:110,fmt:F.pesoK,yTicks:2,series:[
          {name:'Revenue',values:SERIES.revenue,color:'var(--accent)'},
          {name:'Target',values:MONTHS.map((_,i)=>[70000,85000,100000,120000,140000,170000,190000,220000,200000][i]),color:'var(--ink-4)',area:false,dash:true}]})})}
    </div>
    <div class="grid g-2">${GOALS.map(g=>{
      const done=g.pct>=100, tone=done?'pos':g.pct>=80?'warn':'neg';
      return `<article class="card"><div class="card-body">
        <div class="row" style="margin-bottom:10px">
          <div><div class="w6 tight" style="font-size:14px">${g.name}</div>
            <div class="t-xs dim">Owned by ${g.owner}${g.inverse?' · lower is better':''}</div></div>
          <span class="badge ${tone}" style="margin-left:auto">${F.pct(g.pct,0)}</span></div>
        <div class="row" style="align-items:baseline;gap:8px;margin-bottom:9px">
          <span class="num w7 tight" style="font-size:22px">${fmt(g,g.actual)}</span>
          <span class="t-sm dim">of ${fmt(g,g.target)}</span>
          <span class="delta ${done?'up':'down'}" style="margin-left:auto">${g.variance>0?'+':''}${fmt(g,Math.abs(g.variance)).replace('₱','₱')}</span></div>
        ${UI.meter(Math.min(g.pct,100),tone)}
        <div class="t-xs dim" style="margin-top:7px">${done? 'Target met. Holding this pace clears the quarter.'
          : `${fmt(g,Math.abs(g.variance))} to go — roughly ${Math.ceil(Math.abs(g.variance)/(g.actual/11))} days at the current run rate.`}</div>
        ${canDelete()?`<div class="row" style="gap:6px;margin-top:10px">
          <button class="btn btn-ghost btn-sm" data-act="edit-goal" data-id="${g.id}">Edit</button>
          <button class="btn btn-ghost btn-sm" style="color:var(--neg)" data-act="delete-goal" data-id="${g.id}">Delete</button>
        </div>`:''}
      </div></article>`;}).join('')}</div>`;
};

/* ============================================================
   23. VIEW — REVENUE
   ============================================================ */
V.revenue = () => {
  const f=S.filters, mk=monthKey(S.month);
  const inMonth=REVENUE.filter(r=>r.month===mk);
  const rows=REVENUE.filter(r=>
    (!f.rsource||f.rsource==='all'||r.source===f.rsource) &&
    (!f.rstatus||f.rstatus==='all'||r.status===f.rstatus) &&
    (f.rall==='1' || r.month===mk)).sort((a,b)=>b.date.localeCompare(a.date));
  const bySource=Object.entries(by(REVENUE,'source')).map(([k,v])=>({key:k,value:sum(v,x=>x.amount)})).sort((a,b)=>b.value-a.value);
  const colors=['var(--accent)','var(--pos)','var(--violet)','var(--warn)','var(--neg)','var(--ink-3)','var(--ink-4)'];
  const m=metrics(S.month);
  const statusTone=s=>({Paid:'pos',Invoiced:'info','Partially paid':'warn',Overdue:'neg',Pending:'neutral',Cancelled:'neutral'})[s]||'neutral';
  return pageHead('Revenue',
    `${F.peso(m.revenue)} recognised in ${MONTHS[S.month]}, ${F.peso(m.ar)} still outstanding across ${REVENUE.filter(r=>r.status!=='Paid').length} invoices.`,
    `${btnExportXL('revenue')}<button class="btn btn-primary" data-act="new-revenue">${icon('plus',14)} Record revenue</button>`)
  + `<div class="grid g-5" style="margin-bottom:14px">
      ${UI.kpi({label:MONTHS[S.month]+' revenue',value:F.peso(m.revenue),delta:m.dRevenue,spark:Chart.spark(SERIES.revenue.slice(0,S.month+1),'var(--accent)')})}
      ${UI.kpi({label:'Year to date',value:F.peso(YTD().revenue),sub:'nine months of trading'})}
      ${UI.kpi({label:'Collected',value:F.peso(sum(REVENUE.filter(r=>r.status==='Paid'),r=>r.amount)),sub:'cash received'})}
      ${UI.kpi({label:'Outstanding',value:F.peso(m.ar),sub:REVENUE.filter(r=>['Invoiced','Partially paid'].includes(r.status)).length+' open invoices'})}
      ${UI.kpi({label:'Overdue',value:F.peso(sum(REVENUE.filter(r=>r.status==='Overdue'),r=>r.amount)),sub:'chase today'})}
    </div>
    <div class="grid g-2" style="margin-bottom:14px">
      ${UI.card({title:'Revenue by source',note:'All time',body:`<div class="donut-wrap">
        ${Chart.donut({slices:bySource.map((s,i)=>({label:s.key,value:s.value,color:colors[i%colors.length]})),
          center:F.pesoK(sum(bySource,s=>s.value)),sub:'total booked'})}
        <div style="flex:1;min-width:190px">${bySource.map((s,i)=>`<div class="row" style="padding:5px 0;border-bottom:1px solid var(--line-2)">
          <i class="legend-swatch" style="background:${colors[i%colors.length]}"></i><span class="t-sm truncate">${esc(s.key)}</span>
          <span class="t-sm num w5" style="margin-left:auto">${F.pesoK(s.value)}</span></div>`).join('')}</div></div>`})}
      ${UI.card({title:'Monthly revenue',note:String(YEAR()),body:Chart.cols({labels:MONTHS,height:190,fmt:F.pesoK,
        series:[{name:'Revenue',values:SERIES.revenue,color:'var(--accent)'}]})})}
    </div>`
  + UI.toolbar([
      UI.select('rsource',[{v:'all',l:'All sources'},...uniq(REVENUE.map(r=>r.source)).map(s=>({v:s,l:s}))],f.rsource||'all'),
      UI.select('rstatus',[{v:'all',l:'All statuses'},'Paid','Invoiced','Partially paid','Overdue'],f.rstatus||'all'),
      UI.select('rall',[{v:'0',l:MONTHS[S.month]+' only'},{v:'1',l:'All months'}],f.rall||'0'),
      `<button class="btn btn-ghost btn-sm" data-act="clear-filters">Reset</button>`])
  + UI.card({flush:true,body:UI.table({id:'revTbl',open:r=>'revenue:'+r.id,cols:[
      {k:'date',label:'Date',cell:r=>F.date(r.date),w:'84px'},
      {k:'client',label:'Customer',cell:r=>`<div class="cell-main truncate">${esc(r.client)}</div><div class="cell-sub">${esc(r.source)}</div>`},
      {k:'campaign',label:'Campaign',cell:r=>r.campaign?esc(cmpName(r.campaign)):'<span class="faint">—</span>'},
      {k:'content',label:'Content',cell:r=>r.content?`<span class="truncate">${esc(CT[r.content].title)}</span>`:'<span class="faint">—</span>'},
      {k:'platform',label:'Platform',cell:r=>`<span class="row"><i class="dot" style="background:${PLAT[r.platform].color}"></i>${PLAT[r.platform].name}</span>`},
      {k:'invoice',label:'Invoice',cell:r=>`<span class="mono t-xs dim">${r.invoice}</span>`},
      {k:'status',label:'Status',cell:r=>UI.badge(r.status,statusTone(r.status),true)},
      {k:'amount',label:'Amount',align:'r',cell:r=>`<span class="w6">${F.peso(r.amount)}</span>`}
    ],rows,foot:`<td colspan="7">Total in view</td><td class="r">${F.peso(sum(rows,r=>r.amount))}</td>`})});
};

/* ============================================================
   24. VIEW — EXPENSES
   ============================================================ */
V.expenses = () => {
  const f=S.filters, mk=monthKey(S.month);
  const rows=EXPENSES.filter(e=>
    (!f.ecat||f.ecat==='all'||e.category===f.ecat) &&
    (!f.edept||f.edept==='all'||e.dept===f.edept) &&
    (f.eall==='1'||e.month===mk)).sort((a,b)=>b.date.localeCompare(a.date));
  const monthRows=EXPENSES.filter(e=>e.month===mk);
  const cats=Object.entries(by(monthRows,'category')).map(([k,v])=>({key:k,value:sum(v,x=>x.amount)})).sort((a,b)=>b.value-a.value);
  const m=metrics(S.month);
  return pageHead('Expenses',
    `${F.peso(m.expenses)} spent in ${MONTHS[S.month]} — ${F.peso(m.direct)} directly on content, ${F.peso(m.opex)} on running the studio.`,
    `${btnExportXL('expenses')}<button class="btn btn-primary" data-act="new-expense">${icon('plus',14)} Record expense</button>`)
  + `<div class="grid g-5" style="margin-bottom:14px">
      ${UI.kpi({label:MONTHS[S.month]+' spend',value:F.peso(m.expenses),delta:m.dExpenses,deltaOpts:{invert:true},
        spark:Chart.spark(SERIES.expenses.slice(0,S.month+1),'var(--neg)')})}
      ${UI.kpi({label:'Direct production',value:F.peso(m.direct),sub:F.pct(m.direct/m.expenses*100,0)+' of spend'})}
      ${UI.kpi({label:'Operating',value:F.peso(m.opex),sub:F.pct(m.opex/m.expenses*100,0)+' of spend'})}
      ${UI.kpi({label:'Recurring',value:F.peso(sum(monthRows.filter(e=>e.recurrence==='Recurring'),e=>e.amount)),sub:'fixed monthly commitments'})}
      ${UI.kpi({label:'Awaiting approval',value:F.peso(sum(monthRows.filter(e=>e.approval==='Pending'),e=>e.amount)),
        sub:monthRows.filter(e=>e.approval==='Pending').length+' items'})}
    </div>
    <div class="grid g-2" style="margin-bottom:14px">
      ${UI.card({title:'Spend by category',note:MONTHS[S.month]+' '+YEAR(),body:Chart.hbars({rows:cats.map(c=>({label:c.key,value:c.value,
        color:['Production','Freelancers','Transportation','Food'].includes(c.key)?'var(--warn)':'var(--ink-3)',
        tip:`<b>${esc(c.key)}</b><br>${F.peso(c.value)}<br>${F.pct(c.value/sum(cats,x=>x.value)*100,0)} of month spend`})),fmt:F.pesoK})
        +`<div class="row t-xs dim" style="margin-top:12px;padding-top:10px;border-top:1px solid var(--line-2)">
          <span><i class="legend-swatch" style="background:var(--warn);display:inline-block;margin-right:5px"></i>Direct content cost</span>
          <span style="margin-left:auto"><i class="legend-swatch" style="background:var(--ink-3);display:inline-block;margin-right:5px"></i>Operating cost</span></div>`})}
      ${UI.card({title:'Direct against operating',note:'Monthly split',body:Chart.cols({labels:MONTHS,height:190,fmt:F.pesoK,mode:'stack',
        series:[{name:'Direct',values:SERIES.direct,color:'var(--warn)'},{name:'Operating',values:SERIES.opex,color:'var(--ink-3)'}]})})}
    </div>`
  + UI.toolbar([
      UI.select('ecat',[{v:'all',l:'All categories'},...uniq(EXPENSES.map(e=>e.category)).map(c=>({v:c,l:c}))],f.ecat||'all'),
      UI.select('edept',[{v:'all',l:'All departments'},...uniq(EXPENSES.map(e=>e.dept)).map(d=>({v:d,l:d}))],f.edept||'all'),
      UI.select('eall',[{v:'0',l:MONTHS[S.month]+' only'},{v:'1',l:'All months'}],f.eall||'0'),
      `<button class="btn btn-ghost btn-sm" data-act="clear-filters">Reset</button>`])
  + UI.card({flush:true,body:UI.table({id:'expTbl',open:r=>'expense:'+r.id,cols:[
      {k:'date',label:'Date',cell:r=>F.date(r.date),w:'84px'},
      {k:'description',label:'Description',cell:r=>`<div class="cell-main truncate">${esc(r.description)}</div><div class="cell-sub">${esc(r.vendor)}</div>`},
      {k:'category',label:'Category',cell:r=>UI.badge(r.category,r.direct?'warn':'neutral')},
      {k:'dept',label:'Department'},
      {k:'campaign',label:'Campaign',cell:r=>r.campaign?esc(cmpName(r.campaign)):'<span class="faint">—</span>'},
      {k:'method',label:'Method',cell:r=>`<span class="t-xs dim">${esc(r.method)}</span>`},
      {k:'recurrence',label:'Type',cell:r=>UI.badge(r.recurrence,'ghost')},
      {k:'approval',label:'Approval',cell:r=>UI.badge(r.approval,r.approval==='Approved'?'pos':'warn',true)},
      {k:'amount',label:'Amount',align:'r',cell:r=>`<span class="w6">${F.peso(r.amount)}</span>`}
    ],rows,foot:`<td colspan="8">Total in view</td><td class="r">${F.peso(sum(rows,r=>r.amount))}</td>`})});
};

/* ============================================================
   25. VIEW — PRODUCTION COSTS
   ============================================================ */
V.costs = () => {
  const rows=CONTENT.filter(c=>c.cost>0).sort((a,b)=>b.cost-a.cost);
  const m=metrics(S.month);
  const lineTotals=COST_LINES.map(l=>({key:l,value:sum(CONTENT,c=>sum(c.costLines.filter(x=>x.label===l),x=>x.amount))}))
    .filter(x=>x.value).sort((a,b)=>b.value-a.value);
  const byType=groupStats('type');
  return pageHead('Production costs',
    `Every peso spent making content, attached to the piece it belongs to. Average cost per published video is ${F.peso(sum(PUBLISHED,c=>c.cost)/PUBLISHED.length)}.`,
    `${btnExportXL('costs')}<button class="btn btn-primary" data-act="new-expense">${icon('plus',14)} Log a cost</button>`)
  + `<div class="grid g-4" style="margin-bottom:14px">
      ${UI.kpi({label:'Total production cost',value:F.peso(sum(CONTENT,c=>c.cost)),sub:'all content to date'})}
      ${UI.kpi({label:'Cost per published video',value:F.peso(sum(PUBLISHED,c=>c.cost)/PUBLISHED.length),delta:m.dCost,deltaOpts:{invert:true},
        sub:'ceiling is ₱7,500'})}
      ${UI.kpi({label:'Revenue per video',value:F.peso(sum(PUBLISHED,c=>c.revenue)/PUBLISHED.length),sub:'published content only'})}
      ${UI.kpi({label:'Profit per video',value:F.peso(sum(PUBLISHED,c=>c.profit)/PUBLISHED.length),
        sub:F.pct(sum(PUBLISHED,c=>c.profit)/sum(PUBLISHED,c=>c.cost)*100,0)+' return'})}
    </div>
    <div class="grid g-2" style="margin-bottom:14px">
      ${UI.card({title:'What the money goes on',note:'Cost lines across all content',body:Chart.hbars({
        rows:lineTotals.map(l=>({label:l.key,value:l.value,color:'var(--warn)'})),fmt:F.pesoK})})}
      ${UI.card({title:'Cost against return by content type',body:Chart.cols({labels:byType.map(t=>t.key.replace(' video','')),height:180,fmt:F.pesoK,
        series:[{name:'Cost',values:byType.map(t=>t.cost),color:'var(--warn)'},
                {name:'Revenue',values:byType.map(t=>t.revenue),color:'var(--accent)'}]})
        +(byType.length
          ? `<div class="note mt-l">${esc(byType.sort((a,b)=>b.roi-a.roi)[0].key)} returns ${F.pct(byType[0].roi,0)} on cost — the strongest format the studio makes right now.</div>`
          : `<div class="note mt-l">Log costs against a video and this will tell you which formats earn back the most per peso.</div>`)})}
    </div>`
  + UI.card({title:'Cost per piece',note:'Estimate against actual, with the return each piece produced',flush:true,
      body:UI.table({id:'costTbl',open:r=>'content:'+r.id,cols:[
        {k:'title',label:'Content',cell:r=>`<div class="cell-main truncate">${esc(r.title)}</div><div class="cell-sub mono">${r.id} · ${esc(r.type)}</div>`},
        {k:'status',label:'Stage',cell:r=>UI.stage(r.status)},
        {k:'estCost',label:'Estimate',align:'r',cell:r=>F.peso(r.estCost)},
        {k:'cost',label:'Actual',align:'r',cell:r=>`<span class="w6">${F.peso(r.cost)}</span>`},
        {k:'var',label:'Variance',align:'r',sortVal:r=>r.estCost-r.cost,cell:r=>{const v=r.estCost-r.cost;
          return `<span class="w5" style="color:${v<0?'var(--neg)':'var(--pos)'}">${v>0?'+':''}${F.peso(v)}</span>`;}},
        {k:'revenue',label:'Revenue',align:'r',cell:r=>r.revenue?F.peso(r.revenue):'<span class="faint">not live</span>'},
        {k:'profit',label:'Gross profit',align:'r',cell:r=>r.revenue?`<span class="w5" style="color:${r.profit>0?'var(--pos)':'var(--neg)'}">${F.peso(r.profit)}</span>`:'<span class="faint">—</span>'},
        {k:'roi',label:'ROI',align:'r',cell:r=>r.revenue?F.pct(r.roi,0):'<span class="faint">—</span>'}
      ],rows,foot:`<td colspan="2">Totals</td><td class="r">${F.peso(sum(rows,r=>r.estCost))}</td>
        <td class="r">${F.peso(sum(rows,r=>r.cost))}</td><td class="r">${F.peso(sum(rows,r=>r.estCost-r.cost))}</td>
        <td class="r">${F.peso(sum(rows,r=>r.revenue))}</td><td class="r">${F.peso(sum(rows,r=>r.revenue?r.profit:0))}</td>
        <td class="r">${F.pct(sum(rows,r=>r.revenue?r.profit:0)/sum(rows,r=>r.cost)*100,0)}</td>`})});
};

/* ============================================================
   26. VIEW — BUDGET
   ============================================================ */
V.budget = () => {
  const f=S.filters;
  const rows=BUDGETS.filter(b=>!f.btype||f.btype==='all'||b.type===f.btype).sort((a,b)=>b.util-a.util);
  const tot={budget:sum(BUDGETS,b=>b.budget),actual:sum(BUDGETS,b=>b.actual)};
  const risky=BUDGETS.filter(b=>b.util>=90);
  return pageHead('Budget',
    risky.length? `${risky.length} ${risky.length>1?'budgets are':'budget is'} above 90% used. ${risky[0].name} has ${F.peso(risky[0].remaining)} left.`
      : 'Every budget is inside its limit.',
    `${btnExportXL('budget')}<button class="btn btn-primary" data-act="new-budget">${icon('plus',14)} Create budget</button>`)
  + `<div class="grid g-4" style="margin-bottom:14px">
      ${UI.kpi({label:'Total budgeted',value:F.peso(tot.budget),sub:BUDGETS.length+' budget lines'})}
      ${UI.kpi({label:'Actual spend',value:F.peso(tot.actual),sub:F.pct(tot.actual/tot.budget*100)+' used'})}
      ${UI.kpi({label:'Remaining',value:F.peso(tot.budget-tot.actual),sub:'available to commit'})}
      ${UI.kpi({label:'Above 90% used',value:risky.length,sub:risky.map(r=>r.name).join(', ').slice(0,34)||'none'})}
    </div>`
  + UI.toolbar([UI.select('btype',[{v:'all',l:'All budget types'},'Monthly','Quarterly','Campaign'],f.btype||'all')])
  + `<div class="grid g-3" style="margin-bottom:14px">${rows.map(b=>{
      const tone=b.util>=95?'neg':b.util>=85?'warn':'pos';
      return `<article class="card"><div class="card-body">
        <div class="row" style="margin-bottom:9px">
          <span class="badge ghost">${b.type}</span>
          <span class="t-xs faint" style="margin-left:auto">${b.period}</span></div>
        <div class="w6 tight" style="font-size:14.5px">${esc(b.name)}</div>
        <div class="t-xs dim" style="margin-bottom:12px">${b.dept}</div>
        <div class="row" style="align-items:baseline;gap:7px;margin-bottom:9px">
          <span class="num w7 tight" style="font-size:20px;color:var(--${tone==='pos'?'ink':tone})">${F.pct(b.util)}</span>
          <span class="t-xs dim">used</span>
          <span class="badge ${tone}" style="margin-left:auto">${tone==='neg'?'At limit':tone==='warn'?'Watch':'On track'}</span></div>
        ${UI.meter(b.util,tone,100)}
        <div class="split" style="margin:12px -16px 0">
          <div><div class="label">Budget</div><div class="w6 num t-sm">${F.pesoK(b.budget)}</div></div>
          <div><div class="label">Actual</div><div class="w6 num t-sm">${F.pesoK(b.actual)}</div></div>
          <div><div class="label">Left</div><div class="w6 num t-sm" style="color:var(--${b.remaining<b.budget*0.1?'neg':'pos'})">${F.pesoK(b.remaining)}</div></div>
        </div></div></article>`;}).join('')}</div>
    ${UI.card({title:'Budget against actual',note:'Every line, sorted by utilisation',flush:true,
      body:UI.table({id:'budTbl',cols:[
        {k:'name',label:'Budget',cell:r=>`<div class="cell-main">${esc(r.name)}</div><div class="cell-sub">${r.dept} · ${r.period}</div>`},
        {k:'type',label:'Type',cell:r=>UI.badge(r.type,'ghost')},
        {k:'budget',label:'Budget',align:'r',cell:r=>F.peso(r.budget)},
        {k:'actual',label:'Actual',align:'r',cell:r=>F.peso(r.actual)},
        {k:'remaining',label:'Remaining',align:'r',cell:r=>`<span style="color:${r.remaining<0?'var(--neg)':''}">${F.peso(r.remaining)}</span>`},
        {k:'variance',label:'Variance',align:'r',sortVal:r=>r.remaining,cell:r=>`<span class="w5" style="color:${r.remaining<0?'var(--neg)':'var(--pos)'}">${r.remaining>=0?'under':'over'} by ${F.peso(Math.abs(r.remaining))}</span>`},
        {k:'util',label:'Utilisation',align:'r',cell:r=>`<span class="row" style="justify-content:flex-end;gap:8px">
          <span class="num w5">${F.pct(r.util)}</span><span style="width:60px">${UI.meter(r.util,r.util>=95?'neg':r.util>=85?'warn':'pos')}</span></span>`},
        ...(canDelete()?[{k:'x',label:'',align:'r',sortable:false,cell:r=>
          `<span class="row" style="gap:6px;justify-content:flex-end">
            <button class="btn btn-ghost btn-sm" data-act="edit-budget" data-id="${r.id}">Edit</button>
            <button class="btn btn-ghost btn-sm" style="color:var(--neg)" data-act="delete-budget" data-id="${r.id}">Delete</button>
          </span>`}]:[])
      ],rows,foot:`<td colspan="2">Totals</td><td class="r">${F.peso(tot.budget)}</td><td class="r">${F.peso(tot.actual)}</td>
        <td class="r">${F.peso(tot.budget-tot.actual)}</td><td></td><td class="r">${F.pct(tot.actual/tot.budget*100)}</td>${canDelete()?'<td></td>':''}`})})}`;
};

/* ============================================================
   27. VIEW — PROFITABILITY
   ============================================================ */
V.profitability = () => {
  const m=metrics(S.month), y=YTD();
  const cmps=CAMPAIGNS.map(cmpStats).sort((a,b)=>b.profit-a.profit);
  const pl=byPlatform(), types=groupStats('type'), cats=groupStats('category');
  const rank=(title,rows,valFmt,key,sub)=>UI.card({title,note:sub,flush:true,body:`<div style="padding:4px 0">${rows.map((r,i)=>`
    <div class="row" style="padding:8px 16px;border-bottom:1px solid var(--line-2);gap:10px">
      <span class="rank ${i===0?'top':''}">${i+1}</span>
      <span class="t-sm truncate" style="flex:1">${esc(r.label)}</span>
      <span class="num w6 t-sm">${valFmt(r[key])}</span></div>`).join('')}</div>`});
  return pageHead('Profitability',
    cmps.length && types.length
      ? `Where the money is actually made. ${esc(cmps[0].name)} produced ${F.peso(cmps[0].profit)} of profit; ${types[0].key.toLowerCase()} is the most profitable format.`
      : 'Where the money is actually made. Once content has both a cost and some income against it, the rankings build themselves here.',
    btnExportXL('profitability'))
  + `<div class="grid g-6" style="margin-bottom:14px">
      ${UI.kpi({label:'Revenue',value:F.peso(m.revenue),small:true,delta:m.dRevenue})}
      ${UI.kpi({label:'Direct cost',value:F.peso(m.direct),small:true,sub:F.pct(m.direct/m.revenue*100,0)+' of revenue'})}
      ${UI.kpi({label:'Gross profit',value:F.peso(m.gross),small:true,sub:F.pct(m.grossMargin)+' margin'})}
      ${UI.kpi({label:'Operating cost',value:F.peso(m.opex),small:true,sub:F.pct(m.opex/m.revenue*100,0)+' of revenue'})}
      ${UI.kpi({label:'Net profit',value:F.peso(m.net),small:true,sub:F.pct(m.netMargin)+' margin'})}
      ${UI.kpi({label:'Return on spend',value:F.pct(m.roi,0),small:true,sub:'per peso of direct cost'})}
    </div>
    <div class="grid g-2" style="margin-bottom:14px">
      ${UI.card({title:'Margin over time',note:'Gross and net margin by month',body:Chart.line({labels:MONTHS,height:180,fmt:v=>v.toFixed(0)+'%',
        series:[{name:'Gross margin',values:SERIES.revenue.map((r,i)=>(r-SERIES.direct[i])/r*100),color:'var(--pos)'},
                {name:'Net margin',values:SERIES.revenue.map((r,i)=>(r-SERIES.direct[i]-SERIES.opex[i])/r*100),color:'var(--accent)',area:false}]})
        +`<div class="legend" style="margin-top:12px"><span class="legend-item"><i class="legend-swatch" style="background:var(--pos)"></i>Gross margin</span>
          <span class="legend-item"><i class="legend-swatch" style="background:var(--accent)"></i>Net margin</span></div>`})}
      ${UI.card({title:'Profit build-up',note:MONTHS[S.month]+' '+YEAR(),body:`
        <div class="pl-row"><span class="pl-l">Revenue</span><span class="pl-v">${F.peso(m.revenue)}</span></div>
        <div class="pl-row sub"><span class="pl-l">Direct production cost</span><span class="pl-v" style="color:var(--neg)">−${F.peso(m.direct)}</span></div>
        <div class="pl-row total"><span class="pl-l">Gross profit</span><span class="pl-v">${F.peso(m.gross)}</span></div>
        <div class="pl-row sub"><span class="pl-l">Operating expenses</span><span class="pl-v" style="color:var(--neg)">−${F.peso(m.opex)}</span></div>
        <div class="pl-row total"><span class="pl-l">Net profit</span><span class="pl-v" style="color:var(--pos)">${F.peso(m.net)}</span></div>
        <div class="row t-xs dim" style="margin-top:12px"><span>Gross margin ${F.pct(m.grossMargin)}</span>
          <span style="margin-left:auto">Net margin ${F.pct(m.netMargin)}</span></div>`})}
    </div>
    <div class="grid g-3" style="margin-bottom:14px">
      ${rank('Top content by profit',[...PUBLISHED].sort((a,b)=>b.profit-a.profit).slice(0,6).map(c=>({label:c.title,profit:c.profit})),F.peso,'profit','Revenue less direct cost')}
      ${rank('Top campaigns by profit',cmps.slice(0,6).map(c=>({label:c.name,profit:c.profit})),F.peso,'profit','After campaign spend')}
      ${rank('Top platforms by return',[...pl].sort((a,b)=>b.roi-a.roi).map(p=>({label:p.name,roi:p.roi})),v=>F.pct(v,0),'roi','Profit per peso of cost')}
    </div>
    <div class="grid g-2">
      ${UI.card({title:'Profitability by content type',flush:true,body:UI.table({id:'profType',cols:[
        {k:'key',label:'Type'},{k:'count',label:'Pieces',align:'r'},
        {k:'cost',label:'Cost',align:'r',cell:r=>F.peso(r.cost)},
        {k:'revenue',label:'Revenue',align:'r',cell:r=>F.peso(r.revenue)},
        {k:'profit',label:'Profit',align:'r',cell:r=>`<span class="w5" style="color:var(--pos)">${F.peso(r.profit)}</span>`},
        {k:'roi',label:'ROI',align:'r',cell:r=>F.pct(r.roi,0)}],rows:types})})}
      ${UI.card({title:'Profitability by category',flush:true,body:UI.table({id:'profCat',cols:[
        {k:'key',label:'Category'},{k:'count',label:'Pieces',align:'r'},
        {k:'cost',label:'Cost',align:'r',cell:r=>F.peso(r.cost)},
        {k:'revenue',label:'Revenue',align:'r',cell:r=>F.peso(r.revenue)},
        {k:'profit',label:'Profit',align:'r',cell:r=>`<span class="w5" style="color:var(--pos)">${F.peso(r.profit)}</span>`},
        {k:'roi',label:'ROI',align:'r',cell:r=>F.pct(r.roi,0)}],rows:cats})})}
    </div>`;
};

/* ============================================================
   28. VIEW — FINANCIAL REPORTS
   ============================================================ */
V.financials = () => {
  const m=metrics(S.month), y=YTD(), tab=S.tab.fin||'Profit and loss';
  const cashSeries=SERIES.cashIn.map((_,i)=>FIN.openingCash+sum(SERIES.cashIn.slice(0,i+1))-sum(SERIES.cashOut.slice(0,i+1)));
  const ar=REVENUE.filter(r=>r.status!=='Paid');
  const row=(l,v,o={})=>`<div class="pl-row ${o.total?'total':''} ${o.sub?'sub':''}">
    <span class="pl-l">${esc(l)}</span><span class="pl-v" style="color:${o.neg?'var(--neg)':o.pos?'var(--pos)':''}">${v}</span></div>`;
  const head=pageHead('Financial reports',
    `Profit and loss, cash movement and what is owed — for ${MONTHS[S.month]} ${YEAR()} and the year to date.`,
    `${btnPrint}${btnExportXL('financials')}`) + UI.tabs('fin',['Profit and loss','Cash','Receivables and payables'],tab);

  if(tab==='Profit and loss') return head + `<div class="grid g-2">
    ${UI.card({title:'Profit and loss',note:MONTHS[S.month]+' '+YEAR(),body:
      row('Revenue',F.peso(m.revenue))+
      row('Platform monetisation',F.peso(m.revenue*0.24),{sub:1})+
      row('Brand deals and sponsorship',F.peso(m.revenue*0.47),{sub:1})+
      row('Product and affiliate',F.peso(m.revenue*0.29),{sub:1})+
      row('Cost of sales — direct production',`−${F.peso(m.direct)}`,{neg:1})+
      row('Gross profit',F.peso(m.gross),{total:1})+
      row('Operating expenses',`−${F.peso(m.opex)}`,{neg:1})+
      row('Operating profit',F.peso(m.net),{total:1})+
      row('Net profit',F.peso(m.net),{total:1,pos:1})+
      `<div class="split" style="margin:14px -16px -4px;border-top:1px solid var(--line-2)">
        <div><div class="label">Gross margin</div><div class="w6 num t-lg">${F.pct(m.grossMargin)}</div></div>
        <div><div class="label">Net margin</div><div class="w6 num t-lg">${F.pct(m.netMargin)}</div></div>
        <div><div class="label">Cost ratio</div><div class="w6 num t-lg">${F.pct(m.expenses/m.revenue*100)}</div></div></div>`})}
    ${UI.card({title:'Year to date',note:`January to ${new Date(YEAR(),S.month,1).toLocaleDateString('en-PH',{month:'long'})} ${YEAR()}`,body:
      row('Revenue',F.peso(y.revenue))+row('Direct costs',`−${F.peso(y.direct)}`,{neg:1})+
      row('Gross profit',F.peso(y.gross),{total:1})+row('Operating expenses',`−${F.peso(y.opex)}`,{neg:1})+
      row('Net profit',F.peso(y.net),{total:1,pos:1})+
      `<div style="margin-top:16px">${Chart.cols({labels:MONTHS,height:150,fmt:F.pesoK,mode:'group',series:[
        {name:'Revenue',values:SERIES.revenue,color:'var(--accent)'},
        {name:'Expenses',values:SERIES.expenses,color:'var(--neg)'}]})}</div>`})}
  </div>`;

  if(tab==='Cash') return head + `<div class="grid g-4" style="margin-bottom:14px">
      ${UI.kpi({label:'Cash position',value:F.peso(m.cash),sub:'after '+MONTHS[S.month]})}
      ${UI.kpi({label:'Cash in',value:F.peso(SERIES.cashIn[S.month]),sub:'collected this month'})}
      ${UI.kpi({label:'Cash out',value:F.peso(SERIES.cashOut[S.month]),sub:'paid this month'})}
      ${UI.kpi({label:'Net movement',value:F.peso(SERIES.cashIn[S.month]-SERIES.cashOut[S.month]),sub:'positive for nine straight months'})}
    </div>
    <div class="grid g-2-1">
      ${UI.card({title:'Cash position over time',body:Chart.line({labels:MONTHS,height:200,fmt:F.pesoK,
        series:[{name:'Cash',values:cashSeries,color:'var(--accent)'}]})})}
      ${UI.card({title:'In and out',body:Chart.cols({labels:MONTHS,height:200,fmt:F.pesoK,series:[
        {name:'Cash in',values:SERIES.cashIn,color:'var(--pos)'},{name:'Cash out',values:SERIES.cashOut,color:'var(--neg)'}]})})}
    </div>`;

  return head + `<div class="grid g-4" style="margin-bottom:14px">
      ${UI.kpi({label:'Accounts receivable',value:F.peso(m.ar),sub:ar.length+' open invoices'})}
      ${UI.kpi({label:'Overdue',value:F.peso(sum(REVENUE.filter(r=>r.status==='Overdue'),r=>r.amount)),sub:'past terms'})}
      ${UI.kpi({label:'Accounts payable',value:F.peso(m.ap),sub:'due within 30 days'})}
      ${UI.kpi({label:'Working capital',value:F.peso(m.cash+m.ar-m.ap),sub:'cash plus receivables less payables'})}
    </div>
    ${UI.card({title:'Open invoices',note:'Chase the overdue line first',flush:true,body:UI.table({id:'arTbl',open:r=>'revenue:'+r.id,cols:[
      {k:'invoice',label:'Invoice',cell:r=>`<span class="mono">${r.invoice}</span>`},
      {k:'client',label:'Customer',cell:r=>`<div class="cell-main">${esc(r.client)}</div><div class="cell-sub">${esc(r.source)}</div>`},
      {k:'date',label:'Issued',cell:r=>F.date(r.date)},
      {k:'age',label:'Age',align:'r',sortVal:r=>-daysFrom(r.date),cell:r=>Math.abs(daysFrom(r.date))+' days'},
      {k:'status',label:'Status',cell:r=>UI.badge(r.status,r.status==='Overdue'?'neg':r.status==='Partially paid'?'warn':'info',true)},
      {k:'amount',label:'Amount',align:'r',cell:r=>`<span class="w6">${F.peso(r.amount)}</span>`}
    ],rows:ar,foot:`<td colspan="5">Total outstanding</td><td class="r">${F.peso(sum(ar,r=>r.amount))}</td>`})})}`;
};

/* ============================================================
   29. VIEW — NOTIFICATIONS
   ============================================================ */
V.notifications = () => {
  const f=S.filters.ntype||'all';
  const rows=NOTIFS.filter(n=>f==='all'||n.kind===f);
  const kinds=uniq(NOTIFS.map(n=>n.kind));
  return pageHead('Notifications',
    `${NOTIFS.filter(n=>!n.read).length} unread. Alerts fire from thresholds you set in settings.`,
    `<button class="btn" data-act="read-all">${icon('check',14)} Mark all read</button>`)
  + UI.toolbar([UI.select('ntype',[{v:'all',l:'All types'},...kinds.map(k=>({v:k,l:k}))],f)])
  + UI.card({flush:true,body:rows.map(n=>`
      <div class="row-t" style="padding:13px 16px;border-bottom:1px solid var(--line-2);gap:12px;cursor:pointer;
        background:${n.read?'transparent':'var(--surface-2)'}"
        ${n.ref.startsWith('CNT')?`data-open="content:${n.ref}"`:n.ref.startsWith('tm')?`data-open="member:${n.ref}"`:
          n.ref.startsWith('cmp')?`data-open="campaign:${n.ref}"`:n.ref.startsWith('REV')?`data-open="revenue:${n.ref}"`:''}>
        <span style="margin-top:2px;color:var(--${n.tone})">${icon({neg:'alert',warn:'clock',pos:'arrUp',info:'sparkle'}[n.tone],16)}</span>
        <div style="min-width:0;flex:1">
          <div class="row" style="gap:8px;margin-bottom:2px">${UI.badge(n.kind,n.tone)}
            ${!n.read?'<i class="dot info"></i>':''}
            <span class="t-xs faint" style="margin-left:auto">${F.date(n.date)} · ${n.time}</span></div>
          <div class="t-md">${esc(n.text)}</div>
        </div></div>`).join('')});
};

/* ============================================================
   30. VIEW — ACTIVITY LOG
   ============================================================ */
V.activity = () => {
  const f=S.filters;
  const rows=ACTIVITY.filter(a=>(!f.atype2||f.atype2==='all'||a.type===f.atype2)&&(!f.who||f.who==='all'||a.who===f.who));
  const days=by(rows,'date');
  return pageHead('Activity log',
    'Every change to content, money and approvals, with the person who made it. Read-only by design.',
    btnExport('activity'))
  + UI.toolbar([
      UI.select('atype2',[{v:'all',l:'All activity'},...uniq(ACTIVITY.map(a=>a.type)).map(t=>({v:t,l:t}))],f.atype2||'all'),
      UI.select('who',[{v:'all',l:'Everyone'},...TEAM.map(t=>({v:t.id,l:t.name}))],f.who||'all')])
  + Object.keys(days).map(d=>UI.card({title:new Date(d+'T00:00:00').toLocaleDateString('en-PH',{weekday:'long',day:'numeric',month:'long'}),
      note:days[d].length+' entries',cls:'mt-l',body:`<div class="feed">${days[d].map(a=>`
        <div class="feed-item">
          <span class="feed-time">${a.time}</span>${UI.av(a.who)}
          <span class="feed-line"><b class="w6">${esc(memName(a.who))}</b> ${esc(a.what)}
            ${a.label?`<span class="w5" ${a.ref.startsWith('CNT')?`data-open="content:${a.ref}" style="cursor:pointer;border-bottom:1px solid var(--line-strong)"`:''}>${esc(a.label)}</span>`:''}
            <span class="badge ghost" style="margin-left:6px">${a.type}</span></span>
        </div>`).join('')}</div>`})).join('');
};


/* ============================================================
   31b. VIEW — COMPANY PROFILE
   ============================================================ */
V.company = () => {
  const later = [
    ['Taxpayer identification number','Printed on every official document'],
    ['Business type','Sole proprietor, partnership or corporation'],
    ['RDO code','Which BIR district office holds your file'],
    ['VAT status','VAT-registered or non-VAT, and the rate that applies'],
    ['Official receipt series','The range the BIR authorised you to issue'],
    ['Books of account','What you are required to keep and for how long']
  ];
  return pageHead('Company profile',
    'The registered details of the studio. Change them here and they change everywhere in the system.',
    `<button class="btn btn-primary" data-act="save-company">${icon('check',14)} Save changes</button>`)
  + `<div class="grid g-2-1">
      ${UI.card({title:'Registered details',note:'Name and address for now — the rest comes later',body:`
        <div class="field" style="margin-bottom:16px">
          <span class="label">Registered name</span>
          <input class="input" id="coName" data-co="name" value="${esc(CO.name)}"
                 placeholder="The name you trade under" style="width:100%;font-size:14px">
          <div class="t-xs dim" style="margin-top:5px">Appears in the sidebar, on the dashboard, and on every report you print.</div>
        </div>
        <div class="field">
          <span class="label">Registered address</span>
          <textarea class="input" id="coAddr" data-co="address" style="width:100%"
            placeholder="Street or kilometre marker, barangay, city, province, postal code">${esc(CO.address)}</textarea>
          <div class="t-xs dim" style="margin-top:5px">Printed on the management view and the financial reports.</div>
        </div>
        <div class="note info mt-l">Typing updates the system straight away. Press Save when you are happy with it.</div>`})}

      ${UI.card({title:'How it looks',note:'Live preview',body:`
        <div class="co-prev">
          <div class="co-prev-top">
            <span class="co-prev-mark">${LOGO.mark(22,'#fff')}</span>
            <span class="co-prev-word">${LOGO.word(12,'#fff')}</span>
          </div>
          <div class="co-prev-body">
            <div class="label">On a printed report</div>
            <div class="w6" style="font-size:13.5px;margin-top:3px" id="coPrevName2">${esc(CO.name)}</div>
            <div class="t-xs dim" style="margin-top:2px;line-height:1.45" id="coPrevAddr">${esc(CO.address||'No registered address on file yet')}</div>
          </div>
        </div>
        <div class="sec-title mt-xl">Where this name shows up</div>
        ${['The sidebar, under Atrium','The dashboard greeting','The management view header',
           'Printed financial reports','Exported CSV file headers']
          .map(x=>`<div class="row" style="padding:6px 0;gap:8px">
            <span style="color:var(--pos)">${icon('check',13)}</span><span class="t-sm">${x}</span></div>`).join('')}`})}
    </div>

    ${UI.card({title:'What gets added when you register with the BIR',
      note:'Not needed yet — listed so you know what is coming',cls:'mt-l',body:
      later.map(l=>`<div class="co-later">
        <span class="co-later-x">later</span>
        <span style="min-width:0"><span class="t-sm w5" style="display:block">${l[0]}</span>
        <span class="t-xs dim">${l[1]}</span></span></div>`).join('')
      +`<div class="note mt-l">Nothing here blocks you today. Trade under your name, keep the records clean,
        and add these fields when the registration comes through — the system already has a place for each of them.</div>`})}`;
};


/* ============================================================
   31c. VIEW — USERS AND ROLES
   ============================================================ */
V.users = () => {
  const tab = S.tab.users || 'People';
  const f = S.filters;
  const head = pageHead('Users and roles',
    'Who can get into the system, and what each of them is allowed to touch.',
    tab==='People'
      ? `${btnExport('users')}<button class="btn btn-primary" data-act="invite-user">${icon('plus',14)} Invite someone</button>`
      : '')
    + UI.tabs('users',['People','Roles and permissions'],tab);

  if(tab==='People'){
    const rows = TEAM.filter(t =>
      (!f.uaccess || f.uaccess==='all' || t.access===f.uaccess) &&
      (!f.ustatus || f.ustatus==='all' || t.status===f.ustatus));
    const count = id => TEAM.filter(t=>t.access===id).length;
    return head
      + `<div class="grid g-4" style="margin-bottom:14px">
          ${UI.kpi({label:'People with access',value:TEAM.length,sub:TEAM.length===1?'just you so far':'across all roles'})}
          ${UI.kpi({label:'Active',value:TEAM.filter(t=>t.status==='Active').length,sub:'signed in and working'})}
          ${UI.kpi({label:'Invited',value:TEAM.filter(t=>t.status==='Invited').length,sub:'waiting to accept'})}
          ${UI.kpi({label:'Can see the money',value:TEAM.filter(t=>['Full','View'].includes(ROLE[t.access].perms.finance)).length,
            sub:'finance access of any kind'})}
        </div>`
      + UI.toolbar([
          UI.select('uaccess',[{v:'all',l:'All roles'},...ROLES.map(r=>({v:r.id,l:r.name+' ('+count(r.id)+')'}))],f.uaccess||'all'),
          UI.select('ustatus',[{v:'all',l:'Any status'},'Active','Invited','Disabled'],f.ustatus||'all'),
          `<button class="btn btn-ghost btn-sm" data-act="clear-filters">Reset</button>`])
      + UI.card({flush:true,body:UI.table({id:'usersTbl',cols:[
          {k:'name',label:'Person',cell:t=>`<div class="row" style="gap:9px">${UI.av(t.id)}
            <span style="min-width:0"><span class="cell-main truncate" style="display:block">${esc(t.name)}${t.id===ME.id?' <span class="badge ghost">you</span>':''}</span>
            <span class="cell-sub">${t.email?esc(t.email):'<span class="faint">no email on file</span>'}</span></span></div>`},
          {k:'role',label:'Job title'},
          {k:'dept',label:'Department'},
          {k:'access',label:'Access level',sortVal:t=>roleName(t.access),cell:t=> t.id===ME.id
            ? `${UI.badge(roleName(t.access),'pos',true)} <span class="t-xs faint">cannot change your own</span>`
            : UI.select('uacc:'+t.id, ROLES.map(r=>({v:r.id,l:r.name})), t.access, '140px')},
          {k:'status',label:'Status',cell:t=>UI.badge(t.status, t.status==='Active'?'pos':t.status==='Invited'?'warn':'neutral',true)},
          {k:'lastActive',label:'Last active',cell:t=>`<span class="t-xs dim">${t.lastActive==='now'?'right now':(t.lastActive||'never')}</span>`},
          {k:'x',label:'',align:'r',sort:false,cell:t=> t.id===ME.id ? ''
            : `<span class="row" style="gap:6px;justify-content:flex-end">
                ${canDelete()?`<button class="btn btn-ghost btn-sm" data-act="edit-member" data-id="${t.id}">Edit</button>`:''}
                <button class="btn btn-ghost btn-sm" data-act="toggle-user" data-id="${t.id}">${t.status==='Disabled'?'Enable':'Disable'}</button>
                ${canDelete()?`<button class="btn btn-ghost btn-sm" style="color:var(--neg)" data-act="delete-member" data-id="${t.id}">Delete</button>`:''}
              </span>`}
        ],rows})})
      + UI.card({cls:'mt-l',title:'A note on how this works today',body:
          `<div class="note warn">These roles are defined and stored, but nothing is <b>enforced</b> yet —
            there is no sign-in screen, so anyone who opens this file sees everything.
            Enforcement needs the login and server described in Part 6 of the manual.
            Setting the roles now is still worth doing: it is the record of who <i>should</i> see what,
            and it is what the developer builds against.</div>`});
  }

  /* ---- roles and permissions ---- */
  const legend = [['Full','Can see, add, edit and delete'],['Edit','Can see and change, but not delete'],
                  ['Own','Only the records they own'],['View','Read-only'],['None','Cannot open it at all']];
  return head
    + UI.card({title:'What each role can do',note:'Every module, every role',flush:true,
        body:UI.table({id:'permTbl',sort:false,cols:[
          {k:'name',label:'Role',cell:r=>`<div class="cell-main">${esc(r.name)}</div>
            <div class="cell-sub">${TEAM.filter(t=>t.access===r.id).length} ${TEAM.filter(t=>t.access===r.id).length===1?'person':'people'}</div>`},
          ...PERM_AREAS.map(([k,label])=>({k,label,cell:r=>UI.badge(r.perms[k], PERM_TONE[r.perms[k]])}))
        ],rows:ROLES})})
    + `<div class="row t-xs dim" style="gap:16px;margin:12px 2px 20px;flex-wrap:wrap">
        ${legend.map(l=>`<span class="row" style="gap:6px">${UI.badge(l[0],PERM_TONE[l[0]])}<span>${l[1]}</span></span>`).join('')}
      </div>`
    + `<div class="grid g-3">${ROLES.map(r=>{
        const n=TEAM.filter(t=>t.access===r.id).length;
        return `<article class="card"><div class="card-body">
          <div class="row" style="margin-bottom:7px">
            <span class="w6" style="font-size:15px">${esc(r.name)}</span>
            <span class="badge ${n?'info':'ghost'}" style="margin-left:auto">${n||'nobody'}${n?(n===1?' person':' people'):''}</span></div>
          <div class="t-sm dim" style="line-height:1.5;margin-bottom:10px">${esc(r.note)}</div>
          <div class="label">Sees</div>
          <div class="t-xs dim" style="line-height:1.45">${esc(r.views)}</div>
        </div></article>`;}).join('')}</div>`;
};

/* ============================================================
   31. VIEW — SETTINGS
   ============================================================ */
V.settings = () => {
  const tab=S.tab.settings||'Scoring';
  const head=pageHead('Settings',
    'Master data and the rules the system uses to judge performance and raise alerts.','')
    + UI.tabs('settings',['Scoring','Master data','Alerts','Appearance'],tab);

  if(tab==='Scoring'){
    const tot=sum(Object.values(S.weights));
    const preview=[...PUBLISHED].map(c=>({...c,sc:score(c)})).sort((a,b)=>b.sc-a.sc).slice(0,5);
    return head + `<div class="grid g-2-1">
      ${UI.card({title:'Content performance score',
        note:'Set what matters. Rankings across the system update immediately.',
        body:Object.keys(S.weights).map(k=>`
          <div style="padding:9px 0;border-bottom:1px solid var(--line-2)">
            <div class="row" style="margin-bottom:6px">
              <span class="t-sm w5" style="text-transform:capitalize">${k==='er'?'Engagement':k}</span>
              <span class="num w6 t-sm" style="margin-left:auto">${S.weights[k]}%</span></div>
            <input type="range" min="0" max="40" step="5" value="${S.weights[k]}" data-weight="${k}" style="width:100%;accent-color:var(--accent)">
          </div>`).join('')
          +`<div class="row mt-l"><span class="t-sm dim">Total weighting</span>
            <span class="num w6" style="margin-left:auto;color:var(--${tot===100?'pos':'warn'})">${tot}%</span></div>
          <button class="btn mt-l" data-act="reset-weights">Reset to default</button>`})}
      ${UI.card({title:'Live preview',note:'Top five under the current weighting',
        body:preview.map((c,i)=>`<div class="row" style="padding:8px 0;border-bottom:1px solid var(--line-2);gap:10px">
          <span class="rank ${i===0?'top':''}">${i+1}</span>
          <span class="t-sm truncate" style="flex:1">${esc(c.title)}</span>
          <span class="num w6 t-sm">${c.sc}</span></div>`).join('')})}
    </div>`;
  }
  if(tab==='Master data'){
    const list=(title,items,note)=>UI.card({title,note,flush:true,body:items.map(i=>`
      <div class="row" style="padding:9px 16px;border-bottom:1px solid var(--line-2)">
        <span class="t-sm">${i}</span>
        <button class="icon-btn" style="margin-left:auto;width:24px;height:24px" data-tip="Edit">${icon('more',14)}</button></div>`).join('')
      +`<button class="btn btn-ghost btn-sm" style="margin:10px 16px">${icon('plus',13)} Add</button>`});
    return head + `<div class="grid g-3">
      ${list('Platforms',PLATFORMS.map(p=>p.name+' · '+p.handle),'Connected accounts')}
      ${list('Content types',uniq(CONTENT.map(c=>c.type)),'Used across planning and reporting')}
      ${list('Categories',uniq(CONTENT.map(c=>c.category)),'Content pillars')}
      ${list('Departments',DEPTS,'Cost and workload grouping')}
      ${list('Roles',uniq(TEAM.map(t=>t.role)),'Team structure')}
      ${list('Expense categories',uniq(EXPENSES.map(e=>e.category)),'Finance chart of accounts')}
    </div>`;
  }
  if(tab==='Alerts'){
    const th=[['Budget warning','Raise an alert when a budget passes','85%'],
      ['Budget critical','Flag as at-risk when a budget passes','95%'],
      ['Cost per video ceiling','Warn when average cost exceeds','₱7,500'],
      ['Net margin floor','Flag business health when margin falls below','30%'],
      ['Engagement benchmark','Mark content as underperforming below','6.0%'],
      ['Workload ceiling','Flag a person as overloaded above','100%'],
      ['Invoice terms','Mark receivables overdue after','30 days']];
    return head + UI.card({title:'Thresholds',note:'These drive the business health panel and the notification centre',
      flush:true,body:th.map(t=>`<div class="row" style="padding:12px 16px;border-bottom:1px solid var(--line-2);gap:14px">
        <div style="min-width:0"><div class="t-sm w5">${t[0]}</div><div class="t-xs dim">${t[1]}</div></div>
        <input class="input" value="${t[2]}" style="margin-left:auto;width:110px;text-align:right">
      </div>`).join('')});
  }
  return head + `<div class="grid g-2">
    ${UI.card({title:'Appearance',body:`
      <div class="row" style="padding:10px 0;border-bottom:1px solid var(--line-2)">
        <div><div class="t-sm w5">Dark mode</div><div class="t-xs dim">Switches the whole interface</div></div>
        <span class="switch ${S.theme==='dark'?'on':''}" data-act="theme" style="margin-left:auto"></span></div>
      <div class="row" style="padding:10px 0;border-bottom:1px solid var(--line-2)">
        <div><div class="t-sm w5">Compact sidebar</div><div class="t-xs dim">Icons only, more room for data</div></div>
        <span class="switch ${S.collapsed?'on':''}" data-act="collapse" style="margin-left:auto"></span></div>
      <div class="row" style="padding:10px 0">
        <div><div class="t-sm w5">Currency</div><div class="t-xs dim">Philippine peso, no decimals</div></div>
        <span class="badge ghost" style="margin-left:auto">₱ PHP</span></div>`})}
    ${UI.card({title:'Workspace',body:UI.dl([
      ['Company',`<span style="cursor:pointer;border-bottom:1px solid var(--line-strong)" data-go="company">${esc(CO.name)}</span>`],
      ['Registered address', CO.address?esc(CO.address):'<span class="faint">Not set — add it in Company profile</span>'],
      ['Plan','Operations — 10 seats'],
      ['Reporting period','Calendar month, Asia/Manila'],['Financial year','January to December'],
      ['Data retention','All history kept'],['Owner',UI.person(ME.id)]])})}
  </div>`;
};

/* ============================================================
   32. DETAIL DRAWERS
   ============================================================ */
const HOOKS = {
  Recipe:['Stop buying this — make it in 60 seconds','Three ingredients. One pan. No excuses.','The version your lola actually makes'],
  'Behind the scenes':['This happens before the sun comes up','Nobody sees this part of the job','Six hours from farm to your table'],
  Promo:['Feeding eight people for the price of two','The maths on this bundle is unfair','Your weekend just got cheaper'],
  Educational:['Fresh or frozen? We tested it properly','Here is what the label does not tell you','The 12-hour rule nobody follows'],
  Testimonial:['Real kitchen, real family, no script','She has cooked this every Sunday for a year'],
  'Founder story':['Why we wake up at 3am','We started with one freezer'],
  'Product feature':['Opening this box takes 40 seconds','Every piece, weighed in front of you'],
  Trend:['Sound on for this one','You have seen the trend — not like this']
};
const pick=(arr,seed)=>arr[seed%arr.length];

function contentDrawer(c){
  const tab=S.tab.drawer||'Overview';
  const pubs=PUBLISHING.filter(p=>p.content===c.id);
  const tasks=TASKS.filter(t=>t.content===c.id);
  const assets=ASSETS.filter(a=>a.content===c.id);
  const acts=ACTIVITY.filter(a=>a.ref===c.id);
  const hook=pick(HOOKS[c.category]||HOOKS.Recipe, c.id.charCodeAt(6)+c.title.length);
  const sc=c.isPublished?score(c):null;

  const tabsBar=`<div class="tabs" style="margin:-4px 0 16px">${['Overview','Production','Publishing','Performance','Costs','Activity']
    .map(t=>`<button data-seg="drawer|${t}" class="${t===tab?'on':''}">${t}</button>`).join('')}</div>`;

  let body='';
  if(tab==='Overview') body = UI.dl([
    ['Content ID',`<span class="mono">${c.id}</span>`],['Type',esc(c.type)],['Category',esc(c.category)],
    ['Platform',(()=>{ const p=PLAT[c.platform]||{color:'var(--ink-4)',name:'—'};
      return `<span class="row"><i class="dot" style="background:${p.color}"></i>${p.name}</span>`; })()],
    ['Campaign',c.campaign?`<span style="cursor:pointer;border-bottom:1px solid var(--line-strong)" data-open="campaign:${c.campaign}">${esc(cmpName(c.campaign))}</span>`:'<span class="faint">—</span>'],
    ['Objective',esc((CMP[c.campaign]||{objective:'—'}).objective)],
    ['Target audience','Home cooks aged 25–44 in Southern Luzon'],
    ['Content pillar',esc(c.category)],
    ['Hook',`<span class="w5">“${esc(hook)}”</span>`],
    ['Caption',esc(`${c.title}. Fresh from the farm, never frozen. Order before 4pm for same-day delivery.`)],
    ['Call to action','Order on the website or message the page'],
    ['Script',`<span class="row" style="gap:6px;color:var(--accent);cursor:pointer">${icon('file',13)} ${esc(c.id)}_script_v2.docx</span>`],
    ['Reference',`<span class="dim">Mood board and two reference cuts attached</span>`],
    ['Owner',UI.person(c.owner)],['Editor',UI.person(c.editor)],
    ['Priority',UI.prio(c.priority)],['Stage',UI.stage(c.status)],
    ['Approval',UI.badge(['Approved','Scheduled','Published'].includes(c.status)?'Approved':c.status==='Revision'?'Changes requested':'Awaiting approval',
      ['Approved','Scheduled','Published'].includes(c.status)?'pos':c.status==='Revision'?'neg':'warn',true)],
    ['Deadline',`${F.dateFull(c.deadline)} <span class="t-xs ${daysFrom(c.deadline)<0&&!c.isPublished?'':'dim'}"
      style="${daysFrom(c.deadline)<0&&!c.isPublished?'color:var(--neg)':''}">· ${c.isPublished?'shipped':relDays(c.deadline)}</span>`],
    ['Estimated cost',F.peso(c.estCost)],
    ['Actual cost',`<span class="w5" style="color:${c.cost>c.estCost?'var(--neg)':'var(--pos)'}">${F.peso(c.cost)}</span>`],
    ['Published',c.published?F.dateFull(c.published):'<span class="faint">Not yet live</span>']
  ]) + (tasks.length?`<div class="sec-title mt-xl">Linked tasks</div>${tasks.map(t=>`
      <div class="row" style="padding:8px 0;border-bottom:1px solid var(--line-2);gap:10px">
        <span class="checkbox ${t.status==='Done'?'on':''}" data-task="${t.id}">${t.status==='Done'?icon('check',11):''}</span>
        <span class="t-sm ${t.status==='Done'?'dim':''}">${esc(t.title)}</span>
        ${UI.av(t.assignee,'sm')}<span class="t-xs dim" style="margin-left:auto">${F.date(t.due)}</span></div>`).join('')}`:'');

  if(tab==='Production') body = `
    <div class="grid g-3" style="margin-bottom:16px">
      ${UI.kpi({label:'Hours logged',value:F.dur(+sum(c.stages,s=>s.hours).toFixed(1)),small:true})}
      ${UI.kpi({label:'Stages complete',value:c.stages.filter(s=>s.state==='Done').length+' of '+c.stages.length,small:true})}
      ${UI.kpi({label:'Days in pipeline',value:Math.round(sum(c.stages,s=>s.days))+'d',small:true})}
    </div>
    ${c.stages.map((s,i)=>`<div class="row-t" style="padding:11px 0;border-bottom:1px solid var(--line-2);gap:12px">
      <span style="margin-top:1px;color:var(--${s.state==='Done'?'pos':s.state==='In progress'?'accent':'ink-4'})">
        ${icon(s.state==='Done'?'checkC':s.state==='In progress'?'clock':'briefing',16)}</span>
      <div style="min-width:0;flex:1">
        <div class="row"><span class="t-sm w5">${s.name}</span>
          ${UI.badge(s.state,s.state==='Done'?'pos':s.state==='In progress'?'info':'neutral')}
          <span class="t-xs dim" style="margin-left:auto">${s.state!=='Not started'?F.dur(s.hours)+' logged':'—'}</span></div>
        <div class="row t-xs dim" style="margin-top:4px;gap:10px">
          <span class="row" style="gap:5px">${UI.av(s.owner,'sm')} ${esc(memName(s.owner))}</span>
          <span>${s.state==='Not started'?'Not started':s.days+' days in stage'}</span></div>
      </div></div>`).join('')}
    <div class="sec-title mt-xl">Checklist</div>
    ${['Brief signed off','Script approved','Shot list ready','Footage backed up','Captions written','Thumbnail approved']
      .map((t,i)=>`<div class="row" style="padding:7px 0;gap:10px">
        <span class="checkbox ${i<c.stages.filter(s=>s.state==='Done').length?'on':''}">${i<c.stages.filter(s=>s.state==='Done').length?icon('check',11):''}</span>
        <span class="t-sm">${t}</span></div>`).join('')}
    ${assets.length?`<div class="sec-title mt-xl">Attachments</div>${assets.map(a=>`
      <div class="row" style="padding:8px 0;border-bottom:1px solid var(--line-2);gap:9px;cursor:pointer" data-open="asset:${a.id}">
        <span style="color:var(--ink-3)">${icon('file',15)}</span><span class="t-sm">${esc(a.name)}</span>
        <span class="badge ghost" style="margin-left:auto">v${a.version}</span></div>`).join('')}`:''}`;

  if(tab==='Publishing') body = pubs.length? pubs.map(p=>UI.dl([
      ['Record',`<span class="mono">${p.id}</span>`],['Platform',PLAT[p.platform].name],['Account',`<span class="mono t-xs">${esc(p.account)}</span>`],
      ['Scheduled date',F.dateFull(p.date)],['Scheduled time',p.time],
      ['Status',UI.badge(p.status,p.status==='Published'?'pos':p.status==='Failed'?'neg':'violet',true)],
      ['Hashtags',`<span class="t-xs dim">${esc(p.hashtags)}</span>`],
      ['Published URL',p.url?`<span style="color:var(--accent)">${esc(p.url)}</span>`:'<span class="faint">Not published</span>']
    ])).join('<hr style="border:0;border-top:1px solid var(--line-2);margin:16px 0">')
    : UI.empty('Not scheduled yet','This piece has no publishing record. Schedule it once approval is done.',
      `<button class="btn btn-primary btn-sm" data-act="schedule">Schedule a post</button>`);

  if(tab==='Performance') body = c.isPublished? `
    <div class="grid g-2" style="margin-bottom:16px">
      ${UI.kpi({label:'Performance score',value:sc,small:true,sub:scoreBand(sc).t})}
      ${UI.kpi({label:'Return on cost',value:F.pct(c.roi,0),small:true,sub:F.peso(c.profit)+' profit'})}
    </div>
    <div class="grid g-3">
      ${[['Views',F.numK(c.views)],['Engagement rate',F.pct(c.er)],['Engagements',F.numK(c.engagements)],
         ['Followers gained','+'+F.num(c.followers)],['Average watch',c.watch?F.secs(c.watch):'—'],
         ['Completion',c.completion?F.pct(c.completion,0):'—'],['Revenue',F.peso(c.revenue)],
         ['Production cost',F.peso(c.cost)],['Profit',F.peso(c.profit)]]
        .map(x=>`<div style="padding:10px 0;border-bottom:1px solid var(--line-2)">
          <div class="label">${x[0]}</div><div class="w6 num t-lg">${x[1]}</div></div>`).join('')}
    </div>
    <div class="sec-title mt-xl">Score breakdown</div>
    ${Object.keys(S.weights).map(k=>`<div class="row" style="padding:6px 0;gap:10px">
      <span class="t-sm dim" style="width:96px;text-transform:capitalize">${k}</span>
      <span style="flex:1">${UI.meter(clamp(({views:c.views/Math.max(...PUBLISHED.map(x=>x.views)),
        engagement:c.er/Math.max(...PUBLISHED.map(x=>x.er)),shares:c.engagements/Math.max(...PUBLISHED.map(x=>x.engagements)),
        watch:c.watch/Math.max(...PUBLISHED.map(x=>x.watch)),completion:c.completion/100,
        followers:c.followers/Math.max(...PUBLISHED.map(x=>x.followers)),
        revenue:c.revenue/Math.max(...PUBLISHED.map(x=>x.revenue))})[k]*100,0,100),'accent')}</span>
      <span class="t-xs dim num" style="width:34px;text-align:right">${S.weights[k]}%</span></div>`).join('')}
    <div class="note info mt-xl">${c.roi>400?`This piece returned ${F.pct(c.roi,0)} — well above the ${F.pct(sum(PUBLISHED,x=>x.profit)/sum(PUBLISHED,x=>x.cost)*100,0)} average. Worth repeating the format.`
      : c.er<6? 'Engagement sits below the 6% benchmark. The opening three seconds are the first thing to test.'
      : 'Solid mid-pack performance. Reach was fine; revenue attribution is where the upside sits.'}</div>`
    : UI.empty('No performance data yet','Numbers appear here once the piece is published and the platform reports back.');

  if(tab==='Costs') body = `
    <div class="grid g-3" style="margin-bottom:16px">
      ${UI.kpi({label:'Estimate',value:F.peso(c.estCost),small:true})}
      ${UI.kpi({label:'Actual',value:F.peso(c.cost),small:true,sub:c.cost>c.estCost?'over estimate':'inside estimate'})}
      ${UI.kpi({label:'Variance',value:F.peso(c.estCost-c.cost),small:true,sub:F.pct(Math.abs(c.estCost-c.cost)/c.estCost*100,0)+' difference'})}
    </div>
    <div class="sec-title">Cost lines</div>
    ${c.costLines.length? c.costLines.map(l=>`<div class="cost-row"><span>${esc(l.label)}</span>
      <span class="amt">${F.peso(l.amount)}</span></div>`).join('')
      +`<div class="cost-row" style="border-top:1px solid var(--line-strong);margin-top:4px;padding-top:10px">
        <span class="w6">Total production cost</span><span class="amt w7">${F.peso(c.cost)}</span></div>`
      : UI.empty('No costs logged','Nothing has been spent on this piece yet.')}
    ${c.isPublished?`<div class="sec-title mt-xl">Return</div>
      <div class="pl-row"><span class="pl-l">Revenue attributed</span><span class="pl-v">${F.peso(c.revenue)}</span></div>
      <div class="pl-row"><span class="pl-l">Direct content cost</span><span class="pl-v" style="color:var(--neg)">−${F.peso(c.cost)}</span></div>
      <div class="pl-row total"><span class="pl-l">Content gross profit</span><span class="pl-v" style="color:var(--pos)">${F.peso(c.profit)}</span></div>
      <div class="note pos mt-l">Return on cost = (${F.peso(c.revenue)} − ${F.peso(c.cost)}) ÷ ${F.peso(c.cost)} = <b>${F.pct(c.roi,0)}</b></div>`:''}`;

  if(tab==='Activity') body = acts.length? `<div class="feed">${acts.map(a=>`<div class="feed-item">
      <span class="feed-time">${a.time}</span>${UI.av(a.who)}
      <span class="feed-line"><b class="w6">${esc(memName(a.who))}</b> ${esc(a.what)} — <span class="dim">${F.date(a.date)}</span></span>
    </div>`).join('')}</div>` : UI.empty('No recorded changes','Every edit, approval and cost entry will appear here.');

  openDrawer({eyebrow:`<span class="mono">${c.id}</span> · ${esc(c.type)}`, title:c.title,
    sub:`${UI.stage(c.status)} <span class="dim">·</span> ${esc(cmpName(c.campaign))} <span class="dim">·</span> due ${F.date(c.deadline)}`,
    body:tabsBar+body,
    foot:`<button class="btn" data-act="advance" data-id="${c.id}">${icon('chevR',14)} Move to next stage</button>
      <button class="btn" data-act="assign" data-id="${c.id}">Reassign</button>
      ${canDelete()?`<button class="btn" data-act="edit-content" data-id="${c.id}">Edit</button>`:''}
      ${canDelete()?`<button class="btn btn-ghost" style="color:var(--neg)" data-act="delete-content" data-id="${c.id}">Delete</button>`:''}
      <span class="t-xs faint" style="margin-left:auto">Owner ${esc(memName(c.owner))}</span>`});
}

function memberDrawer(t){
  const owned=CONTENT.filter(c=>c.owner===t.id||c.editor===t.id);
  const tasks=TASKS.filter(x=>x.assignee===t.id);
  const open=tasks.filter(x=>x.status!=='Done');
  const b=loadBand(t.load);
  openDrawer({eyebrow:t.dept, title:t.name, sub:`${esc(t.role)} <span class="dim">·</span> joined ${F.dateFull(t.joined)}`,
    body:`<div class="grid g-2" style="margin-bottom:16px">
        ${UI.kpi({label:'Workload',value:t.load+'%',small:true,sub:b.t})}
        ${UI.kpi({label:'On-time delivery',value:F.pct(t.onTime,0),small:true,sub:'across '+t.done+' completed tasks'})}
      </div>
      <div style="margin-bottom:18px">${UI.meter(t.load,b.tone,100)}
        <div class="row t-xs dim" style="margin-top:5px"><span>${t.allocated}h allocated</span>
          <span style="margin-left:auto">${t.capacity}h capacity</span></div></div>
      ${UI.dl([['Completed tasks',t.done],['Active tasks',t.active],['Overdue',tasks.filter(x=>x.overdue).length],
        ['Average turnaround',t.turn+' days'],['Content owned',owned.length],
        ['Departments',t.dept],['Campaigns',uniq(owned.map(c=>cmpName(c.campaign))).slice(0,2).join(', ')||'—']])}
      <div class="sec-title mt-xl">Open tasks</div>
      ${open.length? open.map(x=>`<div class="row" style="padding:8px 0;border-bottom:1px solid var(--line-2);gap:10px">
        <span class="checkbox ${x.status==='Done'?'on':''}" data-task="${x.id}"></span>
        <span class="t-sm truncate" style="flex:1">${esc(x.title)}</span>
        ${UI.prio(x.priority)}<span class="t-xs ${x.overdue?'':'dim'}" style="${x.overdue?'color:var(--neg)':''}">${relDays(x.due)}</span>
      </div>`).join('') : UI.empty('All clear','No open tasks assigned right now.')}
      <div class="sec-title mt-xl">Content</div>
      ${owned.slice(0,8).map(c=>`<div class="row" style="padding:8px 0;border-bottom:1px solid var(--line-2);gap:10px;cursor:pointer" data-open="content:${c.id}">
        <span class="t-sm truncate" style="flex:1">${esc(c.title)}</span>${UI.stage(c.status)}</div>`).join('')}`,
    foot:`<button class="btn" data-go="workload">Open workload</button>
      <span class="t-xs faint" style="margin-left:auto">${b.t} this week</span>`});
}

function campaignDrawer(c0){
  const c=cmpStats(c0);
  const exp=EXPENSES.filter(e=>e.campaign===c.id), rev=REVENUE.filter(r=>r.campaign===c.id);
  openDrawer({eyebrow:c.status, title:c.name, sub:`${esc(c.objective)}`,
    body:`<div class="grid g-2" style="margin-bottom:16px">
        ${UI.kpi({label:'Revenue',value:F.peso(c.revenue),small:true})}
        ${UI.kpi({label:'Profit',value:F.peso(c.profit),small:true,sub:F.pct(c.roi,0)+' return'})}
      </div>
      <div style="margin-bottom:6px" class="label">Budget used</div>
      ${UI.meter(c.util,c.util>90?'neg':c.util>75?'warn':'accent',100)}
      <div class="row t-xs dim" style="margin-top:5px"><span>${F.peso(c.spent)} spent</span>
        <span style="margin-left:auto">${F.peso(c.budget-c.spent)} remaining of ${F.peso(c.budget)}</span></div>
      <div class="mt-xl">${UI.dl([['Runs',`${F.dateFull(c.start)} – ${F.dateFull(c.end)}`],
        ['Platforms',c.platforms.map(p=>PLAT[p].name).join(', ')],['Team',UI.avStack(c.team)],
        ['Content',c.items.length+' pieces, '+c.pub+' live'],['Views',F.numK(c.views)],
        ['Engagement',F.pct(c.er)],['Followers','+'+F.num(c.followers)],
        ['Cost per piece',F.peso(c.spent/Math.max(c.items.length,1))]])}</div>
      <div class="sec-title mt-xl">Content in this campaign</div>
      ${c.items.map(i=>`<div class="row" style="padding:8px 0;border-bottom:1px solid var(--line-2);gap:10px;cursor:pointer" data-open="content:${i.id}">
        <i class="dot" style="background:${PLAT[i.platform].color}"></i>
        <span class="t-sm truncate" style="flex:1">${esc(i.title)}</span>
        ${UI.stage(i.status)}<span class="t-xs dim num">${i.revenue?F.pesoK(i.revenue):''}</span></div>`).join('')}
      ${rev.length?`<div class="sec-title mt-xl">Revenue booked</div>${rev.map(r=>`
        <div class="row" style="padding:7px 0;border-bottom:1px solid var(--line-2)"><span class="t-sm">${esc(r.client)}</span>
        <span class="t-xs dim" style="margin-left:8px">${F.date(r.date)}</span>
        <span class="num w5 t-sm" style="margin-left:auto">${F.peso(r.amount)}</span></div>`).join('')}`:''}
      ${exp.length?`<div class="sec-title mt-xl">Direct spend</div>${exp.map(e=>`
        <div class="row" style="padding:7px 0;border-bottom:1px solid var(--line-2)"><span class="t-sm truncate">${esc(e.description)}</span>
        <span class="num w5 t-sm" style="margin-left:auto">${F.peso(e.amount)}</span></div>`).join('')}`:''}`,
    foot:`<button class="btn" data-go="campaigns">All campaigns</button>
      ${canDelete()?`<button class="btn" data-act="edit-campaign" data-id="${c.id}">Edit</button>`:''}
      ${canDelete()?`<button class="btn btn-ghost" style="color:var(--neg)" data-act="delete-campaign" data-id="${c.id}">Delete</button>`:''}
      <span class="t-xs faint" style="margin-left:auto">${F.pct(c.roi,0)} return on spend</span>`});
}

function platformDrawer(p0){
  const p=byPlatform().find(x=>x.id===p0);
  const items=PUBLISHED.filter(c=>c.platform===p0).sort((a,b)=>b.views-a.views);
  openDrawer({eyebrow:'Connected account', title:p.name, sub:`<span class="mono">${esc(p.handle)}</span>`,
    body:`<div class="grid g-2" style="margin-bottom:16px">
        ${UI.kpi({label:'Views',value:F.numK(p.views),small:true,sub:p.count+' posts'})}
        ${UI.kpi({label:'Revenue',value:F.peso(p.revenue),small:true,sub:F.pct(p.roi,0)+' return'})}
      </div>
      ${UI.dl([['Posts',p.count],['Engagements',F.numK(p.engagements)],['Engagement rate',F.pct(p.er)],
        ['Followers gained','+'+F.num(p.followers)],['Production cost',F.peso(p.cost)],
        ['Profit',F.peso(p.profit)],['Revenue per 1k views',F.peso(p.revenue/p.views*1000,2)]])}
      <div class="sec-title mt-xl">Top posts</div>
      ${items.map(c=>`<div class="row" style="padding:9px 0;border-bottom:1px solid var(--line-2);gap:10px;cursor:pointer" data-open="content:${c.id}">
        <span style="min-width:0;flex:1"><span class="t-sm w5 truncate" style="display:block">${esc(c.title)}</span>
        <span class="t-xs dim">${F.date(c.published)} · ${F.pct(c.er)} engagement</span></span>
        <span class="num w6 t-sm">${F.numK(c.views)}</span></div>`).join('')}`});
}

function txnDrawer(kind,r){
  if(kind==='revenue') openDrawer({eyebrow:'Revenue · '+r.invoice, title:r.client,
    sub:`${esc(r.source)} <span class="dim">·</span> ${F.dateFull(r.date)}`,
    body:`<div class="kpi" style="margin-bottom:16px"><div class="kpi-label">Amount</div>
        <div class="kpi-val">${F.peso(r.amount)}</div>
        <div class="kpi-foot">${UI.badge(r.status,r.status==='Paid'?'pos':r.status==='Overdue'?'neg':'warn',true)}</div></div>
      ${UI.dl([['Invoice',`<span class="mono">${r.invoice}</span>`],['Date',F.dateFull(r.date)],['Source',esc(r.source)],
        ['Customer',esc(r.client)],['Campaign',r.campaign?`<span style="cursor:pointer;border-bottom:1px solid var(--line-strong)" data-open="campaign:${r.campaign}">${esc(cmpName(r.campaign))}</span>`:'—'],
        ['Content',r.content?`<span style="cursor:pointer;border-bottom:1px solid var(--line-strong)" data-open="content:${r.content}">${esc(CT[r.content].title)}</span>`:'—'],
        ['Platform',PLAT[r.platform].name],['Payment status',r.status],
        ['Notes','Net 30 terms. Payment confirmed against the studio account.']])}`,
    foot:`<button class="btn btn-primary" data-act="mark-paid">Mark as paid</button><button class="btn">Send reminder</button>
      ${canDelete()?`<button class="btn" style="margin-left:auto" data-act="edit-revenue" data-id="${r.id}">Edit</button>`:''}
      ${canDelete()?`<button class="btn btn-ghost" style="color:var(--neg)" data-act="delete-revenue" data-id="${r.id}">Delete</button>`:''}`});
  else openDrawer({eyebrow:'Expense · '+r.id, title:r.description,
    sub:`${esc(r.vendor)} <span class="dim">·</span> ${F.dateFull(r.date)}`,
    body:`<div class="kpi" style="margin-bottom:16px"><div class="kpi-label">Amount</div>
        <div class="kpi-val">${F.peso(r.amount)}</div>
        <div class="kpi-foot">${UI.badge(r.approval,r.approval==='Approved'?'pos':'warn',true)}
        ${UI.badge(r.direct?'Direct content cost':'Operating cost',r.direct?'warn':'neutral')}</div></div>
      ${UI.dl([['Category',esc(r.category)],['Vendor',esc(r.vendor)],['Department',esc(r.dept)],
        ['Payment method',esc(r.method)],['Recurrence',esc(r.recurrence)],
        ['Campaign',r.campaign?`<span style="cursor:pointer;border-bottom:1px solid var(--line-strong)" data-open="campaign:${r.campaign}">${esc(cmpName(r.campaign))}</span>`:'—'],
        ['Content',r.content?`<span style="cursor:pointer;border-bottom:1px solid var(--line-strong)" data-open="content:${r.content}">${esc(CT[r.content].title)}</span>`:'—'],
        ['Receipt',`<span class="row" style="gap:6px;color:var(--accent)">${icon('file',13)} receipt_${r.id.toLowerCase()}.pdf</span>`],
        ['Approved by',UI.person(ME.id)]])}`,
    foot:`<button class="btn btn-primary">Approve</button><button class="btn">Request receipt</button>
      ${canDelete()?`<button class="btn" style="margin-left:auto" data-act="edit-expense" data-id="${r.id}">Edit</button>`:''}
      ${canDelete()?`<button class="btn btn-ghost" style="color:var(--neg)" data-act="delete-expense" data-id="${r.id}">Delete</button>`:''}`});
}

function assetDrawer(a){
  const versions=Array.from({length:a.version},(_,i)=>i+1).reverse();
  openDrawer({eyebrow:a.type, title:a.name,
    sub:`${esc(a.tags)} <span class="dim">·</span> updated ${F.dateFull(a.date)}`,
    body:UI.dl([['Asset ID',`<span class="mono">${a.id}</span>`],['Type',esc(a.type)],
      ['Linked content',a.content?`<span style="cursor:pointer;border-bottom:1px solid var(--line-strong)" data-open="content:${a.content}">${esc(CT[a.content].title)}</span>`:'—'],
      ['Campaign',a.campaign?esc(cmpName(a.campaign)):'—'],['Creator',UI.person(a.creator)],
      ['Current version',`v${a.version}`],['Status',UI.badge(a.status,a.status==='Approved'?'pos':a.status==='Needs revision'?'neg':'warn',true)],
      ['Tags',esc(a.tags)]])
      +`<div class="sec-title mt-xl">Version history</div>
      ${versions.map(v=>`<div class="ver-item"><span class="ver-dot ${v===a.version?'cur':''}"></span>
        <span class="mono t-sm">${a.name.replace(/(_v\d+)?(\.\w+)$/,'_v'+v+'$2')}</span>
        <span class="t-xs dim" style="margin-left:auto">${v===a.version?'current':'superseded'}</span></div>`).join('')}`,
    foot:`<button class="btn btn-primary">Download</button><button class="btn">Upload new version</button>
      ${canDelete()?`<button class="btn" style="margin-left:auto" data-act="edit-asset" data-id="${a.id}">Edit</button>`:''}
      ${canDelete()?`<button class="btn btn-ghost" style="color:var(--neg)" data-act="delete-asset" data-id="${a.id}">Delete</button>`:''}`});
}

function openDetail(type,id){
  S.openRef={type,id};
  if(type==='content') contentDrawer(CT[id]);
  else if(type==='member') memberDrawer(MEM[id]);
  else if(type==='campaign') campaignDrawer(CMP[id]);
  else if(type==='platform') platformDrawer(id);
  else if(type==='revenue') txnDrawer('revenue',REVENUE.find(r=>r.id===id));
  else if(type==='expense') txnDrawer('expense',EXPENSES.find(r=>r.id===id));
  else if(type==='asset') assetDrawer(ASSETS.find(a=>a.id===id));
  else if(type==='view'){ closeLayers(); go(id); }
}

/* ============================================================
   33. ROUTER
   ============================================================ */
function render(){
  recomputeSeries();
  const fn=V[S.view]||V.dashboard;
  $('#view').innerHTML=`<div class="view-inner">${fn()}</div>`;
  recomputeSeries();
  renderNav(); paintUser();
  const n=NAV_INDEX[S.view]||NAV_INDEX.dashboard;
  $('#crumbSection').textContent=n.group; $('#crumbNow').textContent=n.label;
  document.title='Atrium — '+n.label;
}
function go(id){
  if(!V[id]) return;
  if(!canAccess(id)){
    try{ history.replaceState(null,'','#/'+S.view); }catch(e){}
    toast('You don’t have access to that section','lock'); return;
  }
  S.view=id; S.navOpen=false; $('#app').classList.remove('nav-open');
  /* sandboxed previews block History; navigation must not depend on it */
  try{ if(location.hash!=='#/'+id) history.replaceState(null,'','#/'+id); }catch(e){}
  $('#view').scrollTop=0; render();
}
async function boot(){
  let hash='';
  try{ hash=(location.hash||'').replace('#/',''); }catch(e){}
  S.view = 'dashboard';   /* every load — fresh open or refresh — starts at the dashboard */
  try{ history.replaceState(null,'','#/dashboard'); }catch(e){}
  S._fresh = !hash;   /* only greet on a genuinely fresh open, not a refresh */
  $('#periodSel').innerHTML=MONTHS.map((m,i)=>`<option value="${i}" ${i===S.month?'selected':''}>${m} ${YEAR()}</option>`).join('');
  $('#searchIcon').innerHTML=icon('search',14);
  $('#guideBtn').innerHTML=icon('sparkle',16);
  paintBrand(); paintUser(); syncBrand();
  tickClock(); setInterval(tickClock, 1000);
  $('#themeBtn').innerHTML=icon(S.theme==='dark'?'sun':'moon',16);
  $('#bellBtn').innerHTML=icon('bell',16)+(NOTIFS.some(n=>!n.read)?'<i class="dot-badge"></i>':'');
  $('#navToggle').innerHTML=icon('menu',16);
  await loadFromSupabase();
  paintUser();
  render();
}

/* ============================================================
   34. INTERACTIONS
   ============================================================ */
document.addEventListener('click',e=>{
  const t=e.target;
  const closeEl=t.closest('[data-close]'); if(closeEl){ closeLayers(); return; }
  const goEl=t.closest('[data-go]'); if(goEl){ closeLayers(); go(goEl.dataset.go); return; }

  const taskEl=t.closest('[data-task]');
  if(taskEl){ e.stopPropagation();
    const task=TASKS.find(x=>x.id===taskEl.dataset.task);
    task.status = task.status==='Done'?'To do':'Done';
    task.overdue = task.status!=='Done' && daysFrom(task.due)<0;
    toast(task.status==='Done'?'Task completed':'Task reopened', task.status==='Done'?'check':'refresh');
    if(S.openRef && $('.drawer')) openDetail(S.openRef.type,S.openRef.id);
    render(); return; }

  const openEl=t.closest('[data-open]');
  const nestedAct=t.closest('[data-act]');
  if(openEl && openEl.dataset.open && !(nestedAct && openEl.contains(nestedAct))){
    const [type,id]=openEl.dataset.open.split(':'); openDetail(type,id); return; }

  const segEl=t.closest('[data-seg]');
  if(segEl){ const [name,val]=segEl.dataset.seg.split('|'); S.tab[name]=val;
    if(name==='drawer' && S.openRef) openDetail(S.openRef.type,S.openRef.id); else render(); return; }

  const setEl=t.closest('[data-filter-set]');
  if(setEl){ const [name,val]=setEl.dataset.filterSet.split('|'); S.filters[name]=val; render(); return; }

  const sortEl=t.closest('[data-sort]');
  if(sortEl){ const [id,k]=sortEl.dataset.sort.split('|');
    const cur=S.sort[id];
    S.sort[id] = cur&&cur.k===k ? (cur.dir==='desc'?{k,dir:'asc'}:null) : {k,dir:'desc'};
    render(); return; }

  const expEl=t.closest('[data-export]'); if(expEl){ doExport(expEl.dataset.export); return; }

  const actEl=t.closest('[data-act]'); if(actEl) doAction(actEl.dataset.act, actEl);
});

document.addEventListener('change',e=>{
  const f=e.target.closest('[data-filter]');
  if(f && f.dataset.filter.startsWith('uacc:')){
    const t=MEM[f.dataset.filter.slice(5)];
    if(t && t.id!==ME.id){
      const was=roleName(t.access); t.access=f.value; persistTeam(t);
      logActivity({id:newId('LOG'), date:new Date().toISOString().slice(0,10),
        time:new Date().toTimeString().slice(0,5), who:ME.id,
        what:`changed access from ${was} to ${roleName(t.access)} for`, ref:t.id, label:t.name, type:'Access'});
      render(); toast(t.name+' is now '+roleName(t.access),'user');
    }
    return; }
  if(f){ const n=f.dataset.filter;
    if(n==='repPeriod'){ S.month=+f.value; $('#periodSel').value=f.value; }
    else S.filters[n]=f.value;
    render(); return; }
});
$('#periodSel').addEventListener('change',e=>{ S.month=+e.target.value; render(); });

document.addEventListener('input',e=>{
  const co=e.target.closest('[data-co]');
  if(co){ CO[co.dataset.co]=co.value; syncBrand();
    const p2=$('#coPrevName2'); if(p2) p2.textContent=CO.name;
    return; }
  const w=e.target.closest('[data-weight]');
  if(w){ S.weights[w.dataset.weight]=+w.value; render(); return; }
  const q=e.target.closest('[data-input]');
  if(q){ S.filters[q.dataset.input]=q.value;
    const pos=q.selectionStart; render();
    const el=$('#searchInput'); if(el){ el.focus(); el.setSelectionRange(pos,pos); } }
});

function doAction(act,el){
  switch(act){
    case 'print': toast('Preparing the print view','print'); setTimeout(()=>{try{window.print();}catch(e){toast('Printing is blocked in this preview — open the file directly','alert');}},400); break;
    case 'theme': S.theme = S.theme==='dark'?'light':'dark';
      document.documentElement.dataset.theme=S.theme;
      $('#themeBtn').innerHTML=icon(S.theme==='dark'?'sun':'moon',16);
      closeLayers(); render(); break;
    case 'collapse': S.collapsed=!S.collapsed; $('#app').classList.toggle('collapsed',S.collapsed); closeLayers(); render(); break;
    case 'clear-filters': S.filters={}; render(); toast('Filters reset','refresh'); break;
    case 'guide': S.guide=!S.guide; render();
      toast(S.guide?'Guide on — every screen now explains itself':'Guide hidden — the sparkle button up top brings it back','sparkle'); break;
    case 'tour': startTour(); break;
    case 'tour-next': tourIdx++; paintTour(); break;
    case 'tour-back': tourIdx--; paintTour(); break;
    case 'tour-end': closeLayers(); toast('Tour ended — the guide stays on every screen','check'); break;
    case 'read-all': NOTIFS.forEach(n=>n.read=true); $('#bellBtn').innerHTML=icon('bell',16); render(); toast('All notifications marked read'); break;
    case 'reset-weights': S.weights={...SCORE_WEIGHTS}; render(); toast('Scoring reset to default','refresh'); break;
    case 'save-company':
      CO.name = ($('#coName')?$('#coName').value.trim():CO.name) || 'Untitled company';
      CO.address = $('#coAddr') ? $('#coAddr').value.trim() : CO.address;
      render(); syncBrand();
      toast('Saved — '+CO.name+' now appears across the system','check'); break;
    case 'customise': customiseModal(); break;
    case 'new-content': newContentModal(); break;
    case 'invite-user': inviteUserModal(); break;
    case 'save-user': saveUser(el.dataset.id||undefined); break;
    case 'edit-member': if(canDelete()) inviteUserModal(el.dataset.id); break;
    case 'toggle-user': {
      const t=MEM[el.dataset.id]; if(!t) break;
      t.status = t.status==='Disabled' ? 'Active' : 'Disabled';
      persistTeam(t);
      logActivity({id:'LOG-s'+Math.random(), date:new Date().toISOString().slice(0,10),
        time:new Date().toTimeString().slice(0,5), who:ME.id,
        what:(t.status==='Disabled'?'disabled':'re-enabled')+' the account of', ref:t.id, label:t.name, type:'Access'});
      render(); toast(t.name+' is now '+t.status.toLowerCase(), t.status==='Disabled'?'lock':'check'); break; }
    case 'save-content': saveContent(el.dataset.id||undefined); break;
    case 'edit-content': if(canDelete()) newContentModal(el.dataset.id); break;
    case 'advance': advanceStage(el.dataset.id); break;
    case 'mark-paid': closeLayers(); toast('Invoice marked as paid'); break;
    case 'profile': openDetail('member',ME.id); break;
    case 'new-campaign': newCampaignModal(); break;
    case 'save-campaign': saveCampaign(el.dataset.id||undefined); break;
    case 'edit-campaign': if(canDelete()) newCampaignModal(el.dataset.id); break;
    case 'new-task': newTaskModal(); break;
    case 'save-task': saveTask(el.dataset.id||undefined); break;
    case 'edit-task': if(canDelete()) newTaskModal(el.dataset.id); break;
    case 'new-expense': newExpenseModal(); break;
    case 'save-expense': saveExpense(el.dataset.id||undefined); break;
    case 'edit-expense': if(canDelete()) newExpenseModal(el.dataset.id); break;
    case 'new-revenue': newRevenueModal(); break;
    case 'save-revenue': saveRevenue(el.dataset.id||undefined); break;
    case 'edit-revenue': if(canDelete()) newRevenueModal(el.dataset.id); break;
    case 'new-budget': newBudgetModal(); break;
    case 'save-budget': saveBudget(el.dataset.id||undefined); break;
    case 'edit-budget': if(canDelete()) newBudgetModal(el.dataset.id); break;
    case 'new-goal': newGoalModal(); break;
    case 'save-goal': saveGoal(el.dataset.id||undefined); break;
    case 'edit-goal': if(canDelete()) newGoalModal(el.dataset.id); break;
    case 'new-member': inviteUserModal(); break;
    case 'upload': newAssetModal(); break;
    case 'save-asset': saveAsset(el.dataset.id||undefined); break;
    case 'edit-asset': if(canDelete()) newAssetModal(el.dataset.id); break;
    case 'schedule': newScheduleModal(); break;
    case 'save-schedule': saveSchedule(el.dataset.id||undefined); break;
    case 'edit-schedule': if(canDelete()) newScheduleModal(el.dataset.id); break;
    case 'assign': reassignModal(el.dataset.id); break;
    case 'save-reassign': saveReassign(el.dataset.id); break;
    case 'logout': doLogout(); break;
    case 'approve-expense': approveExpense(el.dataset.id); break;
    case 'approve-content': decideContent(el.dataset.id,true); break;
    case 'reject-content': decideContent(el.dataset.id,false); break;
    case 'approve-member': approveMember(el.dataset.id); break;
    case 'delete-content': deleteContent(el.dataset.id); break;
    case 'delete-campaign': deleteCampaign(el.dataset.id); break;
    case 'delete-task': deleteTask(el.dataset.id); break;
    case 'delete-revenue': deleteRevenue(el.dataset.id); break;
    case 'delete-expense': deleteExpense(el.dataset.id); break;
    case 'delete-budget': deleteBudget(el.dataset.id); break;
    case 'delete-goal': deleteGoal(el.dataset.id); break;
    case 'delete-asset': deleteAsset(el.dataset.id); break;
    case 'delete-publishing': deletePublishing(el.dataset.id); break;
    case 'delete-member': deleteMember(el.dataset.id); break;
  }
}
function approveExpense(id){
  const e=EXPENSES.find(x=>x.id===id); if(!e) return;
  e.approval='Approved'; persistExpense(e);
  logActivity({id:newId('LOG'),date:iso(TODAY),time:new Date().toTimeString().slice(0,5),
    who:ME.id,what:'approved expense',ref:e.id,label:e.description+' — '+F.peso(e.amount),type:'Approval'});
  render(); toast('Approved — '+e.description,'checkC');
}
function decideContent(id,approve){
  const c=CT[id]; if(!c) return;
  c.status = approve ? 'Approved' : 'Revision';
  c.stageIndex = STAGES.indexOf(c.status);
  persistContent(c);
  logActivity({id:newId('LOG'),date:iso(TODAY),time:new Date().toTimeString().slice(0,5),
    who:ME.id,what: approve?'approved':'sent back for revision',ref:c.id,label:c.title,type:'Approval'});
  render(); toast((approve?'Approved — ':'Sent back — ')+c.title, approve?'checkC':'refresh');
}
function approveMember(id){
  const t=MEM[id]; if(!t) return;
  t.status='Active'; persistTeam(t);
  logActivity({id:newId('LOG'),date:iso(TODAY),time:new Date().toTimeString().slice(0,5),
    who:ME.id,what:'activated the account of',ref:t.id,label:t.name,type:'Approval'});
  render(); toast('Activated — '+t.name,'checkC');
}
const EXPENSE_CATS=['Production','Freelancers','Transportation','Food','Software','Rent','Utilities','Marketing','Equipment','Other'];
const REVENUE_SOURCES=['Brand deal','Ad revenue','Affiliate','Retainer','Product sales','Other'];
const ASSET_TYPES=['Video','Image','Audio','Design','Document','Other'];

function newCampaignModal(editId){
  const c = editId ? CMP[editId] : null;
  openModal({title: c?'Edit campaign':'New campaign', sub:'Groups content under one budget and one objective.',
    body:`<div class="grid g-2">
      <div class="field" style="grid-column:1/-1"><span class="label">Name</span><input class="input" id="cpName" placeholder="e.g. September Push" value="${c?esc(c.name):''}"></div>
      <div class="field" style="grid-column:1/-1"><span class="label">Objective</span><input class="input" id="cpObj" placeholder="What this campaign is for" value="${c?esc(c.objective):''}"></div>
      <div class="field"><span class="label">Start date</span><input class="input" type="date" id="cpStart" value="${c?c.start:iso(TODAY)}"></div>
      <div class="field"><span class="label">End date</span><input class="input" type="date" id="cpEnd" value="${c?c.end:iso(new Date(TODAY.getTime()+30*864e5))}"></div>
      <div class="field"><span class="label">Budget</span><input class="input" id="cpBudget" type="number" value="${c?c.budget:20000}" step="1000"></div>
      <div class="field"><span class="label">Status</span>${UI.select('x',['Active','Planned','Completed','Paused'],c?c.status:'Active','100%').replace('data-filter="x"','id="cpStatus"')}</div>
    </div>`,
    foot:`<button class="btn" data-close="1">Cancel</button><button class="btn btn-primary" data-act="save-campaign" data-id="${editId||''}">${c?'Save changes':'Create campaign'}</button>`});
}
function saveCampaign(editId){
  const name=$('#cpName').value.trim()||'Untitled campaign';
  if(editId){
    const c=CMP[editId]; if(!c) return;
    Object.assign(c,{name,objective:$('#cpObj').value.trim(),start:$('#cpStart').value,end:$('#cpEnd').value,
      budget:+$('#cpBudget').value||0,status:$('#cpStatus').value});
    persistCampaign(c);
    logActivity({id:newId('LOG'),date:iso(TODAY),time:new Date().toTimeString().slice(0,5),
      who:ME.id,what:'edited campaign',ref:editId,label:name,type:'Campaign'});
    closeLayers(); render(); if($('.drawer')) openDetail('campaign',editId); toast('Saved changes — '+name,'check');
    return;
  }
  const id=newId('CMP');
  const c={id,name,objective:$('#cpObj').value.trim(),start:$('#cpStart').value,end:$('#cpEnd').value,
    budget:+$('#cpBudget').value||0,spent:0,revenue:0,status:$('#cpStatus').value,team:[],platforms:[]};
  CAMPAIGNS.push(c); CMP[id]=c; persistCampaign(c);
  logActivity({id:newId('LOG'),date:iso(TODAY),time:new Date().toTimeString().slice(0,5),
    who:ME.id,what:'created campaign',ref:id,label:name,type:'Campaign'});
  closeLayers(); go('campaigns'); toast('Created campaign — '+name,'plus');
}

function newTaskModal(editId){
  const t = editId ? TASKS.find(x=>x.id===editId) : null;
  openModal({title: t?'Edit task':'New task', sub:'Stays linked to the content and person it belongs to.',
    body:`<div class="grid g-2">
      <div class="field" style="grid-column:1/-1"><span class="label">Title</span><input class="input" id="tkTitle" placeholder="What needs to happen" value="${t?esc(t.title):''}"></div>
      <div class="field"><span class="label">Content (optional)</span>${UI.select('x',[{v:'',l:'None'},...CONTENT.map(c=>({v:c.id,l:c.title}))],t?t.content:'','100%').replace('data-filter="x"','id="tkContent"')}</div>
      <div class="field"><span class="label">Assignee</span>${UI.select('x',TEAM.map(x=>({v:x.id,l:x.name})),t?t.assignee:ME.id,'100%').replace('data-filter="x"','id="tkAssignee"')}</div>
      <div class="field"><span class="label">Department</span>${UI.select('x',DEPTS,t?t.dept:'Production','100%').replace('data-filter="x"','id="tkDept"')}</div>
      <div class="field"><span class="label">Priority</span>${UI.select('x',['Critical','High','Medium','Low'],t?t.priority:'Medium','100%').replace('data-filter="x"','id="tkPrio"')}</div>
      <div class="field"><span class="label">Due date</span><input class="input" type="date" id="tkDue" value="${t?t.due:iso(new Date(TODAY.getTime()+3*864e5))}"></div>
      <div class="field"><span class="label">Hours estimate</span><input class="input" id="tkHours" type="number" value="${t?t.hours:2}" step="0.5"></div>
    </div>`,
    foot:`<button class="btn" data-close="1">Cancel</button><button class="btn btn-primary" data-act="save-task" data-id="${editId||''}">${t?'Save changes':'Create task'}</button>`});
}
function saveTask(editId){
  const title=$('#tkTitle').value.trim()||'Untitled task';
  if(editId){
    const t=TASKS.find(x=>x.id===editId); if(!t) return;
    Object.assign(t,{title,content:$('#tkContent').value||'',assignee:$('#tkAssignee').value,due:$('#tkDue').value,
      priority:$('#tkPrio').value,dept:$('#tkDept').value,hours:+$('#tkHours').value||0});
    t.overdue = t.status!=='Done' && daysFrom(t.due)<0;
    persistTask(t);
    logActivity({id:newId('LOG'),date:iso(TODAY),time:new Date().toTimeString().slice(0,5),
      who:ME.id,what:'edited task',ref:editId,label:title,type:'Task'});
    closeLayers(); render(); toast('Saved changes — '+title,'check');
    return;
  }
  const id=newId('TSK');
  const t={id,title,content:$('#tkContent').value||'',assignee:$('#tkAssignee').value,due:$('#tkDue').value,
    status:'To do',priority:$('#tkPrio').value,dept:$('#tkDept').value,hours:+$('#tkHours').value||0};
  t.overdue = daysFrom(t.due)<0;
  TASKS.push(t); persistTask(t);
  logActivity({id:newId('LOG'),date:iso(TODAY),time:new Date().toTimeString().slice(0,5),
    who:ME.id,what:'created task',ref:id,label:title,type:'Task'});
  closeLayers(); go('tasks'); toast('Created task — '+title,'plus');
}

function newExpenseModal(editId){
  const e = editId ? EXPENSES.find(x=>x.id===editId) : null;
  openModal({title: e?'Edit expense':'Record expense', sub:'Flows straight into the Expenses ledger and monthly totals.',
    body:`<div class="grid g-2">
      <div class="field" style="grid-column:1/-1"><span class="label">Description</span><input class="input" id="exDesc" placeholder="What was paid for" value="${e?esc(e.description):''}"></div>
      <div class="field"><span class="label">Vendor</span><input class="input" id="exVendor" placeholder="Who was paid" value="${e?esc(e.vendor):''}"></div>
      <div class="field"><span class="label">Category</span>${UI.select('x',EXPENSE_CATS,e?e.category:'Production','100%').replace('data-filter="x"','id="exCat"')}</div>
      <div class="field"><span class="label">Amount</span><input class="input" id="exAmount" type="number" value="${e?e.amount:1000}" step="100"></div>
      <div class="field"><span class="label">Date</span><input class="input" type="date" id="exDate" value="${e?e.date:iso(TODAY)}"></div>
      <div class="field"><span class="label">Method</span>${UI.select('x',['Cash','Bank transfer','Credit card','GCash'],e?e.method:'Cash','100%').replace('data-filter="x"','id="exMethod"')}</div>
      <div class="field"><span class="label">Department</span>${UI.select('x',DEPTS,e?e.dept:'Production','100%').replace('data-filter="x"','id="exDept"')}</div>
      <div class="field"><span class="label">Campaign (optional)</span>${UI.select('x',[{v:'',l:'None'},...CAMPAIGNS.map(c=>({v:c.id,l:c.name}))],e?e.campaign:'','100%').replace('data-filter="x"','id="exCmp"')}</div>
      <div class="field"><span class="label">Recurrence</span>${UI.select('x',['One-time','Recurring'],e?e.recurrence:'One-time','100%').replace('data-filter="x"','id="exRec"')}</div>
      <div class="field"><span class="label">Approval</span>${UI.select('x',['Pending','Approved'],e?e.approval:'Pending','100%').replace('data-filter="x"','id="exAppr"')}</div>
    </div>`,
    foot:`<button class="btn" data-close="1">Cancel</button><button class="btn btn-primary" data-act="save-expense" data-id="${editId||''}">${e?'Save changes':'Save expense'}</button>`});
}
function saveExpense(editId){
  const date=$('#exDate').value;
  if(editId){
    const e=EXPENSES.find(x=>x.id===editId); if(!e) return;
    Object.assign(e,{date,category:$('#exCat').value,vendor:$('#exVendor').value.trim(),description:$('#exDesc').value.trim()||'Untitled expense',
      amount:+$('#exAmount').value||0,method:$('#exMethod').value,dept:$('#exDept').value,campaign:$('#exCmp').value||'',
      recurrence:$('#exRec').value,approval:$('#exAppr').value});
    e.month=date.slice(0,7); e.direct=EXPENSE_CATS.slice(0,4).includes(e.category);
    persistExpense(e);
    logActivity({id:newId('LOG'),date:iso(TODAY),time:new Date().toTimeString().slice(0,5),
      who:ME.id,what:'edited expense',ref:editId,label:e.description,type:'Expense'});
    closeLayers(); render(); toast('Saved changes','check');
    return;
  }
  const id=newId('EXP');
  const e={id,date,category:$('#exCat').value,vendor:$('#exVendor').value.trim(),description:$('#exDesc').value.trim()||'Untitled expense',
    amount:+$('#exAmount').value||0,method:$('#exMethod').value,dept:$('#exDept').value,campaign:$('#exCmp').value||'',
    content:'',recurrence:$('#exRec').value,approval:$('#exAppr').value};
  e.month=date.slice(0,7); e.direct=EXPENSE_CATS.slice(0,4).includes(e.category);
  EXPENSES.push(e); persistExpense(e);
  logActivity({id:newId('LOG'),date:iso(TODAY),time:new Date().toTimeString().slice(0,5),
    who:ME.id,what:'recorded expense',ref:id,label:e.description+' — '+F.peso(e.amount),type:'Expense'});
  closeLayers(); go('expenses'); toast('Recorded expense — '+F.peso(e.amount),'plus');
}

function newRevenueModal(editId){
  const r = editId ? REVENUE.find(x=>x.id===editId) : null;
  openModal({title: r?'Edit revenue':'Record revenue', sub:'Flows straight into the Revenue ledger and monthly totals.',
    body:`<div class="grid g-2">
      <div class="field" style="grid-column:1/-1"><span class="label">Client</span><input class="input" id="rvClient" placeholder="Who paid" value="${r?esc(r.client):''}"></div>
      <div class="field"><span class="label">Source</span>${UI.select('x',REVENUE_SOURCES,r?r.source:'Brand deal','100%').replace('data-filter="x"','id="rvSource"')}</div>
      <div class="field"><span class="label">Platform</span>${UI.select('x',PLATFORMS.map(p=>({v:p.id,l:p.name})),r?r.platform:PLATFORMS[0].id,'100%').replace('data-filter="x"','id="rvPlat"')}</div>
      <div class="field"><span class="label">Amount</span><input class="input" id="rvAmount" type="number" value="${r?r.amount:5000}" step="500"></div>
      <div class="field"><span class="label">Date</span><input class="input" type="date" id="rvDate" value="${r?r.date:iso(TODAY)}"></div>
      <div class="field"><span class="label">Status</span>${UI.select('x',['Pending','Invoiced','Partially paid','Paid','Overdue','Cancelled'],r?r.status:'Pending','100%').replace('data-filter="x"','id="rvStatus"')}</div>
      <div class="field"><span class="label">Campaign (optional)</span>${UI.select('x',[{v:'',l:'None'},...CAMPAIGNS.map(c=>({v:c.id,l:c.name}))],r?r.campaign:'','100%').replace('data-filter="x"','id="rvCmp"')}</div>
      <div class="field"><span class="label">Invoice #</span><input class="input" id="rvInvoice" placeholder="Optional" value="${r?esc(r.invoice):''}"></div>
    </div>`,
    foot:`<button class="btn" data-close="1">Cancel</button><button class="btn btn-primary" data-act="save-revenue" data-id="${editId||''}">${r?'Save changes':'Save revenue'}</button>`});
}
function saveRevenue(editId){
  const date=$('#rvDate').value;
  if(editId){
    const r=REVENUE.find(x=>x.id===editId); if(!r) return;
    Object.assign(r,{date,source:$('#rvSource').value,client:$('#rvClient').value.trim()||'Unnamed client',campaign:$('#rvCmp').value||'',
      platform:$('#rvPlat').value,amount:+$('#rvAmount').value||0,status:$('#rvStatus').value,invoice:$('#rvInvoice').value.trim()});
    r.month=date.slice(0,7);
    persistRevenue(r);
    logActivity({id:newId('LOG'),date:iso(TODAY),time:new Date().toTimeString().slice(0,5),
      who:ME.id,what:'edited revenue entry',ref:editId,label:r.client,type:'Revenue'});
    closeLayers(); render(); toast('Saved changes','check');
    return;
  }
  const id=newId('REV');
  const r={id,date,source:$('#rvSource').value,client:$('#rvClient').value.trim()||'Unnamed client',campaign:$('#rvCmp').value||'',
    content:'',platform:$('#rvPlat').value,amount:+$('#rvAmount').value||0,status:$('#rvStatus').value,invoice:$('#rvInvoice').value.trim()};
  r.month=date.slice(0,7);
  REVENUE.push(r); persistRevenue(r);
  logActivity({id:newId('LOG'),date:iso(TODAY),time:new Date().toTimeString().slice(0,5),
    who:ME.id,what:'recorded revenue',ref:id,label:r.client+' — '+F.peso(r.amount),type:'Revenue'});
  closeLayers(); go('revenue'); toast('Recorded revenue — '+F.peso(r.amount),'plus');
}

function newBudgetModal(editId){
  const b = editId ? BUDGETS.find(x=>x.id===editId) : null;
  openModal({title: b?'Edit budget':'Create budget', sub:'A spending ceiling the system tracks against.',
    body:`<div class="grid g-2">
      <div class="field" style="grid-column:1/-1"><span class="label">Name</span><input class="input" id="bgName" placeholder="e.g. September operating" value="${b?esc(b.name):''}"></div>
      <div class="field"><span class="label">Type</span>${UI.select('x',['Monthly','Quarterly','Campaign'],b?b.type:'Monthly','100%').replace('data-filter="x"','id="bgType"')}</div>
      <div class="field"><span class="label">Period</span><input class="input" id="bgPeriod" placeholder="e.g. Sep 2026" value="${b?esc(b.period):MONTHS[S.month]+' '+YEAR()}"></div>
      <div class="field"><span class="label">Budget amount</span><input class="input" id="bgBudget" type="number" value="${b?b.budget:20000}" step="1000"></div>
      <div class="field"><span class="label">Actual spent so far</span><input class="input" id="bgActual" type="number" value="${b?b.actual:0}" step="500"></div>
      <div class="field"><span class="label">Department</span>${UI.select('x',DEPTS,b?b.dept:'Operations','100%').replace('data-filter="x"','id="bgDept"')}</div>
    </div>`,
    foot:`<button class="btn" data-close="1">Cancel</button><button class="btn btn-primary" data-act="save-budget" data-id="${editId||''}">${b?'Save changes':'Create budget'}</button>`});
}
function saveBudget(editId){
  const name=$('#bgName').value.trim()||'Untitled budget';
  if(editId){
    const b=BUDGETS.find(x=>x.id===editId); if(!b) return;
    Object.assign(b,{name,type:$('#bgType').value,period:$('#bgPeriod').value,budget:+$('#bgBudget').value||0,
      actual:+$('#bgActual').value||0,dept:$('#bgDept').value});
    b.remaining=b.budget-b.actual; b.util=b.budget? b.actual/b.budget*100:0;
    persistBudget(b);
    logActivity({id:newId('LOG'),date:iso(TODAY),time:new Date().toTimeString().slice(0,5),
      who:ME.id,what:'edited budget',ref:editId,label:name,type:'Budget'});
    closeLayers(); render(); toast('Saved changes — '+name,'check');
    return;
  }
  const id=newId('BUD');
  const b={id,name,type:$('#bgType').value,period:$('#bgPeriod').value,budget:+$('#bgBudget').value||0,actual:+$('#bgActual').value||0,dept:$('#bgDept').value};
  b.remaining=b.budget-b.actual; b.util=b.budget? b.actual/b.budget*100:0;
  BUDGETS.push(b); persistBudget(b);
  logActivity({id:newId('LOG'),date:iso(TODAY),time:new Date().toTimeString().slice(0,5),
    who:ME.id,what:'created budget',ref:id,label:name,type:'Budget'});
  closeLayers(); go('budget'); toast('Created budget — '+name,'plus');
}

function newGoalModal(editId){
  const g = editId ? GOALS.find(x=>x.id===editId) : null;
  openModal({title: g?'Edit target':'Set a target', sub:'A KPI the dashboard tracks month to month.',
    body:`<div class="grid g-2">
      <div class="field" style="grid-column:1/-1"><span class="label">Name</span><input class="input" id="glName" placeholder="e.g. Monthly revenue" value="${g?esc(g.name):''}"></div>
      <div class="field"><span class="label">Owner</span>${UI.select('x',TEAM.map(t=>({v:t.id,l:t.name})),g?g.owner:ME.id,'100%').replace('data-filter="x"','id="glOwner"')}</div>
      <div class="field"><span class="label">Format</span>${UI.select('x',[{v:'peso',l:'Peso (₱)'},{v:'num',l:'Number'},{v:'numK',l:'Number (k/M)'},{v:'pct',l:'Percent'}],g?g.fmt:'peso','100%').replace('data-filter="x"','id="glFmt"')}</div>
      <div class="field"><span class="label">Target</span><input class="input" id="glTarget" type="number" value="${g?g.target:100000}" step="1000"></div>
      <div class="field"><span class="label">Actual so far</span><input class="input" id="glActual" type="number" value="${g?g.actual:0}" step="1000"></div>
      <div class="field"><span class="label">Lower is better?</span>${UI.select('x',[{v:'0',l:'No — higher is better'},{v:'1',l:'Yes — lower is better'}],g?(g.inverse?'1':'0'):'0','100%').replace('data-filter="x"','id="glInverse"')}</div>
    </div>`,
    foot:`<button class="btn" data-close="1">Cancel</button><button class="btn btn-primary" data-act="save-goal" data-id="${editId||''}">${g?'Save changes':'Set target'}</button>`});
}
function saveGoal(editId){
  const name=$('#glName').value.trim()||'Untitled target';
  if(editId){
    const g=GOALS.find(x=>x.id===editId); if(!g) return;
    Object.assign(g,{name,owner:$('#glOwner').value,target:+$('#glTarget').value||0,actual:+$('#glActual').value||0,
      fmt:$('#glFmt').value,inverse:$('#glInverse').value==='1'});
    g.pct = g.inverse ? (g.actual? g.target/g.actual*100:0) : (g.target? g.actual/g.target*100:0);
    g.variance = g.inverse ? g.target-g.actual : g.actual-g.target;
    persistGoal(g);
    logActivity({id:newId('LOG'),date:iso(TODAY),time:new Date().toTimeString().slice(0,5),
      who:ME.id,what:'edited target',ref:editId,label:name,type:'Goal'});
    closeLayers(); render(); toast('Saved changes — '+name,'check');
    return;
  }
  const id=newId('GOAL');
  const g={id,name,owner:$('#glOwner').value,target:+$('#glTarget').value||0,actual:+$('#glActual').value||0,
    fmt:$('#glFmt').value,inverse:$('#glInverse').value==='1'};
  g.pct = g.inverse ? (g.actual? g.target/g.actual*100:0) : (g.target? g.actual/g.target*100:0);
  g.variance = g.inverse ? g.target-g.actual : g.actual-g.target;
  GOALS.push(g); persistGoal(g);
  logActivity({id:newId('LOG'),date:iso(TODAY),time:new Date().toTimeString().slice(0,5),
    who:ME.id,what:'set target',ref:id,label:name,type:'Goal'});
  closeLayers(); go('goals'); toast('Set target — '+name,'plus');
}

function newAssetModal(editId){
  const a = editId ? ASSETS.find(x=>x.id===editId) : null;
  openModal({title: a?'Edit asset':'Add asset', sub:'Registers the file in the library with version tracking.',
    body:`<div class="grid g-2">
      <div class="field" style="grid-column:1/-1"><span class="label">File name</span><input class="input" id="asName" placeholder="e.g. Hero_shot_v1.mp4" value="${a?esc(a.name):''}"></div>
      <div class="field"><span class="label">Type</span>${UI.select('x',ASSET_TYPES,a?a.type:'Video','100%').replace('data-filter="x"','id="asType"')}</div>
      <div class="field"><span class="label">Creator</span>${UI.select('x',TEAM.map(t=>({v:t.id,l:t.name})),a?a.creator:ME.id,'100%').replace('data-filter="x"','id="asCreator"')}</div>
      <div class="field"><span class="label">Linked content (optional)</span>${UI.select('x',[{v:'',l:'None'},...CONTENT.map(c=>({v:c.id,l:c.title}))],a?a.content:'','100%').replace('data-filter="x"','id="asContent"')}</div>
      <div class="field"><span class="label">Campaign (optional)</span>${UI.select('x',[{v:'',l:'None'},...CAMPAIGNS.map(c=>({v:c.id,l:c.name}))],a?a.campaign:'','100%').replace('data-filter="x"','id="asCmp"')}</div>
      <div class="field" style="grid-column:1/-1"><span class="label">Tags</span><input class="input" id="asTags" placeholder="comma, separated, tags" value="${a?esc(a.tags):''}"></div>
    </div>`,
    foot:`<button class="btn" data-close="1">Cancel</button><button class="btn btn-primary" data-act="save-asset" data-id="${editId||''}">${a?'Save changes':'Add asset'}</button>`});
}
function saveAsset(editId){
  const name=$('#asName').value.trim()||'Untitled asset';
  if(editId){
    const a=ASSETS.find(x=>x.id===editId); if(!a) return;
    Object.assign(a,{name,type:$('#asType').value,content:$('#asContent').value||'',campaign:$('#asCmp').value||'',
      creator:$('#asCreator').value,tags:$('#asTags').value.trim()});
    persistAsset(a);
    logActivity({id:newId('LOG'),date:iso(TODAY),time:new Date().toTimeString().slice(0,5),
      who:ME.id,what:'edited asset',ref:editId,label:name,type:'Asset'});
    closeLayers(); render(); if($('.drawer')) openDetail('asset',editId); toast('Saved changes — '+name,'check');
    return;
  }
  const id=newId('AST');
  const a={id,name,type:$('#asType').value,content:$('#asContent').value||'',campaign:$('#asCmp').value||'',
    creator:$('#asCreator').value,date:iso(TODAY),version:1,status:'Draft',tags:$('#asTags').value.trim()};
  ASSETS.push(a); persistAsset(a);
  logActivity({id:newId('LOG'),date:iso(TODAY),time:new Date().toTimeString().slice(0,5),
    who:ME.id,what:'added asset',ref:id,label:name,type:'Asset'});
  closeLayers(); go('library'); toast('Added asset — '+name,'plus');
}

function newScheduleModal(editId){
  if(!CONTENT.length){ toast('Create content first — a scheduled post needs to link to something','alert'); return; }
  const p = editId ? PUBLISHING.find(x=>x.id===editId) : null;
  openModal({title: p?'Edit publishing record':'Schedule a post', sub:'Queues the content for publishing on a platform and account.',
    body:`<div class="grid g-2">
      <div class="field" style="grid-column:1/-1"><span class="label">Content</span>${UI.select('x',CONTENT.map(c=>({v:c.id,l:c.title})),p?p.content:CONTENT[0].id,'100%').replace('data-filter="x"','id="scContent"')}</div>
      <div class="field"><span class="label">Platform</span>${UI.select('x',PLATFORMS.map(pl=>({v:pl.id,l:pl.name})),p?p.platform:PLATFORMS[0].id,'100%').replace('data-filter="x"','id="scPlat"')}</div>
      <div class="field"><span class="label">Account handle</span><input class="input" id="scAccount" placeholder="@handle" value="${p?esc(p.account):''}"></div>
      <div class="field"><span class="label">Date</span><input class="input" type="date" id="scDate" value="${p?p.date:iso(new Date(TODAY.getTime()+864e5))}"></div>
      <div class="field"><span class="label">Time</span><input class="input" type="time" id="scTime" value="${p?p.time:'12:00'}"></div>
      <div class="field" style="grid-column:1/-1"><span class="label">Hashtags</span><input class="input" id="scTags" placeholder="#tag1 #tag2" value="${p?esc(p.hashtags):''}"></div>
    </div>`,
    foot:`<button class="btn" data-close="1">Cancel</button><button class="btn btn-primary" data-act="save-schedule" data-id="${editId||''}">${p?'Save changes':'Schedule'}</button>`});
}
function saveSchedule(editId){
  const contentId=$('#scContent').value;
  if(editId){
    const p=PUBLISHING.find(x=>x.id===editId); if(!p) return;
    Object.assign(p,{content:contentId,platform:$('#scPlat').value,account:$('#scAccount').value.trim(),
      date:$('#scDate').value,time:$('#scTime').value,hashtags:$('#scTags').value.trim()});
    persistPublishing(p);
    logActivity({id:newId('LOG'),date:iso(TODAY),time:new Date().toTimeString().slice(0,5),
      who:ME.id,what:'edited publishing record',ref:editId,label:CT[contentId]?CT[contentId].title:contentId,type:'Publishing'});
    closeLayers(); render(); toast('Saved changes','check');
    return;
  }
  const id=newId('PUB');
  const p={id,content:contentId,platform:$('#scPlat').value,account:$('#scAccount').value.trim(),
    date:$('#scDate').value,time:$('#scTime').value,status:'Scheduled',url:'',hashtags:$('#scTags').value.trim()};
  PUBLISHING.push(p); persistPublishing(p);
  const c=CT[contentId];
  if(c && !c.isPublished){ c.status='Scheduled'; c.stageIndex=STAGES.indexOf('Scheduled'); persistContent(c); }
  logActivity({id:newId('LOG'),date:iso(TODAY),time:new Date().toTimeString().slice(0,5),
    who:ME.id,what:'scheduled a post for',ref:id,label:c?c.title:contentId,type:'Publishing'});
  closeLayers(); go('publishing'); toast('Scheduled for '+F.dateFull(p.date),'plus');
}

function reassignModal(id){
  const c=CT[id]; if(!c) return;
  openModal({title:'Reassign owner', sub:c.title,
    body:`<div class="field"><span class="label">New owner</span>${UI.select('x',TEAM.map(t=>({v:t.id,l:t.name})),c.owner,'100%').replace('data-filter="x"','id="raOwner"')}</div>`,
    foot:`<button class="btn" data-close="1">Cancel</button><button class="btn btn-primary" data-act="save-reassign" data-id="${id}">Reassign</button>`});
}
function saveReassign(id){
  const c=CT[id]; if(!c) return;
  const newOwner=$('#raOwner').value, from=c.owner;
  c.owner=newOwner; persistContent(c);
  logActivity({id:newId('LOG'),date:iso(TODAY),time:new Date().toTimeString().slice(0,5),
    who:ME.id,what:'reassigned from '+memName(from)+' to '+memName(newOwner),ref:c.id,label:c.title,type:'Content'});
  closeLayers(); openDetail('content',id); render(); toast('Reassigned to '+memName(newOwner),'check');
}
function customiseModal(){
  const names={summary:'Executive summary and health',money:'Financial headline figures',charts:'Trend charts',
    pipeline:'Production pipeline',platforms:'Platform table',team:'Team workload',alerts:'Alerts',activity:'Activity feed'};
  openModal({title:'Customise the dashboard', sub:'Choose what the command centre shows first.',
    body:Object.keys(names).map(k=>`<div class="row" style="padding:9px 0;border-bottom:1px solid var(--line-2)">
      <span class="t-sm">${names[k]}</span>
      <span class="switch ${S.widgets[k]?'on':''}" data-widget="${k}" style="margin-left:auto"></span></div>`).join(''),
    foot:`<button class="btn btn-primary" data-close="1">Done</button>`});
}
document.addEventListener('click',e=>{
  const w=e.target.closest('[data-widget]');
  if(w){ const k=w.dataset.widget; S.widgets[k]=!S.widgets[k]; w.classList.toggle('on',!!S.widgets[k]); }
});

function inviteUserModal(editId){
  const t = editId ? MEM[editId] : null;
  openModal({title: t?'Edit team member':'Invite someone', sub: t?'Updates their record — access level stays managed from the table.':'They become both a team member and an account.',
    body:`<div class="grid g-2">
      <div class="field"><span class="label">Full name</span>
        <input class="input" id="iuName" placeholder="e.g. Maria Santos" style="width:100%" value="${t?esc(t.name):''}"></div>
      <div class="field"><span class="label">Preferred name (optional)</span>
        <input class="input" id="iuNick" placeholder="What greetings and the feed call them" style="width:100%" value="${t?esc(t.nickname||''):''}"></div>
      <div class="field"><span class="label">Email</span>
        <input class="input" id="iuEmail" type="email" placeholder="name@atrium.ph" style="width:100%" value="${t?esc(t.email):''}"></div>
      <div class="field"><span class="label">Job title</span>
        <input class="input" id="iuTitle" placeholder="e.g. Video Editor" style="width:100%" value="${t?esc(t.role):''}"></div>
      <div class="field"><span class="label">Department</span>
        ${UI.select('x',DEPTS,t?t.dept:'Production','100%').replace('data-filter="x"','id="iuDept"')}</div>
      ${t?'':`<div class="field"><span class="label">Access level</span>
        ${UI.select('x',ROLES.filter(r=>r.id!=='owner').map(r=>({v:r.id,l:r.name})),'creator','100%').replace('data-filter="x"','id="iuAccess"')}</div>`}
      <div class="field"><span class="label">Weekly capacity</span>
        <input class="input" id="iuCap" type="number" value="${t?t.capacity:40}" step="5" style="width:100%"></div>
    </div>
    ${t?'':`<div class="note info mt-l">Owner is not on the list on purpose — there is only ever one, and handing it over is a separate, deliberate step.</div>`}`,
    foot:`<button class="btn" data-close="1">Cancel</button>
      <button class="btn btn-primary" data-act="save-user" data-id="${editId||''}">${t?'Save changes':'Send invite'}</button>`});
}
function saveUser(editId){
  const name=($('#iuName')?$('#iuName').value.trim():'')||'Unnamed person';
  const cap=+($('#iuCap')?$('#iuCap').value:40)||0;
  if(editId){
    const t=MEM[editId]; if(!t) return;
    Object.assign(t,{name, nickname:($('#iuNick')?$('#iuNick').value.trim():''), role:($('#iuTitle')?$('#iuTitle').value.trim():'')||'Team member',
      dept:$('#iuDept')?$('#iuDept').value:t.dept, email:($('#iuEmail')?$('#iuEmail').value.trim():''),
      capacity:cap, initials:F.initials(name)});
    t.load = t.capacity? Math.round(t.allocated/t.capacity*100):0;
    persistTeam(t);
    logActivity({id:newId('LOG'), date:iso(TODAY), time:new Date().toTimeString().slice(0,5),
      who:ME.id, what:'edited the profile of', ref:editId, label:name, type:'Access'});
    closeLayers(); render(); toast('Saved changes — '+name,'check');
    return;
  }
  const id='tm'+(TEAM.length+1)+Date.now().toString(36).slice(-3);
  const palette=['#3A5A8C','#6A4BC4','#0E7C4F','#9A6700','#C0392B','#2F6E8F','#7A4F2A','#8A3C6B'];
  const t={id, name,
    nickname: ($('#iuNick')?$('#iuNick').value.trim():''),
    role: ($('#iuTitle')?$('#iuTitle').value.trim():'') || 'Team member',
    dept: $('#iuDept')?$('#iuDept').value:'Production',
    color: palette[TEAM.length % palette.length],
    done:0, onTime:100, turn:0, active:0, capacity:cap, allocated:0,
    joined: new Date().toISOString().slice(0,10),
    initials: F.initials(name),
    email: ($('#iuEmail')?$('#iuEmail').value.trim():''),
    access: $('#iuAccess')?$('#iuAccess').value:'creator',
    status:'Invited', lastActive:'',
    load: 0};
  TEAM.push(t); MEM[id]=t; persistTeam(t);
  logActivity({id:'LOG-u'+id, date:new Date().toISOString().slice(0,10),
    time:new Date().toTimeString().slice(0,5), who:ME.id, what:'invited',
    ref:id, label:name+' as '+roleName(t.access), type:'Access'});
  closeLayers(); go('users');
  toast('Invited '+name+' as '+roleName(t.access),'plus');
}

function newContentModal(editId){
  const c = editId ? CT[editId] : null;
  openModal({title: c?'Edit content':'New content', sub:'This writes a real record — it appears on the board, in costs and in reports.',
    body:`<div class="grid g-2">
      <div class="field" style="grid-column:1/-1"><span class="label">Title</span>
        <input class="input" id="ncTitle" placeholder="e.g. Chicken Barbecue, Three Marinades" value="${c?esc(c.title):''}"></div>
      <div class="field"><span class="label">Content type</span>
        ${UI.select('x',uniq(CONTENT.map(x=>x.type)),c?c.type:'Short-form video','100%').replace('data-filter="x"','id="ncType"')}</div>
      <div class="field"><span class="label">Category</span>
        ${UI.select('x',uniq(CONTENT.map(x=>x.category)),c?c.category:'Recipe','100%').replace('data-filter="x"','id="ncCat"')}</div>
      <div class="field"><span class="label">Platform</span>
        ${UI.select('x',PLATFORMS.map(p=>({v:p.id,l:p.name})),c?c.platform:'tiktok','100%').replace('data-filter="x"','id="ncPlat"')}</div>
      <div class="field"><span class="label">Campaign</span>
        ${UI.select('x',CAMPAIGNS.map(x=>({v:x.id,l:x.name})),c?c.campaign:(CAMPAIGNS[0]?CAMPAIGNS[0].id:''),'100%').replace('data-filter="x"','id="ncCmp"')}</div>
      <div class="field"><span class="label">Owner</span>
        ${UI.select('x',TEAM.map(t=>({v:t.id,l:t.name})),c?c.owner:ME.id,'100%').replace('data-filter="x"','id="ncOwner"')}</div>
      <div class="field"><span class="label">Editor</span>
        ${UI.select('x',TEAM.map(t=>({v:t.id,l:t.name})),c?c.editor:ME.id,'100%').replace('data-filter="x"','id="ncEditor"')}</div>
      <div class="field"><span class="label">Priority</span>
        ${UI.select('x',['Critical','High','Medium','Low'],c?c.priority:'Medium','100%').replace('data-filter="x"','id="ncPrio"')}</div>
      <div class="field"><span class="label">Deadline</span><input class="input" type="date" id="ncDue" value="${c?c.deadline:iso(new Date(TODAY.getTime()+14*864e5))}"></div>
      <div class="field" style="grid-column:1/-1"><span class="label">Estimated production cost</span>
        <input class="input" id="ncCost" type="number" value="${c?c.estCost:5500}" step="500"></div>
    </div>`,
    foot:`<button class="btn" data-close="1">Cancel</button>
      <button class="btn btn-primary" data-act="save-content" data-id="${editId||''}">${c?'Save changes':'Create content'}</button>`});
}
function saveContent(editId){
  const title=$('#ncTitle').value.trim()||'Untitled content';
  if(editId){
    const c=CT[editId]; if(!c) return;
    Object.assign(c,{title,type:$('#ncType').value,category:$('#ncCat').value,platform:$('#ncPlat').value,
      campaign:$('#ncCmp').value,owner:$('#ncOwner').value,editor:$('#ncEditor').value,
      priority:$('#ncPrio').value,deadline:$('#ncDue').value,estCost:+$('#ncCost').value||0});
    persistContent(c);
    logActivity({id:newId('LOG'),date:iso(TODAY),time:new Date().toTimeString().slice(0,5),
      who:ME.id,what:'edited',ref:editId,label:title,type:'Content'});
    closeLayers(); render(); if($('.drawer')) openDetail('content',editId); toast('Saved changes — '+title,'check');
    return;
  }
  const id='CNT-'+String(CONTENT.length+1).padStart(3,'0');
  const c={id,title,type:$('#ncType').value,category:$('#ncCat').value,platform:$('#ncPlat').value,
    campaign:$('#ncCmp').value,status:'Idea',owner:$('#ncOwner').value,editor:$('#ncEditor').value,
    priority:$('#ncPrio').value,deadline:$('#ncDue').value,estCost:+$('#ncCost').value||0,cost:0,
    views:0,er:0,followers:0,revenue:0,published:'',watch:0,completion:0,
    costLines:[],profit:0,roi:0,engagements:0,isPublished:false,stageIndex:0};
  c.stages=STAGE_FLOW.map((s,i)=>({name:s,owner:i<3?c.owner:c.editor,state:i===0?'In progress':'Not started',hours:0,days:0}));
  CONTENT.push(c); CT[id]=c; persistContent(c);
  logActivity({id:'LOG-n'+CONTENT.length,date:iso(TODAY),time:new Date().toTimeString().slice(0,5),
    who:ME.id,what:'created',ref:id,label:title,type:'Content'});
  closeLayers(); go('planner'); toast('Created '+id+' — '+title,'plus');
}
function advanceStage(id){
  const c=CT[id], i=STAGES.indexOf(c.status);
  if(i<0||i>=STAGES.length-1){ toast('Already published','checkC'); return; }
  c.status=STAGES[i+1]; c.stageIndex=i+1; c.isPublished=c.status==='Published';
  if(c.isPublished && !c.published) c.published=iso(TODAY);
  persistContent(c);
  if(c.isPublished) syncPublishingForContent(c);
  logActivity({id:'LOG-m'+Math.random(),date:iso(TODAY),time:new Date().toTimeString().slice(0,5),
    who:ME.id,what:'moved to '+c.status,ref:c.id,label:c.title,type:'Status'});
  openDetail('content',id); render(); toast(c.title+' moved to '+c.status,'chevR');
}

/* ---------- kanban drag and drop ---------- */
let dragId=null;
document.addEventListener('dragstart',e=>{
  const card=e.target.closest('.kcard'); if(!card) return;
  dragId=card.dataset.id; card.classList.add('dragging');
  e.dataTransfer.effectAllowed='move'; e.dataTransfer.setData('text/plain',dragId);
});
document.addEventListener('dragend',e=>{ const c=e.target.closest('.kcard'); if(c) c.classList.remove('dragging');
  $$('.col').forEach(c=>c.classList.remove('drag-over')); });
document.addEventListener('dragover',e=>{ const col=e.target.closest('.col'); if(!col) return;
  e.preventDefault(); e.dataTransfer.dropEffect='move';
  $$('.col').forEach(c=>c.classList.toggle('drag-over',c===col)); });
document.addEventListener('drop',e=>{
  const col=e.target.closest('.col'); if(!col||!dragId) return;
  e.preventDefault();
  const c=CT[dragId], to=col.dataset.col;
  if(c && c.status!==to){
    const from=c.status; c.status=to; c.stageIndex=STAGES.indexOf(to); c.isPublished=(to==='Published');
    if(to==='Published'&&!c.published) c.published=iso(TODAY);
    persistContent(c);
    if(c.isPublished) syncPublishingForContent(c);
    logActivity({id:'LOG-d'+Math.random(),date:iso(TODAY),time:new Date().toTimeString().slice(0,5),
      who:ME.id,what:`moved ${from} → ${to}`,ref:c.id,label:c.title,type:'Status'});
    toast(`${c.title} moved to ${to}`,'check');
  }
  dragId=null; render();
});

/* ---------- exports ---------- */
function doExport(what){
  const map={
    content:['content',[{k:'id',label:'ID'},{k:'title',label:'Title'},{k:'type',label:'Type'},{k:'status',label:'Stage'},
      {k:'platform',label:'Platform',raw:r=>PLAT[r.platform].name},{k:'campaign',label:'Campaign',raw:r=>cmpName(r.campaign)},
      {k:'owner',label:'Owner',raw:r=>memName(r.owner)},{k:'deadline',label:'Deadline'},
      {k:'estCost',label:'Estimated cost'},{k:'cost',label:'Actual cost'},{k:'revenue',label:'Revenue'}],CONTENT],
    performance:['performance',[{k:'id',label:'ID'},{k:'title',label:'Title'},{k:'views',label:'Views'},{k:'er',label:'Engagement rate'},
      {k:'followers',label:'Followers'},{k:'revenue',label:'Revenue'},{k:'cost',label:'Cost'},
      {k:'roi',label:'ROI %',raw:r=>r.roi.toFixed(1)},{k:'score',label:'Score',raw:r=>score(r)}],PUBLISHED],
    revenue:['revenue',[{k:'date',label:'Date'},{k:'source',label:'Source'},{k:'client',label:'Customer'},
      {k:'campaign',label:'Campaign',raw:r=>cmpName(r.campaign)},{k:'amount',label:'Amount'},
      {k:'status',label:'Status'},{k:'invoice',label:'Invoice'}],REVENUE],
    expenses:['expenses',[{k:'date',label:'Date'},{k:'category',label:'Category'},{k:'vendor',label:'Vendor'},
      {k:'description',label:'Description'},{k:'dept',label:'Department'},{k:'amount',label:'Amount'},
      {k:'recurrence',label:'Type'},{k:'approval',label:'Approval'}],EXPENSES],
    costs:['production-costs',[{k:'id',label:'ID'},{k:'title',label:'Content'},{k:'estCost',label:'Estimate'},
      {k:'cost',label:'Actual'},{k:'revenue',label:'Revenue'},{k:'profit',label:'Profit'},
      {k:'roi',label:'ROI %',raw:r=>r.roi.toFixed(1)}],CONTENT.filter(c=>c.cost>0)],
    team:['team',[{k:'name',label:'Name'},{k:'role',label:'Role'},{k:'dept',label:'Department'},
      {k:'done',label:'Completed'},{k:'onTime',label:'On time %'},{k:'turn',label:'Turnaround days'},
      {k:'load',label:'Workload %'}],TEAM],
    workload:['workload',[{k:'name',label:'Name'},{k:'allocated',label:'Allocated hours'},{k:'capacity',label:'Capacity'},
      {k:'load',label:'Load %'},{k:'active',label:'Active tasks'}],TEAM],
    tasks:['tasks',[{k:'title',label:'Task'},{k:'assignee',label:'Assignee',raw:r=>memName(r.assignee)},
      {k:'dept',label:'Department'},{k:'priority',label:'Priority'},{k:'status',label:'Status'},{k:'due',label:'Due'}],TASKS],
    campaigns:['campaigns',[{k:'name',label:'Campaign'},{k:'status',label:'Status'},{k:'budget',label:'Budget'},
      {k:'spent',label:'Spent'},{k:'revenue',label:'Revenue'},{k:'profit',label:'Profit',raw:r=>r.revenue-r.spent},
      {k:'roi',label:'ROI %',raw:r=>(r.spent?(r.revenue-r.spent)/r.spent*100:0).toFixed(1)}],CAMPAIGNS],
    platforms:['platforms',[{k:'name',label:'Platform'},{k:'count',label:'Posts'},{k:'views',label:'Views'},
      {k:'er',label:'Engagement %',raw:r=>r.er.toFixed(2)},{k:'revenue',label:'Revenue'},
      {k:'roi',label:'ROI %',raw:r=>r.roi.toFixed(1)}],byPlatform()],
    budget:['budget',[{k:'name',label:'Budget'},{k:'type',label:'Type'},{k:'period',label:'Period'},
      {k:'budget',label:'Budget'},{k:'actual',label:'Actual'},{k:'remaining',label:'Remaining'},
      {k:'util',label:'Utilisation %',raw:r=>r.util.toFixed(1)}],BUDGETS],
    goals:['goals',[{k:'name',label:'Goal'},{k:'owner',label:'Owner'},{k:'target',label:'Target'},
      {k:'actual',label:'Actual'},{k:'pct',label:'Achievement %',raw:r=>r.pct.toFixed(1)}],GOALS],
    assets:['assets',[{k:'name',label:'File'},{k:'type',label:'Type'},{k:'version',label:'Version'},
      {k:'status',label:'Status'},{k:'date',label:'Updated'}],ASSETS],
    activity:['activity-log',[{k:'date',label:'Date'},{k:'time',label:'Time'},
      {k:'who',label:'Person',raw:r=>memName(r.who)},{k:'what',label:'Action'},{k:'label',label:'Reference'},
      {k:'type',label:'Type'}],ACTIVITY],
    publishing:['publishing',[{k:'id',label:'Record'},{k:'content',label:'Content',raw:r=>CT[r.content].title},
      {k:'platform',label:'Platform',raw:r=>PLAT[r.platform].name},{k:'date',label:'Date'},{k:'time',label:'Time'},
      {k:'status',label:'Status'}],PUBLISHING],
    production:['production',[{k:'id',label:'ID'},{k:'title',label:'Content'},{k:'status',label:'Stage'},
      {k:'owner',label:'Owner',raw:r=>memName(r.owner)},{k:'deadline',label:'Deadline'},{k:'cost',label:'Spent'}],inProduction()],
    profitability:['profitability',[{k:'title',label:'Content'},{k:'cost',label:'Cost'},{k:'revenue',label:'Revenue'},
      {k:'profit',label:'Profit'},{k:'roi',label:'ROI %',raw:r=>r.roi.toFixed(1)}],PUBLISHED]
  };
  if(map[what]){ const [n,c,r]=map[what]; exportCSV(n,c,r); return; }
  const m=metrics(S.month);
  exportCSV(what==='briefing'?'management-summary':'financial-summary',
    [{k:'metric',label:'Metric'},{k:'value',label:'Value'}],
    [['Period',MONTHS[S.month]+' '+YEAR()],['Revenue',m.revenue],['Direct costs',m.direct],['Gross profit',m.gross],
     ['Operating expenses',m.opex],['Net profit',m.net],['Gross margin %',m.grossMargin.toFixed(1)],
     ['Net margin %',m.netMargin.toFixed(1)],['Cash position',m.cash],['Receivables',m.ar],['Payables',m.ap],
     ['Content published',m.published],['Views',m.views],['Cost per video',Math.round(m.costPerContent)],
     ['Revenue per video',Math.round(m.revPerContent)],['Return on content spend %',m.roi.toFixed(1)]]
      .map(x=>({metric:x[0],value:x[1]})));
}

/* ============================================================
   35. COMMAND PALETTE
   ============================================================ */
let palIdx=0, palItems=[];
function openPalette(){
  $('#layers').innerHTML=`<div class="overlay" data-close="1"></div>
    <div class="palette" role="dialog" aria-label="Command palette">
      <input class="palette-input" id="palInput" placeholder="Jump to a screen, a video, a person or a campaign" autocomplete="off">
      <div class="palette-list" id="palList"></div>
      <div class="palette-foot"><span>↑ ↓ to move</span><span>↵ to open</span><span>esc to close</span></div>
    </div>`;
  document.body.style.overflow='hidden';
  palFill(''); const inp=$('#palInput'); inp.focus();
  inp.addEventListener('input',()=>palFill(inp.value));
  inp.addEventListener('keydown',e=>{
    if(e.key==='ArrowDown'){ e.preventDefault(); palIdx=Math.min(palIdx+1,palItems.length-1); palPaint(); }
    if(e.key==='ArrowUp'){ e.preventDefault(); palIdx=Math.max(palIdx-1,0); palPaint(); }
    if(e.key==='Enter'){ e.preventDefault(); palRun(palItems[palIdx]); }
  });
}
function palFill(q){
  q=q.toLowerCase(); const out=[];
  NAV.forEach(g=>g.items.forEach(i=>{ if(!q||i.label.toLowerCase().includes(q))
    out.push({group:'Go to',label:i.label,icon:i.icon,run:()=>go(i.id)}); }));
  CONTENT.forEach(c=>{ if(q&&(c.title.toLowerCase().includes(q)||c.id.toLowerCase().includes(q)))
    out.push({group:'Content',label:c.title,sub:c.id+' · '+c.status,icon:'production',run:()=>openDetail('content',c.id)}); });
  TEAM.forEach(t=>{ if(q&&t.name.toLowerCase().includes(q))
    out.push({group:'People',label:t.name,sub:t.role,icon:'user',run:()=>openDetail('member',t.id)}); });
  CAMPAIGNS.forEach(c=>{ if(q&&c.name.toLowerCase().includes(q))
    out.push({group:'Campaigns',label:c.name,sub:c.status,icon:'campaigns',run:()=>openDetail('campaign',c.id)}); });
  if(q&&'dark mode appearance theme'.includes(q)) out.push({group:'Actions',label:'Switch appearance',icon:'moon',run:()=>doAction('theme')});
  if(q&&'new content create'.includes(q)) out.push({group:'Actions',label:'Create new content',icon:'plus',run:()=>newContentModal()});
  palItems=out.slice(0,24); palIdx=0; palPaint();
}
function palPaint(){
  let html='', last='';
  palItems.forEach((it,i)=>{
    if(it.group!==last){ html+=`<div class="palette-group">${it.group}</div>`; last=it.group; }
    html+=`<div class="palette-item" data-pal="${i}" aria-selected="${i===palIdx}">
      ${icon(it.icon,15)}<span style="min-width:0"><span class="truncate" style="display:block">${esc(it.label)}</span>
      ${it.sub?`<span class="t-xs dim">${esc(it.sub)}</span>`:''}</span></div>`;
  });
  const list=$('#palList');
  list.innerHTML = html || UI.empty('Nothing matched','Try a video title, a person or a screen name.');
  const sel=list.querySelector('[aria-selected="true"]'); if(sel) sel.scrollIntoView({block:'nearest'});
  $$('[data-pal]',list).forEach(el=>el.addEventListener('click',()=>palRun(palItems[+el.dataset.pal])));
}
function palRun(it){ if(!it) return; closeLayers(); it.run(); }


/* ============================================================
   35b. GUIDED TOUR — follows the data, not the menu
   ============================================================ */
const TOUR = [
 {view:'dashboard', title:'Start with the question, not the data',
  text:'This is the only screen that tells you what to think. It reads every other module and writes the answer in sentences. Everything else in this system exists to make these few paragraphs true.'},
 {view:'planner', title:'Everything starts as a card',
  text:'A video is born here and gets an ID — CNT-014 — that it keeps forever. Drag a card between columns and watch the stage change. This is the only screen that creates content.'},
 {view:'production', title:'The same content, seen as a queue',
  text:'Nothing new is typed here. It is the planner regrouped so you can see where work is piling up. Two editors are over capacity in this data, and this is where you would notice.'},
 {view:'publishing', title:'Where your system meets the outside world',
  text:'A publishing record is a video meeting a platform. It holds the live URL — the single most important field if you ever want YouTube figures to flow in automatically.'},
 {view:'analytics', title:'Now the numbers come back',
  text:'Views, engagement, watch time and followers attach to the video they belong to. Because the ID never changed, performance lands on the same record that holds the cost.'},
 {view:'expenses', title:'The half that YouTube will never tell you',
  text:'Every peso out, split into direct (spent making a specific video) and operating (spent keeping the studio open). This split decides both your margins. Get it wrong and every profit figure is wrong.'},
 {view:'costs', title:'What each video actually cost',
  text:'Expenses tagged to a video become the cost of that video, estimate against actual. After a few months this screen tells you what a video of each type really costs.'},
 {view:'profitability', title:'The payoff',
  text:'Revenue on the video minus cost on the video. Nobody calculated this — it assembled itself because the right IDs were attached along the way. This is the screen that should change what you film next month.'},
 {view:'financials', title:'And the formal version',
  text:'The same figures as a profit and loss statement, a cash position and a receivables list. Profit says the model works; cash says you can pay people on Friday. Watch both.'},
 {view:'settings', title:'You set the rules',
  text:'Drag a scoring slider and every ranking in the system rebuilds in front of you. The system has opinions, but they are your opinions — written down, applied consistently.'}
];
let tourIdx = 0;
function startTour(){ tourIdx=0; S.guide=true; paintTour(); }
function paintTour(){
  if(tourIdx<0) tourIdx=0;
  const t=TOUR[tourIdx];
  if(!t){ closeLayers(); toast('That is the whole system, end to end','checkC'); return; }
  go(t.view);
  $('#layers').innerHTML=`<div class="tour" role="dialog" aria-label="Guided tour">
    <div class="tour-top"><span class="tour-step">Step ${tourIdx+1} of ${TOUR.length}</span>
      <span class="badge ghost" style="margin-left:auto">${NAV_INDEX[t.view].label}</span></div>
    <div class="tour-title">${esc(t.title)}</div>
    <div class="tour-text">${esc(t.text)}</div>
    <div class="tour-foot">
      <div class="tour-dots">${TOUR.map((_,i)=>`<i class="tour-dot ${i===tourIdx?'on':''}"></i>`).join('')}</div>
      <button class="btn btn-sm" data-act="tour-end">Close</button>
      ${tourIdx>0?`<button class="btn btn-sm" data-act="tour-back">Back</button>`:''}
      <button class="btn btn-primary btn-sm" data-act="tour-next">${tourIdx===TOUR.length-1?'Finish':'Next'}</button>
    </div></div>`;
}
function welcome(){
  openModal({title:'Welcome to Atrium', sub:'Two things to know before you click anything.',
    body:`<p class="t-md" style="line-height:1.55;margin-bottom:14px"><b>One idea holds this together.</b>
      Every video gets an ID the day it is thought of. Costs, tasks, posts and income all get tagged with that ID —
      which is why this system can answer the question most content businesses cannot: <i>did that video make us money?</i></p>
    <p class="t-md" style="line-height:1.55;margin-bottom:14px"><b>Every screen explains itself.</b>
      The panel under each title says what the screen is for, where its numbers come from, and which screens it feeds.
      The chips are clickable — follow one and you are following the data. Turn the panel off any time with the
      ${icon('sparkle',13)} button in the top bar.</p>
    <div class="note info">Nothing here is fragile. Drag cards, tick tasks, change the month, move the scoring sliders.
      Refresh the page and it all comes back exactly as it started.</div>`,
    foot:`<button class="btn" data-close="1">I will explore on my own</button>
      <button class="btn btn-primary" data-act="tour">Walk me through it</button>`});
}

/* ============================================================
   35c. LIVE CLOCK — the device's own date and time
   ============================================================ */
/* reads the device clock, so the greeting changes as the day does */
function greeting(){
  const h = new Date().getHours();
  return h < 12 ? 'Good morning' : h < 18 ? 'Good afternoon' : 'Good evening';
}
let _greet = greeting();
let _lastMonth = new Date().getMonth();

function tickClock(){
  const n = new Date();
  const day = n.toLocaleDateString('en-PH',{weekday:'short', day:'numeric', month:'short', year:'numeric'});
  const time = n.toLocaleTimeString('en-PH',{hour:'numeric', minute:'2-digit', second:'2-digit', hour12:true});
  const d=$('#clockDay'), t=$('#clockTime');
  if(d) d.textContent = day;
  if(t) t.textContent = time;

  if(iso(n) !== iso(TODAY)){         /* the day turned over while this was open */
    TODAY = new Date(); TODAY.setHours(0,0,0,0);
    if(S.month !== TODAY.getMonth() && _lastMonth === S.month) S.month = TODAY.getMonth();
    _lastMonth = S.month;
    render(); toast('A new day — ' + F.dateFull(iso(TODAY)), 'clock');
  }

  const g = greeting();
  if(g !== _greet){                       /* noon and 6pm, while the tab is open */
    _greet = g;
    const head = $('#view .page-title');
    if(S.view === 'dashboard' && head) head.textContent = g + ', ' + ME.name.split(' ')[0];
  }
}

/* ============================================================
   36. KEYBOARD
   ============================================================ */
document.addEventListener('keydown',e=>{
  if((e.metaKey||e.ctrlKey)&&e.key.toLowerCase()==='k'){ e.preventDefault(); openPalette(); return; }
  if(e.key==='Escape'){ closeLayers(); return; }
  const typing=/^(INPUT|TEXTAREA|SELECT)$/.test(document.activeElement.tagName);
  if(typing||e.metaKey||e.ctrlKey||e.altKey) return;
  if(e.key==='/'){ e.preventDefault(); openPalette(); }
  if(e.key==='g'){ S._g=true; setTimeout(()=>S._g=false,900); return; }
  if(S._g){ const map={d:'dashboard',c:'planner',p:'production',a:'analytics',t:'tasks',
    f:'financials',r:'revenue',e:'expenses',b:'budget',m:'briefing'};
    if(map[e.key]) go(map[e.key]); S._g=false; }
});
$('#openPalette').addEventListener('click',openPalette);
$('#themeBtn').addEventListener('click',()=>doAction('theme'));
$('#guideBtn').addEventListener('click',()=>doAction('guide'));
$('#bellBtn').addEventListener('click',()=>go('notifications'));
$('#navToggle').addEventListener('click',()=>{
  if(innerWidth<=900){ S.navOpen=!S.navOpen; $('#app').classList.toggle('nav-open',S.navOpen); }
  else { S.collapsed=!S.collapsed; $('#app').classList.toggle('collapsed',S.collapsed); }
});
$('#navScrim').addEventListener('click',()=>{ S.navOpen=false; $('#app').classList.remove('nav-open'); });
addEventListener('hashchange',()=>{ try{ const h=location.hash.replace('#/',''); if(V[h]&&h!==S.view) go(h); }catch(e){} });

/* ============================================================
   37. START
   ============================================================ */
$('#view').innerHTML=`<div class="view-inner">
  <div class="sk" style="height:26px;width:280px;margin-bottom:22px"></div>
  <div class="grid g-6" style="margin-bottom:14px">${Array.from({length:6}).map(()=>'<div class="sk" style="height:112px"></div>').join('')}</div>
  <div class="sk" style="height:220px;margin-bottom:14px"></div>
  <div class="grid g-2">${Array.from({length:2}).map(()=>'<div class="sk" style="height:280px"></div>').join('')}</div>
</div>`;
/* ============================================================
   38. AUTH
   Login-gated: nothing in the app loads until Supabase confirms
   a signed-in session belonging to an admin listed in `team`.
   ============================================================ */
function renderAuthScreen(msg){
  $('#app').style.display='none';
  const el=$('#authScreen'); el.hidden=false;
  el.innerHTML=`<div style="min-height:100vh;display:flex;align-items:center;justify-content:center;background:var(--surface-2);padding:16px">
    <div class="card" style="width:340px;max-width:100%">
      <div class="card-body">
        <div style="display:flex;justify-content:center;margin-bottom:16px">${LOGO.mark(32)}</div>
        <div class="w6" style="font-size:16px;text-align:center;margin-bottom:2px">Welcome to Atrium</div>
        <div class="t-xs dim" style="text-align:center;margin-bottom:20px">A smarter way to manage your operations.</div>
        ${msg?`<div class="note neg" style="margin-bottom:14px">${esc(msg)}</div>`:''}
        <div class="field" style="margin-bottom:12px"><span class="label">Email</span>
          <input class="input" id="authEmail" type="email" style="width:100%" placeholder="you@atrium.ph"></div>
        <div class="field" style="margin-bottom:18px"><span class="label">Password</span>
          <input class="input" id="authPass" type="password" style="width:100%" placeholder="••••••••"></div>
        <button class="btn btn-primary" id="authSubmit" style="width:100%">Sign in</button>
      </div>
    </div>
  </div>`;
  $('#authSubmit').addEventListener('click', doLogin);
  $('#authPass').addEventListener('keydown', e=>{ if(e.key==='Enter') doLogin(); });
  $('#authEmail').focus();
}
async function doLogin(){
  const email=$('#authEmail').value.trim(), pass=$('#authPass').value;
  const btn=$('#authSubmit'); btn.disabled=true; btn.textContent='Signing in…';
  const {error} = await sb.auth.signInWithPassword({email,password:pass});
  if(error){ renderAuthScreen(error.message); return; }
  location.reload();
}
function doLogout(){
  if(!sb) return;
  try{ localStorage.removeItem(IDLE_KEY); }catch(e){}
  sb.auth.signOut().then(()=>location.reload());
}
function showApp(){
  $('#authScreen').hidden=true;
  $('#app').style.display='';
}
/* ---- auto-lock after 30 minutes away, tab open or closed ---- */
const IDLE_LIMIT = 30*60*1000;
const IDLE_KEY = 'atrium_last_active';
function touchActivity(){ try{ localStorage.setItem(IDLE_KEY, String(Date.now())); }catch(e){} }
function idleExpired(){
  try{
    const last = +localStorage.getItem(IDLE_KEY);
    return last ? (Date.now()-last) > IDLE_LIMIT : false;
  }catch(e){ return false; }
}
let _idleTouchQueued=false;
function startIdleWatch(){
  const onActivity=()=>{ if(_idleTouchQueued) return; _idleTouchQueued=true;
    setTimeout(()=>{ touchActivity(); _idleTouchQueued=false; },5000); };
  ['click','keydown','mousemove','scroll','touchstart'].forEach(ev=>document.addEventListener(ev,onActivity,{passive:true}));
  touchActivity();
  setInterval(()=>{ if(idleExpired()) doLogout(); }, 30000);
}
async function startApp(){
  if(!sb){ await boot(); if(S._fresh) setTimeout(welcome,420); return; }
  if(idleExpired()){ try{ await sb.auth.signOut(); }catch(e){} renderAuthScreen('Locked after 30 minutes away — please sign in again.'); return; }
  const {data:{session}} = await sb.auth.getSession();
  if(!session){ renderAuthScreen(); return; }
  showApp();
  touchActivity();
  startIdleWatch();
  await boot();
  if(S._fresh) setTimeout(welcome,420);
}
if(sb) sb.auth.onAuthStateChange((event)=>{ if(event==='SIGNED_OUT') location.reload(); });

setTimeout(startApp,220);
