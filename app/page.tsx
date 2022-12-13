import { categories } from "../constants"
import fetchNews from "../utils/fetchNews"
import NewsListComponent from "./NewsListComponent"
import response from "../response.json"

async function HomePage() {
  // fetching in the news..
  const news: NewsResponse = (await fetchNews(categories.join(",")));
  // console.log(news)

  return (
    <div>

      <NewsListComponent news={news} />
    </div>
  )
}

export default HomePage