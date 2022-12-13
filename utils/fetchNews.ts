import { gql } from "graphql-request";
import sortNewsByImage from "./sortNewsByImage";

const fetchNews = async (
  category?: Category | string,
  keywords?: string,
  isDynamic?: boolean
) => {
  //GraphQL query

  const query = gql`
    query MyQuery(
      $access_key: String!
      $categories: String!
      $keywords: String
    ) {
      myQuery(
        access_key: $access_key
        categories: $categories
        countries: "us"
        sort: "published_desc"
        keywords: $keywords
      ) {
        data {
          author
          category
          country
          description
          image
          language
          published_at
          source
          title
          url
        }
        pagination {
          count
          limit
          offset
          total
        }
      }
    }
  `;

  // Fetch function with nextjs 13 caching... this replaces ssr and isr
  const res = await fetch('https://mehendiganj.stepzen.net/api/existing-boxer/__graphql', {
    method: "POST",
    // isDynamic --> ssr notDynamic --> revalidate isr
    cache: isDynamic ? "no-cache" : "default",

    next: isDynamic ? { revalidate: 0 } : { revalidate: 20 },
    headers: {
        "Content-Type": "application/json",
        Authorization: `Apikey ${process.env.STEPZEN_API_KEY}`
    },
    body: JSON.stringify({
        query, //acts as a query 
        // variables required
        variables: {
            access_key: process.env.MEDIASTACK_API_KEY,
            categories: category,
            keywords: keywords
        }
    })
  });

  // console.log("Loading New Data From API for Category >>>",
  // category,
  // keywords);
  
  // returening the response....
const newsResponse = await res.json();

//sort function by images present
const news = sortNewsByImage(newsResponse.data.myQuery);


//return news
return news;
};

export default fetchNews;


// // stepzen import curl http://api.mediastack.com/v1/news?access_key=api_key




















































































































































// import { gql } from "graphql-request";
// import sortNewsByImage from "./sortNewsByImage";

// const fetchNews = async (
//   category?: Category | string,
//   keywords?: string,
//   isDynamic?: boolean
//     //determines whether page might remain caching or not ie ISR...> serverser side rendering ie: no-cache



// ) => {
//     // graph query

//     const 
//     query = gql`
//     query MyQuery(
//       $access_key: String!
//       $categories: String!
//       $keywords: String
//     ) {
//       myQuery(
//         access_key: (access_key: $access_key
//         categories: $categories
//         countries: "us"
//         sort: "published_desc"
//         keywords: $keywords
//       ) {
//         data {
//           author
//           category
//           country
//           description
//           image
//           language
//           published_at
//           source
//           title
//           url
//         }
//         pagination {
//           count
//           limit
//           offset
//           total
//         }
//       }
//     }
//   `;
    
    
//     // fetch func with news..caching

//     const res = await fetch(`https://mehendiganj.stepzen.net/api/existing-boxer/__graphql`, {
//         method: 'POST',
//         // caching original ssr...> isDynamic: ssr isNotDynamic: ISR
//         cache: isDynamic ? "no-cache" : "default",
//         // nex rule works if is is dynamic
//         next: isDynamic ? { revalidate: 0 } : { revalidate: 20 },
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Apikey ${process.env.SEPZEN_API_KEY}`,
//         },
//         body: JSON.stringify({
//           query,
//           // stepzen expecs some variables
//           variables: {
//             access_key: process.env.MEDIASTACK_API_KEY,
//             categories: category,
//             keywords: keywords,
          
//           },
//         }),
//       },
      
//       );
//       console.log("LOADING DATA: ", category, keywords);
//       // returning the response...
//       const newsResponse = await res.json();
//       // sorting by Images with those withoiit
//       const news = sortNewsByImage(newsResponse.data.query)
//       // returning the news...
//       return news;
// }

// export default fetchNews;

