import React from 'react';
import SbEditable from 'storyblok-react';

const Teaser = ({ blok }) => {
  return (
    <SbEditable content={blok}>
      <div className="bg-white-half">
        <div className="p-5 border border-t-0">
          <p className="mb-3 text-xs font-semibold tracking-wide uppercase">
            <a
              href="/"
              className="transition-colors duration-200 text-blue-gray-900 hover:text-deep-purple-accent-700"
              aria-label="Category"
              title="traveling"
            >
              traveling
            </a>
            <span className="text-gray-600">— 28 Dec 2020</span>
          </p>
          <a
            href="/"
            aria-label="Category"
            title={blok.headline}
            className="inline-block mb-3 text-2xl font-bold leading-5 transition-colors duration-200 hover:text-deep-purple-accent-700"
          >
            {blok.headline}
          </a>
          <p className="mb-2 text-gray-700">
            Sed ut perspiciatis unde omnis iste natus error sit sed quia
            consequuntur magni voluptatem doloremque.
          </p>
          <a
            href="/"
            aria-label=""
            className="inline-flex items-center font-semibold transition-colors duration-200 text-deep-purple-accent-400 hover:text-deep-purple-800"
          >
            Learn more
          </a>
        </div>
        {/* <div className="pb-6 pt-16 container mx-auto">
          <h2 className="text-6xl font-bold font-serif text-primary">
            {blok.headline}
          </h2>
          {blok.image && (
            <img
              src={blok.image.filename}
              alt={blok.image.alt}
              className="w-full"
            />
          )}
        </div> */}
      </div>
    </SbEditable>
  );
};

export default Teaser;
