import React, { useState } from 'react';
import { useRouter } from 'next/router';
import ErrorPage from 'next/error';

import Layout from '../../components/commons/layouts';
import BlogPost from '../../components/BlogPost';
import Storyblok, { getAllContentFromBlog } from '../../utils/storyblok';

import { getAllPostSlug, getLink, getPostBySlug } from '../../utils/storyblok';

const BlogPosts = (props) => {
  const { language, story } = props;
  console.log('props', props);
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
        test
        {/* <BlogPost blok={story && story.story.content} /> */}
        {/* {posts ? <BlogPost blok={posts.data.story.content} /> : 'no data'} */}
      </div>
    </Layout>
  );
};

export async function getStaticPaths() {
  // Call an external API endpoint to get posts
  const allPost = await getAllContentFromBlog();
  const paths = allPost.map((post) => {
    return post.slug;
  });
  // We'll pre-render only these paths at build time.
  // { fallback: false } means other routes should 404.
  return {
    paths: [{ params: { language: 'en', slug: 'test' } }],
    // fallback: true,
    fallback: false,
  };
}

// This also gets called at build time
export const getStaticProps = async ({ params }) => {
  let language = params.language || 'en';
  return {
    props: {
      language,
    },
    revalidate: 1,
  };
};

export default BlogPosts;
