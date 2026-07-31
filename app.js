document.addEventListener('DOMContentLoaded', () => {

    // ── Fullscreen on first tap (non-intrusive) ────────────────────────────────
    const enterFullscreen = () => {
        const elem = document.documentElement;
        if (!document.fullscreenElement) {
            const request = elem.requestFullscreen || elem.webkitRequestFullscreen || elem.msRequestFullscreen;
            if (request) request.call(elem).catch(() => { });
        }
        document.removeEventListener('click', enterFullscreen);
        document.removeEventListener('touchstart', enterFullscreen);
    };
    document.addEventListener('click', enterFullscreen);
    document.addEventListener('touchstart', enterFullscreen, { passive: true });

    // ── Translations Dictionary ───────────────────────────────────────────────
    const translations = {
        es: {
            review_text: "¡No olvides dejar tu reseña! 💕✨",
            review_btn: "Dejar reseña",
            subtitle: "Elegí una de las tres barras",
            nav_pizzeria: "Pizzería",
            nav_hamburgueseria: "Hamburguesería",
            nav_tragos: "Tragos",
            search_placeholder: "🔍 Buscar plato, trago o bebida...",
            filter_all: "Todos",
            filter_vegan: "🌱 Vegano",
            filter_sintacc: "🌾 Sin TACC (No apto celíaco)",
            filter_noalcohol: "🚫 Sin Alcohol",
            cart_button: "Mi Cuenta",
            cart_modal_title: "Simulador de Cuenta",
            cart_split_label: "Dividir cuenta entre:",
            cart_people_text: "pers.",
            cart_total: "Total estimado:",
            cart_per_person: "Por persona:",
            cart_note: "💡 Este simulador te ayuda a calcular tu cuenta. Hacé tu pedido al mozo.",
            cart_clear: "Vaciar borrador",
            cart_close: "Entendido",
            cart_empty: "No agregaste ningún producto a tu cuenta aún.",
            cart_add: "+ Agregar",
            wifi_title: "Wi-Fi del Local",
            wifi_subtitle: "Conectate gratis en Jabalí",
            wifi_network: "Red (SSID):",
            wifi_password: "Contraseña:",
            wifi_copy: "Copiar contraseña",
            wifi_copied: "¡Copiada con éxito! 🎉",
            dev_tagline: "¿Querés una carta QR para tu negocio? ¡Escribime!",
            hh_title_active: "Happy Hour 2 x $14.000",
            hh_deal_active: "En tragos seleccionados de la barra",
            hh_tag_active: "ACTIVO HASTA 21:00 HS",
            hh_title_expired: "Happy Hour Finalizado",
            hh_deal_expired: "Todos los días HH 18:00 a 21:00 hs | Miércoles 2x1 Fernet hasta 22:00 hs",
            hh_tag_expired: "HASTA LAS 21:00 HS",
            fernet_promo_badge_active: "🔥 2X1 (Miércoles hasta 22:00 hs)",
            fernet_promo_badge_info: "🍹 2X1 sólo Miércoles hasta 22:00 hs",
            fernet_banner_active_title: "2X1 en Fernet con Coca",
            fernet_banner_active_deal: "¡Promo de Miércoles activa hasta las 22:00 hs!",
            fernet_banner_active_tag: "ACTIVO HASTA 22:00 HS",
        },
        en: {
            review_text: "Don't forget to leave us a review! 💕✨",
            review_btn: "Leave review",
            subtitle: "Choose one of our three bars",
            nav_pizzeria: "Pizzeria",
            nav_hamburgueseria: "Burger Bar",
            nav_tragos: "Cocktails & Drinks",
            search_placeholder: "🔍 Search dish, drink or beverage...",
            filter_all: "All",
            filter_vegan: "🌱 Vegan",
            filter_sintacc: "🌾 Gluten Free (Not for celiacs)",
            filter_noalcohol: "🚫 Non-Alcoholic",
            cart_button: "My Bill",
            cart_modal_title: "Bill Simulator",
            cart_split_label: "Split bill between:",
            cart_people_text: "ppl.",
            cart_total: "Estimated total:",
            cart_per_person: "Per person:",
            cart_note: "💡 This simulator helps calculate your bill. Order directly from your server.",
            cart_clear: "Clear bill",
            cart_close: "Got it",
            cart_empty: "You haven't added any items to your bill yet.",
            cart_add: "+ Add",
            wifi_title: "Venue Wi-Fi",
            wifi_subtitle: "Connect for free at Jabalí",
            wifi_network: "Network (SSID):",
            wifi_password: "Password:",
            wifi_copy: "Copy password",
            wifi_copied: "Copied successfully! 🎉",
            dev_tagline: "Want a QR menu for your business? Contact me!",
            hh_title_active: "Happy Hour 2 x $14,000",
            hh_deal_active: "On selected cocktails",
            hh_tag_active: "ACTIVE UNTIL 9:00 PM",
            hh_title_expired: "Happy Hour Ended",
            hh_deal_expired: "Every day HH 6:00 to 9:00 PM | Wednesdays 2x1 Fernet until 10:00 PM",
            hh_tag_expired: "UNTIL 9:00 PM",
            fernet_promo_badge_active: "🔥 2X1 (Wednesdays until 10:00 PM)",
            fernet_promo_badge_info: "🍹 2X1 Wednesdays only (until 10:00 PM)",
            fernet_banner_active_title: "2X1 on Fernet con Coca",
            fernet_banner_active_deal: "Wednesday promo active until 10:00 PM!",
            fernet_banner_active_tag: "ACTIVE UNTIL 10:00 PM",
        }
    };

    const categoryTranslations = {
        en: {
            "Pizza Grande": "Large Pizza",
            "Empanadas": "Empanadas",
            "Hamburguesas": "Burgers",
            "Acompañamientos": "Sides",
            "Tragos de Autor": "Signature Cocktails",
            "Clásicos": "Classic Cocktails",
            "Cerveza Tirada": "Draft Beer",
            "Sin Alcohol / Mocktails": "Non-Alcoholic / Mocktails",
            "Vinos": "Wines",
            "Sin Alcohol": "Soft Drinks"
        }
    };

    // ── Application State ──────────────────────────────────────────────────
    let activeFilter = 'all';
    let searchTerm = '';
    let currentLang = localStorage.getItem('jabali_lang') || 'es';
    let menuData = null;
    let splitPeopleCount = 1;

    // Cart state: { [itemName]: { name, priceStr, priceNum, qty } }
    let cart = {};
    try {
        const savedCart = localStorage.getItem('jabali_cart');
        if (savedCart) cart = JSON.parse(savedCart);
    } catch (e) {
        cart = {};
    }

    // ── Price Helpers ────────────────────────────────────────────────────────
    function parsePriceNum(priceStr) {
        if (!priceStr) return 0;
        const cleaned = priceStr.replace(/[^0-9]/g, '');
        return parseInt(cleaned, 10) || 0;
    }

    function formatPrice(num) {
        return '$' + num.toLocaleString('es-AR');
    }

    // ── Happy Hour & Promo Time Verification (GMT-3 Argentina) ─────────────────
    function isHappyHourActive() {
        try {
            const now = new Date();
            const options = { timeZone: 'America/Argentina/Buenos_Aires', hour12: false, hour: 'numeric', minute: 'numeric' };
            const parts = new Intl.DateTimeFormat('en-US', options).formatToParts(now);
            let hour = 0, minute = 0;
            parts.forEach(p => {
                if (p.type === 'hour') hour = parseInt(p.value, 10);
                if (p.type === 'minute') minute = parseInt(p.value, 10);
            });
            // Happy hour active until 21:00 hs (GMT-3)
            return hour < 21 || (hour === 21 && minute === 0);
        } catch (e) {
            const h = new Date().getHours();
            return h < 21;
        }
    }

    function isFernetPromoActive() {
        try {
            const now = new Date();
            const options = { timeZone: 'America/Argentina/Buenos_Aires', weekday: 'short', hour12: false, hour: 'numeric', minute: 'numeric' };
            const parts = new Intl.DateTimeFormat('en-US', options).formatToParts(now);
            let weekday = '', hour = 0, minute = 0;
            parts.forEach(p => {
                if (p.type === 'weekday') weekday = p.value;
                if (p.type === 'hour') hour = parseInt(p.value, 10);
                if (p.type === 'minute') minute = parseInt(p.value, 10);
            });
            // Wednesday is 'Wed' in en-US
            const isWednesday = weekday === 'Wed';
            const isBefore22 = hour < 22 || (hour === 22 && minute === 0);
            return isWednesday && isBefore22;
        } catch (e) {
            const d = new Date();
            return d.getDay() === 3 && (d.getHours() < 22 || (d.getHours() === 22 && d.getMinutes() === 0));
        }
    }

    function renderHappyHourBanner() {
        const bannerContainer = document.getElementById('happyHourBanner');
        if (!bannerContainer) return;

        const isActive = isHappyHourActive();
        const isFernetActive = isFernetPromoActive();
        const t = translations[currentLang];

        if (isFernetActive && !isActive) {
            bannerContainer.innerHTML = `
                <div class="hh-card active-hh fernet-banner">
                    <div class="hh-left">
                        <span class="hh-fire-icon">🍹</span>
                        <div class="hh-info">
                            <span class="hh-title">${t.fernet_banner_active_title}</span>
                            <span class="hh-deal">${t.fernet_banner_active_deal}</span>
                        </div>
                    </div>
                    <span class="hh-time-tag">${t.fernet_banner_active_tag}</span>
                </div>`;
        } else if (isActive) {
            const dealText = isFernetActive ? `${t.hh_deal_active} | 2X1 Fernet` : t.hh_deal_active;
            bannerContainer.innerHTML = `
                <div class="hh-card active-hh">
                    <div class="hh-left">
                        <span class="hh-fire-icon">🔥</span>
                        <div class="hh-info">
                            <span class="hh-title">${t.hh_title_active}</span>
                            <span class="hh-deal">${dealText}</span>
                        </div>
                    </div>
                    <span class="hh-time-tag">${t.hh_tag_active}</span>
                </div>`;
        } else {
            bannerContainer.innerHTML = `
                <div class="hh-card expired-hh">
                    <div class="hh-left">
                        <span class="hh-fire-icon">⏳</span>
                        <div class="hh-info">
                            <span class="hh-title">${t.hh_title_expired}</span>
                            <span class="hh-deal">${t.hh_deal_expired}</span>
                        </div>
                    </div>
                    <span class="hh-time-tag">${t.hh_tag_expired}</span>
                </div>`;
        }
    }

    // ── Language Toggle & UI Translation ────────────────────────────────────
    function applyLanguage(lang) {
        currentLang = lang;
        localStorage.setItem('jabali_lang', lang);
        document.documentElement.lang = lang;

        const langBtn = document.getElementById('langBtn');
        if (langBtn) {
            langBtn.querySelector('.lang-flag').textContent = lang === 'es' ? '🇦🇷' : '🇬🇧';
            langBtn.querySelector('.lang-text').textContent = lang === 'es' ? 'ES' : 'EN';
        }

        const t = translations[lang];
        document.querySelectorAll('[data-i18n]').forEach(elem => {
            const key = elem.dataset.i18n;
            if (t[key]) elem.textContent = t[key];
        });

        const searchInput = document.getElementById('searchInput');
        if (searchInput) searchInput.placeholder = t.search_placeholder;

        renderHappyHourBanner();

        if (menuData) {
            renderAllSections();
            applyFilters();
        }

        updateCartUI();
    }

    // ── Render Helpers ───────────────────────────────────────────────────────
    function renderItem(item, sectionId) {
        const tags = (item.tags || []).join(' ');
        const isBeer = !!item.beerCard;
        const isTragos = sectionId === 'tragos';
        const hhActive = isTragos && isHappyHourActive() && item.available !== false && item.price;
        const isFernet = isTragos && (item.wednesdayPromo || (item.name && item.name.toLowerCase().includes('fernet')));
        const fernetPromoActive = isFernet && isFernetPromoActive() && item.available !== false;

        let classes = 'menu-item';
        if (isBeer) classes += ' beer-card';
        if (item.available === false) classes += ' agotado';

        const mocktailGradients = {
            'Limonada': 'mocktail-limonada',
            'Pomelada': 'mocktail-pomelada',
            'Limonada Frutos Rojos': 'mocktail-limonada-roja',
            'Natural Mystic': 'mocktail-natural-mystic',
            'Aljaba': 'mocktail-aljaba'
        };
        if (mocktailGradients[item.name]) {
            classes += ' ' + mocktailGradients[item.name];
        }

        let styleAttr = isBeer ? ` style="background-image:url('${item.image}')"` : '';

        const hhBadgeHtml = hhActive ? `<span class="hh-badge">🔥 HH 2x$14k</span>` : '';
        
        let fernetBadgeHtml = '';
        if (isFernet) {
            const t = translations[currentLang];
            if (fernetPromoActive) {
                fernetBadgeHtml = `<span class="hh-badge fernet-promo-active">${t.fernet_promo_badge_active}</span>`;
            } else {
                fernetBadgeHtml = `<span class="fernet-promo-info">${t.fernet_promo_badge_info}</span>`;
            }
        }

        let inner = `
            <div class="item-header">
                <h3 class="item-name">
                    ${item.name}
                    ${item.available === false ? '<span class="agotado-badge">Agotado</span>' : ''}
                    ${hhBadgeHtml}
                    ${fernetBadgeHtml}
                </h3>
                ${item.price ? `<span class="item-price">${item.price}</span>` : ''}
            </div>`;

        if (item.isPlaceholder) {
            return `<div class="menu-item vinos-placeholder" data-tags="">
                        <p class="item-desc">Consultar en barra</p>
                    </div>`;
        }

        if (item.desc) {
            inner += `<p class="item-desc">${item.desc}</p>`;
        }

        // Diet badges
        const dietBadges = [];
        if (item.tags) {
            if (item.tags.includes('vegano') && !isTragos) dietBadges.push('<span class="diet-tag tag-vegano">🌱 Vegano</span>');
            if (item.tags.includes('sin-tacc') && !isBeer) dietBadges.push('<span class="diet-tag tag-sin-tacc">🌾 Sin TACC</span>');
            if (item.tags.includes('sin-alcohol')) dietBadges.push('<span class="diet-tag tag-sin-alcohol">🚫 Sin Alcohol</span>');
        }

        if (isBeer) {
            const abvBadge = item.abv ? `<span class="beer-badge">${item.abv} ABV</span>` : '';
            const styleBadge = item.style ? `<span class="beer-badge">${item.style}</span>` : '';
            inner += `<div class="beer-badges">${abvBadge}${styleBadge}</div>`;
        } else if (dietBadges.length > 0) {
            inner += `<div class="diet-tags-row">${dietBadges.join('')}</div>`;
        }

        // Cart Actions per item
        if (item.price && item.available !== false) {
            const currentQty = cart[item.name] ? cart[item.name].qty : 0;
            const btnLabel = translations[currentLang].cart_add;

            if (currentQty === 0) {
                inner += `
                <div class="item-cart-actions">
                    <button class="add-item-btn" data-item-name="${item.name}" data-item-price="${item.price}">
                        ${btnLabel}
                    </button>
                </div>`;
            } else {
                inner += `
                <div class="item-cart-actions">
                    <div class="qty-control-inline">
                        <button class="qty-btn cart-minus-btn" data-item-name="${item.name}">-</button>
                        <span class="qty-val">${currentQty}</span>
                        <button class="qty-btn cart-plus-btn" data-item-name="${item.name}">+</button>
                    </div>
                </div>`;
            }
        }

        return `<div class="${classes}"${styleAttr} data-tags="${tags}">${inner}</div>`;
    }

    function renderCategory(cat, index, sectionId) {
        const gridClass = cat.gridClass ? ` ${cat.gridClass}` : '';
        const descHtml = cat.desc ? `<p class="category-desc">${cat.desc}</p>` : '';

        let extrasHtml = '';
        if (cat.extras && cat.extras.length > 0) {
            extrasHtml = `<div class="item-extras">${cat.extras.map(e => `<p>${e}</p>`).join('')}</div>`;
        }

        const catTitle = (currentLang === 'en' && categoryTranslations.en[cat.title])
            ? categoryTranslations.en[cat.title]
            : cat.title;

        const itemsHtml = cat.items.map(item => renderItem(item, sectionId)).join('\n');

        return `
        <div class="menu-category" style="animation-delay:${(index + 1) * 0.1}s">
            <div class="category-header">
                <h2 class="category-title">${catTitle}</h2><span class="toggle-icon"></span>
            </div>
            ${descHtml}
            ${extrasHtml}
            <div class="items-grid${gridClass}">
                ${itemsHtml}
            </div>
        </div>`;
    }

    function renderSection(section) {
        const categoriesHtml = section.categories.map((cat, i) => renderCategory(cat, i, section.id)).join('\n');
        return `
        <section id="${section.id}" class="menu-section">
            ${categoriesHtml}
        </section>`;
    }

    function renderAllSections() {
        if (!menuData) return;
        const menuRoot = document.getElementById('menu-root');
        const activeSecId = document.body.getAttribute('data-active-section') || menuData.sections[0].id;

        menuRoot.innerHTML = menuData.sections.map(renderSection).join('\n');

        const activeSec = document.getElementById(activeSecId);
        if (activeSec) {
            activeSec.classList.add('active');
            document.body.setAttribute('data-active-section', activeSecId);
        }
    }

    // ── Filter logic ─────────────────────────────────────────────────────────
    function applyFilters() {
        const activeSection = document.querySelector('.menu-section.active');
        if (!activeSection) return;

        activeSection.querySelectorAll('.menu-category').forEach(category => {
            const items = category.querySelectorAll('.menu-item');
            let visibleCount = 0;

            items.forEach(item => {
                const name = item.querySelector('.item-name')?.textContent.toLowerCase() || '';
                const desc = item.querySelector('.item-desc')?.textContent.toLowerCase() || '';
                const tags = item.dataset.tags || '';

                const matchesSearch = searchTerm === '' || name.includes(searchTerm) || desc.includes(searchTerm);
                const matchesFilter = activeFilter === 'all' || tags.includes(activeFilter);

                const visible = matchesSearch && matchesFilter;
                item.classList.toggle('hidden', !visible);
                if (visible) visibleCount++;
            });

            if (visibleCount > 0 || (activeFilter === 'all' && searchTerm === '')) {
                category.style.display = '';
                if (searchTerm !== '') category.classList.remove('collapsed');
            } else {
                category.style.display = 'none';
            }
        });
    }

    // ── Cart & Bill Simulator Logic ──────────────────────────────────────────
    function saveCart() {
        localStorage.setItem('jabali_cart', JSON.stringify(cart));
    }

    function addToCart(name, priceStr) {
        if (!cart[name]) {
            cart[name] = {
                name: name,
                priceStr: priceStr,
                priceNum: parsePriceNum(priceStr),
                qty: 1
            };
        } else {
            cart[name].qty += 1;
        }
        saveCart();
        updateCartUI();
        renderAllSections();
        applyFilters();
    }

    function updateQty(name, delta) {
        if (cart[name]) {
            cart[name].qty += delta;
            if (cart[name].qty <= 0) {
                delete cart[name];
            }
        }
        saveCart();
        updateCartUI();
        renderAllSections();
        applyFilters();
    }

    function clearCart() {
        cart = {};
        saveCart();
        updateCartUI();
        renderAllSections();
        applyFilters();
    }

    function getCartTotal() {
        let total = 0;
        Object.values(cart).forEach(item => {
            total += item.priceNum * item.qty;
        });
        return total;
    }

    function getCartItemCount() {
        let count = 0;
        Object.values(cart).forEach(item => {
            count += item.qty;
        });
        return count;
    }

    function updateCartUI() {
        const total = getCartTotal();
        const count = getCartItemCount();

        // Update floating cart button
        const cartBadge = document.getElementById('cartBadge');
        const cartTotalHeader = document.getElementById('cartTotalHeader');
        if (cartBadge) cartBadge.textContent = count;
        if (cartTotalHeader) cartTotalHeader.textContent = formatPrice(total);

        // Update Modal Drawer Contents
        const itemsList = document.getElementById('cartItemsList');
        const totalPriceEl = document.getElementById('cartTotalPrice');
        const splitRow = document.getElementById('splitTotalRow');
        const perPersonPriceEl = document.getElementById('cartPerPersonPrice');

        if (totalPriceEl) totalPriceEl.textContent = formatPrice(total);

        if (itemsList) {
            const cartKeys = Object.keys(cart);
            if (cartKeys.length === 0) {
                itemsList.innerHTML = `<p class="cart-empty-msg">${translations[currentLang].cart_empty}</p>`;
            } else {
                itemsList.innerHTML = cartKeys.map(key => {
                    const item = cart[key];
                    const itemSubtotal = item.priceNum * item.qty;
                    return `
                    <div class="cart-item-row">
                        <span class="cart-item-name">${item.name}</span>
                        <div class="qty-control-inline">
                            <button class="qty-btn modal-minus-btn" data-item-name="${item.name}">-</button>
                            <span class="qty-val">${item.qty}</span>
                            <button class="qty-btn modal-plus-btn" data-item-name="${item.name}">+</button>
                        </div>
                        <span class="cart-item-subtotal">${formatPrice(itemSubtotal)}</span>
                    </div>`;
                }).join('\n');
            }
        }

        // Split account calculation
        if (splitPeopleCount > 1 && total > 0) {
            if (splitRow) splitRow.classList.remove('hidden');
            const perPerson = Math.ceil(total / splitPeopleCount);
            if (perPersonPriceEl) perPersonPriceEl.textContent = formatPrice(perPerson);
        } else {
            if (splitRow) splitRow.classList.add('hidden');
        }
    }

    // ── Load JSON and initialize ─────────────────────────────────────────────
    fetch('menu.json')
        .then(r => r.json())
        .then(data => {
            menuData = data;
            renderAllSections();
            applyLanguage(currentLang);

            // Active section setup
            const navBtns = document.querySelectorAll('.nav-btn');
            const firstNav = document.querySelector('.nav-btn.active') || navBtns[0];
            if (firstNav) {
                const targetId = firstNav.dataset.target;
                document.querySelectorAll('.menu-section').forEach(s => s.classList.remove('active'));
                const sec = document.getElementById(targetId);
                if (sec) sec.classList.add('active');
                document.body.setAttribute('data-active-section', targetId);
            }

            // Navigation handler
            navBtns.forEach(btn => {
                btn.addEventListener('click', () => {
                    navBtns.forEach(b => b.classList.remove('active'));
                    document.querySelectorAll('.menu-section').forEach(s => s.classList.remove('active'));

                    btn.classList.add('active');
                    const targetId = btn.dataset.target;
                    const targetSection = document.getElementById(targetId);
                    if (targetSection) targetSection.classList.add('active');

                    document.body.setAttribute('data-active-section', targetId);

                    // Reset filter if switching section to where active filter is not visible
                    if (targetId === 'tragos' && activeFilter === 'vegano') {
                        activeFilter = 'all';
                        document.querySelectorAll('.diet-btn').forEach(b => b.classList.remove('active'));
                        document.querySelector('.diet-btn[data-filter="all"]').classList.add('active');
                    }
                    if (targetId !== 'hamburgueseria' && activeFilter === 'sin-tacc') {
                        activeFilter = 'all';
                        document.querySelectorAll('.diet-btn').forEach(b => b.classList.remove('active'));
                        document.querySelector('.diet-btn[data-filter="all"]').classList.add('active');
                    }

                    if (targetSection) {
                        targetSection.querySelectorAll('.menu-category').forEach((cat, i) => {
                            cat.style.animationDelay = `${(i + 1) * 0.1}s`;
                            cat.style.animation = 'none';
                            void cat.offsetHeight;
                            cat.style.animation = null;
                        });
                    }

                    const searchInput = document.getElementById('searchInput');
                    if (searchInput) searchInput.value = '';
                    searchTerm = '';
                    toggleClearSearchBtn();
                    applyFilters();
                });
            });

            // Collapsible categories & cart item click Delegation
            const menuRoot = document.getElementById('menu-root');
            menuRoot.addEventListener('click', e => {
                const header = e.target.closest('.category-header');
                if (header && !e.target.closest('.add-item-btn') && !e.target.closest('.qty-btn')) {
                    header.closest('.menu-category').classList.toggle('collapsed');
                    return;
                }

                const addBtn = e.target.closest('.add-item-btn');
                if (addBtn) {
                    const name = addBtn.dataset.itemName;
                    const price = addBtn.dataset.itemPrice;
                    addToCart(name, price);
                    return;
                }

                const minusBtn = e.target.closest('.cart-minus-btn');
                if (minusBtn) {
                    updateQty(minusBtn.dataset.itemName, -1);
                    return;
                }

                const plusBtn = e.target.closest('.cart-plus-btn');
                if (plusBtn) {
                    updateQty(plusBtn.dataset.itemName, 1);
                    return;
                }
            });

            // Search Input logic
            const searchInput = document.getElementById('searchInput');
            const clearSearchBtn = document.getElementById('clearSearchBtn');

            function toggleClearSearchBtn() {
                if (clearSearchBtn) {
                    if (searchInput.value.trim().length > 0) {
                        clearSearchBtn.classList.remove('hidden');
                    } else {
                        clearSearchBtn.classList.add('hidden');
                    }
                }
            }

            if (searchInput) {
                searchInput.addEventListener('input', e => {
                    searchTerm = e.target.value.toLowerCase().trim();
                    toggleClearSearchBtn();
                    applyFilters();
                });
            }

            if (clearSearchBtn) {
                clearSearchBtn.addEventListener('click', () => {
                    searchInput.value = '';
                    searchTerm = '';
                    toggleClearSearchBtn();
                    applyFilters();
                    searchInput.focus();
                });
            }

            // Diet filters
            document.querySelectorAll('.diet-btn').forEach(btn => {
                btn.addEventListener('click', () => {
                    document.querySelectorAll('.diet-btn').forEach(b => b.classList.remove('active'));
                    btn.classList.add('active');
                    activeFilter = btn.dataset.filter;
                    applyFilters();
                });
            });
        })
        .catch(err => {
            document.getElementById('menu-root').innerHTML =
                `<p style="color:#a1a1aa;text-align:center;padding:3rem">Error cargando el menú. Intentá recargar la página.</p>`;
            console.error('Error loading menu.json:', err);
        });

    // ── Language Toggle Button Handler ──────────────────────────────────────
    const langBtn = document.getElementById('langBtn');
    if (langBtn) {
        langBtn.addEventListener('click', () => {
            const nextLang = currentLang === 'es' ? 'en' : 'es';
            applyLanguage(nextLang);
        });
    }

    // ── Wi-Fi Modal & Clipboard Handler ──────────────────────────────────────
    const wifiBtn = document.getElementById('wifiBtn');
    const wifiModal = document.getElementById('wifiModal');
    const closeWifiModal = document.getElementById('closeWifiModal');
    const copyWifiBtn = document.getElementById('copyWifiBtn');
    const copyWifiLabel = document.getElementById('copyWifiLabel');

    if (wifiBtn && wifiModal) {
        wifiBtn.addEventListener('click', () => {
            wifiModal.classList.remove('hidden');
        });
    }

    if (closeWifiModal && wifiModal) {
        closeWifiModal.addEventListener('click', () => {
            wifiModal.classList.add('hidden');
        });
    }

    if (wifiModal) {
        wifiModal.addEventListener('click', e => {
            if (e.target === wifiModal) wifiModal.classList.add('hidden');
        });
    }

    if (copyWifiBtn) {
        copyWifiBtn.addEventListener('click', () => {
            const pass = 'barandino';
            if (navigator.clipboard && navigator.clipboard.writeText) {
                navigator.clipboard.writeText(pass).then(showCopiedStatus).catch(fallbackCopy);
            } else {
                fallbackCopy();
            }

            function fallbackCopy() {
                const tempInput = document.createElement('input');
                tempInput.value = pass;
                document.body.appendChild(tempInput);
                tempInput.select();
                document.execCommand('copy');
                document.body.removeChild(tempInput);
                showCopiedStatus();
            }

            function showCopiedStatus() {
                copyWifiBtn.classList.add('copied');
                copyWifiLabel.textContent = translations[currentLang].wifi_copied;
                setTimeout(() => {
                    copyWifiBtn.classList.remove('copied');
                    copyWifiLabel.textContent = translations[currentLang].wifi_copy;
                }, 2500);
            }
        });
    }

    // ── Cart Modal & Split Account Calculator Handler ────────────────────────
    const floatingCartBtn = document.getElementById('floatingCartBtn');
    const cartModal = document.getElementById('cartModal');
    const closeCartModal = document.getElementById('closeCartModal');
    const closeCartActionBtn = document.getElementById('closeCartActionBtn');
    const clearCartBtn = document.getElementById('clearCartBtn');
    const cartItemsList = document.getElementById('cartItemsList');

    const splitMinusBtn = document.getElementById('splitMinusBtn');
    const splitPlusBtn = document.getElementById('splitPlusBtn');
    const splitPeopleInput = document.getElementById('splitPeopleInput');

    if (floatingCartBtn && cartModal) {
        floatingCartBtn.addEventListener('click', () => {
            updateCartUI();
            cartModal.classList.remove('hidden');
        });
    }

    const closeCart = () => cartModal && cartModal.classList.add('hidden');
    if (closeCartModal) closeCartModal.addEventListener('click', closeCart);
    if (closeCartActionBtn) closeCartActionBtn.addEventListener('click', closeCart);
    if (cartModal) {
        cartModal.addEventListener('click', e => {
            if (e.target === cartModal) closeCart();
        });
    }

    if (clearCartBtn) {
        clearCartBtn.addEventListener('click', () => {
            clearCart();
        });
    }

    // Cart Modal quantity controls delegation
    if (cartItemsList) {
        cartItemsList.addEventListener('click', e => {
            const minusBtn = e.target.closest('.modal-minus-btn');
            if (minusBtn) {
                updateQty(minusBtn.dataset.itemName, -1);
                return;
            }
            const plusBtn = e.target.closest('.modal-plus-btn');
            if (plusBtn) {
                updateQty(plusBtn.dataset.itemName, 1);
                return;
            }
        });
    }

    // Split account increment/decrement
    if (splitMinusBtn && splitPeopleInput) {
        splitMinusBtn.addEventListener('click', () => {
            if (splitPeopleCount > 1) {
                splitPeopleCount--;
                splitPeopleInput.value = splitPeopleCount;
                updateCartUI();
            }
        });
    }

    if (splitPlusBtn && splitPeopleInput) {
        splitPlusBtn.addEventListener('click', () => {
            if (splitPeopleCount < 20) {
                splitPeopleCount++;
                splitPeopleInput.value = splitPeopleCount;
                updateCartUI();
            }
        });
    }

    // ── Back to top button ─────────────────────────────────────────────────
    const backToTopBtn = document.getElementById('backToTopBtn');
    if (backToTopBtn) {
        window.addEventListener('scroll', () => {
            backToTopBtn.classList.toggle('show', window.scrollY > 300);
        });
        backToTopBtn.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }
});
