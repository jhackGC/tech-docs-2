## link to apps in the mobile device

react native APIs
Linking library: link our app to others in the mobile device, like a browser.

---

## App wrap up

---

## Import component files

import and export in one step
export \* from './Button';

## Auth with FirebASE

create app , allow authentication with email , and install the npm module in your RN app.

npm install --save firebase

it creates a bucket of data in the FB app

connect to FB with a lyfecycle method

get the Web Setup config info and paste it in the RN compoennt

componentWillMount(){
const firebaseConfig = {
apiKey: '<>',
authDomain: '<>',
databaseURL: '<>',
projectId: '',
storageBucket: '<>',
messagingSenderId: '870119659642'
};
}

Note about firebsae and errors in the .then() callback func

---

If there is an error or exception thrown in the .then(..) callback func, then its .catch() will be called, weird but true.
e.g.

      > action creator
      firebase
          .auth()
          .signInWithEmailAndPassword(email, password)
          .then(user => loginUserSuccess(dispatch, user)) // if
          .catch(error ...

      > helper method
      const loginUserSuccess = (dispatch, user) => {
        dispatch({
          type: LOGIN_USER_SUCCESS,
          payload: user,
        });
      };

      > reducer
      export default function(state = INITIAL_STATE, action) {
      switch (action.type) {
        case LOGIN_USER_SUCCESS: // if an error is thrown HERE the firebase catch will be called !!!!
          return { ...state, user: action.payload, error: '' };
        default:
          return state;
      }

Handling text inputs

---

TextInput fron react-native
By default they defautl render with width and height of 0, you wont see unless defined

get the input content ....

use component state to store the input value
state = { text: ''};

when chnaged update the state
<TextInput onChange={ text => this.setState({ text })}
style={{ height: 20, width: 100 }}
/>

value is set from state

That makes it a CONTROLLED COMPONENT, in which its value is controlled byt the component state, and not directly by the user input ...
Which MEANS that with this approach, the Text input has no idea what his value is, is not responsible for it, instrad we save the value to state, and we are going to tell you your value.

If you want to know the value, you have to ask the component state, not the input.
One of the upside we always know the value by asking the state.

We can wrap a TextInpt and make it look nice by creating a custom input component that wraps it.

## REDUX

Why using it? state is only modified with actions, I know exactly all the ways the state can be modified.

Reducer: A function that returns some data

Action: An plain JS object ( {...} ) that tells/directs the reducer how to change its data.

State: Data for our app to use

Store: An object that holds the app's data (Reducers and state)

Example:

> Action: says "Turn 'asdf' into an array of characters"

> Reducer: If the action's type is 'split', I will take a string of chars and turn it into an array.

> State: ['a', 's', 'd', 'f']

Step 1)

### Create reducer

- const reducer = () => []; // reducer is just a func that returns some data, in this case an empty array.

- reducer checks action type and does something
  const reducer = (state = [], action) => {
  if(action.type === 'split_string') {
  reducereturn action.payload.split('');
  }
  return state;
  }

### Create a redux store, it expects at least one reducer function.

- const store = Redux.createStore(reducer); // store has the state and the reducers, at any point of time we an ask the store for the app state.

(## Check state)

- store.getState(); // returns [], as the reducer returns []

## create action to chage state

- const action = {
  type: 'split',
  payload: 'asdf'
  };

## change state by using actions

- feed the action into the reducer, dispatch it
- action is dispatched to ALL the reducers in our app.

store.dispatch(action);

(## check state)

- store.getState();

## NOTES

- How to acess the previous state
  first arguemntto the reducer, reducers re-run many times in pour app, and everytime they are called they are passed the last version of the state. Everytime we dispatach an action, we returna nd incrmeental changed state.
- What do we return in the reducers?
  A modified but COMPLETELY NEW object or array, do not modify (MUTATE) the current state, just return a new completely recreated state.

const reducer = (state = [], action) => {
if(action.type === 'split_string') {
return action.payload.split('');
}else if(action.type === 'add_char') {
// state.push(action.payload); // NO NO NO, this is mutating , changing the state
return [...state, action.payload ]; // YES creates an entirely new array from states plus the new content
}

return state;
}

FULL STORY

---

const reducer = (state = [], action) => {
if(action.type === 'split_string') {
return action.payload.split('');
}else if(action.type === 'add_char') {
return [...state, action.payload ];
}

    return state;

}

const store = Redux.createStore(reducer);

store.getState();

const action = {
type: 'split_string',
payload: 'asdf'
};

store.dispatch(action);

store.getState();

const action2 = {
type: 'add_char',
payload: 'W'
};

store.dispatch(action2);

store.getState();

============================================
Provider (from react-redux) is the interface that connects react and redux.
THE PROVIDER CAN HACVE ONY ONE CHILD.
import { combineReducers } from 'redux'; is used to combine all the reducers

              <TechStack />

            <Provider store={createStore(reducers)}>

## Different types of REDUCERS:

tech list
selected tech

## Import a json file into a reducer

import data from './'

## One and Only way to access data

connect helper, from react-redux
Tool used to connect a component to the redux store.
for that we have:

import it

connect it:

- call the connect function that RETURNS another function which is passed your component.
  Why this approach? instead of the simple connect(TechStackList, ...)

export default connect()(TechStackList);

- map the store state to the component's props
  - create a mapper
  - pass it to the connect func.

const mapStateToProps = state => {
return { techs: state.techs};
};

export default connect(mapStateToProps)(TechStackList);

- access the state as a prop
  class TechStackList extends Component {
  render() {
  console.log('TechStackList render: ', this.props.techs);
  return (
  <View>
  <Header>
  <Text>React Tech Stack</Text>
  </Header>
  <Text>Hello Tis is the tech stack</Text>
  </View>
  );
  }
  }

export default connect(mapStateToProps)(TechStackList);

WHENEVER THE APP STATE CHANGES, the mapStateToProps method will re-execute, passing anew set of props to our component, therefore the component will re-render.
So on every action dispatched, the application re-renders, as when we do a click, the action creator creates an aciton, that is dispatched to the reducers, the reducer re-runs, state recalculates, state flows into mapStateToProps, new props show up, component re-renders.

## REDUX FLOW

- User types something
- Call action creator with new text
- Action creator returns an action with the new text and an action type
- Action sent to all reducers
- Reducer calculates new app state, for a particular piece of state
- State sent to all components (mapsStateToProps)
- Components will re-render with new state
- Component waits till next interaction with user

## Small lists

could use map

## Long lists of items

Mapping over: Upfront rendering of a lot of items, and leaving them in memory. As we cant really see them at once in the screen.

ListView: Component that uses a trick, figuring out what items in the list are visible to the user in the screen.
And creates a single component only for the ones on screen.
It watches for scrolling events, if item goes out of view ... takes that instance of the component and moves it down to the bottom of the screen and gives the component a new item to show.
Renders a subset.
Reuses the component instances.

## ListView

Scroll cut off

## Text

not overflow, wrap it,
flex: 1 t the text element

==============================
Navigation
==============================
Many options

- react-native-router-flux

https://github.com/aksonov/react-native-router-flux

Uses scene component,
props:

- key -> Call 'Actions.login()' to show this screen
- component: -> obvious
- title: Login -> Make a nav bar and give it a title
- initial -> this is the first screen/scene to show

> App.js
> import Router from './Router';

render() {
return (
<Provider store={store}>
<Router /> // manages navigation
</Provider>
);
}

> Routes.js
> /\*

- Scenes or screens configuratin for the react-native-router-flux navigation
- library
  \*/

import React from 'react';
import { Scene, Router } from 'react-native-router-flux';
import LoginForm from './components/LoginForm';

export default (RouterComponent = () => {
return (
<Router>
<Scene key="login" component={LoginForm} title="Please Login" />
</Router>
);
});

## Styling the scenes

    <Router sceneStyle={{ paddingTop: 65 }}>

    Back butto works only a a set of scenes

    NavigationBar belong to the scene confirguration
