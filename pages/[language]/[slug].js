import React, { useState } from 'react';
import { useRouter } from 'next/router';
import ErrorPage from 'next/error';

import Layout from '../../components/Layout';
import BlogPost from '../../components/BlogPost';
import Storyblok from '../../utils/storyblok';

import { getAllPostSlug, getPostBySlug } from '../../utils/storyblok';

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
        <BlogPost blok={posts.story.content} />
        {/* {posts ? <BlogPost blok={posts.data.story.content} /> : 'no data'} */}
      </div>
    </Layout>
  );
};

export async function getStaticPaths() {
  // Call an external API endpoint to get posts
  const posts = await getAllPostSlug();
  // We'll pre-render only these paths at build time.
  // { fallback: false } means other routes should 404.
  return {
    paths: posts,
    // [
    //   {
    //     params: {
    //       language: 'de',
    //       slug: 'my-first-post',
    //     },
    //   },
    //   {
    //     params: {
    //       language: 'de',
    //       slug: 'asian-women-among-eight-killed-at-three-spas',
    //     },
    //   },
    // ],
    fallback: false,
  };
}

// This also gets called at build time
export const getStaticProps = async ({ params }) => {
  // const { language, slug } = params;
  try {
    //fetcher
    // const post2 = await getPostBySlug(language, slug);
    let language = params.language || 'en';

    let blog = await Storyblok.get(`cdn/stories`, {
      starts_with: `${params.language}/blog/`,
    }).then((resp) => resp.data.stories);
    // let sto = blog.find((x) => x.full_slug);

    let ints = params.language === 'en' ? '/blog/' : `${params.language}/blog/`;
    // full_slug
    const res = await Storyblok.get(`cdn/stories/${ints}/${params.slug}`).then(
      (item) => item.data,
    );
    return {
      props: {
        story: res,
        language,
        // params,
      },
      revalidate: 1,
    };
  } catch {
    return {
      notFound: true,
    };
  }
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
