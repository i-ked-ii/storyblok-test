import DynamicComponent from './DynamicComponent';
import SbEditable from 'storyblok-react';

const Grid = ({ blok }) => (
  <SbEditable content={blok}>
    <div className="grid-wrapper px-4 py-16 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-8 lg:py-20">
      <div className="grid md:gap-8 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 sm:max-w-sm sm:mx-auto md:max-w-full xl:max-w-full">
        {blok.columns.map((nestedBlok) => (
          <div
            className="overflow-hidden transition-shadow duration-300 bg-white rounded shadow-sm"
            key={nestedBlok._uid}
          >
            <DynamicComponent blok={nestedBlok} />
          </div>
        ))}
      </div>
    </div>
  </SbEditable>
);

export default Grid;
