import React, { useEffect, useState, useRef } from 'react';
import PropTypes from 'prop-types';
import IsoTopeGrid, { Card } from 'react-isotope';

const IsoTope = (props) => {
  const { data, filter, onFilter, cardCol, cardWidth, cardHeight } = props;
  // const [filters, updateFilters] = useState(filter);
  // const onFilter = (event) => {
  //   const {
  //     target: { value },
  //   } = event;

  //   updateFilters((state) =>
  //     state.map((f) =>
  //       f.label === value ? { ...f, isChecked: true } : { ...f, isChecked: false },
  //     ),
  //   );
  // };
  return (
    <div>
      <div className="filter-container">
        {filter.map((f) => (
          <div className="filter" key={`${f.label}_key`}>
            <input
              id={f.label}
              type="radio"
              value={f.label}
              name={f.label}
              onChange={onFilter}
              checked={f.isChecked}
            />
            <label htmlFor={f.label}>{f.label}</label>
          </div>
        ))}
      </div>
      <IsoTopeGrid
        gridLayout={data}
        noOfCols={cardCol} // number of columns show in one row
        unitWidth={cardWidth} // card width of 1 unit
        unitHeight={cardHeight} // card height of 1 unit
        filters={filter}
      >
        {data.map((card) => (
          <div key={card.id} className={card.filter[0]}>
            {card.id}
          </div>
        ))}
      </IsoTopeGrid>
    </div>
  );
};

IsoTope.propTypes = {
  data: PropTypes.array.isRequired,
  filter: PropTypes.array.isRequired,
  cardCol: PropTypes.number,
  cardWidth: PropTypes.number, // PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  cardHeight: PropTypes.number, // PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

export default IsoTope;
