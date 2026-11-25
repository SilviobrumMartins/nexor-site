// Número de WhatsApp da Nexor (DDI + DDD + número, só dígitos). Troque pelo número real.
const WHATSAPP = "5500000000000";

// Os trabalhos do portfólio ficam no arquivo portfolio-dados.js

const pad = (n) => String(Math.floor(n)).padStart(2, "0");
const toTC = (sec, fps = 30) =>
  `${pad(sec / 3600)}:${pad((sec / 60) % 60)}:${pad(sec % 60)}:${pad((sec % 1) * fps)}`;

function el(tag, cls, text) {
  const e = document.createElement(tag);
  if (cls) e.className = cls;
  if (text) e.textContent = text;
  return e;
}

/* =========================================================
   PORTFÓLIO
   ========================================================= */
const calmMotion = matchMedia("(prefers-reduced-motion: reduce)").matches;
// vídeo de vitrine só toca enquanto está na tela: a página fica leve
const playWhenVisible = "IntersectionObserver" in window
  ? new IntersectionObserver((entries) => entries.forEach((e) => {
      if (e.isIntersecting) e.target.play().catch(() => {});
      else e.target.pause();
    }), { threshold: 0.25 })
  : null;

function ratioOf(formato) {
  const [w, h] = String(formato || "16:9").split(":").map(Number);
  return w && h ? { w, h, r: w / h } : { w: 16, h: 9, r: 16 / 9 };
}
const pathOf = (f) => { f = String(f || "").trim(); return f && (f.includes("/") ? f : `assets/portfolio/${f}`); };
const srcOf = (v) => pathOf(v.arquivo);
const slidesOf = (v) => (Array.isArray(v.imagens) ? v.imagens.map(pathOf).filter(Boolean) : []);
const isReady = (v) => Boolean(srcOf(v) || slidesOf(v).length);
const isVideo = (s) => /\.(mp4|webm|mov|m4v)$/i.test(s);
const readyFirst = (items) => [...items.filter(isReady), ...items.filter((v) => !isReady(v))];

// carrossel de verdade: arrasta com o dedo (ou mouse/trackpad) ou usa as setas
function carousel(slides, titulo) {
  const wrap = el("div", "carousel");
  wrap.setAttribute("role", "region");
  wrap.setAttribute("aria-roledescription", "carrossel");
  wrap.setAttribute("aria-label", titulo);
  const track = el("div", "carousel__track");
  track.tabIndex = 0; // dá para passar com as setas do teclado
  slides.forEach((s, i) => {
    const img = el("img");
    img.src = s;
    img.alt = `${titulo} — tela ${i + 1} de ${slides.length}`;
    img.loading = "lazy";
    img.draggable = false;
    track.append(img);
  });
  const prev = el("button", "carousel__btn carousel__btn--prev");
  const next = el("button", "carousel__btn carousel__btn--next");
  prev.type = next.type = "button";
  prev.setAttribute("aria-label", "Tela anterior");
  next.setAttribute("aria-label", "Próxima tela");
  const count = el("span", "mono carousel__count");
  const dots = el("div", "carousel__dots");
  slides.forEach(() => dots.append(el("i")));

  const go = (dir) => track.scrollBy({ left: dir * track.clientWidth, behavior: calmMotion ? "auto" : "smooth" });
  prev.addEventListener("click", () => go(-1));
  next.addEventListener("click", () => go(1));
  const update = () => {
    const i = Math.round(track.scrollLeft / Math.max(1, track.clientWidth));
    count.textContent = `${i + 1}/${slides.length}`;
    [...dots.children].forEach((d, n) => d.classList.toggle("on", n === i));
    prev.hidden = i <= 0;
    next.hidden = i >= slides.length - 1;
  };
  track.addEventListener("scroll", update, { passive: true });
  window.addEventListener("resize", update);
  update();

  // passa sozinho a cada 3 segundos e volta para a primeira tela no fim.
  // para quando a pessoa põe o mouse/dedo em cima ou quando sai da tela.
  let timer = null, hold = false, onScreen = false;
  const tick = () => {
    const i = Math.round(track.scrollLeft / Math.max(1, track.clientWidth));
    if (i >= slides.length - 1) track.scrollTo({ left: 0, behavior: "smooth" });
    else go(1);
  };
  const stop = () => { clearInterval(timer); timer = null; };
  const start = () => { if (!calmMotion && !timer && !hold && onScreen) timer = setInterval(tick, 3000); };
  const pause = () => { hold = true; stop(); };
  const resume = () => { hold = false; start(); };
  wrap.addEventListener("pointerenter", pause);
  wrap.addEventListener("pointerleave", resume);
  wrap.addEventListener("focusin", pause);
  wrap.addEventListener("focusout", resume);
  if ("IntersectionObserver" in window) {
    new IntersectionObserver(([e]) => { onScreen = e.isIntersecting; onScreen ? start() : stop(); }, { threshold: 0.4 }).observe(wrap);
  } else { onScreen = true; start(); }

  wrap.append(track, prev, next, count, dots);
  return wrap;
}

// um cartão do portfólio. comSom: o vídeo espera o clique e toca com som (portfólio de vídeos)
function caseCard(v, { comSom = false, flex = false } = {}) {
  const { w, h, r } = ratioOf(v.formato);
  const src = srcOf(v);
  const slides = slidesOf(v);
  const ready = isReady(v);
  const card = el("figure", "case" + (ready ? "" : " case--empty") + (r > 1.2 ? " case--wide" : ""));
  if (flex) card.style.flex = `${r} 1 0`; // mesma altura para todos da fileira
  const screen = el("div", "case__screen");
  screen.style.aspectRatio = `${w} / ${h}`;
  const tag = el("span", "mono case__tag");
  tag.append(el("i"), v.formato || "");
  screen.append(tag);

  if (slides.length > 1) {
    screen.append(carousel(slides, v.titulo || v.tipo));
  } else if (slides.length === 1) {
    const img = el("img");
    img.src = slides[0];
    img.alt = v.titulo || v.tipo;
    img.loading = "lazy";
    screen.append(img);
  } else if (src && isVideo(src)) {
    const vid = document.createElement("video");
    vid.playsInline = true;
    vid.preload = "metadata";
    vid.setAttribute("aria-label", v.titulo || v.tipo);
    if (v.capa) { vid.poster = v.capa; vid.preload = "none"; } // capa opcional (senão, o primeiro quadro)
    if (comSom) {
      vid.src = `${src}#t=0.1`; // o primeiro quadro vira a capa
      vid.dataset.som = "";
      const btn = el("button", "case__play");
      btn.type = "button";
      btn.setAttribute("aria-label", `Assistir: ${v.titulo || v.tipo}`);
      btn.append(el("span", "case__btn"));
      btn.addEventListener("click", () => {
        btn.remove();
        vid.controls = true;
        vid.play().catch(() => {});
      });
      screen.append(vid, btn);
    } else {
      vid.src = src;
      vid.muted = true;
      vid.loop = true;
      if (calmMotion || !playWhenVisible) vid.controls = true;
      else playWhenVisible.observe(vid);
      screen.append(vid);
    }
  } else if (src) {
    const img = el("img");
    img.src = src;
    img.alt = v.titulo || v.tipo;
    img.loading = "lazy";
    screen.append(img);
  } else {
    const empty = el("div", "case__empty");
    empty.innerHTML = comSom
      ? '<svg viewBox="0 0 42 42" aria-hidden="true"><circle cx="21" cy="21" r="18"/><path d="M17 14l11 7-11 7z"/></svg>'
      : Array.isArray(v.imagens)
      ? '<svg viewBox="0 0 42 42" aria-hidden="true"><rect x="9" y="6" width="24" height="30" rx="2"/><path d="M5 10v22M37 10v22"/><path d="M15 39h2M20 39h2M25 39h2"/></svg>'
      : '<svg viewBox="0 0 42 42" aria-hidden="true"><rect x="3" y="7" width="36" height="28" rx="2"/><path d="M3 29l10-9 8 7 6-5 12 10"/><circle cx="29" cy="15" r="3"/></svg>';
    empty.append(el("span", "mono", "em breve"));
    screen.append(empty);
  }

  const cap = el("figcaption");
  cap.append(el("strong", "", ready ? v.titulo || v.tipo : `${v.tipo} · em breve`));
  const extra = slides.length > 1 ? `${slides.length} telas` : "";
  cap.append(el("span", "mono", ready ? [v.cliente, v.tipo, extra].filter(Boolean).join(" · ") : "trabalho chegando"));
  card.append(screen, cap);
  return card;
}

// quando um vídeo com som começa, os outros param
document.addEventListener("play", (e) => {
  if (!e.target.matches?.("video[data-som]")) return;
  document.querySelectorAll("video[data-som]").forEach((v) => { if (v !== e.target) v.pause(); });
}, true);

// página inicial: só uma amostra, numa fileira
function renderSample(id, list, porTipo, opts = {}) {
  const box = document.getElementById(id);
  if (!box || !list) return;
  const filtro = box.dataset.tipo; // ex.: data-tipo="Vídeo em pé"
  const tipos = [...new Set(list.map((v) => v.tipo))].filter((t) => !filtro || t === filtro);
  tipos.forEach((t) => {
    readyFirst(list.filter((v) => v.tipo === t))
      .slice(0, porTipo)
      .forEach((v) => box.append(caseCard(v, { ...opts, flex: true })));
  });
}

// página de portfólio: tudo, agrupado por tipo
function renderFull(id, list, opts = {}) {
  const box = document.getElementById(id);
  if (!box || !list) return;
  [...new Set(list.map((v) => v.tipo))].forEach((t) => {
    const items = list.filter((v) => v.tipo === t);
    const prontos = items.filter(isReady).length;
    const group = el("div", "cases__group");
    const label = el("p", "mono cases__label");
    label.append(
      el("span", "", t),
      el("span", "", `${items[0].formato} · ${prontos ? prontos + (prontos > 1 ? " trabalhos" : " trabalho") : "em breve"}`)
    );
    const { r } = ratioOf(items[0].formato);
    const grid = el("div", "cases-grid" + (r > 1.2 ? " cases-grid--wide" : ""));
    readyFirst(items).forEach((v) => grid.append(caseCard(v, opts)));
    group.append(label, grid);
    box.append(group);
  });
}

if (typeof PORTFOLIO !== "undefined") {
  // página inicial
  renderSample("casesVideoV", PORTFOLIO.videos, 4, { comSom: true });
  renderSample("casesVideoH", PORTFOLIO.videos, 2, { comSom: true });
  renderSample("casesRedes", PORTFOLIO.redes, 1);
  renderSample("casesMarca", PORTFOLIO.marca, 1);
  renderSample("casesSites", PORTFOLIO.sites, 1);
  // portfolio.html
  renderFull("fullVideos", PORTFOLIO.videos, { comSom: true });
  renderFull("fullRedes", PORTFOLIO.redes);
  renderFull("fullMarca", PORTFOLIO.marca);
  renderFull("fullSites", PORTFOLIO.sites);
}

/* ---------- timecode do topo: a página é um vídeo ----------
   cada seção começa num minuto (00:01, 00:02...). */
const tcEl = document.getElementById("tc");
const marks = [document.querySelector("main"), ...document.querySelectorAll("main > section.block")]
  .filter(Boolean)
  .map((el, i) => ({ el, t: i * 60 }));
const END = (marks.length - 1) * 60;
function updateTC() {
  if (!tcEl || !marks.length) return;
  const y = window.scrollY + 2;
  const pos = marks.map((m) => m.el.getBoundingClientRect().top + window.scrollY - 64);
  pos[0] = 0;
  let t = 0;
  for (let i = 0; i < marks.length; i++) {
    const start = pos[i];
    const end = i + 1 < marks.length ? pos[i + 1] : document.documentElement.scrollHeight - window.innerHeight;
    if (y >= start) t = marks[i].t + Math.min(1, (y - start) / Math.max(1, end - start)) * 60;
  }
  if (window.scrollY + window.innerHeight >= document.documentElement.scrollHeight - 2) t = END;
  tcEl.textContent = toTC(Math.min(t, END));
}
window.addEventListener("scroll", updateTC, { passive: true });
window.addEventListener("resize", updateTC);
updateTC();

/* ---------- linha do tempo da abertura ---------- */
const area = document.getElementById("trackArea");
if (area) {
  const ruler = document.getElementById("ruler");
  const buildRuler = () => {
    ruler.innerHTML = "";
    const w = ruler.clientWidth;
    const step = w < 600 ? 24 : 20;
    const count = Math.floor(w / step);
    for (let i = 0; i <= count; i++) {
      const s = document.createElement("span");
      s.style.left = `${i * step}px`;
      if (i % 5 === 0) {
        s.className = "big";
        s.innerHTML = `<em>${toTC(i * 2).slice(3)}</em>`;
      }
      ruler.appendChild(s);
    }
  };
  buildRuler();
  window.addEventListener("resize", buildRuler);

  // agulha (playhead) segue o mouse/dedo
  const head = document.getElementById("playhead");
  let following = false;
  const moveHead = (clientX) => {
    const r = area.getBoundingClientRect();
    head.style.left = `${Math.max(0, Math.min(r.width, clientX - r.left))}px`;
  };
  area.addEventListener("pointermove", (e) => { following = true; moveHead(e.clientX); });
  area.addEventListener("pointerdown", (e) => { following = true; moveHead(e.clientX); });
  area.addEventListener("pointerleave", () => { following = false; });

  // quando ninguém mexe, a agulha anda sozinha devagar
  let auto = 0.38;
  (function drift() {
    if (!following && !calmMotion) {
      auto = (auto + 0.0006) % 1;
      head.style.left = `${auto * 100}%`;
    }
    requestAnimationFrame(drift);
  })();
}

/* ---------- menu no celular ---------- */
const menuBtn = document.getElementById("menuBtn");
const menu = document.getElementById("menu");
const closeMenu = () => {
  menu.classList.remove("open");
  menuBtn.setAttribute("aria-expanded", "false");
  menuBtn.textContent = "Menu";
};
menuBtn.addEventListener("click", () => {
  const open = menu.classList.toggle("open");
  menuBtn.setAttribute("aria-expanded", open);
  menuBtn.textContent = open ? "Fechar" : "Menu";
});
menu.querySelectorAll("a").forEach((a) => a.addEventListener("click", closeMenu));

/* ---------- recado -> WhatsApp ---------- */
const form = document.getElementById("contactForm");
if (form) {
  form.addEventListener("submit", (ev) => {
    ev.preventDefault();
    const d = new FormData(ev.target);
    const msg =
      `Oi, Nexor! Aqui é ${d.get("nome")}` +
      (d.get("empresa") ? `, da ${d.get("empresa")}` : "") +
      `.\nPreciso de: ${d.get("interesse")}.` +
      (d.get("mensagem") ? `\n\n${d.get("mensagem")}` : "");
    window.open(`https://wa.me/${WHATSAPP}?text=${encodeURIComponent(msg)}`, "_blank");
  });
}

/* ---------- link com # vindo de outra página (ex.: portfolio.html#redes) ----------
   o portfólio é montado pelo script, então o navegador às vezes para no topo:
   aqui a gente leva a pessoa até a área certa. */
function jumpToHash() {
  const target = location.hash && document.getElementById(decodeURIComponent(location.hash.slice(1)));
  if (target) target.scrollIntoView({ behavior: "instant", block: "start" });
}
if (location.hash) {
  jumpToHash();
  window.addEventListener("load", jumpToHash, { once: true });
}

document.querySelectorAll("[data-wa]").forEach((a) => { a.href = `https://wa.me/${WHATSAPP}`; });
document.getElementById("year").textContent = new Date().getFullYear();
