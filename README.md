Efsane Dokümantasyon
Ultra Basit, Ultra Hızlı, Vanilla JS + Modüler Mimari

# Component Galerisi — Template

Vanilla CSS + Web Components (Custom Elements) ile hazırlanmış, **fetch/include kullanmayan**,
her sayfası tek başına `file://` ile açılabilen bileşen dokümantasyon şablonu.

## Çalıştırma

Herhangi bir sunucuya ihtiyaç yoktur. `index.html` veya `pages/*.html` dosyalarına çift tıklayıp
doğrudan tarayıcıda açabilirsin.

## Klasör yapısı

```
template/
├── index.html              # Bileşen galerisi (ana sayfa)
├── pages/                   # Her bileşen için ayrı demo sayfası
│   ├── navbar.html
│   ├── sidebar.html
│   ├── breadcrumb.html
│   ├── theme-toggle.html
│   ├── callout.html
│   ├── code-block.html
│   ├── card.html
│   ├── badge.html
│   ├── alert.html
│   ├── tabs.html
│   ├── accordion.html
│   ├── toc.html
│   ├── pagination-nav.html
│   └── search-box.html
├── components/              # Her bileşenin kendi .js + .css dosyası
│   ├── c-navbar/
│   ├── c-sidebar/
│   ├── c-breadcrumb/
│   ├── c-theme-toggle/
│   ├── c-callout/
│   ├── c-code-block/
│   ├── c-card/
│   ├── c-badge/
│   ├── c-alert/
│   ├── c-tabs/
│   ├── c-accordion/
│   ├── c-toc/
│   ├── c-pagination-nav/
│   └── c-search-box/
└── assets/
    ├── css/
    │   ├── tokens.css       # Renk/boyut değişkenleri (açık + koyu tema)
    │   └── base.css         # Reset, tipografi, .page / .page-inner / .c-grid düzenleri
    ├── js/
    │   └── app.js           # Genel amaçlı yardımcı kod (şu an boş)
    └── vendor/
        ├── css/prism-vscode_dark.min.css
        └── js/prism.min.js  # c-code-block için syntax highlighting
```

## Mimari ilkeler

- **Her sayfa bağımsızdır.** Hiçbir HTML parçası `fetch`/`include` ile çekilmez. Her `pages/*.html`
  dosyası kendi `<head>` ve `<body>` içinde sadece ihtiyaç duyduğu bileşenlerin `.css`/`.js`
  dosyalarını referans alır.
- **Bileşenler `class extends HTMLElement` ile tanımlanır** ve `customElements.define('c-xxx', ...)`
  ile kayıt edilir. Shadow DOM kullanılmaz (light DOM) — böylece `tokens.css`/`base.css` tüm
  bileşenlere otomatik uygulanır.
- **Tema:** Tüm renkler `tokens.css`'teki CSS değişkenlerinden gelir. `<html data-theme="dark">`
  ayarlandığında bu değişkenler değişir; `c-theme-toggle` bunu yönetir ve `localStorage`'a kaydeder.
- **Bileşenler arası iletişim** `document` üzerinde `CustomEvent` ile yapılır (örn. `c-navbar`
  hamburger butonuna tıklayınca `c-sidebar-toggle` event'i gönderir, `c-sidebar` bunu dinler).
- **İç içe bileşenler** (örn. `c-card` içinde `c-code-block`) `innerHTML` string'i ile değil,
  `Node.append(...Array.from(node.childNodes))` ile taşınır. Bu, zaten "upgrade" olmuş
  custom element'lerin durumunu/event listener'larını korur.

## Yeni bir sayfaya bileşen eklemek

1. Sayfanın `<head>`'ine bileşenin `.css` dosyasını ekle:
   ```html
   <link rel="stylesheet" href="../components/c-alert/c-alert.css">
   ```
2. Sayfanın `<body>` sonuna bileşenin `.js` dosyasını ekle:
   ```html
   <script src="../components/c-alert/c-alert.js"></script>
   ```
3. İçeriğe etiketi yerleştir:
   ```html
   <c-alert variant="success" dismissible>Kaydedildi!</c-alert>
   ```

Bir bileşene ihtiyacın yoksa, sadece o `<link>`/`<script>` satırlarını silmen yeterlidir —
diğer bileşenler bundan etkilenmez.

## Yeni bir bileşen oluşturmak

1. `components/c-yeni-bilesen/` klasörü oluştur, içine `c-yeni-bilesen.css` ve `c-yeni-bilesen.js` ekle.
2. `c-yeni-bilesen.js` içinde:
   ```js
   class CYeniBilesen extends HTMLElement {
       connectedCallback() {
           // this.innerHTML yerine, çocuk node'ları taşımak istiyorsan
           // Array.from(this.childNodes) + append kullan.
       }
   }
   customElements.define('c-yeni-bilesen', CYeniBilesen);
   ```
3. Renk/boyut için `tokens.css`'teki değişkenleri kullan, hardcode değer yazma — böylece
   koyu tema otomatik çalışır.
4. Demo sayfası için `pages/yeni-bilesen.html` oluştur (mevcut sayfalardan birini şablon al).

## Yeni bir demo sayfası eklemek (sidebar'a kayıt)

Sol menüdeki bağlantı listesi `components/c-sidebar/c-sidebar.js` içindeki `NAV_GROUPS`
sabitinde tutulur. Yeni sayfanı uygun gruba ekle:

```js
{ id: 'yeni-bilesen', label: 'Yeni Bileşen', file: 'yeni-bilesen.html' }
```

Bu satırı eklediğinde, **tüm sayfalardaki** sidebar otomatik güncellenir (her sayfa aynı
`c-sidebar.js` dosyasını kullanır). Yeni sayfanda `<c-sidebar active="yeni-bilesen" base="./">`
yazarak ilgili linki vurgulat.

## Bileşen listesi

| Bileşen | Açıklama | Demo |
|---|---|---|
| `c-navbar` | Logo, başlık, tema anahtarı, GitHub linki, mobil menü butonu | [pages/navbar.html](pages/navbar.html) |
| `c-sidebar` | Sayfalar arası gezinme menüsü | [pages/sidebar.html](pages/sidebar.html) |
| `c-breadcrumb` | Sayfa konumu "kırıntı" navigasyonu | [pages/breadcrumb.html](pages/breadcrumb.html) |
| `c-theme-toggle` | Açık/koyu tema anahtarı | [pages/theme-toggle.html](pages/theme-toggle.html) |
| `c-callout` | 7 varyantlı dikkat çekme kutusu | [pages/callout.html](pages/callout.html) |
| `c-code-block` | Syntax highlight + kopyala butonu | [pages/code-block.html](pages/code-block.html) |
| `c-card` | Header/body/footer slotlu kart | [pages/card.html](pages/card.html) |
| `c-badge` | HTTP metod ve durum rozetleri | [pages/badge.html](pages/badge.html) |
| `c-alert` | Kapatılabilir bildirim kutusu | [pages/alert.html](pages/alert.html) |
| `c-tabs` / `c-tab` | Sekmeli içerik | [pages/tabs.html](pages/tabs.html) |
| `c-accordion` / `c-accordion-item` | Açılır/kapanır panel listesi | [pages/accordion.html](pages/accordion.html) |
| `c-toc` | Otomatik içindekiler + scroll-spy | [pages/toc.html](pages/toc.html) |
| `c-pagination-nav` | Önceki/sonraki sayfa linkleri | [pages/pagination-nav.html](pages/pagination-nav.html) |
| `c-search-box` | Client-side filtre arama kutusu | [pages/search-box.html](pages/search-box.html) |
