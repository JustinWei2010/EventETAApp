#EventETAApp

----
##Project Setup

###Setup react-native:

```
brew install node
brew install watchman
npm install -g react-native-cli
```
###Setup cocoapods:
sudo gem install cocoapods

###Run code:

```
git clone https://github.com/JustinWei2010/EventETAApp.git
cd EventETAApp
npm install
cd ios && pod install && cd ..
react-native run-ios
react-native run-android
```