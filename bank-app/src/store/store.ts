import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import authReducer from '../reducers/auth';

const composeEnhancers = compose; //window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ||
const store = createStore(
  combineReducers({
    auth: authReducer
  }),
  composeEnhancers(applyMiddleware(thunk))
);

export default store;
