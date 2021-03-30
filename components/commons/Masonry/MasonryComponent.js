import React from 'react';
import PropTypes from 'prop-types';
import Masonry from './Masonry';
import ResponsiveMasonry from './ResponsiveMasonry';

const MasonryComponent = ({ imgArr, columnsBreakPoints }) => {
  return (
    <ResponsiveMasonry columnsCountBreakPoints={columnsBreakPoints}>
      <Masonry columnsCount={3} gutter="10px">
        {imgArr.map((image, i) => (
          <img key={i} src={image.img} alt="" style={{ width: '100%', display: 'block' }} />
        ))}
      </Masonry>
    </ResponsiveMasonry>
  );
};

MasonryComponent.propTypes = {
  columnsBreakPoints: PropTypes.object,
  imgArr: PropTypes.array.isRequired,
};

MasonryComponent.defaultProps = {
  columnsBreakPoints: {
    350: 1,
    750: 2,
    900: 3,
  },
  className: '',
  style: {},
};

export default MasonryComponent;
