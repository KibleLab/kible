import { combineReducers } from 'redux';
import menuMgnt from './menuMgnt';
import menuSlct from './menuSlct';
import wishList from './wishList';
import orderSheet from './orderSheet';

const rootReducer = combineReducers({ menuMgnt, menuSlct, wishList, orderSheet });

export default rootReducer;
