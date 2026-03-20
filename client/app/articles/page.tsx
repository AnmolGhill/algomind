import { Header } from "@/components/layout/header"
import { Sidebar } from "@/components/layout/sidebar"
import { Footer } from "@/components/layout/footer"
import { Button } from "@/components/ui/button"
import { Search, Filter, Clock, Star, Brain, Code, FileText, Settings } from "lucide-react"
import "@/styles/global.css"

const allArticles = [
  {
    id: 1,
    title: "Understanding Neural Networks from Scratch",
    description: "A comprehensive guide to building neural networks without frameworks",
    category: "AI/ML",
    categorySlug: "ai-ml",
    readTime: "15 min",
    difficulty: "Intermediate",
    tags: ["neural-networks", "deep-learning", "basics"],
    rating: 4.8,
    views: "15.2K",
    publishedAt: "2024-01-15",
    author: "Sarah Chen"
  },
  {
    id: 2,
    title: "Mastering Dynamic Programming",
    description: "Learn the art of dynamic programming with practical examples",
    category: "DSA",
    categorySlug: "dsa",
    readTime: "20 min",
    difficulty: "Advanced",
    tags: ["dynamic-programming", "algorithms", "optimization"],
    rating: 4.9,
    views: "8.7K",
    publishedAt: "2024-01-14",
    author: "Mike Johnson"
  },
  {
    id: 3,
    title: "Attention Mechanisms in Transformers",
    description: "Deep dive into the attention mechanism that powers modern AI",
    category: "Research",
    categorySlug: "research",
    readTime: "25 min",
    difficulty: "Advanced",
    tags: ["transformers", "attention", "nlp"],
    rating: 4.9,
    views: "9.8K",
    publishedAt: "2024-01-13",
    author: "Dr. Emily Wang"
  },
  {
    id: 4,
    title: "System Design for Scalable Applications",
    description: "Build systems that can handle millions of users",
    category: "System Design",
    categorySlug: "system-design",
    readTime: "30 min",
    difficulty: "Intermediate",
    tags: ["scalability", "architecture", "microservices"],
    rating: 4.7,
    views: "12.3K",
    publishedAt: "2024-01-12",
    author: "Alex Kumar"
  },
  {
    id: 5,
    title: "Binary Search Trees Implementation",
    description: "Complete guide to implementing and optimizing BST operations",
    category: "DSA",
    categorySlug: "dsa",
    readTime: "18 min",
    difficulty: "Beginner",
    tags: ["binary-search-tree", "data-structures", "implementation"],
    rating: 4.6,
    views: "6.4K",
    publishedAt: "2024-01-11",
    author: "Lisa Park"
  },
  {
    id: 6,
    title: "Gradient Descent Optimization",
    description: "Understanding gradient descent and its variants",
    category: "AI/ML",
    categorySlug: "ai-ml",
    readTime: "22 min",
    difficulty: "Intermediate",
    tags: ["gradient-descent", "optimization", "machine-learning"],
    rating: 4.8,
    views: "11.1K",
    publishedAt: "2024-01-10",
    author: "Tom Wilson"
  },
  {
    id: 7,
    title: "Distributed Systems Patterns",
    description: "Common patterns for building distributed systems",
    category: "System Design",
    categorySlug: "system-design",
    readTime: "28 min",
    difficulty: "Advanced",
    tags: ["distributed-systems", "patterns", "architecture"],
    rating: 4.7,
    views: "7.9K",
    publishedAt: "2024-01-09",
    author: "Rachel Green"
  },
  {
    id: 8,
    title: "Graph Algorithms Fundamentals",
    description: "Essential graph algorithms for problem solving",
    category: "DSA",
    categorySlug: "dsa",
    readTime: "25 min",
    difficulty: "Intermediate",
    tags: ["graphs", "algorithms", "bfs", "dfs"],
    rating: 4.8,
    views: "9.2K",
    publishedAt: "2024-01-08",
    author: "David Lee"
  },
  {
    id: 9,
    title: "Recent Advances in Computer Vision",
    description: "Survey of latest computer vision research and applications",
    category: "Research",
    categorySlug: "research",
    readTime: "35 min",
    difficulty: "Advanced",
    tags: ["computer-vision", "research", "survey"],
    rating: 4.9,
    views: "5.6K",
    publishedAt: "2024-01-07",
    author: "Dr. Jennifer Liu"
  }
]

const categories = [
  { name: "All Categories", slug: "all", icon: null },
  { name: "AI/ML", slug: "ai-ml", icon: Brain },
  { name: "DSA", slug: "dsa", icon: Code },
  { name: "Research", slug: "research", icon: FileText },
  { name: "System Design", slug: "system-design", icon: Settings }
]

export default function ArticlesPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <div className="flex flex-1">
        <Sidebar />
        <main className="flex-1 ml-64">
          <div className="container">
            {/* Page Header */}
            <section className="mb-6">
              <h1 className="text-3xl font-bold mb-4">All Articles</h1>
              <p className="text-muted-foreground text-lg">
                Explore our comprehensive collection of articles on algorithms, AI, and system design.
              </p>
            </section>

            {/* Search and Filters */}
            <section className="mb-6">
              <div className="flex flex-col gap-4">
                <div className="relative max-w-md w-full">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <input
                    type="text"
                    placeholder="Search articles..."
                    className="search-input"
                  />
                </div>
                
                <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between">
                  <div className="flex flex-wrap gap-2">
                    {categories.map((category) => {
                      const Icon = category.icon
                      return (
                        <Button
                          key={category.slug}
                          variant={category.slug === "all" ? "default" : "outline"}
                          size="sm"
                          className="category-filter-btn"
                        >
                          {Icon && <Icon className="h-4 w-4 mr-2" />}
                          {category.name}
                        </Button>
                      )
                    })}
                  </div>
                  
                  <div className="flex items-center gap-4">
                    <select className="sort-select">
                      <option>Most Popular</option>
                      <option>Latest First</option>
                      <option>Oldest First</option>
                      <option>Highest Rated</option>
                      <option>Most Viewed</option>
                    </select>
                    <Button variant="outline" size="sm" className="hidden lg:inline-flex">
                      <Filter className="h-4 w-4 mr-2" />
                      More Filters
                    </Button>
                  </div>
                </div>
              </div>
            </section>

            {/* Stats Bar */}
            <section className="stats-bar">
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-2">
                <div className="text-sm text-muted-foreground">
                  Showing <span className="font-medium text-foreground">9</span> of <span className="font-medium text-foreground">555+</span> articles
                </div>
                <Button variant="ghost" size="sm" className="lg:hidden justify-start p-0 h-auto">
                  <Filter className="h-4 w-4 mr-2" />
                  More Filters
                </Button>
              </div>
            </section>

            {/* Articles Grid */}
            <section className="articles-grid">
              {allArticles.map((article) => (
                <article
                  key={article.id}
                  className="article-card"
                >
                  <div className="article-meta">
                    <span className={`article-category category-${article.categorySlug}`}>
                      {article.category}
                    </span>
                    <div className="article-read-time">
                      <Clock className="h-3 w-3" />
                      {article.readTime}
                    </div>
                  </div>
                  
                  <h3 className="article-title">
                    {article.title}
                  </h3>
                  
                  <p className="article-description">
                    {article.description}
                  </p>
                  
                  <div className="article-tags">
                    {article.tags.slice(0, 3).map((tag, tagIndex) => (
                      <span
                        key={tagIndex}
                        className="article-tag"
                      >
                        {tag}
                      </span>
                    ))}
                    {article.tags.length > 3 && (
                      <span className="article-tag">
                        +{article.tags.length - 3}
                      </span>
                    )}
                  </div>
                  
                  <div className="article-stats">
                    <div className="flex items-center gap-1">
                      <Star className="h-3 w-3 fill-current" />
                      <span>{article.rating}</span>
                    </div>
                    <span>{article.views} views</span>
                    <span className={`article-difficulty difficulty-${article.difficulty.toLowerCase()}`}>
                      {article.difficulty}
                    </span>
                  </div>
                  
                  <div className="article-footer">
                    <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-1">
                      <span>{article.author}</span>
                      <span>{new Date(article.publishedAt).toLocaleDateString()}</span>
                    </div>
                  </div>
                </article>
              ))}
            </section>

            {/* Pagination */}
            <section className="pagination">
              <Button variant="outline" size="sm" disabled>
                Previous
              </Button>
              <Button variant="default" size="sm">1</Button>
              <Button variant="outline" size="sm">2</Button>
              <Button variant="outline" size="sm">3</Button>
              <span className="px-2 text-sm text-muted-foreground">...</span>
              <Button variant="outline" size="sm">62</Button>
              <Button variant="outline" size="sm">
                Next
              </Button>
            </section>
          </div>
          <Footer />
        </main>
      </div>
    </div>
  )
}
