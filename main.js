// SUPABASE SETUP
const SITE_SUPABASE_URL = "https://wtyqmqqobswhtqbikudr.supabase.co";
const SITE_SUPABASE_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Ind0eXFtcXFvYnN3aHRxYmlrdWRyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODIzMDA0ODgsImV4cCI6MjA5Nzg3NjQ4OH0.7YUUINCzWGLtMmvhFYXe2js9-c00eZ4IliqKhE5J3Ig";

const sbSite = window.supabase.createClient(SITE_SUPABASE_URL, SITE_SUPABASE_KEY);

// ── DATA ──────────────────────────────────────────────────────────────
const sportsNews = [
  { sport:"nba",e:"🏀",t:"Celtics Clinch East Title, Head to NBA Finals",time:"2h ago",d:"Boston Celtics secured the Eastern Conference with a dominant 108-95 win, advancing to the NBA Finals for the second straight year.",p:"Celtics ML +110 — RAYMOND PICK ✅" },
  { sport:"nba",e:"🏀",t:"Tatum Drops 38 Points in Closeout Win",time:"4h ago",d:"Jayson Tatum delivered 38 points, 9 rebounds and 7 assists to eliminate Miami in 5 games. A vintage playoff masterclass.",p:"Tatum O32.5 Pts — RAYMOND PICK ✅" },
  { sport:"nba",e:"🏀",t:"NBA Finals Schedule: Games Start June 25",time:"1d ago",d:"The NBA officially released the Finals schedule. Games 1 & 2 tip off in Boston before shifting west for Games 3 & 4.",p:null },
  { sport:"nba",e:"🏀",t:"LeBron Announces Return to Lakers for One More Year",time:"3h ago",d:"LeBron James made the blockbuster announcement that he will return to the Lakers, targeting one final championship run.",p:"Lakers Win Total Over — RAYMOND PICK" },
  { sport:"nhl",e:"🏒",t:"McDavid Hat Trick Puts Oilers Up 3-2",time:"1h ago",d:"Connor McDavid dominated Game 5 with a hat trick, putting Edmonton in a commanding position in the Stanley Cup Finals.",p:"McDavid O1.5 Pts — RAYMOND PICK ✅" },
  { sport:"nhl",e:"🏒",t:"Panthers Goalie Bobrovsky Questionable for Game 6",time:"5h ago",d:"Sergei Bobrovsky left practice early with an undisclosed injury, casting doubt on his availability for Game 6.",p:null },
  { sport:"nfl",e:"🏈",t:"Chiefs Listed as Early Super Bowl Favorites",time:"6h ago",d:"Oddsmakers installed the Kansas City Chiefs as Super Bowl favorites following their dominant offseason acquisitions.",p:"Chiefs Super Bowl Futures — RAYMOND PICK" },
  { sport:"nfl",e:"🏈",t:"Mahomes Signs Record Contract Extension",time:"1d ago",d:"Patrick Mahomes agreed to a historic extension, becoming the highest-paid player in NFL history.",p:null },
  { sport:"mlb",e:"⚾",t:"Dodgers Sweep Padres in 3-Game Series",time:"1h ago",d:"Los Angeles extended their NL West lead with a dominant 3-game sweep. Freddie Freeman batted .467 in the series.",p:"Dodgers ML -140 — RAYMOND PICK ✅" },
  { sport:"mlb",e:"⚾",t:"Yankees Over Trend: 7 Straight Games Hit",time:"3h ago",d:"New York's bullpen struggles continue fueling overs as the Yankees have gone over their run total in seven consecutive games.",p:"Yankees O8.5 +130 — RAYMOND PICK ✅" },
  { sport:"soccer",e:"⚽",t:"Man City vs Arsenal: Title Race Goes to Final Day",time:"2h ago",d:"Man City and Arsenal separated by one point heading into the final matchday. Football's most dramatic title race in years.",p:"Man City ML — RAYMOND PICK" },
  { sport:"soccer",e:"⚽",t:"Champions League Final: Real Madrid vs Bayern",time:"5h ago",d:"Comprehensive breakdown of Saturday's UCL Final with full statistical analysis and our key angles.",p:"Real Madrid -0.5 AH — RAYMOND PICK" },
  { sport:"tennis",e:"🎾",t:"Wimbledon Draw: Djokovic Faces Tough Path",time:"4h ago",d:"Djokovic was placed in a difficult bracket, potentially facing Alcaraz in the semis. Our picks dropping soon.",p:"Alcaraz Winner — RAYMOND PICK" },
  { sport:"tennis",e:"🎾",t:"French Open: Shock Upset Reshuffles Women's Draw",time:"1d ago",d:"A stunning first-round upset at Roland Garros has completely reshuffled the bottom half of the women's bracket.",p:null },
  { sport:"mma",e:"🥊",t:"UFC 310 Confirmed: Jones vs Aspinall",time:"3h ago",d:"The most anticipated heavyweight bout of 2025 is official — Jon Jones vs Tom Aspinall for the undisputed UFC title.",p:"Aspinall +180 — RAYMOND PICK" },
  { sport:"mma",e:"🥊",t:"Adesanya Announces Return to Middleweight",time:"6h ago",d:"Israel Adesanya officially returning to the UFC Middleweight division, eyeing a title shot before year's end.",p:null },
];

const wins = [
  {n:"James",b:"FanDuel",a:"$3,600"},{n:"Marcus",b:"DraftKings",a:"$2,150"},
  {n:"Devon",b:"BetMGM",a:"$850"},{n:"Aaliyah",b:"FanDuel",a:"$4,200"},
  {n:"Tyrone",b:"Caesars",a:"$1,780"},{n:"Jasmine",b:"DraftKings",a:"$990"},
  {n:"Chris",b:"FanDuel",a:"$5,500"},{n:"Destiny",b:"BetMGM",a:"$1,350"},
  {n:"Andre",b:"FanDuel",a:"$2,900"},{n:"Keisha",b:"DraftKings",a:"$750"},
  {n:"Darius",b:"Caesars",a:"$3,100"},{n:"Monique",b:"FanDuel",a:"$6,000"},
  {n:"Terrell",b:"BetMGM",a:"$1,620"},{n:"Brianna",b:"DraftKings",a:"$2,450"},
  {n:"Mike",b:"FanDuel",a:"$4,800"},{n:"Shaniqua",b:"DraftKings",a:"$7,200"},
  {n:"DeShawn",b:"BetMGM",a:"$1,940"},{n:"Kevin",b:"Caesars",a:"$3,350"},
];

// ── STATE ─────────────────────────────────────────────────────────────
let isDark=true, selPlan="yearly", selPayment=null, wIdx=0, wTimer=null,
    currentSport="all", userPlan="monthly", currentUser=null;

// Live payment details — defaults, overwritten by DB on load
const paymentDetails = {
  chime:    { tag:"$RaymondPicks",           phone:"(305) 555-0142" },
  zelle:    { email:"pay@raymondpicks.com",  phone:"(305) 555-0142" },
  applepay: { id:"raymondpicks@icloud.com" },
  bitcoin:  { address:"bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh" },
};

// ── LOAD PAYMENT INFO FROM SUPABASE ──────────────────────────────────
async function loadPaymentDetailsFromDB() {
  try {
    const { data, error } = await sbSite.from("payment_info").select("*");
    if (error || !data) return;
    data.forEach((row) => {
      if (row.method === "chime") {
        if (row.field1) paymentDetails.chime.tag   = row.field1;
        if (row.field2) paymentDetails.chime.phone = row.field2;
      } else if (row.method === "zelle") {
        if (row.field1) paymentDetails.zelle.email = row.field1;
        if (row.field2) paymentDetails.zelle.phone = row.field2;
      } else if (row.method === "apple") {
        if (row.field1) paymentDetails.applepay.id  = row.field1;
      } else if (row.method === "bitcoin") {
        if (row.field1) paymentDetails.bitcoin.address = row.field1;
      }
    });
  } catch (e) {
    console.warn("Could not load payment info:", e);
  }
}

// ── APPLY LIVE DATA TO PAYMENT MODAL DOM ─────────────────────────────
function applyPaymentDetailsToDOM() {
  // ── Chime ──
  setText("chime-tag-display",   paymentDetails.chime.tag);
  setText("chime-phone-display", paymentDetails.chime.phone);
  setText("chime-tag-instr",     paymentDetails.chime.tag);
  const cTagBtn   = document.getElementById("chime-tag-copy-btn");
  const cPhoneBtn = document.getElementById("chime-phone-copy-btn");
  if (cTagBtn)   cTagBtn.onclick   = () => copyText(paymentDetails.chime.tag);
  if (cPhoneBtn) cPhoneBtn.onclick = () => copyText(paymentDetails.chime.phone);

  // ── Zelle ──
  setText("zelle-email-display", paymentDetails.zelle.email);
  setText("zelle-phone-display", paymentDetails.zelle.phone);
  setText("zelle-email-instr",   paymentDetails.zelle.email);
  const zEmailBtn = document.getElementById("zelle-email-copy-btn");
  const zPhoneBtn = document.getElementById("zelle-phone-copy-btn");
  if (zEmailBtn) zEmailBtn.onclick = () => copyText(paymentDetails.zelle.email);
  if (zPhoneBtn) zPhoneBtn.onclick = () => copyText(paymentDetails.zelle.phone);

  // ── Apple Pay ──
  setText("apple-id-display", paymentDetails.applepay.id);
  setText("apple-id-instr",   paymentDetails.applepay.id);
  const aBtn = document.getElementById("apple-id-copy-btn");
  if (aBtn) aBtn.onclick = () => copyText(paymentDetails.applepay.id);

  // ── Bitcoin ──
  setText("btc-address-display", paymentDetails.bitcoin.address);
  const bBtn = document.getElementById("btc-copy-btn");
  if (bBtn) bBtn.onclick = () => copyText(paymentDetails.bitcoin.address);
}

function setText(id, val) {
  const el = document.getElementById(id);
  if (el) el.textContent = val || "";
}

// ── OPEN PAY MODAL (fetches fresh data each time) ────────────────────
async function openPayModal() {
  await loadPaymentDetailsFromDB();
  applyPaymentDetailsToDOM();
  document.getElementById("pay-step1").classList.remove("hidden");
  document.getElementById("pay-step2").classList.add("hidden");
  document.getElementById("pay-modal").classList.remove("hidden");
}

// ── THEME ─────────────────────────────────────────────────────────────
function toggleTheme() {
  isDark = !isDark;
  document.documentElement.classList.toggle("dark", isDark);
  document.getElementById("themeIco").textContent = isDark ? "☀️" : "🌙";
  document.getElementById("themeLbl").textContent = isDark ? "Light" : "Dark";
}

// ── PAGE NAV ──────────────────────────────────────────────────────────
function showPage(p) {
  document.querySelectorAll(".page").forEach((el) => el.classList.remove("active"));
  document.getElementById("page-" + p).classList.add("active");
  window.scrollTo(0, 0);
}

// ── SPORTS NEWS ──────────────────────────────────────────────────────
function filterSport(sport, btn) {
  currentSport = sport;
  document.querySelectorAll(".sport-btn").forEach((b) => {
    b.classList.remove("active-sport","bg-gold","text-ink","border-gold");
    b.classList.add("bg-white/5","text-white/50","border-white/10");
  });
  if (btn) {
    btn.classList.add("active-sport","bg-gold","text-ink","border-gold");
    btn.classList.remove("bg-white/5","text-white/50","border-white/10");
  }
  renderNews();
}

function renderNews() {
  const g = document.getElementById("news-grid");
  const items = currentSport === "all" ? sportsNews : sportsNews.filter((n) => n.sport === currentSport);
  if (!items.length) {
    g.innerHTML = '<div class="col-span-3 text-center text-white/30 py-12">No news found for this sport.</div>';
    return;
  }
  g.innerHTML = items.map((n) => `
    <div class="bg-surface/60 border border-white/8 rounded-2xl p-5 hover:border-gold/30 transition-all">
      <div class="flex items-center gap-2 mb-3">
        <span class="text-xl">${n.e}</span>
        <span class="text-[10px] font-bold text-white/30 uppercase tracking-widest">${n.sport.toUpperCase()}</span>
        <span class="ml-auto text-[10px] text-white/25">${n.time}</span>
      </div>
      <h3 class="font-bold text-sm leading-snug mb-2 text-white">${n.t}</h3>
      <p class="text-white/40 text-xs leading-relaxed ${n.p?"mb-3":""}">${n.d}</p>
      ${n.p?`<div class="bg-gold/8 border border-gold/20 rounded-lg px-3 py-2 text-gold text-xs font-bold">📌 ${n.p}</div>`:""}
    </div>
  `).join("");
}

// ── PASSWORD ──────────────────────────────────────────────────────────
function tPwd(id, btn) {
  const el = document.getElementById(id);
  el.type = el.type === "password" ? "text" : "password";
  btn.textContent = el.type === "password" ? "👁" : "🙈";
}
function chkStr() {
  const v = document.getElementById("su-pass").value;
  const bar = document.getElementById("str-bar"), lbl = document.getElementById("str-lbl");
  let s = 0;
  if (v.length >= 8) s++;
  if (/[A-Z]/.test(v)) s++;
  if (/[0-9]/.test(v)) s++;
  if (/[^A-Za-z0-9]/.test(v)) s++;
  const L = [["0%","#ef4444",""],["25%","#ef4444","Weak"],["50%","#f59e0b","Fair"],["75%","#3b82f6","Good"],["100%","#22c55e","Strong ✓"]];
  bar.style.width = L[s][0]; bar.style.background = L[s][1];
  lbl.textContent = L[s][2]; lbl.style.color = L[s][1];
}

// ── SIGN IN ──────────────────────────────────────────────────────────
async function doSignIn() {
  const email = document.getElementById("si-email").value.trim().toLowerCase();
  const pass  = document.getElementById("si-pass").value;
  const err   = document.getElementById("si-err");
  err.classList.add("hidden");
  if (!email || !pass) { err.textContent="⚠ Please fill in all fields."; err.classList.remove("hidden"); return; }
  if (!email.includes("@")) { err.textContent="⚠ Enter a valid email."; err.classList.remove("hidden"); return; }
  try {
    const { data, error } = await sbSite.from("users").select("*").eq("email",email).single();
    if (error || !data) { err.textContent="⚠ No account found with that email."; err.classList.remove("hidden"); return; }
    if (data.password !== pass) { err.textContent="⚠ Incorrect password."; err.classList.remove("hidden"); return; }
    loadDashboard(data);
    await sbSite.from("users").update({status:"online",last_seen:new Date().toISOString()}).eq("id",data.id);
    showPage("dashboard");
  } catch(e) { err.textContent="⚠ Connection error. Please try again."; err.classList.remove("hidden"); }
}

// ── SIGN UP ──────────────────────────────────────────────────────────
function goStep2() {
  const vals = [
    document.getElementById("su-name").value.trim(),
    document.getElementById("su-phone").value.trim(),
    document.getElementById("su-country").value,
    document.getElementById("su-email").value.trim(),
    document.getElementById("su-pass").value,
    document.getElementById("su-conf").value,
  ];
  const err = document.getElementById("su-err");
  if (vals.some((v) => !v)) { err.textContent="⚠ Please fill in all fields."; err.classList.remove("hidden"); return; }
  if (!vals[3].includes("@")) { err.textContent="⚠ Enter a valid email."; err.classList.remove("hidden"); return; }
  if (vals[4].length < 8) { err.textContent="⚠ Password must be 8+ characters."; err.classList.remove("hidden"); return; }
  if (vals[4] !== vals[5]) { err.textContent="⚠ Passwords do not match."; err.classList.remove("hidden"); return; }
  err.classList.add("hidden");
  document.getElementById("su-step1").classList.add("hidden");
  document.getElementById("su-step2").classList.remove("hidden");
  document.getElementById("s1-tab").className="flex-1 py-2.5 rounded-lg text-xs font-bold text-white/40 transition-all";
  document.getElementById("s2-tab").className="flex-1 py-2.5 rounded-lg text-xs font-bold bg-gold text-ink transition-all";
}

function backStep1() {
  document.getElementById("su-step1").classList.remove("hidden");
  document.getElementById("su-step2").classList.add("hidden");
  document.getElementById("s1-tab").className="flex-1 py-2.5 rounded-lg text-xs font-bold bg-gold text-ink transition-all";
  document.getElementById("s2-tab").className="flex-1 py-2.5 rounded-lg text-xs font-bold text-white/40 transition-all";
}

function selectPlan(p) {
  selPlan = p;
  ["monthly","yearly","lifetime"].forEach((x) => {
    const card = document.getElementById("pc-"+x);
    const rad  = document.getElementById("pr-"+x);
    if (!card||!rad) return;
    if (x===p) {
      card.className="border-2 border-gold rounded-xl p-4 cursor-pointer plan-selected transition-all flex items-center gap-4 relative";
      rad.className="w-4 h-4 rounded-full border-2 border-gold bg-gold flex-shrink-0 transition-all";
    } else {
      card.className="border border-white/8 rounded-xl p-4 cursor-pointer hover:border-gold/50 transition-all flex items-center gap-4";
      rad.className="w-4 h-4 rounded-full border-2 border-white/30 flex-shrink-0 transition-all";
    }
  });
  const labels={monthly:"Monthly — $150/mo",yearly:"Yearly — $1,000/yr",lifetime:"Lifetime — $1,500"};
  const lbl = document.getElementById("pay-plan-label");
  if (lbl) lbl.textContent = labels[p];
}

async function doSignUp() {
  if (!selPlan) { const e=document.getElementById("p-err"); e.textContent="⚠ Please choose a plan."; e.classList.remove("hidden"); return; }
  const name     = document.getElementById("su-name").value.trim();
  const phone    = document.getElementById("su-phone").value.trim();
  const country  = document.getElementById("su-country").value;
  const email    = document.getElementById("su-email").value.trim().toLowerCase();
  const password = document.getElementById("su-pass").value;
  const pe = document.getElementById("p-err");
  pe.classList.add("hidden");
  try {
    const { data:existing } = await sbSite.from("users").select("id").eq("email",email).maybeSingle();
    if (existing) { pe.textContent="⚠ An account with that email already exists."; pe.classList.remove("hidden"); return; }
    const { data, error } = await sbSite.from("users").insert([{name,email,phone,country,password,plan:selPlan,deposited:0,balance:0,status:"online",last_seen:new Date().toISOString()}]).select().single();
    if (error) { pe.textContent="⚠ "+error.message; pe.classList.remove("hidden"); return; }
    loadDashboard(data);
    ["su-name","su-phone","su-email","su-pass","su-conf"].forEach((id)=>{ const el=document.getElementById(id); if(el) el.value=""; });
    const sc=document.getElementById("su-country"); if(sc) sc.value="";
    backStep1(); selPlan="yearly"; selectPlan("yearly");
    showPage("dashboard");
  } catch(e) { pe.textContent="⚠ Connection error. Please try again."; pe.classList.remove("hidden"); }
}

function loadDashboard(data) {
  currentUser = data;
  userPlan = data.plan || "monthly";
  document.getElementById("dash-name").textContent = "Welcome"+(data.name?", "+cap(data.name.split(" ")[0]):"")+" 🏆";
  document.getElementById("dash-deposited").textContent = "$"+parseFloat(data.deposited||0).toFixed(2);
  const balEl = document.querySelector("#page-dashboard .font-bebas.text-3xl.text-green-400");
  if (balEl) balEl.textContent = "$"+parseFloat(data.balance||0).toFixed(2);
  updateDashBadge();
  updateNavLoggedIn();
}

function updateNavLoggedIn() {
  document.getElementById("nav-join-btn").textContent = "My Dashboard";
  document.getElementById("nav-join-btn").onclick = () => showPage("dashboard");
  document.getElementById("nav-signin-btn").classList.add("hidden");
}

async function doSignOut() {
  if (currentUser) await sbSite.from("users").update({status:"offline"}).eq("id",currentUser.id);
  currentUser = null;
  document.getElementById("nav-join-btn").textContent = "Join VIP";
  document.getElementById("nav-join-btn").onclick = () => showPage("signup");
  document.getElementById("nav-signin-btn").classList.remove("hidden");
  showPage("landing");
}

// ── DASHBOARD PLAN SWITCH ─────────────────────────────────────────────
async function switchDashPlan(p) {
  userPlan = p;
  ["monthly","yearly","lifetime"].forEach((x) => {
    const card=document.getElementById("dp-"+x), rad=document.getElementById("dr-"+x);
    if (!card||!rad) return;
    if (x===p) { card.className="border border-gold rounded-xl p-4 cursor-pointer plan-selected transition-all"; rad.className="w-4 h-4 rounded-full border-2 border-gold bg-gold"; }
    else { card.className="border border-white/8 rounded-xl p-4 cursor-pointer hover:border-gold/50 transition-all"; rad.className="w-4 h-4 rounded-full border-2 border-white/30"; }
  });
  updateDashBadge();
  if (currentUser) { await sbSite.from("users").update({plan:p}).eq("id",currentUser.id); currentUser.plan=p; }
  showToast("Plan updated to "+cap(p)+" ✅");
}

function updateDashBadge() {
  const lbs={monthly:"MONTHLY VIP",yearly:"YEARLY PRO",lifetime:"LIFETIME ELITE"};
  document.getElementById("dash-badge").textContent = lbs[userPlan]||"VIP MEMBER";
}

function goHome() {
  document.querySelectorAll(".page").forEach((el) => el.classList.remove("active"));
  document.getElementById("page-landing").classList.add("active");
  window.scrollTo(0,0);
  if (currentUser) {
    document.getElementById("nav-join-btn").textContent="My Dashboard";
    document.getElementById("nav-join-btn").onclick=()=>showPage("dashboard");
    document.getElementById("nav-signin-btn").classList.add("hidden");
  }
}

// ── PAYMENT MODAL ─────────────────────────────────────────────────────
const payInfo = {
  chime:    {icon:"💚",name:"Chime",    bg:"rgba(6,193,103,.15)", border:"rgba(6,193,103,.4)"},
  zelle:    {icon:"💜",name:"Zelle",    bg:"rgba(139,92,246,.15)",border:"rgba(139,92,246,.4)"},
  applepay: {icon:"🍎",name:"Apple Pay",bg:"rgba(255,255,255,.08)",border:"rgba(255,255,255,.2)"},
  bitcoin:  {icon:"₿", name:"Bitcoin",  bg:"rgba(251,146,60,.15)",border:"rgba(251,146,60,.4)"},
};

function selectPayment(method) {
  const info = payInfo[method];
  const iconEl = document.getElementById("pay-method-icon");
  iconEl.textContent = info.icon;
  iconEl.style.background = info.bg;
  iconEl.style.border = "1px solid "+info.border;
  document.getElementById("pay-method-name").textContent = info.name;
  document.getElementById("pay-method-plan").textContent = document.getElementById("pay-plan-label").textContent;
  ["chime","zelle","applepay","bitcoin"].forEach((m)=>document.getElementById("details-"+m).classList.add("hidden"));
  document.getElementById("details-"+method).classList.remove("hidden");
  document.getElementById("pay-step1").classList.add("hidden");
  document.getElementById("pay-step2").classList.remove("hidden");
  selPayment = method;
}

function backToPayStep1() {
  document.getElementById("pay-step2").classList.add("hidden");
  document.getElementById("pay-step1").classList.remove("hidden");
}

function closePayModal() {
  document.getElementById("pay-modal").classList.add("hidden");
  document.getElementById("pay-step2").classList.add("hidden");
  document.getElementById("pay-step1").classList.remove("hidden");
  selPayment = null;
}

async function confirmPayment() {
  const labels={chime:"Chime",zelle:"Zelle",applepay:"Apple Pay",bitcoin:"Bitcoin"};
  const planPrices={monthly:150,yearly:1000,lifetime:1500};
  const planLabel=document.getElementById("pay-plan-label").textContent;
  if (currentUser) {
    await sbSite.from("withdrawals").insert([{user_id:currentUser.id,user_name:currentUser.name,amount:planPrices[userPlan]||0,method:labels[selPayment]||selPayment,account:planLabel,status:"pending",type:"payment"}]);
  }
  document.getElementById("pay-modal").classList.add("hidden");
  document.getElementById("pay-step2").classList.add("hidden");
  document.getElementById("pay-step1").classList.remove("hidden");
  showToast("Payment via "+(labels[selPayment]||"")+" confirmed! VIP activating 🔥");
  selPayment=null;
}

function copyText(txt) {
  navigator.clipboard.writeText(txt).then(()=>showToast("Copied: "+txt)).catch(()=>{
    const el=document.createElement("textarea"); el.value=txt;
    document.body.appendChild(el); el.select(); document.execCommand("copy");
    document.body.removeChild(el); showToast("Copied!");
  });
}

// ── TOAST ─────────────────────────────────────────────────────────────
function showToast(msg) {
  const t=document.getElementById("toast");
  t.textContent=msg; t.style.opacity="1"; t.style.transform="translateX(-50%) translateY(0)";
  setTimeout(()=>{ t.style.opacity="0"; t.style.transform="translateX(-50%) translateY(20px)"; },3200);
}

// ── WIN POPUP ─────────────────────────────────────────────────────────
function showWin() {
  const w=wins[wIdx%wins.length]; wIdx++;
  document.getElementById("wp-name").textContent=w.n;
  document.getElementById("wp-detail").textContent="just won on "+w.b+"!";
  document.getElementById("wp-amt").textContent="+"+w.a;
  const pop=document.getElementById("win-popup");
  pop.classList.add("win-show"); pop.classList.remove("win-hide"); pop.style.transform="";
  clearTimeout(wTimer);
  wTimer=setTimeout(()=>{
    pop.classList.add("win-hide"); pop.classList.remove("win-show");
    setTimeout(showWin, 3500+Math.random()*4000);
  },4200);
}

// ── WITHDRAW MODAL ────────────────────────────────────────────────────
function openWithdrawModal() {
  document.getElementById("w-modal").classList.remove("hidden");
  document.getElementById("w-step1").classList.remove("hidden");
  document.getElementById("w-step2").classList.add("hidden");
  document.getElementById("w-step1-err").classList.add("hidden");
  document.getElementById("w-pin-err").classList.add("hidden");
  clearPin();
}
function closeWithdrawModal() { document.getElementById("w-modal").classList.add("hidden"); clearPin(); }
function backWithdrawStep1() { document.getElementById("w-step2").classList.add("hidden"); document.getElementById("w-step1").classList.remove("hidden"); clearPin(); }

function submitWithdrawDetails() {
  const amount=document.getElementById("w-amount").value.trim();
  const account=document.getElementById("w-account").value.trim();
  const err=document.getElementById("w-step1-err");
  if (!amount||parseFloat(amount)<=0) { err.textContent="⚠ Please enter a valid withdrawal amount."; err.classList.remove("hidden"); return; }
  if (!account) { err.textContent="⚠ Please enter your account or handle."; err.classList.remove("hidden"); return; }
  err.classList.add("hidden");
  const method=document.getElementById("w-method").value;
  document.getElementById("w-summary-method").textContent=method;
  document.getElementById("w-summary-amount").textContent="$"+parseFloat(amount).toFixed(2);
  document.getElementById("w-step1").classList.add("hidden");
  document.getElementById("w-step2").classList.remove("hidden");
  document.getElementById("pin0").focus();
}

// ── PIN ───────────────────────────────────────────────────────────────
let CORRECT_PIN = "33211";
async function loadWithdrawPin() {
  try {
    const { data } = await sbSite.from("settings").select("value").eq("key","withdraw_pin").single();
    if (data && data.value) CORRECT_PIN = data.value;
  } catch(e) { /* use default */ }
}

function clearPin() {
  for (let i=0;i<5;i++) {
    const el=document.getElementById("pin"+i);
    if(el){ el.value=""; el.classList.remove("border-green-500","border-red-500","border-gold"); el.classList.add("border-white/10"); }
  }
}

function pinInput(el,idx) {
  el.value=el.value.replace(/[^0-9]/g,"").slice(-1);
  document.getElementById("w-pin-err").classList.add("hidden");
  el.classList.remove("border-red-500","border-green-500"); el.classList.add("border-gold");
  if (el.value && idx<4) document.getElementById("pin"+(idx+1)).focus();
}

function pinBack(e,el,idx) {
  if (e.key==="Backspace"&&!el.value&&idx>0) { const prev=document.getElementById("pin"+(idx-1)); prev.value=""; prev.focus(); }
}

async function verifyWithdrawPin() {
  let entered="";
  for (let i=0;i<5;i++) entered+=document.getElementById("pin"+i).value||"";
  if (entered.length<5) { const err=document.getElementById("w-pin-err"); err.textContent="⚠ Please enter all 5 digits."; err.classList.remove("hidden"); return; }
  await loadWithdrawPin();
  if (entered===CORRECT_PIN) {
    for (let i=0;i<5;i++) { const el=document.getElementById("pin"+i); el.classList.remove("border-white/10","border-gold","border-red-500"); el.classList.add("border-green-500"); }
    const amount=parseFloat(document.getElementById("w-amount").value)||0;
    const method=document.getElementById("w-method").value;
    const account=document.getElementById("w-account").value.trim();
    if (currentUser) await sbSite.from("withdrawals").insert([{user_id:currentUser.id,user_name:currentUser.name,amount,method,account,status:"pending",type:"withdrawal"}]);
    setTimeout(()=>{ closeWithdrawModal(); showToast("✅ Withdrawal submitted! Processing in 1–3 business days."); },600);
  } else {
    const err=document.getElementById("w-pin-err");
    err.textContent="⚠ Incorrect code. Please try again."; err.classList.remove("hidden");
    for (let i=0;i<5;i++) { const el=document.getElementById("pin"+i); el.classList.remove("border-white/10","border-gold","border-green-500"); el.classList.add("border-red-500"); }
    const boxes=document.getElementById("pin-boxes");
    boxes.style.animation="none"; boxes.offsetHeight; boxes.style.animation="shake .4s ease";
    setTimeout(clearPin,1200);
  }
}

// ── HELPERS ──────────────────────────────────────────────────────────
function cap(s) { return s ? s.charAt(0).toUpperCase()+s.slice(1) : s; }
function openBook(url) { window.open(url,"_blank","noopener,noreferrer"); }

// ── INIT ──────────────────────────────────────────────────────────────
renderNews();
selectPlan("yearly");
loadWithdrawPin();
loadPaymentDetailsFromDB();
setTimeout(showWin, 2000);