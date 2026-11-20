
name: Islamic Life Android Build

on:
  workflow_dispatch:
  push:
    branches:
      - main

permissions:
  contents: read

concurrency:
  group: islamic-life-android-build
  cancel-in-progress: false

jobs:
  build:
    name: Build APK and AAB
    runs-on: ubuntu-latest

    env:
      ANDROID_HOME: /usr/local/lib/android/sdk
      ANDROID_SDK_ROOT: /usr/local/lib/android/sdk

    steps:
      # 1. Checkout source code
      - name: Checkout Repository
        uses: actions/checkout@v4

      # 2. Setup Node.js
      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: 20

      # 3. Setup Java 21
      - name: Setup Java 21
        uses: actions/setup-java@v4
        with:
          distribution: temurin
          java-version: '21'

      # 4. Install Android SDK
      - name: Install Android SDK Packages
        run: |
          SDKMANAGER=$(find "$ANDROID_HOME/cmdline-tools" -name sdkmanager -type f | head -n 1)

          if [ -z "$SDKMANAGER" ]; then
            echo "Android SDK Manager not found"
            exit 1
          fi

          yes | "$SDKMANAGER" --licenses || true

          "$SDKMANAGER" \
            "platform-tools" \
            "platforms;android-35" \
            "build-tools;35.0.0"

      # 5. Verify project files
      - name: Verify Project Files
        run: |
          test -f package.json
          test -f capacitor.config.json
          test -f index.html
          test -f src/core.js
          test -f scripts/build.js
          test -f tests/core.test.js

          echo "All required project files found."

      # 6. Install dependencies
      - name: Install Dependencies
        run: npm install

      # 7. Run tests
      - name: Run Tests
        run: npm test

      # 8. Check JavaScript
      - name: Check JavaScript
        run: npm run check

      # 9. Build Web Application
      - name: Build Web App
        run: npm run build

      # 10. Add Android platform
      - name: Add Android Platform
        run: |
          if [ ! -d android ]; then
            npx cap add android
          fi

      # 11. Sync Capacitor
      - name: Sync Android
        run: npx cap sync android

      # 12. Verify Java version
      - name: Verify Java Version
        run: java -version

      # 13. Build APK and AAB
      - name: Build APK and AAB
        run: |
          cd android
          chmod +x gradlew

          ./gradlew assembleDebug

          ./gradlew bundleRelease

      # 14. Upload APK and AAB
      - name: Upload Build Files
        uses: actions/upload-artifact@v4
        with:
          name: Islamic-Life-Android-Build
          if-no-files-found: error
          path: |
            android/app/build/outputs/apk/**/*.apk
            android/app/build/outputs/bundle/**/*.aab
          retention-days: 14
        
