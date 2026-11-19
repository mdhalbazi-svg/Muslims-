/* Feature catalogue: all modules are discoverable, with explicit implementation status.
   Content requiring scholarly/source verification is never represented as complete. */
window.FeatureCatalog = [
 {id:"quran",title:"قرآن کریم",group:"عبادات",status:"needs_verified_dataset",features:["114 سورتیں","30 پارے","604 صفحات","تلاوت آڈیو","ترجمہ","تفسیر","تجوید","بک مارکس","ختم قرآن"]},
 {id:"hadith",title:"کتبِ حدیث",group:"علم",status:"needs_verified_dataset",features:["صحاح ستہ","موطا امام مالک","ریاض الصالحین","اربعین نووی","حوالہ و تخریج","درجہ بندی"]},
 {id:"prayer",title:"نماز اور اوقات",group:"عبادات",status:"integration_required",features:["پانچ نمازیں","اشراق و چاشت","طلوع و غروب","حنفی عصر","ماہانہ جدول","اذان و یاددہانی","قضا ٹریکر"]},
 {id:"qibla",title:"قبلہ",group:"اوزار",status:"implemented_basic",features:["قبلہ سمت","کمپاس کیلیبریشن","مقام کی دستی ترتیب"]},
 {id:"azkar",title:"اذکار و دعائیں",group:"عبادات",status:"needs_verified_dataset",features:["صبح و شام","نماز کے بعد","روزمرہ مسنون دعائیں","حوالہ جات","پسندیدہ","تسبیح"]},
 {id:"zakat",title:"زکوٰۃ",group:"مالیات",status:"basic_calculator_only",features:["سونا و چاندی","نقدی و بینک","مالِ تجارت","سرمایہ کاری","قرض و واجبات","نصاب","محفوظ حساب"]},
 {id:"miras",title:"علمِ میراث",group:"مالیات",status:"scholarly_engine_required",features:["اصحاب الفروض","عصبات","حجب","عول","رد","مناسخات","حنفی اصول","تفصیلی رپورٹ"]},
 {id:"calendar",title:"اسلامی کیلنڈر",group:"اوزار",status:"basic_display_only",features:["ہجری و عیسوی","اسلامی مہینے","اہم ایام","مقامی رویت ایڈجسٹمنٹ"]},
 {id:"ramadan",title:"رمضان",group:"عبادات",status:"planned_module",features:["سحری و افطار","روزہ ٹریکر","تراویح","اعتکاف","شب قدر","ختم قرآن","صدقہ"]},
 {id:"fasting",title:"روزے",group:"عبادات",status:"planned_module",features:["رمضان کے روزے","نفلی روزے","قضا روزے","روزوں کا ریکارڈ"]},
 {id:"hajj",title:"حج و عمرہ",group:"سفر",status:"scholarly_content_required",features:["احرام","طواف","سعی","عرفات","مزدلفہ","منیٰ","رمی","فقہی اختلافات"]},
 {id:"diary",title:"دینی روزنامچہ",group:"ذاتی نظم",status:"implemented_basic",features:["نماز ٹریکر","قرآن ٹریکر","اذکار","نیک اعمال","محاسبہ","نوٹس","بیک اپ"]},
 {id:"mosques",title:"مساجد و مراکز",group:"کمیونٹی",status:"provider_required",features:["قریبی مساجد","اسلامی مراکز","مقام و راستہ","رابطہ معلومات"]},
 {id:"learning",title:"اسلامی تعلیم",group:"علم",status:"scholarly_content_required",features:["عقائد","فقہ","سیرت","تاریخ","آداب","خاندانی مسائل","معاملات"]},
 {id:"media",title:"آڈیو و ویڈیو",group:"میڈیا",status:"licensed_media_required",features:["قرأت","دروس","سیرت","آف لائن ڈاؤن لوڈ","پس منظر پلے بیک"]},
 {id:"charity",title:"صدقہ و خیرات",group:"مالیات",status:"planned_module",features:["ذاتی عطیات ریکارڈ","اہداف","رسید نوٹس"]},
 {id:"names",title:"اسمائے حسنیٰ",group:"علم",status:"verified_content_required",features:["اسماء","معانی","مطالعہ"]},
 {id:"kids",title:"بچوں کی اسلامی تعلیم",group:"تعلیم",status:"content_required",features:["بنیادی دعائیں","آداب","انبیاء کے واقعات","کوئز"]},
 {id:"settings",title:"ترتیبات",group:"ایپ",status:"planned_module",features:["زبان","خط کا سائز","تھیم","حساب کا طریقہ","پرائیویسی","بیک اپ"]}
];
