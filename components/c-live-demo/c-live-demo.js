/* ==========================================================================
   <c-live-demo>
   Sol: düzenlenebilir kod alanı (textarea), Sağ: canlı iframe önizleme.
   400ms debounce ile yazarken önizleme otomatik güncellenir.
   Tab tuşu 2 boşluk ekler; focus kaybetmez.

   Attribute'lar:
     lang - Prism dil sınıfı kod etiketi için (varsayılan: "markup")

   Kullanım:
     <c-live-demo>
       <script type="text/plain">
         <c-badge variant="get">GET</c-badge>
       </script>
     </c-live-demo>
   ========================================================================== */

class CLiveDemo extends HTMLElement {
    connectedCallback() {
        if (this._rendered) return;
        this._rendered = true;

        const scriptEl = this.querySelector('script[type="text/plain"]');
        const code = scriptEl ? scriptEl.textContent.trim() : '';

        this.innerHTML = '';
        this.classList.add('c-live-demo');

        /* ── Araç çubuğu ── */
        const toolbar = document.createElement('div');
        toolbar.className = 'c-live-demo__toolbar';

        const label = document.createElement('span');
        label.className = 'c-live-demo__label';
        label.textContent = 'Canlı Demo';

        const copyBtn = document.createElement('button');
        copyBtn.type = 'button';
        copyBtn.className = 'c-live-demo__copy';
        copyBtn.textContent = 'Kopyala';
        copyBtn.addEventListener('click', () => {
            if (!navigator.clipboard) return;
            navigator.clipboard.writeText(textarea.value).then(() => {
                copyBtn.textContent = 'Kopyalandı';
                setTimeout(() => { copyBtn.textContent = 'Kopyala'; }, 1200);
            });
        });

        toolbar.appendChild(label);
        toolbar.appendChild(copyBtn);

        /* ── Sol panel: düzenlenebilir textarea ── */
        const codePanel = document.createElement('div');
        codePanel.className = 'c-live-demo__code-panel';

        const textarea = document.createElement('textarea');
        textarea.className = 'c-live-demo__textarea';
        textarea.value = code;
        textarea.spellcheck = false;
        textarea.autocomplete = 'off';
        textarea.autocorrect = 'off';
        textarea.autocapitalize = 'off';

        /* Tab → 2 boşluk (focus kaybolmaz) */
        textarea.addEventListener('keydown', e => {
            if (e.key !== 'Tab') return;
            e.preventDefault();
            const s = textarea.selectionStart;
            const val = textarea.value;
            textarea.value = val.slice(0, s) + '  ' + val.slice(textarea.selectionEnd);
            textarea.selectionStart = textarea.selectionEnd = s + 2;
        });

        codePanel.appendChild(textarea);

        /* ── Sağ panel: iframe önizleme ── */
        const previewPanel = document.createElement('div');
        previewPanel.className = 'c-live-demo__preview-panel';

        const iframe = document.createElement('iframe');
        iframe.className = 'c-live-demo__iframe';
        previewPanel.appendChild(iframe);

        /* ── Paneller ── */
        const panels = document.createElement('div');
        panels.className = 'c-live-demo__panels';
        panels.appendChild(codePanel);
        panels.appendChild(previewPanel);

        this.appendChild(toolbar);
        this.appendChild(panels);

        /* İlk render */
        requestAnimationFrame(() => this._fillIframe(iframe, code));

        /* Debounced canlı güncelleme */
        let timer = null;
        textarea.addEventListener('input', () => {
            clearTimeout(timer);
            timer = setTimeout(() => this._fillIframe(iframe, textarea.value), 400);
        });
    }

    _fillIframe(iframe, code) {
        const links = Array.from(document.querySelectorAll('link[rel="stylesheet"]'))
            .map(l => `<link rel="stylesheet" href="${l.href}">`)
            .join('\n');

        const scripts = Array.from(document.querySelectorAll('script[src]'))
            .map(s => `<script src="${s.src}"><\/script>`)
            .join('\n');

        const doc = iframe.contentDocument || (iframe.contentWindow && iframe.contentWindow.document);
        if (!doc) return;

        doc.open();
        doc.write(`<!DOCTYPE html>
<html>
<head>
${links}
<style>
  html, body { margin: 0; padding: 0; }
  body { padding: 1rem; background: transparent; }
</style>
</head>
<body>
${code}
${scripts}
</body>
</html>`);
        doc.close();

        const resize = () => {
            try {
                const h = doc.body.scrollHeight;
                if (h > 0) iframe.style.minHeight = (h + 32) + 'px';
            } catch (e) {}
        };
        setTimeout(resize, 120);
        setTimeout(resize, 600);
    }
}

customElements.define('c-live-demo', CLiveDemo);
