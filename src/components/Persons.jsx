const Persons = ({ filterList, persons, handleDelete }) => {
  return (
    <ol>
      {filterList() ||
        persons.map((person) => {
          return (
            <li key={person.name}>
              {person.name} {person.number}
              <button onClick={() => handleDelete(person)}>delete</button>
            </li>
          );
        })}
    </ol>
  );
};

export default Persons;
