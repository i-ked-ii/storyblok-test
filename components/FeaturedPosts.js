import React from 'react';
import SbEditable from 'storyblok-react';

const FeaturedPosts = ({ blok }) => {
  // console.log('blok', blok);
  return (
    <SbEditable content={blok} key={blok._uid}>
      <div className="featured-post py-8 mb-6 container mx-auto text-left" key={blok._uid}>
        <div className="relative">
          <h2 className="relative font-serif text-4xl z-10 text-primary">{blok.title}</h2>
          <div className="absolute top-0 w-64 h-10 mt-6 -ml-4 bg-yellow-300 opacity-50" />
        </div>
        <ul className="flex">
          {blok.posts.map((post, index) => {
            const lang = post.lang === 'default' ? '/en' : `/${post.lang}`;

            return (
              <li key={index} className="pr-8 w-1/3">
                {post.content && (
                  <a
                    href={`${lang}/blog/${post.slug}`}
                    className="py-16 block transition hover:opacity-50"
                  >
                    {post.content
                      ? post.content.image && (
                          <img src={post.content.image} alt="" className="pb-10 w-full" />
                        )
                      : ''}
                    <h2 className="pb-6 text-lg font-bold">{post.content.title}</h2>
                    <p className="pb-6 text-gray-700 leading-loose">{post.content.intro}</p>
                  </a>
                )}
              </li>
            );
          })}
        </ul>
      </div>
    </SbEditable>
  );
};

export default FeaturedPosts;
