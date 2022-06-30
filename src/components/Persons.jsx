const Persons = ({ filterList, persons }) => {
  return (
    <ol>
      {filterList() ||
        persons.map((person) => {
          return (
            <li key={person.name}>
              {person.name} {person.number}
            </li>
          );
        })}
    </ol>
  );
};

export default Persons;
