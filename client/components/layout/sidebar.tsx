"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Brain, Code, FileText, Settings, Home, BookOpen, TrendingUp } from "lucide-react"

const navigation = [
  { name: "Home", href: "/", icon: Home },
  { name: "AI/ML Algorithms", href: "/categories/ai-ml", icon: Brain, category: "ai-ml" },
  { name: "DSA", href: "/categories/dsa", icon: Code, category: "dsa" },
  { name: "Research Papers", href: "/categories/research", icon: FileText, category: "research" },
  { name: "System Design", href: "/categories/system-design", icon: Settings, category: "system-design" },
  { name: "All Articles", href: "/articles", icon: BookOpen },
  { name: "Trending", href: "/trending", icon: TrendingUp },
]

export function Sidebar() {
  const pathname = usePathname()

  return (
    <aside className="hidden lg:block fixed left-0 top-16 bottom-0 w-64 border-r bg-background">
      <nav className="flex flex-col gap-2 p-4">
        {navigation.map((item) => {
          const isActive = pathname === item.href
          const Icon = item.icon
          
          return (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground transition-colors",
                isActive && "bg-accent text-accent-foreground",
                item.category && `category-${item.category}`
              )}
            >
              <Icon className="h-4 w-4" />
              {item.name}
            </Link>
          )
        })}
      </nav>
      
      <div className="absolute bottom-4 left-4 right-4">
        <div className="rounded-lg bg-muted p-4">
          <h3 className="font-medium text-sm mb-2">AI Assistant</h3>
          <p className="text-xs text-muted-foreground mb-3">
            Get help with algorithms and coding problems
          </p>
          <button className="w-full bg-primary text-primary-foreground rounded-md px-3 py-2 text-sm font-medium hover:bg-primary/90 transition-colors">
            Ask AI
          </button>
        </div>
      </div>
    </aside>
  )
}
