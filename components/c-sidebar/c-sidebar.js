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
        ],
    },
];

class CSidebar extends HTMLElement {
    connectedCallback() {
        const base = this.getAttribute('base') || './';
        const home = this.getAttribute('home') || '../index.html';
        const active = this.getAttribute('active') || '';

        const groupsHtml = NAV_GROUPS.map(group => `
            <li class="c-sidebar__group">
                <div class="c-sidebar__group-label">${group.label}</div>
                <ul class="c-sidebar__list">
                    ${group.items.map(item => `
                        <li>
                            <a href="${base}${item.file}" class="c-sidebar__link${item.id === active ? ' c-sidebar__link--active' : ''}">${item.label}</a>
                        </li>
                    `).join('')}
                </ul>
            </li>
        `).join('');

        this.innerHTML = `
            <nav class="c-sidebar">
                <a href="${home}" class="c-sidebar__home">Component Galerisi</a>
                <ul class="c-sidebar__groups">${groupsHtml}</ul>
            </nav>
        `;

        document.addEventListener('c-sidebar-toggle', () => {
            this.querySelector('.c-sidebar').classList.toggle('c-sidebar--open');
        });
    }
}

customElements.define('c-sidebar', CSidebar);
