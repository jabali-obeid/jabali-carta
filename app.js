document.addEventListener('DOMContentLoaded', () => {

    // ── Translations Dictionary ───────────────────────────────────────────────
    const translations = {
        es: {
            review_text: "¿La pasaste bien en Jabalí? Dejanos tu reseña",
            review_btn: "Dejar reseña",
            subtitle: "Elegí una de las tres barras",
            nav_pizzeria: "Pizzería",
            nav_hamburgueseria: "Hamburguesería",
            nav_tragos: "Tragos",
            search_placeholder: "Buscar en las 3 barras...",
            filter_all: "Todos",
            filter_vegan: "Vegano",
            filter_sintacc: "Sin TACC (No celíacos)",
            filter_noalcohol: "Sin Alcohol",
            cart_button: "Tu lista",
            cart_bar_cta: "Ver cálculo",
            cart_modal_title: "Tu lista · Calculadora",
            cart_split_label: "Dividir cuenta entre:",
            cart_people_text: "pers.",
            cart_total: "Total estimado:",
            cart_per_person: "Por persona:",
            cart_note: "Esta calculadora es orientativa. Hacé tu pedido en caja.",
            cart_clear: "Vaciar lista",
            cart_clear_confirm: "¿Confirmar vaciado?",
            cart_copy: "Copiar lista",
            cart_copied: "Lista copiada",
            cart_close: "Cerrar",
            cart_empty: "Todavía no sumaste productos a tu lista.",
            cart_add: "+ Sumar",
            extra_double: "Doble medallón (+$4.000)",
            extra_sintacc: "Pan sin TACC (+$4.000)",
            promo_hh_label: "Happy Hour 2×$14.000:",
            promo_fernet_label: "Miércoles 2×1 Fernet:",
            promo_combined_label: "Promos aplicadas:",
            wifi_title: "Wi-Fi del Local",
            wifi_subtitle: "Conectate gratis en Jabalí",
            wifi_network: "Red (SSID):",
            wifi_password: "Contraseña:",
            wifi_copy: "Copiar contraseña",
            wifi_copied: "Contraseña copiada",
            dev_tagline: "¿Querés una carta QR para tu negocio? Escribime.",
            hh_title_active: "Happy Hour Cerveza Tirada",
            hh_deal_active: "2 Pintas 500ml x $14.000 (18:00 a 21:00 hs)",
            hh_tag_active: "ACTIVO HASTA 21:00 HS",
            hh_title_expired: "Happy Hour Cerveza Tirada",
            hh_deal_expired: "Todos los días 18:00 a 21:00 hs · 2 Pintas x $14.000",
            hh_tag_expired: "DE 18:00 A 21:00 HS",
            fernet_promo_badge_active: "2x1 Miércoles hasta 22:00 hs",
            fernet_promo_badge_info: "2x1 sólo Miércoles (18 a 22 hs)",
            fernet_banner_active_title: "2x1 en Fernet con Coca",
            fernet_banner_active_deal: "Promo de Miércoles activa hasta las 22:00 hs",
            fernet_banner_active_tag: "ACTIVO HASTA 22:00 HS",
            fernet_banner_expired_title: "2x1 en Fernet con Coca",
            fernet_banner_expired_deal: "Todos los Miércoles de 18:00 a 22:00 hs",
            fernet_banner_expired_tag: "SÓLO MIÉRCOLES",
            empty_search_title: "No encontramos resultados",
            empty_search_desc: "Probá con otro nombre o limpiá la búsqueda para volver a la carta.",
            empty_filter_desc: "No hay productos con ese filtro en esta barra.",
            empty_reset_btn: "Limpiar filtros",
            search_bar_prefix: "Barra",
            error_load_title: "No pudimos cargar la carta",
            error_load_desc: "Revisá tu conexión e intentá nuevamente.",
            error_retry_btn: "Reintentar",
            aria_wifi: "Ver Wi-Fi del local",
            aria_lang: "Cambiar idioma (Español / English)",
            aria_nav_bars: "Barras de Jabalí",
            aria_nav_subcats: "Navegación por subcategorías",
            aria_search: "Buscar en las 3 barras",
            aria_clear_search: "Limpiar búsqueda",
            aria_back_to_top: "Volver arriba",
            aria_close: "Cerrar",
            aria_split_minus: "Restar una persona",
            aria_split_plus: "Sumar una persona",
            aria_add_item: "Sumar",
            aria_minus_item: "Quitar uno de",
            aria_plus_item: "Sumar uno más de",
            sr_added: "sumado a tu lista",
            sr_removed: "quitado de tu lista",
            sr_list_cleared: "Lista vaciada",
        },
        en: {
            review_text: "Enjoyed Jabalí? Leave us a review",
            review_btn: "Leave review",
            subtitle: "Choose one of our three bars",
            nav_pizzeria: "Pizzeria",
            nav_hamburgueseria: "Burger Bar",
            nav_tragos: "Cocktails & Drinks",
            search_placeholder: "Search across all 3 bars...",
            filter_all: "All",
            filter_vegan: "Vegan",
            filter_sintacc: "Gluten-Free (Not celiac-safe)",
            filter_noalcohol: "Non-Alcoholic",
            cart_button: "Your list",
            cart_bar_cta: "View bill",
            cart_modal_title: "Your List · Bill Calculator",
            cart_split_label: "Split bill between:",
            cart_people_text: "ppl.",
            cart_total: "Estimated total:",
            cart_per_person: "Per person:",
            cart_note: "This calculator is an estimate. Place your order at the counter.",
            cart_clear: "Clear list",
            cart_clear_confirm: "Confirm clear?",
            cart_copy: "Copy list",
            cart_copied: "List copied",
            cart_close: "Close",
            cart_empty: "You haven't added any items to your list yet.",
            cart_add: "+ Add",
            extra_double: "Double patty (+$4,000)",
            extra_sintacc: "GF bun (+$4,000)",
            promo_hh_label: "Happy Hour 2×$14,000:",
            promo_fernet_label: "Wednesday 2-for-1 Fernet:",
            promo_combined_label: "Promos applied:",
            wifi_title: "Venue Wi-Fi",
            wifi_subtitle: "Connect for free at Jabalí",
            wifi_network: "Network (SSID):",
            wifi_password: "Password:",
            wifi_copy: "Copy password",
            wifi_copied: "Password copied",
            dev_tagline: "Want a QR menu for your business? Get in touch.",
            hh_title_active: "Draft Beer Happy Hour",
            hh_deal_active: "2 Pints 500ml for $14,000 (6:00 to 9:00 PM)",
            hh_tag_active: "ACTIVE UNTIL 9:00 PM",
            hh_title_expired: "Draft Beer Happy Hour",
            hh_deal_expired: "Every day 6:00 to 9:00 PM · 2 Pints x $14,000",
            hh_tag_expired: "6:00 TO 9:00 PM",
            fernet_promo_badge_active: "2-for-1 Wed until 10:00 PM",
            fernet_promo_badge_info: "2-for-1 Wednesdays (6 to 10 PM)",
            fernet_banner_active_title: "2-for-1 Fernet & Coke",
            fernet_banner_active_deal: "Wednesday promo active until 10:00 PM",
            fernet_banner_active_tag: "ACTIVE UNTIL 10:00 PM",
            fernet_banner_expired_title: "2-for-1 Fernet & Coke",
            fernet_banner_expired_deal: "Every Wednesday from 6:00 to 10:00 PM",
            fernet_banner_expired_tag: "WEDNESDAYS ONLY",
            empty_search_title: "No results found",
            empty_search_desc: "Try another term or clear your search to see the full menu.",
            empty_filter_desc: "No items match this filter in this bar.",
            empty_reset_btn: "Clear filters",
            search_bar_prefix: "Bar",
            error_load_title: "Couldn't load the menu",
            error_load_desc: "Check your connection and try again.",
            error_retry_btn: "Try again",
            aria_wifi: "View venue Wi-Fi",
            aria_lang: "Switch language (Spanish / English)",
            aria_nav_bars: "Jabalí bars",
            aria_nav_subcats: "Subcategory navigation",
            aria_search: "Search across all 3 bars",
            aria_clear_search: "Clear search",
            aria_back_to_top: "Back to top",
            aria_close: "Close",
            aria_split_minus: "Decrease people count",
            aria_split_plus: "Increase people count",
            aria_add_item: "Add",
            aria_minus_item: "Remove one",
            aria_plus_item: "Add one more",
            sr_added: "added to your list",
            sr_removed: "removed from your list",
            sr_list_cleared: "List cleared",
        }
    };

    const categoryTranslations = {
        en: {
            "Pizza Grande": "Large Pizza",
            "Empanadas": "Empanadas",
            "Pizza por Porción": "Pizza by the Slice",
            "Postres": "Desserts",
            "Bebidas sin Alcohol": "Soft Drinks & Non-Alcoholic",
            "Bebidas con Alcohol": "Alcoholic Beverages",
            "🍺 Cervezas Tiradas": "🍺 Draft Beer",
            "Hamburguesas": "Burgers",
            "Sandwiches": "Sandwiches",
            "Panchos": "Hot Dogs",
            "Para Picar": "Appetizers / Finger Food",
            "Ensaladas": "Salads",
            "Tragos Directos": "Direct Drinks",
            "Tragos Elaborados": "Craft Cocktails",
            "Whiskies": "Whiskies",
            "Shots": "Shots",
            "Mocktails (Sin Alcohol)": "Mocktails (Non-Alcoholic)",
            "Vinos": "Wines",
            "Cafetería Clásica": "Classic Coffee",
            "Acompañamientos": "Sides",
            "Tragos de Autor": "Signature Cocktails",
            "Clásicos": "Classic Cocktails",
            "Cerveza Tirada": "Draft Beer",
            "Sin Alcohol / Mocktails": "Non-Alcoholic / Mocktails",
            "Sin Alcohol": "Soft Drinks"
        }
    };

    // ── Application State ──────────────────────────────────────────────────
    let activeFilter = 'all';
    let searchTerm = '';
    let currentLang = localStorage.getItem('jabali_lang') || 'es';
    let menuData = null;
    let menuItemMap = {};
    let splitPeopleCount = 1;

    function buildMenuItemMap(data) {
        menuItemMap = {};
        if (!data || !data.sections) return;
        let itemCounter = 0;
        data.sections.forEach(sec => {
            sec.categories.forEach(cat => {
                cat.items.forEach(item => {
                    if (item.name) {
                        itemCounter++;
                        if (!item.id) {
                            const slugName = item.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
                            item.id = `${sec.id}_${slugName}_${itemCounter}`;
                        }
                        item._sectionId = sec.id;
                        item._categoryTitle = cat.title;
                        item._isDraftBeer = (sec.id === 'pizzeria' || sec.id === 'hamburgueseria') && !!item.beerCard;
                        item._isFernetPromo = sec.id === 'tragos' && (!!item.wednesdayPromo || item.name.toLowerCase().includes('fernet'));
                        item._isBurger = sec.id === 'hamburgueseria' && cat.title === 'Hamburguesas';
                        menuItemMap[item.id] = item;
                    }
                });
            });
        });
    }

    // Cart state: { [itemId]: { id, name, name_en, priceStr, priceNum, qty } }
    let cart = {};
    try {
        const savedCart = localStorage.getItem('jabali_cart');
        if (savedCart) {
            const parsed = JSON.parse(savedCart);
            if (parsed && typeof parsed === 'object' && !Array.isArray(parsed)) {
                Object.keys(parsed).forEach(k => {
                    const it = parsed[k];
                    if (it && typeof it === 'object') {
                        if (typeof it.qty !== 'number' || it.qty <= 0) return;
                        if (typeof it.priceNum !== 'number' || isNaN(it.priceNum)) {
                            it.priceNum = parsePriceNum(it.priceStr || '');
                        }
                        cart[k] = it;
                    }
                });
            }
        }
    } catch (e) {
        cart = {};
    }

    // ── Price Helpers ────────────────────────────────────────────────────────
    function parsePriceNum(priceStr) {
        if (!priceStr) return 0;
        const cleaned = priceStr.replace(/[^0-9]/g, '');
        return parseInt(cleaned, 10) || 0;
    }

    function escapeAttr(str) {
        return String(str || '').replace(/"/g, '&quot;');
    }

    function announce(message) {
        const el = document.getElementById('srAnnouncer');
        if (!el || !message) return;
        el.textContent = '';
        requestAnimationFrame(() => {
            el.textContent = message;
        });
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
                if (p.type === 'hour') hour = parseInt(p.value, 10) % 24;
                if (p.type === 'minute') minute = parseInt(p.value, 10);
            });
            // Happy hour active from 18:00 to 21:00 hs (GMT-3)
            return (hour >= 18 && hour < 21) || (hour === 21 && minute === 0);
        } catch (e) {
            const d = new Date();
            const h = d.getHours();
            const m = d.getMinutes();
            return (h >= 18 && h < 21) || (h === 21 && m === 0);
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
                if (p.type === 'hour') hour = parseInt(p.value, 10) % 24;
                if (p.type === 'minute') minute = parseInt(p.value, 10);
            });
            // Wednesday is 'Wed' in en-US; active from 18:00 to 22:00 hs (GMT-3)
            const isWednesday = weekday === 'Wed';
            const isPromoHours = (hour >= 18 && hour < 22) || (hour === 22 && minute === 0);
            return isWednesday && isPromoHours;
        } catch (e) {
            const d = new Date();
            const h = d.getHours();
            const m = d.getMinutes();
            return d.getDay() === 3 && ((h >= 18 && h < 22) || (h === 22 && m === 0));
        }
    }

    function getCatId(sectionId, catTitle) {
        const slug = catTitle.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
        return `cat-${sectionId}-${slug}`;
    }

    const ICON_CLOCK = `<svg class="hh-svg-icon" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>`;
    const ICON_PROMO = `<svg class="hh-svg-icon" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z"></path></svg>`;
    const ICON_CHEVRON_RIGHT = `<svg class="hh-chevron" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polyline points="9 18 15 12 9 6"></polyline></svg>`;

    function renderHappyHourBanner() {
        const bannerContainer = document.getElementById('happyHourBanner');
        if (!bannerContainer) return;

        const activeSecId = document.body.getAttribute('data-active-section') || 'pizzeria';
        const isHappyHour = isHappyHourActive();
        const isFernetActive = isFernetPromoActive();
        const t = translations[currentLang];

        if (activeSecId === 'tragos') {
            if (isFernetActive) {
                bannerContainer.classList.remove('hidden');
                bannerContainer.innerHTML = `
                    <button type="button" class="hh-card active-hh fernet-banner">
                        <div class="hh-left">
                            <span class="hh-fire-icon">${ICON_PROMO}</span>
                            <div class="hh-info">
                                <span class="hh-title">${t.fernet_banner_active_title}</span>
                                <span class="hh-deal">${t.fernet_banner_active_deal}</span>
                            </div>
                        </div>
                        <span class="hh-right">
                            <span class="hh-time-tag">${t.fernet_banner_active_tag}</span>
                            ${ICON_CHEVRON_RIGHT}
                        </span>
                    </button>`;
            } else {
                bannerContainer.innerHTML = '';
                bannerContainer.classList.add('hidden');
            }
        } else {
            if (isHappyHour) {
                bannerContainer.classList.remove('hidden');
                bannerContainer.innerHTML = `
                    <button type="button" class="hh-card active-hh">
                        <div class="hh-left">
                            <span class="hh-fire-icon">${ICON_PROMO}</span>
                            <div class="hh-info">
                                <span class="hh-title">${t.hh_title_active}</span>
                                <span class="hh-deal">${t.hh_deal_active}</span>
                            </div>
                        </div>
                        <span class="hh-right">
                            <span class="hh-time-tag">${t.hh_tag_active}</span>
                            ${ICON_CHEVRON_RIGHT}
                        </span>
                    </button>`;
            } else {
                bannerContainer.innerHTML = '';
                bannerContainer.classList.add('hidden');
            }
        }
    }

    // ── Language Toggle & UI Translation ────────────────────────────────────
    function applyLanguage(lang) {
        currentLang = lang;
        localStorage.setItem('jabali_lang', lang);
        document.documentElement.lang = lang;

        const langBtn = document.getElementById('langBtn');
        if (langBtn) {
            langBtn.querySelectorAll('.lang-opt').forEach(opt => {
                opt.classList.toggle('active', opt.dataset.code === lang);
            });
            langBtn.dataset.lang = lang;
        }

        const t = translations[lang];
        document.querySelectorAll('[data-i18n]').forEach(elem => {
            const key = elem.dataset.i18n;
            if (t[key]) elem.textContent = t[key];
        });
        document.querySelectorAll('[data-i18n-aria]').forEach(elem => {
            const key = elem.dataset.i18nAria;
            if (t[key]) {
                elem.setAttribute('aria-label', t[key]);
                if (elem.hasAttribute('title')) elem.setAttribute('title', t[key]);
            }
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

    // ── Subcategory Floating Index & ScrollSpy ──────────────────────────────
    function enablePillsDragScroll() {
        const container = document.getElementById('subcategoryPills');
        if (!container || container.dataset.dragBound) return;
        container.dataset.dragBound = 'true';

        let isDown = false;
        let startX, scrollLeft;

        container.addEventListener('mousedown', (e) => {
            isDown = true;
            startX = e.pageX - container.offsetLeft;
            scrollLeft = container.scrollLeft;
        });
        container.addEventListener('mouseleave', () => { isDown = false; });
        container.addEventListener('mouseup', () => { isDown = false; });
        container.addEventListener('mousemove', (e) => {
            if (!isDown) return;
            e.preventDefault();
            const x = e.pageX - container.offsetLeft;
            const walk = (x - startX) * 1.5;
            container.scrollLeft = scrollLeft - walk;
        });
    }

    function renderSubcategoryNav(sectionId) {
        const pillsContainer = document.getElementById('subcategoryPills');
        if (!pillsContainer || !menuData) return;

        const activeSecId = sectionId || document.body.getAttribute('data-active-section') || 'pizzeria';
        const currentSection = menuData.sections.find(s => s.id === activeSecId);
        if (!currentSection || !currentSection.categories) {
            pillsContainer.innerHTML = '';
            return;
        }

        const pillsHtml = currentSection.categories.map((cat, idx) => {
            const catId = getCatId(activeSecId, cat.title);
            let rawTitle = (currentLang === 'en' && (cat.title_en || categoryTranslations.en[cat.title]))
                ? (cat.title_en || categoryTranslations.en[cat.title])
                : cat.title;

            // Clean leading emojis from rawTitle
            const cleanTitle = rawTitle.replace(/^[\p{Emoji_Presentation}\p{Extended_Pictographic}\s]+/gu, '').trim();
            const tLower = cleanTitle.toLowerCase();

            const isBeerCat = tLower.includes('cerveza') || tLower.includes('draft beer');
            const extraClass = isBeerCat ? ' sub-pill-highlight' : '';
            const isFirst = idx === 0 ? ' active' : '';

            return `<button class="sub-pill${isFirst}${extraClass}" data-cat-id="${catId}">
                <span class="pill-text">${cleanTitle}</span>
            </button>`;
        }).join('\n');

        pillsContainer.innerHTML = pillsHtml;

        pillsContainer.querySelectorAll('.sub-pill').forEach(pill => {
            pill.addEventListener('click', () => {
                const catId = pill.dataset.catId;
                const targetElem = document.getElementById(catId);
                if (!targetElem) return;

                targetElem.classList.remove('collapsed');
                const hdrBtn = targetElem.querySelector('.category-header');
                if (hdrBtn) hdrBtn.setAttribute('aria-expanded', 'true');

                const headerOffset = 118;
                const elementPosition = targetElem.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });

                pillsContainer.querySelectorAll('.sub-pill').forEach(p => p.classList.remove('active'));
                pill.classList.add('active');
                pill.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
            });
        });

        enablePillsDragScroll();
    }

    // Happy Hour Banner Click Shortcut to Cervezas Tiradas / Fernet (scoped to active section)
    const hhBannerContainer = document.getElementById('happyHourBanner');
    if (hhBannerContainer) {
        hhBannerContainer.addEventListener('click', () => {
            const activeSecId = document.body.getAttribute('data-active-section') || 'pizzeria';
            const targetCat = activeSecId === 'tragos'
                ? document.getElementById('cat-tragos-tragos-directos')
                : document.querySelector(`#${activeSecId} .menu-category[id*="cervezas-tiradas"]`);

            if (targetCat) {
                targetCat.classList.remove('collapsed');
                const hdrBtn = targetCat.querySelector('.category-header');
                if (hdrBtn) hdrBtn.setAttribute('aria-expanded', 'true');
                const offsetPosition = targetCat.getBoundingClientRect().top + window.pageYOffset - 118;
                window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
            }
        });
    }

    let scrollSpySetup = false;
    function setupSubcategoryScrollSpy() {
        if (scrollSpySetup) return;
        scrollSpySetup = true;

        let isScrollingTimeout;
        window.addEventListener('scroll', () => {
            window.clearTimeout(isScrollingTimeout);
            isScrollingTimeout = setTimeout(() => {
                const activeSecId = document.body.getAttribute('data-active-section');
                if (!activeSecId) return;

                const activeSectionElem = document.getElementById(activeSecId);
                if (!activeSectionElem) return;

                const categories = Array.from(activeSectionElem.querySelectorAll('.menu-category'));
                const pillsContainer = document.getElementById('subcategoryPills');
                if (!pillsContainer || categories.length === 0) return;

                const headerOffset = 150;
                let currentCatId = null;

                for (let i = 0; i < categories.length; i++) {
                    const rect = categories[i].getBoundingClientRect();
                    if (rect.top <= headerOffset && rect.bottom > headerOffset) {
                        currentCatId = categories[i].id;
                        break;
                    }
                }

                if (!currentCatId && categories.length > 0) {
                    const firstRect = categories[0].getBoundingClientRect();
                    if (firstRect.top > headerOffset) {
                        currentCatId = categories[0].id;
                    } else {
                        const lastRect = categories[categories.length - 1].getBoundingClientRect();
                        if (lastRect.bottom <= window.innerHeight) {
                            currentCatId = categories[categories.length - 1].id;
                        }
                    }
                }

                if (currentCatId) {
                    const pills = pillsContainer.querySelectorAll('.sub-pill');
                    pills.forEach(p => {
                        if (p.dataset.catId === currentCatId) {
                            if (!p.classList.contains('active')) {
                                pills.forEach(other => other.classList.remove('active'));
                                p.classList.add('active');
                                p.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
                            }
                        }
                    });
                }
            }, 60);
        }, { passive: true });
    }

    // ── Render Helpers ───────────────────────────────────────────────────────
    function renderItem(item, sectionId) {
        const tags = (item.tags || []).join(' ');
        const isBeer = !!item.beerCard;
        const isTragos = sectionId === 'tragos';
        const isBeerSection = sectionId === 'pizzeria' || sectionId === 'hamburgueseria';

        const hhActive = isBeerSection && isBeer && isHappyHourActive() && item.available !== false && item.price;
        const isFernet = isTragos && (item.wednesdayPromo || (item.name && item.name.toLowerCase().includes('fernet')));
        const fernetPromoActive = isFernet && isFernetPromoActive() && item.available !== false;

        let classes = 'menu-item';
        if (isBeer) classes += ' beer-card';
        if (item.available === false) classes += ' agotado';

        let styleAttr = isBeer ? ` style="background-image:url('${item.image}')"` : '';

        const hhBadgeHtml = hhActive ? `<span class="hh-badge">HH 2x$14k</span>` : '';

        let fernetBadgeHtml = '';
        if (isFernet) {
            const t = translations[currentLang];
            if (fernetPromoActive) {
                fernetBadgeHtml = `<span class="hh-badge fernet-promo-active">${t.fernet_promo_badge_active}</span>`;
            } else {
                fernetBadgeHtml = `<span class="fernet-promo-info">${t.fernet_promo_badge_info}</span>`;
            }
        }

        const displayName = (currentLang === 'en' && item.name_en) ? item.name_en : item.name;
        const displayDesc = (currentLang === 'en' && item.desc_en) ? item.desc_en : item.desc;
        const soldOutBadge = currentLang === 'en' ? 'Sold Out' : 'Agotado';
        const consultText = currentLang === 'en' ? 'Ask at the bar' : 'Consultar en barra';

        let inner = `
            <div class="item-header">
                <h3 class="item-name">
                    ${displayName}
                    ${item.available === false ? `<span class="agotado-badge">${soldOutBadge}</span>` : ''}
                </h3>
                ${item.price ? `<span class="item-price">${item.price}</span>` : ''}
            </div>`;

        if (item.isPlaceholder) {
            return `<div class="menu-item vinos-placeholder" data-tags="">
                        <p class="item-desc">${consultText}</p>
                    </div>`;
        }

        if (displayDesc) {
            inner += `<p class="item-desc">${displayDesc}</p>`;
        }

        // Diet & Promo badges (omit redundant "Sin Alcohol" tag inside "Bebidas sin Alcohol" / "Mocktails (Sin Alcohol)")
        const dietBadges = [];
        const isNonAlcCategory = (item._categoryTitle || '').toLowerCase().includes('sin alcohol');
        if (item.tags) {
            if (item.tags.includes('vegano') && !isTragos) {
                dietBadges.push(`<span class="diet-tag tag-vegano">${currentLang === 'en' ? 'Vegan' : 'Vegano'}</span>`);
            }
            if (item.tags.includes('sin-tacc') && !isBeer) {
                const isBurger = !!item._isBurger;
                const sinTaccLabel = isBurger
                    ? (currentLang === 'en' ? 'GF Option (+$4,000 · Not celiac-safe)' : 'Opción Sin TACC (+$4.000 · No celíacos)')
                    : (currentLang === 'en' ? 'Gluten-Free (Not celiac-safe)' : 'Sin TACC (No celíacos)');
                dietBadges.push(`<span class="diet-tag tag-sin-tacc">${sinTaccLabel}</span>`);
            }
            if (item.tags.includes('sin-alcohol') && !isNonAlcCategory) {
                dietBadges.push(`<span class="diet-tag tag-sin-alcohol">${currentLang === 'en' ? 'Non-Alcoholic' : 'Sin Alcohol'}</span>`);
            }
        }

        const isCompact = !displayDesc && !isBeer && dietBadges.length === 0 && !hhBadgeHtml && !fernetBadgeHtml;
        if (isCompact) classes += ' menu-item-compact';

        if (isBeer) {
            const abvBadge = item.abv ? `<span class="beer-badge">${item.abv} ABV</span>` : '';
            const styleBadge = item.style ? `<span class="beer-badge">${item.style}</span>` : '';
            inner += `<div class="beer-badges">${abvBadge}${styleBadge}${hhBadgeHtml}${fernetBadgeHtml}</div>`;
        } else if (hhBadgeHtml || fernetBadgeHtml || dietBadges.length > 0) {
            inner += `<div class="diet-tags-row">${dietBadges.join('')}${hhBadgeHtml}${fernetBadgeHtml}</div>`;
        }

        // Cart Actions per item
        if (item.price && item.available !== false) {
            const currentQty = (cart[item.id] && cart[item.id].qty) ? cart[item.id].qty : 0;
            const t = translations[currentLang];
            const btnLabel = t.cart_add;
            const safeName = escapeAttr(displayName);

            let actionsHtml = '';
            if (currentQty === 0) {
                actionsHtml = `
                    <button type="button" class="add-item-btn" data-item-id="${item.id}" aria-label="${escapeAttr(t.aria_add_item + ' ' + displayName)}">
                        ${btnLabel}
                    </button>`;
            } else {
                actionsHtml = `
                    <div class="qty-control-inline">
                        <button type="button" class="qty-btn cart-minus-btn" data-item-id="${item.id}" aria-label="${escapeAttr(t.aria_minus_item + ' ' + displayName)}">-</button>
                        <span class="qty-val">${currentQty}</span>
                        <button type="button" class="qty-btn cart-plus-btn" data-item-id="${item.id}" aria-label="${escapeAttr(t.aria_plus_item + ' ' + displayName)}">+</button>
                    </div>`;
            }

            inner += `
                <div class="item-cart-actions" data-item-id="${item.id}">
                    ${actionsHtml}
                </div>`;
        }

        return `<div class="${classes}"${styleAttr} data-tags="${tags}">${inner}</div>`;
    }

    function renderCategory(cat, index, sectionId) {
        const gridClass = cat.gridClass ? ` ${cat.gridClass}` : '';
        const rawDesc = (currentLang === 'en' && cat.desc_en) ? cat.desc_en : cat.desc;
        const descHtml = rawDesc ? `<p class="category-desc">${rawDesc}</p>` : '';

        const rawExtras = (currentLang === 'en' && cat.extras_en) ? cat.extras_en : cat.extras;
        let extrasHtml = '';
        if (rawExtras && rawExtras.length > 0) {
            extrasHtml = `<div class="item-extras">${rawExtras.map(e => `<p>${e}</p>`).join('')}</div>`;
        }

        const rawCatTitle = (currentLang === 'en' && (cat.title_en || categoryTranslations.en[cat.title]))
            ? (cat.title_en || categoryTranslations.en[cat.title])
            : cat.title;
        const catTitle = rawCatTitle.replace(/^[\p{Emoji_Presentation}\p{Extended_Pictographic}\s]+/gu, '').trim();

        const itemsHtml = cat.items.map(item => renderItem(item, sectionId)).join('\n');
        const catId = getCatId(sectionId, cat.title);
        const allSoldOut = cat.items.length > 0 && cat.items.every(item => item.available === false);
        const soldOutLabel = currentLang === 'en' ? 'Sold Out' : 'Agotado';
        const collapsedClass = allSoldOut ? ' collapsed' : '';

        return `
        <div id="${catId}" class="menu-category${collapsedClass}">
            <h2 class="category-heading">
                <button type="button" class="category-header" aria-expanded="${!allSoldOut}" aria-controls="${catId}-grid">
                    <span class="category-title-wrap">
                        <span class="category-title">${catTitle}</span>
                        ${allSoldOut ? `<span class="agotado-badge">${soldOutLabel}</span>` : ''}
                    </span>
                    <span class="toggle-icon" aria-hidden="true"></span>
                </button>
            </h2>
            ${descHtml}
            ${extrasHtml}
            <div id="${catId}-grid" class="items-grid${gridClass}">
                ${itemsHtml}
            </div>
        </div>`;
    }

    function renderSection(section) {
        const categoriesHtml = section.categories.map((cat, i) => renderCategory(cat, i, section.id)).join('\n');
        const t = translations[currentLang];
        const navKey = `nav_${section.id}`;
        const sectionLabel = t[navKey] || section.label || section.id;
        return `
        <section id="${section.id}" class="menu-section">
            <div class="search-section-label">${t.search_bar_prefix} · ${sectionLabel}</div>
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

        renderSubcategoryNav(activeSecId);
        renderHappyHourBanner();
        setupSubcategoryScrollSpy();
    }

    // ── Filter & Global Search Logic ─────────────────────────────────────────
    function normalizeText(str) {
        return (str || '').toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
    }

    function removeEmptyState() {
        const existing = document.getElementById('menuEmptyState');
        if (existing) existing.remove();
    }

    function renderEmptyState(isSearch) {
        removeEmptyState();
        const menuRoot = document.getElementById('menu-root');
        if (!menuRoot) return;
        const t = translations[currentLang];
        const desc = isSearch ? t.empty_search_desc : t.empty_filter_desc;

        const box = document.createElement('div');
        box.id = 'menuEmptyState';
        box.className = 'empty-state-box';
        box.setAttribute('role', 'status');
        box.innerHTML = `
            <p class="empty-state-title">${t.empty_search_title}</p>
            <p class="empty-state-desc">${desc}</p>
            <button type="button" class="empty-state-reset-btn" id="emptyStateResetBtn">${t.empty_reset_btn}</button>
        `;
        menuRoot.appendChild(box);

        const resetBtn = document.getElementById('emptyStateResetBtn');
        if (resetBtn) {
            resetBtn.addEventListener('click', () => {
                const searchInput = document.getElementById('searchInput');
                if (searchInput) searchInput.value = '';
                searchTerm = '';
                activeFilter = 'all';
                document.querySelectorAll('.diet-btn').forEach(b => b.classList.remove('active'));
                const allBtn = document.querySelector('.diet-btn[data-filter="all"]');
                if (allBtn) allBtn.classList.add('active');
                const clearBtn = document.getElementById('clearSearchBtn');
                if (clearBtn) clearBtn.classList.add('hidden');
                applyFilters();
                if (searchInput && isSearch) searchInput.focus();
            });
        }
    }

    function applyFilters() {
        const allSections = Array.from(document.querySelectorAll('.menu-section'));
        if (allSections.length === 0) return;

        const normalizedQuery = normalizeText(searchTerm);
        const isGlobalSearch = normalizedQuery !== '';
        const subNav = document.getElementById('subcategoryNav');
        if (subNav) subNav.classList.toggle('hidden', isGlobalSearch);

        let totalVisibleItems = 0;

        allSections.forEach(section => {
            const isActiveSection = section.classList.contains('active');
            const shouldEvaluate = isGlobalSearch || isActiveSection;

            if (!shouldEvaluate) {
                section.classList.remove('search-visible');
                return;
            }

            let sectionVisibleItems = 0;

            section.querySelectorAll('.menu-category').forEach(category => {
                const catTitle = normalizeText(category.querySelector('.category-title')?.textContent);
                const catDesc = normalizeText(category.querySelector('.category-desc')?.textContent);
                const catMatchesSearch = isGlobalSearch && (catTitle.includes(normalizedQuery) || catDesc.includes(normalizedQuery));

                const items = category.querySelectorAll('.menu-item');
                let visibleCount = 0;

                items.forEach(item => {
                    const name = normalizeText(item.querySelector('.item-name')?.textContent);
                    const desc = normalizeText(item.querySelector('.item-desc')?.textContent);
                    const tags = item.dataset.tags || '';

                    const matchesSearch = !isGlobalSearch || catMatchesSearch || name.includes(normalizedQuery) || desc.includes(normalizedQuery);
                    const matchesFilter = activeFilter === 'all' || tags.includes(activeFilter);

                    const visible = matchesSearch && matchesFilter;
                    item.classList.toggle('hidden', !visible);
                    if (visible) visibleCount++;
                });

                if (visibleCount > 0 || (activeFilter === 'all' && !isGlobalSearch)) {
                    category.style.display = '';
                    if (isGlobalSearch) category.classList.remove('collapsed');
                } else {
                    category.style.display = 'none';
                }

                sectionVisibleItems += visibleCount;
            });

            if (isGlobalSearch) {
                section.classList.toggle('search-visible', sectionVisibleItems > 0);
            } else {
                section.classList.remove('search-visible');
            }

            totalVisibleItems += sectionVisibleItems;
        });

        if (totalVisibleItems === 0 && (isGlobalSearch || activeFilter !== 'all')) {
            renderEmptyState(isGlobalSearch);
        } else {
            removeEmptyState();
        }
    }

    // ── Cart & Bill Simulator Logic ──────────────────────────────────────────
    function saveCart() {
        localStorage.setItem('jabali_cart', JSON.stringify(cart));
    }

    function updateItemCardUI(itemId) {
        const containers = document.querySelectorAll(`.item-cart-actions[data-item-id="${itemId}"]`);
        const t = translations[currentLang];
        const meta = menuItemMap[itemId];
        const displayName = meta ? ((currentLang === 'en' && meta.name_en) ? meta.name_en : meta.name) : '';

        containers.forEach(container => {
            const currentQty = (cart[itemId] && cart[itemId].qty) ? cart[itemId].qty : 0;
            const btnLabel = t.cart_add;

            if (currentQty === 0) {
                container.innerHTML = `
                    <button type="button" class="add-item-btn" data-item-id="${itemId}" aria-label="${escapeAttr(t.aria_add_item + ' ' + displayName)}">
                        ${btnLabel}
                    </button>`;
            } else {
                container.innerHTML = `
                    <div class="qty-control-inline">
                        <button type="button" class="qty-btn cart-minus-btn" data-item-id="${itemId}" aria-label="${escapeAttr(t.aria_minus_item + ' ' + displayName)}">-</button>
                        <span class="qty-val">${currentQty}</span>
                        <button type="button" class="qty-btn cart-plus-btn" data-item-id="${itemId}" aria-label="${escapeAttr(t.aria_plus_item + ' ' + displayName)}">+</button>
                    </div>`;
            }
        });
    }

    function updateAllItemCardsUI() {
        document.querySelectorAll('.item-cart-actions[data-item-id]').forEach(container => {
            const itemId = container.dataset.itemId;
            updateItemCardUI(itemId);
        });
    }

    function addToCart(itemIdOrName) {
        if (!itemIdOrName) return;
        let itemData = menuItemMap[itemIdOrName];
        if (!itemData) {
            itemData = Object.values(menuItemMap).find(i => i.name === itemIdOrName);
        }
        if (!itemData) return;

        const itemId = itemData.id || itemIdOrName;

        if (!cart[itemId]) {
            cart[itemId] = {
                id: itemId,
                name: itemData.name,
                name_en: itemData.name_en || itemData.name,
                priceStr: itemData.price,
                priceNum: parsePriceNum(itemData.price),
                sectionId: itemData._sectionId,
                qty: 1
            };
        } else {
            cart[itemId].qty += 1;
        }
        saveCart();
        updateCartUI();
        updateItemCardUI(itemId);
        const t = translations[currentLang];
        const labelName = (currentLang === 'en' && itemData.name_en) ? itemData.name_en : itemData.name;
        announce(`${labelName} ${t.sr_added}. ${t.cart_total} ${formatPrice(getCartSummary().total)}`);
    }

    function updateQty(itemIdOrName, delta) {
        if (!itemIdOrName) return;
        let itemId = itemIdOrName;
        if (!cart[itemId]) {
            const foundKey = Object.keys(cart).find(k => k === itemIdOrName || (cart[k] && cart[k].name === itemIdOrName));
            if (foundKey) itemId = foundKey;
        }

        const itemBefore = cart[itemId];
        if (itemBefore) {
            itemBefore.qty += delta;
            if (itemBefore.qty <= 0) {
                delete cart[itemId];
            }
        }
        saveCart();
        updateCartUI();
        updateItemCardUI(itemId);
        if (itemBefore) {
            const t = translations[currentLang];
            const labelName = (currentLang === 'en' && itemBefore.name_en) ? itemBefore.name_en : itemBefore.name;
            announce(`${labelName} ${delta > 0 ? t.sr_added : t.sr_removed}. ${t.cart_total} ${formatPrice(getCartSummary().total)}`);
        }
    }

    function clearCart() {
        cart = {};
        saveCart();
        updateCartUI();
        updateAllItemCardsUI();
        announce(translations[currentLang].sr_list_cleared);
    }

    const EXTRA_DOUBLE_PRICE = 4000;
    const EXTRA_SINTACC_PRICE = 4000;

    function toggleBurgerExtra(itemId, extraKey) {
        if (!cart[itemId]) return;
        if (!cart[itemId].extras) cart[itemId].extras = {};
        cart[itemId].extras[extraKey] = !cart[itemId].extras[extraKey];
        saveCart();
        updateCartUI();
    }

    function getCartSummary() {
        let subtotal = 0;
        let draftBeerQty = 0;
        let fernetQty = 0;
        let fernetUnitPrice = 0;

        Object.keys(cart).forEach(key => {
            const item = cart[key];
            if (!item || typeof item !== 'object') return;
            const qty = parseInt(item.qty, 10) || 0;
            if (qty <= 0) return;

            const priceNum = (typeof item.priceNum === 'number' && !isNaN(item.priceNum))
                ? item.priceNum
                : parsePriceNum(item.priceStr || '');
            let unitExtras = 0;
            if (item.extras) {
                if (item.extras.doublePatty) unitExtras += EXTRA_DOUBLE_PRICE;
                if (item.extras.sinTaccBun) unitExtras += EXTRA_SINTACC_PRICE;
            }
            subtotal += (priceNum + unitExtras) * qty;

            const meta = menuItemMap[key];
            if (meta && meta._isDraftBeer) {
                draftBeerQty += qty;
            }
            if (meta && meta._isFernetPromo) {
                fernetQty += qty;
                fernetUnitPrice = priceNum;
            }
        });

        let hhDiscount = 0;
        if (isHappyHourActive() && draftBeerQty >= 2) {
            // 2 pints ($18.000) -> $14.000 => $4.000 off per pair
            hhDiscount = Math.floor(draftBeerQty / 2) * 4000;
        }

        let fernetDiscount = 0;
        if (isFernetPromoActive() && fernetQty >= 2 && fernetUnitPrice > 0) {
            fernetDiscount = Math.floor(fernetQty / 2) * fernetUnitPrice;
        }

        const promoDiscount = hhDiscount + fernetDiscount;
        const total = Math.max(0, subtotal - promoDiscount);
        return { subtotal, hhDiscount, fernetDiscount, promoDiscount, total };
    }

    function getCartItemCount() {
        let count = 0;
        Object.values(cart).forEach(item => {
            if (item && typeof item === 'object') {
                count += parseInt(item.qty, 10) || 0;
            }
        });
        return count;
    }

    function updateCartUI() {
        const summary = getCartSummary();
        const total = summary.total;
        const count = getCartItemCount();
        const t = translations[currentLang];

        // Show full-width bottom list bar ONLY when count > 0
        const listBar = document.getElementById('listSummaryBar');
        if (listBar) {
            listBar.classList.toggle('hidden', count === 0);
        }
        document.body.classList.toggle('has-list-bar', count > 0);

        const cartBadge = document.getElementById('cartBadge');
        const cartTotalHeader = document.getElementById('cartTotalHeader');
        if (cartBadge) cartBadge.textContent = count;
        if (cartTotalHeader) cartTotalHeader.textContent = formatPrice(total);

        // Update Modal Drawer Contents
        const itemsList = document.getElementById('cartItemsList');
        const totalPriceEl = document.getElementById('cartTotalPrice');
        const splitRow = document.getElementById('splitTotalRow');
        const perPersonPriceEl = document.getElementById('cartPerPersonPrice');
        const promoRow = document.getElementById('promoDiscountRow');
        const promoLabel = document.getElementById('promoDiscountLabel');
        const promoAmount = document.getElementById('promoDiscountAmount');

        if (totalPriceEl) totalPriceEl.textContent = formatPrice(total);

        if (promoRow && promoLabel && promoAmount) {
            if (summary.promoDiscount > 0) {
                promoRow.classList.remove('hidden');
                if (summary.hhDiscount > 0 && summary.fernetDiscount > 0) {
                    promoLabel.textContent = t.promo_combined_label;
                } else if (summary.hhDiscount > 0) {
                    promoLabel.textContent = t.promo_hh_label;
                } else {
                    promoLabel.textContent = t.promo_fernet_label;
                }
                promoAmount.textContent = '-' + formatPrice(summary.promoDiscount);
            } else {
                promoRow.classList.add('hidden');
            }
        }

        if (itemsList) {
            const cartKeys = Object.keys(cart).filter(k => cart[k] && typeof cart[k] === 'object' && (parseInt(cart[k].qty, 10) || 0) > 0);
            if (cartKeys.length === 0) {
                itemsList.innerHTML = `<p class="cart-empty-msg">${t.cart_empty}</p>`;
            } else {
                const barOrder = ['pizzeria', 'hamburgueseria', 'tragos', 'other'];
                const grouped = { pizzeria: [], hamburgueseria: [], tragos: [], other: [] };
                cartKeys.forEach(key => {
                    const meta = menuItemMap[key];
                    const secId = (meta && meta._sectionId) || (cart[key] && cart[key].sectionId) || 'other';
                    (grouped[secId] || grouped.other).push(key);
                });

                itemsList.innerHTML = barOrder
                    .filter(secId => grouped[secId].length > 0)
                    .map(secId => {
                        const barLabel = secId === 'other' ? '' : (t[`nav_${secId}`] || secId);
                        const rowsHtml = grouped[secId].map(key => {
                            const item = cart[key];
                            const qty = parseInt(item.qty, 10) || 0;
                            const priceNum = (typeof item.priceNum === 'number' && !isNaN(item.priceNum))
                                ? item.priceNum
                                : parsePriceNum(item.priceStr || '');
                            const extras = item.extras || {};
                            const unitExtras = (extras.doublePatty ? EXTRA_DOUBLE_PRICE : 0) + (extras.sinTaccBun ? EXTRA_SINTACC_PRICE : 0);
                            const itemSubtotal = (priceNum + unitExtras) * qty;
                            const itemData = menuItemMap[key];
                            const displayName = (currentLang === 'en' && itemData && itemData.name_en)
                                ? itemData.name_en
                                : (itemData ? itemData.name : (item.name || key));

                            const burgerExtrasHtml = (itemData && itemData._isBurger) ? `
                                <div class="cart-extras-row">
                                    <button type="button" class="cart-extra-chip${extras.doublePatty ? ' active' : ''}" data-item-id="${key}" data-extra="doublePatty" aria-pressed="${!!extras.doublePatty}">
                                        ${extras.doublePatty ? '✓ ' : '+ '}${t.extra_double}
                                    </button>
                                    <button type="button" class="cart-extra-chip${extras.sinTaccBun ? ' active' : ''}" data-item-id="${key}" data-extra="sinTaccBun" aria-pressed="${!!extras.sinTaccBun}">
                                        ${extras.sinTaccBun ? '✓ ' : '+ '}${t.extra_sintacc}
                                    </button>
                                </div>` : '';

                            return `
                            <div class="cart-item-block">
                                <div class="cart-item-row">
                                    <span class="cart-item-name">${displayName}</span>
                                <div class="qty-control-inline">
                                    <button type="button" class="qty-btn modal-minus-btn" data-item-id="${key}" aria-label="${escapeAttr(t.aria_minus_item + ' ' + displayName)}">-</button>
                                    <span class="qty-val">${qty}</span>
                                    <button type="button" class="qty-btn modal-plus-btn" data-item-id="${key}" aria-label="${escapeAttr(t.aria_plus_item + ' ' + displayName)}">+</button>
                                </div>
                                    <span class="cart-item-subtotal">${formatPrice(itemSubtotal)}</span>
                                </div>
                                ${burgerExtrasHtml}
                            </div>`;
                        }).join('\n');

                        return `
                        <div class="cart-bar-group">
                            ${barLabel ? `<div class="cart-bar-group-header">${barLabel}</div>` : ''}
                            ${rowsHtml}
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
    let coreListenersBound = false;

    function bindCoreMenuListeners() {
        if (coreListenersBound) return;
        coreListenersBound = true;

        const navBtns = document.querySelectorAll('.nav-btn');
        const searchInput = document.getElementById('searchInput');
        const clearSearchBtn = document.getElementById('clearSearchBtn');

        function toggleClearSearchBtn() {
            if (clearSearchBtn && searchInput) {
                clearSearchBtn.classList.toggle('hidden', searchInput.value.trim().length === 0);
            }
        }

        // Navigation handler
        navBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                navBtns.forEach(b => {
                    b.classList.remove('active');
                    b.setAttribute('aria-pressed', 'false');
                });
                document.querySelectorAll('.menu-section').forEach(s => {
                    s.classList.remove('active');
                    s.classList.remove('search-visible');
                });

                btn.classList.add('active');
                btn.setAttribute('aria-pressed', 'true');
                const targetId = btn.dataset.target;
                const targetSection = document.getElementById(targetId);
                if (targetSection) targetSection.classList.add('active');

                document.body.setAttribute('data-active-section', targetId);
                renderHappyHourBanner();
                renderSubcategoryNav(targetId);

                const pillsContainer = document.getElementById('subcategoryPills');
                if (pillsContainer) pillsContainer.scrollLeft = 0;

                // Reset filter if switching section to where active filter is not visible
                if (targetId === 'tragos' && (activeFilter === 'vegano' || activeFilter === 'sin-tacc')) {
                    activeFilter = 'all';
                    document.querySelectorAll('.diet-btn').forEach(b => {
                        b.classList.remove('active');
                        b.setAttribute('aria-pressed', 'false');
                    });
                    const allBtn = document.querySelector('.diet-btn[data-filter="all"]');
                    if (allBtn) {
                        allBtn.classList.add('active');
                        allBtn.setAttribute('aria-pressed', 'true');
                    }
                }

                if (searchInput) searchInput.value = '';
                searchTerm = '';
                toggleClearSearchBtn();
                applyFilters();

                // Reset scroll so user lands at the top of the newly selected bar
                const navEl = document.querySelector('.sticky-nav-shell');
                if (navEl && window.scrollY > navEl.offsetTop) {
                    window.scrollTo({ top: Math.max(0, navEl.offsetTop), behavior: 'smooth' });
                }
            });
        });

        // Global Cart item & Collapsible categories click Delegation
        document.addEventListener('click', e => {
            const addBtn = e.target.closest('.add-item-btn');
            if (addBtn) {
                const id = addBtn.dataset.itemId || addBtn.dataset.itemName;
                addToCart(id);
                return;
            }

            const minusBtn = e.target.closest('.cart-minus-btn');
            if (minusBtn) {
                const id = minusBtn.dataset.itemId || minusBtn.dataset.itemName;
                updateQty(id, -1);
                return;
            }

            const plusBtn = e.target.closest('.cart-plus-btn');
            if (plusBtn) {
                const id = plusBtn.dataset.itemId || plusBtn.dataset.itemName;
                updateQty(id, 1);
                return;
            }

            const header = e.target.closest('.category-header');
            if (header) {
                const catEl = header.closest('.menu-category');
                const isCollapsed = catEl.classList.toggle('collapsed');
                header.setAttribute('aria-expanded', String(!isCollapsed));
                return;
            }
        });

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
                document.querySelectorAll('.diet-btn').forEach(b => {
                    b.classList.remove('active');
                    b.setAttribute('aria-pressed', 'false');
                });
                btn.classList.add('active');
                btn.setAttribute('aria-pressed', 'true');
                activeFilter = btn.dataset.filter;
                applyFilters();
            });
        });
    }

    function reconcileCartWithMenu() {
        let changed = false;
        Object.keys(cart).forEach(key => {
            const entry = cart[key];
            const liveItem = menuItemMap[key];
            if (!entry || !liveItem || liveItem.available === false || !liveItem.price) {
                delete cart[key];
                changed = true;
                return;
            }
            const livePriceNum = parsePriceNum(liveItem.price);
            if (
                entry.priceNum !== livePriceNum ||
                entry.priceStr !== liveItem.price ||
                entry.name !== liveItem.name ||
                entry.name_en !== (liveItem.name_en || liveItem.name) ||
                entry.sectionId !== liveItem._sectionId
            ) {
                entry.priceNum = livePriceNum;
                entry.priceStr = liveItem.price;
                entry.name = liveItem.name;
                entry.name_en = liveItem.name_en || liveItem.name;
                entry.sectionId = liveItem._sectionId;
                changed = true;
            }
        });
        if (changed) saveCart();
    }

    function loadMenu() {
        fetch('menu.json')
            .then(r => {
                if (!r.ok) throw new Error(`HTTP ${r.status}`);
                return r.json();
            })
            .then(data => {
                menuData = data;
                buildMenuItemMap(data);
                reconcileCartWithMenu();
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

                bindCoreMenuListeners();
            })
            .catch(err => {
                const t = translations[currentLang];
                const menuRoot = document.getElementById('menu-root');
                if (menuRoot) {
                    menuRoot.innerHTML = `
                        <div class="empty-state-box" role="alert">
                            <p class="empty-state-title">${t.error_load_title}</p>
                            <p class="empty-state-desc">${t.error_load_desc}</p>
                            <button type="button" class="empty-state-reset-btn" id="retryMenuLoadBtn">${t.error_retry_btn}</button>
                        </div>`;
                    const retryBtn = document.getElementById('retryMenuLoadBtn');
                    if (retryBtn) retryBtn.addEventListener('click', loadMenu);
                }
                console.error('Error loading menu.json:', err);
            });
    }

    loadMenu();

    // ── Language Toggle Button Handler ──────────────────────────────────────
    const langBtn = document.getElementById('langBtn');
    if (langBtn) {
        langBtn.addEventListener('click', () => {
            const nextLang = currentLang === 'es' ? 'en' : 'es';
            applyLanguage(nextLang);
        });
    }

    // ── Accessible Modal Manager (Focus Trap, Escape, Focus Restore) ─────────
    let activeModal = null;
    let lastModalTrigger = null;

    function getFocusableElements(container) {
        return Array.from(container.querySelectorAll(
            'button:not([disabled]):not(.hidden), [href], input:not([disabled]):not([type="hidden"]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'
        )).filter(el => el.offsetParent !== null);
    }

    function openModal(modalEl, triggerEl) {
        if (!modalEl) return;
        lastModalTrigger = triggerEl || document.activeElement;
        activeModal = modalEl;
        modalEl.classList.remove('hidden');
        const focusables = getFocusableElements(modalEl);
        if (focusables.length > 0) {
            focusables[0].focus();
        }
    }

    function closeModal(modalEl) {
        if (!modalEl) return;
        modalEl.classList.add('hidden');
        if (activeModal === modalEl) {
            activeModal = null;
        }
        if (lastModalTrigger && typeof lastModalTrigger.focus === 'function') {
            lastModalTrigger.focus();
            lastModalTrigger = null;
        }
    }

    document.addEventListener('keydown', e => {
        if (!activeModal) return;

        if (e.key === 'Escape') {
            e.preventDefault();
            if (activeModal.id === 'cartModal') {
                closeCart();
            } else {
                closeModal(activeModal);
            }
            return;
        }

        if (e.key === 'Tab') {
            const focusables = getFocusableElements(activeModal);
            if (focusables.length === 0) return;
            const first = focusables[0];
            const last = focusables[focusables.length - 1];
            if (e.shiftKey && document.activeElement === first) {
                e.preventDefault();
                last.focus();
            } else if (!e.shiftKey && document.activeElement === last) {
                e.preventDefault();
                first.focus();
            }
        }
    });

    // ── Wi-Fi Modal & Clipboard Handler ──────────────────────────────────────
    const wifiBtn = document.getElementById('wifiBtn');
    const wifiModal = document.getElementById('wifiModal');
    const closeWifiModal = document.getElementById('closeWifiModal');
    const copyWifiBtn = document.getElementById('copyWifiBtn');
    const copyWifiLabel = document.getElementById('copyWifiLabel');

    if (wifiBtn && wifiModal) {
        wifiBtn.addEventListener('click', () => {
            openModal(wifiModal, wifiBtn);
        });
    }

    if (closeWifiModal && wifiModal) {
        closeWifiModal.addEventListener('click', () => {
            closeModal(wifiModal);
        });
    }

    if (wifiModal) {
        wifiModal.addEventListener('click', e => {
            if (e.target === wifiModal) closeModal(wifiModal);
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
            openModal(cartModal, floatingCartBtn);
        });
    }

    const closeCart = () => {
        closeModal(cartModal);
        resetClearCartConfirm();
    };
    if (closeCartModal) closeCartModal.addEventListener('click', closeCart);
    if (closeCartActionBtn) closeCartActionBtn.addEventListener('click', closeCart);
    if (cartModal) {
        cartModal.addEventListener('click', e => {
            if (e.target === cartModal) closeCart();
        });
    }

    let clearConfirmTimer = null;
    function resetClearCartConfirm() {
        if (!clearCartBtn) return;
        clearCartBtn.dataset.confirming = 'false';
        clearCartBtn.classList.remove('confirming');
        clearCartBtn.textContent = translations[currentLang].cart_clear;
        if (clearConfirmTimer) {
            clearTimeout(clearConfirmTimer);
            clearConfirmTimer = null;
        }
    }

    if (clearCartBtn) {
        clearCartBtn.addEventListener('click', () => {
            if (Object.keys(cart).length === 0) return;
            if (clearCartBtn.dataset.confirming === 'true') {
                clearCart();
                resetClearCartConfirm();
            } else {
                clearCartBtn.dataset.confirming = 'true';
                clearCartBtn.classList.add('confirming');
                clearCartBtn.textContent = translations[currentLang].cart_clear_confirm;
                clearConfirmTimer = setTimeout(resetClearCartConfirm, 3000);
            }
        });
    }

    // Copy grouped list to clipboard
    const copyListBtn = document.getElementById('copyListBtn');
    const copyListLabel = document.getElementById('copyListLabel');

    function formatCartForClipboard() {
        const t = translations[currentLang];
        const summary = getCartSummary();
        const barOrder = ['pizzeria', 'hamburgueseria', 'tragos', 'other'];
        const grouped = { pizzeria: [], hamburgueseria: [], tragos: [], other: [] };

        Object.keys(cart).forEach(key => {
            const item = cart[key];
            if (!item || (parseInt(item.qty, 10) || 0) <= 0) return;
            const meta = menuItemMap[key];
            const secId = (meta && meta._sectionId) || item.sectionId || 'other';
            (grouped[secId] || grouped.other).push(key);
        });

        const lines = [currentLang === 'en' ? 'Jabalí · Our order list' : 'Jabalí · Nuestra lista'];
        barOrder.forEach(secId => {
            if (grouped[secId].length === 0) return;
            const barLabel = secId === 'other' ? '' : (t[`nav_${secId}`] || secId);
            if (barLabel) lines.push(`\n— ${barLabel} —`);
            grouped[secId].forEach(key => {
                const item = cart[key];
                const meta = menuItemMap[key];
                const name = (currentLang === 'en' && meta && meta.name_en) ? meta.name_en : (meta ? meta.name : item.name);
                const extras = item.extras || {};
                const extraParts = [];
                if (extras.doublePatty) extraParts.push(currentLang === 'en' ? 'double patty' : 'doble medallón');
                if (extras.sinTaccBun) extraParts.push(currentLang === 'en' ? 'GF bun' : 'pan sin TACC');
                const extraSuffix = extraParts.length ? ` (${extraParts.join(', ')})` : '';
                const unitExtras = (extras.doublePatty ? EXTRA_DOUBLE_PRICE : 0) + (extras.sinTaccBun ? EXTRA_SINTACC_PRICE : 0);
                const subtotal = (item.priceNum + unitExtras) * item.qty;
                lines.push(`• ${item.qty}x ${name}${extraSuffix} — ${formatPrice(subtotal)}`);
            });
        });

        if (summary.promoDiscount > 0) {
            lines.push(`\n${t.promo_combined_label} -${formatPrice(summary.promoDiscount)}`);
        }
        lines.push(`${t.cart_total} ${formatPrice(summary.total)}`);
        if (splitPeopleCount > 1 && summary.total > 0) {
            lines.push(`${t.cart_per_person} ${formatPrice(Math.ceil(summary.total / splitPeopleCount))} (${splitPeopleCount} ${t.cart_people_text})`);
        }
        return lines.join('\n');
    }

    if (copyListBtn) {
        copyListBtn.addEventListener('click', () => {
            if (getCartItemCount() === 0) return;
            const text = formatCartForClipboard();
            const showCopied = () => {
                copyListBtn.classList.add('copied');
                if (copyListLabel) copyListLabel.textContent = translations[currentLang].cart_copied;
                setTimeout(() => {
                    copyListBtn.classList.remove('copied');
                    if (copyListLabel) copyListLabel.textContent = translations[currentLang].cart_copy;
                }, 2500);
            };

            if (navigator.clipboard && navigator.clipboard.writeText) {
                navigator.clipboard.writeText(text).then(showCopied).catch(() => {
                    const ta = document.createElement('textarea');
                    ta.value = text;
                    document.body.appendChild(ta);
                    ta.select();
                    document.execCommand('copy');
                    document.body.removeChild(ta);
                    showCopied();
                });
            }
        });
    }

    // Cart Modal quantity & burger extras controls delegation
    if (cartItemsList) {
        cartItemsList.addEventListener('click', e => {
            const extraChip = e.target.closest('.cart-extra-chip');
            if (extraChip) {
                toggleBurgerExtra(extraChip.dataset.itemId, extraChip.dataset.extra);
                return;
            }
            const minusBtn = e.target.closest('.modal-minus-btn');
            if (minusBtn) {
                updateQty(minusBtn.dataset.itemId, -1);
                return;
            }
            const plusBtn = e.target.closest('.modal-plus-btn');
            if (plusBtn) {
                updateQty(plusBtn.dataset.itemId, 1);
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
