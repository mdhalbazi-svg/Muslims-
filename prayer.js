/* Prayer times use the open-source adhan package when bundled.
   This fallback intentionally does not invent times: it asks the user to configure location/calculation. */
window.PrayerModule = {
  async getTimes(lat, lon, date = new Date(), madhab = "hanafi") {
    if (!Number.isFinite(lat) || !Number.isFinite(lon)) return null;
    try {
      const adhan = window.adhan;
      if (!adhan) return null;
      const coords = new adhan.Coordinates(lat, lon);
      const params = adhan.CalculationMethod.Karachi();
      params.madhab = madhab === "hanafi" ? adhan.Madhab.Hanafi : adhan.Madhab.Shafi;
      const t = new adhan.PrayerTimes(coords, date, params);
      return {Fajr:t.fajr,Dhuhr:t.dhuhr,Asr:t.asr,Maghrib:t.maghrib,Isha:t.isha,Sunrise:t.sunrise};
    } catch(e) { console.error(e); return null; }
  }
};