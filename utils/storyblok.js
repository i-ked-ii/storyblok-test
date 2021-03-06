import StoryblokClient from 'storyblok-js-client';

// set client
const client = new StoryblokClient({
  accessToken: '6OGHIpYFngjni2xlE9Valgtt' || process.env.STORYBLOK_API_KEY,
  cache: {
    clear: 'auto',
    type: 'memory',
  },
});

export async function getAllEvents() {
  const response = await fetch(
    `https://api.storyblok.com/v1/cdn/stories?token=${process.env.STORYBLOK_API_KEY}`,
  );
  const { stories } = await response.json();
  return stories;
}

export async function getHome(lang) {
  const response = await fetch(
    `https://api.storyblok.com/v1/cdn/stories/${lang}?token=${process.env.STORYBLOK_API_KEY}`,
  );

  const { story } = await response.json();
  return story;
}

// Get all content from the news folder
export async function getAllContentFromBlog(slug) {
  const response = await fetch(
    `https://api.storyblok.com/v1/cdn/stories/?starts_with=th/blog/&token=${process.env.STORYBLOK_API_KEY}`,
  );

  const { stories } = await response.json();
  return stories;
}

function parsePostSlug({ post }) {
  return {
    slug: post.full_slug,
  };
}

export async function getLink(lang) {
  const response = await fetch(
    `https://api.storyblok.com/v1/cdn/links/?starts_with=${lang}/&token=${process.env.STORYBLOK_API_KEY}`,
  );
  const { links } = await response.json();
  return links;
}

// get all slugs of posts
export async function getAllPostsWithSlug(lang) {
  const response = await fetch(
    `https://api.storyblok.com/v1/cdn/stories/?starts_with=${lang}/&token=${process.env.STORYBLOK_API_KEY}`,
  );
  const { stories } = await response.json();
  return stories;
}

// get Content By slug
export async function getPostBySlug(full_slug) {
  const response = await fetch(
    `https://api.storyblok.com/v1/cdn/stories/${full_slug}?token=${process.env.STORYBLOK_API_KEY}`,
  );
  const { story } = await response.json();
  return story;
}

// Filter by boolean value in content type
// client
//   .get('cdn/stories', {
//     version: 'draft',
//     filter_query: {
//       is_featured: {
//         in: true,
//       },
//     },
//   })
//   .then((res) => {
//     console.log(res.data.stories);
//   });

// Get all news and author contents
// client
//   .get('cdn/stories', {
//     version: 'draft',
//     filter_query: {
//       component: {
//         in: 'news,author',
//       },
//     },
//   })
//   .then((res) => {
//     console.log(res.data.stories);
//   });

// init with access token
const Storyblok = new StoryblokClient({
  accessToken: '6OGHIpYFngjni2xlE9Valgtt' || process.env.STORYBLOK_API_KEY,
  cache: {
    clear: 'auto',
    type: 'memory',
  },
});

export default Storyblok;
// class StoryblokService {
//     constructor() {
//         this.devMode = true; // Always loads draft
//         this.token = '6OGHIpYFngjni2xlE9Valgtt' || process.env.STORYBLOK_API_KEY;
//         this.client = new StoryblokClient({
//             accessToken: this.token,
//             cache: {
//                 clear: 'auto',
//                 type: 'memory'
//             }
//         });

//         this.query = {};
//     }

//     getCacheVersion() {
//         return this.client.cacheVersion;
//     }

//     // ask Storyblok's Content API for content of story
//     get(slug, params) {
//         params = params || {};

//         if (
//             this.getQuery('_storyblok') ||
//             this.devMode ||
//             (typeof window !== 'undefined' && window.storyblok)
//         ) {
//             params.version = 'draft';
//         }

//         if (typeof window !== 'undefined' && typeof window.StoryblokCacheVersion !== 'undefined') {
//             params.cv = window.StoryblokCacheVersion;
//         }

//         return this.client.get(slug, params);
//     }

//     // initialize the connection between Storyblok & Next.js in Visual Editor
//     initEditor(reactComponent) {
//         if (window.storyblok) {
//             window.storyblok.init();

//             // reload on Next.js page on save or publish event in Storyblok Visual Editor
//             window.storyblok.on(['change', 'published'], () => location.reload(true));

//             // Update state.story on input in Visual Editor
//             // this will alter the state and replaces the current story with a current raw story object and resolve relations
//             window.storyblok.on('input', (event) => {
//                 if (event.story.content._uid === reactComponent.state.story.content._uid) {
//                     event.story.content = window.storyblok.addComments(
//                         event.story.content,
//                         event.story.id
//                     );
//                     window.storyblok.resolveRelations(
//                         event.story,
//                         ['featured-articles.articles'],
//                         () => {
//                             reactComponent.setState({
//                                 story: event.story
//                             });
//                         }
//                     );
//                 }
//             });
//         }
//     }

//     setQuery(query) {
//         this.query = query;
//     }

//     getQuery(param) {
//         return this.query[param];
//     }

//     bridge() {
//         if (!this.getQuery('_storyblok') && !this.devMode) {
//             return '';
//         }
//         return <script src={'//app.storyblok.com/f/storyblok-latest.js?t=' + this.token}></script>;
//     }
// }

// const storyblokInstance = new StoryblokService();

// export default storyblokInstance;
