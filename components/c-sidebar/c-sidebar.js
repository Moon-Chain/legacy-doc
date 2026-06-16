/* ==========================================================================
   <c-sidebar>
   Component galerisinin sol gezinme menüsü. Sayfa listesi aşağıdaki
   NAV_GROUPS sabitinde tutulur — yeni bir component sayfası eklendiğinde
   buraya bir satır eklemek yeterlidir.

   Attribute'lar:
     active - aktif sayfanın id'si (örn. "callout"), o linki vurgular
     base   - sayfa linklerinin başına eklenecek yol (varsayılan: "./")
              index.html içinden kullanılırken base="pages/" verilmelidir
     home   - üstteki "Component Galerisi" linkinin hedefi (varsayılan: "../index.html")

   Mobilde, <c-navbar>'daki hamburger butonunun gönderdiği "c-sidebar-toggle"
   event'ini dinleyip kendini açar/kapatır (.c-sidebar--open).

   Kullanım: <c-sidebar active="callout"></c-sidebar>
   ========================================================================== */

const NAV_GROUPS = [
    {
        label: 'Layout',
        items: [
            { id: 'navbar', label: 'Navbar', file: 'navbar.html' },
            { id: 'sidebar', label: 'Sidebar', file: 'sidebar.html' },
            { id: 'breadcrumb', label: 'Breadcrumb', file: 'breadcrumb.html' },
            { id: 'theme-toggle', label: 'Theme Toggle', file: 'theme-toggle.html' },
        ],
    },
    {
        label: 'İçerik',
        items: [
            { id: 'callout', label: 'Callout', file: 'callout.html' },
            { id: 'code-block', label: 'Code Block', file: 'code-block.html' },
            { id: 'card', label: 'Card', file: 'card.html' },
            { id: 'badge', label: 'Badge', file: 'badge.html' },
            { id: 'alert', label: 'Alert', file: 'alert.html' },
            { id: 'prop-table', label: 'Prop Table', file: 'prop-table.html' },
            { id: 'comparison', label: 'Comparison', file: 'comparison.html' },
            { id: 'table', label: 'Table', file: 'table.html' },
            { id: 'method-signature', label: 'Method Signature', file: 'method-signature.html' },
            { id: 'timeline', label: 'Timeline', file: 'timeline.html' },
            { id: 'tooltip', label: 'Tooltip', file: 'tooltip.html' },
            { id: 'image-zoom', label: 'Image Zoom', file: 'image-zoom.html' },
        ],
    },
    {
        label: 'Etkileşimli',
        items: [
            { id: 'tabs', label: 'Tabs', file: 'tabs.html' },
            { id: 'accordion', label: 'Accordion', file: 'accordion.html' },
            { id: 'toc', label: 'İçindekiler (TOC)', file: 'toc.html' },
            { id: 'pagination-nav', label: 'Pagination Nav', file: 'pagination-nav.html' },
            { id: 'search-box', label: 'Search Box', file: 'search-box.html' },
            { id: 'blueprint', label: 'Blueprint', file: 'blueprint.html' },
            { id: 'heading-anchor', label: 'Heading Anchor', file: 'heading-anchor.html' },
        ],
    },
    {
        label: 'Yardımcı',
        items: [
            { id: 'feedback', label: 'Feedback', file: 'feedback.html' },
            { id: 'copy-button', label: 'Copy Button', file: 'copy-button.html' },
            { id: 'print-button', label: 'Print Button', file: 'print-button.html' },
        ],
    },
];

const STORAGE_KEY = 'c-sidebar-groups';

class CSidebar extends HTMLElement {
    connectedCallback() {
        const base   = this.getAttribute('base')   || './';
        const home   = this.getAttribute('home')   || '../index.html';
        const active = this.getAttribute('active') || '';

        /* Kayıtlı açık/kapalı durumu — varsayılan: hepsi açık */
        const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}');

        const groupsHtml = NAV_GROUPS.map(group => {
            const groupId    = group.label.toLowerCase().replace(/\s+/g, '-');
            const hasActive  = group.items.some(i => i.id === active);
            /* Aktif grubu her zaman açık başlat; diğerleri kayıtlı duruma bak, yoksa açık */
            const isOpen     = hasActive ? true : (saved[groupId] !== false);

            return `
            <li class="c-sidebar__group">
                <button class="c-sidebar__group-toggle"
                        aria-expanded="${isOpen}"
                        data-group="${groupId}">
                    <span class="c-sidebar__group-arrow"></span>
                    ${group.label}
                </button>
                <ul class="c-sidebar__list${isOpen ? '' : ' c-sidebar__list--collapsed'}">
                    <div>
                        ${group.items.map(item => `
                            <li>
                                <a href="${base}${item.file}"
                                   class="c-sidebar__link${item.id === active ? ' c-sidebar__link--active' : ''}">
                                    ${item.label}
                                </a>
                            </li>
                        `).join('')}
                    </div>
                </ul>
            </li>`;
        }).join('');

        this.innerHTML = `
            <nav class="c-sidebar">
                <div class="c-sidebar__body">
                    <a href="${home}" class="c-sidebar__home">Component Galerisi</a>
                    <ul class="c-sidebar__groups">${groupsHtml}</ul>
                </div>
                <div class="c-sidebar__footer">${window.PROJECT?.name ?? 'legacy-doc'} — v${window.PROJECT?.version ?? '?'}</div>
            </nav>
        `;

        /* Toggle tıklamaları */
        this.querySelectorAll('.c-sidebar__group-toggle').forEach(btn => {
            btn.addEventListener('click', () => {
                const open = btn.getAttribute('aria-expanded') === 'true';
                const list = btn.nextElementSibling;

                btn.setAttribute('aria-expanded', String(!open));
                list.classList.toggle('c-sidebar__list--collapsed', open);

                const state = JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}');
                state[btn.dataset.group] = !open;
                localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
            });
        });

        /* Aktif sayfadaki h2'leri okuyup sub-link üret */
        if (active) {
            this._buildSubLinks();
        }

        document.addEventListener('c-sidebar-toggle', () => {
            this.querySelector('.c-sidebar').classList.toggle('c-sidebar--open');
        });
    }

    _buildSubLinks() {
        const headings = Array.from(document.querySelectorAll('.page-inner h2'));
        if (!headings.length) return;

        /* Her h2'ye id ver (yoksa) */
        headings.forEach((h, i) => {
            if (!h.id) h.id = toSlug(h.textContent) || `section-${i}`;
        });

        /* Aktif linkin li'sini bul */
        const activeLink = this.querySelector('.c-sidebar__link--active');
        if (!activeLink) return;
        const activeLi = activeLink.parentElement;

        /* setActive burada tanımlanır — hem click hem spy kullanır */
        const setActive = id => {
            this.querySelectorAll('.c-sidebar__sublink').forEach(a => {
                a.classList.toggle('c-sidebar__sublink--active', a.dataset.target === id);
            });
        };

        /* Sub-link listesi */
        const sublist = document.createElement('ul');
        sublist.className = 'c-sidebar__sublist';

        headings.forEach(h => {
            const li = document.createElement('li');
            const a  = document.createElement('a');
            a.className  = 'c-sidebar__sublink';
            a.href       = '#';
            a.textContent = h.textContent.trim();
            a.dataset.target = h.id;

            a.addEventListener('click', e => {
                e.preventDefault();
                /* Tıklanan linki hemen aktif yap, spy'ı scroll bitene kadar dondur */
                setActive(h.id);
                this._spyFrozen = true;
                clearTimeout(this._spyTimer);
                this._spyTimer = setTimeout(() => { this._spyFrozen = false; }, 800);

                const top = h.getBoundingClientRect().top + window.scrollY - 80;
                window.scrollTo({ top, behavior: 'smooth' });

                h.classList.add('c-sidebar__heading-flash');
                setTimeout(() => h.classList.remove('c-sidebar__heading-flash'), 700);
            });

            li.appendChild(a);
            sublist.appendChild(li);
        });

        activeLi.appendChild(sublist);

        /* Sayfa açılışında ilk linki aktif yap */
        setActive(headings[0].id);

        /* Scroll-spy */
        this._spyHeadings(headings, setActive);
    }

    _spyHeadings(headings, setActive) {
        const update = () => {
            if (this._spyFrozen) return;
            /* Sayfa dibe yaklaşmışsa son başlık aktif (kısa section fix) */
            const scrollable = document.body.scrollHeight > window.innerHeight + 10;
            if (scrollable && window.innerHeight + window.scrollY >= document.body.scrollHeight - 24) {
                setActive(headings[headings.length - 1].id);
                return;
            }
            /* Viewport yüksekliğinin %40'ını geçen son başlık aktif */
            const threshold = window.innerHeight * 0.4;
            let current = headings[0];
            for (const h of headings) {
                if (h.getBoundingClientRect().top <= threshold) current = h;
            }
            setActive(current.id);
        };

        window.addEventListener('scroll', update, { passive: true });
    }
}

function toSlug(text) {
    return text.trim()
        .toLowerCase()
        .replace(/ğ/g,'g').replace(/ü/g,'u').replace(/ş/g,'s')
        .replace(/ı/g,'i').replace(/ö/g,'o').replace(/ç/g,'c')
        .replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,'');
}

customElements.define('c-sidebar', CSidebar);
