"use client"

import { motion } from "framer-motion"
import { Calendar, User, ArrowRight, BookOpen } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"

export default function FeaturedBlog() {
  // Featured blog posts - you can later connect this to your Sanity CMS
  const featuredPosts = [
    {
      id: "1",
      title: "The Sacred Journey: How Indigenous Music Shapes Modern Worship",
      slug: "sacred-journey-indigenous-music-modern-worship",
      excerpt:
        "Exploring the profound connection between ancient indigenous musical traditions and contemporary worship experiences.",
      publishedAt: "2024-01-15T00:00:00Z",
      author: { name: "Joseph Crow Feather" },
      image: "/placeholder.svg?height=300&width=400",
      category: "Spirituality",
      readTime: "5 min read",
    },
    {
      id: "2",
      title: "Behind the Scenes: Recording Sacred Winds Album",
      slug: "behind-scenes-recording-sacred-winds",
      excerpt: "Take a look inside our studio sessions and the creative process behind our latest album Sacred Winds.",
      publishedAt: "2024-01-10T00:00:00Z",
      author: { name: "Maria Singing Bird" },
      image: "/placeholder.svg?height=300&width=400",
      category: "Music",
      readTime: "7 min read",
    },
    {
      id: "3",
      title: "The Power of Traditional Instruments in Modern Settings",
      slug: "power-traditional-instruments-modern-settings",
      excerpt:
        "How we incorporate traditional indigenous instruments like flutes and drums into contemporary music arrangements.",
      publishedAt: "2024-01-05T00:00:00Z",
      author: { name: "David Thunder Wolf" },
      image: "/placeholder.svg?height=300&width=400",
      category: "Culture",
      readTime: "6 min read",
    },
  ]

  return (
    <section className="py-20 bg-gradient-to-b from-gray-900 to-black relative overflow-hidden">
      {/* Subtle background texture */}
      <div className="absolute inset-0 opacity-3">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle at 30% 70%, rgba(139, 69, 19, 0.05) 20%, transparent 50%)`,
            backgroundSize: "300px 300px",
          }}
        />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <div className="flex items-center justify-center mb-4">
            <BookOpen className="text-pink-500 mr-3" size={32} />
            <h2 className="text-4xl md:text-5xl font-bold">
              FEATURED <span className="text-pink-500">STORIES</span>
            </h2>
          </div>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Insights, stories, and reflections from our musical and spiritual journey
          </p>
        </motion.div>

        {/* Featured Posts Grid */}
        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {featuredPosts.map((post, index) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
            >
              <Link href={`/blog/${post.slug}`}>
                <Card className="bg-gray-800/50 border-gray-700/50 overflow-hidden group hover:border-pink-500/50 transition-all duration-300 h-full backdrop-blur-sm">
                  <div className="relative">
                    <img
                      src={post.image || "/placeholder.svg"}
                      alt={post.title}
                      className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    <Badge className="absolute top-3 left-3 bg-amber-600/90 backdrop-blur-sm">{post.category}</Badge>
                    <div className="absolute bottom-3 right-3 text-xs text-white/80 bg-black/50 px-2 py-1 rounded backdrop-blur-sm">
                      {post.readTime}
                    </div>
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

                    <p className="text-gray-300 mb-4 line-clamp-3 flex-1 leading-relaxed">{post.excerpt}</p>

                    <Button
                      variant="ghost"
                      className="text-pink-500 hover:text-pink-400 hover:bg-pink-500/10 p-0 h-auto font-semibold group/btn mt-auto"
                    >
                      Read More
                      <ArrowRight
                        size={16}
                        className="ml-2 group-hover/btn:translate-x-1 transition-transform duration-200"
                      />
                    </Button>
                  </CardContent>
                </Card>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* View All Button */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-center"
        >
          <Link href="/blog">
            <Button
              size="lg"
              className="bg-gradient-to-r from-pink-500 to-pink-600 hover:from-pink-600 hover:to-pink-700 px-8 py-3 rounded-full font-semibold tracking-wider"
            >
              View All Stories
              <ArrowRight size={20} className="ml-2" />
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
