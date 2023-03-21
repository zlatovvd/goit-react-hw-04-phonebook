import React, { useState, useEffect } from 'react';
import ContactForm from './ContactForm/ContactForm';
import ContactList from './ContactList/ContactList';
import Filter from './Filter/Filter';
import { nanoid } from 'nanoid';

const App = () => {
  const [contacts, setContacts] = useState([]);
  const [filter, setFilter] = useState('');

  const onSubmit = ({ name, number }) => {
    let isSubmit = false;

    if (
      !contacts.some(value =>
        value.name.toLowerCase().includes(name.toLowerCase())
      )
    ) {
      const contact = {
        id: nanoid(),
        name,
        number,
      };
      setContacts(prevState => [contact, ...prevState]);
      isSubmit = true;
    } else {
      alert(`${name} is already in contacts.`);
    }
    return isSubmit;
  };

  const onDelete = contactId => {
    setContacts(prevState =>
      prevState.filter(contact => contact.id !== contactId)
    );
  };

  const filterChange = event => {
    const { value } = event.currentTarget;
    setFilter(value);
  };

  const handleFilter = () => {
    return contacts.filter(elem =>
      elem.name.toLowerCase().includes(filter.toLowerCase())
    );
  };

  useEffect(() => {
    let contactsStorage = JSON.parse(window.localStorage.getItem('contacts'));
    if (contactsStorage) {
      setContacts(contactsStorage);
    }
  }, []);

  useEffect(() => {
    if (contacts.length > 0) {
      window.localStorage.setItem('contacts', JSON.stringify(contacts));
    } else {
      window.localStorage.removeItem('contacts');
    }
  }, [contacts]);

  return (
    <div
      style={{
        height: '100vh',
        paddingLeft: '40px',
        fontSize: 40,
        color: '#010101',
      }}
    >
      <h1>Phonebook</h1>
      <ContactForm onSubmit={onSubmit} />
      <h2>Contacts</h2>
      <Filter filter={filter} filterChange={filterChange} />
      {contacts.length > 0 && (
        <ContactList contacts={handleFilter()} onDelete={onDelete} />
      )}
    </div>
  );
};

export default App;
