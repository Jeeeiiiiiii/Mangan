'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card'
import { Button } from '../../components/ui/button'
import { Vote, Star, Clock, Users, ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import { WaveSeparatorTop, WaveSeparatorBottom } from '../../components/ui/wave-separator'

interface Dish {
  id: number
  name: string
  description: string
  rating: string
  image: string
  price: string
  votes: number
  category: string
}

const dishes: Dish[] = [
  {
    id: 1,
    name: "Adobo",
    description: "Classic Filipino braised pork and chicken in soy sauce and vinegar",
    rating: "4.9",
    image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=400&h=300&fit=crop&crop=center",
    price: "₱180",
    votes: 45,
    category: "Main Course"
  },
  {
    id: 2,
    name: "Sinigang",
    description: "Sour soup with pork and fresh vegetables in tamarind broth",
    rating: "4.8",
    image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400&h=300&fit=crop&crop=center",
    price: "₱220",
    votes: 38,
    category: "Soup"
  },
  {
    id: 3,
    name: "Lechon Kawali",
    description: "Crispy deep-fried pork belly with golden brown skin",
    rating: "4.7",
    image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=400&h=300&fit=crop&crop=center",
    price: "₱250",
    votes: 52,
    category: "Main Course"
  },
  {
    id: 4,
    name: "Kare-Kare",
    description: "Oxtail stew with peanut sauce and vegetables",
    rating: "4.9",
    image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400&h=300&fit=crop&crop=center",
    price: "₱280",
    votes: 41,
    category: "Main Course"
  },
  {
    id: 5,
    name: "Pancit Canton",
    description: "Stir-fried noodles with vegetables and meat",
    rating: "4.6",
    image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=400&h=300&fit=crop&crop=center",
    price: "₱160",
    votes: 29,
    category: "Noodles"
  },
  {
    id: 6,
    name: "Bulalo",
    description: "Beef marrow soup with corn and vegetables",
    rating: "4.8",
    image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400&h=300&fit=crop&crop=center",
    price: "₱320",
    votes: 35,
    category: "Soup"
  },
  {
    id: 7,
    name: "Sisig",
    description: "Sizzling pork dish with onions and chili peppers",
    rating: "4.7",
    image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=400&h=300&fit=crop&crop=center",
    price: "₱200",
    votes: 48,
    category: "Main Course"
  },
  {
    id: 8,
    name: "Tinolang Manok",
    description: "Chicken soup with ginger and green papaya",
    rating: "4.5",
    image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400&h=300&fit=crop&crop=center",
    price: "₱190",
    votes: 22,
    category: "Soup"
  }
]

const categories = ["All", "Main Course", "Soup", "Noodles"]

export default function MenuPage() {
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [votedDishes, setVotedDishes] = useState<number[]>([])

  const filteredDishes = selectedCategory === "All" 
    ? dishes 
    : dishes.filter(dish => dish.category === selectedCategory)

  const handleVote = (dishId: number) => {
    if (votedDishes.includes(dishId)) {
      setVotedDishes(votedDishes.filter(id => id !== dishId))
    } else {
      setVotedDishes([...votedDishes, dishId])
    }
  }

  const totalVotes = dishes.reduce((sum, dish) => sum + dish.votes, 0)

  return (
    <div className="min-h-screen bg-background">
      {/* Header Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-background via-background to-secondary/20">
        <WaveSeparatorBottom color="white" height={80} />
        
        <div className="container mx-auto px-4 py-8 relative z-10">
          <div className="flex items-center justify-between mb-8">
            <Link href="/" className="flex items-center space-x-2 text-primary hover:text-primary/80 transition-colors">
              <ArrowLeft className="w-5 h-5" />
              <span className="font-medium">Back to Home</span>
            </Link>
            <div className="text-right">
              <div className="text-sm text-muted-foreground">Total Votes Today</div>
              <div className="text-2xl font-bold text-primary">{totalVotes}</div>
            </div>
          </div>

          <div className="text-center mb-8">
            <h1 className="text-4xl md:text-5xl font-bold text-primary mb-4">
              Vote for Today's Menu
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Cast your vote for the dishes you want to see on tomorrow's menu. 
              Each user gets one vote per dish per day.
            </p>
          </div>

          {/* Category Filter */}
          <div className="flex flex-wrap justify-center gap-4 mb-8">
            {categories.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedCategory(category)}
                className="rounded-full"
              >
                {category}
              </Button>
            ))}
          </div>
        </div>
      </section>

      {/* Menu Section */}
      <section className="py-16 bg-white relative">
        <WaveSeparatorTop color="white" height={60} className="absolute -top-1" />
        
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredDishes.map((dish) => (
              <Card key={dish.id} className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
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

                  {/* Category Badge */}
                  <div className="absolute top-3 left-3 bg-secondary text-secondary-foreground rounded-full px-2 py-1">
                    <span className="text-xs font-medium">{dish.category}</span>
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
                  
                  {/* Vote Count */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                      <Users className="w-4 h-4" />
                      <span>{dish.votes} votes</span>
                    </div>
                    <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                      <Clock className="w-4 h-4" />
                      <span>Today</span>
                    </div>
                  </div>

                  <Button 
                    className={`w-full transition-all duration-200 ${
                      votedDishes.includes(dish.id) 
                        ? 'bg-green-600 hover:bg-green-700' 
                        : ''
                    }`}
                    onClick={() => handleVote(dish.id)}
                  >
                    <Vote className="w-4 h-4 mr-2" />
                    {votedDishes.includes(dish.id) ? 'Voted!' : 'Vote for this dish'}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Voting Summary */}
          <div className="mt-12 text-center">
            <div className="bg-card rounded-2xl shadow-lg p-8 max-w-2xl mx-auto">
              <h3 className="text-2xl font-bold text-primary mb-4">Voting Summary</h3>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary mb-2">{votedDishes.length}</div>
                  <div className="text-muted-foreground">Your Votes</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary mb-2">{totalVotes}</div>
                  <div className="text-muted-foreground">Total Votes</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary mb-2">{dishes.length}</div>
                  <div className="text-muted-foreground">Available Dishes</div>
                </div>
              </div>
              <p className="text-sm text-muted-foreground mt-6">
                Voting ends at 8:00 PM today. Top dishes will be available for reservation tomorrow.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
} 