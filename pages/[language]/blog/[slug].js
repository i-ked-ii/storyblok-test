import React, { useState } from 'react';
import Layout from '../../../components/Layout';
import BlogPost from '../../../components/BlogPost';
import Storyblok from '../../../utils/storyblok';

const BlogPosts = (props) => {
  console.log('props', props);
  const [language] = useState(props.language);
  const [posts] = useState(props.story);

  // useEffect(() => {
  //   let data = Storyblok.get(`cdn/stories`, {
  //     starts_with: `${props.language}/blog/`,
  //   }).then(({ data }) => {
  //     console.log('data res', data.stories);
  //     data;
  //   });
  // }, []);

  return (
    <Layout language={language}>
      <BlogPost blok={posts.data.story.content} />
    </Layout>
  );
};

export const getStaticPaths = async () => {
  let data = await Storyblok.get(`cdn/stories`, {
    starts_with: `en/blog/`,
  }).then((resp) => resp.data.stories);
  const pat = await data.map((album) => {
    return { language: album.lang, slug: album.full_slug.toString() };
  });

  //   let language = 'en' || 'de';
  //   let { data } = Storyblok.get(`cdn/stories`, {
  //     starts_with: `${language === 'en' ? '' : language}/blog/`,
  //   }).then((data) => data.stories);
  // return {
  //   paths: posts.map((posts) => {
  //     return {
  //       params: {
  //         language: 'en',
  //         slug: posts.slug,
  //       },
  //     };
  //   }),
  //   fallback: false,
  // };
  return {
    // paths: [
    //   {
    //     params: {
    //       language: 'en',
    //       // slug: allPosts?.map(({ slug }) => `/blog/${slug}`) ?? [],
    //       slug: `/en/blog/my-first-post`,
    //     },
    //   },
    //   { params: { language: 'de', slug: `/de/blog/my-first-post` } },
    // ],/pages/[language]/blog/[slug].js
    // paths: [
    //   { params: { language: 'en', slug: 'my-first-post' } },
    //   {
    //     params: {
    //       language: 'de',
    //       slug: 'asian-women-among-eight-killed-at-three-spas',
    //     },
    //   },
    // ],
    paths: pat,
    fallback: false,
  };
};

export const getStaticProps = async ({ params }) => {
  let language = params.language || 'en';
  let blog = Storyblok.get(`cdn/stories`, {
    starts_with: `${params.language === 'en' ? '' : params.language}/blog/`,
  }).then((data) => data.stories);

  let data = await Storyblok.get(`cdn/stories`, {
    starts_with: `${language}/blog/`,
  }).then((resp) => resp.data.stories);
  // let sto = data.find((x) => x.full_slug);
  // const sl = await data.json();
  // const pat = await data.map((album) => {
  //   return { language: album.lang, slug: album.full_slug.toString() };
  // });
  const pat = data.map((resp) => {
    return resp;
    // params: { language: 'en', slug: fields.category.toString() },
  });
  let ints = params.language === 'en' ? '/blog/' : `${params.language}/blog/`;
  // full_slug
  const res = await Storyblok.get(`cdn/stories/${ints}/${params.slug}`).then(
    (item) => item,
  );

  return {
    props: {
      story: res ? res : false,
      language,
      // sto,
      data,
      pat,
    },
  };
};

export default BlogPosts;

// static async getInitialProps({ asPath, query }) {
//   StoryblokService.setQuery(query);

//   let language = query.language || 'en';
//   let trimDefault = asPath.replace('/en/blog', '/blog');
//   let res = await StoryblokService.get(`cdn/stories${trimDefault}`);

//   return {
//     res,
//     language,
//   };
// }
// export async function getStaticProps(context) {
//   StoryblokService.setQuery(query);

//   let language = query.language || 'en';
//   let trimDefault = asPath.replace('/en/blog', '/blog');
//   let res = await StoryblokService.get(`cdn/stories${trimDefault}`);

//   return {
//     res,
//     language,
//   };
// }
