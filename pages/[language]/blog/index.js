import React, { useState } from 'react';
import Link from 'next/link';
import Layout from '../../../components/Layout';
import Storyblok from '../../../utils/storyblok';

const Blog = (props) => {
  const [language] = useState(props.language);
  const [posts] = useState(props.story);
  return (
    <Layout language={language}>
      <main className="container mx-auto">
        <h1 className="text-5xl font-bold font-serif text-primary tracking-wide pt-12">
          All Posts
        </h1>
        <ul>
          {posts.map((post) => {
            const lang = post.lang === 'default' ? '/en' : `/${post.lang}`;
            return (
              <li
                key={post.slug}
                className="max-w-4xl px-10 my-4 py-6 rounded-lg shadow-md bg-white"
              >
                <div className="flex justify-between items-center">
                  <span className="font-light text-gray-600">
                    {`
                    ${new Date(post.created_at).getDay()}.
                    ${new Date(post.created_at).getMonth()}.
                    ${new Date(post.created_at).getFullYear()}`}
                  </span>
                </div>
                <div className="mt-2">
                  <Link href="/[language]/[slug]" as={`${lang}/${post.slug}`}>
                    <a className="text-2xl text-gray-700 font-bold hover:text-gray-600">
                      {post.content.title}
                    </a>
                  </Link>
                  <p className="mt-2 text-gray-600">{post.content.intro}</p>
                </div>
                <div className="flex justify-between items-center mt-4">
                  <Link href="/[language]/[slug]" as={`${lang}/${post.slug}`}>
                    <a className="text-blue-600 hover:underline">Read more</a>
                  </Link>
                </div>
              </li>
            );
          })}
        </ul>
      </main>
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
