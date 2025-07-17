# AJAX

## Who is responsible to fetch?

- React uses a downwards data flow
- The higher/outer/most parent component is responsible for fetching data.

# ASYNCH AJAX, PROMISES management and DIPATCH manipulation, with axios and redux-thunk

# AJAX CALL WITH AXIOS

A library to make ajax requests from the browser.
npm install --save axios
https://github.com/mzabriskie/axios

# react-redux by default manages synch changes

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
"dispatch", which takes care of all the steps using the middleware, and makes sure the action gets sent to all reducers (see react-redux - 2-cycle.png)

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

console.log(`Login in with credentials: username: ${username} password: ${password} domain: ${domain}`);

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
