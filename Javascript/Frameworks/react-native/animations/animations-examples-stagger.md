# Rect Native Animations


# Animated.stagger
https://facebook.github.io/react-native/docs/animated#configuring-animations
starts animations in order and in parallel, but with successive delays.

run in sequence


import React, { Component } from 'react';
import { View, StyleSheet, Animated, Dimensions } from 'react-native';

const { height } = Dimensions.get("window");


export default class StaggerView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            animatedValue: new Animated.Value(0),
            animatedValue2: new Animated.Value(0),
            animatedValue3: new Animated.Value(0)
        }
    }

    componentDidMount() {
        Animated.stagger(300, [
            Animated.timing(this.state.animatedValue, {
                toValue: height,
                duration: 1500
            }),
            Animated.timing(this.state.animatedValue2, {
                toValue: height,
                duration: 1500
            }),
            Animated.timing(this.state.animatedValue3, {
                toValue: height,
                duration: 1500
            })
        ]).start();
    }

    render() {


        // the styles to be animated
        const animatedStyle = {
            height: this.state.animatedValue
        };
        const animatedStyle2 = {
            height: this.state.animatedValue2
        };
        const animatedStyle3 = {
            height: this.state.animatedValue3
        }
        return (
            <View style={styles.container}>
                <Animated.View style={[styles.box, animatedStyle]} />
                <Animated.View style={[styles.box, animatedStyle2]} />
                <Animated.View style={[styles.box, animatedStyle3]} />
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