"use client"
import LiveTimestamp from "./LiveTimestamp"
import ReadMoreButton from "./ReadMoreButton"
type Props = {
    article: Article
}

function Article({ article }: Props) {
  return (
    <article className='bg-slate-200 dark:bg-slate-800 flex flex-col rounded-lg shadow-lg hover:scale-105 hover:shadow-lg hover:bg-slate-200 transition-all duration-200 ease-out'>
        {article.image && (
            <img src={article.image} alt={article.title} className="h-56 w-full rounded-t-lg shadow-md" />
        )}

        <div className='flex-1 flex flex-col'>
            <div className='flex-1 flex flex-col p-5'>
                <h2 className='font-serif font-bold'>{article.title}</h2>

                <section className='flex-1 mt-2'>
                    <p className='text-xs line-clamp-6'>{article.description}</p>
                </section>

                <footer className='text-xs text-right ml-auto flex space-x-1 pt-5 italic text-gray-500'>
                    <p>{article.source}-</p>
                    <p>
                        <LiveTimestamp time={article.published_at} />
                        </p>
                </footer>
                
            </div>
            {/* read more button */}
            <ReadMoreButton article={article} />

        </div>
    </article>
  )
}

export default Article