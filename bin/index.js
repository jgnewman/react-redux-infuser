'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); /**
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


var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _redux = require('redux');

var _reactRedux = require('react-redux');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

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
var Binders = function () {

  /*
   * The `binders` property of our `propsFor` object consists of many sub-objects.
   * Each of these sub-objects is full of functions that should be bound to the
   * container.
   *
   * This function will instead attach prop functions that stand in as proxies.
   * Each proxy, when called, will check to see if the necessary bound function
   * exists. If so, it'll call it. If not, it'll make it, then call it.
   */
  function Binders(binders) {
    var _this = this;

    _classCallCheck(this, Binders);

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
    Object.keys(binders).forEach(function (binderPackName) {
      var binderPack = binders[binderPackName];
      var isFunction = typeof binderPack === 'function';

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
      if (!isFunction) {
        var destBinderPack = _this[binderPackName] = {};

        Object.keys(binderPack).forEach(function (fnName) {
          var boundFn = null;

          destBinderPack[fnName] = function () {
            if (!boundFn) {
              boundFn = binderPack[fnName].bind(_this.__bindTo__);
            }
            return boundFn.apply(undefined, arguments);
          };
        });

        /*
         * For a single function instead of an object of functions,
         * just create a single binder.
         */
      } else {
        var boundFn = null;

        _this[binderPackName] = function () {
          if (!boundFn) {
            boundFn = binderPack.bind(_this.__bindTo__);
          }
          return boundFn.apply(undefined, arguments);
        };
      }
    });
  }

  /*
   * This function attaches a value to `this.__bindTo__` so that when our
   * prop functions attempt to create necessary bound functions, they'll
   * have a value to bind to.
   */


  _createClass(Binders, [{
    key: 'use',
    value: function use(bindTo) {
      this.__bindTo__ = bindTo;
    }
  }]);

  return Binders;
}();

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
  var binderCache = void 0;

  /*
   * Make sure we have all 3 values or fallbacks for each one.
   * This makes each one optional.
   */
  var actions = propsFor.actions || {};
  var binders = propsFor.binders || {};
  var modules = propsFor.modules || {};
  var values = propsFor.values || function () {
    return {};
  };

  /*
   * There's a potential pitfall in that the `values` property is a function, not an object.
   * It's an easy mistake to make so let's throw an error if the user provides an object
   * instead of a function.
   */
  if (typeof values !== 'function') {
    throw new Error('The values property must be a function that selects values from the redux state.');
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
    var actionCreators = {};

    /*
     * For every collection of functions, create a destination in `actionCreators`
     * where we'll store translated functions.
     */
    Object.keys(actions).forEach(function (actionPackName) {
      var actionPack = actions[actionPackName];
      var isFunction = typeof actionPack === 'function';

      if (!isFunction) {
        var destActionPack = actionCreators[actionPackName] = {};

        /*
         * For each function, turn it into a function that triggers an action
         * and store it in its destination location.
         */
        Object.keys(actionPack).forEach(function (fnName) {
          destActionPack[fnName] = (0, _redux.bindActionCreators)(actionPack[fnName], dispatch);
        });
      } else {

        /*
         * For functions, just bind the single function.
         */
        actionCreators[actionPackName] = (0, _redux.bindActionCreators)(actionPack, dispatch);
      }
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
  return (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(function (_React$Component) {
    _inherits(_class, _React$Component);

    function _class() {
      _classCallCheck(this, _class);

      return _possibleConstructorReturn(this, (_class.__proto__ || Object.getPrototypeOf(_class)).apply(this, arguments));
    }

    _createClass(_class, [{
      key: 'shouldComponentUpdate',


      /*
       * Only update the component if a prop has actually changed.
       */
      value: function shouldComponentUpdate(nextProps) {
        var curProps = this.props;
        var shouldUpdate = false;
        Object.keys(curProps).some(function (propName) {
          if (curProps[propName] !== nextProps[propName]) {
            return shouldUpdate = true;
          }
        });
        return shouldUpdate;
      }
    }, {
      key: 'render',
      value: function render() {

        /*
         * Either generate our binder functions or pull them from the
         * cache so we don't have to remake them on every render call.
         */
        var newBinders = void 0;
        if (binderCache) {
          newBinders = binderCache;
        } else {
          newBinders = binderCache = new Binders(binders);
        }

        /*
         * Create our collection of new props to add to the child
         */
        var newProps = Object.assign({}, this.props);
        Object.keys(newBinders).forEach(function (key) {
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
        var container = _react2.default.createElement(Container, newProps, this.props.children);
        newBinders.use(container);

        /*
         * Return the cloned element.
         */
        return container;
      }
    }]);

    return _class;
  }(_react2.default.Component));
}

infuse.Binders = Binders;

module.exports = exports = infuse;