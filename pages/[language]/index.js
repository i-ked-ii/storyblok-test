import React, { useEffect, useState, useRef } from 'react';
import dynamic from 'next/dynamic';

import Page from '../../components/Page';
import Layout from '../../components/commons/layouts';
import IsoTope from '../../components/commons/IsoTope';
const MasonryComponentWithNoSSR = dynamic(
  import('../../components/commons/Masonry/MasonryComponent'),
  {
    ssr: false,
  },
);

// The Storyblok Client
import Storyblok, { getHome } from '../../utils/storyblok';

const images = [
  { img: 'https://picsum.photos/200/300?image=1050' },
  { img: 'https://picsum.photos/400/400?image=1039' },
  { img: 'https://picsum.photos/400/400?image=1080' },
  { img: 'https://picsum.photos/200/200?image=997' },
  { img: 'https://picsum.photos/500/400?image=287' },
];
const cardsDefault = [
  {
    id: 'i',
    filter: ['test', 'chart'],
    img: 'https://picsum.photos/400/500?image=955',
  },
  {
    id: 'j',
    filter: ['test', 'chart'],
    img: 'https://picsum.photos/200/300?image=916',
  },
  {
    id: 'k',
    filter: ['test', 'chart'],
    img: 'https://cdn.pixabay.com/photo/2020/11/01/19/41/autumn-5704791_1280.jpg',
  },
  {
    id: 'l',
    filter: ['test1', 'tile'],
    img: 'https://cdn.pixabay.com/photo/2020/07/27/02/30/hands-5441201_1280.jpg',
  },
  {
    id: 'm',
    filter: ['test1', 'tile'],
    img: 'https://cdn.pixabay.com/photo/2020/11/08/09/41/deer-5723225_1280.jpg',
  },
  {
    id: 'n',
    filter: ['test', 'tile'],
    img: 'https://cdn.pixabay.com/photo/2020/09/27/04/15/cat-5605615_960_720.jpg',
  },
  {
    id: 'o',
    filter: ['test', 'tile'],
    img: 'https://cdn.pixabay.com/photo/2020/03/14/21/56/wine-4931923_1280.jpg',
  },
  {
    id: 'a',
    filter: ['test', 'chart'],
    img: 'https://picsum.photos/300/300?image=110',
  },
  {
    id: 'b',
    filter: ['test1', 'tile'],
    img: 'https://picsum.photos/300/300?image=206',
  },
  {
    id: 'c',
    filter: ['test', 'chart'],
    img:
      'https://images.squarespace-cdn.com/content/v1/554b5e7ce4b0149371f10a93/1596097563792-5HU5MV3E4NKG788ZI8LX/ke17ZwdGBToddI8pDm48kLSERMgCVymnItqhne5EfYV7gQa3H78H3Y0txjaiv_0fDoOvxcdMmMKkDsyUqMSsMWxHk725yiiHCCLfrh8O1z5QHyNOqBUUEtDDsRWrJLTmMCg6RGY8TrcVSOIk4QoDPnvjthEs8TAhVmYN7i_-QaEW7L_Q40KNxq4S2FLq3V0y/image-asset.jpeg?format=1000w',
  },
  {
    id: 'd',
    filter: ['test1', 'tile'],
    img:
      'https://images.squarespace-cdn.com/content/v1/554b5e7ce4b0149371f10a93/1552389062054-T0JMBND8LLHUS0O0OUD6/ke17ZwdGBToddI8pDm48kFWxnDtCdRm2WA9rXcwtIYR7gQa3H78H3Y0txjaiv_0fDoOvxcdMmMKkDsyUqMSsMWxHk725yiiHCCLfrh8O1z5QPOohDIaIeljMHgDF5CVlOqpeNLcJ80NK65_fV7S1UcTSrQkGwCGRqSxozz07hWZrYGYYH8sg4qn8Lpf9k1pYMHPsat2_S1jaQY3SwdyaXg/GiveMeTime.jpg?format=1000w',
  },
  {
    id: 'e',
    filter: ['test', 'tile'],
    img:
      'https://images.squarespace-cdn.com/content/v1/554b5e7ce4b0149371f10a93/1549871041683-AXCVQLY324W7P0X8YNZX/ke17ZwdGBToddI8pDm48kF9aEDQaTpZHfWEO2zppK7Z7gQa3H78H3Y0txjaiv_0fDoOvxcdMmMKkDsyUqMSsMWxHk725yiiHCCLfrh8O1z5QPOohDIaIeljMHgDF5CVlOqpeNLcJ80NK65_fV7S1UX7HUUwySjcPdRBGehEKrDf5zebfiuf9u6oCHzr2lsfYZD7bBzAwq_2wCJyqgJebgg/LastOneStanding_final.jpg?format=1000w',
  },
  {
    id: 'f',
    filter: ['test1', 'chart'],
    img:
      'https://images.squarespace-cdn.com/content/v1/554b5e7ce4b0149371f10a93/1543405531092-0NT7TW7A6I6V3CLGQZLW/ke17ZwdGBToddI8pDm48kF9aEDQaTpZHfWEO2zppK7Z7gQa3H78H3Y0txjaiv_0fDoOvxcdMmMKkDsyUqMSsMWxHk725yiiHCCLfrh8O1z5QPOohDIaIeljMHgDF5CVlOqpeNLcJ80NK65_fV7S1UX7HUUwySjcPdRBGehEKrDf5zebfiuf9u6oCHzr2lsfYZD7bBzAwq_2wCJyqgJebgg/Daybreaker.jpg?format=1000w',
  },
  {
    id: 'h',
    filter: ['test', 'chart'],
    img:
      'https://images.squarespace-cdn.com/content/v1/554b5e7ce4b0149371f10a93/1500971130545-ZZRVKXSBRCB0AO0U68SZ/ke17ZwdGBToddI8pDm48kF9aEDQaTpZHfWEO2zppK7Z7gQa3H78H3Y0txjaiv_0fDoOvxcdMmMKkDsyUqMSsMWxHk725yiiHCCLfrh8O1z5QPOohDIaIeljMHgDF5CVlOqpeNLcJ80NK65_fV7S1UX7HUUwySjcPdRBGehEKrDf5zebfiuf9u6oCHzr2lsfYZD7bBzAwq_2wCJyqgJebgg/loyal-mail-Erik-Johansson.jpg?format=1000w',
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
        columns={3}
        gutter="16px"
        columnsCountBreakPoints={{ 350: 1, 750: 2, 900: 3 }}
      />
      <Page content={response && response.data.story.content} />
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
  let response = await Storyblok.get(`cdn/stories/${language}/home`, {
    resolve_relations: 'featured-posts.posts',
  });
  // const response = await getHome(`${params.language}/home`);
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
