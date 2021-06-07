import {combineReducers} from 'redux';
import menuSelect from './menuSelect';
import orderSheet from './orderSheet';

const rootReducer = combineReducers({menuSelect, orderSheet});

export default rootReducer;
