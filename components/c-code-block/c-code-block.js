/* ==========================================================================
   <c-code-block>
   Söz dizimi vurgulamalı kod bloğu + "Kodu Kopyala" butonu.
   Prism.js yüklüyse (assets/vendor/js/prism.min.js + prism-vscode_dark.min.css)
   otomatik olarak highlight uygulanır; yüklü değilse düz <pre><code> olarak
   görünür.

   Attribute'lar:
     lang - html | css | javascript | typescript | tsx | php ... (Prism dil sınıfı)

   İçerik (textContent), gösterilecek kod metnidir. HTML kodu yazarken
   `<`/`>` karakterlerini `&lt;`/`&gt;` olarak escape etmeyi unutma.

   Kullanım:
     <c-code-block lang="html">&lt;div class="box"&gt;&lt;/div&gt;</c-code-block>
   ========================================================================== */

class CCodeBlock extends HTMLElement {
    connectedCallback() {
        const lang = this.getAttribute('lang') || 'markup';
        const code = this.textContent.trim();

        this.innerHTML = '';
        this.classList.add('c-code-block');

        const pre = document.createElement('pre');

        const codeEl = document.createElement('code');
        codeEl.className = `language-${lang}`;
        codeEl.textContent = code;

        const langLabel = document.createElement('span');
        langLabel.className = 'c-code-block__lang';
        langLabel.textContent = lang;

        const button = document.createElement('button');
        button.type = 'button';
        button.className = 'c-code-block__copy';
        button.textContent = 'Kodu Kopyala';
        button.addEventListener('click', () => this.copy(codeEl, button));

        pre.appendChild(codeEl);
        pre.appendChild(button);
        pre.appendChild(langLabel);
        this.appendChild(pre);

        if (window.Prism) {
            window.Prism.highlightElement(codeEl);
        }
    }

    async copy(codeEl, button) {
        await navigator.clipboard.writeText(codeEl.textContent);

        const original = 'Kodu Kopyala';
        button.textContent = 'Kopyalandı';
        button.classList.add('c-code-block__copy--copied');

        setTimeout(() => {
            button.textContent = original;
            button.classList.remove('c-code-block__copy--copied');
        }, 1200);
    }
}

customElements.define('c-code-block', CCodeBlock);
