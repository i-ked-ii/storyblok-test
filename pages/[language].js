import React, { useState } from 'react';
// import Head from 'next/head';

import Page from '../components/Page';
import Layout from '../components/commons/layouts';

// The Storyblok Client
import Storyblok from '../utils/storyblok';

export default function Home(props) {
  console.log('props', props);
  const [language] = useState(props.language);
  const [story] = useState(props.story);
  return (
    <Layout language={language}>
      <Page content={story.content} />
    </Layout>
  );
}

export const getStaticPaths = () => {
  // return the story from Storyblok and whether preview mode is active
  return {
    paths: [{ params: { language: 'en' } }, { params: { language: 'de' } }],
    fallback: false,
  };
};

export async function getStaticProps({ params }) {
  let language = params.language || 'en';
  let insertLanguage = language !== 'en' ? `/${language}` : '';
  let { data } = await Storyblok.get(
    `cdn/stories${insertLanguage}/home`,
    params,
  );
  const posts = await Storyblok.get(`cdn/stories/home`);
  // try {
  //   return JSON.parse(JSON.stringify(posts));
  // } catch (error) {
  //   console.error(error);
  //   return JSON.parse(JSON.stringify(error));
  // }
  // let stories = await Storyblok.get(`cdn/stories/home`)
  //   .then((data) => {
  //     data;
  //   })
  //   .then((res) => {
  //     res;
  //   });
  // let cont = stories.content.map((item) => {
  //   item.body;
  // });

  return {
    props: {
      story: data ? data.story : false,
      language,
      tt: JSON.parse(JSON.stringify(posts.data.story)),
      // post: cont ? cont : [],
    },
  };
}

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
