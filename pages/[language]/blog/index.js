import React, { useState } from 'react';
import Link from 'next/link';
import moment from 'moment';

import Layout from '../../../components/commons/layouts';
import Storyblok, { getAllPostsWithSlug, getAllEvents, getLink } from '../../../utils/storyblok';

const Blog = (props) => {
  console.log('props', props);
  const { language, allPost } = props;
  const [lange] = useState(language);
  const [posts] = useState(allPost);
  return (
    <Layout language={lange}>
      <div className="blog-wrapper px-4 py-16 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-8 lg:py-20">
        <div className="grid md:gap-8 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 sm:max-w-sm sm:mx-auto md:max-w-full xl:max-w-full">
          {posts.map((post) => {
            const lang = post.lang === 'default' ? '/en' : `/${post.lang}`;
            return (
              <div
                className="overflow-hidden transition-shadow duration-300 bg-white rounded shadow-sm"
                key={post.slug}
              >
                <img src={post.content.image} className="object-cover w-full h-64" alt="" />
                <div className="p-5 border border-t-0 border-b-0">
                  <p className="mb-3 text-xs font-semibold tracking-wide uppercase">
                    <Link href="/[language]/[slug]" as={`${lang}/${post.slug}`}>
                      <a
                        className="transition-colors duration-200 text-blue-gray-900 hover:text-deep-purple-accent-700"
                        aria-label="Category"
                        title="traveling"
                      >
                        traveling
                      </a>
                    </Link>
                    <span className="text-gray-600">
                      {`— ${moment(post.created_at).format('ll')}`}
                    </span>
                  </p>
                  <Link href="/[language]/[slug]" as={`${lang}/${post.slug}`}>
                    <a
                      aria-label="Category"
                      title="Visit the East"
                      className="inline-block mb-3 text-2xl font-bold leading-5 transition-colors duration-200 hover:text-deep-purple-accent-700"
                    >
                      {post.content.title}
                    </a>
                  </Link>
                  <p className="mb-2 text-gray-700">{post.content.intro}</p>
                  <Link href="/[language]/[slug]" as={`${lang}/${post.slug}`}>
                    <a
                      aria-label=""
                      className="inline-flex items-center font-semibold transition-colors duration-200 text-deep-purple-accent-400 hover:text-deep-purple-800"
                    >
                      Learn more
                    </a>
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>
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
    fallback: false,
  };
};

export async function getStaticProps({ params }) {
  let language = params.language;
  // let insertLanguage = language !== 'en' ? `${language}/` : '';
  const getAll = await getAllEvents();
  const allPost = await getAllPostsWithSlug(`${language}/blog`);
  const allLink = await getLink(language);
  // let { data } = await Storyblok.get(`cdn/stories`, {
  //   starts_with: `${insertLanguage}blog/`,
  // });
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
    props: {
      // story: data ? data.stories : false,
      paths,
      allLink,
      getAll,
      allPost,
      language,
    },
  };
}

export default Blog;
