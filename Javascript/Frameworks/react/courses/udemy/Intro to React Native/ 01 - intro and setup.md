# react native udemy

Install react native in Mac
https://facebook.github.io/react-native/docs/getting-started.html


# install xcode, UPGRADE TO latest version CHECK IT in MacOS


# install Android studio

## in MacOS and setup an emulator

https://facebook.github.io/react-native/docs/getting-started

- Be sure to have the latest and update the SDKs and accept their licenses
  
  - Select the "SDK Platforms" tab from within the SDK Manager, then check the box next to "Show Package Details" in the bottom right corner. Look for and expand the Android 6.0 (Marshmallow) entry, then make sure the following items are all checked:

      - Google APIs
      - Android SDK Platform 23
      - Intel x86 Atom_64 System Image
      - Google APIs Intel x86 Atom_64 System Image

- Setup a virtual device from scratch to avoid issues, I used a nexus 5 API 23



## Android emulation

my phone:
device: http://developer.samsung.com/technical-doc/view.do?v=T000000287
skin: 

Si hay quilombo al hacer el build 

Mira: http://stackoverflow.com/questions/41890659/errorthe-sdk-build-tools-revision-23-0-3-is-too-low-for-project-app-minim


buildscript {
    repositories {
        jcenter()
    }
    dependencies {
        classpath 'com.android.tools.build:gradle:2.2.3'

        // NOTE: Do not place your application dependencies here; they belong
        // in the individual module build.gradle files
    }
}


### Troubleshooting

#### Emulator issues
  Emulator: Failed to open vm 3
  Emulator: Failed to create HAX VM

https://stackoverflow.com/questions/39087532/no-accelerator-found-failed-to-create-hax-vm

I have this issue in High Sierra but it is fixed in the latest version, currently 6.2.1 solved the issue to me. Make sure you got the right version running: $ kextstat | grep intel 

Go to Preferences -> SDK Manager > Appearance & Behaviour > System Settings > Android SDK
------ Uncheck Intel x86 Emulator Accelerator (HAXM Installer) and Apply. This will uninstall HAXM.
https://issuetracker.google.com/issues/62395878


ANOTHER SOLUTION: 
There is a patch for this in Android Studio, so install latest updates for:
Those uodates shoul dbe usually offered to be updated by the Android studio update itself.
- Android SDK Tools
- Android emulator

#### SDK location not found
react-native run-android
Scanning folders for symlinks in /Users/javierhack/Documents/dev/learning_projects/react-native/ReactNativeReduxCasts_start/albums/node_modules (26ms)
Starting JS server...
Building and installing the app on the device (cd android && ./gradlew installDebug)...
Starting a Gradle Daemon (subsequent builds will be faster)

FAILURE: Build failed with an exception.

* What went wrong:
A problem occurred configuring project ':app'.
> SDK location not found. Define location with sdk.dir in the local.properties file or with an ANDROID_HOME environment variable.

Solution:

- Go to the android/ directory of your react-native project
- Create a file called local.properties with this line:
    - sdk.dir = /Users/USERNAME/Library/Android/sdk
    Where USERNAME is your OSX username



#### /bin/sh: adb: command not found

Summary:
`react-native run-android` will need `adb` in `$PATH` 
Follow RN guide
https://facebook.github.io/react-native/docs/getting-started
Configure the ANDROID_HOME environment variable



## Install Android Studio in Win machine.
It will require a jva VM, a JAVA_HOME var set in the system vars, and put the platform-tools in the path variable.
See course video for this: Emulator creation and System Variables.


## OPTIONAL: install brew, or update it with > brew update

## install node, use nvm or brew > brew upgrade node
if you run node -v and still shows an old version try > brew link node
and follow the instructions

## react native cli
> npm install -g react-native-cli

## create a react native prj

### Init
> react-native init myProject

To run your app on iOS:
   cd /Users/javierhack/Documents/learning/projects/react_native/myProject
   
   $ react-native run-ios

   - or -

   Open ios/myProject.xcodeproj in Xcode
   
   Hit the Run button
   
To run your app on Android:
   cd to the project root

   **You need to have an Android emulator running, or a phisical device connected ...**
   
   $ react-native run-android

**If any issues see Android emulation troubleshooting**


# Install ESLint
> npm install -g eslint

## Eslint rule set

Base
> npm install --save-dev eslint babel-eslint eslint-plugin-react eslint-plugin-react-native


{
  "parser": "babel-eslint",
  "plugins": [
    "react",
    "react-native"
  ],
  "parserOptions": {
    "ecmaFeatures": {
        "jsx": true,
        "modules": true
    }
  },
  "extends" : [
    "eslint:recommended",
    "plugin:react/recommended"
  ],
  "rules" : {
    "arrow-body-style" : 'warn'
  }

  "settings": {
    "react": {
      "createClass": "createReactClass", // Regex for Component Factory to use,
                                         // default to "createReactClass"
      "pragma": "React",  // Pragma to use, default to "React"
      "version": "16.4.1", // React version, default to the latest React stable release defined, put the one in package.json
      "flowVersion": "0.79.1" // Flow version, latest?  https://github.com/facebook/flow/releases
    },
    "propWrapperFunctions": [ "forbidExtraProps" ] // The names of any functions used to wrap the
                                                   // propTypes object, e.g. `forbidExtraProps`.
                                                   // If this isn't set, any propTypes wrapped in
                                                   // a function will be skipped.
  }


}

Eslint for react-native
https://github.com/yannickcr/eslint-plugin-react#configuration

Airbnb
> npm install --save-dev eslint-config-airbnb-base

  "extends" : [
    ...
    "airbnb-base"
  ],


eslint para react-native ?? 

   {
    "parser": "babel-eslint",
    "env": {
        "browser": true
    },
    "plugins": [
        "react"
    ],
    "extends": [
        "eslint:recommended",
        "plugin:react/recommended"
    ],
    "rules": {
        // overrides
    }
}

### Test:
./node_modules/.bin/eslint App.js



if the plug in cant find the node modules install them globally
> npm install -g babel-eslint eslint eslint-plugin-react

# Final .eslintrc.json

{
  "parser": "babel-eslint",
  "plugins": [
    "react",
    "react-native"
  ],
  "parserOptions": {
    "ecmaFeatures": {
      "jsx": true,
      "modules": true
    }
  },
  "extends": [
    "eslint:recommended",
    "plugin:react/recommended"
  ],
  "rules": {
    "arrow-body-style": "warn"
  },
  "settings": {
    "react": {
      "createClass": "createReactClass",
      "pragma": "React",
      "version": "16.4.1",
      "flowVersion": "0.79.1"
    },
    "propWrapperFunctions": [
      "forbidExtraProps"
    ]
  }
}

# Final .eslintignore

node_modules/

# Final .babelrc

{
  "presets": ["react-native"]
}


# Final package.json

{
  "name": "albums",
  "version": "0.0.1",
  "private": true,
  "scripts": {
    "start": "node node_modules/react-native/local-cli/cli.js start",
    "test": "jest"
  },
  "dependencies": {
    "react": "16.4.1",
    "react-native": "0.56.0"
  },
  "devDependencies": {
    "babel-eslint": "^9.0.0",
    "babel-jest": "23.4.2",
    "babel-preset-react-native": "^5",
    "eslint": "^5.4.0",
    "eslint-plugin-react": "^7.11.1",
    "eslint-plugin-react-native": "^3.2.1",
    "jest": "23.5.0",
    "react-test-renderer": "16.4.1"
  },
  "jest": {
    "preset": "react-native"
  }
}


## WebStorm
http://www.codeblocq.com/2016/03/Setup-ESLint-in-WebStorm/

need to install a conf with rules per project

https://medium.com/the-react-native-log/getting-eslint-right-in-react-native-bd27524cc77b

