import { useState, useEffect } from 'react';
import Filter from './components/Filter';
import Notification from './components/Notification';
import PersonForm from './components/PersonForm';
import Persons from './components/Persons';
import noteService from './services/notes';

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [filtered, setFiltered] = useState('');
  const [message, setMessage] = useState(null);

  useEffect(() => {
    noteService.getAll().then((data) => setPersons(data));
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();

    const contactExists = persons.some((person) => {
      if (person.name === newName.trim()) {
        if (
          window.confirm(
            `${person.name} is already added to the phonebook. Replace the old number with a new one?`
          )
        ) {
          const updateNumber = {
            ...person,
            number: phoneNumber,
          };
          noteService
            .update(person.id, updateNumber)
            .then((data) => {
              setPersons(
                persons.map((person) => (person.id === data.id ? data : person))
              );
              setMessage(`Updated ${person.name}`);
            })
            .catch((error) => {
              setMessage(
                `The note '${person.name}' has already been deleted from the server.`
              );
              setPersons(persons.filter((p) => p.id !== person.id));
            });
        }
        return true;
      }
    });
    if (!contactExists) {
      const newPerson = {
        name: newName.trim(),
        number: phoneNumber,
      };
      persons.every((person) => person.name !== newName.trim()) &&
        noteService.create(newPerson).then((data) => {
          setPersons([...persons, data]);
          setMessage(`Added ${data.name}`);
        });
    }
    setNewName('');
    setPhoneNumber('');
    setTimeout(() => setMessage(null), 3000);
  };

  const handleFilter = ({ target }) => {
    setFiltered(target.value);
  };

  const handleNewName = ({ target }) => {
    setNewName(target.value);
  };

  const handlePhoneNumber = ({ target }) => {
    setPhoneNumber(target.value);
  };

  const filterList = () => {
    if (filtered) {
      return persons.map((person) => {
        if (person.name.toLowerCase().includes(filtered.toLowerCase())) {
          return (
            <li key={person.name}>
              {person.name} {person.number}
              <button onClick={() => handleDelete(person)}>delete</button>
            </li>
          );
        }
      });
    }
  };

  const handleDelete = (person) => {
    const { id, name } = person;
    if (window.confirm(`Delete ${name}?`)) {
      noteService.deleteNote(id);
      setPersons(persons.filter((person) => person.name !== name));
    }
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={message} />
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
      <Persons
        filterList={filterList}
        persons={persons}
        handleDelete={handleDelete}
      />
    </div>
  );
};

export default App;
