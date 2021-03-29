import React from 'react';
import { useRouter } from 'next/router';
import ErrorPage from 'next/error';

import Layout from '../../../components/commons/layouts';
import BlogPost from '../../../components/BlogPost';
import Storyblok, { getPostBySlug } from '../../../utils/storyblok';

const BlogPosts = (props) => {
  const { language, story } = props;
  const router = useRouter();
  console.log('props', props);
  // useEffect(() => {
  //   let data = Storyblok.get(`cdn/stories`, {
  //     starts_with: `${props.language}/blog/`,
  //   }).then(({ data }) => {
  //     console.log('data res', data.stories);
  //     data;
  //   });
  // }, []);

  // if (router.isFallback) {
  //   return <h1>Loading...</h1>;
  // }

  // if (!router.isFallback && !story) {
  //   return <ErrorPage statusCode={404} />;
  // }

  return (
    <Layout language={language}>
      <div className="container mx-auto mt-10 py-10 bg-white">
        <BlogPost blok={story && story.content} />
      </div>
    </Layout>
  );
};

export async function getStaticPaths() {
  // Call an external API endpoint to get posts
  let { data } = await Storyblok.get('cdn/links/', {});
  // let lange = 'th' || 'en';
  let paths = [];
  for (const linkKey of Object.keys(data.links)) {
    if (!data.links[linkKey].is_folder && data.links[linkKey].slug !== 'home') {
      const host = data.links[linkKey].slug.split('/');
      const lange = host.slice(0, 1);
      paths.push({ params: { language: lange[0], slug: data.links[linkKey].slug } });
    }
  }
  return {
    paths: paths,
    fallback: false,
  };
}

// This also gets called at build time
export const getStaticProps = async ({ params }) => {
  let language = params.language;
  let slug = params.slug;
  const story = await getPostBySlug(`${language}/blog/${slug}`);
  return {
    props: {
      params,
      story,
      language,
    },
    revalidate: 1,
  };
};

export default BlogPosts;
