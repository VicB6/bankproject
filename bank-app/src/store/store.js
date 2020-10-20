import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import authReducer from '../reducers/auth';
import errorsReducer from '../reducers/errors';
import profileReducer from '../reducers/profile';

const composeEnhancers = compose; //window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ||
const store = createStore(
  combineReducers({
    auth: authReducer,
    errors: errorsReducer,
    profile: profileReducer
  }),
  composeEnhancers(applyMiddleware(thunk))
);

export default store;
