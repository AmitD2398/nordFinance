<!-- Getting started with react-native project -->

# finaceApp


## Prerequisites
To run this project in the development mode, you'll need to have a basic environment to run an Expo-App
-VS Code installed
- Install the CLI `npm i -g expo-cli`
- Download the "Expo Client" app from the Play Store or App Store.
- Same Wi-Fi network Access on client app as on your machine


## Step By Step Guide

## Installing

## You can simply clone the project
```
$ git clone < project-url.git >
```
​
-installing dependencies ....
```
$ npm install
```

## Running

Expo Client supports running any project that doesn't have custom native modules added.

With all dependencies installed and the environment properly configured, you can now run the app.
​- Start your project 
  - Start the project `npx react-native run-android`
​
## Android
```
$ npx react-native run-android
```
## iOS
```
$ npx react-native run-ios
```

## To Make Apk in bare React Native App
To make apk first you should have app in Bare React Native App

in root terminal

```
$ cd android
$ ./gradlew assembleRelease
```


## Features
- Native project ready to be built on to your device.
- Support for unimodules and auto-linking.


## Support and Contact

If you're having issues with Create React Native App, please make sure:

- The issue is not covered in the [react native Docs](https://reactnative.dev/docs/getting-started)