Fena gitmeden gerçekten. Eksik olan ama belgeleme sitelerinde sürekli ihtiyaç duyulan şeyler:

---

## Şu an olmayan ama çok işe yarar olanlar:

**c-steps** — Numaralı adım rehberi. "3 adımda kurulum" gibi içerikler için. Hemen hemen her docs sitesinde var.

**c-terminal** — Sahte terminal penceresi. Prompt + komut + çıktı gösterimi. c-code-block'tan farklı; shell etkileşimini simüle ediyor, farklı satır türleri (input/output/error) renklendirilmiş.

**c-file-tree** — Klasör/dosya ağacı. Şu an sadece README'de kod bloğu olarak yapılıyor, interaktif değil. Tıklanabilir, açılır/kapanır olsa çok daha iyi.

**c-api-endpoint** — REST endpoint belgeleme kartı. Method badge (GET/POST/DELETE) + URL + parametre tablosu + request/response örneği. Swagger'a gerek kalmadan temiz bir API referansı.

**c-changelog** — Versiyon geçmişi. Added / Changed / Fixed / Removed etiketleriyle semver satırları. Neredeyse her projede şart.

**c-kbd** — Klavye kısayol gösterimi. Ctrl+K, ⌘+Shift+P gibi şeyler için. Küçük ama çok sık lazım oluyor.

---

## Biraz daha ileri ama eğlenceli:

**c-live-demo** — Sağda kod, solda canlı önizleme. Tam file:// uyumlu çalışabilir; iframe sandbox içinde innerHTML render eder.

**c-color-swatch** — Renk paleti. Design system dokümante ediyorsan biçilmiş kaftan.

---

## Yeni eklemeler — Yüksek öncelikli:

**c-prop-table** — Bileşen prop referans tablosu. Ad / Tür / Varsayılan / Zorunlu / Açıklama sütunları. JSON attribute olarak verilebilir, tablo otomatik render edilir. Her component docs'unun buna ihtiyacı var — şu an bunları elle HTML tablosu olarak yazmak gerekiyor.

**c-comparison** — Yan yana "Do / Don't" ya da "Before / After" panelleri. Design system ve API migration dokümantasyonunda çok yaygın. Sol panel kırmızı kenarlık (yanlış), sağ panel yeşil kenarlık (doğru) gibi.

**c-heading-anchor** — h2/h3 başlıklarına otomatik anchor link ekler. Fare üzerine gelince # ikonu çıkar, tıklayınca URL'yi #hash ile kopyalar. GitHub'ın yaptığı şey. Özellikle uzun dokümanlarda olmazsa olmaz.

**c-table** — Stillendirilmiş veri tablosu. Sıralanabilir sütunlar, stripe satırlar, responsive scroll. Şu an ham HTML `<table>` kullanılıyor olmalı; bu çok daha temiz görünür.

**c-tooltip** — Hover tooltip. Inline açıklama için; sayfayı kirletmeden kısa notlar eklemek için ideal. `title` attribute gibi ama stillendirilmiş ve erişilebilir.

**c-image-zoom** — Tıklanınca büyüyen resim lightbox'ı. Diyagramlar ve ekran görüntüleri için şart. Sıfır bağımlılıkla, iframe/overlay kullanarak çalışabilir.

---

## Yeni eklemeler — Orta öncelikli:

**c-method-signature** — Fonksiyon/metod imzası gösterimi. `functionName(param: Type, flag?: boolean): ReturnType` gibi şeyleri renklendirilmiş, mono fontlu ve kopyalanabilir şekilde gösterir. API referans dokümantasyonunda c-api-endpoint'in kod tarafını tamamlar.

**c-timeline** — Dikey zaman çizelgesi. Changelog ya da proje geçmişi için. c-changelog'dan farkı görsel ağırlığı; tarih + başlık + gövde şeklinde kart yapısı.

**c-feedback** — "Bu sayfa yardımcı oldu mu? Evet / Hayır" widget'ı. Sayfanın altına eklenir. localStorage ile durum saklanabilir, file:// uyumlu.

**c-copy-button** — Bağımsız kopyala butonu. c-code-block içindeki kopyala butonunun standalone versiyonu. Herhangi bir metni veya elementi sarmak için kullanılır.

**c-print-button** — Sayfayı temiz CSS print stilleriyle yazdıran buton. Navbar/sidebar gizlenir, içerik tam genişliğe çıkar.

---

## Yeni eklemeler — Tasarım sistemi odaklı:

**c-font-scale** — Tipografi ölçeği görselleştiricisi. tokens.css'teki font-size değişkenlerini otomatik okuyup hepsini büyükten küçüğe listeler.

**c-spacing-scale** — Spacing token'larını görsel kutularla listeler. Her spacing değeri için gerçek boyutunu gösteren renkli bir blok + token adı.

**c-icon-gallery** — SVG ikonlarını grid şeklinde gösteren galeri. Tıklayınca kod snippet'ini kopyalar. Proje icon set'i varsa biçilmiş kaftan.

---

## Notlar:

- Hepsi file:// uyumlu tasarlanmalı (fetch yok, module import yok).
- c-prop-table + c-api-endpoint + c-method-signature üçlüsü birlikte güçlü bir API dokümantasyon akışı oluşturur.
- c-heading-anchor + c-toc zaten var olan TOC'u çok daha kullanışlı kılar.
- c-comparison, c-callout ile benzer ama içerik yapısı tamamen farklı; ikisi çakışmaz.
