import DynamicComponent from './DynamicComponent';
import SbEditable from 'storyblok-react';

const Page = ({ content }) => {
  return (
    <SbEditable content={content}>
      {content.body.map((blok) => (
        <DynamicComponent blok={blok} key={blok._uid} />
      ))}
    </SbEditable>
  );
};

export default Page;
