# Rect Native Animations

https://facebook.github.io/react-native/docs/animations

# Intro - Animation Systems

## LayoutAnimation
- Easy to setup, easy animations size, move elements in straight lines
- Not much control, not much fine grain control
- Some things might get animated that we don't want to be
  
## Animated
- Far more complicated to setup
- Allows for more complicated animations
- You will probably need this if you want to handle gesture animations



# Basics - Describe a moving animation

The component has a state, a style, that will TRANSITION somehow from an inital state/style to a final state/style.

Three values required to describe a moving animation

1 - Where is the item right now (at time = 0 s)? Exact X and Y position on the screen
    Basically: Where that element should be at any given time?
2 - Where is the element moving to/end size/end shape?
    Basically: What's the end goal of this animation? (look like, position, color, size, etc.)
3 - Which element are we moving/animating?

You can probably apply these questions to any animation
1 - current state (size/color/position)
2 - final state (size/color/position) -> the anim goal
3 - which element we are intending to apply the animation

## Animated module props

The animated module

- **Values** module object: Describes the current state the element should be on the screen. WHAT's the current position of the element being animated? It contains two smaller properties that help us to describe what the current position/state  
    - Value
    - ValueXY
    - 
- **Types** module: HOW is the animation changing? How will in transition? It has the objects 
    - Spring
    - Decay
    - Timing
    - 
- **Components** module: WHO - Apply the animation's current position to an actual component. It has the objects
    - View
    - Text
    - Image


# Gotcha with animations

Workflow used for making any type of change to a component in React:

1 - Get initial state (setup up inside the component, or from redux or any other state manager)
2 - Render component
3 - Update state (component setState, or redux store)
4 - Component re-renders


But, for Animated we change the state by setting the style ! but never worked on the Animated.View state.
So, the Animated system works COMPLETELY DIFFERENT from the React component.
THe component is rendered once and then we dont re set the state to show the circle positioning changes.


How it works:

## Component Hierarchy
Ball component has inside a Animated.View and passes it AnimatedXY as prop.
    render()
        <Animated.View style={this.position.getLayout()}> // where this.position = new Animated.ValueXY(0, 0);

## Component lifecycle

    1 - Ball + Animated.View rendered

    2 - Animated.View inspects its props, finds animated value, knows now that it got something (the result os new Animated.ValueXY(0, 0)) that will start changing over time

    3 - ValueXY starts changing, because this is executed in the constructor(). How it is animated, .spring(...) animates the TRANSITION form one state to the other.
            
            Animated.spring(this.position, {
                toValue: { x: 200, y: 400 }// 2 - where is it moving to? how are we animating?
            }).start();

    4 - The Animated View watches the passed style, so it sees that the ValueXY is changing

    5 - So, as ValueXY is changing it start updating its styling too





# Animate.View/Image/Text uses styles to animate (like opacity an height)

The component has a state, a style, that will TRANSITION from an inital state/style to a final state/style.

The initial state is set

The Animated component (View/Image/Text) receives styles that it will watch for changes.

When those styles get changed, animated, the Animated component sees that and chaneges itself accordingly.


This function has attributes that you can set such as easing and duration.

// define an animated value, any property bound to this animatedValue will be affected by the animation action ?
    
    state = {
        fadeAnimValue: new Animated.Value(0),  // Initial value for anyone using this animated value
    }

// render, is a special View that can be Animated, which receives a style with animated values bound to them
    
    <Animated.View                      // Special animatable View that can use Animated values
        style={{
          opacity: state.fadeAnimValue,  // Bind style property (e.g. opacity) to animated value
        }}
    >
    </Animated.View>

// actioning the animation after render (componentDidMount)


     componentDidMount() {
        Animated.timing(                  // Animate over time
            this.state.fadeAnimValue,            // The animated value to drive, anything bound to this will be animated
            {
                toValue: 1,                   // Animate to: 1
                duration: 10000,              // Make it take a while, 10s.
            }
        ).start();                        // Starts the animation
     }

     So, the style properties bound to the driven value -> this.state.fadeAnimValue (e.g. the opacity of the Animated.View), 
     will transition from their current value to the toValue in the duration defined.

     we can bind as many props as we want, e.g. height and width: 

// initial value for animated value
    
    constructor() {
        this.state = {
            animatedValue: new Animated.Value(100)
        }
    }

// render, values binding

    render() {
        // the style to be animated
        const animatedStyle = {
            height: this.state.animatedValue,
            width: this.state.animatedValue
        };
        return (
                <Animated.View style={animatedStyle} />
        );
    }

// actioning

    componentDidMount() {
        Animated.timing(this.state.animatedValue, {
            toValue: 300,
            duration: 5000,
            easing: Easing.bounce
        }).start();
    }


# Gesture system

https://facebook.github.io/react-native/docs/panresponder


1 - What are we touching 
2 - What component, in the components stack where the user touched, handles touch?
3 - How is the gesture changing?

Traditionally we set up the PanResponse in the components constructor.

export default class SwipeCardDeck extends Component {
    static propTypes = {
        data: PropTypes.array
    }

    constructor(props) {
        super(props);
        const panResponder = PanResponder.create({

        });
        this.state = { panResponder };
    }


Official doc uses state to store the panResponder, but we wont change it ever and does not really belongs to the components state system, it could have been simply set as a variable like


    export default class SwipeCardDeck extends Component {
        constructor(props) {
            super(props);
            const panResponder = PanResponder.create({
                onStartShouldSetPanResponder: () => { },
                onPanResponderMove: () => { },
                onPanResponderRelease: () => { }
            });
            this.panResponder = panResponder;
        }

and use it from the render method as well.

## PanResponder lifecycle callback functions

    const panResponder = PanResponder.create({

    });

    ** NOTE: BE VERY CAREFUL WITH FUNCTIONS SPELLING, ANY ERROR = WORLD OF PAIN **

    ** NOTE: BE VERY CAREFUL TO SETUP THE FUNCTIONS THAT LISTEN TO GESTURES IN TRUE **

        // Ask to be the responder:
        onStartShouldSetPanResponder: (evt, gestureState) => true,
        onStartShouldSetPanResponderCapture: (evt, gestureState) => true,
        onMoveShouldSetPanResponder: (evt, gestureState) => true,
        onMoveShouldSetPanResponderCapture: (evt, gestureState) => true,



### onStartShouldSetPanResponder
Trigered any time the user taps/presses on the screen

If we return true, we say that we want this panResponder instance is to be responsible about handling that gesture.

    const panResponder = PanResponder.create({
        onStartShouldSetPanResponder: () => true,
    });

### onPanResponderMove
Called everytime it moves while being moved

onPanResponderMove: (event, gesture)

event 

gesture: what is it doing? how fast?


### onPanResponderRelease
User releases the responder.


## PanResponder involvement with visual element

I want each card to have its own panResponder so it moves independently form the others

    <View {...this.state.panResponder.panHAndlers}>

Give the View all the callbacks taht exist on the  panHAndlers objects


## console log the gesture
it is shown in the console but when expanded all values go to 0.
the console.log(gesture)
the gesture is being reused by React, so all the logged gestures are actually the same object reused in memory.

on each call to 

    onPanResponderMove: (event, gesture) => {
        console.log(gesture);
    },

it takes the gesture object, reuses it, updates it props and sends it to the method

## gesture info

dx and dy: delta. Total distance for the lifecycle, the dist the user has moved its finger on a single gesture, click -> drag -> release.

moveX and moveY, place where the clicker is clicking on the panReponder element. e.g. where in the card is clicking.

vx and vy, show the velocity of the gesture

x0 and y0, detailed moveX and moveY values

numberOfActiveTouches: for detecting multitouch





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



# Troubleshooting
Slow animations 
    
    on Android emulator:
    - disable JS debugging or put it in a foreground browser tab, active
    - disable hot realoading
    
    on iOS simulator
    - see Simulator -> Debug -> Slow animations


