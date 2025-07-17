# What to test?

## Black box testing

DO NOT test inner state of the component or the inner helper methods, that breaks the black box testing, you would be doing white box testing and coupling your tests to the inner behavior and state of the component, instead of focusing on its public API (props/event handlers):

- inputs:

  - props passed to it
  - event handlers, actions.

- outputs:

  - shallow render results
  - props passed to children components
