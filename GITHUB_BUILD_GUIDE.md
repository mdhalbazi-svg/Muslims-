# GitHub build guide

The workflow is `.github/workflows/android-build.yml`. It uses Node 20, Temurin Java 17, Android SDK setup, npm tests, Capacitor sync, and Gradle tasks.

Required repository secrets for release signing:
- KEYSTORE_BASE64: base64 encoding of your own JKS/keystore
- KEYSTORE_PASSWORD
- KEY_ALIAS
- KEY_PASSWORD

The workflow currently builds a debug APK and attempts a release AAB. Validate release signing configuration in `android/app/build.gradle` after the first Capacitor Android project generation. Never commit signing material.
