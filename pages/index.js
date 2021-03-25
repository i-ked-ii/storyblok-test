import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
// import Head from 'next/head';

import Page from '../components/Page';
import Layout from '../components/Layout';
import Header from '../components/Header';

// The Storyblok Client
import Storyblok from '../utils/storyblok';

export default function Home(props) {
  console.log('props', props);
  const router = useRouter();
  const [language] = useState(props.language);
  const [story] = useState(props.story);

  return (
    <Layout language={language}>
      <Header />
      <Page content={story.content} />
    </Layout>
  );
}

export async function getStaticPaths() {
  // loads the story from the Storyblok API
  let { data } = Storyblok.get(`cdn/stories/home`);
  //   data.then((data) => data.path);
  let paths = data ? data.story : [];
  // return the story from Storyblok and whether preview mode is active
  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  let language = params || 'en';
  let insertLanguage = language !== 'en' ? `/${language}` : '';
  let { data } = await Storyblok.get(
    `cdn/stories${insertLanguage}/home`,
    params,
  );
  let stories = await Storyblok.get(`cdn/stories/home`).then((data) => {
    data.story;
  });
  // let cont = stories.content.map((item) => {
  //   item.body;
  // });

  return {
    props: {
      story: data ? data.story : false,
      language,
      tt: stories ? stories : [],
      // post: cont ? cont : [],
    },
  };
}

// export default class Home extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       story: props.res.data.story,
//       language: props.language,
//     };
//   }

//   static async getInitialProps({ query }) {
//     StoryblokService.setQuery(query);
//     let language = query.language || 'en';
//     let insertLanguage = language !== 'en' ? `/${language}` : '';
//     let res = await StoryblokService.get(`cdn/stories${insertLanguage}/home`, {
//       resolve_relations: 'featured-posts.posts',
//     });

//     return {
//       res,
//       language,
//     };
//   }

//   componentDidMount() {
//     StoryblokService.initEditor(this);
//   }

//   render() {
//     const contentOfStory = this.state.story.content;

//     return (
//       <Layout language={this.state.language}>
//         <Page content={contentOfStory} />
//       </Layout>
//     );
//   }
// }
