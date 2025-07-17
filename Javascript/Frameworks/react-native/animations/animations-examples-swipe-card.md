# Defining needed props to pass to the animated component

Prop: renderCard
Type: function
Purpose: Returns JSX to show inside of a card

Prop: renderNoMoreCards
Type: function
Purpose: Returns JSX to show when no more cards exist

Prop: data
Type: array of objects
Purpose: List of records to use for cards

Prop: onSwipeRight / onSwipeLeft
Type: function
Purpose: Called when user swipes left or right on an item


# Code

The renderCard method is passed to the Dexk Component so it doesnt have to know how to render the data ... and it could eventually render anything. The rederisation belongs to the Deck Component father.
In this way we can reause its behavior, but not its layout or look and feel.

use react native elements UI package

Sequence of events 

1 - User presses screen
2 - User drags finger
3 - Card moves




## Managing gestures with PanResponder

Steps responsibility

1 - User presses screen - Handled by the Gesture system - Input from the user
2 - User drags finger - Handled by the Gesture system -  Input from the user
3 - Card moves - Handled by the Animated system - Output to the user


Questions to guide

1 - What are we touching 
2 - What component, in the components stack where the user touched, handles touch?
3 - How is the gesture changing?


Now the CARdDeck has to manage the gestures


export default class SwipeCardDeck extends Component {
    static propTypes = {
        data: PropTypes.array
    }




### Setup the responder

    constructor(props) {
        super(props);
        this._panResponder = PanResponder.create({

        });
    }

### tell it to respond

    this._panResponder = PanResponder.create({
        onStartShouldSetPanResponder: () => true;
    });

### react to events

    this._panResponder = PanResponder.create({
        onPanResponderMove: (event, gesture) => {
                debugger;
                console.log(gesture);
            },
        onPanResponderRelease: () => { }
    });



## gesture meets animation

steps again

Steps responsibility

1 - User presses screen - Handled by the **Gesture system** - Input from the user
2 - User drags finger - Handled by the **Gesture system** -  Input from the user
3 - Card moves - Handled by the **Animated system** - Output to the user

These systems are totally decoupled

react to the gesture

    this._panResponder = PanResponder.create({
        onPanResponderMove: (event, gesture) => {
            // update the position object manually, not using Animated.spring(...)
            // or any other animator method.

            this._position.setValue({ x: gesture.dx, y: gesture.dy }); // new state
        },
    });

Element responds to gestures

<View {...this._panResponder.panHandlers}>

Element responds to gestures AND is animated
<Animated.View {...this._panResponder.panHandlers}>

Element responds to gestures AND is animated AND receives styles to watch for animation

    <Animated.View 
        {...this._panResponder.panHandlers}
        style={this.state.position.getLayout()}
    >

    </Animated.View>

At this point the Animated.View  gets passed the position object current layout, 
and the animated.view takes over from there, it should recognize that it was passed an aobject that represents the position it should be, and listen to changes to that and act accordingly (move itself around)

## break down the gesture for each card independently

### option 2
only drag first card

import React, { Component } from 'react';
import { Animated, View, StyleSheet, PanResponder } from 'react-native';
import PropTypes from 'prop-types';


export default class SwipeCardDeck extends Component {
    static propTypes = {
        data: PropTypes.array
    }

    constructor(props) {
        super(props);

        this._position = new Animated.ValueXY(); // 1 - where is it?

        this._panResponder = PanResponder.create({
            onStartShouldSetPanResponder: () => true,
            onPanResponderMove: (event, gesture) => {
                // update the position object manually, not using Animated.spring(...)
                // or any other animator method.

                this._position.setValue({ x: gesture.dx, y: gesture.dy }); // new state
            },
            onPanResponderRelease: () => { }
        });
    }

    render() {
        const { data, renderCard } = this.props;
        return (
            <View>
                {data.map((item, index) => {
                    if (index === 0) {
                        return (
                            <Animated.View
                                {...this._panResponder.panHandlers}
                                style={this._position.getLayout()}
                            >
                                {renderCard(item)}
                            </Animated.View>
                        )
                    }
                    else return renderCard(item)
                })}
            </View>
        );
    }
}


### and rotate it with interpolation
we also wnat to transition the rotation of the element, not only the position.
Note that there is a linear relationship between dx, distance moved on x, and the rotation, as you star to drag it to the right more, the card start to rotate more. 

This will need more math calculations so better use a helper
We can move all the animated styling to a helper method.


First approach: use a static value

    getCardStyle() {
        // object that returns the exact location of the element
        const position = this._position.getLayout();
        const transform = [{ rotate: '45deg' }];
        return {
            ...position,
            transform
        };
    }

    <Animated.View
        ...
        style={this.getCardStyle()}
    >

Second approach, rotation change while the position changes
Enters interpolation
Interpolation is the interaction between 2 properties of the animated style.
dx -> rotation
dx -> color
dx -> size
input prop -> output prop


**We have to relate the distance that the card moves on the x axis, to the amount of rotation degrees**

We use the interpolate function of the Animated.Value

It associates 2 scales

    -500 in x axis -> -120 deg rotation
    0 in x axis -> 0 deg rotation
    500 in x axis -> 120 deg rotation


    getCardStyle() {
        // object that returns the exact location of the element
        const position = this._position.getLayout();

        // interpolation setup (relationship)
        // this._position is an Animated.ValueXY() object
        const rotateInterpolation = this._position.x.interpolate({
            inputRange: [-500, 0, 500],
            outputRange: ['-120deg', '0deg', '120deg']
        })

        const transform = [{ rotate: rotateInterpolation }];
        return {
            ...position,
            transform
        };
    }

#### do not harcode
actual width of the device will be the definition of the x position
so the x range should be related with the screen size


import { Dimensions } from 'react-native';

const SCREEN_WIDTH = Dimensions.get('window').width;

export default class SwipeCardDeck extends Component {

    const rotateInterpolation = this._position.x.interpolate({
        inputRange: [-SCREEN_WIDTH, 0, SCREEN_WIDTH],
    })

If it looks like rotating too much, increase the range of the x axis
so it takes more distance to increse the rotation

    inputRange: [-SCREEN_WIDTH * 1.5, 0, SCREEN_WIDTH * 1.5],

If you want to increase the rotation you can play with the x axis range like a spinning see: 

    inputRange: [-50, 0, 50],


### and make it go back on release, stops the gesture

remember to start the animation after setup


    constructor(props) {
        super(props);

        this._position = new Animated.ValueXY(); // 1 - where is it?

        this._panResponder = PanResponder.create({
            onPanResponderRelease: () => {
                this.resetPosition();
            }
        });
    }


    resetPosition() {
        // programatically change the position of an element with Animated.spring
        // remember to start the animation after setup
        Animated.spring(this._position, {
            toValue: { x: 0, y: 0 }
        }).start();
    }

### and make it go away when has reached a certain distance ...


First step , detect the distance dragged and console.log

    constructor(props) {
        super(props);

        this._position = new Animated.ValueXY(); // 1 - where is it?

        this._panResponder = PanResponder.create({
            onPanResponderRelease: (event, gesture) => {
                if (gesture.dx > SWIPE_THRESHOLD) {
                    console.log('Swipe Right !');
                } else if (gesture.dx < -SWIPE_THRESHOLD) {
                    console.log('Swipe Left !');
                } else {
                    this.resetPosition();
                }
            }
        });

Now when it reaches those points, make the card exit and put next in line

Well need some more helper functions



         onPanResponderRelease: (event, gesture) => {
                if (gesture.dx > SWIPE_THRESHOLD) {
                    // console.log('Swipe Right !');
                    this.forceCardOut('right');
                } else if (gesture.dx < -SWIPE_THRESHOLD) {
                    // console.log('Swipe Left !');
                    this.forceCardOut('left');
                } else {
                    this.resetPosition();
                }
            }
        });
    }


    forceCardOut(side) {
        // negative x position is to the left
        const xPosition = side === 'right' ? SCREEN_WIDTH : - SCREEN_WIDTH;

        // programatically change the position of an element with Animated.timing
        // timing has a linear movement feeling, not bouncing
        Animated.timing(this._position, {
            toValue: { x: xPosition, y: 0 }, // out of the screen
            duration: SWIPE_OUT_DURATION
        }).start();
    }

### and make the next card into the deck
animation completes ...

may we prep the next one?
gothca, 
If you do it directly after the forced card is out in the same method, weird behavior, as we have to wait for the card to finish animation before putting a new one there (in the 0 position of the cards array) ...

Use a callback of the start(...) method to execute something when the animation is complete.



    forceCardOut(side) {
        // negative x position is to the left
        const xPosition = side === 'right' ? SCREEN_WIDTH : - SCREEN_WIDTH;

        // programatically change the position of an element with Animated.timing
        // timing has a linear movement feeling, not bouncing
        Animated.timing(this._position, {
            toValue: { x: xPosition, y: 0 }, // out of the screen
            duration: SWIPE_OUT_DURATION
        }).start(() => this.onSwipeComplete(side));
    }

    onSwipeComplete(side) {
        
        // console.log('onSwipeComplete to the side: ', side);
        
        // now we can use the props defined in the reusable ocmponent API
        const { onSwipeRight, onSwipeLeft } = this.props;
        
        side === 'right' ? onSwipeRight() : onSwipeLeft(); 
        
        // and how do I tell the father the item that is being swiped? need some state
    }



We may need to track the selected swiped item from the data collection.
Components state needed.






