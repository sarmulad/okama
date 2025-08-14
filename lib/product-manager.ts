import { products, type Product } from "./shop-data"

// Easy-to-edit product configuration
export const PRODUCT_CONFIG = {
  // Music Products
  music: [
    {
      id: "sacred-winds-digital",
      name: "Sacred Winds - Digital Album",
      price: 12.99,
      description: "Our latest album featuring traditional indigenous sounds with modern worship",
      image: "/images/albums/sacred-winds.jpg",
      inventory: 999, // Digital = unlimited
      featured: true,
      stripeProductId: "prod_sacred_winds_digital",
      stripePriceId: "price_sacred_winds_digital",
    },
    {
      id: "thunder-prayer-vinyl",
      name: "Thunder Prayer - Vinyl Record",
      price: 29.99,
      originalPrice: 34.99,
      description: "Limited edition vinyl of our Thunder Prayer album",
      image: "/images/albums/thunder-prayer-vinyl.jpg",
      inventory: 50,
      featured: true,
      stripeProductId: "prod_thunder_prayer_vinyl",
      stripePriceId: "price_thunder_prayer_vinyl",
    },
    {
      id: "ancient-echoes-cd",
      name: "Ancient Echoes - CD",
      price: 15.99,
      description: "Physical CD of our debut album Ancient Echoes",
      image: "/images/albums/ancient-echoes-cd.jpg",
      inventory: 100,
      featured: false,
      stripeProductId: "prod_ancient_echoes_cd",
      stripePriceId: "price_ancient_echoes_cd",
    },
  ],

  // Apparel Products
  apparel: [
    {
      id: "okama-logo-tshirt",
      name: "OKAMA Logo T-Shirt",
      price: 24.99,
      description: "Premium cotton t-shirt with OKAMA logo and native designs",
      image: "/images/apparel/okama-tshirt.jpg",
      inventory: 100,
      featured: false,
      stripeProductId: "prod_okama_tshirt",
      stripePriceId: "price_okama_tshirt",
      variants: [
        { size: "S", inventory: 25 },
        { size: "M", inventory: 30 },
        { size: "L", inventory: 25 },
        { size: "XL", inventory: 20 },
      ],
    },
    {
      id: "feather-hoodie",
      name: "Indigenous Feather Hoodie",
      price: 49.99,
      originalPrice: 59.99,
      description: "Comfortable hoodie featuring traditional feather patterns",
      image: "/images/apparel/feather-hoodie.jpg",
      inventory: 75,
      featured: true,
      stripeProductId: "prod_feather_hoodie",
      stripePriceId: "price_feather_hoodie",
      variants: [
        { size: "S", inventory: 15 },
        { size: "M", inventory: 20 },
        { size: "L", inventory: 25 },
        { size: "XL", inventory: 15 },
      ],
    },
  ],

  // Accessories
  accessories: [
    {
      id: "drum-circle-poster",
      name: "Drum Circle Poster Set",
      price: 19.99,
      description: "Beautiful poster set featuring drum circle artwork",
      image: "/images/accessories/drum-poster.jpg",
      inventory: 50,
      featured: false,
      stripeProductId: "prod_drum_poster",
      stripePriceId: "price_drum_poster",
    },
    {
      id: "okama-beanie",
      name: "OKAMA Beanie",
      price: 18.99,
      description: "Warm beanie with embroidered OKAMA logo",
      image: "/images/accessories/okama-beanie.jpg",
      inventory: 60,
      featured: false,
      stripeProductId: "prod_okama_beanie",
      stripePriceId: "price_okama_beanie",
    },
  ],
}

// Convert config to products array
export function getAllProducts(): Product[] {
  return products
}

export function getProductsByCategory(category: string): Product[] {
  if (category === "all") return products
  return products.filter((product) => product.category === category)
}

export function getProductById(id: string): Product | undefined {
  return products.find((product) => product.id === id)
}

export function getFeaturedProducts(): Product[] {
  return products.filter((product) => product.featured)
}

export function getLowStockProducts(threshold = 10): Product[] {
  return products.filter((product) => product.inventory <= threshold)
}

// Helper functions for easy management
export function updateProductInventory(productId: string, newInventory: number) {
  // In a real app, this would update a database
  // For now, you'd manually edit the products array in shop-data.ts
  console.log(`Update ${productId} inventory to ${newInventory}`)
}

export function toggleProductFeatured(productId: string) {
  // Toggle featured status
  console.log(`Toggle featured status for ${productId}`)
}
