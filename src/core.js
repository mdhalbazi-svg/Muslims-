
const Store = {
  get(key, fallback = null) {
    try {
      return JSON.parse(localStorage.getItem(key)) ?? fallback;
    } catch {
      return fallback;
    }
  },

  set(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
  }
};

const Core = {
  hijri(date = new Date()) {
    try {
      return new Intl.DateTimeFormat(
        'ur-PK-u-ca-islamic-umalqura',
        {
          day: 'numeric',
          month: 'long',
          year: 'numeric'
        }
      ).format(date);
    } catch {
      return 'ہجری تاریخ دستیاب نہیں';
    }
  },

  qibla(lat, lon) {
    const toRad = x => x * Math.PI / 180;

    const kaabaLat = toRad(21.4225);
    const kaabaLon = toRad(39.8262);

    const p = toRad(lat);
    const l = toRad(lon);

    const y = Math.sin(kaabaLon - l);

    const x =
      Math.cos(p) * Math.tan(kaabaLat) -
      Math.sin(p) * Math.cos(kaabaLon - l);

    return (Math.atan2(y, x) * 180 / Math.PI + 360) % 360;
  },

  normalize(text) {
    return (text || '')
      .toLowerCase()
      .normalize('NFKC')
      .replace(/[ًٌٍَُِّْـٰ]/g, '')
      .replace(/[أإآٱ]/g, 'ا')
      .replace(/ى/g, 'ي')
      .replace(/ؤ/g, 'و')
      .replace(/ئ/g, 'ي')
      .replace(/[۔،؛؟]/g, ' ')
      .replace(/\s+/g, ' ')
      .trim();
  },

  zakat(input) {
    const keys = [
      'gold',
      'silver',
      'cash',
      'bank',
      'stock',
      'receivables',
      'investments'
    ];

    const total = keys.reduce(
      (sum, key) => sum + Math.max(0, Number(input[key] || 0)),
      0
    );

    const debt = Math.max(
      0,
      Number(input.deductibleDebt || 0)
    );

    const net = Math.max(0, total - debt);

    return {
      assets: total,
      net,
      zakat: net * 0.025
    };
  },

  saveDiary(entry) {
    const all = Store.get('diary', []);

    all.unshift({
      ...entry,
      createdAt: new Date().toISOString()
    });

    Store.set('diary', all.slice(0, 365));

    return all.length;
  },

  exportDiary() {
    return JSON.stringify(
      Store.get('diary', []),
      null,
      2
    );
  }
};

window.Store = Store;
window.Core = Core;
    
