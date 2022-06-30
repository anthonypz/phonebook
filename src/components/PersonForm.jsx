const PersonForm = ({
  handleSubmit,
  handleNewName,
  newName,
  handlePhoneNumber,
  phoneNumber,
}) => {
  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="name">name: </label>
        <input id="name" onChange={handleNewName} value={newName} />
      </div>
      <div>
        <label htmlFor="number">number: </label>
        <input
          type="tel"
          id="number"
          onChange={handlePhoneNumber}
          value={phoneNumber}
          pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
        />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  );
};

export default PersonForm;
