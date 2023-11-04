import React from 'react';
import PropTypes from 'prop-types';
import s from './Filter.module.css';

const Filter = ({ filter, filterChange }) => {
  return (
    <>
      <p className={s.title}>Find contacts by name</p>
      <input
        className={s.inpt}
        type="text"
        name="filter"
        value={filter || ''} // Ensure filter is a string or an empty string
        onChange={event => filterChange(event.target.value)}
      />
    </>
  );
};

Filter.propTypes = {
  filter: PropTypes.string, // Remove the .isRequired here to allow for undefined
  filterChange: PropTypes.func.isRequired,
};

export default Filter;
