/**
 * Nairobi Plumbers — script.js
 * Shared JavaScript for all pages
 */

/* ============================================================
   SITE CONFIG
   ============================================================ */
const SITE = {
  name:      "Nairobi Plumbers",
  phone:     "+254 706 379 094",
  phoneHref: "tel:+254706379094",
  email:     "hello@nairobiplumbers.co.ke",
  address:   "Ngong Road, Kilimani, Nairobi",
  whatsapp:  "254706379094",
};

function waLink(msg) {
  return `https://wa.me/${SITE.whatsapp}?text=${encodeURIComponent(msg)}`;
}

/* ============================================================
   HERO SLIDES DATA
   ============================================================ */
const heroSlides = [
  {
    subtitle: "Bathroom Renovation Services in Nairobi",
    desc:     "Transform your bathroom with modern designs, quality fittings, and expert finishing.",
    image:    "assets/courosel/hero-bathroom.jpg",
  },
  {
    subtitle: "Kitchen Sink Tap Repair Services",
    desc:     "Fix leaks, replace faulty taps, and restore your kitchen's convenience quickly.",
    image:    "assets/courosel/hero-kitchen.jpg",
  },
  {
    subtitle: "Shower Cubicle Installation in Nairobi",
    desc:     "Enhance your bathroom with elegant, space-saving shower cubicles tailored to your style.",
    image:    "assets/courosel/hero-shower.jpg",
  },
];

/* ============================================================
   SERVICES DATA
   ============================================================ */
const services = [
  {
    title: "Toilet Repair & Drain Unclogging",
    desc:  "Expert toilet repair and drain unclogging services in Nairobi. We fix toilet issues and clear clogged drain lines efficiently.",
    href:  "/services/toilet-repair-nairobi/",
    image: "assets/courosel/blog-pipes.jpg",
  },
  {
    title: "Emergency Plumbing Services 24/7",
    desc:  "24/7 emergency plumbing response in Nairobi. Our skilled team handles burst pipes, water leaks, and more with speed.",
    href:  "/services/emergency-plumber-nairobi/",
    image: "assets/courosel/blog-heater.jpg",
  },
  {
    title: "Bathroom Renovation Services",
    desc:  "Top-quality bathroom renovation in Kenya. From design to installation, we transform your bathroom into a luxurious retreat.",
    href:  "/services/bathroom-renovation-nairobi/",
    image: "assets/courosel/blog-renovation.jpg",
  },
  {
    title: "Water Heater Installation",
    desc:  "Expert water heater installation in Nairobi. We install your heater safely and efficiently for reliable hot water supply.",
    href:  "/services/water-heater-installation-nairobi/",
    image: "assets/storage-heater.png",
  },
  {
    title: "Drain & Sewer Cleaning",
    desc:  "Professional drain and sewer cleaning services in Nairobi using modern equipment. Thorough, fast, and affordable.",
    href:  "/services/drain-cleaning-nairobi/",
    image: "assets/courosel/hero-kitchen.jpg",
  },
];


/* ============================================================
   BLOG DATA
   ============================================================ */
const blogPosts = [
  {
    title:   "How to Choose the Right Water Heater for Your Home",
    excerpt: "Instant vs storage heaters — we break down the pros and cons so you can make the right decision for your Nairobi home.",
    image:   "assets/courosel/blog-heater.jpg",
    readMin: 4,
  },
  {
    title:   "Signs Your Pipes Need Immediate Attention",
    excerpt: "Ignoring minor leaks can lead to major water damage. Here are the warning signs every Nairobi homeowner should know.",
    image:   "assets/courosel/blog-pipes.jpg",
    readMin: 3,
  },
  {
    title:   "Complete Guide to Bathroom Renovation in Nairobi",
    excerpt: "Planning a bathroom makeover? Our step-by-step guide covers budgeting, materials, timelines, and how to find the right plumber.",
    image:   "assets/courosel/blog-renovation.jpg",
    readMin: 6,
  },
];

/* ============================================================
   NAVBAR
   ============================================================ */
function initNavbar() {
  const hamburger = document.getElementById("hamburger");
  const mobileMenu = document.getElementById("mobile-menu");
  const closeBtn = document.getElementById("mobile-close");

  if (hamburger && mobileMenu) {
    hamburger.addEventListener("click", () => mobileMenu.classList.add("open"));
    closeBtn?.addEventListener("click", () => mobileMenu.classList.remove("open"));
    mobileMenu.addEventListener("click", (e) => {
      if (e.target === mobileMenu) mobileMenu.classList.remove("open");
    });
  }
}

/* ============================================================
   HERO
   ============================================================ */
function initHero() {
  const slidesWrap = document.querySelector(".hero__slides");
  const dotsWrap   = document.querySelector(".hero__dots");
  const prevBtn    = document.querySelector(".hero__prev");
  const nextBtn    = document.querySelector(".hero__next");
  const brand      = document.getElementById("hero-brand");
  const subtitle   = document.getElementById("hero-subtitle");
  const desc       = document.getElementById("hero-desc");

  if (!slidesWrap) return;

  // Build slide images
  heroSlides.forEach((s, i) => {
    const div = document.createElement("div");
    div.className = "hero__slide" + (i === 0 ? " active" : "");
    div.innerHTML = `<img src="${s.image}" alt="${s.subtitle}" loading="${i === 0 ? 'eager' : 'lazy'}">`;
    slidesWrap.appendChild(div);

    // Dot
    const dot = document.createElement("button");
    dot.className = "hero__dot" + (i === 0 ? " active" : "");
    dot.setAttribute("aria-label", `Slide ${i + 1}`);
    dot.addEventListener("click", () => goTo(i));
    dotsWrap?.appendChild(dot);
  });

  const slides = document.querySelectorAll(".hero__slide");
  const dots   = document.querySelectorAll(".hero__dot");
  let current  = 0;
  let timer;

  function goTo(idx) {
    slides[current].classList.remove("active");
    dots[current]?.classList.remove("active");
    current = (idx + heroSlides.length) % heroSlides.length;
    slides[current].classList.add("active");
    dots[current]?.classList.add("active");
    // Update text
    if (subtitle) subtitle.textContent = heroSlides[current].subtitle;
    if (desc)     desc.textContent     = heroSlides[current].desc;
    resetTimer();
  }

  function resetTimer() {
    clearInterval(timer);
    timer = setInterval(() => goTo(current + 1), 5000);
  }

  prevBtn?.addEventListener("click", () => goTo(current - 1));
  nextBtn?.addEventListener("click", () => goTo(current + 1));
  resetTimer();
}

/* ============================================================
   HOME PAGE
   ============================================================ */
function initHomePage() {
  // Services grid
  const sg = document.getElementById("services-grid");
  if (sg) {
    sg.innerHTML = services.map(s => `
      <div class="service-card">
        <div class="service-card__img-wrap">
          <img src="${s.image}" alt="${s.title}" loading="lazy" onerror="this.src='assets/instant-shower.png'">
        </div>
        <div class="service-card__body">
          <div>
            <a href="${s.href}"><h3 class="service-card__title">${s.title}</h3></a>
            <p class="service-card__desc">${s.desc}</p>
          </div>
          <a href="${waLink(`Hello Nairobi Plumbers, I would like to inquire about: ${s.title}`)}" target="_blank" rel="noreferrer" class="service-card__wa">
            <svg width="16" height="16" viewBox="0 0 448 512" fill="currentColor"><path d="M380.9 97.1C339 55.1 283.2 32 223.9 32c-122.4 0-222 99.6-222 222 0 39.1 10.2 77.3 29.6 111L0 480l117.7-30.9c32.4 17.7 68.9 27 106.1 27h.1c122.3 0 224.1-99.6 224.1-222 0-59.3-25.2-115-67.1-157zm-157 341.6c-33.2 0-65.7-8.9-94-25.7l-6.7-4-69.8 18.3L72 359.2l-4.4-7c-18.5-29.4-28.2-63.3-28.2-98.2 0-101.7 82.8-184.5 184.6-184.5 49.3 0 95.6 19.2 130.4 54.1 34.8 34.9 56.2 81.2 56.1 130.5 0 101.8-84.9 184.6-186.6 184.6zm101.2-138.2c-5.5-2.8-32.8-16.2-37.9-18-5.1-1.9-8.8-2.8-12.5 2.8-3.7 5.6-14.3 18-17.6 21.8-3.2 3.7-6.5 4.2-12 1.4-32.6-16.3-54-29.1-75.5-66-5.7-9.8 5.7-9.1 16.3-30.3 1.8-3.7.9-6.9-.5-9.7-1.4-2.8-12.5-30.1-17.1-41.2-4.5-10.8-9.1-9.3-12.5-9.5-3.2-.2-6.9-.2-10.6-.2-3.7 0-9.7 1.4-14.8 6.9-5.1 5.6-19.4 19-19.4 46.3 0 27.3 19.9 53.7 22.6 57.4 2.8 3.7 39.1 59.7 94.8 83.8 35.2 15.2 49 16.5 66.6 13.9 10.7-1.6 32.8-13.4 37.4-26.4 4.6-13 4.6-24.1 3.2-26.4-1.3-2.5-5-3.9-10.5-6.6z"/></svg>
            Order Via WhatsApp
          </a>
        </div>
      </div>`).join("");
  }


  // Blog
  const bg = document.getElementById("blog-grid");
  if (bg) {
    bg.innerHTML = blogPosts.map(b => `
      <article class="blog-card">
        <div class="blog-card__img-wrap">
          <img src="${b.image}" alt="${b.title}" loading="lazy" onerror="this.src='assets/instant-shower.png'">
        </div>
        <div class="blog-card__body">
          <p class="blog-card__meta">${b.readMin} min read</p>
          <h3 class="blog-card__title">${b.title}</h3>
          <p class="blog-card__excerpt">${b.excerpt}</p>
          <a href="/blog/" class="blog-card__link">
            Read Article
            <svg width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
          </a>
        </div>
      </article>`).join("");
  }
}

/* ============================================================
   PRODUCTS PAGE
   ============================================================ */
async function initProductsPage() {
  const container   = document.getElementById("products-grid");
  const catList     = document.getElementById("category-list");
  const searchInput = document.getElementById("product-search");
  if (!container) return;

  container.innerHTML = '<div style="grid-column:1/-1;text-align:center;padding:3rem;"><p>Loading products...</p></div>';

  let allProducts = [];
  try {
    const res  = await fetch('https://nairobiplumbers-scraper.onrender.com/api/products');
    const data = await res.json();
    if (data.success && data.data && data.data.length > 0) {
      allProducts = data.data;
    }
  } catch (e) {
    console.warn("API unavailable, using local data");
  }

  let filtered = [...allProducts];

  function renderGrid(list) {
    if (list.length === 0) {
      container.innerHTML = '<p style="grid-column:1/-1;text-align:center;padding:2rem;color:var(--muted);">No products found.</p>';
      return;
    }
    container.innerHTML = list.map(p => productCardHtml(p)).join("");
  }

  function renderCategories() {
    if (!catList) return;
    const cats = allProducts.reduce((acc, p) => {
      acc[p.category] = (acc[p.category] || 0) + 1;
      return acc;
    }, {});
    let html = `<li><a href="#" class="active" data-cat="all">All Products (${allProducts.length})</a></li>`;
    Object.entries(cats).forEach(([cat, count]) => {
      html += `<li><a href="#" data-cat="${cat}">${cat} <span style="color:var(--muted)">(${count})</span></a></li>`;
    });
    catList.innerHTML = html;
    catList.querySelectorAll("a").forEach(link => {
      link.addEventListener("click", (e) => {
        e.preventDefault();
        catList.querySelectorAll("a").forEach(a => a.classList.remove("active"));
        e.target.classList.add("active");
        const sel = e.target.getAttribute("data-cat");
        filtered = sel === "all" ? [...allProducts] : allProducts.filter(p => p.category === sel);
        renderGrid(filtered);
      });
    });
  }

  renderCategories();
  renderGrid(filtered);

  if (searchInput) {
    searchInput.addEventListener("input", (e) => {
      const q = e.target.value.toLowerCase();
      filtered = allProducts.filter(p =>
        p.name.toLowerCase().includes(q) ||
        (p.description && p.description.toLowerCase().includes(q))
      );
      renderGrid(filtered);
    });
  }
}

function productCardHtml(p) {
  const price  = p.salePrice || p.price;
  const badgeHtml = p.badge ? `<div class="product-card__badge">${p.badge}</div>` : "";
  const slug = p.url ? p.url.split('/').filter(Boolean).pop() : p.name.toLowerCase().replace(/[^a-z0-9]+/g, '-');
  const productPageUrl = `https://nairobiplumbers.co.ke/products/${slug}/`;
  const waText = `Hello Nairobi Plumbers, I would like to inquire and order:\n\n*${p.name}*\n*Product URL:* ${productPageUrl}\n\nThank You!`;
  const waUrl  = `https://wa.me/${SITE.whatsapp}?text=${encodeURIComponent(waText)}`;

  return `
    <div class="product-card">
      ${badgeHtml}
      <div class="product-card__img-wrap">
        <img src="${p.image}" alt="${p.name}" class="product-card__img" loading="lazy" onerror="this.src='assets/instant-shower.png'">
      </div>
      <div class="product-card__content">
        <h3 class="product-card__title">${p.name}</h3>
        ${p.description ? `<p class="product-card__desc">${p.description}</p>` : ''}
        <div class="product-card__prices">
          <span class="product-card__price">KES ${price.toLocaleString()}</span>
          ${p.salePrice ? `<span class="product-card__original">KES ${p.price.toLocaleString()}</span>` : ""}
        </div>
        <a href="${waUrl}" target="_blank" rel="noreferrer" class="product-card__btn">
          <svg width="15" height="15" viewBox="0 0 448 512" fill="currentColor"><path d="M380.9 97.1C339 55.1 283.2 32 223.9 32c-122.4 0-222 99.6-222 222 0 39.1 10.2 77.3 29.6 111L0 480l117.7-30.9c32.4 17.7 68.9 27 106.1 27h.1c122.3 0 224.1-99.6 224.1-222 0-59.3-25.2-115-67.1-157zm-157 341.6c-33.2 0-65.7-8.9-94-25.7l-6.7-4-69.8 18.3L72 359.2l-4.4-7c-18.5-29.4-28.2-63.3-28.2-98.2 0-101.7 82.8-184.5 184.6-184.5 49.3 0 95.6 19.2 130.4 54.1 34.8 34.9 56.2 81.2 56.1 130.5 0 101.8-84.9 184.6-186.6 184.6zm101.2-138.2c-5.5-2.8-32.8-16.2-37.9-18-5.1-1.9-8.8-2.8-12.5 2.8-3.7 5.6-14.3 18-17.6 21.8-3.2 3.7-6.5 4.2-12 1.4-32.6-16.3-54-29.1-75.5-66-5.7-9.8 5.7-9.1 16.3-30.3 1.8-3.7.9-6.9-.5-9.7-1.4-2.8-12.5-30.1-17.1-41.2-4.5-10.8-9.1-9.3-12.5-9.5-3.2-.2-6.9-.2-10.6-.2-3.7 0-9.7 1.4-14.8 6.9-5.1 5.6-19.4 19-19.4 46.3 0 27.3 19.9 53.7 22.6 57.4 2.8 3.7 39.1 59.7 94.8 83.8 35.2 15.2 49 16.5 66.6 13.9 10.7-1.6 32.8-13.4 37.4-26.4 4.6-13 4.6-24.1 3.2-26.4-1.3-2.5-5-3.9-10.5-6.6z"/></svg>
          Order Via WhatsApp
        </a>
      </div>
    </div>`;
}

/* ============================================================
   INQUIRY BASKET
   ============================================================ */
function initInquiry() {
  const floatBtn   = document.getElementById("inquiry-float");
  const drawer     = document.getElementById("inquiry-drawer");
  const backdrop   = document.getElementById("inquiry-backdrop");
  const closeBtn   = document.getElementById("inquiry-close");
  const list       = document.getElementById("inquiry-list");
  const empty      = document.getElementById("inquiry-empty");
  const footer     = document.getElementById("inquiry-footer");
  const waBtn      = document.getElementById("inquiry-wa-btn");
  const clearBtn   = document.getElementById("inquiry-clear");
  const countEls   = document.querySelectorAll(".inquiry-count");
  const totalEl    = document.getElementById("inquiry-total-amount");

  let basket = JSON.parse(localStorage.getItem("np_basket") || "[]");

  function save() { localStorage.setItem("np_basket", JSON.stringify(basket)); }

  function render() {
    if (!list) return;
    countEls.forEach(el => el.textContent = basket.length);
    if (basket.length === 0) {
      if (empty)  empty.style.display  = "";
      if (footer) footer.style.display = "none";
      list.innerHTML = "";
    } else {
      if (empty)  empty.style.display  = "none";
      if (footer) footer.style.display = "";
      list.innerHTML = basket.map((item, idx) => `
        <li class="inquiry-drawer__item">
          <span>${item.name}</span>
          <span style="font-weight:700; white-space:nowrap;">KES ${item.price.toLocaleString()}</span>
          <button onclick="removeItem(${idx})" aria-label="Remove">&times;</button>
        </li>`).join("");
      const total = basket.reduce((s, i) => s + i.price, 0);
      if (totalEl) totalEl.textContent = `KES ${total.toLocaleString()}`;
      if (waBtn) {
        const msg = `Hello Nairobi Plumbers, I'd like to inquire about:\n` + basket.map(i => `- ${i.name}: KES ${i.price.toLocaleString()}`).join("\n");
        waBtn.href = waLink(msg);
      }
    }
  }

  window.removeItem = (idx) => { basket.splice(idx, 1); save(); render(); };

  window.addToBasket = (item) => {
    basket.push(item);
    save();
    render();
    drawer?.classList.add("open");
  };

  floatBtn?.addEventListener("click", () => drawer?.classList.add("open"));
  closeBtn?.addEventListener("click", () => drawer?.classList.remove("open"));
  backdrop?.addEventListener("click", () => drawer?.classList.remove("open"));
  clearBtn?.addEventListener("click", () => { basket = []; save(); render(); });

  render();
}

/* ============================================================
   BOOTSTRAP
   ============================================================ */
document.addEventListener("DOMContentLoaded", () => {
  initNavbar();
  initHero();
  initInquiry();

  const path = window.location.pathname;
  if (path === "/" || path.endsWith("index.html") || path.endsWith("/nairobiPlumbers/")) {
    initHomePage();
  } else if (path.includes("/products/")) {
    initProductsPage();
  }
});
