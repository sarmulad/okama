import productsData from "@/data/products.json"
import type { Product } from "./shop-data"

export function getAllProductsFromJSON(): Product[] {
  const allProducts: Product[] = []

  Object.entries(productsData).forEach(([category, products]) => {
    products.forEach((product: any) => {
      allProducts.push({
        ...product,
        category: category as "music" | "apparel" | "accessories",
      })
    })
  })

  return allProducts
}

// Easy inventory update function
export async function updateInventoryInJSON(productId: string, newInventory: number) {
  // In production, you'd want to use an API endpoint to update the JSON file
  console.log(`Would update ${productId} inventory to ${newInventory}`)

  // For development, you can manually edit the JSON file
  // Or create an API endpoint that writes to the file
}
