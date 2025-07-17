# TextInput
https://facebook.github.io/react-native/docs/textinput

# ScrollView

tags are not scrollables by default

Use ScrollView react-native component. 

You cant see the scroll bar !!

The ROOT component that contains the ScrollView, MUST have a style property of flex: 1 to work properly.

// create a component
const App = () => {
  return (
      <View style={{flex: 1}}>
        <Header headerText={"Header text 2"}/>
        <AlbumList headerText={"Header text 2"}/>
      </View>
  );
}

Is is saying: please expand this component to fill the entire device width.


# Buttons
TouchableHighlight wrap thing that want to be touchable, and give some feedback, telling the ser that it is clickable.
