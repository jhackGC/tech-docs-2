# React Native styling
CSS Style, it uses like a subset of CSS props 
Looks like CSS but is not, e.g it does not have CSS selectors.

## The StyleSheet
We could avoid using StyleSheet, but it wont validate on that Subset list.
StyleSheet

Values can be string templates and use interpolation

const opacity = 0.3;

const styles = StyleSheet.create({
    containerStyle: {
        justifyContent: 'space-around',
        backGroudnColor: `rgba(0, 0, 0, ${opacity})`
    }
});

You ant use percentages but you can import Dimensions and calculate it manually


**not in a file, included in components file.**

View is a container sort of like div, used to customise the view of elements by wrapping them.

## Common props



## Layout
https://facebook.github.io/react-native/docs/layout-props.html


## Text


### Colors
Components in React Native are styled using JavaScript. Color properties usually match how CSS works on the web.
https://facebook.github.io/react-native/docs/colors.html


# Styling a spec platform
React native will import the styles accodirng to the platform automatically


    // platformStyles.android.js

    import { StyleSheet } from 'react-native';

    export const platformStyles = StyleSheet.create({
        containerStyle: {
            backgroundColor: 'lightgrey'
        }
    });

    // PreviousEmployments.js
    
    import { platformStyles } from './platformStyles';

    render() {  
        let {
            containerStyle
        } = styles;

        containerStyle = { ...containerStyle, ...platformStyles.containerStyle };
        ...
    }

    const styles = StyleSheet.create({
        containerStyle: {
            backgroundColor: 'white'
        },


# Overriding/Overloading style with props

    // Container
    <Button style={buttonStyle}
        ...
    />


    //Button.js

    export default class Button extends Component {
        render() {
            const { buttonStyle } = styles;
            return (
                <TouchableOpacity
                    style={[buttonStyle, this.props.style]}
                    ...
                </TouchableOpacity>
            );
        }
    }

    const styles = StyleSheet.create({
        buttonStyle: {
            ...
        }
    });



# Flexbox: A system for positioning elements within a container.
Flexbox works the same way in React Native as it does in CSS on the web, with a few exceptions. The defaults are different, with flexDirection defaulting to column instead of row, and the flex parameter only supporting a single number


    flex: proportion of the parent to be occupied, if has no parent takes the window

    flexDirection: determines the primary axis of its layout. Should the children be organized horizontally or vertically.
            - row (horizontally)
            - column (vertically) default

	justifyContent: determines the distribution of children along the primary axis
            - flex-start (default)
            - center
            - flex-end
            - space-around
            - space-between
            - space-evenly
	


                // - flex-start (default)
                // 			- center
                // 			- flex-end
                // 			- space-around
                // 			- space-between
                // 			- space-evenly
                <View style={{
                  flex: 1,
                  flexDirection: 'column',
                  justifyContent: 'space-evenly',
                }}>
                  <View style={{ width: 50, height: 50, backgroundColor: 'powderblue' }} />
                  <View style={{ width: 50, height: 50, backgroundColor: 'skyblue' }} />
                  <View style={{ width: 50, height: 50, backgroundColor: 'steelblue' }} />
                </View>






  alignItems: determines the alignment of children along the secondary axis (if the primary axis is row, then the secondary is column, and vice versa)
						- flex-start (default)
						- center
						- flex-end
						- stretch

For stretch to have an effect, children must not have a fixed dimension along the secondary axis. In the following example, setting alignItems: stretch does nothing until the width: 50 is removed from the children.



      <View style={{
        flex: 1,
        flexDirection: 'row', // primary axis
        justifyContent: 'flex-end', // primary axis position
        alignItems: 'flex-start',//secondary axis position
      }}>
        <View style={{ width: 50, height: 50, backgroundColor: 'powderblue' }} />
        <View style={{ width: 50, height: 50, backgroundColor: 'skyblue' }} />
        <View style={{ width: 50, height: 50, backgroundColor: 'steelblue' }} />
      </View>


##  Layout props full list

https://facebook.github.io/react-native/docs/layout-props

## Styling Images
By defaults they are not shown unless specified size.

Full width images
imageStyle: {
    height: 300,
    flex: 1,
    width: null
  }

# iOS specific

## shadows (iOS)

        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2

## Image full width trick

  imageStyle: {
        height: 300,
        flex: 1,
        width: null
    }



    