"use client"

import type React from "react"

import { motion } from "framer-motion"
import { useState, useEffect } from "react"
import {
  ArrowLeft,
  Calendar,
  Clock,
  Share2,
  Heart,
  MessageCircle,
  Tag,
  Facebook,
  Twitter,
  Linkedin,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Navigation from "@/components/navigation"
import Footer from "@/components/footer"
import Toast from "@/components/toast-notification"
import { useToast } from "@/hooks/use-toast"
import Link from "next/link"
import { useParams } from "next/navigation"

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
    bio?: string
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
  readTime: string
  likes: number
  comments: number
}

interface Comment {
  id: string
  author: string
  content: string
  date: string
  avatar?: string
}

export default function BlogPostPage() {
  const params = useParams()
  const slug = params.slug as string
  const [post, setPost] = useState<BlogPost | null>(null)
  const [relatedPosts, setRelatedPosts] = useState<BlogPost[]>([])
  const [comments, setComments] = useState<Comment[]>([])
  const [newComment, setNewComment] = useState({ author: "", content: "" })
  const [isLiked, setIsLiked] = useState(false)
  const [likes, setLikes] = useState(0)
  const [loading, setLoading] = useState(true)
  const { toasts, showToast, removeToast } = useToast()

  // Mock blog post data - in real app, fetch from Sanity
  useEffect(() => {
    const fetchBlogPost = async () => {
      setLoading(true)

      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Mock blog posts database
      const blogPosts: { [key: string]: BlogPost } = {
        "sacred-journey-indigenous-music-modern-worship": {
          _id: "1",
          title: "The Sacred Journey: How Indigenous Music Shapes Modern Worship",
          slug: "sacred-journey-indigenous-music-modern-worship",
          excerpt:
            "Exploring the profound connection between ancient indigenous musical traditions and contemporary worship experiences.",
          content: `
            <p>Music has always been the universal language that transcends cultural boundaries and speaks directly to the soul. For indigenous communities, music isn't just entertainment—it's a sacred practice that connects us to our ancestors, our land, and our Creator.</p>

            <h2>The Ancient Roots of Sacred Sound</h2>
            
            <p>Long before European colonization, indigenous peoples across North America had developed rich musical traditions that served multiple purposes: storytelling, healing, ceremony, and worship. These weren't just songs—they were prayers set to melody, stories passed down through generations, and healing practices that addressed both physical and spiritual ailments.</p>

            <p>The drum, often called the heartbeat of Mother Earth, served as the foundation for most indigenous musical expressions. Its steady rhythm represented the pulse of life itself, connecting the earthly realm with the spiritual world. Flutes, rattles, and vocal harmonies added layers of meaning and emotion to these sacred sounds.</p>

            <h2>Bridging Ancient and Modern</h2>

            <p>As OKAMA, we've made it our mission to bridge these ancient musical traditions with contemporary worship practices. This isn't about appropriation—it's about honoring our heritage while speaking to modern hearts that hunger for authentic spiritual connection.</p>

            <p>When we incorporate traditional instruments like the Native American flute into our worship songs, we're not just adding exotic sounds. We're inviting listeners into a deeper understanding of what it means to worship with our whole being—body, mind, and spirit.</p>

            <blockquote>
              <p>"When your sound is a pure reflection of your heart, you find an authentic experience. When your worship is ancient and new, you find a unique cultural expression in you."</p>
            </blockquote>

            <h2>The Transformational Power of Indigenous Worship</h2>

            <p>There's something profoundly transformational that happens when ancient sounds meet modern hearts. We've witnessed it countless times in our concerts—people who have never heard indigenous music before suddenly finding themselves moved to tears, feeling a connection to something greater than themselves.</p>

            <p>This transformation isn't accidental. Indigenous music was designed to facilitate spiritual encounters. The repetitive rhythms induce a meditative state, the natural harmonies align with the frequencies of the earth, and the lyrical content—whether in English or indigenous languages—speaks to universal human experiences of seeking, longing, and connection.</p>

            <h2>Preserving Culture Through Innovation</h2>

            <p>Some might argue that blending traditional indigenous music with contemporary worship dilutes the authenticity of both. We respectfully disagree. Culture isn't a museum piece to be preserved unchanged—it's a living, breathing entity that must evolve to remain relevant.</p>

            <p>By creating music that honors our indigenous roots while speaking to contemporary spiritual seekers, we're ensuring that these sacred traditions don't become relics of the past but remain vibrant expressions of faith for future generations.</p>

            <h2>An Invitation to Experience</h2>

            <p>We invite you to experience this sacred journey for yourself. Whether you're indigenous or not, whether you're a seasoned worshipper or someone just beginning to explore spirituality, there's something in these ancient sounds that speaks to the deepest parts of who you are.</p>

            <p>Come to one of our concerts. Listen to our albums. Let the drums speak to your heartbeat. Let the flutes carry your prayers to the Creator. Let yourself be transformed by the power of indigenous worship music.</p>

            <p>Because when we worship with the sounds of our ancestors, we're not just making music—we're participating in a sacred conversation that has been going on for thousands of years, and we're adding our voices to that eternal song.</p>
          `,
          publishedAt: "2024-01-15T00:00:00Z",
          author: {
            name: "Joseph Crow Feather",
            image: "/placeholder.svg?height=100&width=100",
            bio: "Lead vocalist and spiritual leader of OKAMA, Joseph has been bridging indigenous traditions with contemporary worship for over a decade.",
          },
          mainImage: {
            asset: { url: "/placeholder.svg?height=600&width=1200" },
            alt: "Indigenous worship ceremony with drums and traditional instruments",
          },
          categories: [{ title: "Spirituality", slug: "spirituality" }],
          tags: ["worship", "indigenous", "music", "spirituality", "culture", "tradition"],
          readTime: "8 min read",
          likes: 127,
          comments: 23,
        },
        "behind-scenes-recording-sacred-winds": {
          _id: "2",
          title: "Behind the Scenes: Recording Sacred Winds Album",
          slug: "behind-scenes-recording-sacred-winds",
          excerpt:
            "Take a look inside our studio sessions and the creative process behind our latest album Sacred Winds.",
          content: `
            <p>The creation of our latest album "Sacred Winds" has been a journey of spiritual discovery, artistic growth, and cultural preservation. Over the past year, we've poured our hearts into crafting songs that honor our indigenous heritage while speaking to contemporary souls seeking authentic worship experiences.</p>

            <h2>The Vision Behind Sacred Winds</h2>
            
            <p>Sacred Winds represents more than just a collection of songs—it's a sonic tapestry that weaves together ancient indigenous musical traditions with modern worship sensibilities. Each track was carefully crafted to create an atmosphere where the sacred becomes tangible and the divine feels near.</p>

            <p>The album's title comes from the Lakota understanding that the wind carries prayers to the Creator. In our music, we've tried to capture that same sense of spiritual movement and divine communication.</p>

            <h2>Recording in Sacred Spaces</h2>

            <p>Rather than confining ourselves to traditional recording studios, we chose to record many of the album's tracks in locations that hold spiritual significance. The opening track, "Ancient Echoes," was recorded in a natural amphitheater in the Black Hills, where the acoustics naturally enhanced the ceremonial drums and flutes.</p>

            <p>This decision wasn't just about sound quality—it was about authenticity. We believe that the environment where music is created becomes part of the music itself. The wind through the trees, the echo off canyon walls, the feeling of standing on sacred ground—all of these elements found their way into our recordings.</p>

            <blockquote>
              <p>"When you record in a place where your ancestors prayed, their spirits join in the music. You can hear it in every note, feel it in every rhythm."</p>
            </blockquote>

            <h2>Blending Traditional and Modern</h2>

            <p>One of the biggest challenges in creating Sacred Winds was finding the right balance between honoring traditional indigenous music and creating something that would resonate with contemporary audiences. We spent countless hours working with tribal elders to ensure that our use of traditional elements was respectful and authentic.</p>

            <p>The result is an album that features traditional instruments like the Native American flute, ceremonial drums, and rattles alongside modern instruments like electric guitars and synthesizers. But rather than simply layering these sounds together, we've found ways to make them converse with each other, creating something entirely new while remaining rooted in ancient wisdom.</p>

            <h2>The Collaborative Process</h2>

            <p>Sacred Winds is truly a collaborative effort. We worked with indigenous musicians from various tribes, each bringing their own cultural perspectives and musical traditions to the project. We also collaborated with contemporary Christian artists who share our vision of worship that transcends cultural boundaries.</p>

            <p>These collaborations weren't always easy. There were moments of tension as we navigated questions of cultural appropriation versus appreciation, tradition versus innovation. But through prayer, dialogue, and mutual respect, we found common ground in our shared desire to create music that honors the Creator and serves the community.</p>

            <h2>The Impact We Hope to Make</h2>

            <p>Our prayer for Sacred Winds is that it will serve as a bridge—connecting indigenous and non-indigenous communities, ancient and modern worship styles, traditional and contemporary musical expressions. We hope that listeners will not only enjoy the music but will also gain a deeper appreciation for indigenous culture and spirituality.</p>

            <p>More than anything, we hope that Sacred Winds will create spaces for authentic encounter with the divine. Whether someone is listening alone in their car or participating in corporate worship, we pray that these songs will open hearts and minds to the presence of the Creator.</p>
          `,
          publishedAt: "2024-01-10T00:00:00Z",
          author: {
            name: "Maria Singing Bird",
            image: "/placeholder.svg?height=100&width=100",
            bio: "Producer and songwriter for OKAMA, Maria brings both technical expertise and deep cultural knowledge to the band's creative process.",
          },
          mainImage: {
            asset: { url: "/placeholder.svg?height=600&width=1200" },
            alt: "Recording studio session with traditional and modern instruments",
          },
          categories: [{ title: "Music", slug: "music" }],
          tags: ["album", "recording", "studio", "creative process", "collaboration"],
          readTime: "6 min read",
          likes: 89,
          comments: 15,
        },
        "power-traditional-instruments-modern-settings": {
          _id: "3",
          title: "The Power of Traditional Instruments in Modern Settings",
          slug: "power-traditional-instruments-modern-settings",
          excerpt:
            "How we incorporate traditional indigenous instruments into contemporary arrangements while maintaining their sacred significance.",
          content: `
            <p>In a world increasingly dominated by digital sounds and electronic music, there's something profoundly moving about the organic, earthy tones of traditional indigenous instruments. These instruments carry within them not just musical notes, but the breath of ancestors, the wisdom of generations, and the heartbeat of the earth itself.</p>

            <h2>The Sacred Nature of Indigenous Instruments</h2>
            
            <p>For indigenous peoples, musical instruments are far more than tools for creating sound. They are sacred objects, often blessed in ceremony and treated with the same reverence as other spiritual artifacts. The Native American flute, for instance, is considered a gift from the Creator, its haunting melodies capable of carrying prayers to the spirit world.</p>

            <p>The drum, perhaps the most universal of indigenous instruments, represents the heartbeat of Mother Earth. Its rhythmic pulse connects us to the fundamental rhythms of life—our heartbeat, our breathing, the cycles of the seasons, the ebb and flow of the tides.</p>

            <h2>Challenges of Modern Integration</h2>

            <p>Incorporating these sacred instruments into contemporary musical settings presents unique challenges. How do you honor the traditional significance of an instrument while making it accessible to modern audiences? How do you maintain authenticity while embracing innovation?</p>

            <p>These questions have guided our approach to using traditional instruments in OKAMA's music. We've learned that the key is not to simply add these instruments as exotic flavoring to otherwise conventional songs, but to allow them to shape the entire musical landscape.</p>

            <blockquote>
              <p>"The flute doesn't just play the melody—it breathes life into the song. The drum doesn't just keep time—it calls the community to gather."</p>
            </blockquote>

            <h2>Creating Respectful Arrangements</h2>

            <p>When we arrange our songs, we start with the traditional instruments and build around them. If we're featuring a Native American flute, we consider what that instrument is trying to say, what emotions it's expressing, what prayers it's carrying. Then we craft the rest of the arrangement to support and amplify that message.</p>

            <p>This approach has led us to some unconventional musical choices. We might use a full orchestra to create a backdrop for a single flute, or we might strip everything away except drums and voices to highlight the primal power of rhythm and melody.</p>

            <h2>The Response from Communities</h2>

            <p>One of our greatest joys has been seeing how both indigenous and non-indigenous communities have responded to our use of traditional instruments. Indigenous listeners often tell us that hearing these familiar sounds in new contexts helps them feel seen and honored in spaces where they've historically been marginalized.</p>

            <p>Non-indigenous listeners frequently describe being moved to tears by the sound of a flute or the rhythm of ceremonial drums, even when they don't fully understand the cultural context. There's something universal about these sounds that speaks to the human soul regardless of cultural background.</p>

            <h2>Teaching and Learning</h2>

            <p>Part of our mission is educational. We want people to understand not just how these instruments sound, but what they mean, where they come from, and how they've been used throughout history. In our concerts, we often take time to explain the significance of the instruments we're using and to share stories about their origins.</p>

            <p>We've also been privileged to learn from master craftsmen and traditional musicians who have taught us not just how to play these instruments, but how to approach them with the proper respect and understanding.</p>

            <h2>Looking to the Future</h2>

            <p>As we continue to explore the possibilities of traditional instruments in modern settings, we're constantly amazed by their versatility and power. These ancient tools continue to speak to contemporary hearts, bridging gaps between cultures and generations.</p>

            <p>Our hope is that by featuring these instruments prominently in our music, we're helping to ensure their survival and continued relevance for future generations. In a rapidly changing world, these sounds remind us of our connection to the earth, to each other, and to the sacred.</p>
          `,
          publishedAt: "2024-01-05T00:00:00Z",
          author: {
            name: "David Thunder Wolf",
            image: "/placeholder.svg?height=100&width=100",
            bio: "Master of traditional instruments and cultural historian, David ensures that OKAMA's use of indigenous instruments remains authentic and respectful.",
          },
          mainImage: {
            asset: { url: "/placeholder.svg?height=600&width=1200" },
            alt: "Collection of traditional indigenous instruments including flutes, drums, and rattles",
          },
          categories: [{ title: "Culture", slug: "culture" }],
          tags: ["instruments", "traditional", "modern", "arrangement", "culture"],
          readTime: "5 min read",
          likes: 156,
          comments: 31,
        },
      }

      const mockPost = blogPosts[slug]

      if (mockPost) {
        setPost(mockPost)
        setLikes(mockPost.likes)

        // Mock related posts
        const allPosts = Object.values(blogPosts)
        const related = allPosts.filter((p) => p.slug !== slug).slice(0, 2)
        setRelatedPosts(related)

        // Mock comments
        const mockComments: Comment[] = [
          {
            id: "1",
            author: "Sarah Johnson",
            content:
              "This is such a beautiful perspective on indigenous worship. I attended your concert last month and was moved to tears. Thank you for sharing your culture with us.",
            date: "2024-01-16T10:30:00Z",
            avatar: "/placeholder.svg?height=40&width=40",
          },
          {
            id: "2",
            author: "Michael Running Bear",
            content:
              "As a fellow indigenous musician, I deeply appreciate what OKAMA is doing. You're preserving our traditions while making them accessible to new generations. Keep up the sacred work!",
            date: "2024-01-16T14:15:00Z",
            avatar: "/placeholder.svg?height=40&width=40",
          },
          {
            id: "3",
            author: "Emily Chen",
            content:
              "I've never experienced anything like your music before. It's opened my eyes to a whole new way of understanding worship and spirituality. Thank you for this beautiful article.",
            date: "2024-01-17T09:45:00Z",
            avatar: "/placeholder.svg?height=40&width=40",
          },
        ]

        setComments(mockComments)
      }

      setLoading(false)
    }

    if (slug) {
      fetchBlogPost()
    }
  }, [slug])

  if (loading) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-pink-500 mx-auto mb-4"></div>
          <p className="text-xl">Loading article...</p>
        </div>
      </div>
    )
  }

  if (!post) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Article Not Found</h1>
          <p className="text-gray-400 mb-8">The article you're looking for doesn't exist.</p>
          <Link href="/blog">
            <Button className="bg-pink-500 hover:bg-pink-600">
              <ArrowLeft size={16} className="mr-2" />
              Back to Blog
            </Button>
          </Link>
        </div>
      </div>
    )
  }

  const handleLike = () => {
    setIsLiked(!isLiked)
    setLikes((prev) => (isLiked ? prev - 1 : prev + 1))
    showToast(isLiked ? "Removed from favorites" : "Added to favorites", "success")
  }

  const handleShare = async (platform?: string) => {
    const url = window.location.href
    const title = post.title
    const text = post.excerpt

    if (platform === "twitter") {
      window.open(
        `https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`,
        "_blank",
      )
    } else if (platform === "facebook") {
      window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`, "_blank")
    } else if (platform === "linkedin") {
      window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`, "_blank")
    } else if (navigator.share) {
      try {
        await navigator.share({ title, text, url })
      } catch (error) {
        console.log("Error sharing:", error)
      }
    } else {
      navigator.clipboard.writeText(url)
      showToast("Article link copied to clipboard!", "success")
    }
  }

  const handleCommentSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!newComment.author || !newComment.content) {
      showToast("Please fill in all fields", "error")
      return
    }

    const comment: Comment = {
      id: Date.now().toString(),
      author: newComment.author,
      content: newComment.content,
      date: new Date().toISOString(),
    }

    setComments((prev) => [comment, ...prev])
    setNewComment({ author: "", content: "" })
    showToast("Comment added successfully!", "success")
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <Navigation />

      {/* Toast Notifications */}
      {toasts.map((toast) => (
        <Toast
          key={toast.id}
          message={toast.message}
          type={toast.type}
          isVisible={true}
          onClose={() => removeToast(toast.id)}
        />
      ))}

      {/* Breadcrumb */}
      <section className="pt-24 pb-8 bg-gray-900">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="flex items-center gap-2 text-sm text-gray-400"
          >
            <Link href="/blog" className="hover:text-pink-500 transition-colors flex items-center">
              <ArrowLeft size={16} className="mr-1" />
              Back to Blog
            </Link>
            <span>/</span>
            <span className="capitalize">{post.categories[0]?.title}</span>
            <span>/</span>
            <span className="text-white truncate">{post.title}</span>
          </motion.div>
        </div>
      </section>

      {/* Article Header */}
      <section className="py-12 bg-gradient-to-b from-gray-900 to-black">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            {/* Category and Meta Info */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="flex flex-wrap items-center gap-4 mb-6"
            >
              <Badge className="bg-amber-600">{post.categories[0]?.title}</Badge>
              <div className="flex items-center gap-4 text-sm text-gray-400">
                <div className="flex items-center gap-1">
                  <Calendar size={14} />
                  {new Date(post.publishedAt).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </div>
                <div className="flex items-center gap-1">
                  <Clock size={14} />
                  {post.readTime}
                </div>
                <div className="flex items-center gap-1">
                  <Heart size={14} />
                  {likes} likes
                </div>
                <div className="flex items-center gap-1">
                  <MessageCircle size={14} />
                  {comments.length} comments
                </div>
              </div>
            </motion.div>

            {/* Title */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-4xl md:text-5xl font-bold mb-6 leading-tight"
            >
              {post.title}
            </motion.h1>

            {/* Excerpt */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-xl text-gray-300 mb-8 leading-relaxed"
            >
              {post.excerpt}
            </motion.p>

            {/* Author and Share */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8"
            >
              {/* Author Info */}
              <div className="flex items-center gap-4">
                <img
                  src={post.author.image || "/placeholder.svg"}
                  alt={post.author.name}
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div>
                  <p className="font-semibold">{post.author.name}</p>
                  <p className="text-sm text-gray-400">Author</p>
                </div>
              </div>

              {/* Share and Like Buttons */}
              <div className="flex items-center gap-3">
                <Button
                  onClick={handleLike}
                  variant="outline"
                  className={`border-gray-600 hover:border-pink-500 bg-transparent ${
                    isLiked ? "text-pink-500 border-pink-500" : ""
                  }`}
                >
                  <Heart size={16} fill={isLiked ? "currentColor" : "none"} className="mr-2" />
                  {likes}
                </Button>

                <div className="flex items-center gap-2">
                  <Button
                    onClick={() => handleShare("twitter")}
                    variant="outline"
                    size="sm"
                    className="border-gray-600 hover:border-blue-400 bg-transparent"
                  >
                    <Twitter size={16} />
                  </Button>
                  <Button
                    onClick={() => handleShare("facebook")}
                    variant="outline"
                    size="sm"
                    className="border-gray-600 hover:border-blue-600 bg-transparent"
                  >
                    <Facebook size={16} />
                  </Button>
                  <Button
                    onClick={() => handleShare("linkedin")}
                    variant="outline"
                    size="sm"
                    className="border-gray-600 hover:border-blue-500 bg-transparent"
                  >
                    <Linkedin size={16} />
                  </Button>
                  <Button
                    onClick={() => handleShare()}
                    variant="outline"
                    size="sm"
                    className="border-gray-600 hover:border-pink-500 bg-transparent"
                  >
                    <Share2 size={16} />
                  </Button>
                </div>
              </div>
            </motion.div>

            {/* Featured Image */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="relative aspect-video bg-gray-800 rounded-lg overflow-hidden mb-12"
            >
              <img
                src={post.mainImage?.asset.url || "/placeholder.svg"}
                alt={post.mainImage?.alt || post.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Article Content */}
      <section className="py-12 bg-black">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="prose prose-invert prose-lg max-w-none"
            >
              <div
                className="text-gray-300 leading-relaxed"
                dangerouslySetInnerHTML={{ __html: post.content }}
                style={{
                  fontSize: "1.125rem",
                  lineHeight: "1.75",
                }}
              />
            </motion.div>

            {/* Tags */}
            {post.tags && post.tags.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
                className="flex items-center gap-2 mt-12 pt-8 border-t border-gray-800"
              >
                <Tag size={16} className="text-gray-400" />
                <div className="flex flex-wrap gap-2">
                  {post.tags.map((tag) => (
                    <Badge key={tag} variant="outline" className="border-gray-600 text-gray-400 text-sm">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Author Bio */}
            {post.author.bio && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.7 }}
                className="mt-12"
              >
                <Card className="bg-gray-800/50 border-gray-700">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <img
                        src={post.author.image || "/placeholder.svg"}
                        alt={post.author.name}
                        className="w-16 h-16 rounded-full object-cover"
                      />
                      <div>
                        <h3 className="text-xl font-bold mb-2">About {post.author.name}</h3>
                        <p className="text-gray-300 leading-relaxed">{post.author.bio}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            )}
          </div>
        </div>
      </section>

      {/* Comments Section */}
      <section className="py-12 bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
            >
              <h2 className="text-2xl font-bold mb-8">Comments ({comments.length})</h2>

              {/* Comment Form */}
              <Card className="bg-gray-800 border-gray-700 mb-8">
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold mb-4">Leave a Comment</h3>
                  <form onSubmit={handleCommentSubmit} className="space-y-4">
                    <div>
                      <input
                        type="text"
                        placeholder="Your Name"
                        value={newComment.author}
                        onChange={(e) => setNewComment((prev) => ({ ...prev, author: e.target.value }))}
                        className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 focus:outline-none focus:border-pink-500"
                        required
                      />
                    </div>
                    <div>
                      <textarea
                        placeholder="Your Comment"
                        value={newComment.content}
                        onChange={(e) => setNewComment((prev) => ({ ...prev, content: e.target.value }))}
                        rows={4}
                        className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 focus:outline-none focus:border-pink-500 resize-none"
                        required
                      />
                    </div>
                    <Button
                      type="submit"
                      className="bg-gradient-to-r from-pink-500 to-pink-600 hover:from-pink-600 hover:to-pink-700"
                    >
                      Post Comment
                    </Button>
                  </form>
                </CardContent>
              </Card>

              {/* Comments List */}
              <div className="space-y-6">
                {comments.map((comment, index) => (
                  <motion.div
                    key={comment.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.9 + index * 0.1 }}
                  >
                    <Card className="bg-gray-800/50 border-gray-700">
                      <CardContent className="p-6">
                        <div className="flex items-start gap-4">
                          <img
                            src={comment.avatar || "/placeholder.svg?height=40&width=40"}
                            alt={comment.author}
                            className="w-10 h-10 rounded-full object-cover"
                          />
                          <div className="flex-1">
                            <div className="flex items-center gap-3 mb-2">
                              <h4 className="font-semibold">{comment.author}</h4>
                              <span className="text-sm text-gray-400">
                                {new Date(comment.date).toLocaleDateString()}
                              </span>
                            </div>
                            <p className="text-gray-300 leading-relaxed">{comment.content}</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Related Posts */}
      {relatedPosts.length > 0 && (
        <section className="py-12 bg-black">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 1 }}
              >
                <h2 className="text-3xl font-bold mb-8 text-center">
                  Related <span className="text-pink-500">Articles</span>
                </h2>

                <div className="grid md:grid-cols-2 gap-8">
                  {relatedPosts.map((relatedPost, index) => (
                    <motion.div
                      key={relatedPost._id}
                      initial={{ opacity: 0, y: 50 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                    >
                      <Link href={`/blog/${relatedPost.slug}`}>
                        <Card className="bg-gray-800 border-gray-700 overflow-hidden group hover:border-pink-500/50 transition-colors h-full">
                          <div className="relative">
                            <img
                              src={relatedPost.mainImage?.asset.url || "/placeholder.svg"}
                              alt={relatedPost.title}
                              className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                            />
                            <Badge className="absolute top-3 left-3 bg-amber-600/90 backdrop-blur-sm">
                              {relatedPost.categories[0]?.title}
                            </Badge>
                          </div>
                          <CardContent className="p-6">
                            <div className="flex items-center gap-4 text-sm text-gray-400 mb-3">
                              <div className="flex items-center gap-1">
                                <Calendar size={14} />
                                {new Date(relatedPost.publishedAt).toLocaleDateString()}
                              </div>
                              <div className="flex items-center gap-1">
                                <Clock size={14} />
                                {relatedPost.readTime}
                              </div>
                            </div>
                            <h3 className="text-xl font-bold mb-3 line-clamp-2 group-hover:text-pink-400 transition-colors">
                              {relatedPost.title}
                            </h3>
                            <p className="text-gray-300 line-clamp-3 leading-relaxed">{relatedPost.excerpt}</p>
                          </CardContent>
                        </Card>
                      </Link>
                    </motion.div>
                  ))}
                </div>

                <div className="text-center mt-8">
                  <Link href="/blog">
                    <Button
                      size="lg"
                      className="bg-gradient-to-r from-pink-500 to-pink-600 hover:from-pink-600 hover:to-pink-700"
                    >
                      View All Articles
                    </Button>
                  </Link>
                </div>
              </motion.div>
            </div>
          </div>
        </section>
      )}

      <Footer />
    </div>
  )
}
