# Rect Native Animations


# Animated.parallel
https://facebook.github.io/react-native/docs/animated#configuring-animations

starts a number of animations at the same time.
*In this case it moves in the Y axis from 55 to 300 over 5000 ms, and scales from 1 to 2, the double, at the same time*

import React, { Component } from 'react';
import { View, StyleSheet, Animated } from 'react-native';


export default class ParallelView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            animatedValue: new Animated.Value(55),
            animatedValue2: new Animated.Value(1)
        }
    }

    componentDidMount() {
        Animated.parallel([
            Animated.timing(this.state.animatedValue, {
                toValue: 300,
                duration: 5000
            }),
            Animated.spring(this.state.animatedValue2, {
                toValue: 2
            })
        ]).start();
    }

    render() {

        // the styles to be animated
        const animatedStyle = {
            transform: [
                { translateY: this.state.animatedValue },
                { scale: this.state.animatedValue2 }
            ]
        };
        return (
            <View style={styles.container}>
                <Animated.View style={[styles.box, animatedStyle]} />
            </View>
        );
    }
}

const styles = StyleSheet.create({

    container: {
        flexDirection: 'row',
        justifyContent: "space-around"
    },
    box: {
        backgroundColor: 'black',
        width: 100,
        height: 100
    }
})