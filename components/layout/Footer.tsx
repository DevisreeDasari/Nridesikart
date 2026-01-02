'use client'

import Link from 'next/link'
import { Facebook, Instagram, Twitter, Youtube, Mail, Phone, MapPin, Store, Briefcase, ShoppingBag, User } from 'lucide-react'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          
          {/* Column 1: About Us & Contact */}
          <div className="lg:col-span-1">
            <h3 className="text-white font-bold text-lg mb-4">About NRIDesiKart</h3>
            <p className="text-sm mb-6 leading-relaxed">
              NRIDesiKart brings authentic Indian products to your doorstep, connecting you with the tastes and traditions of India, no matter where you are in the world.
            </p>
            
            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <Mail className="h-4 w-4 text-orange-400" />
                <a href="mailto:contact@nridesikart.com" className="text-sm hover:text-orange-400 transition-colors">
                  contact@nridesikart.com
                </a>
              </div>
              
              <div className="flex items-center space-x-2">
                <Phone className="h-4 w-4 text-orange-400" />
                <a href="tel:+91-XXXXXXXXXX" className="text-sm hover:text-orange-400 transition-colors">
                  +91-XXXXXXXXXX
                </a>
              </div>
              
              <div className="flex items-start space-x-2">
                <MapPin className="h-4 w-4 text-orange-400 mt-1" />
                <span className="text-sm">
                  123 Market Street, Mumbai, Maharashtra 400001, India
                </span>
              </div>
            </div>

            {/* Social Media Icons */}
            <div className="flex space-x-3 mt-6">
              <a href="#" className="bg-gray-800 p-2 rounded-full hover:bg-orange-600 transition-colors">
                <Facebook className="h-4 w-4" />
              </a>
              <a href="#" className="bg-gray-800 p-2 rounded-full hover:bg-orange-600 transition-colors">
                <Instagram className="h-4 w-4" />
              </a>
              <a href="#" className="bg-gray-800 p-2 rounded-full hover:bg-orange-600 transition-colors">
                <Twitter className="h-4 w-4" />
              </a>
              <a href="#" className="bg-gray-800 p-2 rounded-full hover:bg-orange-600 transition-colors">
                <Youtube className="h-4 w-4" />
              </a>
            </div>
          </div>

          {/* Column 2: Customer Service */}
          <div>
            <h3 className="text-white font-bold text-lg mb-4">Customer Service</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/help" className="text-sm hover:text-orange-400 transition-colors">
                  Help Center / FAQs
                </Link>
              </li>
              <li>
                <Link href="/shipping" className="text-sm hover:text-orange-400 transition-colors">
                  Shipping & Delivery Information
                </Link>
              </li>
              <li>
                <Link href="/returns" className="text-sm hover:text-orange-400 transition-colors">
                  Returns & Refunds Policy
                </Link>
              </li>
              <li>
                <Link href="/track-order" className="text-sm hover:text-orange-400 transition-colors">
                  Track Your Order
                </Link>
              </li>
              <li>
                <Link href="/payment" className="text-sm hover:text-orange-400 transition-colors">
                  Payment Methods
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-sm hover:text-orange-400 transition-colors">
                  Terms & Conditions
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="text-sm hover:text-orange-400 transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/support" className="text-sm hover:text-orange-400 transition-colors">
                  Customer Support
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Quick Links */}
          <div>
            <h3 className="text-white font-bold text-lg mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/categories" className="text-sm hover:text-orange-400 transition-colors">
                  All Categories
                </Link>
              </li>
              <li>
                <Link href="/best-sellers" className="text-sm hover:text-orange-400 transition-colors">
                  Best Sellers
                </Link>
              </li>
              <li>
                <Link href="/new-arrivals" className="text-sm hover:text-orange-400 transition-colors">
                  New Arrivals
                </Link>
              </li>
              <li>
                <Link href="/deals" className="text-sm hover:text-orange-400 transition-colors">
                  Deals & Offers
                </Link>
              </li>
              <li>
                <Link href="/gift-cards" className="text-sm hover:text-orange-400 transition-colors">
                  Gift Cards
                </Link>
              </li>
              <li>
                <Link href="/blog" className="text-sm hover:text-orange-400 transition-colors">
                  Blog / Articles
                </Link>
              </li>
              <li>
                <Link href="/sitemap" className="text-sm hover:text-orange-400 transition-colors">
                  Sitemap
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Careers & Opportunities */}
          <div>
            <h3 className="text-white font-bold text-lg mb-4">Join Us</h3>
            <p className="text-sm mb-4">
              Be part of the NRIDesiKart family! Explore opportunities to work with us or partner with us.
            </p>
            
            <ul className="space-y-3">
              <li>
                <Link 
                  href="/onboarding/agent" 
                  className="flex items-start space-x-2 group"
                >
                  <Briefcase className="h-4 w-4 text-orange-400 mt-0.5 flex-shrink-0" />
                  <div>
                    <span className="text-sm font-semibold text-orange-400 group-hover:text-orange-300 transition-colors">
                      Become an Agent
                    </span>
                    <p className="text-xs text-gray-400 mt-1">
                      Represent brands and earn commissions
                    </p>
                  </div>
                </Link>
              </li>
              
              <li>
                <Link 
                  href="/onboarding/shopper" 
                  className="flex items-start space-x-2 group"
                >
                  <ShoppingBag className="h-4 w-4 text-orange-400 mt-0.5 flex-shrink-0" />
                  <div>
                    <span className="text-sm font-semibold text-orange-400 group-hover:text-orange-300 transition-colors">
                      Become a Shopper
                    </span>
                    <p className="text-xs text-gray-400 mt-1">
                      Shop for customers and earn income
                    </p>
                  </div>
                </Link>
              </li>
              
              <li>
                <Link 
                  href="/onboarding/shop" 
                  className="flex items-start space-x-2 group"
                >
                  <Store className="h-4 w-4 text-orange-400 mt-0.5 flex-shrink-0" />
                  <div>
                    <span className="text-sm font-semibold text-orange-400 group-hover:text-orange-300 transition-colors">
                      Register Your Shop
                    </span>
                    <p className="text-xs text-gray-400 mt-1">
                      Sell your products on our platform
                    </p>
                  </div>
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 5: Delivery & Service Areas */}
          <div>
            <h3 className="text-white font-bold text-lg mb-4">We Deliver To</h3>
            <p className="text-sm mb-4">
              India, USA, Canada, UK, UAE, Australia, Singapore, and more
            </p>
            
            <div className="space-y-3">
              <div>
                <p className="text-sm font-semibold text-orange-400 mb-2">
                  Express Delivery Available
                </p>
                <p className="text-xs text-gray-400">
                  in Select Cities
                </p>
              </div>
              
              <Link 
                href="/delivery-check" 
                className="inline-flex items-center space-x-1 text-sm text-orange-400 hover:text-orange-300 transition-colors"
              >
                <span>Check Delivery Availability</span>
                <span className="text-xs">→</span>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Bottom Bar */}
      <div className="bg-gray-950 border-t border-gray-800">
        <div className="container mx-auto px-4 py-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm text-gray-400">
              © {currentYear} NRIDesiKart. All rights reserved.
            </p>
            
            <div className="flex space-x-4 mt-2 md:mt-0">
              <Link href="/terms" className="text-sm text-gray-400 hover:text-orange-400 transition-colors">
                Terms of Service
              </Link>
              <span className="text-sm text-gray-600">|</span>
              <Link href="/privacy" className="text-sm text-gray-400 hover:text-orange-400 transition-colors">
                Privacy Policy
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
