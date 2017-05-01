import React from 'react';
import ReactDOM from 'react-dom';
import { Component } from 'react';
import { Provider } from 'react-redux';
import infuse from '../../../bin/index';

import store from './store';

import * as appActions from './appActions';
import * as miscActions from './miscActions';
import * as appHandlers from './appHandlers';
import * as helpers from './helpers';

class App extends Component {
  render() {
    return <input type="text" />
  }
}

class AppContainer extends Component {
  componentDidUpdate() {
    console.log('updated')
  }
  constructor() {
    super();
    this.state = {
      stateVal: 'this is the stateVal'
    }
  }

  componentDidMount() {
    const { appActions, miscActions, appHandlers, helpers } = this.props;

    setTimeout(() => {
      helpers.logStuff()
      appActions.updateFoo('foo was updated')
      appActions.updateBar('bar was updated')
      miscActions.updateName('name was updated')
    }, 3000)
  }

  render() {
    const { appHandlers } = this.props;

    return (
      <div>
        <a onClick={appHandlers.clickMe}>Click me</a>
        <div>Misc name: {this.props.name}</div>
        <div>App foo: {this.props.foo}</div>
        <div>App bar: {this.props.bar}</div>
        <App
          appActions={this.props.appActions}
          miscActions={this.props.miscActions}
          appHandlers={this.props.appHandlers}
          helpers={this.props.helpers}
        />
      </div>
    )
  }
}

const Infused = infuse(AppContainer, {

  actions: {
    appActions: appActions,
    miscActions: miscActions
  },

  binders: {
    appHandlers: appHandlers
  },

  modules: {
    helpers: helpers
  },

  values: state => ({
    name: state.misc.name,
    foo: state.app.foo,
    bar: state.app.bar
  })

})


ReactDOM.render((
  <Provider store={store}>
    <Infused />
  </Provider>
), document.getElementById('app'))
