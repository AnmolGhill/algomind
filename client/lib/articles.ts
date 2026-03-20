// Use multiple path resolution strategies
function getContentDirectory() {
  // Strategy 1: Standard process.cwd()
  let contentDir = require('path').join(process.cwd(), 'content')
  
  // Strategy 2: If not found, try relative to this file
  if (!require('fs').existsSync(contentDir)) {
    const thisFileDir = require('path').dirname(__filename)
    contentDir = require('path').join(thisFileDir, '..', 'content')
  }
  
  // Strategy 3: Try absolute path from project root
  if (!require('fs').existsSync(contentDir)) {
    contentDir = require('path').join('E:\\Startup\\algomind\\client', 'content')
  }
  
  return contentDir
}

const contentDirectory = getContentDirectory()

// Debug: Log the content directory and check if it exists
console.log('📁 Content directory:', contentDirectory)
console.log('📁 Directory exists:', require('fs').existsSync(contentDirectory))

if (require('fs').existsSync(contentDirectory)) {
  const articlesDir = require('path').join(contentDirectory, 'articles')
  console.log('📁 Articles directory:', articlesDir)
  console.log('📁 Articles directory exists:', require('fs').existsSync(articlesDir))
  
  if (require('fs').existsSync(articlesDir)) {
    const categories = require('fs').readdirSync(articlesDir)
    console.log('📂 Found categories:', categories)
  }
}

export interface Article {
  slug: string
  title: string
  description: string
  category: string
  difficulty: string
  readTime: string
  date: string
  tags: string[]
  content: string
}

export interface Category {
  name: string
  slug: string
  description: string
  color: string
  articleCount: number
}

// Get all articles from all categories
export async function getAllArticles(): Promise<Article[]> {
  const categories = ['ai-ml', 'dsa', 'research', 'system-design']
  const allArticles: Article[] = []

  console.log('🔍 Looking for articles in:', categories)

  for (const category of categories) {
    const categoryPath = require('path').join(contentDirectory, 'articles', category)
    console.log(`📂 Checking path: ${categoryPath}`)
    
    if (require('fs').existsSync(categoryPath)) {
      const fileNames = require('fs').readdirSync(categoryPath)
      console.log(`📄 Found files in ${category}:`, fileNames)
      
      const articles = fileNames
        .filter((name: string) => name.endsWith('.md'))
        .map((fileName: string) => {
          const slug = fileName.replace(/\.md$/, '')
          const fullPath = require('path').join(categoryPath, fileName)
          const fileContents = require('fs').readFileSync(fullPath, 'utf8')
          const matter = require('gray-matter')
          const { data, content } = matter(fileContents)

          const article = {
            slug,
            title: data.title || '',
            description: data.description || '',
            category: data.category || category,
            difficulty: data.difficulty || 'Beginner',
            readTime: data.readTime || '5 min',
            date: data.date || new Date().toISOString().split('T')[0],
            tags: data.tags || [],
            content
          }
          
          console.log(`✅ Loaded article: ${article.title}`)
          return article
        })
      
      allArticles.push(...articles)
    } else {
      console.log(`❌ Path does not exist: ${categoryPath}`)
    }
  }

  console.log(`📚 Total articles loaded: ${allArticles.length}`)
  
  // Sort by date (newest first)
  return allArticles.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
}

// Get articles by category
export async function getArticlesByCategory(categorySlug: string): Promise<Article[]> {
  const allArticles = await getAllArticles()
  return allArticles.filter(article => article.category === categorySlug)
}

// Get single article by slug and category
export async function getArticleBySlug(categorySlug: string, slug: string): Promise<Article | null> {
  const fullPath = require('path').join(contentDirectory, 'articles', categorySlug, `${slug}.md`)
  
  if (!require('fs').existsSync(fullPath)) {
    return null
  }

  const fileContents = require('fs').readFileSync(fullPath, 'utf8')
  const matter = require('gray-matter')
  const { data, content } = matter(fileContents)

  return {
    slug,
    title: data.title || '',
    description: data.description || '',
    category: data.category || categorySlug,
    difficulty: data.difficulty || 'Beginner',
    readTime: data.readTime || '5 min',
    date: data.date || new Date().toISOString().split('T')[0],
    tags: data.tags || [],
    content
  }
}

// Get category information
export async function getCategories(): Promise<Category[]> {
  const categories = [
    {
      name: 'AI/ML Algorithms',
      slug: 'ai-ml',
      description: 'Explore machine learning algorithms, neural networks, and AI concepts',
      color: 'category-ai-ml',
      articleCount: 0
    },
    {
      name: 'Data Structures & Algorithms',
      slug: 'dsa',
      description: 'Master fundamental data structures and algorithmic problem solving',
      color: 'category-dsa',
      articleCount: 0
    },
    {
      name: 'Research Papers',
      slug: 'research',
      description: 'Dive into cutting-edge research papers and academic insights',
      color: 'category-research',
      articleCount: 0
    },
    {
      name: 'System Design',
      slug: 'system-design',
      description: 'Learn scalable system design patterns and architectural concepts',
      color: 'category-system-design',
      articleCount: 0
    }
  ]

  // Count articles in each category
  const allArticles = await getAllArticles()
  categories.forEach(category => {
    category.articleCount = allArticles.filter(article => article.category === category.slug).length
  })

  return categories
}

// Get featured articles (latest from each category)
export async function getFeaturedArticles(): Promise<Article[]> {
  const categories = ['ai-ml', 'dsa', 'research', 'system-design']
  const featuredArticles: Article[] = []

  for (const category of categories) {
    const categoryArticles = await getArticlesByCategory(category)
    if (categoryArticles.length > 0) {
      featuredArticles.push(categoryArticles[0]) // Get latest article from each category
    }
  }

  return featuredArticles
}

// Search articles
export async function searchArticles(query: string): Promise<Article[]> {
  const allArticles = await getAllArticles()
  const lowercaseQuery = query.toLowerCase()

  return allArticles.filter(article => 
    article.title.toLowerCase().includes(lowercaseQuery) ||
    article.description.toLowerCase().includes(lowercaseQuery) ||
    article.tags.some(tag => tag.toLowerCase().includes(lowercaseQuery)) ||
    article.content.toLowerCase().includes(lowercaseQuery)
  )
}

// Get articles by tag
export async function getArticlesByTag(tag: string): Promise<Article[]> {
  const allArticles = await getAllArticles()
  return allArticles.filter(article => 
    article.tags.some(articleTag => articleTag.toLowerCase() === tag.toLowerCase())
  )
}
