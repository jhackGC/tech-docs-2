# Debugging

Open the debugger in the app
iOS: CMD + D
Android: CMD + M

Start remote JS debugging, that will open a browser window.
In the opened browser window open the devtools, like with "inspect" or F12.

## If you want to debug

### Set statements to debug

"debugger;"
like

componentDidMount() {
debugger;
actions.updateMovies();
}

put "debugger;" statements in your code and

### set breakpoint in the browser debugger

Go to the dev tools in chrome, Check that you have the "Enable JS source maps" checked.
See the debuggerWorker.js on the left and nevigate to the code you want to breakpoint

### Remote JS Debugging

### Live Reload

Reloads the entire app when any file changed

### Hot Reload

Reloads only the component you changed, keeps the page you are in, so you dont have to click all the way back into the page to see the changes
Do not use with JS Debugging, as it will go crazy with the state

## if you want to console.log

just put the console logs and they will appear in the browsr debugger window console.

## See Android logs

run this terminal cmd:
$ adb logcat \*:S ReactNative:V ReactNativeJS:V

# Troubleshooting

## Module AppRegistry is not a registered callable module (calling runApplication)

delete node_modules and install them again
clear watchman

## Unable to resolve module `react-native-vector-icons/MaterialIcons`

1 - Clear watchman watches
$ watchman watch-del-all

2 - delete node_modules and isntall again
$ rm -rf node_modules && npm install

looks like amplyfi has a dependency on eact-native-vector-icons but it is not loaded?

manually install react-native-vector-icons? nope ...

npm i -S react-native-vector-icons

## react-native-video crashes the app

https://github.com/react-native-community/react-native-video/issues/1220

When running it in a AVD (Android Virtual Device) in Android Studio, it only fails when the AVD has a x86_64 CPU assigned, if you use the same AVD config, but change it to have a x86 CPU instead, it works fine ... Im on a Mac.

## React Native version mismatch

look for yarn.lock and its valu efor react-native, probably does not match the package.json one, you need ot run yarn install to update it

or

cd Android && ./gradlew clean && cd ..
react-native start —reset-cache

## react-native-scrollable-tab-view has a trailing comma

Suppodsedly corrected on last version , it is still there just go to node_modules/react-native-scrollable-tab-view/SceneComponent.js
and fix is manually , remove the trailing comma

const SceneComponent = (Props) => {
const { shouldUpdated, ...props } = Props;

or use the master branch directly, where its been fixed...

"react-native-scrollable-tab-view": "git+https://github.com/happypancake/react-native-scrollable-tab-view.git",

## react-native-linear-gradient: Could not find method compileOnly()

    * Where:
    Build file '/Users/javierhack/Documents/dev/learning_projects/react-native/ReactNativeReduxCasts_start/albums/node_modules/react-native-linear-gradient/android/build.gradle' line: 21

    * What went wrong:
    A problem occurred evaluating project ':react-native-linear-gradient'.
    > Could not find method compileOnly() for arguments [com.facebook.react:react-native:+] on object of type org.gradle.api.internal.artifacts.dsl.dependencies.DefaultDependencyHandler.

    * Try:
    Run with --stacktrace option to get the stack trace. Run with --info or --debug option to get more log output.

    BUILD FAILED

    Total time: 2.333 secs
    Could not install the app on the device, read the error above for details.
    Make sure you have an Android emulator running or a device connected and have
    set up your Android development environment:
    https://facebook.github.io/react-native/docs/getting-started.html

\*\* Solutions tested:

- Need to upgrade gradle to 3.5.1+ yes

follow this guide

https://github.com/react-native-community/react-native-camera/blob/master/docs/GradleUpgradeGuide.md

To integrate react-native-camera or the latest version of react-native-linear-gradient into your own react native project and make it work for Android, you need to edit the following files in the android folder under your project folder:

In the android/gradle.properties file:

android.useDeprecatedNdk=true
android.enableAapt2=false // ADD this one

In the android/build.gradle file:

buildscript {
...
dependencies {
classpath 'com.android.tools.build:gradle:3.1.0' // upgrade here to 3.1.0 +
...
}
}

In the android/gradle/gradle-wrapper.properties file:
...
distributionUrl=https\://services.gradle.org/distributions/gradle-4.10.2-all.zip // upgrade here

- alternatively: downgrade the lib ...

  unlink: react-native unlink react-native-linear-gradient
  downgrade and fix to "react-native-linear-gradient": "2.4.0",
  delete node_modules
  npm install
  relink: react-native link react-native-linear-gradient

See

https://github.com/react-native-community/react-native-linear-gradient/issues/339

https://github.com/react-native-community/react-native-linear-gradient/commit/f983d4d325e80255a03fbe35f11887bbf30d4dce

## The app gets stuck in the splash sreen or some other part

try disabling the remote debugger , it usually holds the app.

## android emulator can connect to localhost

The thing is, that iOS is running in a simulator and Android is running in an emulator.
The localhost is pointing to the environment in which the code is running. The emulator emulates a real device while the simulator is only imitating the device.
Therefore the localhost on Android is pointing to the emulated Android device. And not to the machine on which your server is running.
The solution is to replace localhost with the IP address of your machine.

export const config = {
dev: {
apiUrl: {
ios: 'http://localhost:3000', // must have protocol
android: 'http://10.0.2.2:3000' // must have protocol and not localhost
}
},
prod: {
apiUrl: 'somewhere in AWS',
}
}

AND

// the connector

import { Platform } from 'react-native';
import { config } from "../config/config";

export default class BackEndService {

    constructor() {
        const apiUrl = this.getApiUrl();

        this.client = new ApolloClient({
            uri: apiUrl
        });
    }
    ...
    getApiUrl() {

        return Platform.OS === 'android' ? config.dev.apiUrl.android : config.dev.apiUrl.ios;
    }

}

### error: bundling failed: Error: Unable to resolve module `scheduler/tracing` from ...

error: bundling failed: Error: Unable to resolve module `scheduler/tracing` from
`/Users/javierhack/Documents/dev/_prd/sowa/sowa-mobile/node_modules/react-native/Libraries/Renderer/oss/ReactNativeRenderer-dev.js`: Module `scheduler/tracing` does not exist in the Haste module map

1. Clear watchman watches: `watchman watch-del-all`.
2. Delete the `node_modules` folder: `rm -rf node_modules && npm install`.
3. Reset Metro Bundler cache: `rm -rf /tmp/metro-bundler-cache-*` or `npm start -- --reset-cache`.
4. Remove haste cache: `rm -rf /tmp/haste-map-react-native-packager-*`.

https://github.com/facebook/react-native/issues/21150

RN@0.57.0 had React dependency strictly locked on 16.5.0.
Yes it's very advisable to stick with the react version that each react-native version recommends in the package.json.

for

    "react": "16.6.0-alpha.8af6728",
    "react-test-renderer": "16.6.0-alpha.8af6728",

### [0.57] \_this.\_registerEvents is not a function on a clean project

more issues with version [0.57.3]

https://github.com/facebook/react-native/issues/21094

https://github.com/facebook/react-native/issues/20567

1 - add the metro-react-native-babel-preset package

2 - change .babelrc to
{
"presets": ["module:metro-react-native-babel-preset"]
}

3 - npm run start --reset-cache
or
react-native start -reset-cache

"presets": ["module:metro-react-native-babel-preset"]

### Error: Unable to resolve module `./withSafeArea`

https://github.com/react-navigation/react-navigation/issues/5068

It worked after executing the following command:

react-native start --reset-cache

It was a cache issue with dependencies

### AWS Amplify -> Auth: careful with linking: Unable to use signIn - Cannot read property 'computeModPow' of undefined

https://github.com/aws-amplify/amplify-js/issues/563
force the linking of aws-amplify dependency lib: amazon-cognito-identity-js

    react-native link amazon-cognito-identity-js


### Unable to connect with remote debugger
https://stackoverflow.com/questions/40898934/unable-to-connect-with-remote-debugger

In my case the issue was that the emulator was making a request to:

http://10.0.2.2:8081/debugger-ui

instead of:

http://localhost:8081/debugger-ui and the request was failing.

To solve the issue: Before enabling remote debugging on your emulator, open http://localhost:8081/debugger-ui in chrome. Then enable remote debugging and go back to the chrome page where you should see your console logs.

### ios - xcrun: error: invalid active developer path (/Library/Developer/CommandLineTools), missing xcrun at: /Library/Developer/CommandLineTools/usr/bin/xcrun

https://gist.github.com/gaquino/87bdf0e6e852e445c0489379d3e9732a

If you are facing an error like that on new MacOS version.

xcrun: error: invalid active developer path (/Library/Developer/CommandLineTools), missing xcrun at: /Library/Developer/CommandLineTools/usr/bin/xcrun

It means that you need to install XCode command line, open a Terminal and run this command:

$ xcode-select --install

### ios - xcrun: error: unable to find utility "instruments", not a developer tool or in PATH
https://stackoverflow.com/questions/39778607/error-running-react-native-app-from-terminal-ios

### PROD AND DEV

mandale primero este comando
react-native bundle --platform android --dev false --entry-file index.android.js --bundle-output android/app/src/main/assets/index.android.bundle --assets-dest android/app/src/main/res/

react-native run-android --variant="release"


## android emulator can connect to internet

check current avds installed
```
$HOME/Library/Android/sdk/emulator/emulator -list-avds
```

pick the one e.g. Pixel_4_API_Q_29

run it with a specific DNS
```
$HOME/Library/Android/sdk/emulator/emulator -avd Pixel_4_API_Q_29 -dns-server 8.8.8.8
```

