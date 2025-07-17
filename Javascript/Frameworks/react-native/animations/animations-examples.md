# Rect Native Animations

https://facebook.github.io/react-native/docs/animations


# Animated.timing

    import React from 'react';
    import { Animated, Easing, } from 'react-native';
    import { View, StyleSheet } from 'react-native';

    export default class FadeOutView extends React.Component {
        constructor() {
            super();
            this.state = {
                animatedValue: new Animated.Value(1)
            }
        }

        componentDidMount() {
            this.startBoxAnim();
        }

        startBoxAnim() {
            Animated.timing(this.state.animatedValue, {
                toValue: .3,
                duration: 3000,
                easing: Easing.bounce
            }).start();
        }

        render() {
            // the style to be animated
            const animatedStyle = { opacity: this.state.animatedValue };

            return (
                <View style={styles.container}>
                    <Animated.View style={[styles.box, animatedStyle]} />
                </View>
            );
        }
    }

    const styles = StyleSheet.create({
        box: {
            backgroundColor: "#333",
            width: 100,
            height: 100,
        }
    })

## Change the style prop and effect

Change initial state

    constructor() {
        this.state = {
            animatedValue: new Animated.Value(100)
        }
    }

Change final state

    startBoxAnim() {
        Animated.timing(this.state.animatedValue, {
            toValue: 300,
        }).start();
    }


Change animated prop style

    render() {
        // the style to be animated
        const animatedStyle = { height: this.state.animatedValue };

        return (
            <View style={styles.container}>
                <Animated.View style={[styles.box, animatedStyle]} />
            </View>
        );
    }



# Animate.spring(...)



import React from 'react';
import { Animated } from 'react-native';
import { View, StyleSheet, Text, TouchableWithoutFeedback } from 'react-native';


export default class SpringView extends React.Component {
    constructor(props) {
        super(props);
        this.handlePressIn = this.handlePressIn.bind(this);
        this.handlePressOut = this.handlePressOut.bind(this);

        this.state = {
            animatedValue: new Animated.Value(1)
        }
    }

    componentDidMount() {
    }

    handlePressIn() {
        Animated.spring(this.state.animatedValue, {
            toValue: .7
        }).start();
    }

    handlePressOut() {
        Animated.spring(this.state.animatedValue, {
            toValue: 1,
            friction: 3,
            tension: 40
        }).start();
    }

    render() {
        // the style to be animated
        const animatedStyle = {
            transform: [{ scale: this.state.animatedValue }]
        }


        return (
            <View style={styles.container}>
                <TouchableWithoutFeedback
                    onPressIn={this.handlePressIn}
                    onPressOut={this.handlePressOut}
                >

                    <Animated.View style={[styles.button, animatedStyle]}>
                        <Text style={styles.text}>Press me</Text>
                    </Animated.View>

                </TouchableWithoutFeedback>
            </View>
        );
    }



}

const styles = StyleSheet.create({

    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    },
    button: {
        backgroundColor: "#333",
        width: 100,
        height: 50,
        justifyContent: "center",
        alignItems: "center"
    },
    text: {
        color: "#FFF"
    }
})


# Animated && PanResponder

## define an animated value

    this.state = {
        animatedValue: new Animated.ValueXY(),
        ...
    }

## define pan responder

    this.state = {
        panResponder: PanResponder.create(
            {
                onStartShouldSetPanResponder: (evt, gestureState) => true,
                onMoveShouldSetPanResponder: (evt, gestureState) => true,
                onPanResponderGrant: (e, gestureState) => {

                },
                onPanResponderMove: (e, gestureState) => {

                },
            }
        )
    }




## it gives us handlers to put onto the view as props.


    <Animated.View 
        {... this.state.panResponder.panHandlers}
    >
        ...
    </Animated.View>

## replace default event handlers with your ...

        this.state = {
            animatedValue: new Animated.ValueXY(),
            panResponder: PanResponder.create(
                {
                    ...
                    onPanResponderMove: Animated.event([
                        null,
                        {
                            dx: this.state.animatedValue.x,
                            dy: this.state.animatedValue.y
                        }
                    ]),
                    ...
                }
            )
        }

        traverse all the arguments and assign them with the animated 


## switch view to Animated.View so it can use animated values

    <Animated.View 
        style={[styles.button, animatedStyle]}
        {... this.state.panResponder.panHandlers}
    >
        ...
    </Animated.View>

## define the styles to be animated

    const animatedStyle = {
        transform: this.state.animatedValue.getTranslateTransform() // helper function to return a helper transform
    }

and attach that to our animated.view



## Listen to 

@TODO Not so sure about this explanation, not sure if I understand what happens

We are currently working with delta x and y, differences in position.
When we drag and drop the icon we leave x and y with a delta value.


We need to reset them to 0 when we click it to move.



    constructor(props) {
        ...
        this.animatedValue = new Animated.ValueXY();

        this._value = { x: 0, y: 0 };

        this.animatedValue.addListener((value) => this._value = value);
                ...
                onPanResponderGrant: (e, gestureState) => {
                    // set offset to latest position values
                    this.animatedValue.setOffset({
                        x: this._value.x,
                        y: this._value.y
                    });
                },



## go away when released

when pressed dragged and swing away it will go away

                onPanResponderRelease: (e, gestureState) => {
                    this.animatedValue.flattenOffset();
                    Animated.decay(this.animatedValue, {
                        deceleration: 0.997,
                        velocity: { x: gestureState.vx, y: gestureState.vy }
                    }).start();
                }




# Animated colours with animatedValue.interpolate



import React, { Component } from 'react';
import { View, StyleSheet, Text, Animated, PanResponder } from 'react-native';


export default class InterpolateView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            animatedValue: new Animated.Value(0) // always needs a number to start with
        }
    }


    componentDidMount() {
        Animated.timing(this.state.animatedValue, {
            toValue: 150,
            duration: 1500
        }).start();
    }

    render() {
        // the style PROP to be animated
        const interpolateColor = this.state.animatedValue.interpolate({
            inputRange: [0, 150],
            outputRange: ['rgb(0,0,0)', 'rgb(51, 250, 170)']// maps to the values that are being animated
        })

        // the style to be animated
        const animatedStyle = {
            backgroundColor: interpolateColor
        }

        return (
            <View style={styles.container}>
                <Animated.View style={[styles.box, animatedStyle]} >
                </Animated.View>
            </View>
        );
    }



}

const styles = StyleSheet.create({

    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    },
    box: {
        width: 100,
        height: 100
    }
})


now animate both the color and position


        // the style to be animated
        const animatedStyle = {
            backgroundColor: interpolateColor,
            transform: [{ translateY: this.state.animatedValue }]
        }

# Animated rotation with animatedValue.interpolate




import React, { Component } from 'react';
import { View, StyleSheet, Animated, Text } from 'react-native';


export default class InterpolateRotateView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            animatedValue: new Animated.Value(0) // always needs a number to start with
        }
    }


    componentDidMount() {
        Animated.timing(this.state.animatedValue, {
            toValue: 1,
            duration: 1500
        }).start();
    }

    render() {
        // the style PROP to be animated
        const interpolateRotation = this.state.animatedValue.interpolate({
            inputRange: [0, 1],
            outputRange: ['0deg', '360deg']// maps to the props that are being animated
        })

        // the style to be animated
        const animatedStyle = {
            transform: [{ rotate: interpolateRotation }]
        }

        return (
            <View style={styles.container}>
                <Animated.View style={[styles.box, animatedStyle]} >
                    <Text style={styles.text}>Spinner</Text>
                </Animated.View>
            </View>
        );
    }



}

const styles = StyleSheet.create({

    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    },
    box: {
        backgroundColor: 'black',
        width: 100,
        height: 100,
        justifyContent: "center",
        alignItems: "center"
    },
    text: {
        fontSize: 16,
        color: 'white'
    }
})


# Animated sequence with animatedValue.sequence

import React, { Component } from 'react';
import { View, StyleSheet, Animated, Text } from 'react-native';


export default class SequenceView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            animatedValue: new Animated.Value(0), // always needs a number to start with
            animatedValue2: new Animated.Value(1)
        }
    }

    componentDidMount() {
        Animated.sequence(
            [
                Animated.timing(this.state.animatedValue, {
                    toValue: 150,
                    duration: 1000
                }),
                Animated.spring(this.state.animatedValue2, {
                    toValue: 3
                }),
                Animated.timing(this.state.animatedValue, {
                    toValue: 0,
                    duration: 1000
                }),
                Animated.spring(this.state.animatedValue2, {
                    toValue: 1
                })
            ]
        ).start();
    }

    render() {
        // the style to be animated
        const animatedStyle = {
            transform: [
                { translateY: this.state.animatedValue },
                { scale: this.state.animatedValue2 }]
        }

        return (
            <View style={styles.container}>
                <Animated.View style={[styles.box, animatedStyle]} >
                    <Text style={styles.text}>Sequence</Text>
                </Animated.View>
            </View>
        );
    }



}

const styles = StyleSheet.create({

    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    },
    box: {
        backgroundColor: 'black',
        width: 100,
        height: 100,
        justifyContent: "center",
        alignItems: "center"
    },
    text: {
        fontSize: 16,
        color: 'white'
    }
})