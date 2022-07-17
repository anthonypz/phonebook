import { useState, useEffect } from 'react';
import Filter from './components/Filter';
import PersonForm from './components/PersonForm';
import Persons from './components/Persons';
import axios from 'axios';

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [filtered, setFiltered] = useState('');

  useEffect(() => {
    axios.get('http://localhost:3001/persons').then((response) => {
      setPersons(response.data);
    });
  }, []);

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
