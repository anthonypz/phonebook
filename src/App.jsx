import { useState } from 'react';
import Filter from './components/Filter';
import PersonForm from './components/PersonForm';
import Persons from './components/Persons';

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 },
  ]);
  const [newName, setNewName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [filtered, setFiltered] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    const newPerson = {
      name: newName,
      number: phoneNumber,
    };
    persons.some((person) => person.name === newName)
      ? alert(`${newName} is already added to the phonebook`)
      : setPersons([...persons, newPerson]);
    setNewName('');
    setPhoneNumber('');
  };

  const handleFilter = (event) => {
    setFiltered(event.target.value);
  };

  const handleNewName = (event) => {
    setNewName(event.target.value);
  };

  const handlePhoneNumber = (event) => {
    setPhoneNumber(event.target.value);
  };

  const filterList = () => {
    if (filtered) {
      return persons.map((person) => {
        if (person.name.toLowerCase().includes(filtered.toLowerCase())) {
          return (
            <li key={person.name}>
              {person.name} {person.number}
            </li>
          );
        }
      });
    }
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter handleFilter={handleFilter} filtered={filtered} />
      <h3>Add a new contact</h3>
      <PersonForm
        handleSubmit={handleSubmit}
        handleNewName={handleNewName}
        newName={newName}
        handlePhoneNumber={handlePhoneNumber}
        phoneNumber={phoneNumber}
      />
      <h3>Numbers</h3>
      <Persons filterList={filterList} persons={persons} />
    </div>
  );
};

export default App;
