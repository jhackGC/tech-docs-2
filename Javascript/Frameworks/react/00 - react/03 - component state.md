
# STATE

State is a plain javascript object that is used to record and react to user events.
Each Class based coponent has its own state object.
WHENEVER THE STATE CHANGES the COMPONENT GETS RE-RENDERED (and forces its children to re-render as well)
Initialises in the constructor method.

initialising state by assigning a new object.

    constructor(props){
        super(props);
        this.state = {term : ''};

    }

Only time when you update your state like this, is in the constructor:  this.state = {term : ''};
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


manipulating state in the mapStateToProps function
-----------------------------------------------------
remember the params in the fcn.

function mapStateToProps(state, ownProps){

    const post = posts[ownProps.match.params.id];
    return { post: post };

}

ownProps: is the props object that is going to the component render method.
You can use it
So, you can use mapStateToProps function to select some small pieces of state from the main state object AND do some calculations to separate concerns (e.g. to avoid the data dependency of the PostsShow component on the full posts array, and only pass the post we need to render to the render method)


Caching records
-------------------

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

