import Link from "next/link"
import { Github, Twitter, Linkedin, Mail, Layers } from "lucide-react"

export function Footer() {
  return (
    <footer className="border-t bg-background mt-6">
      <div className="container py-6 sm:py-8 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 pt-6">
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="h-8 w-8 bg-gradient-to-tr from-indigo-500 via-purple-500 to-pink-500 rounded-full flex items-center justify-center shadow-lg ring-1 ring-white/20">
                <Layers className="h-4 w-4 text-white" />
              </div>
              <span className="text-lg font-bold">Algomind</span>
            </div>
            <p className="text-sm text-muted-foreground">
              Master algorithms and AI concepts with interactive learning and AI-powered assistance.
            </p>
            <div className="flex space-x-4">
              <Link href="#" className="text-muted-foreground hover:text-foreground">
                <Github className="h-4 w-4" />
                <span className="sr-only">GitHub</span>
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-foreground">
                <Twitter className="h-4 w-4" />
                <span className="sr-only">Twitter</span>
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-foreground">
                <Linkedin className="h-4 w-4" />
                <span className="sr-only">LinkedIn</span>
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-foreground">
                <Mail className="h-4 w-4" />
                <span className="sr-only">Email</span>
              </Link>
            </div>
          </div>
          
          <div className="space-y-4">
            <h3 className="text-sm font-medium">Categories</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link href="/categories/ai-ml" className="hover:text-foreground">AI/ML Algorithms</Link></li>
              <li><Link href="/categories/dsa" className="hover:text-foreground">Data Structures</Link></li>
              <li><Link href="/categories/research" className="hover:text-foreground">Research Papers</Link></li>
              <li><Link href="/categories/system-design" className="hover:text-foreground">System Design</Link></li>
            </ul>
          </div>
          
          <div className="space-y-4">
            <h3 className="text-sm font-medium">Resources</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link href="/articles" className="hover:text-foreground">All Articles</Link></li>
              <li><Link href="/trending" className="hover:text-foreground">Trending Topics</Link></li>
              <li><Link href="/playground" className="hover:text-foreground">Code Playground</Link></li>
              <li><Link href="/ai-assistant" className="hover:text-foreground">AI Assistant</Link></li>
            </ul>
          </div>
          
          <div className="space-y-4">
            <h3 className="text-sm font-medium">Company</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link href="/about" className="hover:text-foreground">About</Link></li>
              <li><Link href="/contact" className="hover:text-foreground">Contact</Link></li>
              <li><Link href="/privacy" className="hover:text-foreground">Privacy Policy</Link></li>
              <li><Link href="/terms" className="hover:text-foreground">Terms of Service</Link></li>
            </ul>
          </div>
        </div>
        
        <div className="mt-6 sm:mt-8 pt-1 sm:pt-1 border-t">
          <p className="text-center text-sm text-muted-foreground py-4">
            © 2024 Algomind. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
