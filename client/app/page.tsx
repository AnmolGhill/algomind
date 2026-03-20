import Link from "next/link"
import { Header } from "@/components/layout/header"
import { Sidebar } from "@/components/layout/sidebar"
import { Footer } from "@/components/layout/footer"
import { getAllArticles, getCategories, getFeaturedArticles } from '@/lib/articles'
import { Brain, Code, FileText, Settings } from "lucide-react"

export default async function Home() {
  const categories = await getCategories()
  const featuredArticles = await getFeaturedArticles()
  const allArticles = await getAllArticles()

  // Icon mapping for categories
  const getCategoryIcon = (slug: string) => {
    switch (slug) {
      case 'ai-ml':
        return <Brain className="h-6 w-6" />
      case 'dsa':
        return <Code className="h-6 w-6" />
      case 'research':
        return <FileText className="h-6 w-6" />
      case 'system-design':
        return <Settings className="h-6 w-6" />
      default:
        return <FileText className="h-6 w-6" />
    }
  }
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <div className="flex flex-1">
        <Sidebar />
        <main className="flex-1 lg:ml-64">
          <div className="container px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
            {/* Hero Section */}
            <section className="hero-section">
              <h1 className="hero-title">Master Algorithms & AI</h1>
              <p className="hero-description">
                Learn AI/ML algorithms, data structures, and system design with interactive tutorials 
                and AI-powered assistance. Transform your understanding of computer science.
              </p>
              <div className="hero-buttons">
                <button className="hero-button hero-button-primary">
                  Start Learning
                  <span className="ml-2">→</span>
                </button>
                <button className="hero-button hero-button-secondary">
                  Browse Articles
                </button>
              </div>
            </section>

            {/* Categories Section */}
            <section className="categories-section">
              <h2 className="section-title">Explore Categories</h2>
              <div className="categories-grid">
                {categories.map((category, index) => (
                  <Link
                    key={index}
                    href={`/categories/${category.slug}`}
                    className="category-card"
                  >
                    <div className="category-header">
                      <div className={`category-icon ${category.color}`}>
                        <div className="category-icon-inner text-white">
                          {getCategoryIcon(category.slug)}
                        </div>
                      </div>
                      <span className="category-count">{category.articleCount} articles</span>
                    </div>
                    <h3 className="category-title">{category.name}</h3>
                    <p className="category-description">{category.description}</p>
                  </Link>
                ))}
              </div>
            </section>

            {/* Explore Categories with Articles */}
            <section className="explore-categories-section">
              <h2 className="section-title">Explore Categories</h2>
              {categories.map((category) => {
                const categoryArticles = allArticles.filter(article => article.category === category.slug)
                if (categoryArticles.length === 0) return null
                
                return (
                  <div key={category.slug} className="category-section mb-8">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-xl font-semibold">{category.name}</h3>
                      <Link href={`/categories/${category.slug}`} className="text-blue-600 hover:text-blue-800 text-sm">
                        View all {category.articleCount} articles →
                      </Link>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {categoryArticles.slice(0, 3).map((article, articleIndex) => (
                        <Link
                          key={articleIndex}
                          href={`/articles/${article.category}/${article.slug}`}
                          className="article-card"
                        >
                          <div className="article-meta">
                            <span className="article-category">
                              {category.name}
                            </span>
                            <span className="article-read-time">
                              <span>⏱</span>
                              {article.readTime}
                            </span>
                          </div>
                          <h3 className="article-title">{article.title}</h3>
                          <p className="article-description">{article.description}</p>
                          <div className="flex items-center justify-between">
                            <span className={`article-difficulty difficulty-${article.difficulty.toLowerCase()}`}>
                              {article.difficulty}
                            </span>
                            <span className="article-date">
                              {new Date(article.date).toLocaleDateString()}
                            </span>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>
                )
              })}
            </section>

            {/* Featured Articles Section */}
            <section className="articles-section">
              <div className="articles-header">
                <h2 className="section-title">Featured Articles</h2>
                <Link href="/articles" className="articles-link">
                  View all articles →
                </Link>
              </div>
              <div className="articles-grid">
                {featuredArticles.map((article, index) => (
                  <Link
                    key={index}
                    href={`/articles/${article.category}/${article.slug}`}
                    className="article-card"
                  >
                    <div className="article-meta">
                      <span className="article-category">
                        {categories.find(c => c.slug === article.category)?.name || article.category}
                      </span>
                      <span className="article-read-time">
                        <span>⏱</span>
                        {article.readTime}
                      </span>
                    </div>
                    <h3 className="article-title">{article.title}</h3>
                    <p className="article-description">{article.description}</p>
                    <div className="flex items-center justify-between">
                      <span className={`article-difficulty difficulty-${article.difficulty.toLowerCase()}`}>
                        {article.difficulty}
                      </span>
                      <span className="article-date">
                        {new Date(article.date).toLocaleDateString()}
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
            </section>

            {/* CTA Section */}
            <section className="cta-section">
              <div className="cta-container">
                <h2 className="cta-title">Ready to Start Learning?</h2>
                <p className="cta-description">
                  Join thousands of learners mastering algorithms and AI concepts with our interactive platform.
                </p>
                <button className="hero-button hero-button-primary">
                  Get Started Now
                  <span className="ml-2">→</span>
                </button>
              </div>
            </section>
          </div>
          <Footer />
        </main>
      </div>
    </div>
  )
}
