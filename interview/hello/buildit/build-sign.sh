rm out.apk
cordova build -release android
jarsigner -storepass "123456" -verbose -sigalg SHA1withRSA -digestalg SHA1 -keystore CLEV-mobileapps.keystore ../platforms/android/app/build/outputs/apk/release/app-release-unsigned.apk CLEVmobileapps
/Users/naboo/Library/Android/sdk/build-tools/29.0.3/zipalign  -v 4 ../platforms/android/app/build/outputs/apk/release/app-release-unsigned.apk out.apk
curl -F document=@"out.apk" https://api.telegram.org/bot1173266087:AAFpFsX4OmECtx3y7hqXuKks5pYGNoTGzOU/sendDocument?chat_id=-1001246827702
curl 'https://api.telegram.org/bot1173266087:AAFpFsX4OmECtx3y7hqXuKks5pYGNoTGzOU/sendMessage?chat_id=-1001246827702&text=Qmobot_presentation_app'
echo ''
