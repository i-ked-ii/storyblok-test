import { Carousel } from '../components/commons';
import Page from '../components/Page';
import Layout from '../components/commons/layouts';
import Header from '../components/Header';

// The Storyblok Client
import { getHome } from '../utils/storyblok';

const images = [
  {
    img: '/assets/images/beer_public_assets_images_google-header@2x.png',
    title: 'test 1',
  },
  {
    img: '/assets/images/beer_public_assets_images_google-header@2x.png',
    title: 'test 2',
  },
  {
    img: '/assets/images/beer_public_assets_images_google-header@2x.png',
    title: 'test 3',
  },
  {
    img: '/assets/images/beer_public_assets_images_google-header@2x.png',
    title: 'test 4',
  },
];

const Home = (props) => {
  const { language, homepage } = props;

  return (
    <Layout language={language}>
      <Carousel slideValues={images} align="center" />
      <Header />
      <Page content={homepage.content} />
    </Layout>
  );
};

export async function getStaticProps() {
  const language = 'en';
  const homepage = await getHome(`en/home`);
  if (!homepage) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  }
  return {
    props: {
      homepage,
      language,
    },
  };
}
export default Home;
// export default class Home extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       story: props.res.data.story,
//       language: props.language,
//     };
//   }

//   static async getInitialProps({ query }) {
//     StoryblokService.setQuery(query);
//     let language = query.language || 'en';
//     let insertLanguage = language !== 'en' ? `/${language}` : '';
//     let res = await StoryblokService.get(`cdn/stories${insertLanguage}/home`, {
//       resolve_relations: 'featured-posts.posts',
//     });

//     return {
//       res,
//       language,
//     };
//   }

//   componentDidMount() {
//     StoryblokService.initEditor(this);
//   }

//   render() {
//     const contentOfStory = this.state.story.content;

//     return (
//       <Layout language={this.state.language}>
//         <Page content={contentOfStory} />
//       </Layout>
//     );
//   }
// }
