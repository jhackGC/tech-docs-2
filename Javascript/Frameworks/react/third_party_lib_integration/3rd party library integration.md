3rd party library integration

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

    <script src="https://maps.googleapis.com/maps/api/js?key=<KEY>"></script>

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
