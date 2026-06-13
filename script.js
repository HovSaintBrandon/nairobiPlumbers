/**
 * QuickFix Plumbers — script.js
 * Shared JavaScript for all pages
 */

/* ============================================================
   SITE DATA
   ============================================================ */
const SITE = {
  name: "QuickFix Plumbers",
  phone: "+254 700 123 456",
  phoneHref: "tel:+254700123456",
  email: "hello@quickfixplumbers.co.ke",
  address: "Ngong Road, Kilimani, Nairobi",
  whatsapp: "254700123456",
};

function waLink(msg) {
  return `https://wa.me/${SITE.whatsapp}?text=${encodeURIComponent(msg)}`;
}

const heroSlides = [
  {
    eyebrow: "Nairobi's Trusted Plumbers",
    title: "Expert Bathroom\nRenovations",
    desc: "From tap repairs to full bathroom overhauls — licensed plumbers, upfront pricing.",
    image: "assets/hero-1.jpg",
    primaryHref: "services.html",
    secondaryHref: "products.html",
  },
  {
    eyebrow: "Same-Day Callouts",
    title: "Instant Showers\n& Heaters",
    desc: "Supply and installation of instant shower heaters. Fully guaranteed work.",
    image: "assets/hero-2.jpg",
    primaryHref: "services.html",
    secondaryHref: "products.html",
  },
  {
    eyebrow: "Quality Products",
    title: "Premium Bathroom\nFittings",
    desc: "Vanity cabinets, glass cubicles, bidet sprayers and more — direct from our showroom.",
    image: "assets/hero-3.jpg",
    primaryHref: "products.html",
    secondaryHref: "contact.html",
  },
];


<truncated 23925 bytes>
__stars">${stars}</div>
      <p class="review-card__text">"${r.text}"</p>
      <div class="review-card__author">
        <div class="review-card__avatar">${initials}</div>
        <div>
          <div class="review-card__name">${r.name}</div>
          <div class="review-card__location">${r.location}</div>
        </div>
      </div>
    </div>`;
}

function blogCardHtml(b) {
  return `
    <article class="blog-card">
      <div class="blog-card__img-wrap">
        <img src="${b.image}" alt="${b.title}" loading="lazy" onerror="this.src='assets/placeholder.jpg'">
      </div>
      <div class="blog-card__body">
        <p class="blog-card__meta">${b.readMin} min read</p>
        <h3 class="blog-card__title">${b.title}</h3>
        <p class="blog-card__excerpt">${b.excerpt}</p>
        <a href="#" class="blog-card__link">
          Read Article
          <svg width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
        </a>
      </div>
    </article>`;
}


/* ============================================================
   BOOTSTRAP
   ============================================================ */
document.addEventListener("DOMContentLoaded", () => {
  initNavbar();
  initHero();
  initInquiry();

  // Detect page
  const path = window.location.pathname;
  if (path.endsWith("index.html") || path === "/" || path.endsWith("/nairobiPlumbers/")) initHomePage();
  else if (path.endsWith("services.html")) initServicesPage();
  else if (path.endsWith("products.html")) initProductsPage();
  else if (path.endsWith("contact.html")) initContactPage();
  else initHomePage(); // fallback
});
