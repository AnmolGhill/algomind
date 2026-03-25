import { Metadata } from 'next'
import { getArticleBySlug, getCategories } from '@/lib/articles'
import { Header } from "@/components/layout/header"
import { Sidebar } from "@/components/layout/sidebar"
import { Footer } from "@/components/layout/footer"
import { MarkdownContent } from "@/components/markdown-content"
import { ArrowLeft, Tag, Clock, User, Calendar, BookOpen, Star, Heart, Share2, Bookmark } from "lucide-react"
import Link from "next/link"
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
          <div className="container py-6">
            {/* Article Header */}
            <article className="mb-8">
              <div className="mb-4">
                <Link href={`/categories/${category.slug}`} className="inline-block">
                  <span className={`px-3 py-1 text-sm font-medium rounded-full ${category.color}`}>
                    {category.name}
                  </span>
                </Link>
              </div>
              
              <h1 className="text-4xl font-bold text-gray-900 mb-4">
                {article.title}
              </h1>
              
              <p className="text-xl text-gray-600 mb-6">
                {article.description}
              </p>
              
              {/* Article Meta */}
              <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 mb-6">
                <div className="flex items-center gap-2">
                  <User className="w-4 h-4" />
                  <span>Algomind Team</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  <span>{new Date(article.date).toLocaleDateString()}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  <span>{article.readTime}</span>
                </div>
                <div className="flex items-center gap-2">
                  <BookOpen className="w-4 h-4" />
                  <span className={`px-2 py-1 rounded text-xs font-medium ${
                    article.difficulty === 'Easy' ? 'bg-green-100 text-green-800' :
                    article.difficulty === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-red-100 text-red-800'
                  }`}>
                    {article.difficulty}
                  </span>
                </div>
              </div>
              
              {/* Tags */}
              <div className="flex flex-wrap gap-2 mb-6">
                {article.tags.map((tag, index) => (
                  <span key={index} className="inline-flex items-center gap-1 px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full">
                    <Tag className="w-3 h-3" />
                    {tag}
                  </span>
                ))}
              </div>
              
              {/* Action Buttons */}
              <div className="flex items-center gap-4 pb-6 border-b border-gray-200">
                <div className="flex items-center gap-2">
                  <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                    <Heart className="w-4 h-4" />
                    <span>Like</span>
                  </button>
                  <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                    <Bookmark className="w-4 h-4" />
                    <span>Save</span>
                  </button>
                  <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                    <Share2 className="w-4 h-4" />
                    Share
                  </button>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600 ml-auto">
                  <Star className="w-4 h-4 fill-current text-yellow-500" />
                  <span>4.8</span>
                  <span>•</span>
                  <span>2.3K views</span>
                </div>
              </div>
            </article>

            {/* Article Content with Custom Components */}
            <div className="prose prose-lg max-w-none">
              <MarkdownContent content={article.content} />
            </div>

            {/* Article Footer */}
            <footer className="mt-12 pt-8 border-t border-gray-200">
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
