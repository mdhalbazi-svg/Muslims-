const $=s=>document.querySelector(s);
const content=$('#content');
let view='home', tasbeeh=0;
const modules=[
 ['📖','قرآن کریم','مکمل مصحف، تراجم اور تلاوت'],
 ['📚','حدیث','مستند کتب اور حوالہ جات'],
 ['🕌','نماز کے اوقات','نماز، قبلہ اور یاددہانی'],
 ['🧭','قبلہ رخ','قبلہ سمت معلوم کریں'],
 ['💰','زکوٰۃ کیلکولیٹر','اثاثوں اور واجب زکوٰۃ کا حساب'],
 ['⚖️','میراث','وراثت کے شرعی حصص'],
 ['📿','تسبیح','ڈیجیٹل تسبیح کاؤنٹر'],
 ['🌙','ہجری کیلنڈر','اسلامی تاریخ اور مہینے'],
 ['📝','روزانہ ڈائری','عبادات اور روزمرہ محاسبہ'],
 ['🤲','دعائیں و اذکار','مستند دعاؤں کا ذخیرہ'],
 ['🕋','حج و عمرہ','مناسک کی رہنمائی'],
 ['📚','اسلامی تعلیم','فقہ، سیرت اور اسلامی معلومات']
];
function card(title,body){return `<section class="card"><h3>${title}</h3>${body}</section>`}
function renderHome(){
 content.innerHTML=`<h2 class="sectionTitle">السلام علیکم</h2><p class="muted">آپ کی روزمرہ دینی ضروریات ایک جگہ</p><div class="grid">${modules.map((m,i)=>`<div class="card tile" data-module="${i}"><div class="ico">${m[0]}</div><h3>${m[1]}</h3><p>${m[2]}</p></div>`).join('')}</div><div class="notice">اہم: قرآن، حدیث اور فقہی مواد کے لیے مستند، حوالہ شدہ ڈیٹا شامل کیا جانا ضروری ہے۔</div>`;
 content.querySelectorAll('[data-module]').forEach(el=>el.onclick=()=>openModule(+el.dataset.module));
}
function openModule(i){
 const title=modules[i][1];
 if(i===6)return renderTasbeeh();
 if(i===4)return renderZakat();
 if(i===8)return renderDiary();
 if(i===3)return renderQibla();
 if(i===7)return renderCalendar();
 if(i===0||i===1||i===9||i===5||i===10||i===11)return content.innerHTML=card(title,`<div class="notice">اس حصے کا بنیادی انٹرفیس تیار ہے، مگر مستند مواد/مکمل شرعی قواعد شامل اور جانچنے کے بعد ہی اسے مکمل قرار دیا جا سکتا ہے۔ یہاں فرضی آیات، احادیث یا فتاویٰ شامل نہیں کیے گئے۔</div>`);
 content.innerHTML=card(title,'<p>اس فیچر کے لیے مقام اور اجازت کی ترتیب درکار ہے۔</p>');
}
function renderTasbeeh(){content.innerHTML=card('ڈیجیٹل تسبیح',`<div class="bigNumber" id="count">${tasbeeh}</div><div class="counter"><button id="minus">−</button><button id="plus">+</button></div><div class="row"><button class="primary" id="reset">صفر کریں</button></div>`);$('#plus').onclick=()=>{tasbeeh++;$('#count').textContent=tasbeeh};$('#minus').onclick=()=>{tasbeeh=Math.max(0,tasbeeh-1);$('#count').textContent=tasbeeh};$('#reset').onclick=()=>{tasbeeh=0;$('#count').textContent=0}}
function renderZakat(){content.innerHTML=card('زکوٰۃ کیلکولیٹر',`<p class="muted">تمام رقوم ایک ہی کرنسی میں درج کریں۔ یہ عمومی 2.5% تخمینہ ہے؛ نصاب اور فقہی کٹوتیوں کی تصدیق الگ ضروری ہے۔</p><div class="grid">${[['gold','سونے کی قابلِ زکوٰۃ مالیت'],['silver','چاندی کی مالیت'],['cash','نقد رقم'],['bank','بینک بیلنس'],['stock','تجارتی مال'],['receivables','قابلِ وصول رقم'],['investments','قابلِ زکوٰۃ سرمایہ کاری'],['deductibleDebt','قابلِ کٹوتی واجب الادا قرض']].map(([k,l])=>`<label class="field">${l}<input type="number" min="0" id="${k}" value="0"></label>`).join('')}</div><button class="primary" id="calcZakat">حساب کریں</button><div id="zakatResult"></div>`);$('#calcZakat').onclick=()=>{let d={};['gold','silver','cash','bank','stock','receivables','investments','deductibleDebt'].forEach(k=>d[k]=$('#'+k).value);let r=Core.zakat(d);$('#zakatResult').innerHTML=`<div class="result">کل اثاثے: ${r.assets.toLocaleString()}<br>خالص قابلِ حساب مال: ${r.net.toLocaleString()}<br><b>2.5% زکوٰۃ: ${r.zakat.toLocaleString()}</b></div>`}}
function renderDiary(){content.innerHTML=card('روزانہ ڈائری',`<label class="field">آج کی کیفیت اور محاسبہ<textarea id="diaryText" rows="4" placeholder="آج کی عبادات، مطالعہ اور اہداف..."></textarea></label><button class="primary" id="saveDiary">محفوظ کریں</button><button class="primary" id="exportDiary">بیک اپ JSON</button><div id="diaryList"></div>`);const refresh=()=>{$('#diaryList').innerHTML=Store.get('diary',[]).map(x=>`<div class="listItem"><small>${new Date(x.createdAt).toLocaleString()}</small><div>${escapeHtml(x.text)}</div></div>`).join('')||'<p class="muted">ابھی کوئی اندراج نہیں۔</p>'};$('#saveDiary').onclick=()=>{let t=$('#diaryText').value.trim();if(!t)return;Core.saveDiary({text:t});$('#diaryText').value='';refresh()};$('#exportDiary').onclick=()=>{let blob=new Blob([Core.exportDiary()],{type:'application/json'}),a=document.createElement('a');a.href=URL.createObjectURL(blob);a.download='islamic-diary-backup.json';a.click();URL.revokeObjectURL(a.href)};refresh()}
function escapeHtml(s){return s.replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]))}
function renderQibla(){content.innerHTML=card('قبلہ سمت',`<p>عرض بلد اور طول بلد درج کریں۔ نتیجہ شمال سے گھڑی کی سمت ڈگری میں ہوگا۔</p><label class="field">Latitude<input id="lat" type="number" step="any" placeholder="مثلاً 34.6"></label><label class="field">Longitude<input id="lon" type="number" step="any" placeholder="مثلاً 71.9"></label><button class="primary" id="qiblaBtn">سمت معلوم کریں</button><div id="qiblaResult"></div>`);$('#qiblaBtn').onclick=()=>{let lat=Number($('#lat').value),lon=Number($('#lon').value);if(!$('#lat').value||!$('#lon').value||Math.abs(lat)>90||Math.abs(lon)>180)return $('#qiblaResult').textContent='درست coordinates درج کریں۔';$('#qiblaResult').innerHTML=`<div class="result">قبلہ سمت: <b>${Core.qibla(lat,lon).toFixed(1)}°</b> شمال سے گھڑی کی سمت</div>`}}
function renderCalendar(){content.innerHTML=card('اسلامی تاریخ',`<div class="bigNumber">${Core.hijri()}</div><p class="muted">ہجری تاریخ مقامی رویتِ ہلال کے مطابق ایک دن مختلف ہو سکتی ہے۔</p>`)}
function setView(v){view=v;document.querySelectorAll('.tabs button').forEach(b=>b.classList.toggle('active',b.dataset.view===v));if(v==='home')renderHome();else if(v==='tools')content.innerHTML=`<div class="grid">${modules.slice(2,8).map((m,i)=>`<div class="card tile" data-tool="${i+2}"><div class="ico">${m[0]}</div><h3>${m[1]}</h3><p>${m[2]}</p></div>`).join('')}</div>`;else if(v==='diary')renderDiary();else if(v==='quran')openModule(0);else if(v==='hadith')openModule(1);content.querySelectorAll('[data-tool]').forEach(e=>e.onclick=()=>openModule(+e.dataset.tool))}
document.querySelectorAll('.tabs button').forEach(b=>b.onclick=()=>setView(b.dataset.view));
$('#themeBtn').onclick=()=>document.body.classList.toggle('dark');
$('#searchBtn').onclick=()=>{let q=Core.normalize($('#searchInput').value);if(!q)return;content.innerHTML=card('تلاش',`<p>آپ کی تلاش: <b>${escapeHtml(q)}</b></p><p class="muted">مستند قرآن، حدیث اور علمی ڈیٹا لوڈ ہونے کے بعد نتائج یہاں دکھائے جائیں گے۔</p>`)};
$('#gregDate').textContent=new Date().toLocaleDateString('ur-PK',{dateStyle:'medium'});$('#hijriDate').textContent=Core.hijri();renderHome();

// Complete service directory: clearly labels features that need verified data or integrations.
function renderAllServices(){
 const groups=[...new Set(FeatureCatalog.map(x=>x.group))];
 content.innerHTML=`<h2 class="sectionTitle">تمام اسلامی خدمات</h2><p class="muted">ہر خدمت کی موجودہ تکمیل کی حالت واضح دکھائی گئی ہے۔</p>`+
 groups.map(g=>`<h3 class="sectionTitle">${g}</h3><div class="grid">${FeatureCatalog.filter(x=>x.group===g).map(x=>`<article class="card"><h3>${escapeHtml(x.title)}</h3><p class="muted">${escapeHtml(x.features.join("، "))}</p><small class="muted">حیثیت: ${escapeHtml(x.status)}</small></article>`).join("")}</div>`).join("");
}

(function addServicesShortcut(){
 const nav=document.querySelector('.tabs');
 if(nav && !document.querySelector('[data-view="services"]')){
   const b=document.createElement('button');b.dataset.view='services';b.textContent='تمام خدمات';nav.appendChild(b);
   b.onclick=()=>{document.querySelectorAll('.tabs button').forEach(x=>x.classList.toggle('active',x===b));renderAllServices()};
 }
})();
