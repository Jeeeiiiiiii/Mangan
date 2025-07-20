'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'
import { Button } from './ui/button'
import { Star } from 'lucide-react'
import { cn } from '../lib/utils'

interface Dish {
  id: number
  name: string
  description: string
  rating: string
  image: string
  price: string
}

const dishes: Dish[] = [
  {
    id: 1,
    name: "Adobo",
    description: "Classic Filipino braised pork and chicken in soy sauce and vinegar",
    rating: "4.9",
    image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=400&h=300&fit=crop&crop=center",
    price: "₱180"
  },
  {
    id: 2,
    name: "Sinigang",
    description: "Sour soup with pork and fresh vegetables in tamarind broth",
    rating: "4.8",
    image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400&h=300&fit=crop&crop=center",
    price: "₱220"
  },
  {
    id: 3,
    name: "Lechon Kawali",
    description: "Crispy deep-fried pork belly with golden brown skin",
    rating: "4.7",
    image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=400&h=300&fit=crop&crop=center",
    price: "₱250"
  },
  {
    id: 4,
    name: "Kare-Kare",
    description: "Oxtail stew with peanut sauce and vegetables",
    rating: "4.9",
    image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400&h=300&fit=crop&crop=center",
    price: "₱280"
  },
  {
    id: 5,
    name: "Pancit Canton",
    description: "Stir-fried noodles with vegetables and meat",
    rating: "4.6",
    image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=400&h=300&fit=crop&crop=center",
    price: "₱160"
  },
  {
    id: 6,
    name: "Bulalo",
    description: "Beef marrow soup with corn and vegetables",
    rating: "4.8",
    image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400&h=300&fit=crop&crop=center",
    price: "₱320"
  }
]

export function DishesCarousel() {
  const [scrollPosition, setScrollPosition] = useState(0)
  const [isPaused, setIsPaused] = useState(false)

  useEffect(() => {
    if (isPaused) return

    const interval = setInterval(() => {
      setScrollPosition((prev) => {
        const newPosition = prev + 1
        // Reset to beginning when we've scrolled through all dishes
        if (newPosition >= dishes.length * 100) {
          return 0
        }
        return newPosition
      })
    }, 50) // Faster animation for continuous movement

    return () => clearInterval(interval)
  }, [isPaused])

  const handleCardHover = () => setIsPaused(true)
  const handleCardLeave = () => setIsPaused(false)

  return (
    <div className="relative overflow-hidden py-8">
      {/* Carousel Container */}
      <div className="flex" style={{
        transform: `translateX(-${scrollPosition}px)`,
        width: `${dishes.length * 300}px`
      }}>
        {dishes.map((dish, index) => (
          <div key={dish.id} className="w-80 px-4 flex-shrink-0">
            <Card 
              className="group hover:shadow-xl transition-all duration-500 hover:-translate-y-2 cursor-pointer"
              onMouseEnter={handleCardHover}
              onMouseLeave={handleCardLeave}
            >
              {/* Image Container */}
              <div className="relative overflow-hidden rounded-t-2xl">
                <img
                  src={dish.image}
                  alt={dish.name}
                  className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                
                {/* Rating Badge */}
                <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm rounded-full px-2 py-1 flex items-center space-x-1">
                  <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                  <span className="text-xs font-semibold text-foreground">{dish.rating}</span>
                </div>

                {/* Price Badge */}
                <div className="absolute bottom-3 left-3 bg-primary text-primary-foreground rounded-full px-3 py-1">
                  <span className="text-sm font-bold">{dish.price}</span>
                </div>
              </div>

              <CardHeader className="pb-3">
                <CardTitle className="text-lg group-hover:text-primary transition-colors">
                  {dish.name}
                </CardTitle>
              </CardHeader>

              <CardContent className="pt-0">
                <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                  {dish.description}
                </p>
                <Button className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-colors" asChild>
                  <Link href="/menu">Vote for this dish</Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        ))}
      </div>

      {/* Continuous scroll indicator */}
      <div className="flex justify-center mt-8">
        <div className="text-sm text-muted-foreground">
          Scroll to explore more dishes
        </div>
      </div>
    </div>
  )
} 