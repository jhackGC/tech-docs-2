modals




========================================================================
Building MODALS
========================================================================
It is tricky

1) Option 1: NAive approach
Modal inside a component, and the model contains a child component.
Modal works because of CSS
And the model is shown in any level of the component rendering tree.
As we always want to show the modal at the forefront, we may have issues with the z-index (rendering order). AS we dont know whats happening around int he component tree, the modal might not be rendered as the top z-index always.

2) Whenever we want to creata new modal, we create a fake modal in the component hierarchy, and Fake modal will create the modal on the document.body. AS a child of body, it will have no more CSS issues
This solution breaks React. So it misses some aresourcs availability, like the Resources/store, if the modal children want to access redux - 2, they cant as they are not contained inside a Provider tag like the App.
ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>
  , document.querySelector('.container'));


  3) third solution, same as previous bit wrap the modal children in a Provider.
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
    this._render();
  }

  componentWillUpdate() {
    this._render();
  }

  componentWillUnmount() {
    ReactDOM.unmountComponentAtNode(this.modalTarget);
    document.body.removeChild(this.modalTarget);
  }

  _render() {
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