import { createClient } from "@sanity/client"

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "your-project-id",
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
  useCdn: true,
  apiVersion: "2024-01-01",
})

export async function getBlogPosts() {
  const query = `
    *[_type == "post"] | order(publishedAt desc) {
      _id,
      title,
      slug,
      excerpt,
      publishedAt,
      author->{
        name,
        image
      },
      mainImage{
        asset->{
          url
        },
        alt
      },
      categories[]->{
        title,
        slug
      },
      tags
    }
  `

  try {
    const posts = await client.fetch(query)
    return posts
  } catch (error) {
    console.error("Error fetching blog posts:", error)
    return []
  }
}

export async function getBlogPost(slug: string) {
  const query = `
    *[_type == "post" && slug.current == $slug][0] {
      _id,
      title,
      slug,
      excerpt,
      content,
      publishedAt,
      author->{
        name,
        image
      },
      mainImage{
        asset->{
          url
        },
        alt
      },
      categories[]->{
        title,
        slug
      },
      tags
    }
  `

  try {
    const post = await client.fetch(query, { slug })
    return post
  } catch (error) {
    console.error("Error fetching blog post:", error)
    return null
  }
}

export default client
