"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Package, AlertTriangle, TrendingUp, Edit3 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { getAllProducts, getLowStockProducts } from "@/lib/product-manager"

export default function ProductDashboard() {
  const [products] = useState(getAllProducts())
  const [lowStockProducts] = useState(getLowStockProducts(10))

  const totalProducts = products.length
  const totalValue = products.reduce((sum, product) => sum + product.price * product.inventory, 0)
  const featuredProducts = products.filter((p) => p.featured).length

  return (
    <div className="min-h-screen bg-black text-white p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold mb-8 text-pink-500">OKAMA Product Dashboard</h1>

        {/* Stats Cards */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <Card className="bg-gray-800 border-amber-600/30">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm text-gray-400">Total Products</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center space-x-2">
                <Package className="text-pink-500" size={20} />
                <span className="text-2xl font-bold">{totalProducts}</span>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gray-800 border-amber-600/30">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm text-gray-400">Inventory Value</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center space-x-2">
                <TrendingUp className="text-green-500" size={20} />
                <span className="text-2xl font-bold">${totalValue.toFixed(2)}</span>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gray-800 border-amber-600/30">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm text-gray-400">Featured Products</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center space-x-2">
                <span className="text-2xl font-bold text-amber-600">{featuredProducts}</span>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gray-800 border-amber-600/30">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm text-gray-400">Low Stock Alerts</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center space-x-2">
                <AlertTriangle className="text-red-500" size={20} />
                <span className="text-2xl font-bold text-red-500">{lowStockProducts.length}</span>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Low Stock Alerts */}
        {lowStockProducts.length > 0 && (
          <Card className="bg-red-900/20 border-red-500/30 mb-8">
            <CardHeader>
              <CardTitle className="text-red-400 flex items-center">
                <AlertTriangle className="mr-2" size={20} />
                Low Stock Alerts
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {lowStockProducts.map((product) => (
                  <div key={product.id} className="flex justify-between items-center p-2 bg-red-800/20 rounded">
                    <span>{product.name}</span>
                    <Badge variant="destructive">{product.inventory} left</Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Products Table */}
        <Card className="bg-gray-800 border-amber-600/30">
          <CardHeader>
            <CardTitle>All Products</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-700">
                    <th className="text-left p-2">Product</th>
                    <th className="text-left p-2">Category</th>
                    <th className="text-left p-2">Price</th>
                    <th className="text-left p-2">Inventory</th>
                    <th className="text-left p-2">Status</th>
                    <th className="text-left p-2">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {products.map((product) => (
                    <motion.tr
                      key={product.id}
                      className="border-b border-gray-700/50 hover:bg-gray-700/30"
                      whileHover={{ backgroundColor: "rgba(55, 65, 81, 0.3)" }}
                    >
                      <td className="p-2">
                        <div className="flex items-center space-x-3">
                          <img
                            src={product.image || "/placeholder.svg"}
                            alt={product.name}
                            className="w-10 h-10 object-cover rounded"
                          />
                          <div>
                            <div className="font-medium">{product.name}</div>
                            <div className="text-sm text-gray-400">{product.id}</div>
                          </div>
                        </div>
                      </td>
                      <td className="p-2">
                        <Badge variant="outline" className="capitalize">
                          {product.category}
                        </Badge>
                      </td>
                      <td className="p-2">
                        <div className="font-bold text-pink-500">${product.price}</div>
                        {product.originalPrice && (
                          <div className="text-sm text-gray-500 line-through">${product.originalPrice}</div>
                        )}
                      </td>
                      <td className="p-2">
                        <span className={`font-bold ${product.inventory <= 10 ? "text-red-500" : "text-green-500"}`}>
                          {product.inventory}
                        </span>
                      </td>
                      <td className="p-2">
                        <div className="flex space-x-2">
                          {product.featured && <Badge className="bg-amber-600">Featured</Badge>}
                          <Badge variant={product.inventory > 0 ? "default" : "destructive"}>
                            {product.inventory > 0 ? "In Stock" : "Out of Stock"}
                          </Badge>
                        </div>
                      </td>
                      <td className="p-2">
                        <Button variant="ghost" size="sm" className="text-amber-600 hover:bg-amber-600/20">
                          <Edit3 size={16} />
                        </Button>
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
