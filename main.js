// ─────────────────────────────────────────────────────────────────────
// SUPABASE SETUP
// ─────────────────────────────────────────────────────────────────────
const SITE_SUPABASE_URL = "https://fcrwercyoiinhtiaqmxf.supabase.co";
const SITE_SUPABASE_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZjcndlcmN5b2lpbmh0aWFxbXhmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODIzMjYyMTgsImV4cCI6MjA5NzkwMjIxOH0.EegX4jnihZOo4XphQl90bWyPL46cTh2jqUTcO2eMUXQ";

const sbSite = window.supabase.createClient(SITE_SUPABASE_URL, SITE_SUPABASE_KEY);

// Admin email (only this email sees the Admin nav link)
const ADMIN_EMAIL = "raymond@hgmail.com";

// ─────────────────────────────────────────────────────────────────────
// DATA
// ─────────────────────────────────────────────────────────────────────
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

const books = [
  { id:"fanduel",    name:"FanDuel",         abbr:"FD",   url:"https://fanduel.com",          bg:"135deg,#1a6ef5,#0d47b5",     fg:"#fff",   badge:"TOP PICK", badgeC:"green", rate:82, wins:1247, members:"2.1K+", desc:"Best odds + huge promos" },
  { id:"draftkings", name:"DraftKings",      abbr:"DK",   url:"https://draftkings.com",       bg:"135deg,#3d5a00,#537a00",     fg:"#b5e34d",badge:"TOP PICK", badgeC:"green", rate:79, wins:1089, members:"1.8K+", desc:"Best same-game parlays" },
  { id:"prizepicks", name:"PrizePicks",      abbr:"PP",   url:"https://prizepicks.com",       bg:"135deg,#7c3aed,#5b21b6",     fg:"#ddd6fe",badge:"PROPS 🔥", badgeC:"gold",  rate:84, wins:963,  members:"1.4K+", desc:"#1 player props platform" },
  { id:"betmgm",     name:"BetMGM",          abbr:"MGM",  url:"https://betmgm.com",           bg:"135deg,#c9a84c,#8b6914",     fg:"#fff8e1",badge:"TRUSTED", badgeC:"gray",  rate:77, wins:834,  members:"1.1K+", desc:"Vegas-grade odds & boosts" },
  { id:"betway",     name:"Betway",          abbr:"BW",   url:"https://betway.com",           bg:"135deg,#00a651,#006b35",     fg:"#d4f5e2",badge:"GLOBAL",  badgeC:"gray",  rate:76, wins:712,  members:"890+",  desc:"Global coverage, great lines" },
  { id:"bet365",     name:"Bet365",          abbr:"365",  url:"https://bet365.com",           bg:"135deg,#027b5b,#014d3a",     fg:"#b3f0dc",badge:"GLOBAL",  badgeC:"gray",  rate:78, wins:991,  members:"1.3K+", desc:"World's largest sportsbook" },
  { id:"underdog",   name:"Underdog Fantasy",abbr:"UD",   url:"https://underdogfantasy.com",  bg:"135deg,#dc2626,#991b1b",     fg:"#fecaca",badge:"RISING 📈",badgeC:"gold",  rate:81, wins:748,  members:"920+",  desc:"Best pick'em platform" },
  { id:"fliff",      name:"Fliff",           abbr:"FL",   url:"https://getfliff.com",         bg:"135deg,#0ea5e9,#0369a1",     fg:"#e0f2fe",badge:"FREE 🎯", badgeC:"gold",  rate:86, wins:621,  members:"780+",  desc:"Free-to-play social sports" },
  { id:"caesars",    name:"Caesars",         abbr:"CZR",  url:"https://caesars.com/sportsbook-and-casino", bg:"135deg,#1a1a2e,#16213e", fg:"#f0b429",badge:"VEGAS",   badgeC:"gray",  rate:75, wins:689,  members:"850+",  desc:"Vegas royalty, massive bonus" },
  { id:"pointsbet",  name:"PointsBet",       abbr:"PB",   url:"https://pointsbet.com",        bg:"135deg,#000,#1a1a1a",        fg:"#e5e7eb",badge:"UNIQUE",  badgeC:"gray",  rate:73, wins:512,  members:"620+",  desc:"PointsBetting — win big fast" },
  { id:"hardrock",   name:"Hard Rock Bet",   abbr:"HR",   url:"https://hardrock.bet",         bg:"135deg,#b91c1c,#7f1d1d",     fg:"#fecaca",badge:"NEW",     badgeC:"gray",  rate:80, wins:445,  members:"540+",  desc:"Iconic brand, sharp lines" },
  { id:"espnbet",    name:"ESPN Bet",        abbr:"ESPN", url:"https://espnbet.com",          bg:"135deg,#cc0000,#8b0000",     fg:"#fff",   badge:"HOT 🔥",  badgeC:"gold",  rate:83, wins:578,  members:"700+",  desc:"Backed by the worldwide leader" },
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

const faqData = [
  { q:"How do I receive my picks?", a:"Once your payment is confirmed (usually within 30 minutes), you'll be added to our private VIP Telegram group and Discord channel where all picks are posted daily before games start." },
  { q:"What sports do you cover?", a:"We cover NFL, NBA, MLB, NHL, MLS/Soccer, Tennis, and MMA. During peak seasons we release 3–8 picks per day across multiple sports." },
  { q:"What is your documented win rate?", a:"Our overall verified record is 8,432 wins out of 10,619 picks — a 79.4% win rate tracked across FanDuel, DraftKings, BetMGM, Caesars, and PrizePicks since the 2024 season." },
  { q:"Can I cancel my subscription?", a:"Monthly and Yearly plans can be cancelled anytime with no penalty. Lifetime memberships are one-time payments with no recurring charges. Refunds are evaluated case-by-case within 48 hours of purchase." },
  { q:"What payment methods do you accept?", a:"We accept Chime, Zelle, Apple Cash/Apple Pay, and Bitcoin (BTC). All payments go directly to Raymond's personal accounts for maximum security and speed." },
  { q:"How quickly is VIP access activated?", a:"Payment is typically confirmed within 15–30 minutes during business hours. After confirming, send your payment screenshot to our Telegram and you'll be added immediately." },
  { q:"Is there a free trial?", a:"We don't offer free trials, but we post 1–2 free preview picks per week on our public Telegram channel so you can see the quality before subscribing." },
  { q:"Do you guarantee wins?", a:"No one can guarantee wins in sports betting. We provide expert analysis and our picks are backed by a proven 79.4% historical win rate. Always bet responsibly and within your means." },
  { q:"What is the Lifetime plan?", a:"The Lifetime plan is a one-time $1,500 payment giving you forever access to all VIP picks, every future feature, Discord VIP access, and 1-on-1 strategy calls with Raymond." },
  { q:"How do I contact support?", a:"The fastest way is to DM us on Telegram @RaymondPicksVIP. For billing or account issues email support@raymondpicks.com. We typically respond within 2 hours." },
];

// ─────────────────────────────────────────────────────────────────────
// STATE
// ─────────────────────────────────────────────────────────────────────
let isDark = true, selPlan = "yearly", selPayment = null, wIdx = 0, wTimer = null,
    currentSport = "all", userPlan = "monthly", currentUser = null, menuOpen = false;

const paymentDetails = {
  chime:    { tag: "$RaymondPicks", phone: "(305) 555-0142" },
  zelle:    { email: "pay@raymondpicks.com", phone: "(305) 555-0142" },
  applepay: { id: "raymondpicks@icloud.com" },
  bitcoin:  { address: "bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh" },
};

// ─────────────────────────────────────────────────────────────────────
// NAVBAR VISIBILITY
// ─────────────────────────────────────────────────────────────────────
function updateNavVisibility(page) {
  const nav = document.querySelector("nav");
  const ticker = document.querySelector(".bg-gold.overflow-hidden");
  // Only hide nav on the standalone admin page
  if (page === "admin") {
    if (nav) nav.style.display = "none";
    if (ticker) ticker.style.display = "none";
  } else {
    if (nav) nav.style.display = "";
    if (ticker) ticker.style.display = "";
  }
}

// ─────────────────────────────────────────────────────────────────────
// THEME
// ─────────────────────────────────────────────────────────────────────
function toggleTheme() {
  isDark = !isDark;
  document.documentElement.classList.toggle("dark", isDark);
  document.querySelectorAll(".theme-ico").forEach(el => el.textContent = isDark ? "☀️" : "🌙");
  document.querySelectorAll(".theme-lbl").forEach(el => el.textContent = isDark ? "Light" : "Dark");
}

// ─────────────────────────────────────────────────────────────────────
// MOBILE MENU
// ─────────────────────────────────────────────────────────────────────
function toggleMenu() {
  menuOpen = !menuOpen;
  const drawer = document.getElementById("mobile-drawer");
  const overlay = document.getElementById("mobile-overlay");
  const icon = document.getElementById("hamburger-icon");
  if (menuOpen) {
    drawer.classList.remove("translate-x-full");
    overlay.classList.remove("hidden");
    icon.innerHTML = `<line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>`;
  } else {
    drawer.classList.add("translate-x-full");
    overlay.classList.add("hidden");
    icon.innerHTML = `<line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/>`;
  }
}
function closeMenu() {
  if (menuOpen) toggleMenu();
}

// ─────────────────────────────────────────────────────────────────────
// PAGE NAV
// ─────────────────────────────────────────────────────────────────────
function showPage(p) {
  document.querySelectorAll(".page").forEach(el => el.classList.remove("active"));
  document.getElementById("page-" + p).classList.add("active");
  window.scrollTo(0, 0);
  closeMenu();
  updateNavActive(p);
  updateNavVisibility(p);
}

function updateNavActive(p) {
  document.querySelectorAll("[data-nav]").forEach(el => {
    const t = el.getAttribute("data-nav");
    if (t === p) {
      el.classList.add("text-gold");
      el.classList.remove("text-white/60");
    } else {
      el.classList.remove("text-gold");
      el.classList.add("text-white/60");
    }
  });
}

// ─────────────────────────────────────────────────────────────────────
// BOOKS RENDER
// ─────────────────────────────────────────────────────────────────────
function renderBooks(containerId) {
  const g = document.getElementById(containerId);
  if (!g) return;
  const badgeClass = {
    green: "bg-green-400/10 border-green-400/25 text-green-400",
    gold:  "bg-gold/10 border-gold/25 text-gold",
    gray:  "bg-white/5 border-white/10 text-white/40",
  };
  g.innerHTML = books.map(b => `
    <div class="group bg-surface-2/70 border border-white/8 rounded-2xl p-5 hover:border-gold/40 hover:-translate-y-1 transition-all cursor-pointer"
         onclick="openBook('${b.url}')">
      <div class="flex items-center justify-between mb-4">
        <div class="w-12 h-12 rounded-xl flex items-center justify-center font-bold text-sm flex-shrink-0"
             style="background:linear-gradient(${b.bg});color:${b.fg};font-family:'Bebas Neue',cursive;letter-spacing:.04em">
          ${b.abbr}
        </div>
        <span class="text-[10px] font-bold border px-2 py-1 rounded-full tracking-widest ${badgeClass[b.badgeC]}">${b.badge}</span>
      </div>
      <div class="font-bold text-base text-white mb-0.5">${b.name}</div>
      <div class="text-white/35 text-xs mb-4">${b.desc}</div>
      <div class="mb-3">
        <div class="flex justify-between text-xs mb-1.5">
          <span class="text-white/40">Raymond Win Rate</span>
          <span class="font-bold text-green-400">${b.rate}%</span>
        </div>
        <div class="h-2 bg-white/5 rounded-full overflow-hidden">
          <div class="h-full rounded-full bg-gradient-to-r from-green-500 to-green-400" style="width:${b.rate}%"></div>
        </div>
      </div>
      <div class="flex items-center justify-between">
        <div>
          <div class="text-[10px] text-white/25 uppercase tracking-wider">Total Wins</div>
          <div class="font-bebas text-xl text-gold">${b.wins.toLocaleString()}</div>
        </div>
        <div class="text-right">
          <div class="text-[10px] text-white/25 uppercase tracking-wider">Members</div>
          <div class="font-bebas text-xl text-gold">${b.members}</div>
        </div>
      </div>
      <div class="mt-4 w-full bg-white/5 border border-white/10 group-hover:bg-gold group-hover:border-gold group-hover:text-ink text-white/40 text-xs font-bold py-2 rounded-lg text-center transition-all">
        Visit ${b.name} →
      </div>
    </div>
  `).join("");
}

// ─────────────────────────────────────────────────────────────────────
// SPORTS NEWS
// ─────────────────────────────────────────────────────────────────────
function filterSport(sport, btn) {
  currentSport = sport;
  document.querySelectorAll(".sport-btn").forEach(b => {
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
  if (!g) return;
  const items = currentSport === "all" ? sportsNews : sportsNews.filter(n => n.sport === currentSport);
  if (!items.length) {
    g.innerHTML = '<div class="col-span-3 text-center text-white/30 py-12">No news found for this sport.</div>';
    return;
  }
  g.innerHTML = items.map(n => `
    <div class="bg-surface-2/60 border border-white/8 rounded-2xl p-5 hover:border-gold/30 transition-all">
      <div class="flex items-center gap-2 mb-3">
        <span class="text-xl">${n.e}</span>
        <span class="text-[10px] font-bold text-white/30 uppercase tracking-widest">${n.sport.toUpperCase()}</span>
        <span class="ml-auto text-[10px] text-white/25">${n.time}</span>
      </div>
      <h3 class="font-bold text-sm leading-snug mb-2 text-white">${n.t}</h3>
      <p class="text-white/40 text-xs leading-relaxed ${n.p ? "mb-3" : ""}">${n.d}</p>
      ${n.p ? `<div class="bg-gold/8 border border-gold/20 rounded-lg px-3 py-2 text-gold text-xs font-bold">📌 ${n.p}</div>` : ""}
    </div>
  `).join("");
}

// ─────────────────────────────────────────────────────────────────────
// FAQ
// ─────────────────────────────────────────────────────────────────────
function renderFAQ() {
  const g = document.getElementById("faq-list");
  if (!g) return;
  g.innerHTML = faqData.map((f, i) => `
    <div class="border border-white/8 rounded-2xl overflow-hidden hover:border-gold/30 transition-all">
      <button onclick="toggleFAQ(${i})" class="w-full flex items-center justify-between p-5 text-left bg-transparent hover:bg-white/3 transition-colors">
        <span class="font-semibold text-white text-sm pr-4">${f.q}</span>
        <svg id="faq-ico-${i}" class="w-5 h-5 text-gold flex-shrink-0 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
          <path stroke-linecap="round" stroke-linejoin="round" d="M12 5v14M5 12h14"/>
        </svg>
      </button>
      <div id="faq-body-${i}" class="hidden px-5 pb-5">
        <p class="text-white/50 text-sm leading-relaxed">${f.a}</p>
      </div>
    </div>
  `).join("");
}

function toggleFAQ(i) {
  const body = document.getElementById("faq-body-" + i);
  const ico  = document.getElementById("faq-ico-" + i);
  const open = !body.classList.contains("hidden");
  faqData.forEach((_, j) => {
    document.getElementById("faq-body-" + j).classList.add("hidden");
    document.getElementById("faq-ico-" + j).innerHTML = `<path stroke-linecap="round" stroke-linejoin="round" d="M12 5v14M5 12h14"/>`;
  });
  if (!open) {
    body.classList.remove("hidden");
    ico.innerHTML = `<path stroke-linecap="round" stroke-linejoin="round" d="M5 12h14"/>`;
  }
}

// ─────────────────────────────────────────────────────────────────────
// ADMIN
// ─────────────────────────────────────────────────────────────────────
function showAdmin() {
  // Open admin.html in a new tab / redirect
  window.open("admin.html", "_blank");
}

async function loadAdminData() {
  const el = document.getElementById("admin-users-list");
  if (!el) return;
  el.innerHTML = `<div class="text-white/40 text-sm p-4">Loading members...</div>`;
  try {
    const { data, error } = await sbSite.from("users").select("*").order("id", { ascending: false });
    if (error || !data) { el.innerHTML = `<div class="text-red-400 text-sm p-4">Error loading data.</div>`; return; }
    if (!data.length) { el.innerHTML = `<div class="text-white/40 text-sm p-4">No members yet.</div>`; return; }
    el.innerHTML = data.map(u => `
      <div class="flex flex-wrap items-center gap-3 p-4 border-b border-white/5 hover:bg-white/3 transition-colors">
        <div class="w-9 h-9 rounded-full bg-gradient-to-br from-gold to-gold-dark flex items-center justify-center font-bold text-sm text-ink flex-shrink-0">
          ${(u.name || "?")[0].toUpperCase()}
        </div>
        <div class="flex-1 min-w-0">
          <div class="font-semibold text-white text-sm truncate">${u.name || "—"}</div>
          <div class="text-white/40 text-xs truncate">${u.email}</div>
        </div>
        <div class="text-xs text-white/40">${u.country || "—"}</div>
        <div class="text-xs font-bold text-gold uppercase">${u.plan || "monthly"}</div>
        <div class="text-xs font-bold ${u.status === "online" ? "text-green-400" : "text-white/30"}">${u.status || "offline"}</div>
        <div class="text-xs text-green-400">$${parseFloat(u.deposited||0).toFixed(2)}</div>
        <button onclick="deleteUser('${u.id}')" class="text-red-400/60 hover:text-red-400 text-xs border border-red-400/20 hover:border-red-400/50 rounded-lg px-2 py-1 transition-colors">Remove</button>
      </div>
    `).join("");
  } catch (e) { el.innerHTML = `<div class="text-red-400 text-sm p-4">Connection error.</div>`; }
}

async function deleteUser(id) {
  if (!confirm("Remove this member?")) return;
  await sbSite.from("users").delete().eq("id", id);
  loadAdminData();
}

async function loadWithdrawRequests() {
  const el = document.getElementById("admin-withdrawals-list");
  if (!el) return;
  el.innerHTML = `<div class="text-white/40 text-sm p-4">Loading...</div>`;
  try {
    const { data, error } = await sbSite.from("withdrawals").select("*").order("id", { ascending: false });
    if (error || !data || !data.length) { el.innerHTML = `<div class="text-white/40 text-sm p-4">No requests yet.</div>`; return; }
    el.innerHTML = data.map(w => `
      <div class="flex flex-wrap items-center gap-3 p-4 border-b border-white/5 hover:bg-white/3 transition-colors">
        <div class="flex-1 min-w-0">
          <div class="font-semibold text-white text-sm">${w.user_name || "—"}</div>
          <div class="text-white/40 text-xs">${w.method} · ${w.account || ""}</div>
        </div>
        <div class="font-bebas text-lg text-gold">$${parseFloat(w.amount||0).toFixed(2)}</div>
        <span class="text-[10px] font-bold uppercase px-2 py-1 rounded-full border ${w.type==="payment" ? "bg-blue-400/10 border-blue-400/25 text-blue-400" : "bg-orange-400/10 border-orange-400/25 text-orange-400"}">${w.type || "withdrawal"}</span>
        <span class="text-[10px] font-bold uppercase px-2 py-1 rounded-full border ${w.status==="approved" ? "bg-green-400/10 border-green-400/25 text-green-400" : "bg-yellow-400/10 border-yellow-400/25 text-yellow-400"}">${w.status}</span>
        ${w.status==="pending" ? `<button onclick="approveRequest('${w.id}')" class="text-green-400 text-xs border border-green-400/30 hover:border-green-400/60 rounded-lg px-2 py-1 transition-colors">Approve</button>` : ""}
      </div>
    `).join("");
  } catch (e) { el.innerHTML = `<div class="text-red-400 text-sm p-4">Connection error.</div>`; }
}

async function approveRequest(id) {
  await sbSite.from("withdrawals").update({ status: "approved" }).eq("id", id);
  loadWithdrawRequests();
  showToast("Request approved ✅");
}

async function savePaymentSettings() {
  const fields = [
    { method:"chime",   field1: document.getElementById("a-chime-tag").value.trim(),   field2: document.getElementById("a-chime-phone").value.trim() },
    { method:"zelle",   field1: document.getElementById("a-zelle-email").value.trim(),  field2: document.getElementById("a-zelle-phone").value.trim() },
    { method:"apple",   field1: document.getElementById("a-apple-id").value.trim() },
    { method:"bitcoin", field1: document.getElementById("a-btc-addr").value.trim() },
  ];
  for (const f of fields) {
    if (f.field1) {
      await sbSite.from("payment_info").upsert({ method: f.method, field1: f.field1, field2: f.field2 || null }, { onConflict: "method" });
    }
  }
  await loadPaymentDetailsFromDB();
  applyPaymentDetailsToDOM();
  showToast("Payment info saved ✅");
}

async function saveWithdrawPin() {
  const pin = document.getElementById("a-pin").value.trim();
  if (pin.length !== 5 || !/^\d+$/.test(pin)) { showToast("⚠ PIN must be 5 digits"); return; }
  await sbSite.from("settings").upsert({ key: "withdraw_pin", value: pin }, { onConflict: "key" });
  CORRECT_PIN = pin;
  showToast("PIN updated ✅");
}

// ─────────────────────────────────────────────────────────────────────
// PAYMENT DETAILS FROM DB
// ─────────────────────────────────────────────────────────────────────
async function loadPaymentDetailsFromDB() {
  try {
    const { data, error } = await sbSite.from("payment_info").select("*");
    if (error || !data) return;
    data.forEach(row => {
      if (row.method === "chime")   { if (row.field1) paymentDetails.chime.tag = row.field1; if (row.field2) paymentDetails.chime.phone = row.field2; }
      if (row.method === "zelle")   { if (row.field1) paymentDetails.zelle.email = row.field1; if (row.field2) paymentDetails.zelle.phone = row.field2; }
      if (row.method === "apple")   { if (row.field1) paymentDetails.applepay.id = row.field1; }
      if (row.method === "bitcoin") { if (row.field1) paymentDetails.bitcoin.address = row.field1; }
    });
  } catch (e) { console.warn("Could not load payment info:", e); }
}

function applyPaymentDetailsToDOM() {
  const pd = paymentDetails;

  const chimeLabel = document.querySelector("#pm-chime .flex-1");
  if (chimeLabel) chimeLabel.innerHTML = `<div class="font-bold text-white text-sm">${pd.chime.tag}</div><div class="text-white/35 text-xs">Instant bank transfer</div>`;
  const zelleLabel = document.querySelector("#pm-zelle .flex-1");
  if (zelleLabel) zelleLabel.innerHTML = `<div class="font-bold text-white text-sm">${pd.zelle.email}</div><div class="text-white/35 text-xs">Direct bank-to-bank</div>`;
  const appleLabel = document.querySelector("#pm-applepay .flex-1");
  if (appleLabel) appleLabel.innerHTML = `<div class="font-bold text-white text-sm">${pd.applepay.id}</div><div class="text-white/35 text-xs">One-tap secure payment</div>`;
  const btcLabel = document.querySelector("#pm-bitcoin .flex-1");
  if (btcLabel) btcLabel.innerHTML = `<div class="font-mono text-[11px] text-orange-300 break-all">${pd.bitcoin.address}</div><div class="text-white/35 text-xs">Crypto — fast &amp; anonymous</div>`;

  const chimeDetail = document.getElementById("details-chime");
  if (chimeDetail) chimeDetail.innerHTML = buildChimeDetail(pd);
  const zelleDetail = document.getElementById("details-zelle");
  if (zelleDetail) zelleDetail.innerHTML = buildZelleDetail(pd);
  const appleDetail = document.getElementById("details-applepay");
  if (appleDetail) appleDetail.innerHTML = buildAppleDetail(pd);
  const btcDetail = document.getElementById("details-bitcoin");
  if (btcDetail) btcDetail.innerHTML = buildBtcDetail(pd);
}

function copyBtn(val, color) {
  return `<button onclick="copyText('${val}')" class="flex items-center gap-2 bg-white/5 border border-white/10 rounded-lg px-3 py-1.5 hover:border-${color}/50 transition-colors group">
    <span class="font-bold text-white text-sm">${val}</span>
    <svg class="w-3.5 h-3.5 text-white/30" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1"/></svg>
  </button>`;
}

function buildChimeDetail(pd) {
  return `<div class="bg-[#06c167]/8 border border-[#06c167]/25 rounded-2xl p-5 mb-5">
    <div class="text-[10px] font-bold text-[#06c167]/70 uppercase tracking-widest mb-3">Send Payment To</div>
    <div class="space-y-3">
      <div class="flex items-center justify-between"><span class="text-white/40 text-sm">Chime $Tag</span>${copyBtn(pd.chime.tag,"[#06c167]")}</div>
      <div class="flex items-center justify-between"><span class="text-white/40 text-sm">Phone</span>${copyBtn(pd.chime.phone,"[#06c167]")}</div>
    </div>
  </div>
  <div class="bg-white/3 border border-white/6 rounded-xl p-4 mb-5 text-xs text-white/40 leading-relaxed space-y-1.5">
    <p>① Open Chime app → <strong class="text-white/60">Pay Anyone</strong></p>
    <p>② Search <strong class="text-white/60">${pd.chime.tag}</strong> or enter the phone number</p>
    <p>③ Enter your plan amount and tap <strong class="text-white/60">Send</strong></p>
    <p>④ Screenshot your confirmation and DM us on Telegram</p>
  </div>`;
}

function buildZelleDetail(pd) {
  return `<div class="bg-violet-500/8 border border-violet-500/25 rounded-2xl p-5 mb-5">
    <div class="text-[10px] font-bold text-violet-400/70 uppercase tracking-widest mb-3">Send Payment To</div>
    <div class="space-y-3">
      <div class="flex items-center justify-between"><span class="text-white/40 text-sm">Email</span>${copyBtn(pd.zelle.email,"violet-500")}</div>
      <div class="flex items-center justify-between"><span class="text-white/40 text-sm">Phone</span>${copyBtn(pd.zelle.phone,"violet-500")}</div>
    </div>
  </div>
  <div class="bg-white/3 border border-white/6 rounded-xl p-4 mb-5 text-xs text-white/40 leading-relaxed space-y-1.5">
    <p>① Open your bank app → find <strong class="text-white/60">Zelle</strong></p>
    <p>② Send to <strong class="text-white/60">${pd.zelle.email}</strong></p>
    <p>③ Add your plan in the memo (e.g. "Monthly VIP")</p>
    <p>④ Screenshot confirmation and send on Telegram</p>
  </div>`;
}

function buildAppleDetail(pd) {
  return `<div class="bg-white/5 border border-white/15 rounded-2xl p-5 mb-5">
    <div class="text-[10px] font-bold text-white/40 uppercase tracking-widest mb-3">Apple Cash / Apple Pay</div>
    <div class="flex items-center justify-between"><span class="text-white/40 text-sm">Apple ID</span>${copyBtn(pd.applepay.id,"white")}</div>
  </div>
  <div class="bg-white/3 border border-white/6 rounded-xl p-4 mb-5 text-xs text-white/40 leading-relaxed space-y-1.5">
    <p>① Open <strong class="text-white/60">Messages</strong> on iPhone → tap <strong class="text-white/60">+</strong> → Apple Cash</p>
    <p>② Or go to <strong class="text-white/60">Wallet → Send Money</strong></p>
    <p>③ Search <strong class="text-white/60">${pd.applepay.id}</strong></p>
    <p>④ Enter plan amount and confirm with Face ID / Touch ID</p>
    <p>⑤ DM us your confirmation screenshot on Telegram</p>
  </div>`;
}

function buildBtcDetail(pd) {
  return `<div class="bg-orange-400/8 border border-orange-400/25 rounded-2xl p-5 mb-5">
    <div class="text-[10px] font-bold text-orange-400/70 uppercase tracking-widest mb-3">Bitcoin Wallet Address</div>
    <div class="flex items-center gap-2">
      <div class="flex-1 bg-black/40 rounded-lg px-3 py-2 font-mono text-[11px] text-orange-300 break-all leading-relaxed">${pd.bitcoin.address}</div>
      <button onclick="copyText('${pd.bitcoin.address}')" class="flex-shrink-0 w-9 h-9 bg-orange-400/15 border border-orange-400/30 rounded-lg flex items-center justify-center hover:bg-orange-400/25 transition-colors">
        <svg class="w-4 h-4 text-orange-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1"/></svg>
      </button>
    </div>
  </div>
  <div class="bg-white/3 border border-white/6 rounded-xl p-4 mb-5 text-xs text-white/40 leading-relaxed space-y-1.5">
    <p>① Open your Bitcoin wallet (Coinbase, Exodus, Trust Wallet, etc.)</p>
    <p>② Tap <strong class="text-white/60">Send</strong> and paste the address above</p>
    <p>③ Enter the USD equivalent of your plan amount</p>
    <p>④ Send and copy the <strong class="text-white/60">TXID</strong></p>
    <p>⑤ DM us your TXID on Telegram to activate VIP instantly</p>
  </div>`;
}

// ─────────────────────────────────────────────────────────────────────
// SESSION PERSISTENCE (localStorage)
// ─────────────────────────────────────────────────────────────────────
function saveSession(userData) {
  try {
    localStorage.setItem("rp_user", JSON.stringify(userData));
  } catch (e) {}
}

function clearSession() {
  try {
    localStorage.removeItem("rp_user");
  } catch (e) {}
}

function loadSession() {
  try {
    const raw = localStorage.getItem("rp_user");
    return raw ? JSON.parse(raw) : null;
  } catch (e) {
    return null;
  }
}

// ─────────────────────────────────────────────────────────────────────
// AUTH
// ─────────────────────────────────────────────────────────────────────
async function doSignIn() {
  const email = document.getElementById("si-email").value.trim().toLowerCase();
  const pass  = document.getElementById("si-pass").value;
  const err   = document.getElementById("si-err");
  err.classList.add("hidden");
  if (!email || !pass) { err.textContent = "⚠ Please fill in all fields."; err.classList.remove("hidden"); return; }
  if (!email.includes("@")) { err.textContent = "⚠ Enter a valid email."; err.classList.remove("hidden"); return; }
  try {
    const { data, error } = await sbSite.from("users").select("*").eq("email", email).single();
    if (error || !data) { err.textContent = "⚠ No account found with that email."; err.classList.remove("hidden"); return; }
    if (data.password !== pass) { err.textContent = "⚠ Incorrect password."; err.classList.remove("hidden"); return; }
    saveSession(data);
    loadDashboard(data);
    await sbSite.from("users").update({ status: "online", last_seen: new Date().toISOString() }).eq("id", data.id);
    if (email === ADMIN_EMAIL) {
      window.open("admin.html", "_blank");
    } else {
      showPage("dashboard");
    }
  } catch (e) { err.textContent = "⚠ Connection error. Please try again."; err.classList.remove("hidden"); }
}

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
  if (vals.some(v => !v)) { err.textContent = "⚠ Please fill in all fields."; err.classList.remove("hidden"); return; }
  if (!vals[3].includes("@")) { err.textContent = "⚠ Enter a valid email."; err.classList.remove("hidden"); return; }
  if (vals[4].length < 8) { err.textContent = "⚠ Password must be 8+ characters."; err.classList.remove("hidden"); return; }
  if (vals[4] !== vals[5]) { err.textContent = "⚠ Passwords do not match."; err.classList.remove("hidden"); return; }
  err.classList.add("hidden");
  document.getElementById("su-step1").classList.add("hidden");
  document.getElementById("su-step2").classList.remove("hidden");
  document.getElementById("s1-tab").className = "flex-1 py-2.5 rounded-lg text-xs font-bold text-white/40 transition-all";
  document.getElementById("s2-tab").className = "flex-1 py-2.5 rounded-lg text-xs font-bold bg-gold text-ink transition-all";
}

function backStep1() {
  document.getElementById("su-step1").classList.remove("hidden");
  document.getElementById("su-step2").classList.add("hidden");
  document.getElementById("s1-tab").className = "flex-1 py-2.5 rounded-lg text-xs font-bold bg-gold text-ink transition-all";
  document.getElementById("s2-tab").className = "flex-1 py-2.5 rounded-lg text-xs font-bold text-white/40 transition-all";
}

function selectPlan(p) {
  selPlan = p;
  ["monthly","yearly","lifetime"].forEach(x => {
    const card = document.getElementById("pc-" + x), rad = document.getElementById("pr-" + x);
    if (!card || !rad) return;
    if (x === p) {
      card.className = "border-2 border-gold rounded-xl p-4 cursor-pointer plan-selected transition-all flex items-center gap-4 relative";
      rad.className  = "w-4 h-4 rounded-full border-2 border-gold bg-gold flex-shrink-0 transition-all";
    } else {
      card.className = "border border-white/8 rounded-xl p-4 cursor-pointer hover:border-gold/50 transition-all flex items-center gap-4";
      rad.className  = "w-4 h-4 rounded-full border-2 border-white/30 flex-shrink-0 transition-all";
    }
  });
  const labels = { monthly:"Monthly — $150/mo", yearly:"Yearly — $1,000/yr", lifetime:"Lifetime — $1,500" };
  const lbl = document.getElementById("pay-plan-label");
  if (lbl) lbl.textContent = labels[p];
}

async function doSignUp() {
  if (!selPlan) { const e = document.getElementById("p-err"); e.textContent = "⚠ Please choose a plan."; e.classList.remove("hidden"); return; }
  const name = document.getElementById("su-name").value.trim();
  const phone = document.getElementById("su-phone").value.trim();
  const country = document.getElementById("su-country").value;
  const email = document.getElementById("su-email").value.trim().toLowerCase();
  const password = document.getElementById("su-pass").value;
  const pe = document.getElementById("p-err");
  pe.classList.add("hidden");
  try {
    const { data: existing } = await sbSite.from("users").select("id").eq("email", email).maybeSingle();
    if (existing) { pe.textContent = "⚠ An account with that email already exists."; pe.classList.remove("hidden"); return; }
    const { data, error } = await sbSite.from("users").insert([{ name, email, phone, country, password, plan: selPlan, deposited: 0, balance: 0, status: "online", last_seen: new Date().toISOString() }]).select().single();
    if (error) { pe.textContent = "⚠ " + error.message; pe.classList.remove("hidden"); return; }
    saveSession(data);
    loadDashboard(data);
    ["su-name","su-phone","su-email","su-pass","su-conf"].forEach(id => { const el = document.getElementById(id); if (el) el.value = ""; });
    const sc = document.getElementById("su-country"); if (sc) sc.value = "";
    backStep1(); selPlan = "yearly"; selectPlan("yearly");
    showPage("dashboard");
  } catch (e) { pe.textContent = "⚠ Connection error. Please try again."; pe.classList.remove("hidden"); }
}

function loadDashboard(data) {
  currentUser = data;
  userPlan = data.plan || "monthly";
  document.getElementById("dash-name").textContent = "Welcome" + (data.name ? ", " + cap(data.name.split(" ")[0]) : "") + " 🏆";
  document.getElementById("dash-deposited").textContent = "$" + parseFloat(data.deposited || 0).toFixed(2);
  const balEl = document.querySelector("#page-dashboard .balance-display");
  if (balEl) balEl.textContent = "$" + parseFloat(data.balance || 0).toFixed(2);
  const wAvail = document.querySelector("#w-step1 .avail-balance");
  if (wAvail) wAvail.textContent = "$" + parseFloat(data.balance || 0).toFixed(2);
  updateDashBadge();
  updateNavLoggedIn();
  switchDashPlan(userPlan, true);
  injectDashboardFooter();
}

function injectDashboardFooter() {
  const dashPage = document.getElementById("page-dashboard");
  if (!dashPage) return;
  // Remove any existing footer to avoid duplicates
  const existing = dashPage.querySelector(".dash-footer");
  if (existing) existing.remove();

  const footer = document.createElement("footer");
  footer.className = "dash-footer border-t border-white/5 mt-10 px-4 py-8";
  footer.innerHTML = `
    <div class="max-w-4xl mx-auto">
      <div class="flex flex-col md:flex-row items-center justify-between gap-6 mb-6">
        <div class="text-center md:text-left">
          <div class="font-bebas text-2xl shimmer-text mb-1">RAYMONDPICKS</div>
          <p class="text-white/30 text-xs max-w-xs leading-relaxed">
            The most trusted VIP sports picks service. Verified results. Real winners.
          </p>
        </div>
        <div class="flex flex-wrap gap-3 justify-center">
          <button onclick="showPage('landing')" class="border border-white/10 text-white/40 hover:text-gold hover:border-gold px-4 py-2 rounded-xl text-xs font-semibold bg-transparent cursor-pointer transition-all">🏠 Home</button>
          <button onclick="showPage('sportsbook')" class="border border-white/10 text-white/40 hover:text-gold hover:border-gold px-4 py-2 rounded-xl text-xs font-semibold bg-transparent cursor-pointer transition-all">🏆 Sportsbooks</button>
          <button onclick="showPage('packages')" class="border border-white/10 text-white/40 hover:text-gold hover:border-gold px-4 py-2 rounded-xl text-xs font-semibold bg-transparent cursor-pointer transition-all">💎 Packages</button>
          <button onclick="showPage('faq')" class="border border-white/10 text-white/40 hover:text-gold hover:border-gold px-4 py-2 rounded-xl text-xs font-semibold bg-transparent cursor-pointer transition-all">❓ FAQ</button>
          <button onclick="doSignOut()" class="border border-red-500/20 text-red-400/60 hover:text-red-400 hover:border-red-400/50 px-4 py-2 rounded-xl text-xs font-semibold bg-transparent cursor-pointer transition-all">Sign Out</button>
        </div>
      </div>
      <div class="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6 text-center">
        <div class="bg-white/3 border border-white/5 rounded-xl py-3 px-2">
          <div class="font-bebas text-xl text-gold leading-none">74%</div>
          <div class="text-white/25 text-[10px] uppercase tracking-widest mt-1">Win Rate</div>
        </div>
        <div class="bg-white/3 border border-white/5 rounded-xl py-3 px-2">
          <div class="font-bebas text-xl text-gold leading-none">5K+</div>
          <div class="text-white/25 text-[10px] uppercase tracking-widest mt-1">Members</div>
        </div>
        <div class="bg-white/3 border border-white/5 rounded-xl py-3 px-2">
          <div class="font-bebas text-xl text-gold leading-none">$2M+</div>
          <div class="text-white/25 text-[10px] uppercase tracking-widest mt-1">Won</div>
        </div>
        <div class="bg-white/3 border border-white/5 rounded-xl py-3 px-2">
          <div class="font-bebas text-xl text-gold leading-none">24/7</div>
          <div class="text-white/25 text-[10px] uppercase tracking-widest mt-1">Support</div>
        </div>
      </div>
      <div class="border-t border-white/5 pt-5 flex flex-col sm:flex-row items-center justify-between gap-3 text-center">
        <p class="text-white/20 text-xs">© 2025 RAYMONDPICKS. All rights reserved.</p>
        <div class="flex gap-4 text-white/20 text-xs">
          <a href="#" class="hover:text-white/40 transition-colors">Terms</a>
          <a href="#" class="hover:text-white/40 transition-colors">Privacy</a>
          <a href="https://t.me/RaymondPicksVIP" target="_blank" rel="noopener" class="hover:text-gold transition-colors">Telegram</a>
        </div>
        <p class="text-white/20 text-xs">⚠️ Must be 21+. Bet responsibly.</p>
      </div>
    </div>
  `;
  dashPage.appendChild(footer);
}

function updateNavLoggedIn() {
  const isAdmin = currentUser && currentUser.email === ADMIN_EMAIL;
  // Show admin link for admin on ALL screen sizes (mobile drawer + desktop)
  document.querySelectorAll(".admin-nav-link").forEach(el => {
    if (!isAdmin) {
      el.style.display = "none";
    } else {
      const inDrawer = el.closest("#mobile-drawer");
      el.style.display = inDrawer ? "flex" : "inline-flex";
    }
  });
  // Force-hide Sign In button (overrides sm:block Tailwind class)
  document.querySelectorAll(".nav-signin-btn").forEach(el => {
    el.style.display = "none";
  });
  // Update Join VIP → My Dashboard
  document.querySelectorAll(".nav-join-btn").forEach(el => {
    el.textContent = "My Dashboard";
    el.onclick = () => showPage("dashboard");
  });
}

function updateNavLoggedOut() {
  // Hide admin links
  document.querySelectorAll(".admin-nav-link").forEach(el => {
    el.style.display = "none";
  });
  // Restore Sign In button visibility using style.display
  document.querySelectorAll(".nav-signin-btn").forEach(el => {
    el.style.display = "";
  });
  // Restore Join VIP button
  document.querySelectorAll(".nav-join-btn").forEach(el => {
    el.textContent = "Join VIP";
    el.onclick = () => showPage("signup");
  });
}

async function doSignOut() {
  if (currentUser) await sbSite.from("users").update({ status: "offline" }).eq("id", currentUser.id);
  currentUser = null;
  clearSession();
  updateNavLoggedOut();
  showPage("landing");
}

// ─────────────────────────────────────────────────────────────────────
// DASHBOARD PLAN
// ─────────────────────────────────────────────────────────────────────
async function switchDashPlan(p, silent = false) {
  userPlan = p;
  ["monthly","yearly","lifetime"].forEach(x => {
    const card = document.getElementById("dp-" + x), rad = document.getElementById("dr-" + x);
    if (!card || !rad) return;
    if (x === p) {
      card.className = "border border-gold rounded-xl p-4 cursor-pointer plan-selected transition-all";
      rad.className  = "w-4 h-4 rounded-full border-2 border-gold bg-gold";
    } else {
      card.className = "border border-white/8 rounded-xl p-4 cursor-pointer hover:border-gold/50 transition-all";
      rad.className  = "w-4 h-4 rounded-full border-2 border-white/30";
    }
  });
  updateDashBadge();
  if (!silent && currentUser) {
    await sbSite.from("users").update({ plan: p }).eq("id", currentUser.id);
    currentUser.plan = p;
    // Update saved session
    saveSession(currentUser);
    showToast("Plan updated to " + cap(p) + " ✅");
  }
}

function updateDashBadge() {
  const lbs = { monthly:"MONTHLY VIP", yearly:"YEARLY PRO", lifetime:"LIFETIME ELITE" };
  document.getElementById("dash-badge").textContent = lbs[userPlan] || "VIP MEMBER";
}

// ─────────────────────────────────────────────────────────────────────
// PAYMENT MODAL
// ─────────────────────────────────────────────────────────────────────
const payInfo = {
  chime:    { icon:"💚", name:"Chime",     bg:"rgba(6,193,103,.15)",  border:"rgba(6,193,103,.4)" },
  zelle:    { icon:"💜", name:"Zelle",     bg:"rgba(139,92,246,.15)", border:"rgba(139,92,246,.4)" },
  applepay: { icon:"🍎", name:"Apple Pay", bg:"rgba(255,255,255,.08)",border:"rgba(255,255,255,.2)" },
  bitcoin:  { icon:"₿",  name:"Bitcoin",   bg:"rgba(251,146,60,.15)", border:"rgba(251,146,60,.4)" },
};

function openPayModal() {
  loadPaymentDetailsFromDB().then(() => applyPaymentDetailsToDOM());
  document.getElementById("pay-step1").classList.remove("hidden");
  document.getElementById("pay-step2").classList.add("hidden");
  document.getElementById("pay-modal").classList.remove("hidden");
}

function selectPayment(method) {
  const info = payInfo[method];
  const iconEl = document.getElementById("pay-method-icon");
  iconEl.textContent = info.icon;
  iconEl.style.background = info.bg;
  iconEl.style.border = "1px solid " + info.border;
  document.getElementById("pay-method-name").textContent = info.name;
  document.getElementById("pay-method-plan").textContent = document.getElementById("pay-plan-label").textContent;
  ["chime","zelle","applepay","bitcoin"].forEach(m => document.getElementById("details-" + m).classList.add("hidden"));
  document.getElementById("details-" + method).classList.remove("hidden");
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
  const labels = { chime:"Chime", zelle:"Zelle", applepay:"Apple Pay", bitcoin:"Bitcoin" };
  const planPrices = { monthly:150, yearly:1000, lifetime:1500 };
  const planLabel = document.getElementById("pay-plan-label").textContent;
  if (currentUser) {
    await sbSite.from("withdrawals").insert([{ user_id: currentUser.id, user_name: currentUser.name, amount: planPrices[userPlan] || 0, method: labels[selPayment] || selPayment, account: planLabel, status: "pending", type: "payment" }]);
  }
  closePayModal();
  showToast("Payment via " + (labels[selPayment] || "") + " confirmed! VIP activating 🔥");
  selPayment = null;
}

function copyText(txt) {
  navigator.clipboard.writeText(txt)
    .then(() => showToast("Copied: " + txt))
    .catch(() => { const el = document.createElement("textarea"); el.value = txt; document.body.appendChild(el); el.select(); document.execCommand("copy"); document.body.removeChild(el); showToast("Copied!"); });
}

// ─────────────────────────────────────────────────────────────────────
// TOAST
// ─────────────────────────────────────────────────────────────────────
function showToast(msg) {
  const t = document.getElementById("toast");
  t.textContent = msg; t.style.opacity = "1"; t.style.transform = "translateX(-50%) translateY(0)";
  setTimeout(() => { t.style.opacity = "0"; t.style.transform = "translateX(-50%) translateY(20px)"; }, 3200);
}

// ─────────────────────────────────────────────────────────────────────
// WIN POPUP
// ─────────────────────────────────────────────────────────────────────
function showWin() {
  const w = wins[wIdx % wins.length]; wIdx++;
  document.getElementById("wp-name").textContent = w.n;
  document.getElementById("wp-detail").textContent = "just won on " + w.b + "!";
  document.getElementById("wp-amt").textContent = "+" + w.a;
  const pop = document.getElementById("win-popup");
  pop.classList.add("win-show"); pop.classList.remove("win-hide"); pop.style.transform = "";
  clearTimeout(wTimer);
  wTimer = setTimeout(() => {
    pop.classList.add("win-hide"); pop.classList.remove("win-show");
    setTimeout(showWin, 3500 + Math.random() * 4000);
  }, 4200);
}

// ─────────────────────────────────────────────────────────────────────
// WITHDRAW MODAL
// ─────────────────────────────────────────────────────────────────────
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
  const amount = document.getElementById("w-amount").value.trim();
  const account = document.getElementById("w-account").value.trim();
  const err = document.getElementById("w-step1-err");
  if (!amount || parseFloat(amount) <= 0) { err.textContent = "⚠ Please enter a valid amount."; err.classList.remove("hidden"); return; }
  if (!account) { err.textContent = "⚠ Please enter your account or handle."; err.classList.remove("hidden"); return; }
  err.classList.add("hidden");
  const method = document.getElementById("w-method").value;
  document.getElementById("w-summary-method").textContent = method;
  document.getElementById("w-summary-amount").textContent = "$" + parseFloat(amount).toFixed(2);
  document.getElementById("w-step1").classList.add("hidden");
  document.getElementById("w-step2").classList.remove("hidden");
  document.getElementById("pin0").focus();
}

// ─────────────────────────────────────────────────────────────────────
// PIN
// ─────────────────────────────────────────────────────────────────────
let CORRECT_PIN = "33211";
async function loadWithdrawPin() {
  try {
    const { data } = await sbSite.from("settings").select("value").eq("key", "withdraw_pin").single();
    if (data && data.value) CORRECT_PIN = data.value;
  } catch (e) { /* use default */ }
}

function clearPin() {
  for (let i = 0; i < 5; i++) {
    const el = document.getElementById("pin" + i);
    if (el) { el.value = ""; el.classList.remove("border-green-500","border-red-500","border-gold"); el.classList.add("border-white/10"); }
  }
}

function pinInput(el, idx) {
  el.value = el.value.replace(/[^0-9]/g, "").slice(-1);
  document.getElementById("w-pin-err").classList.add("hidden");
  el.classList.remove("border-red-500","border-green-500"); el.classList.add("border-gold");
  if (el.value && idx < 4) document.getElementById("pin" + (idx + 1)).focus();
}

function pinBack(e, el, idx) {
  if (e.key === "Backspace" && !el.value && idx > 0) { const prev = document.getElementById("pin" + (idx - 1)); prev.value = ""; prev.focus(); }
}

async function verifyWithdrawPin() {
  let entered = "";
  for (let i = 0; i < 5; i++) entered += document.getElementById("pin" + i).value || "";
  if (entered.length < 5) { const err = document.getElementById("w-pin-err"); err.textContent = "⚠ Please enter all 5 digits."; err.classList.remove("hidden"); return; }
  await loadWithdrawPin();
  if (entered === CORRECT_PIN) {
    for (let i = 0; i < 5; i++) { const el = document.getElementById("pin" + i); el.classList.remove("border-white/10","border-gold","border-red-500"); el.classList.add("border-green-500"); }
    const amount = parseFloat(document.getElementById("w-amount").value) || 0;
    const method = document.getElementById("w-method").value;
    const account = document.getElementById("w-account").value.trim();
    if (currentUser) await sbSite.from("withdrawals").insert([{ user_id: currentUser.id, user_name: currentUser.name, amount, method, account, status: "pending", type: "withdrawal" }]);
    setTimeout(() => { closeWithdrawModal(); showToast("✅ Withdrawal submitted! Processing in 1–3 business days."); }, 600);
  } else {
    const err = document.getElementById("w-pin-err");
    err.textContent = "⚠ Incorrect code. Please try again."; err.classList.remove("hidden");
    for (let i = 0; i < 5; i++) { const el = document.getElementById("pin" + i); el.classList.remove("border-white/10","border-gold","border-green-500"); el.classList.add("border-red-500"); }
    const boxes = document.getElementById("pin-boxes");
    boxes.style.animation = "none"; boxes.offsetHeight; boxes.style.animation = "shake .4s ease";
    setTimeout(clearPin, 1200);
  }
}

// ─────────────────────────────────────────────────────────────────────
// HELPERS
// ─────────────────────────────────────────────────────────────────────
function cap(s) { return s ? s.charAt(0).toUpperCase() + s.slice(1) : s; }
function openBook(url) { window.open(url, "_blank", "noopener,noreferrer"); }
function tPwd(id, btn) { const el = document.getElementById(id); el.type = el.type === "password" ? "text" : "password"; btn.textContent = el.type === "password" ? "👁" : "🙈"; }
function chkStr() {
  const v = document.getElementById("su-pass").value;
  const bar = document.getElementById("str-bar"), lbl = document.getElementById("str-lbl");
  let s = 0;
  if (v.length >= 8) s++; if (/[A-Z]/.test(v)) s++; if (/[0-9]/.test(v)) s++; if (/[^A-Za-z0-9]/.test(v)) s++;
  const L = [["0%","#ef4444",""],["25%","#ef4444","Weak"],["50%","#f59e0b","Fair"],["75%","#3b82f6","Good"],["100%","#22c55e","Strong ✓"]];
  bar.style.width = L[s][0]; bar.style.background = L[s][1];
  lbl.textContent = L[s][2]; lbl.style.color = L[s][1];
}

// ─────────────────────────────────────────────────────────────────────
// INIT
// ─────────────────────────────────────────────────────────────────────
document.addEventListener("DOMContentLoaded", async () => {
  renderNews();
  renderFAQ();
  renderBooks("books-grid");
  renderBooks("sportsbook-page-grid");
  selectPlan("yearly");
  loadWithdrawPin();
  loadPaymentDetailsFromDB().then(() => applyPaymentDetailsToDOM());
  setTimeout(showWin, 2000);

  // Default nav state: logged out (hides admin link, shows sign in)
  updateNavLoggedOut();

  // ── RESTORE SESSION from localStorage ──
  const saved = loadSession();
  if (saved) {
    // Re-fetch fresh data from DB to get latest balance/plan
    try {
      const { data, error } = await sbSite.from("users").select("*").eq("id", saved.id).single();
      const userData = (!error && data) ? data : saved;
      // Update session with fresh data
      saveSession(userData);
      loadDashboard(userData);
      await sbSite.from("users").update({ status: "online", last_seen: new Date().toISOString() }).eq("id", userData.id);
      // Go to dashboard
      showPage("dashboard");
    } catch (e) {
      // Fallback to cached data
      loadDashboard(saved);
      showPage("dashboard");
    }
  } else {
    // No session — ensure nav is in logged-out state
    updateNavLoggedOut();
  }

  // Watch pay modal for open
  const payModal = document.getElementById("pay-modal");
  if (payModal) {
    new MutationObserver(async (mutations) => {
      for (const m of mutations) {
        if (m.type === "attributes" && m.attributeName === "class" && !payModal.classList.contains("hidden")) {
          await loadPaymentDetailsFromDB();
          applyPaymentDetailsToDOM();
        }
      }
    }).observe(payModal, { attributes: true });
  }
});