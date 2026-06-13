const fs = require('fs');

let content = fs.readFileSync('script.js', 'utf8');

// 1. Remove Emojis
const emojiRegex = /[\u{1F600}-\u{1F64F}\u{1F300}-\u{1F5FF}\u{1F680}-\u{1F6FF}\u{1F700}-\u{1F77F}\u{1F780}-\u{1F7FF}\u{1F800}-\u{1F8FF}\u{1F900}-\u{1F9FF}\u{1FA00}-\u{1FA6F}\u{1FA70}-\u{1FAFF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}]/gu;
content = content.replace(emojiRegex, '');

// 2. Replace Quickfix
content = content.replace(/Quickfix\s?Plumbers/gi, 'Nairobi Plumbers');
content = content.replace(/Quickfix/gi, 'Nairobi Plumbers');

// 3. Replace Phone Number
content = content.replace(/\+254\s?700\s?123\s?456/g, '+254 706 379 094');
content = content.replace(/254700123456/g, '254706379094');
content = content.replace(/0700\s?123\s?456/g, '0706 379 094');

// 4. Update hero images
content = content.replace('"assets/hero-1.jpg"', '"assets/courosel/hero-bathroom.jpg"');
content = content.replace('"assets/hero-2.jpg"', '"assets/courosel/hero-shower.jpg"');
content = content.replace('"assets/hero-3.jpg"', '"assets/courosel/hero-kitchen.jpg"');

// 5. Update productCardHtml to include description and fix sizes
const newCardHtml = `function productCardHtml(p) {
  const price = p.salePrice || p.price;
  const badgeHtml = p.badge ? \`<div class="product-card__badge">\${p.badge}</div>\` : "";
  const waUrl = \`https://wa.me/254706379094?text=\${encodeURIComponent(\`Hi Nairobi Plumbers, I'm interested in \${p.name} (KES \${price.toLocaleString()})\`)}\`;

  return \`
      <div class="product-card">
        \${badgeHtml}
        <div class="product-card__img-wrap">
          <img src="\${p.image}" alt="\${p.name}" class="product-card__img" loading="lazy" onerror="this.src='assets/placeholder.jpg'">
        </div>
        <div class="product-card__content">
          <h3 class="product-card__title">\${p.name}</h3>
          \${p.description ? \`<p class="product-card__desc" style="font-size:0.875rem; color:var(--muted); margin-bottom:1rem; display:-webkit-box; -webkit-line-clamp:3; -webkit-box-orient:vertical; overflow:hidden;">\${p.description}</p>\` : ''}
          <div class="product-card__prices">
            <span class="product-card__price">KES \${price.toLocaleString()}</span>
            \${p.salePrice ? \`<span class="product-card__original">KES \${p.price.toLocaleString()}</span>\` : ""}
          </div>
          <div class="product-card__actions" style="display:block;">
            <a href="\${waUrl}" target="_blank" rel="noreferrer" class="product-card__btn product-card__btn--whatsapp" style="width:100%; display:flex; gap:0.5rem; justify-content:center; align-items:center;">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/><path d="M12 0C5.373 0 0 5.373 0 12c0 2.119.549 4.107 1.512 5.834L0 24l6.335-1.493A11.954 11.954 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.818 9.818 0 01-5.003-1.368l-.359-.213-3.72.876.936-3.623-.234-.372A9.818 9.818 0 112.182 12 9.818 9.818 0 0112 21.818z"/></svg>
              Order via WhatsApp
            </a>
          </div>
        </div>
      </div>
  \`;
}`;

content = content.replace(/function productCardHtml\(p\) \{[\s\S]*?\n\}/, newCardHtml);

// 6. Replace dummy products with an empty array if we're fetching from API, or we can just leave it since the API will override it.
// Actually, let's update initProductsPage to fetch from the API.
const initProductsPageRegex = /function initProductsPage\(\) \{[\s\S]*?(?=\nfunction initContactPage)/;

const newInitProducts = `async function initProductsPage() {
  const container = document.getElementById("products-grid");
  const catList = document.getElementById("category-list");
  const searchInput = document.getElementById("product-search");
  if (!container) return;

  container.innerHTML = '<div style="grid-column: 1 / -1; text-align: center; padding: 2rem;"><p>Loading products...</p></div>';

  let apiProducts = [];
  try {
    const res = await fetch('http://localhost:5000/api/products');
    const data = await res.json();
    if (data.success && data.data) {
      apiProducts = data.data;
    } else {
      apiProducts = products; // fallback to dummy
    }
  } catch (err) {
    console.error('Failed to fetch products API', err);
    apiProducts = products; // fallback
  }

  let filtered = [...apiProducts];

  function renderGrid(list) {
    if (list.length === 0) {
      container.innerHTML = '<p style="grid-column: 1 / -1; text-align: center;">No products found.</p>';
      return;
    }
    container.innerHTML = list.map(productCardHtml).join("");
  }

  function renderCategories(list) {
    if (!catList) return;
    const cats = list.reduce((acc, p) => {
      acc[p.category] = (acc[p.category] || 0) + 1;
      return acc;
    }, {});
    
    let html = '<li><a href="#" class="active" data-cat="all">All Products (' + list.length + ')</a></li>';
    for (const [cat, count] of Object.entries(cats)) {
      html += \`<li><a href="#" data-cat="\${cat}">\${cat} (\${count})</a></li>\`;
    }
    catList.innerHTML = html;

    catList.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        catList.querySelectorAll('a').forEach(a => a.classList.remove('active'));
        e.target.classList.add('active');
        const selected = e.target.getAttribute('data-cat');
        if (selected === 'all') {
          filtered = [...apiProducts];
        } else {
          filtered = apiProducts.filter(p => p.category === selected);
        }
        renderGrid(filtered);
      });
    });
  }

  renderCategories(apiProducts);
  renderGrid(filtered);

  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      const q = e.target.value.toLowerCase();
      filtered = apiProducts.filter(p => p.name.toLowerCase().includes(q) || (p.description && p.description.toLowerCase().includes(q)));
      renderGrid(filtered);
    });
  }
}
`;

content = content.replace(initProductsPageRegex, newInitProducts);

// 7. Make sure path.endsWith("products.html") is path.includes("/products/")
content = content.replace(/else if \(path\.endsWith\("products\.html"\)\) initProductsPage\(\);/, 'else if (path.includes("/products/")) initProductsPage();');

fs.writeFileSync('script.js', content);
console.log('script.js completely restored and updated for API integration');
