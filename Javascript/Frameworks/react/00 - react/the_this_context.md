## Handling Events

https://facebook.github.io/react/docs/handling-events.html

For example, the HTML:

    <button onclick="activateLasers()">
      Activate Lasers
    </button>

is slightly different in React:

    <button onClick={activateLasers}>
      Activate Lasers
    </button>

### Calling the handler func

First param to the handler func is the event. It has the info about the event.

render(){
return <input onChange={this.handleInputChange}/>;
};

handleInputChange(event){
console.log(event.target.value)
}

Verify this --> NOTE: Important NOT to use () in the handler call. onClick={activateLasers}

### HOW TO Hold 'this' context

If the handler has a reference to 'this' you have 2 options:

- USE ARROW FUNCTION TO HOLD THIS.
  IT SHOULD BE written inline with an arrow function like this:

  > <input onChange={ (event) => console.log(event.target.value) }/>;

  as you have only 1 param, event, you can even remove the ()

  > <input onChange={ event => console.log(event.target.value) }/>;

  it also cleans the code but is less readeable in my test.

  or

  > onChange={(event) => this.handleInputChange(event )}

- BINDING CONTEXT

  REPLACE THE HANDLER WITH A THIS BOUND HANDLER
  Another way to hold 'this' WITHOUT using the wrapper arrow function:

  <pre>
  class SearchBar
      constructor(props){
          super(props);
          this.state = { term: ''};
  
          // How to hold the 'this' reference to SearchBar, when calling the event callback function
          // directly as in onChange={this.onInputChange} (without using a wrapper arrow function to avoid context issues):
          // Replace the onInputChange function with a onInputChange function that is bound to this context (SearchBar)
          // otherwise when you call
          this.onInputChange = this.onInputChange.bind(this);
      }
  
      onInputChange(event){
          this.setState({term: event.target.value});
      }
  
      render() {
          return (
              <form className="input-group">
                  <input
                      value={this.state.term}
                      onChange={this.onInputChange}
  </pre>

SUMMARY:
If you have a callback that uses 'this' chances are you will have to bind it in the constructor or wrap it in an arrow func.

## Conditional Rendering

### Trick to conditional render tag/components attributes

var inputProps = {
value: 'foo',
onChange: this.handleChange
};

if (condition) inputProps.disabled = true;
Render with spread, optionally passing other props also.

<input
value="this is overridden by inputProps"
{...inputProps}
onChange={overridesInputProps}
/>

## Lists and Keys

## Forms

## Lifting State Up

## STATE

State is a plain javascript object that is used to record and react to user events.
Each Class based coponent has its own state object.
WHENEVER THE STATE CHANGES the COMPONENT GETS RE-RENDERED (and forces its children to re-render as well)
Initialises in the constructor method.

initialising state by assigning a new object.

    constructor(props){
        super(props);
        this.state = {term : ''};

    }

Only time when you update your state like this, is in the constructor: this.state = {term : ''};
To update state never use this.state, instead use this.setState({term: event.target.value()}).

#### Controlled field/input

Field whose value is set by the state rather than the other way around.
When we tell the input to take its value from the state , it turns into a controlled component

so,

normal flow: input filled by the user.
input changes -> value filled -> triggers onChange event -> state changes -> input re-renders

controlled flow: input filled by state.
input changes -> triggers onChange event (NO VALUE FILLED) -> state changes -> component re-renders -> value filled with state

BIG DIFFEERENCE: WHEN THE USER INPUT DATA, THEY DONT FILL THE INPUT VALUE, THEY ONLY TRIGGER AN EVENT, and later on the input value is set by the state.

e.g.
in a controlled input ( <input value={this.state.term} /> ) the value is controlled by the state, like:

import React, {Component} from 'react';

export default class SearchBar extends Component {

    constructor(props){
        super(props);
        this.state = { term: ''};
    }

    render() {
        return (
                <input
                    value={this.state.term}
                />
        );
    }

When you type anything in the input, its value won't be affected, you wont see what you type in the input box !! only it will be visible is this.state.term changes somehow ...

## Composition vs Inheritance

## Thinking In React

## AJAX

downwards data flow, high outer, most parent, component be responsible for fetching data.

Normal: this.setState(videos: videos);
ES6: this.serState( videos );

## PROPS

Listing with map
Built it iterators

old way
var array1 = [1,2,3];
for ....

built it Map
var processedarray = array1.map(callbackFuntion for each elem)

## List Item Keys

LIst items need ids in order to updat eonly one if needed and not to need to re-render the full list if on changed (one changed, dont know which, so I re render all)

## ES6 sugar for param objects

const VideoListItem = (props) => {
const video = props.video;
return (
<li>Video {video.etag}</li>
);
}
SAME AS

const VideoListItem = ({video}) => {
return (
<li>Video {video.etag}</li>
);
}

as it will look for a oprop in the param obj called "video" and assign its value to a local const called video

## throttle the search

install lodash

> npm install --save lodash

## CHARTS

react-sparkline
https://github.com/borisyankov/react-sparklines

## GOOGLE MAPS

included in the js imported library in the hmtl map

<script src="https://maps.googleapis.com/maps/api/js"></script>

so, you can access the library anywhere in the page (including component) like:

google.maps

Its a global object.

this.refs.map is the DOM element reference

componentDidMount(){
new google.maps.Map(this.refs.map, {
zoom: 12,
center: {
lat: this.props.lat,
lng: this.props.lon
}
}
);
}

    render() {
        return (
            <div ref="map" /> // add this div elem to the reference list
        );
    }

##################################################
REDUX SUMMARY
##################################################

Redux contains our app state, which is generated by reducers that we write.
Events usually triggers changes using action creators, so the state is modified by action creators, they return actions that flow through middle-ware, and then into the reducers.
Whenever a new set of state is produced, it flows into our containers, and those containers are re-rendered.

##############################################################################################################################

##################################################
ROUTERS AND FORMS
##################################################

POSTMAN
select 'raw' type, ans JSON

{
"title": "Hi!",
"categories": "Computer, Friends",
"content": "Blog post content"
}

HEROKU BACK END API platform
http://reduxblog.herokuapp.com/

it does not saves user info so we need to identify in each request with a key posts that bleong to a particular user.
use the same key

key=javierH123

post id: "id": 86612

get all psots for javier
http://reduxblog.herokuapp.com/api/posts?key=javierH123

get ONE post for javier
http://reduxblog.herokuapp.com/api/posts/86612?key=javierH123

APIS can have protection of how many requests per sec, to avoid loops generating many requests at once, by mistake.

## REDUX FORM

- handling adn vlaidating the input.
  http://redux-form.com/6.6.3/docs/GettingStarted.md/

install as > npm install --save redux-form@6.6.3

Redux forms uses aal the redux - 2 framework to produce all the state and actions that are needed tha manage forms. Saves us from manually wiring up a bucnh of action creators.

## How to use Redux form:

- Identify the pieces of state of the form (form data)
- Make one 'Field' component for each piece of state, created by redux - 2- form, like input, buttons, checkbox, text, file, etc.
- User changes a 'Field' input.
- Redux form automatically handles all the changes for us.
  e.g.: it manages handler set up, set state, set value on input.
  It amanges any changes ot nay input. WE dont have to call or write a setState call, make an action creator, or set the value of the input, all that biolerplate is going to be managed by it.
- User submit the form.
- we pass 2 call backs to redux - 2-form , on for validation another for form submittal management.

## Redux-form Config

- add form state to reducers

> reducers/index.js
> import { reducer as formReducer} from 'redux - 2-form';

const rootReducer = combineReducers({
posts: PostsReducer,
form: formReducer
});

- add redux - 2-form bridge fucntion and the Field component to your form component

> posts_new.js
> import { Field, reduxForm } from 'redux - 2-form';

the reduxForm function acts as the connect function in redux - 2.
It allows he component to talk directly to the redux - 2 store / state

Wiring up

> posts_new.js

export default reduxForm({
form: 'PostsNewsFrom' // unique form ID
})(PostsNew)

> adding the comp

    <Field>
        name="title' // piece of state
        component={} // takes in a func, or another comp, that will be used to display this field.

    </Field>

    The Field component
    ---------------------
    By default it knows how to communicate with redux-form, saves us form creating event handler, action creators, etc.
    But doesnt know how to render itself.
    Field component administers the data, but the component prop renders it.

    e.g.

     renderTitleField(field){
        return (
            <div>
                <input
                    {...field.input}
                />
            </div>
        )
    }

{...field.input} means that we can use all the events handlers and properties of the input field.
like:

onChange = {field.input.onChange}
onFocus = {field.input.onFocus}
onBlur = {field.input.onBlur}

it saves us to write those event handler for example.

Validation

---

> posts_new.js
> function validateForm(values) {

    //console.log(values) // {title: 'werferw', categories: 'akjdhjsf', content: 'fwadvawdv'}

const errors = {};

// Validate the inputs from 'values'

    // If errors is empty the form is fine to submit.
    // If it has any prop, then redux assumes the form is invalid.
    return errors;

}

export default reduxForm({
validate: validateForm,
form: 'PostsNewsFrom'
})(PostsNew)

## Submit

REDUX - FORM is JUST responsible handling the state and validation of our form.
It is NOT responsible for doing whing s like take this data and save it, or post it or anything like that, thats still our responsibility.

So on submit
-> redux - 2-form: validate and if all ok call callback func defined by component:

        const { handleSubmit } = this.props; // ES6. same as const handleSubmit = this.props.handleSubmit;


        <form onSubmit={ handleSubmit(this.onSubmit.bind( this )) }>

we: take that data an do something. -> onSubmit(...) function in the component

When binding the component to redux - 2 form, it inherits a lot of porperties from redux - 2-form.
Thats why

showing errors:
{field.meta.touched ? field.meta.error : ''}
touched is the state after focus in and out a field

    Conditional Styling
    --------------------

renderField(field){
const meta = field.meta;
const { touched } = meta;
const { error } = meta;

        //or ES6 -> de-structuring objects -> const { meta: {touched, error} } = field;
        const className = `
            form-group ${ touched  &&  error ? 'has-danger' : '' }
        `;

        return (
            <div className={ className }>
                <label>{field.label}</label>
                <input
                    className="form-control"
                    type={field.type}
                    {...field.input}
                />
                <div className="text-help">
                    {touched ? error : ''}
                </div>
            </div>
        )
    }

    Buttons
    ---------
    use Link from redux-router-dom for not submitting buttons like cancel.

## Submitting

create an action creator

## Programmatic navigation

The program takes you to some place, you don't have to click a link.
Because the Route is rendering the PostsNew component, that component has access to a bunch of navigation functionality, helpers, props, etc.
To go root route: this.props.history.push('/').
WE want to only navigate to the list of posts AFTER the post has been created, we have to WAIT for the action to complete.
Solve it by adding the navigation logic, in a callback function in the action creation call.
e.g. :
instead of this:

        this.props.createPost(values);
        this.props.history.push('/');

Do this:
in the action caller component:

        this.props.createPost(values, ()=> {
            this.props.history.push('/')
        } );

        in the action:

        export function createPost(values, callBack){
            const request = axios.post(`${ROOT_URL}/posts${API_KEY}`, values)
                .then( () => { callBack } );

## Access to url params in a request call (e.g. to show a post)

This functionality is provided by react-router and allows to access the wildcard values.
e.g.

<Route path="/posts/:id" component={PostsShow} />

redux - 2-router lets u get them using this.props.match.params.id

## manipulating state in the mapStateToProps function

remember the params in the fcn.

function mapStateToProps(state, ownProps){

    const post = posts[ownProps.match.params.id];
    return { post: post };

}

ownProps: is the props object that is going to the component render method.
You can use it
So, you can use mapStateToProps function to select some small pieces of state from the main state object AND do some calculations to separate concerns (e.g. to avoid the data dependency of the PostsShow component on the full posts array, and only pass the post we need to render to the render method)

## Caching records

    componentDidMount(){
        // Once you first run this PostsShow component, you may already have
        // the post in your props, like this.props.post, if you DON'T want to re-fetch the post you
        // can put a condition here before fetching it like:
        // if (! this.props.post) { fetch it }
        // But be careful with that, the object may have been updated in the back end, so you may
        // always need the latest ...

        const postId = this.props.match.params.id; // react-router provides us this state from the request url
        this.props.fetchPost(postId);
    }

    Deleting records
    ------------------

    export default function (state = {}, action) {


    switch (action.type) {
        case FETCH_POSTS:
            const postsObj = _.mapKeys(action.payload.data, 'id');
            return postsObj;
        case FETCH_POST:
            // ES5
            // const post = action.payload.data;
            // const newState = { ...state};
            // newState[post.id] = post;
            // const postObj = _.mapKeys(action.payload.data, 'id');

            //ES6
            return { ... state, [ action.payload.data.id ] : action.payload.data };
        case DELETE_POST:
            // we know that after a post deletion we will programmatically redirect to the posts list,
            // or posts_index. So we could rely on the posts re-fetching done in the posts_index component
            // to update the list of posts in our state and after the deletion of the post your will see an
            // updated list of posts.
            // But it could be more consistent if the responsibility to remove that piece of data from
            // the state stays inside the reducer, the state manager, here.
            // action.payload is the post id. as defined in deletePost func action creator.
            return _.omit(state, action.payload);
        default :
            return state
    }

}

# ASYNCH AJAX, PROMISES management and DIPATCH manipulation, with axios and redux-thunk

## AJAX CALL WITH AXIOS, a library to make ajax requests from the browser.

npm install --save axios
https://github.com/mzabriskie/axios

==================================================
react-redux - 2 by default manages synch changes
redux - 2 createas an action immediately after the api call creation, does not wait for it to come back.
In vanilla redux - 2, the action creator is expected to return an action object to pass to the reducers through the middleware and dispatch.

> actions/index.js

export function fetchPosts(){
const request = axios.get(`${ROOT_URL}/posts${API_KEY}`);
return {
type: FETCH_POSTS,
payload: request
};
}

In the action creator, when you create an action and return it, Redux, behind the scenes, passes that action to a function or method called
"dispatch", which takes care of all the steps using the middelware, and makes sure the action gets sent to all reducers (see react-redux - 2-cycle.png)

Redux thunk enables one more return type: a plain JS function.

export function fetchPosts(){
const request = axios.get(`${ROOT_URL}/posts${API_KEY}`);

    return (dispatch) => {
        request.then( ({data}) => {
            dispatch({
                type: 'FETCH_POSTS',
                payload: data
            })
        })
    }

}

## e.g.

import axios from 'axios';
import { USER_LOGIN } from './types';

const API_ROOT_URL =
'https://uk5iapwoil.execute-api.ap-southeast-2.amazonaws.com/techtest';

/\*

- Signs in the user with JWT
  \*/
  export function signInUser({ username, password, domain }) {
  // We use redux - 2 thunk to allow us to manipulate the dispatch,
  // e.g. many async actions
  // inside of an action creator, or delaying the action dispatch till a ajax
  // request has returned.

// Submit credentials to the server
console.log(`Login in with credentials:
   username: ${username}
   password: ${password}
   domain: ${domain}`);

//we use axios to generate promises, an Ajax request in this case
const request = axios.post(`${API_ROOT_URL}/token`, {
username,
password,
domain,
});

// action to be dispatched only when async request returns,
// thats why we use redux - 2-thunk, to manipulate the action dispatch timing,
// reassuring that
// when the reducer receives the action, it has the data that came back from
// the async call ...
return dispatch => {
console.log(`POSTING to get Token ...`);

    request
      .then(data =>
        dispatch({
          type: USER_LOGIN,
          payload: data,
        }).catch(({ code, message }) => {
          console.log(`ERROR IN LOGIN - code ${code} message: ${message}`); // dispatch catch
        }),
      )
      .catch(function(error) {
        console.log('Error trying to get the token: ', error); // then catch
      });

    //TODO
    // If request is good ...
    // - Update state to indicate user is authenticated
    // - Save the JWT token
    // - redirect to the route '/games'

    //TODO
    // If request is bad ...
    // Show error to the user

};
}

## REDUX AND FIREBASE

see redux_vs_firebase.png

So, here, we are going to wait for the request to be resolved and it will return some data, and only when its actually resolved I am going to dispatch and action.

redux - 2 - thunk allows you to access that method, the dispatch method.
The dispatch is like a funnel. (see actions_getting_dispatched.png)

firebase sends value events each time the data has changed.

All the magic is wired in the action creator.
We ant to catch firebase events and transform them into actions.
We need redux - 2 -thunk for that.

So .

> actions/index.js

import Firebase from 'firebase';
import \_ from 'lodash';
import {
FETCH_POSTS,
} from './types';

const Posts = new Firebase('https://fbredux.firebaseio.com/'); // Post reference from firebase

/\*

- Returns a function, as we should be using redux - 2-thunk for this react -> redux - 2 -> firebase
  scenario.
  Redux-thunk is going to invoke the returned function and pass in the redux - 2 'dispatch' method.
  \*/
  export function fetchPosts() {
  return dispatch => {
  Posts.on('value', snapshot => {
  // Whenever we get a value event from the firebase reference.
  // we instantly dispatch an action with the payload coming form the snapshot
  dispatch({
  type: FETCH_POSTS,
  payload: snapshot.val()
  });
  });
  };
  }

## Deleting

key is the id of the element to delete.
We return a callback function to thunk, and when it's executed in the dispatch, we tell the firebase reference (Post), to remove the element by its key.
With the magic of firebase, when we remove the element form the reference we will have a value event coming back from the reference , thus fetchPosts will be executed and we dont have to call it !

export function deletePost(key) {
return dispatch => Posts.child(key).remove();
}

## Creating a post

same same as delete but with "push"
export function createPost(post) {
return dispatch => Posts.push(post);
}

## Summary

The challenge of getting redux - 2 and firebase together is tow fold

- Firebase actually pushes its react-fire library for this purpose, but it is not compatible with redux - 2, and its working cycle.

- Second, firebase depends on a event based flow of data, whre redux - 2 is cause-effect (actions are called when something happens)

We merged these two libraries by using redux - 2-thunk, everytime we get the value event from the firebase reference, we set a new action off to our reducers whcih contains our new list of posts.

==================================================================

## redux-form Dynamic forms

import { reduxForm } from 'redux - 2-form';

// creates a redux - 2-form with a name, some fields and they have to be
// validated using our defined validate func.
export default reduxForm({
form: 'PostsNew',
fields: \_.keys(FIELDS),
validate
}, null, { createPost })(PostsNew);

renderField(fieldConfig, field){
const fieldHelper = this.props.fields[field];
}

The fieldHelper object is the object provided by react-form. I get 1 helper per field defined in the --> fields: \_.keys(FIELDS).

======================================================================
Logicless components with reselect

---

Calculated pieces of state, form two or more pieces of states, and we care about the value or the result of these pieces of states.

Selectors: take pieces of states, do some calcs with them and spits data.

It is like a sql view.
Avoid using a component to mix, or filter state ... it is not reusable, and creates a high coupled dependency between the component and the data.

Avoids duplictaing posts models

/_
Reselect selector.
Takes a list od posts and posts ids, and picks out the selected Posts.
_/

import {createSelector} from 'reselect';
import \_ from 'lodash';

// Create select functions to pick off the pieces of state we care about.
// for this calculation.
const postsSelector = state => state.posts;
const selectedPostsSelector = state => state.selectedPostIds;

const getPosts = (posts, selectedPostIds) => {
const selectedPosts = _.filter(
posts,
post => _.contains(selectedPostIds, post.id)
);

    return selectedPosts;

}

export default createSelector(
postsSelector, // state 1, pick off a piece of state
selectedPostsSelector, // state 2, pick off a piece of state
.... // state n
getPosts // last argument is the calc function, that has our select logic, and all the previous arguments are going to be passed to it as params.
);

=======================================================
Data loading in Redux

---

Calling action creators

Something need to call an action creator whnever we want to fetch our data.

At what point in our app are we going to call it ?

Many ways,

- Most common is componentWillMount lyfecycle method. Thats the suggested way to do it by the react-router documentation.
  In this case the component is responsible to fetch its own data.
  It has dependencies on the action creators.
  It could not be the best approach to create reusable components.
  If I want to reuse the component somewhere els ein my application, e.g. another page.
  AS soon as I place this component somewhere else in the app, I am implicitly saying, yes I want to fetch the data (because the fetching is inside the componentWillMount lifecycle method ... )
  So if I want to reuse this list, but with a different data, instead of photos maybe posts, I cant, as this component will only fetch photos.

- a more reusable approach could be to attach the data fetching not to a react component life cycle method, but outside the component.
  In a react-router, there is a callback method, onEnter. It is attached to each individual route.

Means that every time the route is requested in the url, this component method will be called.

It is defined as a prop in the Route component.

onEnter(callbackFunc)

So the data fetch, action creator, is triggered by the route being called, not the mounting of the component.

The Route defines who is going to be rendered, and now it defines also what action is going to be called to fetch data !!! now we can cahnge the component or the data, and make the component more reusable as it does not depends anymore on a certain action creator.

        -> with componentwillmount strategy:

            <Route path="photos" component={Photos} />

        the data was fetch inside the component, the component was tied to an action creator.

          componentWillMount() {
            this.props.fetchPhotos();
          }

        -> with the react-router onEnter strategy

        <Route path="photos" component={Photos} onEnter={onPhotosEnter} />

            onPhotosEnter is a Route callback defined in the routes directory:

                > routes/route_callback.js

                import store from '../store';
                import { fetchPhotos } from '../actions';

                export function onPhotosEnter() {
                  store.dispatch(fetchPhotos());
                }

            The action creator is dispatched (using thunk) inside the onPhotosEnter func (route callback) and is independent of the component that is using it !

            of course we remove

                componentWillMount() {
                    this.props.fetchPhotos();
                }

                and the action creator wiring
                    before>
                        export default connect(mapStateToProps, actions)(UserList);
                    after>
                        export default connect(mapStateToProps)(UserList);

                from the component, we don't need these anymore.
                (we keep our dependency on the data/state of course)

    With this strategy I can change what component I show when someone asks for the photos, I can change the rendering component, and I can guarantee that Im gonna have access to my photos data.
    the component is more reusable.

===========================================================================
ANIMATION OF REACT COMPONENTS
-------------------------------
react has css-transition groups to animate list of items.
It is a component like any other.

ReactCSSTransitionGroup
Add/removal animation
It uses classes:

- initial state
- animation in -> enter
- animation out -> leave

## config

render() {
const transitionOptions = {
transitionName: "fade",
transitionEnterTimeout: 500,
transitionLeaveTimeout: 500
};

    return (
      <div>
        <button onClick={this.onAddClick.bind(this)}>Add</button>
        <ul className="list-group">
          <ReactCSSTransitionGroup {...transitionOptions}>
            {this.renderQuotes()}
          </ReactCSSTransitionGroup>
        </ul>
      </div>
    );

}

## css

class is .transitionName-startingState(e.g. enter) or endingState (eg. leave) - staringStyle or endingStyle

/_ starting state of animation _/
.fade-enter {
transform: rotateX(90deg) rotateZ(90deg);
opacity: 0;
/_right: 1000px;_/
}

/_ end state of animation _/
.fade-enter-active {
transform: rotateX(0deg) rotateZ(0deg);
opacity: 1.0;
/_right: 0px;_/
transition: .4s ease-in all;
}

.fade-leave {
opacity: 1.0;
}

.fade-leave-active {
opacity: 0;
transition: .5s ease-out all;
}

================================================
FOUR MOST COMMON ERRORS
================================================

1. Not exporting Components

2. Importing actions codes without curly braces
   e.g. import FETCH_IMAGES from '../actions/types';
   no error is thrown but the switch doesnt work.
   switch (actionType){
   case FETCH_IMAGES

3. Actions creation, calling axios with thunk, if you try to amp a non-existent prop in the payload as:

export function fetchPosts() {
const request = axios.get(`${ROOT_URL}/posts${KEY}`);

return dispatch => {
request.then(response => {
dispatch({
type: FETCH*IMAGES,
payload: *.map(response.data.nonexistentprop, 'thumbnailUrl')
});
});
};
}

You will get an "Uncaught (in promise) TypeError" as it says, I was inside of a prommes and something happened.

4. Same redux - 2-thunk action creating situation, returning an array of objects instead of array os strings in the payload.

export function fetchPosts() {
const request = axios.get(`${ROOT_URL}/posts${KEY}`);

return dispatch => {
request.then(response => {
dispatch({
type: FETCH*IMAGES,
payload: *.map(response.data.nonexistentprop, 'thumbnailUrl')
});
});
};
}

array of strings (works fine): payload: \_.map(response.data.nonexistentprop, 'thumbnailUrl')

array of objects (error): payload: response.data.nonexistentprop

"Uncaught (in promise) Error: Object are not valid as a React child" -> you are trying to directly render an object.
It is like doing

render(

<p>{{ color:red, backpack:'large'}}</p>
)

========================================================================
Building MODALS
========================================================================
It is tricky

1. Option 1: NAive approach
   Modal inside a component, and the model contains a child component.
   Modal works because of CSS
   And the model is shown in any level of the component rendering tree.
   As we always want to show the modal at the forefront, we may have issues with the z-index (rendering order). AS we dont know whats happening around int he component tree, the modal might not be rendered as the top z-index always.

2. Whenever we want to creata new modal, we create a fake modal in the component hierarchy, and Fake modal will create the modal on the document.body. AS a child of body, it will have no more CSS issues
   This solution breaks React. So it misses some aresourcs availability, like the Resources/store, if the modal children want to access redux - 2, they cant as they are not contained inside a Provider tag like the App.
   ReactDOM.render(
   <Provider store={store}>
   <App />
   </Provider>
   , document.querySelector('.container'));

3. third solution, same as previous bit wrap the modal children in a Provider.
   > modal.js

import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { store } from '../index';
import { Provider } from 'react-redux - 2';

class Modal extends Component {
componentDidMount() {
this.modalTarget = document.createElement('div');
this.modalTarget.className = 'modal';
document.body.appendChild(this.modalTarget);
this.\_render();
}

componentWillUpdate() {
this.\_render();
}

componentWillUnmount() {
ReactDOM.unmountComponentAtNode(this.modalTarget);
document.body.removeChild(this.modalTarget);
}

\_render() {
ReactDOM.render(
<Provider store={store}>
<div>{this.props.children}</div>
</Provider>,
this.modalTarget
);
}

render() {
return <noscript />;
}
}

export default Modal;

> app.js

import React, { Component } from 'react';
import Colors from './colors';
// import BadModal from './bad_modal';
import Modal from './modal';

export default class App extends Component {
render() {
return (
<div className="app">
<div className="left">
<h1>Hello</h1><h2>Hello</h2><h3>Hello</h3><h4>Hello</h4><h5>Hello</h5>
</div>
<div className="right">
<h1>Hello</h1><h2>Hello</h2><h3>Hello</h3><h4>Hello</h4><h5>Hello</h5>
<div>
<Modal>
<h1>A really sslong amount of Modal Content</h1>
<p>Etc.</p>
<Colors />
</Modal>
</div>
</div>
</div>
);
}
}

+++++++++++++++++++++++++++++++++++++
Ways to store data in REDUX
+++++++++++++++++++++++++++++++++++++

## POST model - ARRAY based storage:

The reducer returns an ARRAY of objects with an ID prop.
Using an array is not a good approach.

state ===
posts: [
{
id: 1,
name: 'post 1'
content: 'I am post 1'
}
{
id: 2,
name: 'post 2'
content: 'I am post 2'
}
]

## OBJECT BASED STORAGE:

state === {
posts: {

        1: {
            id: 1,
            name: 'post 1'
            content: 'I am post 1'
        }

        2: {
            id: 2,
            name: 'post 2'
            content: 'I am post 2'
        }
    }

    The keys of the data objects are the ids, which make it far easier to access and manipulate them

    Comparisson
    --------------

        Reading a record
        ------------------
            Array
            ------
            const postIdToFind = 2;
            state.posts.find(post =>
                post.id === postIdToFind
            );

            Object
            --------
            const postIdToFind = 2;
            state.posts[postIdToFind]


        Updating a record
        ------------------
            Array
            ------

            const newPost = { id: 3};

            newState.posts.filter(post =>
                post.id !== id
            );

            return [...newState, newPost];

            Object
            --------
            const newPost = { id: 3};

            return { ...state, [newPost.id]: newPost }; //ES6, spread and key interpolation, it will override any existing record with the id.

        Deleting a record
        ------------------
            Array
            ------

            const postIdToDelete = 2;

            return state.posts.filter(post =>
                post.id !== postIdToDelete
            );


            Object
            --------
            const postIdToDelete = 2;

            return _.omit(state,  postIdToDelete }; // Using lodash

In practice:

With Arrays

import { FETCH_POSTS, FETCH_POST, DELETE_POST, UPDATE_POST} from '../actions/index';

const INITIAL_STATE = [];

export default function (state = INITIAL*STATE, action) {
switch (action.type) {
case FETCH_POSTS:
const postsObj = *.mapKeys(action.payload.data, 'id');
return postsObj;
case FETCH*POST:
return *.omit(state, action.payload);
default :
return state
}

}

import { FETCH*POSTS, FETCH_POST, DELETE_POST, UPDATE_POST} from '../actions/index';
import * from 'lodash';

export default function (state = {}, action) {
switch (action.type) {
case FETCH*POSTS:
const postsObj = *.mapKeys(action.payload.data, 'id');
return postsObj;
case FETCH*POST:
return *.omit(state, action.payload);
default :
return state
}

}

========================================================================
BrowserHistory in PRoduction
========================================================================
BrowserHistory and HashHistory

see image
both tell react router waht to consider in the url to understanda s a component id.

Browser History
example.com/users
Component to show decided by whats right of the TLD

Hash History
example.com/#/users
Component to show decided by find a hash in the URL and whats right of it is the component

- BrowserHistory is for pretty URLs

- HashHistory is for throwing a react router app on top of an existing application
  localhost:8080/admin/#/users

## Routing in prod

With webpack, in dev, it takes care of mapping /users or any other url to the react app, but in prod, in a real world web server, no matter what url we ask, we are delivered to the real http address, and it usually wont be found 404.

Example of a node express server in prod:

> server.js

const express = require('express');
const path = require('path');
const port = 8080;
const app = express();

app.use(express.static(\_\_dirname));

app.listen(port);
console.log('Server started');

So, in prod, we have to tell the server that any url has to always be redirected to index.html, this html page has the bundle.js script which loads everything and boots up React Router, React Router will check the url and serve the corresponding components.

JPlayground
https://stephengrider.github.io/JSPlaygrounds/

---

========================================================
Integrating with third party libraries
========================================================
Some libraries want to create html and render it to the DOM, like google maps.

How to deal with them.
Approach:

WE have to build a custom react componenet called Wrapper, it will be responsible for interfacing with that library, in this case google maps.

We are going to be rendering some custom html that is not necessarily be managed by react. It is not something that React itself is going to render to the screen.
So the wrapper is the interface between React and the compoenent.
We render the wrapper to the DOM, and call the custom library and tell him to render himself and render it to the wrapper, and ne folloeing times it has to render the wrap, we are going to block it from renderng.

## Only render this component exactly one time

> index.html

<!DOCTYPE html>
<html>
  <head>
    <link rel="stylesheet" href="style/style.css">
    <link rel="stylesheet" href="https://cdn.rawgit.com/twbs/bootstrap/48938155eb24b4ccdde09426066869504c6dab3c/dist/css/bootstrap.min.css">

    <script src="https://maps.googleapis.com/maps/api/js?key=YOUR_GOOGLE_MAPS_API_KEY"></script>

    <style>
      html, body{
        height: 100%;
        margin: 0;
        padding: 0;
      }
      #map{
        height: 200px;
      }
    </style>

  </head>
  <body>
    <div class="container"></div>
  </body>
  <script src="bundle.js"></script>
</html>

> index.js

import GoogleMap from './components/google_map';

class App extends Component {
constructor(props) {
super(props);

    this.state = {
      lat: -34.397,
      lng: 150.644
    };

}

render() {

    return (
        <div style={{ height: '100%' }}>
            <GoogleMap lat={this.state.lat} lng={this.state.lng}/>
          <button>New York</button>
        </div>
    );

}
}

ReactDOM.render(<App />, document.querySelector('.container'));

> google_map.js

import React, {Component} from 'react';

export default class extends Component {

    //props modified
    componentWillReceiveProps(nextProps){

    }

    // shouldComponentUpdate is executed when state or props change, or the parent component forces a re-render.
    //we don't want it to re-render every time, so we always return false
    shouldComponentUpdate(){
        return false;
    }

    // componentDidMount is only executed once
    componentDidMount(){
        this.map = new google.maps.Map( this.refs.map, {
            center: { lat: this.props.lat, lng: this.props.lng },
            zoom: 8
        });
    }
    render() {
        return (
            <div id="map" ref="map"/>
        );
    }

}

So when clicking the button, we set a new state in the app component, which is passed as new props to the GoogleMap component, which will execute componentWillReceiveProps and we are manually telling the map to update the map position, but WILL NOT RENDER as shouldComponentUpdate returns always false.

#### comment code

        {/* <Route path="/search" component={Search} /> */}

        whenusing airbnb eslint you have to leave that space before and after the asterisk
