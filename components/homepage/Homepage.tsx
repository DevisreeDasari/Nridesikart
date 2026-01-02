'use client'

import { useState } from 'react'
import BannerCarousel from './BannerCarousel'
import QuickPicks from './QuickPicks'
import CategorySurfing from './CategorySurfing'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'

interface Product {
  id: string
  name: string
  price: number
  discount_price?: number
  images: string[]
  rating: number
  review_count: number
  category: string
  sub_category: string
  description?: string
  stock?: number
}

export default function Homepage() {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)
  const [isQuickViewOpen, setIsQuickViewOpen] = useState(false)

  const handleQuickView = (product: Product) => {
    setSelectedProduct(product)
    setIsQuickViewOpen(true)
  }

  const handleAddToCart = (product: Product) => {
    // Add to cart logic here
    console.log('Added to cart:', product.name)
  }

  const closeQuickView = () => {
    setIsQuickViewOpen(false)
    setSelectedProduct(null)
  }

  return (
    <div className="w-full">
      {/* Banner Carousel */}
      <BannerCarousel />

      {/* Quick Picks Section */}
      <QuickPicks 
        onQuickView={handleQuickView}
        onAddToCart={handleAddToCart}
      />

      {/* Category Surfing Section */}
      <CategorySurfing />

      {/* Quick View Modal */}
      <Dialog open={isQuickViewOpen} onOpenChange={setIsQuickViewOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Product Quick View</DialogTitle>
          </DialogHeader>
          
          {selectedProduct && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Product Images */}
              <div className="space-y-4">
                <div className="aspect-square bg-gray-100 rounded-lg overflow-hidden">
                  <img
                    src={selectedProduct.images[0] || '/placeholder-product.jpg'}
                    alt={selectedProduct.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                
                {/* Thumbnail Images */}
                {selectedProduct.images.length > 1 && (
                  <div className="flex space-x-2">
                    {selectedProduct.images.map((image, index) => (
                      <div
                        key={index}
                        className="w-20 h-20 bg-gray-100 rounded overflow-hidden cursor-pointer border-2 border-transparent hover:border-orange-500"
                      >
                        <img
                          src={image}
                          alt={`${selectedProduct.name} ${index + 1}`}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Product Details */}
              <div className="space-y-4">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">
                    {selectedProduct.name}
                  </h2>
                  
                  <div className="flex items-center space-x-2 mb-4">
                    <span className="text-2xl font-bold text-orange-600">
                      ₹{selectedProduct.discount_price || selectedProduct.price}
                    </span>
                    
                    {selectedProduct.discount_price && (
                      <span className="text-lg text-gray-500 line-through">
                        ₹{selectedProduct.price}
                      </span>
                    )}
                    
                    {selectedProduct.discount_price && (
                      <span className="bg-green-100 text-green-800 text-sm px-2 py-1 rounded">
                        {Math.round(((selectedProduct.price - selectedProduct.discount_price) / selectedProduct.price) * 100)}% OFF
                      </span>
                    )}
                  </div>

                  <div className="flex items-center space-x-4 mb-4">
                    <div className="flex items-center">
                      <span className="text-yellow-400">★★★★★</span>
                      <span className="ml-1 text-sm text-gray-600">
                        {selectedProduct.rating} ({selectedProduct.review_count} reviews)
                      </span>
                    </div>
                    
                    <div className="text-sm text-gray-600">
                      {selectedProduct.stock && selectedProduct.stock > 0 ? (
                        <span className="text-green-600">In Stock ({selectedProduct.stock} available)</span>
                      ) : (
                        <span className="text-red-600">Out of Stock</span>
                      )}
                    </div>
                  </div>

                  <p className="text-gray-600 mb-6">
                    {selectedProduct.description || 'High-quality product carefully sourced and crafted to bring you the best of Indian tradition and modern design.'}
                  </p>

                  <div className="space-y-4">
                    <div>
                      <h4 className="font-semibold mb-2">Category</h4>
                      <p className="text-gray-600">{selectedProduct.category} • {selectedProduct.sub_category}</p>
                    </div>

                    <div className="flex space-x-4">
                      <Button 
                        size="lg" 
                        className="flex-1 bg-orange-500 hover:bg-orange-600"
                        onClick={() => handleAddToCart(selectedProduct)}
                      >
                        Add to Cart
                      </Button>
                      
                      <Button 
                        size="lg" 
                        variant="outline"
                        onClick={closeQuickView}
                      >
                        Close
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
