import { combineReducers } from 'redux';
import menuSlct from './menuSlct';
import wishList from './wishList';
import orderSheet from './orderSheet';

const rootReducer = combineReducers({ menuSlct, wishList, orderSheet });

export default rootReducer;
