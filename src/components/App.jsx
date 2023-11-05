import React, { useEffect } from 'react';
import { nanoid } from 'nanoid';
import { useDispatch, useSelector } from 'react-redux';
import { addContact, loadContacts } from '../redux/actions';
import ContactForm from './ContactForm/ContactForm';
import ContactList from './ContactList/ContactList';
import Filter from './Filter/Filter';
import s from './App.module.css';

const App = () => {
  const contacts = useSelector(state => state.contacts.contacts);
  const filter = useSelector(state => state.contacts.filter);
  const dispatch = useDispatch();

  useEffect(() => {
    const storedContacts = JSON.parse(window.localStorage.getItem('contacts'));
    if (storedContacts) {
      dispatch(loadContacts(storedContacts));
    }
  }, [dispatch]);

  const handleAddContact = formData => {
    const loweredCase = formData.name.toLowerCase().trim();
    const exists = contacts.some(
      contact => contact.name.toLowerCase().trim() === loweredCase
    );

    if (exists) {
      alert(`${formData.name} is already in contacts!`);
    } else {
      const newContact = {
        name: formData.name,
        number: formData.number,
        id: nanoid(),
      };
      dispatch(addContact(newContact));
    }
  };

  const addFilter = event => {
    const filterValue = event.currentTarget.value;
    dispatch({ type: 'SET_FILTER', payload: filterValue });
  };

  const deleteContact = id => {
    const filtered = contacts.filter(contact => contact.id !== id);
    dispatch(deleteContact(filtered));
  };

  const filteredContacts = contacts.filter(contact => {
    return (
      contact.name &&
      filter &&
      contact.name.toLowerCase().includes(filter.toLowerCase())
    );
  });

  return (
    <div className={s.div}>
      <h1 className={s.title}>Phonebook</h1>
      <ContactForm onSubmit={handleAddContact} />
      <h2 className={s.title}>Contacts</h2>
      <Filter filter={filter} filterChange={addFilter} />
      <ContactList contacts={filteredContacts} deleteContact={deleteContact} />
    </div>
  );
};

export default App;
