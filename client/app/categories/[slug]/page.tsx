import { Metadata } from 'next'
import { getArticlesByCategory, getCategories } from '@/lib/articles'
import { Header } from "@/components/layout/header"
import { Sidebar } from "@/components/layout/sidebar"
import { Footer } from "@/components/layout/footer"
import { Button } from "@/components/ui/button"
import { Brain, Code, FileText, Settings, Clock, Star, Filter } from "lucide-react"
import Link from "next/link"

const categoryData: Record<string, any> = {
  "ai-ml": {
    name: "AI/ML Algorithms",
    description: "Explore machine learning algorithms, neural networks, and artificial intelligence concepts",
    icon: Brain,
    color: "category-ai-ml",
    subcategories: ["Machine Learning", "Neural Networks", "Deep Learning", "NLP", "Computer Vision"]
  },
  "dsa": {
    name: "Data Structures & Algorithms",
    description: "Master fundamental data structures and algorithmic problem solving techniques",
    icon: Code,
    color: "category-dsa",
    subcategories: ["Arrays", "Linked Lists", "Trees", "Graphs", "Dynamic Programming"]
  },
  "research": {
    name: "Research Papers",
    description: "Dive into cutting-edge research papers and academic insights",
    icon: FileText,
    color: "category-research",
    subcategories: ["Machine Learning Research", "Algorithm Papers", "Conference Papers", "Survey Papers"]
  },
  "system-design": {
    name: "System Design",
    description: "Learn scalable system design patterns and architectural concepts",
    icon: Settings,
    color: "category-system-design",
    subcategories: ["Distributed Systems", "Database Design", "Microservices", "Load Balancing", "Caching"]
  }
}

interface CategoryPageProps {
  params: {
    slug: string
  }
}

export async function generateMetadata({ params: awaitedParams }: CategoryPageProps): Promise<Metadata> {
  const params = await awaitedParams
  const categories = await getCategories()
  const category = categories.find(c => c.slug === params.slug)
  
  if (!category) {
    return {
      title: 'Category Not Found',
      description: 'The requested category could not be found.'
    }
  }

  return {
    title: `${category.name} | Algomind`,
    description: category.description,
  }
}

export default async function CategoryPage({ params: awaitedParams }: CategoryPageProps) {
  const params = await awaitedParams
  const categories = await getCategories()
  const categoryInfo = categories.find(c => c.slug === params.slug)
  const category = categoryData[params.slug]
  const articles = await getArticlesByCategory(params.slug)
  
  if (!category || !categoryInfo) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <div className="flex flex-1">
          <Sidebar />
          <main className="flex-1 lg:ml-64 ml-0">
            <div className="container px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
              <div className="text-center">
                <h1 className="text-4xl font-bold text-gray-900 mb-4">Category Not Found</h1>
                <p className="text-xl text-gray-600 mb-8">The category you're looking for doesn't exist.</p>
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

  const Icon = category.icon

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <div className="flex flex-1">
        <Sidebar />
        <main className="flex-1 lg:ml-64 ml-0">
          <div className="container px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
            {/* Category Header */}
            <section className="mb-6 sm:mb-8">
              <div className="flex flex-wrap items-center gap-4 sm:gap-6 text-sm text-muted-foreground mb-6">
                <span>{categoryInfo.articleCount} articles</span>
                <span>•</span>
                <span>Updated daily</span>
              </div>

              {/* Subcategories */}
              <div className="flex flex-wrap gap-2 mb-6">
                {category.subcategories.map((subcat: string, index: number) => (
                  <Button
                    key={index}
                    variant="outline"
                    size="sm"
                    className="text-xs"
                  >
                    {subcat}
                  </Button>
                ))}
              </div>
            </section>

            {/* Filters and Controls */}
            <section className="mb-6">
              <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between">
                <div className="flex flex-wrap items-center gap-4">
                  <Button variant="outline" size="sm">
                    <Filter className="h-4 w-4 mr-2" />
                    Filter
                  </Button>
                  <select className="border rounded-md px-3 py-2 text-sm min-w-[160px]">
                    <option>Most Popular</option>
                    <option>Latest</option>
                    <option>Difficulty: Easy to Hard</option>
                    <option>Difficulty: Hard to Easy</option>
                    <option>Most Rated</option>
                  </select>
                </div>
                <div className="text-sm text-muted-foreground">
                  Showing {articles.length} of {categoryInfo.articleCount} articles
                </div>
              </div>
            </section>

            {/* Articles Grid */}
            {articles.length > 0 ? (
              <section className="articles-section">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                  {articles.map((article, index) => (
                    <Link
                      key={index}
                      href={`/articles/${article.category}/${article.slug}`}
                      className="article-card"
                    >
                      <div className="article-meta">
                        <span className={`article-category ${category.color}`}>
                          {category.name.split(' ')[0]}
                        </span>
                        <div className="flex items-center gap-1 text-xs text-muted-foreground">
                          <Clock className="h-3 w-3" />
                          {article.readTime}
                        </div>
                      </div>
                      
                      <h3 className="article-title">{article.title}</h3>
                      <p className="article-description">{article.description}</p>
                      
                      <div className="flex flex-wrap gap-1 mb-3">
                        {article.tags.slice(0, 3).map((tag: string, tagIndex: number) => (
                          <span
                            key={tagIndex}
                            className="text-xs bg-muted px-2 py-1 rounded"
                          >
                            {tag}
                          </span>
                        ))}
                        {article.tags.length > 3 && (
                          <span className="text-xs bg-muted px-2 py-1 rounded">
                            +{article.tags.length - 3}
                          </span>
                        )}
                      </div>
                      
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
            ) : (
              <section className="text-center py-12">
                <div className="text-gray-400 text-6xl mb-4">📝</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">No articles yet</h3>
                <p className="text-gray-600 mb-6">
                  Articles will appear here once you add them to the content folder.
                </p>
                <div className="bg-gray-50 rounded-lg p-4 text-left max-w-md mx-auto">
                  <h4 className="font-semibold mb-2">How to add articles:</h4>
                  <ol className="text-sm text-gray-600 space-y-1">
                    <li>1. Create a .md file in: <code className="bg-gray-200 px-1 rounded">content/articles/{params.slug}/</code></li>
                    <li>2. Add frontmatter with title, description, etc.</li>
                    <li>3. Write your article content in Markdown</li>
                    <li>4. The article will automatically appear here!</li>
                  </ol>
                </div>
              </section>
            )}

            {/* Load More */}
            <section className="mt-8 sm:mt-12 text-center">
              <Button variant="outline" size="lg" className="w-full sm:w-auto">
                Load More Articles
              </Button>
            </section>
          </div>
          <Footer />
        </main>
      </div>
    </div>
  )
}
