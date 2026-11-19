# Islamic Life – جامع اسلامی ایپ

This ZIP contains an initial offline-first Capacitor Android project with working foundations for:
- RTL Urdu interface and theme toggle
- Tasbeeh counter
- Basic Zakat arithmetic (2.5% of positive net assets; not a complete fiqh ruling engine)
- Qibla bearing calculation from manually entered coordinates
- Hijri date display using the device's Intl calendar support
- Local daily diary with JSON export
- Arabic text normalization foundation
- GitHub Actions Android build workflow and basic tests

## Important implementation status
This is **not yet the complete Islamic super app described in the specification**. Quran and Hadith texts, translations, audio, verified dua content, full Hanafi Miras rules, scholarly-reviewed educational material, prayer-time UI/location flow, AdMob production IDs, and final Google Play policy review are not included as completed features. No Quranic verses or Hadith have been fabricated or embedded.

Prayer calculation dependency is declared (`adhan`), but the UI wiring and browser bundle integration still need completion before prayer times are functional in the app.

## Build
1. Upload the contents of this ZIP to a new GitHub repository on branch `main`.
2. Run `npm install` locally once and commit the generated `package-lock.json` (or generate it in a trusted Node 20 environment).
3. Add GitHub repository secrets: `KEYSTORE_BASE64`, `KEYSTORE_PASSWORD`, `KEY_ALIAS`, `KEY_PASSWORD`.
4. Run Actions → Android Build (APK + AAB).
5. Download the `android-builds` artifact.

The current workflow may require adjustment after the first Gradle run, especially release signing. Never put a keystore or passwords in the repository.

## Data and scholarly review
Only import Quran text from a verified source such as Tanzil after reviewing its distribution terms and integrity checks. Confirm rights for each Urdu/English translation, Hadith dataset, and audio recitation. Obtain qualified scholarly review for fiqh and inheritance logic before publishing.

## AdMob
No real AdMob IDs are included. Add your own App ID and ad-unit IDs only after implementing and testing the native AdMob plugin, consent flow, privacy disclosures, and ad placement policy.

## Package
`com.islamiclife.ultimate`


## Expanded professional service catalogue
A feature catalogue now documents the expected service breadth: Quran, Hadith, prayer, Qibla, azkar, zakat, inheritance, Hijri calendar, Ramadan, fasting, Hajj/Umrah, diary, mosque discovery, Islamic learning, media, charity, children's learning, and settings. The app includes a directory that marks whether each module is implemented, needs verified data, or requires an external integration.

This does **not** mean every listed module is already implemented. See `docs/FEATURE_MATRIX.md` and `docs/CONTENT_IMPORT_GUIDE.md` before treating any religious feature as production-ready.
