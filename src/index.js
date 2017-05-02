/**
 * import React from 'react';
 * import { Component } from 'react';
 * import infuse from 'react-redux-infuser';
 *
 * import * as appActions from './actions/appActions';
 * import * as miscActions from './actions/miscActions';
 * import * as appHandlers from './handlers/appHandlers';
 * import * as helpers from './lib/helpers';
 *
 * class AppContainer extends Component {
 *   render() {
 *     const { foo, bar, appActions, miscActions, appHandlers, helpers } = this.props;
 *
 *     // Where `foo, bar` are values bound to the state
 *     // Where `appActions, miscActions`, trigger redux actions
 *     // Where `appHandlers` is an object of handler functions bound to this container
 *     // Where `helpers` is an object of utility functions
 *
 *     return (
 *       <div>Hello, world!</div>
 *     )
 *   }
 * }
 *
 * export default infuse(AppContainer, {
 *
 *   actions: {
 *     appActions: appActions,
 *     miscActions: miscActions
 *   },
 *
 *   binders: {
 *     appHandlers: appHandlers
 *   },
 *
 *   modules: {
 *     helpers: helpers
 *   },
 *
 *   values: state => ({
 *     foo: state.app.foo,
 *     bar: state.app.bar
 *   })
 *
 * })
 */


/*
 * Import peer dependencies.
 */
import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

/**
 * @class Binders
 *
 * Ok, this is the craziest part. Here's what's going on:
 *
 * PURPOSE: In order to bind functions to an instance, we need that instance to
 * be available. Therefore, we can't just modify props before instantiation because
 * they are generated before instantiation. Instead, we need a way to allow
 * props to be immutable but still bind prop functions to the instance after
 * instantiation.
 */
class Binders {

  /*
   * The `binders` property of our `propsFor` object consists of many sub-objects.
   * Each of these sub-objects is full of functions that should be bound to the
   * container.
   *
   * This function will instead attach prop functions that stand in as proxies.
   * Each proxy, when called, will check to see if the necessary bound function
   * exists. If so, it'll call it. If not, it'll make it, then call it.
   */
  constructor(binders) {

    /*
     * This tracks the value the functions will bind to, I.E. the class instance.
     * That instance doesn't exist  at the moment the constructor runs so it has to be
     * null for now and we'll attach a value to it after we have the instance.
     */
    this.__bindTo__ = null;

    /*
     * Loop over each sub-object and create a corresponding sub-object for it
     * on `this`.
     */
    Object.keys(binders).forEach(binderPackName => {
      const binderPack = binders[binderPackName];
      const destBinderPack = this[binderPackName] = {};

      /*
       * Loop over each function. We intend to turn it into a function bound
       * to the container instance. To do that, we'll create a closure var
       * that will hold a reference to the bound function once it exists.
       * We then actually create a function that checks to see if this reference
       * exists and creates it if not. Then it calls it.
       *
       * To create the bound function, we expect that we have already set a
       * value for `this.__bindTo__` which we can only get once we the instance exists.
       */
      Object.keys(binderPack).forEach(fnName => {
        let boundFn = null;

        destBinderPack[fnName] = (...args) => {
          if (!boundFn) {
            boundFn = binderPack[fnName].bind(this.__bindTo__);
          }
          return boundFn(...args);
        };
      });
    });
  }

  /*
   * This function attaches a value to `this.__bindTo__` so that when our
   * prop functions attempt to create necessary bound functions, they'll
   * have a value to bind to.
   */
  use(bindTo) {
    this.__bindTo__ = bindTo;
  }
}

/**
 * Returns a new, connected component with actions, state values, and
 * bound functions in place.
 *
 * @param  {Class}  Container  A container class for a React app.
 * @param  {Object} propsFor   Takes `actions`, `binders`, `values`, all optionally.
 *
 * @return {Class}  A new, connected React class.
 */
function infuse(Container, propsFor) {
  let binderCache;

  /*
   * Make sure we have all 3 values or fallbacks for each one.
   * This makes each one optional.
   */
  const actions = propsFor.actions || {};
  const binders = propsFor.binders || {};
  const modules = propsFor.modules || {};
  const values  = propsFor.values  || function () { return {} };

  /*
   * There's a potential pitfall in that the `values` property is a function, not an object.
   * It's an easy mistake to make so let's throw an error if the user provides an object
   * instead of a function.
   */
  if (typeof values !== 'function') {
    throw new Error('The values property must be a function that selects values from the redux state.')
  }

  /**
   * Runs on update and maps state values to class props.
   *
   * @param  {Object} state  Redux state
   *
   * @return {Object} Defines which state values should be mapped to properties.
   */
  function mapStateToProps(state) {
    return values(state);
  }

  /**
   * The `actions` property of the `propsFor` config is an object full of sub-objects.
   * Each of these sub-objects is full of functions. Here, we'll turn each sub-object
   * into a class prop and we'll translate each function into an action creator.
   *
   * @param  {Function} dispatch Reduxy dispatch stuff.
   *
   * @return {Object}   Each value becomes a prop.
   */
  function mapDispatchToProps(dispatch) {
    const actionCreators = {};

    /*
     * For every collection of functions, create a destination in `actionCreators`
     * where we'll store translated functions.
     */
    Object.keys(actions).forEach(actionPackName => {
      const actionPack = actions[actionPackName];
      const destActionPack = actionCreators[actionPackName] = {};

      /*
       * For each function, turn it into a function that triggers an action
       * and store it in its destination location.
       */
      Object.keys(actionPack).forEach(fnName => {
        destActionPack[fnName] = bindActionCreators(actionPack[fnName], dispatch);
      });
    });

    /*
     * Here, we'll take the opportunity to piggyback off of `connect`'s mapDispatchToProps
     * to add any other modules to the props that the user might have given us
     * but this time, we won't use bindActionCreators on them. We can just transfer
     * them over.
     */
    return Object.assign({}, actionCreators, modules);
  }

  /*
   * In order for everything to work properly, we need a reference to a container instance.
   * In order to get that reference, we need to return a proxy class. That proxy class gets
   * run through `connect` so that it can have all the mapped state and action props ready to go.
   * It's job is then simply to pass its props down the container instance when it's returned.
   */
  return connect(mapStateToProps, mapDispatchToProps)(class extends React.Component {

    /*
     * Only update the component if a prop has actually changed.
     */
    shouldComponentUpdate(nextProps) {
      const curProps = this.props;
      let shouldUpdate = false;
      Object.keys(curProps).some(propName => {
        if (curProps[propName] !== nextProps[propName]) {
          return shouldUpdate = true;
        }
      });
      return shouldUpdate;
    }

    render() {

      /*
       * Either generate our binder functions or pull them from the
       * cache so we don't have to remake them on every render call.
       */
      let newBinders
      if (binderCache) {
        newBinders = binderCache;
      } else {
        newBinders = binderCache = new Binders(binders);
      }

      /*
       * Create our collection of new props to add to the child
       */
      const newProps = Object.assign({}, this.props);
      Object.keys(newBinders).forEach(key => {
        if (key !== '__bindTo__') {
          newProps[key] = newBinders[key];
        }
      });

      /*
       * Instantiate the container and pass down our props to it, including our binder functions as
       * well as children in case any exist.
       *
       * Now that the element exists, pass it into the `use` method on the `Binders` class so that
       * when each binder proxy creates the actual bound function upon its first time being
       * called, we'll have the value to bind to.
       */
      const container = React.createElement(Container, newProps, this.props.children);
      newBinders.use(container);

      /*
       * Return the cloned element.
       */
      return container;
    }
  });

}

infuse.Binders = Binders;

module.exports = exports = infuse;
