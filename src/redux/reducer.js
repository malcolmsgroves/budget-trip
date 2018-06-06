import { combineReducers } from 'redux';
import trips from './reducers/trips';
import authUser from './reducers/authUser';
import common from './reducers/common';
import { routerReducer } from 'react-router-redux';

export default combineReducers({
  trips,
  authUser,
  common,
  router: routerReducer
});
