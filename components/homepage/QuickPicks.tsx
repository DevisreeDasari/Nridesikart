'use client'

import ProductCard from '@/components/product/ProductCard'
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
}

// Mock data for demonstration
const mockNonEdibleProducts: Product[] = [
  {
    id: '1',
    name: 'Men Cotton Shirt - Premium Quality',
    price: 1299,
    discount_price: 999,
    images: [
      'https://images.unsplash.com/photo-1596755094514-f87e34085bab?w=300&h=300&fit=crop',
      'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=300&h=300&fit=crop'
    ],
    rating: 4.5,
    review_count: 234,
    category: 'Fashion',
    sub_category: 'Men Shirts'
  },
  {
    id: '2',
    name: 'Women Silk Saree - Traditional Design',
    price: 3999,
    discount_price: 2999,
    images: [
      'https://images.unsplash.com/photo-1528459801416-a9e53bbf4e40?w=300&h=300&fit=crop',
      'https://images.unsplash.com/photo-1610035487656-1e6b1b8c2b8e?w=300&h=300&fit=crop'
    ],
    rating: 4.8,
    review_count: 156,
    category: 'Fashion',
    sub_category: 'Women Sarees'
  },
  {
    id: '3',
    name: 'Banarasi Silk Fabric - Authentic',
    price: 2499,
    images: [
      'https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?w=300&h=300&fit=crop',
      'https://images.unsplash.com/photo-1617040666226-3b2485adea2b?w=300&h=300&fit=crop'
    ],
    rating: 4.7,
    review_count: 78,
    category: 'Handlooms',
    sub_category: 'Fabrics'
  },
  {
    id: '4',
    name: 'Kashmiri Shawl - Hand Embroidered',
    price: 5999,
    discount_price: 4999,
    images: [
      'https://images.unsplash.com/photo-1590736969955-71cc94901144?w=300&h=300&fit=crop',
      'https://images.unsplash.com/photo-1583499465779-4b1d9f4b5d7b?w=300&h=300&fit=crop'
    ],
    rating: 4.9,
    review_count: 45,
    category: 'Handlooms',
    sub_category: 'Shawls'
  },
  {
    id: '5',
    name: 'Glass Vase - Decorative Art Piece',
    price: 1299,
    discount_price: 999,
    images: [
      'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=300&h=300&fit=crop',
      'https://images.unsplash.com/photo-1549497538-303791108f95?w=300&h=300&fit=crop'
    ],
    rating: 4.4,
    review_count: 67,
    category: 'Glassware',
    sub_category: 'Decorative Items'
  },
  {
    id: '6',
    name: 'Denim Jeans - Comfort Fit',
    price: 1599,
    discount_price: 1299,
    images: [
      'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=300&h=300&fit=crop',
      'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=300&h=300&fit=crop'
    ],
    rating: 4.4,
    review_count: 189,
    category: 'Fashion',
    sub_category: 'Men Jeans'
  },
  {
    id: '7',
    name: 'Cotton Kurti - Modern Design',
    price: 899,
    discount_price: 699,
    images: [
      'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=300&h=300&fit=crop',
      'https://images.unsplash.com/photo-1539008835657-9e8e9680c956?w=300&h=300&fit=crop'
    ],
    rating: 4.5,
    review_count: 156,
    category: 'Fashion',
    sub_category: 'Women Kurtis'
  },
  {
    id: '8',
    name: 'Traditional Clay Pot - Handmade',
    price: 399,
    discount_price: 299,
    images: [
      'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=300&h=300&fit=crop',
      'https://images.unsplash.com/photo-1549497538-303791108f95?w=300&h=300&fit=crop'
    ],
    rating: 4.5,
    review_count: 89,
    category: 'Pottery',
    sub_category: 'Traditional Items'
  },
  {
    id: '9',
    name: 'Tussar Silk Saree - Natural Sheen',
    price: 4999,
    discount_price: 3999,
    images: [
      'https://images.unsplash.com/photo-1528459801416-a9e53bbf4e40?w=300&h=300&fit=crop',
      'https://images.unsplash.com/photo-1617040666226-3b2485adea2b?w=300&h=300&fit=crop'
    ],
    rating: 4.9,
    review_count: 34,
    category: 'Fashion',
    sub_category: 'Women Sarees'
  },
  {
    id: '10',
    name: 'Decorative Glass Bowl - Artisan Craft',
    price: 899,
    images: [
      'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=300&h=300&fit=crop',
      'https://images.unsplash.com/photo-1549497538-303791108f95?w=300&h=300&fit=crop'
    ],
    rating: 4.3,
    review_count: 56,
    category: 'Glassware',
    sub_category: 'Decorative Items'
  }
]

const mockEdibleProducts: Product[] = [
  {
    id: '11',
    name: 'Motichur Ladoo - Traditional Sweet',
    price: 599,
    images: [
      'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=300&h=300&fit=crop',
      'https://images.unsplash.com/photo-1549497538-303791108f95?w=300&h=300&fit=crop'
    ],
    rating: 4.6,
    review_count: 89,
    category: 'Foods',
    sub_category: 'Sweets'
  },
  {
    id: '12',
    name: 'Aloo Bhujia - Crispy Snack',
    price: 199,
    discount_price: 149,
    images: [
      'https://images.unsplash.com/photo-1585032226651-759b368d7246?w=300&h=300&fit=crop',
      'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=300&h=300&fit=crop'
    ],
    rating: 4.3,
    review_count: 267,
    category: 'Foods',
    sub_category: 'Namkeen'
  },
  {
    id: '13',
    name: 'Kaju Katli - Premium Cashew Barfi',
    price: 899,
    discount_price: 799,
    images: [
      'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=300&h=300&fit=crop',
      'https://images.unsplash.com/photo-1549497538-303791108f95?w=300&h=300&fit=crop'
    ],
    rating: 4.8,
    review_count: 123,
    category: 'Foods',
    sub_category: 'Sweets'
  },
  {
    id: '14',
    name: 'Rasgulla - Soft Spongy Delight',
    price: 499,
    images: [
      'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=300&h=300&fit=crop',
      'https://images.unsplash.com/photo-1549497538-303791108f95?w=300&h=300&fit=crop'
    ],
    rating: 4.6,
    review_count: 234,
    category: 'Foods',
    sub_category: 'Sweets'
  },
  {
    id: '15',
    name: 'Banana Chips - South Indian Special',
    price: 299,
    discount_price: 249,
    images: [
      'https://images.unsplash.com/photo-1585032226651-759b368d7246?w=300&h=300&fit=crop',
      'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=300&h=300&fit=crop'
    ],
    rating: 4.5,
    review_count: 145,
    category: 'Foods',
    sub_category: 'Regional Snacks'
  },
  {
    id: '16',
    name: 'Garam Masala - Authentic Blend',
    price: 249,
    images: [
      'https://images.unsplash.com/photo-1585032226651-759b368d7246?w=300&h=300&fit=crop',
      'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=300&h=300&fit=crop'
    ],
    rating: 4.7,
    review_count: 198,
    category: 'Foods',
    sub_category: 'Spices & Masalas'
  },
  {
    id: '17',
    name: 'Mango Pickle - Homemade',
    price: 399,
    images: [
      'https://images.unsplash.com/photo-1585032226651-759b368d7246?w=300&h=300&fit=crop',
      'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=300&h=300&fit=crop'
    ],
    rating: 4.4,
    review_count: 167,
    category: 'Foods',
    sub_category: 'Packaged Foods'
  },
  {
    id: '18',
    name: 'Jalebi - Crispy Sweet Delicacy',
    price: 349,
    images: [
      'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=300&h=300&fit=crop',
      'https://images.unsplash.com/photo-1549497538-303791108f95?w=300&h=300&fit=crop'
    ],
    rating: 4.6,
    review_count: 289,
    category: 'Foods',
    sub_category: 'Sweets'
  },
  {
    id: '19',
    name: 'Murukku - Traditional South Indian Snack',
    price: 259,
    images: [
      'https://images.unsplash.com/photo-1585032226651-759b368d7246?w=300&h=300&fit=crop',
      'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=300&h=300&fit=crop'
    ],
    rating: 4.3,
    review_count: 134,
    category: 'Foods',
    sub_category: 'Regional Snacks'
  },
  {
    id: '20',
    name: 'Dry Fruit Mix - Premium Quality',
    price: 799,
    discount_price: 699,
    images: [
      'https://images.unsplash.com/photo-1585032226651-759b368d7246?w=300&h=300&fit=crop',
      'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=300&h=300&fit=crop'
    ],
    rating: 4.8,
    review_count: 178,
    category: 'Foods',
    sub_category: 'Packaged Foods'
  }
]

interface QuickPicksProps {
  onQuickView?: (product: Product) => void
  onAddToCart?: (product: Product) => void
}

export default function QuickPicks({ onQuickView, onAddToCart }: QuickPicksProps) {
  const handleQuickView = (product: Product) => {
    onQuickView?.(product)
  }

  const handleAddToCart = (product: Product) => {
    onAddToCart?.(product)
    // Show success toast notification
    alert(`${product.name} added to cart!`)
  }

  const renderProductGrid = (products: Product[], title: string) => (
    <div className="mb-12">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-800">{title}</h2>
        <Button variant="outline" className="text-orange-600 border-orange-600 hover:bg-orange-50">
          View All
        </Button>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        {products.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            onQuickView={handleQuickView}
            onAddToCart={handleAddToCart}
          />
        ))}
      </div>
    </div>
  )

  return (
    <div className="container mx-auto px-4 py-12">
      {/* Non-Edible Items Section */}
      {renderProductGrid(mockNonEdibleProducts, "Featured Fashion & Lifestyle")}
      
      {/* Section Divider */}
      <div className="flex items-center justify-center my-8">
        <div className="h-px bg-gray-300 flex-1"></div>
        <span className="px-4 text-gray-500 font-medium">Authentic Indian Delicacies</span>
        <div className="h-px bg-gray-300 flex-1"></div>
      </div>
      
      {/* Edible Items Section */}
      {renderProductGrid(mockEdibleProducts, "Traditional Indian Foods")}
    </div>
  )
}
