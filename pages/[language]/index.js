import React, { useEffect, useState, useRef } from 'react';

import Page from '../../components/Page';
import Layout from '../../components/commons/layouts';
import IsoTope from '../../components/commons/IsoTope';

// The Storyblok Client
import Storyblok, { getHome } from '../../utils/storyblok';

const cardsDefault = [
  {
    id: 'a',
    filter: ['test', 'chart'],
  },
  {
    id: 'b',
    filter: ['test1', 'tile'],
  },
  {
    id: 'c',
    filter: ['test', 'chart'],
  },
  {
    id: 'd',
    filter: ['test1', 'tile'],
  },
  {
    id: 'e',
    filter: ['test', 'tile'],
  },
  {
    id: 'f',
    filter: ['test1', 'chart'],
  },
  {
    id: 'h',
    filter: ['test1', 'chart'],
  },
];

const filtersDefault = [
  { label: 'all', isChecked: true },
  { label: 'test', isChecked: false },
  { label: 'test1', isChecked: false },
  { label: 'chart', isChecked: false },
  { label: 'tile', isChecked: false },
];

const HomeTh = (props) => {
  const { response, language } = props;

  const [filters, updateFilters] = useState(filtersDefault);

  const onFilter = (event) => {
    const {
      target: { value },
    } = event;

    updateFilters((state) =>
      state.map((f) =>
        f.label === value ? { ...f, isChecked: true } : { ...f, isChecked: false },
      ),
    );
  };

  return (
    <Layout language={language}>
      <IsoTope
        filter={filters}
        data={cardsDefault}
        onFilter={onFilter}
        cardCol={3}
        cardWidth={250}
        cardHeight={100}
      />
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
    fallback: false,
  };
};

export async function getStaticProps({ params }) {
  let language = params.language;
  const response = await getHome(`${params.language}/home`);
  if (!response) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  }
  return {
    props: {
      response,
      language,
      // post: cont ? cont : [],
    },
  };
}

export default HomeTh;

// // export default class Language extends Component {
// //     constructor(props) {
// //         super(props);
// //         this.state = {
// //             story: props.res.data.story,
// //             language: props.language
// //         };
// //     }

// //     static async getInitialProps({ query }) {
// //         StoryblokService.setQuery(query);
// //         let language = query.language || 'en';
// //         let insertLanguage = language !== 'en' ? `/${language}` : '';
// //         let res = await StoryblokService.get(`cdn/stories${insertLanguage}/home`, {
// //             resolve_relations: 'featured-posts.posts'
// //         });

// //         return {
// //             res,
// //             language
// //         };
// //     }

// //     componentDidMount() {
// //         StoryblokService.initEditor(this);
// //     }

// //     render() {
// //         const contentOfStory = this.state.story.content;

// //         return (
// //             <Layout language={this.state.language}>
// //                 <Page content={contentOfStory} />
// //             </Layout>
// //         );
// //     }
// // }
