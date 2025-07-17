animation


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

config
------
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

css
---
class is    .transitionName-startingState(e.g. enter) or endingState (eg. leave) - staringStyle or endingStyle


/* starting state of animation */
.fade-enter {
  transform: rotateX(90deg) rotateZ(90deg);
  opacity: 0;
  /*right: 1000px;*/
}

/* end state of animation */
.fade-enter-active {
  transform: rotateX(0deg) rotateZ(0deg);
  opacity: 1.0;
  /*right: 0px;*/
  transition: .4s ease-in all;
}

.fade-leave {
  opacity: 1.0;
}

.fade-leave-active {
  opacity: 0;
  transition: .5s ease-out all;
}