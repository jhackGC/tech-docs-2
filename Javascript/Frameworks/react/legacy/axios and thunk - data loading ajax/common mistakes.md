common mistakes


================================================
FOUR MOST COMMON ERRORS
================================================

1) Not exporting Components

2) Importing actions codes without curly braces
e.g. import FETCH_IMAGES from '../actions/types';
no error is thrown but the switch doesnt work.
switch (actionType){
    case FETCH_IMAGES

3) Actions creation, calling axios with thunk, if you try to amp a non-existent prop in the payload as:

export function fetchPosts() {
  const request = axios.get(`${ROOT_URL}/posts${KEY}`);

  return dispatch => {
      request.then(response => {
        dispatch({
            type: FETCH_IMAGES,
            payload: _.map(response.data.nonexistentprop, 'thumbnailUrl')
        });
      });
  };
}

You will get an "Uncaught (in promise) TypeError" as it says, I was inside of a prommes and something happened.

4) Same redux - 2-thunk action creating situation, returning an array of objects instead of array os strings in the payload.

export function fetchPosts() {
  const request = axios.get(`${ROOT_URL}/posts${KEY}`);

  return dispatch => {
      request.then(response => {
        dispatch({
            type: FETCH_IMAGES,
            payload: _.map(response.data.nonexistentprop, 'thumbnailUrl')
        });
      });
  };
}


array of strings (works fine): payload: _.map(response.data.nonexistentprop, 'thumbnailUrl')

array of objects (error): payload: response.data.nonexistentprop

"Uncaught (in promise) Error: Object are not valid as a React child" -> you are trying to directly render an object.
It is like doing

render(
<p>{{ color:red, backpack:'large'}}</p>
)

