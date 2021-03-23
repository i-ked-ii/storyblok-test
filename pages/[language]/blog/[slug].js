import React, { useState } from 'react';
import Layout from '../../../components/Layout';
import BlogPost from '../../../components/BlogPost';
import Storyblok from '../../../utils/storyblok';

const BlogPosts = (props) => {
  // console.log('props', props.blog);
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

export const getStaticPaths = () => {
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
    paths: [
      { params: { language: 'en', slug: 'my-first-post' } },
      { params: { language: 'de', slug: 'my-first-post' } },
    ],
    fallback: false,
  };
};

export const getStaticProps = async ({ params }) => {
  let language = params.language || 'en';
  let blog = Storyblok.get(`cdn/stories`, {
    starts_with: `${params.language === 'en' ? '' : params.language}/blog/`,
  }).then((data) => data.stories);
  let ints = params.language === 'en' ? '/blog/' : `${params.language}/blog/`;
  const data = await Storyblok.get(`cdn/stories/${ints}/${params.slug}`).then(
    (item) => item,
  );
  return {
    props: {
      story: data ? data : false,
      language,
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
