✅ Your Android build was successful.
⚠️ Gradle is reminding you about deprecated features—no immediate action needed, but worth updating your Gradle/AGP/React Native versions later.
🚀 Metro is running, so you can now open the app in your development client.



<!-- npx eas update --non-interactive --branch production --message "CI ${GITHUB_SHA}" -->


√ Uploaded 2 app bundles
√ Uploading assets skipped - no new assets found
i 27 iOS assets, 27 Android assets (maximum: 2000 total per update). Learn more about asset limits: https://expo.fyi/eas-update-asset-limits
⌛️ Computing the project fingerprints is taking longer than expected...
⏩ To skip this step, set the environment variable: EAS_SKIP_AUTO_FINGERPRINT=1
✔ Computed project fingerprints
✔ Published!

Branch             production
Runtime version    exposdk:53.0.0
Platform           android, ios
Update group ID    2465ee26-89f3-4b4a-a5cf-06c19ca398d9
Android update ID  0e55689b-c7bf-4e90-99db-ad308e37b127
iOS update ID      0f19c9ec-6d36-4784-8737-07d5c6edeff8
Message            CI ${GITHUB_SHA}
Commit             9ad135b11be498c0e212957988902acacc524900*
EAS Dashboard      https://expo.dev/accounts/deepak903/projects/spa/updates/2465ee26-89f3-4b4a-a5cf-06c19ca398d9


C:\ReactNative\spa>
C:\ReactNative\spa>





<!-- npx eas update --non-interactive --branch staging --message "Staging CI ${GITHUB_SHA}"
 -->


 To skip this step, set the environment variable: EAS_SKIP_AUTO_FINGERPRINT=1
✔ Computed project fingerprints
✔ Published!

Branch             staging
Runtime version    exposdk:53.0.0
Platform           android, ios
Update group ID    4640514c-d469-4d90-aac4-492b52008592
Android update ID  74e86e59-2f3b-49d5-8d09-2dec01a7718a
iOS update ID      f1652240-4003-4a52-9266-0f90b8121170
Message            Staging CI ${GITHUB_SHA}
Commit             9ad135b11be498c0e212957988902acacc524900*
EAS Dashboard      https://expo.dev/accounts/deepak903/projects/spa/updates/4640514c-d469-4d90-aac4-492b52008592


C:\ReactNative\sp






npx expo-updates codesigning:generate --key-output-directory ./certs --certificate-output-directory ./certs --certificate-common-name "spa-prod" --certificate-validity-duration-years 10




C:\ReactNative\spa>eas secret:create --scope project --name EXPO_UPDATE_PRIVATE_KEY --type string --value "$KEY"
★ eas-cli@16.20.1 is now available.
To upgrade, run:
npm install -g eas-cli
Proceeding with outdated version.

This command is deprecated. Use eas env:create instead.

√ Created a new secret EXPO_UPDATE_PRIVATE_KEY with value $KEY on project @deepak903/spa.      

C:\ReactNative\spa>


eas update --branch production --message "Fix: MPIN loader" --private-key-path .\certs\expo-updates-private-key.pem





adb logcat | findstr /I "ExpoUpdates UpdatesController ReactNativeJS"




give the brief info:--->adb logcat -s dev.expo.updates,ExpoUpdates,ReactNativeJS




eas update --branch production --message "Fix: adding abshiek" --private-key-path .\certs\private-key.pem





<!-- Tell you about update -->
npx eas branch:list


<!--Test update in Release apk  -->
adb logcat -s dev.expo.updates,ExpoUpdates,ReactNativeJS


adb install -r android/app/build/outputs/apk/debug/app-debug.apk


adb install -r android/app/build/outputs/apk/release/app-release.apk



adb shell am start -W -a android.intent.action.VIEW -d "https://ombaro.com/verify?token=test123" com.deepak903.spa


adb shell am start -W -a android.intent.action.VIEW -d "spa://verify?token=test123" com.deepak903.spa

