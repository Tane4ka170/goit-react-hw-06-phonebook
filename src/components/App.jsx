import React, { useEffect } from 'react';
import { nanoid } from 'nanoid';
import ContactForm from './ContactForm/ContactForm';
import ContactList from './ContactList/ContactList';
import Filter from './Filter/Filter';
import s from './App.module.css';
import { useDispatch, useSelector } from 'react-redux';

const App = () => {
  const contacts = useSelector(state => state.contacts.contacts); // Access contacts from Redux state
  const dispatch = useDispatch();

  const filter = useSelector(state => state.contacts.filter);

  useEffect(() => {
    const storedContacts = JSON.parse(window.localStorage.getItem('contacts'));
    if (storedContacts) {
      // Dispatch an action to load contacts from localStorage
      dispatch({ type: 'LOAD_CONTACTS', payload: storedContacts });
    }
  }, [dispatch]);

  const addContact = event => {
    const loweredCase = event.target.name.value.toLowerCase().trim();

    const exists = contacts.some(
      contact => contact.name.toLowerCase().trim() === loweredCase
    );

    if (exists) {
      alert(`${event.target.name.value} is already in contacts!`);
    } else {
      const newContact = {
        name: event.target.name.value,
        number: event.target.number.value,
        id: nanoid(),
      };
      dispatch(addContact(newContact)); // Dispatch the action to add a contact
    }
  };

  const addFilter = event => {
    // Dispatch an action to update the filter
    dispatch({ type: 'SET_FILTER', payload: event.currentTarget.value });
  };

  const deleteContact = id => {
    // Dispatch the action to delete a contact
    dispatch(deleteContact(id));
  };

  const filteredContacts = contacts.filter(contact => {
    // Check if contact.name and filter are defined before calling toLowerCase()
    return (
      contact.name &&
      filter &&
      contact.name.toLowerCase().includes(filter.toLowerCase())
    );
  });

  return (
    <div className={s.div}>
      <h1 className={s.title}>Phonebook</h1>
      <ContactForm onSubmit={addContact} />
      <h2 className={s.title}>Contacts</h2>
      <Filter filter={filter} filterChange={addFilter} />
      <ContactList contacts={filteredContacts} deleteContact={deleteContact} />
    </div>
  );
};

export default App;
