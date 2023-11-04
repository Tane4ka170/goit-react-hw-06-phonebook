import { devToolsEnhancer } from '@redux-devtools/extension';
import { combineReducers, createStore } from 'redux';
import { contactsReduser } from './reduser';

const enhanser = devToolsEnhancer();

const rootReduser = combineReducers({
  contacts: contactsReduser,
});

export const store = createStore(rootReduser, enhanser);
