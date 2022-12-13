

import { categories } from "../../../constants";
import fetchNews from "../../../utils/fetchNews";
import NewsListComponent from "../../NewsListComponent";
type Props = {
    params: { category: Category };
};


async function NewsCategoryPage({ params: { category } }: Props) {
    const news: NewsResponse = await fetchNews(category);

  return (
    <div>
            <h1 className="headerTitle">{category}</h1>
            <NewsListComponent news={news}/>


        
    </div>
  )
}

export default NewsCategoryPage

// prebuilding pages ie sports category with ISR
export async function generateStaticParams() {
  return categories.map((category) => ({
    category: category,
  }))
}

