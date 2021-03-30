import React, { useEffect, useState, useRef } from 'react';
import PropTypes from 'prop-types';
import IsoTopeGrid, { Card } from 'react-isotope';
import dynamic from 'next/dynamic';

const MasonryComponentWithNoSSR = dynamic(import('../Masonry/MasonryComponent'), {
  ssr: false,
});

let elementRefMeasures = {};

const IsoTope = (props) => {
  const {
    className,
    data,
    filter,
    // onFilter,
    cardCol,
    cardWidth,
    cardHeight,
    gutter,
    style,
  } = props;
  const masonryLayout = useRef();
  const elementRef = useRef();

  const [filt, updateFilters] = useState('all');
  const [que, setQue] = useState(data);

  const getData = () => {
    setQue(data);
  };

  const onFilter = (val) => {
    if (val !== 'all') {
      setQue(que.filter((cah) => cah.filter.includes(val)));
      updateFilters(val);
    } else {
      setQue(data);
    }
    // setQue((state) => state.map((f) => f.filter.map((i) => i === filt)));
  };
  console.log('que', que);
  return (
    <div>
      {/* <div className="filter-container">
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
      </div> */}
      <div className="filter">
        {filter.map((f) => (
          <button
            className={`w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-opacity-75 sm:ml-3 sm:w-auto sm:text-sm ${
              filt === f.label ? 'bg-red-700' : ''
            }`}
            onClick={() => {
              onFilter(f.label);
            }}
            // onChange={() => onFilter(filt)}
            key={`${f.label}_key`}
          >
            {f.label}
          </button>
        ))}
      </div>

      <div className="masonry" ref={masonryLayout}>
        {que.map((card) => (
          <div className={`item ${card.filter[0]}`} key={card.id}>
            <div className="item__content">
              <img src={card.img} alt="" className="w-full" />
            </div>
          </div>
        ))}
        {/* <div className="item">
          <div className="item__content"></div>
        </div>
        <div className="item">
          <div className="item__content item__content--small"></div>
        </div>
        <div className="item">
          <div className="item__content item__content--medium"></div>
        </div>
        <div className="item">
          <div className="item__content item__content--large"></div>
        </div> */}
      </div>
      {/* <IsoTopeGrid
        className="masonry"
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
      </IsoTopeGrid>*/}
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
