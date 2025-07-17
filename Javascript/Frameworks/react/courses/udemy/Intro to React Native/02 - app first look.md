
# Importing libraries
react: 
	- Knows how a component should behave (e.g. functions)
	- Knows how to take a bunch of components and make them work together

react-native: portal to the mobile device
	- Knows how to take the output from a component and place it on the mobile screen.
	- Provides default core components (image, text)


# First app
//place code in here for iOS

    // import a library to help create a component
    import React from 'react';
    import ReactNative from 'react-native';

    // create a component
    const App = () => {
    return (
        <Text>Some Text</Text>
    );
    }


    // render it to the device
    ReactNative.AppRegistry.registerComponent('albums', () => App);

For every react native app that we create we MUST register one component at least.

Only the 'root' component uses 'AppRegistry'.

it is usually the index.js

    //index.js
    
    /** @format */

    import {AppRegistry} from 'react-native';
    import App from './App';
    import {name as appName} from './app.json';

    AppRegistry.registerComponent(appName, () => App);



# Console and Debugging
Cmd + D in the simulator, to see debug options, Debug JS remotely.
To debug a point, put the word debugger in the code and the simulator will stop there.

class AlbumList extends Component{

  componentWillMount(){
    // this.props.fetchMusic;
    console.log('componentWillMount in AlbumDetail');
    debugger;
  }

## Android
Logcat in Android Studio

# Props
Parent Child Components communcation.


# Child key requirement
it has to be unique and consisten across all re-renderings, do not use the array idex as it is not consistent, the records can come is different order next time this comp is re-rendered

