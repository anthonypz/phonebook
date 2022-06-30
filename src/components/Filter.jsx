const Filter = ({ handleFilter, filtered }) => {
  return (
    <>
      <label htmlFor="filter">Filter by name</label>
      <input type="text" onChange={handleFilter} value={filtered} />
    </>
  );
};

export default Filter;
