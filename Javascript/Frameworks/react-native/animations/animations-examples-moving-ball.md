

## Example: Moving Ball
questions:
1 - current state - Where is the item right now? : Use Animated.ValueXY 
2 - final state - Where is the element moving to: : Use Animated.Spring
3 - which element - Which element are we moving? : Use Animated.View

Setup the animation in the constructor (before we used compoenntWillMount(...)  but it was deprecated since React 16.3)

        export default class MovingCircle extends Component {
            constructor(props) {
                super(props);

                this.position = new Animated.ValueXY(0, 0);
                Animated.spring(this.position, {
                    toValue: { x: 200, y: 400 }
                }).start();

            }

            render() {
                return (

                    <Animated.View style={this.position.getLayout()}>
                        <View style={styles.ball} />
                    </Animated.View>
                );
            }
        }

        const styles = StyleSheet.create({
            ball: {
                height: 60,
                width: 60,
                borderRadius: 30,
                borderWidth: 30,
                borderColor: 'black'
            }
        })

    ValueXY
    - start: { x: 0, y: 0 }

    - finish: { x: 200, y: 400 }


Starting state or position:

    ValueXY
    - start: { x: 0, y: 0 }, forced to 0,0

Where is it moving to:

    Take ValueXY and move it to x: 200, y: 400

    Animated.spring(this.position, {
            toValue: { x: 200, y: 400 }
    })

    Animated.spring(...) is changing the values of the position over some amount of time  

WHat are we moving?

    We setup some values in the constructor, in this.position


                this.position = new Animated.ValueXY(0, 0);
                Animated.spring(this.position, {
                    toValue: { x: 200, y: 400 }
                }).start();

    we have to tell something that it will have this values set 

    We use Animated.View, which can have any others children to be animated inside:

            <View>
                <Text>Im NOT Moving </Text>
                <Animated.View style={this.position.getLayout()}>
                    <View style={styles.ball} />
                    <Text>Im Moving !! </Text>
                </Animated.View>
            </View>


Animated.View is not the same as View
Animated.View knows how to reeive info about an animation and play that animatin on the screen
The View just knows how to show things statically.

To tell the Animated.View how to animate over time we pass it style property



    export default class MovingCircle extends Component {
        constructor(props) {
            super(props);

            this.position = new Animated.ValueXY(0, 0); // 1 - where is it?
            Animated.spring(this.position, {
                toValue: { x: 200, y: 400 }// 2 - where is it moving to? how are we animating?
            }).start();

        }

        render() {
            // 3 - what are we animating? Animated.View -- How we animated that? using its styles props
            return (
                <View>
                    <Text>Im NOT Moving </Text>

                    <Animated.View style={this.position.getLayout()}>
                        <View style={styles.ball} />
                        <Text>Im Moving !! </Text>
                    </Animated.View>
                </View>
            );
        }
    }

    const styles = StyleSheet.create({
        ball: {
            height: 60,
            width: 60,
            borderRadius: 30,
            borderWidth: 30,
            borderColor: 'black'
        }
    })

