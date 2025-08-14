"use client"

import { motion } from "framer-motion"
import { useState, useEffect } from "react"
import { Calendar, User, ArrowRight, Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Navigation from "@/components/navigation"
import Footer from "@/components/footer"
import Link from "next/link"

interface BlogPost {
  _id: string
  title: string
  slug: string
  excerpt: string
  content: string
  publishedAt: string
  author: {
    name: string
    image?: string
  }
  mainImage?: {
    asset: {
      url: string
    }
    alt?: string
  }
  categories: Array<{
    title: string
    slug: string
  }>
  tags?: string[]
}

export default function BlogPage() {
  const [posts, setPosts] = useState<BlogPost[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")

  // Mock data for demonstration (replace with actual Sanity data)
  const mockPosts: BlogPost[] = [
    {
      _id: "1",
      title: "The Sacred Journey: How Indigenous Music Shapes Modern Worship",
      slug: "sacred-journey-indigenous-music-modern-worship",
      excerpt:
        "Exploring the profound connection between ancient indigenous musical traditions and contemporary worship experiences.",
      content: "",
      publishedAt: "2024-01-15T00:00:00Z",
      author: { name: "Joseph Crow Feather" },
      mainImage: {
        asset: { url: "/placeholder.svg?height=400&width=600" },
        alt: "Indigenous worship ceremony",
      },
      categories: [{ title: "Spirituality", slug: "spirituality" }],
      tags: ["worship", "indigenous", "music", "spirituality"],
    },
    {
      _id: "2",
      title: "Behind the Scenes: Recording Sacred Winds Album",
      slug: "behind-scenes-recording-sacred-winds",
      excerpt: "Take a look inside our studio sessions and the creative process behind our latest album Sacred Winds.",
      content: "",
      publishedAt: "2024-01-10T00:00:00Z",
      author: { name: "Maria Singing Bird" },
      mainImage: {
        asset: { url: "/placeholder.svg?height=400&width=600" },
        alt: "Recording studio",
      },
      categories: [{ title: "Music", slug: "music" }],
      tags: ["album", "recording", "studio", "creative process"],
    },
    {
      _id: "3",
      title: "The Power of Traditional Instruments in Modern Settings",
      slug: "power-traditional-instruments-modern-settings",
      excerpt:
        "How we incorporate traditional indigenous instruments like flutes and drums into contemporary music arrangements.",
      content: "",
      publishedAt: "2024-01-05T00:00:00Z",
      author: { name: "David Thunder Wolf" },
      mainImage: {
        asset: { url: "/placeholder.svg?height=400&width=600" },
        alt: "Traditional instruments",
      },
      categories: [{ title: "Culture", slug: "culture" }],
      tags: ["instruments", "traditional", "modern", "arrangement"],
    },
    {
      _id: "4",
      title: "Connecting Cultures Through Music: Our International Tour Experience",
      slug: "connecting-cultures-music-international-tour",
      excerpt:
        "Sharing our experiences from performing across different cultures and how music transcends all boundaries.",
      content: "",
      publishedAt: "2024-01-05T00:00:00Z",
      author: { name: "David Thunder Wolf" },
      mainImage: {
        asset: { url: "/placeholder.svg?height=400&width=600" },
        alt: "Concert performance",
      },
      categories: [{ title: "Tours", slug: "tours" }],
      tags: ["tour", "international", "culture", "performance"],
    },
    {
      _id: "5",
      title: "Finding Your Voice: A Message to Young Indigenous Artists",
      slug: "finding-voice-message-young-indigenous-artists",
      excerpt:
        "Encouraging the next generation of indigenous artists to embrace their heritage while pursuing their musical dreams.",
      content: "",
      publishedAt: "2023-12-20T00:00:00Z",
      author: { name: "Joseph Crow Feather" },
      mainImage: {
        asset: { url: "/placeholder.svg?height=400&width=600" },
        alt: "Young musicians",
      },
      categories: [{ title: "Community", slug: "community" }],
      tags: ["youth", "indigenous", "artists", "inspiration"],
    },
    {
      _id: "6",
      title: "The Healing Power of Sacred Music",
      slug: "healing-power-sacred-music",
      excerpt:
        "Exploring how sacred music has been used for healing and spiritual transformation throughout indigenous cultures.",
      content: "",
      publishedAt: "2023-12-15T00:00:00Z",
      author: { name: "Maria Singing Bird" },
      mainImage: {
        asset: { url: "/placeholder.svg?height=400&width=600" },
        alt: "Healing ceremony",
      },
      categories: [{ title: "Spirituality", slug: "spirituality" }],
      tags: ["healing", "sacred", "transformation", "ceremony"],
    },
  ]

  useEffect(() => {
    // In a real app, you would fetch from Sanity here
    // const fetchPosts = async () => {
    //   try {
    //     const data = await getBlogPosts()
    //     setPosts(data)
    //   } catch (error) {
    //     console.error('Error fetching posts:', error)
    //   } finally {
    //     setLoading(false)
    //   }
    // }
    // fetchPosts()

    // For now, use mock data
    setPosts(mockPosts)
    setLoading(false)
  }, [])

  const categories = [
    { id: "all", label: "All Posts" },
    { id: "spirituality", label: "Spirituality" },
    { id: "music", label: "Music" },
    { id: "tours", label: "Tours" },
    { id: "community", label: "Community" },
    { id: "culture", label: "Culture" },
  ]

  const filteredPosts = posts.filter((post) => {
    const matchesSearch =
      post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === "all" || post.categories.some((cat) => cat.slug === selectedCategory)
    return matchesSearch && matchesCategory
  })

  const featuredPost = filteredPosts[0]
  const regularPosts = filteredPosts.slice(1)

  if (loading) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-pink-500 mx-auto mb-4"></div>
          <p className="text-xl">Loading blog posts...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <Navigation />

      {/* Hero Section */}
      <section className="pt-24 pb-12 bg-gradient-to-b from-gray-900 to-black">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h1 className="text-5xl md:text-7xl font-bold mb-6">
              OKAMA <span className="text-pink-500">BLOG</span>
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Stories, insights, and reflections from our musical and spiritual journey
            </p>
          </motion.div>
        </div>
      </section>

      {/* Search and Filter */}
      <section className="py-8 bg-black border-b border-gray-800">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Search blog posts..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-gray-800 border border-gray-700 rounded-lg pl-10 pr-4 py-2 focus:outline-none focus:border-pink-500"
              />
            </div>
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <Button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  variant={selectedCategory === category.id ? "default" : "outline"}
                  size="sm"
                  className={`${
                    selectedCategory === category.id
                      ? "bg-pink-500 hover:bg-pink-600 text-white"
                      : "border-gray-600 text-gray-300 hover:border-pink-500 hover:text-pink-500"
                  }`}
                >
                  {category.label}
                </Button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Featured Post */}
      {featuredPost && (
        <section className="py-12 bg-gradient-to-b from-black to-gray-900">
          <div className="container mx-auto px-4">
            <motion.div initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
              <Card className="bg-gray-800 border-gray-700 overflow-hidden">
                <div className="grid md:grid-cols-2 gap-0">
                  <div className="relative h-64 md:h-auto">
                    <img
                      src={featuredPost.mainImage?.asset.url || "/placeholder.svg"}
                      alt={featuredPost.mainImage?.alt || featuredPost.title}
                      className="w-full h-full object-cover"
                    />
                    <Badge className="absolute top-4 left-4 bg-pink-500">Featured</Badge>
                  </div>
                  <CardContent className="p-8 flex flex-col justify-center">
                    <div className="flex items-center gap-4 text-sm text-gray-400 mb-4">
                      <div className="flex items-center gap-1">
                        <Calendar size={16} />
                        {new Date(featuredPost.publishedAt).toLocaleDateString()}
                      </div>
                      <div className="flex items-center gap-1">
                        <User size={16} />
                        {featuredPost.author.name}
                      </div>
                    </div>
                    <h2 className="text-2xl md:text-3xl font-bold mb-4">{featuredPost.title}</h2>
                    <p className="text-gray-300 mb-6 leading-relaxed">{featuredPost.excerpt}</p>
                    <div className="flex flex-wrap gap-2 mb-6">
                      {featuredPost.categories.map((category) => (
                        <Badge key={category.slug} variant="outline" className="border-pink-500 text-pink-500">
                          {category.title}
                        </Badge>
                      ))}
                    </div>
                    <Link href={`/blog/${featuredPost.slug}`}>
                      <Button className="bg-pink-500 hover:bg-pink-600 w-fit">
                        Read Full Article
                        <ArrowRight size={16} className="ml-2" />
                      </Button>
                    </Link>
                  </CardContent>
                </div>
              </Card>
            </motion.div>
          </div>
        </section>
      )}

      {/* Blog Posts Grid */}
      <section className="py-12 bg-gradient-to-b from-gray-900 to-black">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {regularPosts.map((post, index) => (
              <motion.div
                key={post._id}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Link href={`/blog/${post.slug}`}>
                  <Card className="bg-gray-800 border-gray-700 overflow-hidden group hover:border-pink-500/50 transition-colors h-full">
                    <div className="relative h-48">
                      <img
                        src={post.mainImage?.asset.url || "/placeholder.svg"}
                        alt={post.mainImage?.alt || post.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    <CardContent className="p-6 flex flex-col flex-1">
                      <div className="flex items-center gap-4 text-sm text-gray-400 mb-3">
                        <div className="flex items-center gap-1">
                          <Calendar size={14} />
                          {new Date(post.publishedAt).toLocaleDateString()}
                        </div>
                        <div className="flex items-center gap-1">
                          <User size={14} />
                          {post.author.name}
                        </div>
                      </div>
                      <h3 className="text-xl font-bold mb-3 line-clamp-2 group-hover:text-pink-400 transition-colors">
                        {post.title}
                      </h3>
                      <p className="text-gray-300 mb-4 line-clamp-3 flex-1">{post.excerpt}</p>
                      <div className="flex flex-wrap gap-2 mb-4">
                        {post.categories.slice(0, 2).map((category) => (
                          <Badge
                            key={category.slug}
                            variant="outline"
                            className="border-gray-600 text-gray-400 text-xs"
                          >
                            {category.title}
                          </Badge>
                        ))}
                      </div>
                      <Button
                        variant="outline"
                        className="border-pink-500 text-pink-500 hover:bg-pink-500 hover:text-white w-full bg-transparent group-hover:bg-pink-500 group-hover:text-white transition-colors"
                      >
                        Read More
                        <ArrowRight size={14} className="ml-2" />
                      </Button>
                    </CardContent>
                  </Card>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
