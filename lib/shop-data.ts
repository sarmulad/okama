export interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  category: "music" | "apparel" | "accessories";
  image: string;
  description: string;
  stripeProductId?: string;
  stripePriceId?: string;
  inventory: number;
  featured: boolean;
}

export const products: Product[] = [
  {
    id: "sacred-winds-digital",
    name: "Sacred Winds - Digital Album",
    price: 12.99,
    category: "music",
    image: "/images/wind2.jpg",
    description:
      "Our latest album featuring traditional indigenous sounds with modern worship",
    stripeProductId: "prod_sacred_winds_digital",
    stripePriceId: "price_sacred_winds_digital",
    inventory: 999,
    featured: true,
  },
  {
    id: "thunder-prayer-vinyl",
    name: "Thunder Prayer - Vinyl Record",
    price: 29.99,
    originalPrice: 34.99,
    category: "music",
    image: "/images/wind2.jpg",
    description: "Limited edition vinyl of our Thunder Prayer album",
    stripeProductId: "prod_thunder_prayer_vinyl",
    stripePriceId: "price_thunder_prayer_vinyl",
    inventory: 50,
    featured: true,
  },
  {
    id: "okama-logo-tshirt",
    name: "OKAMA Logo T-Shirt",
    price: 24.99,
    category: "apparel",
    image: "/images/wind2.jpg",
    description: "Premium cotton t-shirt with OKAMA logo and native designs",
    stripeProductId: "prod_okama_tshirt",
    stripePriceId: "price_okama_tshirt",
    inventory: 100,
    featured: false,
  },
  {
    id: "ancient-echoes-cd",
    name: "Ancient Echoes - CD",
    price: 15.99,
    category: "music",
    image: "/images/wind2.jpg",
    description: "Physical CD of our debut album Ancient Echoes",
    stripeProductId: "prod_ancient_echoes_cd",
    stripePriceId: "price_ancient_echoes_cd",
    inventory: 100,
    featured: false,
  },
  {
    id: "feather-hoodie",
    name: "Indigenous Feather Hoodie",
    price: 49.99,
    originalPrice: 59.99,
    category: "apparel",
    image: "/images/wind2.jpg",
    description: "Comfortable hoodie featuring traditional feather patterns",
    stripeProductId: "prod_feather_hoodie",
    stripePriceId: "price_feather_hoodie",
    inventory: 75,
    featured: true,
  },
  {
    id: "drum-circle-poster",
    name: "Drum Circle Poster Set",
    price: 19.99,
    category: "accessories",
    image: "/images/wind2.jpg",
    description: "Beautiful poster set featuring drum circle artwork",
    stripeProductId: "prod_drum_poster",
    stripePriceId: "price_drum_poster",
    inventory: 50,
    featured: false,
  },
  {
    id: "sacred-winds-signed-cd",
    name: "Sacred Winds - Signed CD",
    price: 39.99,
    category: "music",
    image: "/images/wind2.jpg",
    description: "Limited edition signed CD of our Sacred Winds album",
    stripeProductId: "prod_sacred_winds_signed",
    stripePriceId: "price_sacred_winds_signed",
    inventory: 25,
    featured: true,
  },
  {
    id: "okama-beanie",
    name: "OKAMA Beanie",
    price: 18.99,
    category: "apparel",
    image: "/images/wind2.jpg",
    description: "Warm beanie with embroidered OKAMA logo",
    stripeProductId: "prod_okama_beanie",
    stripePriceId: "price_okama_beanie",
    inventory: 60,
    featured: false,
  },
];

export const getProductById = (id: string): Product | undefined => {
  return products.find((product) => product.id === id);
};

export const getProductsByCategory = (category: string): Product[] => {
  if (category === "all") return products;
  return products.filter((product) => product.category === category);
};

export const getFeaturedProducts = (): Product[] => {
  return products.filter((product) => product.featured);
};
