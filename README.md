# legacy-doc

Vanilla JS + Web Components ile hazırlanmış, sıfır bağımlılıklı dokümantasyon şablonu.

Sunucu gerekmez. Build gerekmez. `index.html`'e çift tıkla, çalışır.

---

## Mimari

Her sayfa kendi kendine yeten bir HTML dosyasıdır. `fetch`, `include` ya da bundler yoktur; sadece ihtiyaç duyduğun `<link>` ve `<script>` etiketlerini sayfana eklersin, gerisini Web Components halleder.

Bileşenler `class extends HTMLElement` ile tanımlanır, Shadow DOM kullanılmaz (light DOM). Tüm renkler `tokens.css` değişkenlerinden gelir; `data-theme="dark"` attribute'u değiştiğinde tema otomatik döner.

Bileşenler arası iletişim `CustomEvent` ile `document` üzerinden yapılır.

---

## Yapı

```
legacy-doc/
├── index.html                   # Bileşen galerisi
├── pages/                       # Her bileşen için demo sayfası
├── components/                  # <c-*> bileşenleri (.js + .css)
└── assets/
    ├── css/
    │   ├── tokens.css           # CSS değişkenleri (tema, renk, spacing)
    │   └── base.css             # Reset, tipografi, layout
    ├── js/app.js
    └── vendor/
        └── js/prism.min.js      # Syntax highlight (c-code-block)
```

---

## Bileşenler

| Bileşen | Açıklama |
|---|---|
| `c-navbar` | Üst çubuk — logo, başlık, tema, GitHub linki, mobil menü |
| `c-sidebar` | Sol gezinme menüsü |
| `c-breadcrumb` | Konum kırıntısı |
| `c-theme-toggle` | Açık / koyu tema anahtarı |
| `c-callout` | 7 varyantlı vurgu kutusu |
| `c-code-block` | Syntax highlight + kopyala |
| `c-card` | Header / body / footer slotlu kart |
| `c-badge` | HTTP metod ve durum rozetleri |
| `c-alert` | Kapatılabilir bildirim kutusu |
| `c-tabs` / `c-tab` | Sekmeli içerik |
| `c-accordion` / `c-accordion-item` | Açılır/kapanır panel |
| `c-toc` | Otomatik içindekiler + scroll-spy |
| `c-pagination-nav` | Önceki / sonraki sayfa linkleri |
| `c-search-box` | Client-side filtre arama kutusu |
| `c-blueprint` | Sürüklenebilir düğüm diyagramı — port-to-port bezier bağlantılar |

---

## Kullanım

### Sayfaya bileşen eklemek

```html
<!-- <head> -->
<link rel="stylesheet" href="../components/c-alert/c-alert.css">

<!-- <body> sonu -->
<script src="../components/c-alert/c-alert.js"></script>

<!-- içerik -->
<c-alert variant="success" dismissible>Kaydedildi.</c-alert>
```

İhtiyaç duymadığın bileşenin `<link>` ve `<script>` satırlarını sil. Diğer bileşenler etkilenmez.

### Yeni bileşen oluşturmak

1. `components/c-yeni/` klasörü aç, `c-yeni.css` ve `c-yeni.js` ekle.
2. `c-yeni.js`:
   ```js
   class CYeni extends HTMLElement {
       connectedCallback() { /* ... */ }
   }
   customElements.define('c-yeni', CYeni);
   ```
3. Renk/boyut için `tokens.css` değişkenlerini kullan, hardcode değer yazma.
4. Demo için `pages/yeni.html` oluştur (mevcut bir sayfayı şablon al).

### Sidebar'a sayfa kayıt etmek

`components/c-sidebar/c-sidebar.js` içindeki `NAV_GROUPS` sabitine satır ekle:

```js
{ id: 'yeni', label: 'Yeni Bileşen', file: 'yeni.html' }
```

Tüm sayfalardaki sidebar güncellenir; o sayfaya `<c-sidebar active="yeni" base="./">` yaz.

---

## Lisans

MIT
