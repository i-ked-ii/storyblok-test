import React, { useState } from 'react';
import { useRouter } from 'next/router';
import ErrorPage from 'next/error';

import Layout from '../../components/Layout';
import BlogPost from '../../components/BlogPost';
import Storyblok from '../../utils/storyblok';

const BlogPosts = (props) => {
  const { language, story } = props;
  console.log('props', story);
  const router = useRouter();
  const [lange] = useState(language);
  const [posts] = useState(story);

  // useEffect(() => {
  //   let data = Storyblok.get(`cdn/stories`, {
  //     starts_with: `${props.language}/blog/`,
  //   }).then(({ data }) => {
  //     console.log('data res', data.stories);
  //     data;
  //   });
  // }, []);
  if (router.isFallback) {
    return <h1>Loading...</h1>;
  }
  if (!router.isFallback && !story) {
    return <ErrorPage statusCode={404} />;
  }

  return (
    <Layout language={lange}>
      <div className="container mx-auto mt-10 py-10 bg-white">
        {posts ? <BlogPost blok={posts.data.story.content} /> : 'no data'}
      </div>
    </Layout>
  );
};

export async function getStaticPaths() {
  // Call an external API endpoint to get posts
  const posts = await Storyblok.get(`cdn/stories`, {
    starts_with: `en/blog/`,
  }).then(({ data }) => data.stories);
  // Get the paths we want to pre-render based on posts
  const paths = await posts.map((post) => ({
    params: {
      language: post.lang,
      slug: post.slug,
    },
  }));
  // We'll pre-render only these paths at build time.
  // { fallback: false } means other routes should 404.
  return {
    paths: [
      {
        params: {
          language: 'de',
          slug: 'my-first-post',
        },
      },
      {
        params: {
          language: 'de',
          slug: 'asian-women-among-eight-killed-at-three-spas',
        },
      },
    ],
    // paths:
    //   posts.length > 0
    //     ? posts.map((post) => {
    //         return {
    //           params: {
    //             language: post.lang,
    //             slug: post.slug,
    //           },
    //         };
    //       })
    //     : [],
    fallback: true,
  };
}

// This also gets called at build time
export async function getStaticProps({ params }) {
  let language = params.language || 'en';

  let blog = await Storyblok.get(`cdn/stories`, {
    starts_with: `${params.language}/blog/`,
  }).then((resp) => resp.data.stories);
  let sto = blog.find((x) => x.full_slug);

  let ints = params.language === 'en' ? '/blog/' : `${params.language}/blog/`;
  // full_slug
  const res = await Storyblok.get(`cdn/stories/${ints}/${params.slug}`).then(
    (item) => item,
  );
  return {
    props: {
      story: res ? res : false,
      language,
      // params,
    },
    revalidate: 1,
  };
}

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
