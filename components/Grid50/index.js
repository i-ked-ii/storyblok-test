import DynamicComponent from '../DynamicComponent';
import SbEditable from 'storyblok-react';

const Grid50 = ({ blok }) => {
  return (
    <SbEditable content={blok}>
      <section className="grid-50-wrapper text-gray-600 body-font">
        <div
          className={`container mx-auto flex lg:px-5 lg:py-24 md:flex-row flex-col items-center`}
        >
          <div
            className={`lg:max-w-lg lg:w-full md:w-1/2 mb-10 md:mb-0 ${
              blok.align === 'left' ? 'md:order-1' : 'md:order-2'
            }`}
          >
            <img
              className="object-cover object-center rounded"
              alt="hero"
              src={blok.image.filename}
            />
          </div>
          <div
            className={`lg:flex-grow md:w-1/2 lg:pl-24 md:pl-16 flex flex-col md:items-start md:text-left items-center text-center ${
              blok.align === 'left' ? 'md:order-2' : 'md:order-1'
            }`}
          >
            <h1 className="title-font sm:text-4xl text-3xl mb-4 font-medium text-gray-900">
              {blok.title}
            </h1>
            <p className="mb-8 leading-relaxed">{blok.description}</p>
            <div className="flex justify-center">
              <button className="inline-flex text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded text-lg">
                Button
              </button>
              <button className="ml-4 inline-flex text-gray-700 bg-gray-100 border-0 py-2 px-6 focus:outline-none hover:bg-gray-200 rounded text-lg">
                Button
              </button>
            </div>
          </div>
        </div>
      </section>
    </SbEditable>
  );
};

export default Grid50;
