'use client'

import { useState } from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'

const mainCategories = [
  'Fashion',
  'Foods',
  'Glassware',
  'Pottery',
  'Perfumes',
  'Handlooms'
]

const subCategories: Record<string, Record<string, string[]>> = {
  Fashion: {
    "Men's Fashion": ['Shirts', 'T-Shirts', 'Jeans', 'Trousers', 'Watches', 'Footwear'],
    "Women's Fashion": ['Sarees', 'Kurtis', 'Dresses', 'Tops', 'Skirts', 'Footwear'],
    "Kids' Fashion": ['Shirts', 'T-Shirts', 'Shorts', 'Dresses', 'Toys', 'Footwear']
  },
  Foods: {
    'Sweets': ['Motichur Ladoo', 'Kaju Katli', 'Rasgulla', 'Gulab Jamun', 'Barfi', 'Soan Papdi'],
    'Namkeen': ['Aloo Bhujia', 'Sev', 'Mixture', 'Chakli', 'Mathri', 'Khakhra'],
    'Regional Snacks': ['Banana Chips', 'Murukku', 'Samosa', 'Kachori', 'Pakoras', 'Dhokla']
  },
  Glassware: {
    'Drinking Glassware': ['Water Glasses', 'Juice Glasses', 'Wine Glasses', 'Beer Mugs'],
    'Decorative Glassware': ['Vases', 'Bowls', 'Figurines', 'Lanterns'],
    'Serving Ware': ['Platters', 'Trays', 'Cake Stands', 'Storage Containers']
  },
  Pottery: {
    'Traditional Clay': ['Matka', 'Surahi', 'Cooking Pots', 'Diya'],
    'Decorative Pottery': ['Vases', 'Planters', 'Wall Hangings', 'Figurines'],
    'Ceramic Ware': ['Plates', 'Bowls', 'Mugs', 'Cups']
  },
  Perfumes: {
    'Indian Attars': ['Rose', 'Sandalwood', 'Jasmine', 'Musk', 'Oud'],
    'Incense': ['Agarbatti', 'Dhoop', 'Cones', 'Room Fresheners'],
    'Essential Oils': ['Lavender', 'Peppermint', 'Tea Tree', 'Eucalyptus']
  },
  Handlooms: {
    'Sarees': ['Banarasi', 'Kanjivaram', 'Chanderi', 'Tant', 'Pochampally'],
    'Fabrics': ['Cotton', 'Silk', 'Khadi', 'Linen', 'Handwoven'],
    'Traditional Wear': ['Gamchas', 'Lungis', 'Dhotis', 'Shawls', 'Dupattas']
  }
}

// Mock products for display
const mockProducts = Array.from({ length: 12 }, (_, i) => ({
  id: `product-${i + 1}`,
  name: `Sample Product ${i + 1}`,
  price: Math.floor(Math.random() * 5000) + 500,
  discount_price: Math.random() > 0.5 ? Math.floor(Math.random() * 4000) + 400 : undefined,
  images: [`https://images.unsplash.com/photo-${1500000000000 + i}?w=300&h=300&fit=crop`],
  rating: (Math.random() * 2 + 3).toFixed(1),
  review_count: Math.floor(Math.random() * 500) + 10,
  category: mainCategories[Math.floor(Math.random() * mainCategories.length)],
  sub_category: 'Sample'
}))

export default function CategorySurfing() {
  const [selectedCategory, setSelectedCategory] = useState('Fashion')
  const [selectedSubCategories, setSelectedSubCategories] = useState<string[]>([])

  const handleSubCategoryToggle = (subCategory: string) => {
    setSelectedSubCategories(prev => 
      prev.includes(subCategory)
        ? prev.filter(cat => cat !== subCategory)
        : [...prev, subCategory]
    )
  }

  const clearFilters = () => {
    setSelectedSubCategories([])
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <h2 className="text-3xl font-bold text-center mb-8">Browse by Category</h2>
      
      <Tabs value={selectedCategory} onValueChange={setSelectedCategory} className="w-full">
        {/* Main Category Tabs */}
        <TabsList className="grid grid-cols-3 md:grid-cols-6 w-full mb-8">
          {mainCategories.map((category) => (
            <TabsTrigger 
              key={category} 
              value={category}
              className="text-sm font-medium"
            >
              {category}
            </TabsTrigger>
          ))}
        </TabsList>

        {/* Category Content */}
        {mainCategories.map((category) => (
          <TabsContent key={category} value={category} className="mt-0">
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
              {/* Left Sidebar - Sub-Categories */}
              <div className="lg:col-span-1">
                <div className="bg-white border rounded-lg p-4 sticky top-20">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="font-semibold">Filters</h3>
                    {selectedSubCategories.length > 0 && (
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        onClick={clearFilters}
                        className="text-orange-600 hover:text-orange-700"
                      >
                        Clear All
                      </Button>
                    )}
                  </div>
                  
                  <div className="space-y-4">
                    {Object.entries(subCategories[category] || {}).map(([parentCategory, subCats]: [string, string[]]) => (
                      <div key={parentCategory}>
                        <h4 className="font-medium text-sm mb-2">{parentCategory}</h4>
                        <div className="space-y-2">
                          {subCats.map((subCat: string) => (
                            <label 
                              key={subCat} 
                              className="flex items-center space-x-2 cursor-pointer"
                            >
                              <input
                                type="checkbox"
                                checked={selectedSubCategories.includes(subCat)}
                                onChange={() => handleSubCategoryToggle(subCat)}
                                className="rounded text-orange-500 focus:ring-orange-500"
                              />
                              <span className="text-sm">{subCat}</span>
                            </label>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Main Content Area - Product Grid */}
              <div className="lg:col-span-3">
                {/* Active Filters Display */}
                {selectedSubCategories.length > 0 && (
                  <div className="flex flex-wrap gap-2 mb-6">
                    <span className="text-sm text-gray-600">Active filters:</span>
                    {selectedSubCategories.map((subCat) => (
                      <Badge 
                        key={subCat} 
                        variant="secondary"
                        className="cursor-pointer"
                        onClick={() => handleSubCategoryToggle(subCat)}
                      >
                        {subCat} ×
                      </Badge>
                    ))}
                  </div>
                )}

                {/* Product Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {mockProducts.map((product) => (
                    <Card key={product.id} className="group cursor-pointer hover:shadow-lg transition-shadow">
                      <CardContent className="p-0">
                        <div className="relative">
                          <img
                            src={product.images[0]}
                            alt={product.name}
                            className="w-full h-48 object-cover rounded-t-lg"
                          />
                          
                          {product.discount_price && (
                            <Badge className="absolute top-2 left-2 bg-green-600">
                              {Math.round(((product.price - product.discount_price) / product.price) * 100)}% OFF
                            </Badge>
                          )}
                        </div>
                        
                        <div className="p-4">
                          <h3 className="font-semibold text-sm mb-2 line-clamp-2">
                            {product.name}
                          </h3>
                          
                          <div className="flex items-center space-x-2 mb-2">
                            <span className="text-lg font-bold text-orange-600">
                              ₹{product.discount_price || product.price}
                            </span>
                            
                            {product.discount_price && (
                              <span className="text-sm text-gray-500 line-through">
                                ₹{product.price}
                              </span>
                            )}
                          </div>
                          
                          <div className="flex items-center justify-between">
                            <div className="flex items-center">
                              <span className="text-yellow-400 text-sm">★</span>
                              <span className="text-sm text-gray-600 ml-1">
                                {product.rating} ({product.review_count})
                              </span>
                            </div>
                            
                            <Button size="sm" className="bg-orange-500 hover:bg-orange-600">
                              Add to Cart
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>

                {/* Load More Button */}
                <div className="text-center mt-8">
                  <Button variant="outline" className="text-orange-600 border-orange-600 hover:bg-orange-50">
                    Load More Products
                  </Button>
                </div>
              </div>
            </div>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  )
}
