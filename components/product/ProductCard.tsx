'use client'

import { useState, useEffect } from 'react'
import { Star, ShoppingCart, Eye, Heart } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import Link from 'next/link'

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
}

interface ProductCardProps {
  product: Product
  onQuickView?: (product: Product) => void
  onAddToCart?: (product: Product) => void
}

export default function ProductCard({ product, onQuickView, onAddToCart }: ProductCardProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [isHovered, setIsHovered] = useState(false)
  const [isImageGalleryActive, setIsImageGalleryActive] = useState(false)

  const discountPercentage = product.discount_price 
    ? Math.round(((product.price - product.discount_price) / product.price) * 100)
    : 0

  const renderStars = (rating: number) => {
    const stars = []
    const fullStars = Math.floor(rating)
    const hasHalfStar = rating % 1 !== 0

    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <Star key={`full-${i}`} className="h-3 w-3 fill-yellow-400 text-yellow-400" />
      )
    }

    if (hasHalfStar) {
      stars.push(
        <Star key="half" className="h-3 w-3 fill-yellow-400/50 text-yellow-400" />
      )
    }

    const emptyStars = 5 - Math.ceil(rating)
    for (let i = 0; i < emptyStars; i++) {
      stars.push(
        <Star key={`empty-${i}`} className="h-3 w-3 text-gray-300" />
      )
    }

    return stars
  }

  // Auto-slide image gallery when hovered
  useEffect(() => {
    if (isHovered && product.images.length > 1) {
      setIsImageGalleryActive(true)
      const interval = setInterval(() => {
        setCurrentImageIndex((prev) => (prev + 1) % product.images.length)
      }, 1000)

      return () => clearInterval(interval)
    } else {
      setIsImageGalleryActive(false)
      setCurrentImageIndex(0)
    }
  }, [isHovered, product.images.length])

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    onAddToCart?.(product)
  }

  const handleQuickView = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    onQuickView?.(product)
  }

  return (
    <Card 
      className="group cursor-pointer transition-all duration-300 hover:shadow-lg hover:-translate-y-2 border border-gray-200"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Link href={`/product/${product.id}`}>
        <CardContent className="p-0">
          {/* Product Image Container */}
          <div className="relative h-60 overflow-hidden bg-gray-50">
            <img
              src={product.images[currentImageIndex] || '/placeholder-product.jpg'}
              alt={product.name}
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
            />
            
            {/* Discount Badge */}
            {discountPercentage > 0 && (
              <Badge 
                variant="destructive" 
                className="absolute top-2 left-2 bg-green-600 hover:bg-green-700"
              >
                {discountPercentage}% OFF
              </Badge>
            )}

            {/* Image Gallery Dots */}
            {isImageGalleryActive && product.images.length > 1 && (
              <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex space-x-1">
                {product.images.map((_, index) => (
                  <div
                    key={index}
                    className={`w-2 h-2 rounded-full transition-all ${
                      index === currentImageIndex 
                        ? 'bg-white w-6' 
                        : 'bg-white/50'
                    }`}
                  />
                ))}
              </div>
            )}

            {/* Action Buttons - Appear on Hover */}
            <div 
              className={`absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300 flex items-end justify-center pb-4 space-x-2 ${
                isHovered ? 'opacity-100' : 'opacity-0'
              }`}
            >
              <Button
                size="sm"
                variant="secondary"
                className="bg-white hover:bg-gray-100 text-gray-800 h-8 px-3"
                onClick={handleQuickView}
              >
                <Eye className="h-3 w-3 mr-1" />
                Quick View
              </Button>
              
              <Button
                size="sm"
                className="bg-orange-500 hover:bg-orange-600 text-white h-8 px-3"
                onClick={handleAddToCart}
              >
                <ShoppingCart className="h-3 w-3 mr-1" />
                Add to Cart
              </Button>
            </div>

            {/* Wishlist Button */}
            <Button
              size="icon"
              variant="ghost"
              className="absolute top-2 right-2 bg-white/80 hover:bg-white h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <Heart className="h-4 w-4" />
            </Button>
          </div>

          {/* Product Information */}
          <div className="p-3">
            {/* Product Name */}
            <h3 className="font-semibold text-sm mb-2 line-clamp-2 text-gray-800 group-hover:text-orange-600 transition-colors">
              {product.name}
            </h3>

            {/* Price Section */}
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

            {/* Rating Section */}
            <div className="flex items-center space-x-2">
              <div className="flex items-center">
                {renderStars(product.rating)}
              </div>
              
              <span className="text-xs text-gray-600">
                {product.rating} ({product.review_count} reviews)
              </span>
            </div>
          </div>
        </CardContent>
      </Link>
    </Card>
  )
}
