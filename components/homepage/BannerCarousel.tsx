'use client'

import { useState, useEffect } from 'react'
import { ChevronLeft, ChevronRight, Circle } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface Banner {
  id: number
  title: string
  subtitle: string
  image: string
  ctaText: string
  ctaLink: string
}

const mockBanners: Banner[] = [
  {
    id: 1,
    title: "Festival Special Collection",
    subtitle: "Traditional Indian wear for all occasions",
    image: "https://images.unsplash.com/photo-1610035487656-1e6b1b8c2b8e?w=1200&h=400&fit=crop",
    ctaText: "Shop Now",
    ctaLink: "/category/fashion"
  },
  {
    id: 2,
    title: "Authentic Indian Sweets",
    subtitle: "Fresh from the finest sweet shops",
    image: "https://images.unsplash.com/photo-1571875773068-2d8148a6d4c8?w=1200&h=400&fit=crop",
    ctaText: "Order Now",
    ctaLink: "/category/sweets"
  },
  {
    id: 3,
    title: "Handloom Heritage",
    subtitle: "Support traditional weavers and artisans",
    image: "https://images.unsplash.com/photo-1528459801416-a9e53bbf4e40?w=1200&h=400&fit=crop",
    ctaText: "Explore",
    ctaLink: "/category/handlooms"
  },
  {
    id: 4,
    title: "Regional Snacks Delight",
    subtitle: "Taste the flavors of India",
    image: "https://images.unsplash.com/photo-1585032226651-759b368d7246?w=1200&h=400&fit=crop",
    ctaText: "Browse",
    ctaLink: "/category/regional-snacks"
  },
  {
    id: 5,
    title: "Traditional Glassware",
    subtitle: "Elegant home decor pieces",
    image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=1200&h=400&fit=crop",
    ctaText: "Discover",
    ctaLink: "/category/glassware"
  }
]

export default function BannerCarousel() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)
  const [isHovered, setIsHovered] = useState(false)

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % mockBanners.length)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + mockBanners.length) % mockBanners.length)
  }

  const goToSlide = (index: number) => {
    setCurrentSlide(index)
  }

  // Auto-play functionality
  useEffect(() => {
    if (!isAutoPlaying || isHovered) return

    const interval = setInterval(() => {
      nextSlide()
    }, 2000) // 2 seconds per slide

    return () => clearInterval(interval)
  }, [isAutoPlaying, isHovered])

  return (
    <div 
      className="relative w-full overflow-hidden bg-gray-100"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Banner Container */}
      <div className="relative h-[400px] md:h-[400px] lg:h-[400px]">
        <div 
          className="flex transition-transform duration-500 ease-in-out h-full"
          style={{ transform: `translateX(-${currentSlide * 100}%)` }}
        >
          {mockBanners.map((banner) => (
            <div
              key={banner.id}
              className="w-full flex-shrink-0 relative"
            >
              {/* Background Image */}
              <div 
                className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                style={{ backgroundImage: `url(${banner.image})` }}
              />
              
              {/* Overlay for text readability */}
              <div className="absolute inset-0 bg-black bg-opacity-40" />
              
              {/* Content */}
              <div className="relative h-full flex items-center justify-center text-center px-4">
                <div className="max-w-4xl mx-auto">
                  <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">
                    {banner.title}
                  </h1>
                  <p className="text-lg md:text-xl lg:text-2xl text-white mb-8">
                    {banner.subtitle}
                  </p>
                  <Button 
                    size="lg" 
                    className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-3 text-lg"
                    onClick={() => window.location.href = banner.ctaLink}
                  >
                    {banner.ctaText}
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Navigation Arrows */}
      <Button
        variant="outline"
        size="icon"
        className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white border-white shadow-lg"
        onClick={prevSlide}
      >
        <ChevronLeft className="h-4 w-4" />
      </Button>
      
      <Button
        variant="outline"
        size="icon"
        className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white border-white shadow-lg"
        onClick={nextSlide}
      >
        <ChevronRight className="h-4 w-4" />
      </Button>

      {/* Navigation Dots */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {mockBanners.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`transition-all duration-300 ${
              currentSlide === index 
                ? 'bg-white w-8' 
                : 'bg-white/50 hover:bg-white/75 w-2'
            } h-2 rounded-full`}
          />
        ))}
      </div>

      {/* Pause/Play Button */}
      <Button
        variant="outline"
        size="icon"
        className="absolute top-4 right-4 bg-white/80 hover:bg-white border-white shadow-lg"
        onClick={() => setIsAutoPlaying(!isAutoPlaying)}
      >
        {isAutoPlaying ? (
          <Circle className="h-4 w-4" />
        ) : (
          <div className="w-4 h-4 flex items-center justify-center">
            <div className="w-0 h-0 border-l-8 border-l-gray-600 border-y-4 border-y-transparent ml-1" />
          </div>
        )}
      </Button>
    </div>
  )
}
