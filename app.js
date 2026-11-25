
const ALBUMS = [
  { id:"red", title:"Red", year:2012, date:"October 22, 2012", c:["#8e1b2d","#d94353","#fff"],
    img:"https://i.pinimg.com/originals/fc/de/a1/fcdea122c90a05e843661917eb4bb115.jpg",
    blurb:"Big feelings, autumn colors and the sharp edge of heartbreak.",
    songs:[
      ["All Too Well","A detailed, aching look back at a relationship through small remembered moments, and the hurt that lingers. A 10-minute version arrived in 2021."],
      ["22","A joyful song about carefree nights with friends and the freedom of being young, unsure and happy about it."],
      ["I Knew You Were Trouble","Regret over ignoring the warning signs in a relationship, and the lesson that came from it. Its dubstep-tinged sound marked a pop turn."]]},
  { id:"lover", title:"Lover", year:2019, date:"August 23, 2019", c:["#f6a9ca","#9fd3ee","#3a2a4a"],
    img:"https://www.udiscovermusic.com/wp-content/uploads/2019/08/Taylor-Swift-Lover-album-cover-820.jpg",
    blurb:"Pastel, romantic and open-hearted, from secret summers to forever.",
    songs:[
      ["Cruel Summer","A thrilling, anxious story of a secret summer romance, where the excitement and the risk arrive together."],
      ["Lover","A warm, waltz-like declaration of committed love, written as a toast to a shared home and a shared life."],
      ["The Man","Imagines how her choices and ambitions would be judged if she were a man, a pointed comment on double standards."]]},
  { id:"folklore", title:"folklore", year:2020, date:"July 24, 2020", c:["#8c8c88","#d9d5cb","#222"],
    img:"https://i.pinimg.com/originals/48/b9/e8/48b9e88c6f48cef5d988387356983d5a.png",
    blurb:"A surprise-released world of invented characters and quiet storytelling.",
    songs:[
      ["cardigan","A reflective story about a love that was left behind and later remembered. It forms a loose teenage love-triangle trio with two other songs on the album."],
      ["exile","A duet with Bon Iver about two people who cannot understand each other as a relationship comes apart."],
      ["the last great american dynasty","Tells the story of Rebekah Harkness, a socialite who once owned Taylor's Rhode Island home, and the way outsiders judge a bold life."]]},
  { id:"midnights", title:"Midnights", year:2022, date:"October 21, 2022", c:["#1b1c4d","#5a4aa0","#fff"],
    img:"https://www.eriereader.com/uploads/articles/547338_taylor-swift-copy.jpg",
    blurb:"Thirteen sleepless nights of self-doubt, daydreams and sparkle.",
    songs:[
      ["Anti-Hero","A candid look at insecurity and self-sabotage, delivered with humor instead of self-pity."],
      ["Lavender Haze","The dreamy bubble of a private love, and the choice to ignore outside noise about the relationship."],
      ["Karma","A playful victory lap about what goes around, treating karma as a loyal ally."]]},
  { id:"1989", title:"1989", year:2014, date:"October 27, 2014", c:["#7ab6d6","#eaf4f9","#123049"],
    img:"https://i.pinimg.com/736x/34/11/7f/34117f9e1a2eb129d5626e2cd929a5ab.jpg",
    blurb:"Synth-pop shine and a bold new city-lights sound.",
    songs:[
      ["Blank Space","A tongue-in-cheek character study that plays with the media image of a glamorous, reckless serial dater."],
      ["Style","A glossy song about an on-and-off romance with a magnetic pull that neither person can quite resist."],
      ["Shake It Off","A bright anthem about brushing off critics and rumors by refusing to let them set the mood."]]},
  { id:"speaknow", title:"Speak Now", year:2010, date:"October 25, 2010", c:["#6b3fa0","#c8a2e2","#fff"],
    img:"https://stylecaster.com/wp-content/uploads/2024/04/Speak-Now.png",
    blurb:"A romantic, storybook album written entirely by Taylor herself.",
    songs:[
      ["Mine","A hopeful love song about trusting a relationship despite a fear of commitment."],
      ["Back to December","An apology and an admission of regret, a rare song where she owns her own mistakes."],
      ["Dear John","A slow-burning song about a relationship that left her feeling worn down. Fans have speculated about its inspiration; it has never been confirmed."]]}
];

const $ = (s, r = document) => r.querySelector(s);
const esc = s => String(s).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const cover = a => `<div class="cover" style="--a:${a.c[0]};--b:${a.c[1]};--t:${a.c[2]}" role="img" aria-label="${esc(a.title)} cover art"><b>${esc(a.title)}</b><i>${a.year}</i><img src="${esc(a.img)}" alt="" loading="lazy" onerror="this.remove()"></div>`;


function renderGrid(list) {
  $("#grid").innerHTML = list.map(a =>
    `<button class="card" data-id="${a.id}" aria-label="Open ${esc(a.title)}, ${a.year}">${cover(a)}<span class="name">${esc(a.title)}</span><span class="yr">${a.year}</span></button>`).join("");
  $("#none").hidden = list.length > 0;
}
renderGrid(ALBUMS);
$("#grid").addEventListener("click", e => {
  const c = e.target.closest(".card");
  if (c) openAlbum(c.dataset.id);
});


let query = "";
function runSearch() {
  query = $("#search").value.trim().toLowerCase();
  const list = !query ? ALBUMS : ALBUMS.filter(a =>
    a.title.toLowerCase().includes(query) || String(a.year).includes(query) ||
    a.songs.some(s => s[0].toLowerCase().includes(query)));
  renderGrid(list);
}
$("#search").addEventListener("input", () => {
  runSearch();
  if (query) $("#albums").scrollIntoView({ block: "start" });
});
$("#searchForm").addEventListener("submit", e => {
  e.preventDefault();
  runSearch();
  $("#albums").scrollIntoView();
  const first = $(".card");
  if (first && query) openAlbum(first.dataset.id);
});


let lastFocus = null;
function openAlbum(id) {
  const a = ALBUMS.find(x => x.id === id);
  if (!a) return;
  const hit = s => query && s[0].toLowerCase().includes(query);
  $("#mBody").innerHTML = `
    <div class="head">${cover(a)}<div><h3 id="mTitle">${esc(a.title)}</h3><p>Released ${a.date}</p><p>${esc(a.blurb)}</p></div></div>
    <h4>Three notable songs</h4>
    <ul class="songs">${a.songs.map(s => `<li><h4>${hit(s) ? `<mark>${esc(s[0])}</mark>` : esc(s[0])}</h4><p>${esc(s[1])}</p></li>`).join("")}</ul>`;
  lastFocus = document.activeElement;
  $("#modal").hidden = false;
  document.body.style.overflow = "hidden";
  $(".box").focus();
}
function closeModal() {
  $("#modal").hidden = true;
  document.body.style.overflow = "";
  if (lastFocus) lastFocus.focus();
}
$("#close").addEventListener("click", closeModal);
$("#modal").addEventListener("click", e => { if (e.target.id === "modal") closeModal(); });
document.addEventListener("keydown", e => { if (e.key === "Escape" && !$("#modal").hidden) closeModal(); });


$("#collage").innerHTML = ALBUMS.map(a => cover(a).replace('role="img"', 'aria-hidden="true" role="presentation"')).join("");
const dots = $("#dots");
dots.innerHTML = ALBUMS.map((a, i) => `<button role="tab" data-i="${i}" aria-label="Show ${esc(a.title)}"></button>`).join("");
let cur = 0, timer;
function show(i) {
  cur = (i + ALBUMS.length) % ALBUMS.length;
  const a = ALBUMS[cur];
  $("#heroEra").textContent = a.title;
  $("#heroText").textContent = a.blurb;
  $("#heroBtn").dataset.id = a.id;
  $("#heroBtn").setAttribute("aria-label", `View ${a.title}`);
  [...dots.children].forEach((d, n) => d.setAttribute("aria-selected", n === cur));
}
function autoplay() {
  clearInterval(timer);
  if (!matchMedia("(prefers-reduced-motion: reduce)").matches) timer = setInterval(() => show(cur + 1), 5000);
}
dots.addEventListener("click", e => {
  const d = e.target.closest("button");
  if (d) { show(+d.dataset.i); autoplay(); }
});
$("#heroBtn").addEventListener("click", e => openAlbum(e.currentTarget.dataset.id));
show(0); autoplay();


const menu = $("#menu"), links = $("#links");
menu.addEventListener("click", () => {
  const open = links.classList.toggle("open");
  menu.setAttribute("aria-expanded", open);
});
links.addEventListener("click", e => { if (e.target.tagName === "A") { links.classList.remove("open"); menu.setAttribute("aria-expanded", false); } });
const spy = new IntersectionObserver(es => es.forEach(en => {
  if (en.isIntersecting) links.querySelectorAll("a").forEach(a => a.classList.toggle("on", a.getAttribute("href") === "#" + en.target.id));
}), { rootMargin: "-45% 0px -50% 0px" });
["home", "albums", "about", "contact"].forEach(id => spy.observe(document.getElementById(id)));
$("#year").textContent = new Date().getFullYear();


$("#contactForm").addEventListener("submit", e => {
  e.preventDefault();
  const name = $("#cName").value.trim();
  const email = $("#cEmail").value.trim();
  const message = $("#cMessage").value.trim();
  const msg = $("#formMsg");
  if (!name || !message || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    msg.className = "form-msg error";
    msg.textContent = "Please enter your name, a valid email, and a message.";
    return;
  }
  e.target.reset();
  msg.className = "form-msg ok";
  msg.textContent = `Thanks, ${name}! Your message has been received.`;
});
