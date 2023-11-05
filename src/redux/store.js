import { createStore, combineReducers } from 'redux';
import { devToolsEnhancer } from 'redux-devtools-extension';
import contactsReducer from './reduser';

const rootReducer = combineReducers({
  contacts: contactsReducer,
});

const store = createStore(rootReducer, devToolsEnhancer());

export default store;
