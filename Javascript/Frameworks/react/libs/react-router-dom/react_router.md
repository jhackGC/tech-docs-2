# REACT - ROUTER

Access to url params in a request call (e.g. to show a post)
------------------------------------------------------------
This functionality is provided by react-router and allows to access the wildcard values.
e.g.

<Route path="/posts/:id" component={PostsShow} />

redux - 2-router lets u get them using this.props.match.params.id


The React Router project has been broken up in a couple of diff libraries.

react-router-dom@4.0.0 contains the react-router related to working with the DOM, as opposed to other platforms, like react-native.

Make sure you use the correct version 4.0.0, this library changes frequently and breaks.
to install run > npm install --save react-router-dom@4.0.0

## What does it do?

It is using a library called history, what history does is interacting directly with the browser API.
So react-router suports all the back and history actions of the browser. 

Traditional: Web pages work as a request to webserver, and html page back, user choses another url, url changed, and another request is done and another page served.

React Router: intercepts url changes, does not change the page, but according to the url It will return a specific 
set of components to render.
The request is analised by a History element, that tells react-route that the url has changed, react-route picks up the components for that url and serves them to react to be rendered. No request to the server done in the traditional way (of course we may have API calls).

BrowserRouter: piece of code that interacts with the History library.

The Router wraps the routes.There are many types  of routers, browser, hash, etc.

Route: The workhorse. This Object is a React component that we can render inside any other React component. Provides the config to map url to set of components.
Shows or hides a child component depending on the URL

    import React from 'react';
    import ReactDOM from 'react-dom';
    import { Provider } from 'react-redux';
    import { createStore, applyMiddleware } from 'redux';
    
    import App from './components/app';
    import reducers from './reducers';
    import { BrowserRouter, Route } from 'react-router-dom';
    
    const createStoreWithMiddleware = applyMiddleware()(createStore);
    
    class Hello extends React.Component {
        render(){ return <div>Hello! </div> }
    }
    
    class Goodbye extends React.Component {
        render(){ return <div>Goodbye! </div> }
    }
    
    ReactDOM.render(
      <Provider store={createStoreWithMiddleware(reducers)}>
        <BrowserRouter>
            <div>
                Header
                <Route path="/hello" component={Hello}/>
                <Route path="/bye" component={Goodbye}/>
            </div>
        </BrowserRouter>
      </Provider>
      , document.querySelector('.container'));

## Routers



- HashRouter

Every url that start with # is managed by router.

        http://localhost:8080/#/
        http://localhost:8080/#/search

Shows always a hash in the url to avoid confusing your app serving web server 

        http://localhost:8080/#/


- BrowserRouter
If you got tired of the hash thing and want to show SEO friendly urls...
Change the router

        import { BrowserRouter, Route } from 'react-router-dom';
        
        const App = () =>
            <BrowserRouter>
                <div className="app">
                    <Route exact path="/" component={Landing} />
                    <Route path="/search" component={Search} />
                </div>
            </BrowserRouter>;

And go to the webpack file and add historyApiFallback : true in the devServer

    devServer: {
        publicPath: '/public/',
        historyApiFallback: true
    },
    
It tells the webpack server that if it does not recognize something send it back to the client to me managed.
Let the client worry about the routing
Restar the server and ...
> 404s will fallback to index.html

#####not to be used in prod.


if you really want ot manage a 404 error, do it as a route in the client.

    const FourOhFour = () => <h1>404</h1>;
    
    const App = () =>
      <BrowserRouter>
        <div className="app">
          <Route exact path="/" component={Landing} />
          <Route path="/search" component={Search} />
          <Route component={FourOhFour} />
        </div>
      </BrowserRouter>;

If nothing matches render fourohfour, actually fourohofur matches everything ... so it will always render.
But we have to add a Switch component, that says, render exactly one component





## Route Design

The route url is another piece of state of our application ... it tells us things ...
See it this way, whenever the url changes we want to fectch something, show something or list something, so when the url acts as a piece of state.
e.g  By setting the url to /posts/5 we tell the app to show the post 5, so the url shows tha same info as the "activePost" piece of state in our state. So is like the satte is duplicated.
We may not need the "activePost" piece of state in the state, we can take the url and the list of posts and resolve it.
So the url does provide the active post id , so we don't need the extra piece of state with an activePost data.

why storing posts in arrays? easier in objects. Easier to find by key, objects are associative arrays.

History tell router

## REACT-ROUTER BUG
ReactDOM.render(
  <Provider store={createStoreWithMiddleware(reducers)}>
    <BrowserRouter>
        <div>
            <Route path="/" component={PostsIndex} />
            <Route path="/posts/new" component={PostsNew} />
        </div>
    </BrowserRouter>
  </Provider>
  , document.querySelector('.container'));

    It renders both PostsIndex and PostsNew components !!!!
    Router analyses path loosely. FIX: use the switch component and put the more specific first.



## e.g. ADD A NEW POST
1 - scaffold 'PostsNew' component. Create class with render() and export.
2 - Add route config -> <Route path="/posts/new" component={PostsNew} />
3 - Add navigation between index and new -> Use the LInk component
4 - add form to PostsNew
5 - Make action creator to save post


## LINK component
We don't really use links in a SPA.
To do navigation with react-router we use  a link comp.
It actually creates a <a> tag, a html anchor link, but suppresses some of the behavior.
