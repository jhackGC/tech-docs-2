programmatic navig
Programmatic navigation



Programmatic navigation
-----------------------
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

