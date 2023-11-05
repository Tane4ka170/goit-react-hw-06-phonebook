import { ADD_CONTACT, DELETE_CONTACT, LOAD_CONTACTS } from './constants';

export const addContact = contact => ({
  type: ADD_CONTACT,
  payload: contact,
});

export const deleteContact = contactId => ({
  type: DELETE_CONTACT,
  payload: contactId,
});

export const loadContacts = contacts => ({
  type: LOAD_CONTACTS,
  payload: contacts,
});
