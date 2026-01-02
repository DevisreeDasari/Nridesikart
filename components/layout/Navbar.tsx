'use client'

import { useState, useEffect } from 'react'
import { Search, ShoppingCart, User, Menu, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import { useClerk, useUser } from '@clerk/nextjs'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

const categories = [
  'Fashion',
  'Sweets', 
  'Namkeen',
  'Electronics',
  'Handlooms',
  'Regional Snacks'
]

export default function Navbar() {
  const [searchQuery, setSearchQuery] = useState('')
  const [cartCount, setCartCount] = useState(3) // Mock cart count
  const [isSearchFocused, setIsSearchFocused] = useState(false)
  const [searchSuggestions, setSearchSuggestions] = useState<string[]>([])
  const { isSignedIn, user } = useUser()
  const { signOut } = useClerk()
  const router = useRouter()

  // Mock search suggestions
  const mockSuggestions = [
    'Men Cotton Shirt',
    'Women Silk Saree',
    'Motichur Ladoo',
    'Aloo Bhujia',
    'Banarasi Silk Fabric',
    'Kashmiri Shawl'
  ]

  useEffect(() => {
    if (searchQuery.length > 0) {
      const filtered = mockSuggestions.filter(suggestion =>
        suggestion.toLowerCase().includes(searchQuery.toLowerCase())
      )
      setSearchSuggestions(filtered.slice(0, 5))
    } else {
      setSearchSuggestions([])
    }
  }, [searchQuery])

  const handleSearch = (query: string) => {
    if (query.trim()) {
      router.push(`/search?q=${encodeURIComponent(query.trim())}`)
      setSearchQuery('')
      setSearchSuggestions([])
    }
  }

  const handleSignOut = () => {
    signOut(() => {
      router.push('/')
    })
  }

  const getUserInitials = () => {
    if (user?.firstName && user?.lastName) {
      return `${user.firstName[0]}${user.lastName[0]}`.toUpperCase()
    }
    if (user?.firstName) {
      return user.firstName[0].toUpperCase()
    }
    if (user?.emailAddresses?.[0]?.emailAddress) {
      return user.emailAddresses[0].emailAddress[0].toUpperCase()
    }
    return 'U'
  }

  return (
    <header className="sticky top-0 z-50 bg-white border-b shadow-sm">
      <div className="container mx-auto px-4">
        {/* Primary Navigation */}
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <div className="w-36 h-9 bg-gradient-to-r from-orange-500 to-red-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">NRIDesiKart</span>
            </div>
          </Link>

          {/* Search Bar - Desktop */}
          <div className="hidden md:flex flex-1 max-w-2xl mx-8 relative">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                type="text"
                placeholder="Search for products, brands, and more..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onFocus={() => setIsSearchFocused(true)}
                onBlur={() => setTimeout(() => setIsSearchFocused(false), 200)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    handleSearch(searchQuery)
                  }
                }}
                className="pl-10 pr-4 py-2 w-full border-gray-300 focus:border-orange-500 focus:ring-orange-500"
              />
              
              {/* Search Suggestions Dropdown */}
              {isSearchFocused && searchSuggestions.length > 0 && (
                <div className="absolute top-full left-0 right-0 bg-white border border-gray-200 rounded-lg shadow-lg mt-1 max-h-60 overflow-y-auto z-50">
                  {searchSuggestions.map((suggestion, index) => (
                    <div
                      key={index}
                      className="px-4 py-2 hover:bg-gray-50 cursor-pointer flex items-center"
                      onClick={() => handleSearch(suggestion)}
                    >
                      <Search className="h-4 w-4 text-gray-400 mr-3" />
                      <span className="text-sm">{suggestion}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Right Section */}
          <div className="flex items-center space-x-4">
            {/* Cart Icon */}
            <Link href="/cart" className="relative">
              <Button variant="ghost" size="icon" className="relative">
                <ShoppingCart className="h-5 w-5" />
                {cartCount > 0 && (
                  <Badge 
                    variant="destructive" 
                    className="absolute -top-2 -right-2 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs"
                  >
                    {cartCount}
                  </Badge>
                )}
              </Button>
            </Link>

            {/* User Authentication Section */}
            {isSignedIn ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={user?.imageUrl} alt={user?.firstName || ''} />
                      <AvatarFallback className="bg-orange-100 text-orange-600">
                        {getUserInitials()}
                      </AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56" align="end">
                  <DropdownMenuItem asChild>
                    <Link href="/account" className="flex items-center">
                      <User className="mr-2 h-4 w-4" />
                      Account
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/orders" className="flex items-center">
                      <ShoppingCart className="mr-2 h-4 w-4" />
                      Orders
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleSignOut} className="flex items-center">
                    <User className="mr-2 h-4 w-4" />
                    Sign Out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Button 
                variant="outline" 
                className="border-orange-500 text-orange-600 hover:bg-orange-50"
                onClick={() => router.push('/sign-in')}
              >
                Sign In / Sign Up
              </Button>
            )}

            {/* Mobile Menu Trigger */}
            <Sheet>
              <SheetTrigger asChild className="md:hidden">
                <Button variant="ghost" size="icon">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-80">
                <div className="flex flex-col space-y-4 mt-8">
                  {/* Mobile Search */}
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                    <Input
                      type="text"
                      placeholder="Search products..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                          handleSearch(searchQuery)
                        }
                      }}
                      className="pl-10 pr-4 py-2 w-full"
                    />
                  </div>

                  {/* Mobile Categories */}
                  <div className="space-y-2">
                    <h3 className="font-semibold text-lg">Categories</h3>
                    {categories.map((category) => (
                      <Link
                        key={category}
                        href={`/category/${category.toLowerCase()}`}
                        className="block py-2 px-3 rounded-lg hover:bg-gray-50"
                      >
                        {category}
                      </Link>
                    ))}
                  </div>

                  {/* Mobile Auth */}
                  {!isSignedIn && (
                    <Button 
                      className="w-full bg-orange-500 hover:bg-orange-600"
                      onClick={() => router.push('/sign-in')}
                    >
                      Sign In / Sign Up
                    </Button>
                  )}
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>

        {/* Secondary Navigation - Category Links */}
        <div className="hidden md:flex items-center h-12 bg-gray-50 border-t">
          <div className="flex items-center space-x-6 px-4">
            {categories.map((category) => (
              <Link
                key={category}
                href={`/category/${category.toLowerCase()}`}
                className="text-sm font-medium text-gray-700 hover:text-orange-600 transition-colors"
              >
                {category}
              </Link>
            ))}
            
            {/* Cart in secondary nav for desktop */}
            <div className="ml-auto">
              <Link href="/cart" className="flex items-center space-x-2 text-sm font-medium text-gray-700 hover:text-orange-600 transition-colors">
                <ShoppingCart className="h-4 w-4" />
                <span>Cart</span>
                {cartCount > 0 && (
                  <Badge variant="destructive" className="ml-1">
                    {cartCount}
                  </Badge>
                )}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}
