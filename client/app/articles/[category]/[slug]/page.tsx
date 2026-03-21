import { Metadata } from 'next'
import { getArticleBySlug, getCategories } from '@/lib/articles'
import { Header } from "@/components/layout/header"
import { Sidebar } from "@/components/layout/sidebar"
import { Footer } from "@/components/layout/footer"
import { ArrowLeft, Tag } from "lucide-react"
import Link from "next/link"
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import "@/styles/global.css"

interface ArticlePageProps {
  params: {
    category: string
    slug: string
  }
}

export async function generateMetadata({ params: awaitedParams }: ArticlePageProps): Promise<Metadata> {
  const params = await awaitedParams
  const article = await getArticleBySlug(params.category, params.slug)
  
  if (!article) {
    return {
      title: 'Article Not Found',
      description: 'The requested article could not be found.'
    }
  }

  const categories = await getCategories()
  const category = categories.find(c => c.slug === params.category)

  return {
    title: `${article.title} | ${category?.name || 'Algomind'}`,
    description: article.description,
    keywords: article.tags.join(', '),
  }
}

export default async function ArticlePage({ params: awaitedParams }: ArticlePageProps) {
  const params = await awaitedParams
  const article = await getArticleBySlug(params.category, params.slug)
  const categories = await getCategories()
  const category = categories.find(c => c.slug === params.category)

  if (!article || !category) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <div className="flex flex-1">
          <Sidebar />
          <main className="flex-1 lg:ml-64 ml-0 relative">
            <div className="container px-3 sm:px-4 lg:px-8 py-4 sm:py-6 lg:py-8">
              <div className="text-center">
                <h1 className="text-4xl font-bold text-gray-900 mb-4">Article Not Found</h1>
                <p className="text-xl text-gray-600 mb-8">The article you're looking for doesn't exist.</p>
                <Link href="/" className="text-blue-600 hover:text-blue-800">
                  ← Back to Home
                </Link>
              </div>
            </div>
            <Footer />
          </main>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <div className="flex flex-1">
        <Sidebar />
        <main className="flex-1 lg:ml-64 ml-0">
          <div className="article-container">
            {/* Article Header */}
            <header className="post-header">
              <div className="post-meta-badges">
                <Link href={`/categories/${category.slug}`} className="post-category-link">
                  <span className={`post-category-badge ${category.color}`}>{category.name}</span>
                </Link>
                <span className={`post-difficulty-badge difficulty-${article.difficulty.toLowerCase()}`}>
                  {article.difficulty}
                </span>
              </div>
              
              <h1 className="post-title">{article.title}</h1>
            
            {/* Tags */}
            {article.tags.length > 0 && (
              <div className="post-tags">
                {article.tags.map((tag, index) => (
                  <span key={index} className="post-tag">
                    <Tag className="post-tag-icon" />
                    {tag}
                  </span>
                ))}
              </div>
            )}
            </header>

            {/* Article Content */}
            <article className="post-content">
              <ReactMarkdown remarkPlugins={[remarkGfm]}>
                {article.content}
              </ReactMarkdown>
            </article>

            {/* Article Footer */}
            <footer className="post-footer">
              <div className="footer-navigation">
                <Link href={`/categories/${category.slug}`} className="back-to-category">
                  <ArrowLeft className="back-icon" />
                  Back to {category.name}
                </Link>
              </div>
            </footer>
          </div>
          <Footer />
        </main>
      </div>
    </div>
  )
}

export async function generateStaticParams() {
  return []
}
