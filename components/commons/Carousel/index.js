/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import Slider from 'react-slick';
import Link from 'next/link';
import { BsChevronLeft, BsChevronRight } from 'react-icons/bs';
import { FaPlay } from 'react-icons/fa';

function NextArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      aria-hidden="true"
      role="presentation"
      className={`${className} cursor-pointer`}
      style={{ ...style, display: 'block' }}
      onClick={onClick}
    >
      <BsChevronRight className="text-white" />
    </div>
  );
}

function PrevArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      aria-hidden="true"
      role="presentation"
      className={`${className} cursor-pointer`}
      style={{ ...style, display: 'block' }}
      onClick={onClick}
    >
      <BsChevronLeft className="text-white" />
    </div>
  );
}

const settings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
  nextArrow: <NextArrow />,
  prevArrow: <PrevArrow />,
};

const Carousel = ({ slideValues, url, asPath, className, play, align }) => {
  return (
    <Slider {...settings}>
      {slideValues.map((item, k) => (
        <figure
          className={`w-full overflow-hidden relative z-10 align-middle ${className}`}
          key={k.toString()}
        >
          <img
            src={item.img}
            className="w-full h-full pointer-events-none"
            alt={item.title}
          />
          <figcaption
            className={`caption absolute ${
              align === 'center'
                ? 'inset-0 center'
                : (align === 'top'
                ? 'inset-x-0 top-0 p-3'
                : 'inset-x-0 bottom-0 p-3')
            }`}
          >
            {/* top-1/2 left-1/2 translate-center */}
            <Link
              href={{
                pathname: `${asPath}`,
              }}
              as={`${url}/${item.title}`}
            >
              <a
                className={`caption_text text-white leading-normal z-20 ${
                  align === 'center'
                    ? 'w-full h-full flex absolute top-1/2 left-1/2 translate-center items-center justify-center'
                    : 'container block mx-auto px-4 sm:px-6 lg:px-8 left-2/4'
                }`}
              >
                {play === true ? (
                  <span className="play">
                    <FaPlay />
                  </span>
                ) : (
                  <Fragment>
                    <span className="text-3xl capitalize">{item.title}</span>
                    <p>{item.caption ? item.caption : ''}</p>
                  </Fragment>
                )}
              </a>
            </Link>
          </figcaption>
        </figure>
      ))}
    </Slider>
  );
};
Carousel.propTypes = {
  slideValues: PropTypes.array,
  className: PropTypes.string,
  asPath: PropTypes.string, // full path react /[slug].js
  url: PropTypes.string, // normal path
  align: PropTypes.oneOf(['top', 'center', 'bottom']),
};
Carousel.defaultProps = {
  className: '',
  align: 'bottom',
};

export default Carousel;
