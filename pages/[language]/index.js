import React, { useState } from 'react';
// import Head from 'next/head';

import Page from '../../components/Page';
import Layout from '../../components/commons/layouts';

// The Storyblok Client
import Storyblok, { getHome } from '../../utils/storyblok';

const HomeTh = (props) => {
  const { response, language } = props;
  console.log('props', props);
  //   const [language] = useState(props.language);
  //   const [story] = useState(props.story);
  return (
    <Layout language={language}>
      <Page content={response && response.content} />
    </Layout>
  );
};

export const getStaticPaths = async () => {
  // return the story from Storyblok and whether preview mode is active
  let { data } = await Storyblok.get('cdn/links/', {});
  // let lange = 'th' || 'en';
  let paths = [];
  for (const linkKey of Object.keys(data.links)) {
    if (!data.links[linkKey].is_folder && data.links[linkKey].slug !== 'home') {
      const host = data.links[linkKey].slug.split('/');
      const lange = host.slice(0, 1);
      paths.push({ params: { language: lange[0] } });
    }
  }
  return {
    paths: paths,
    // paths: [{ params: { language: 'en' } }, { params: { language: 'de' } }],
    fallback: true,
  };
};

export async function getStaticProps({ params }) {
  let language = params.language;
  let insertLanguage = language !== 'en' ? `/${language}` : '';
//   let { data } = await Storyblok.get(`cdn/stories${insertLanguage}/home`, params);
  const response = await getHome(`${params.language}/home`);
  let { data } = await Storyblok.get('cdn/links/', {});
  let paths = [];
  for (const linkKey of Object.keys(data.links)) {
    if (!data.links[linkKey].is_folder && data.links[linkKey].slug !== 'home') {
      const host = data.links[linkKey].slug.split('/');
      const lange = host.slice(0, 1);
      paths.push({ params: { language: lange[0] } });
    }
  }
  return {
    props: {
        paths,
        params,
      response,
      language,
      // post: cont ? cont : [],
    },
  };
}

export default HomeTh;

// export default class Language extends Component {
//     constructor(props) {
//         super(props);
//         this.state = {
//             story: props.res.data.story,
//             language: props.language
//         };
//     }

//     static async getInitialProps({ query }) {
//         StoryblokService.setQuery(query);
//         let language = query.language || 'en';
//         let insertLanguage = language !== 'en' ? `/${language}` : '';
//         let res = await StoryblokService.get(`cdn/stories${insertLanguage}/home`, {
//             resolve_relations: 'featured-posts.posts'
//         });

//         return {
//             res,
//             language
//         };
//     }

//     componentDidMount() {
//         StoryblokService.initEditor(this);
//     }

//     render() {
//         console.log('language', this.state);
//         const contentOfStory = this.state.story.content;

//         return (
//             <Layout language={this.state.language}>
//                 <Page content={contentOfStory} />
//             </Layout>
//         );
//     }
// }
