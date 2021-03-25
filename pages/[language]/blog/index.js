import React, { useState } from 'react';
import Link from 'next/link';
import moment from 'moment';

import Layout from '../../../components/commons/layouts';
import Storyblok from '../../../utils/storyblok';

const Blog = (props) => {
  const [language] = useState(props.language);
  const [posts] = useState(props.story);
  return (
    <Layout language={language}>
      <div className="px-4 py-16 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-8 lg:py-20">
        <div className="grid md:gap-8 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 sm:max-w-sm sm:mx-auto md:max-w-full xl:max-w-full">
          {posts.map((post) => {
            const lang = post.lang === 'default' ? '/en' : `/${post.lang}`;
            return (
              <div
                className="overflow-hidden transition-shadow duration-300 bg-white rounded shadow-sm"
                key={post.slug}
              >
                <img
                  src="https://images.pexels.com/photos/2408666/pexels-photo-2408666.jpeg?auto=compress&amp;cs=tinysrgb&amp;dpr=2&amp;w=500"
                  className="object-cover w-full h-64"
                  alt=""
                />
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

export const getStaticPaths = () => {
  // return the story from Storyblok and whether preview mode is active
  return {
    paths: [{ params: { language: 'en' } }, { params: { language: 'de' } }],
    fallback: false,
  };
};

export async function getStaticProps({ params }) {
  let language = params.language || 'en';
  let insertLanguage = language !== 'en' ? `${language}/` : '';
  let { data } = await Storyblok.get(`cdn/stories`, {
    starts_with: `${insertLanguage}blog/`,
  });

  return {
    props: {
      story: data ? data.stories : false,
      language,
    },
  };
}

export default Blog;
