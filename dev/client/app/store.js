import { createStore, combineReducers, compose } from 'redux';

const initialState = {
  misc: {
    name: 'Papa John'
  },
  app: {
    foo: 'foofoofoo',
    bar: 'barbarbar'
  }
};

function miscReducer(state = initialState.misc, action) {
  switch (action.type) {
    case 'UPDATE_NAME':
      return Object.assign({}, state, { name: action.payload });
    default:
      return state;
  }
}

function appReducer(state = initialState.app, action) {
  switch (action.type) {
    case 'UPDATE_FOO':
      return Object.assign({}, state, { foo: action.payload });
    case 'UPDATE_BAR':
      return Object.assign({}, state, { bar: action.payload })
    default:
      return state;
  }
}

const reducers = {
  misc: miscReducer,
  app: appReducer
}


function devToolsCompose(...args) {
  if (window.__REDUX_DEVTOOLS_EXTENSION__) {
    args.push(window.__REDUX_DEVTOOLS_EXTENSION__());
  }
  return compose.apply(null, args);
}

const store = createStore(
  combineReducers(reducers),
  initialState,
  devToolsCompose()
);


export default store;
