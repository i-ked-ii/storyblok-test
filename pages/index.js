import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
// import Head from 'next/head';

import { Carousel } from '../components/commons';
import Page from '../components/Page';
import Layout from '../components/commons/layouts';
import Header from '../components/Header';

// The Storyblok Client
import Storyblok, { getHome } from '../utils/storyblok';

const images = [
  {
    img: '/assets/images/beer_public_assets_images_google-header@2x.png',
    title: 'test 1',
  },
  {
    img: '/assets/images/beer_public_assets_images_google-header@2x.png',
    title: 'test 2',
  },
  {
    img: '/assets/images/beer_public_assets_images_google-header@2x.png',
    title: 'test 3',
  },
  {
    img: '/assets/images/beer_public_assets_images_google-header@2x.png',
    title: 'test 4',
  },
];

const Home = (props) => {
  const { language, story, buildTimestamp, homepage } = props;
  console.log('props', homepage);
  const router = useRouter();
  const [lange] = useState(language);
  const [home] = useState(homepage);

  return (
    <Layout language={lange}>
      <Carousel slideValues={images} align="center" />
      <Header />
      <Page content={home.content} />
      App built at: {buildTimestamp}
    </Layout>
  );
};

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
  const homepage = await getHome();
  // let cont = stories.content.map((item) => {
  //   item.body;
  // });

  return {
    props: {
      story: data ? data.story : false,
      language,
      homepage,
      tt: stories ? stories : [],
      // post: cont ? cont : [],
      buildTimestamp: Date.now(),
    },
  };
}
export default Home;
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
