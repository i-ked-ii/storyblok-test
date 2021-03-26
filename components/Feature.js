import React from 'react';
import SbEditable from 'storyblok-react';
import DynamicIcon from './icons/DynamicIcon';

const Feature = ({ blok }) => {
  return (
    <SbEditable content={blok} key={blok._uid}>
      <div className="feature-wrapper py-16 max-w-sm p-2 sm:p-10 text-center flex flex-col items-center">
        <DynamicIcon type={blok.icon} />
        <div className="px-6 py-4">
          <div className="font-bold text-xl my-4">{blok.name}</div>
          <p className="text-base text-gray-600">{blok.description}</p>
        </div>
      </div>
    </SbEditable>
  );
};

// const Feature = (props) => (
//   <SbEditable content={props.content}>
//     <div className="feature">
//       {props.content.name}
//     </div>
//   </SbEditable>
// );

export default Feature;
