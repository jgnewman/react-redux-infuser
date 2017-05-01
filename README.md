# react-redux-infuser

React-redux-infuser is a thin layer wrapping react-redux tools to simplify creating more powerful React containers.

## So what does that mean?

Normally, in a react-redux app, you'll connect a container class to the state via `mapStateToProps` and `mapDispatchToProps` functions. It usually looks something like this:

```javascript
import { updateState } from './my-actions';
import { updateOther } from './other-actions';

class AppContainer extends Component {
  render() {
    console.log(this.props); // { foo: 'foo', updateState: updateState, updateOther: updateOther }
    return <div>Hello, world!</div>
  }
}

function mapStateToProps(state) {
  return {
    foo: state.app.foo
  }
}

function mapDispatchToProps(dispatch) {
  return {
    updateState: bindActionCreators(updateState, dispatch),
    updateOther: bindActionCreators(updateOther, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AppContainer)
```

This is annoyingly cumbersome.

React-redux-infuser gives you a simpler, more readable way to handle the same functionality plus a few other really useful tricks. With react-redux-infuser, the above example becomes more like this:

```javascript
import infuse from 'react-redux-infuser';

import * as myActions from './actions';
import * as otherActions from './other-actions';

class AppContainer extends Component {
  render() {
    console.log(this.props); // { foo: 'foo', myActions: {...}, otherActions: {...} }
    return <div>Hello, world!</div>
  }
}

export default infuse(AppContainer, {

  actions: {
    myActions: myActions,
    otherActions: otherActions
  },

  values: state => ({
    foo: state.app.foo
  })

})
```

In this version, we've imported all of our actions as collections and passed those in to `infuse` under the "actions" property. This way, all of the calls to `bindActionCreators` are handled for us for every function in each of those collections. Subsequently, each collection of action functions is placed onto the container as a single prop, thus allowing us to keep that namespace a little less cluttered.

Similar to the "actions" property, we have a "values" property which, as you can probably tell, is just a thin wrapper over `mapStateToProps` but it allows us to specify those props in a much more sensible way.

## So what else can I do with it?

React-redux-infuser is of the opinion that you should not be accessing component states and you should not have to import helper modules into nested, presentational components. Conforming to this philosophy allows us to do two more things with our `infuse` call.

First, we can turn helper modules into props on our component.

```javascript
import infuse from 'react-redux-infuser';

import * as helpers from './lib/helpers'; // <- Import some lib functions

import * as myActions from './actions';
import * as otherActions from './other-actions';

class AppContainer extends Component { ... }

export default infuse(AppContainer, {

  actions: {
    myActions: myActions,
    otherActions: otherActions
  },

  values: state => ({
    foo: state.app.foo
  }),

  modules: {
    helpers: helpers // <- Turn the lib function collection into a prop
  }

})
```

This example illustrates how to use the "modules" property. This is similar to the "actions" property except there are no calls to `bindActionCreators`. Instead, your helper modules are simply translated into props on the component to be passed down like everything else.

Lastly we have the "binders" property. This one is a little trickier but it's also extremely useful. Here's an example:

```javascript
import infuse from 'react-redux-infuser';

import * as evtHandlers from './evtHandlers'; // <- Import a collection of functions

import * as helpers from './lib/helpers';
import * as myActions from './actions';
import * as otherActions from './other-actions';

class AppContainer extends Component { ... }

export default infuse(AppContainer, {

  actions: {
    myActions: myActions,
    otherActions: otherActions
  },

  values: state => ({
    foo: state.app.foo
  }),

  modules: {
    helpers: helpers
  },

  binders: {
    evtHandlers: evtHandlers // <- Turn the function collection into a component
  }                          //    prop where each function has been bound to
                             //    the component.
})
```

This is pretty cool because you can do things like create a form submit handler and then pass it down to some nested form element. Then when that form is submitted, we already know that the form handler is going to be bound the top-level container and will therefore have access to all of the props.

There is a caveat with binders, however. These functions are not bound to a rendered component but instead are bound to the React element that sort of symbolizes the component. All it really means is that, while these functions will have access to all of the props, they will _not_ have access to the component state. So be careful.
