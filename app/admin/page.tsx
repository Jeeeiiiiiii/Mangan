'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card'
import { Button } from '../../components/ui/button'
import { Badge } from '../../components/ui/badge'
import { Input } from '../../components/ui/input'
import { 
  ArrowLeft, 
  Users, 
  Vote, 
  Calendar, 
  TrendingUp, 
  Settings, 
  Plus, 
  Edit, 
  Trash2,
  Eye,
  Star,
  Clock,
  DollarSign,
  BarChart3
} from 'lucide-react'
import Link from 'next/link'
import { WaveSeparatorTop, WaveSeparatorBottom } from '../../components/ui/wave-separator'

interface Dish {
  id: number
  name: string
  category: string
  price: string
  votes: number
  status: 'active' | 'inactive'
  image: string
}

interface Reservation {
  id: number
  customerName: string
  dishName: string
  quantity: number
  totalPrice: string
  status: 'pending' | 'confirmed' | 'ready' | 'completed'
  orderNumber: string
  pickupTime: string
}

const dishes: Dish[] = [
  { id: 1, name: "Adobo", category: "Main Course", price: "₱180", votes: 45, status: 'active', image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=400&h=300&fit=crop&crop=center" },
  { id: 2, name: "Sinigang", category: "Soup", price: "₱220", votes: 38, status: 'active', image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400&h=300&fit=crop&crop=center" },
  { id: 3, name: "Lechon Kawali", category: "Main Course", price: "₱250", votes: 52, status: 'active', image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=400&h=300&fit=crop&crop=center" },
  { id: 4, name: "Kare-Kare", category: "Main Course", price: "₱280", votes: 41, status: 'active', image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400&h=300&fit=crop&crop=center" },
  { id: 5, name: "Pancit Canton", category: "Noodles", price: "₱160", votes: 29, status: 'inactive', image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=400&h=300&fit=crop&crop=center" }
]

const reservations: Reservation[] = [
  { id: 1, customerName: "Juan Dela Cruz", dishName: "Adobo", quantity: 2, totalPrice: "₱360", status: 'confirmed', orderNumber: "ORD-001", pickupTime: "12:30 PM" },
  { id: 2, customerName: "Maria Santos", dishName: "Sinigang", quantity: 1, totalPrice: "₱220", status: 'ready', orderNumber: "ORD-002", pickupTime: "6:00 PM" },
  { id: 3, customerName: "Pedro Reyes", dishName: "Lechon Kawali", quantity: 3, totalPrice: "₱750", status: 'pending', orderNumber: "ORD-003", pickupTime: "1:00 PM" },
  { id: 4, customerName: "Ana Garcia", dishName: "Kare-Kare", quantity: 1, totalPrice: "₱280", status: 'completed', orderNumber: "ORD-004", pickupTime: "7:00 PM" }
]

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState<'overview' | 'dishes' | 'reservations' | 'votes'>('overview')
  const [searchTerm, setSearchTerm] = useState('')

  const totalVotes = dishes.reduce((sum, dish) => sum + dish.votes, 0)
  const totalReservations = reservations.length
  const totalRevenue = reservations
    .filter(r => r.status === 'completed')
    .reduce((sum, r) => sum + parseInt(r.totalPrice.replace('₱', '')), 0)

  const filteredDishes = dishes.filter(dish => 
    dish.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    dish.category.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const filteredReservations = reservations.filter(reservation => 
    reservation.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    reservation.dishName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    reservation.orderNumber.toLowerCase().includes(searchTerm.toLowerCase())
  )

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
            <div className="flex items-center space-x-2">
              <Button variant="outline" size="sm">
                <Settings className="w-4 h-4 mr-2" />
                Settings
              </Button>
              <Button size="sm">
                <Plus className="w-4 h-4 mr-2" />
                Add Dish
              </Button>
            </div>
          </div>

          <div className="text-center mb-8">
            <h1 className="text-4xl md:text-5xl font-bold text-primary mb-4">
              Admin Dashboard
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Manage dishes, monitor votes, and track reservations
            </p>
          </div>

          {/* Navigation Tabs */}
          <div className="flex flex-wrap justify-center gap-4 mb-8">
            {[
              { id: 'overview', label: 'Overview', icon: BarChart3 },
              { id: 'dishes', label: 'Dishes', icon: Settings },
              { id: 'reservations', label: 'Reservations', icon: Calendar },
              { id: 'votes', label: 'Votes', icon: Vote }
            ].map((tab) => (
              <Button
                key={tab.id}
                variant={activeTab === tab.id ? "default" : "outline"}
                size="sm"
                onClick={() => setActiveTab(tab.id as any)}
                className="rounded-full"
              >
                <tab.icon className="w-4 h-4 mr-2" />
                {tab.label}
              </Button>
            ))}
          </div>

          {/* Search */}
          <div className="max-w-md mx-auto mb-8">
            <div className="relative">
              <Input
                placeholder="Search dishes, reservations, or customers..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
              <Eye className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            </div>
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-16 bg-white relative">
        <WaveSeparatorTop color="white" height={60} className="absolute -top-1" />
        
        <div className="container mx-auto px-4">
          {activeTab === 'overview' && (
            <div className="space-y-8">
              {/* Stats Cards */}
              <div className="grid md:grid-cols-4 gap-6">
                <Card className="text-center">
                  <CardHeader>
                    <div className="flex justify-center mb-2">
                      <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                        <Vote className="w-6 h-6 text-primary" />
                      </div>
                    </div>
                    <CardTitle className="text-3xl font-bold text-primary">{totalVotes}</CardTitle>
                    <p className="text-muted-foreground">Total Votes Today</p>
                  </CardHeader>
                </Card>

                <Card className="text-center">
                  <CardHeader>
                    <div className="flex justify-center mb-2">
                      <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                        <Calendar className="w-6 h-6 text-blue-600" />
                      </div>
                    </div>
                    <CardTitle className="text-3xl font-bold text-blue-600">{totalReservations}</CardTitle>
                    <p className="text-muted-foreground">Active Reservations</p>
                  </CardHeader>
                </Card>

                <Card className="text-center">
                  <CardHeader>
                    <div className="flex justify-center mb-2">
                      <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                        <DollarSign className="w-6 h-6 text-green-600" />
                      </div>
                    </div>
                    <CardTitle className="text-3xl font-bold text-green-600">₱{totalRevenue}</CardTitle>
                    <p className="text-muted-foreground">Total Revenue</p>
                  </CardHeader>
                </Card>

                <Card className="text-center">
                  <CardHeader>
                    <div className="flex justify-center mb-2">
                      <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                        <Users className="w-6 h-6 text-purple-600" />
                      </div>
                    </div>
                    <CardTitle className="text-3xl font-bold text-purple-600">{dishes.length}</CardTitle>
                    <p className="text-muted-foreground">Active Dishes</p>
                  </CardHeader>
                </Card>
              </div>

              {/* Top Dishes */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <TrendingUp className="w-5 h-5" />
                    <span>Top Voted Dishes</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {dishes
                      .sort((a, b) => b.votes - a.votes)
                      .slice(0, 5)
                      .map((dish, index) => (
                        <div key={dish.id} className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
                          <div className="flex items-center space-x-4">
                            <div className="w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold">
                              {index + 1}
                            </div>
                            <div>
                              <div className="font-medium">{dish.name}</div>
                              <div className="text-sm text-muted-foreground">{dish.category}</div>
                            </div>
                          </div>
                          <div className="flex items-center space-x-4">
                            <div className="text-right">
                              <div className="font-medium">{dish.votes} votes</div>
                              <div className="text-sm text-muted-foreground">{dish.price}</div>
                            </div>
                            <Badge variant={dish.status === 'active' ? 'default' : 'secondary'}>
                              {dish.status}
                            </Badge>
                          </div>
                        </div>
                      ))}
                  </div>
                </CardContent>
              </Card>

              {/* Recent Reservations */}
              <Card>
                <CardHeader>
                  <CardTitle>Recent Reservations</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {reservations.slice(0, 5).map((reservation) => (
                      <div key={reservation.id} className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
                        <div>
                          <div className="font-medium">{reservation.customerName}</div>
                          <div className="text-sm text-muted-foreground">
                            {reservation.dishName} • {reservation.quantity} servings
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="font-medium">{reservation.totalPrice}</div>
                          <div className="text-sm text-muted-foreground">{reservation.pickupTime}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {activeTab === 'dishes' && (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold text-primary">Manage Dishes</h2>
                <Button>
                  <Plus className="w-4 h-4 mr-2" />
                  Add New Dish
                </Button>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredDishes.map((dish) => (
                  <Card key={dish.id} className="group hover:shadow-lg transition-shadow">
                    <div className="relative overflow-hidden rounded-t-2xl">
                      <img
                        src={dish.image}
                        alt={dish.name}
                        className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                      <div className="absolute top-3 right-3">
                        <Badge variant={dish.status === 'active' ? 'default' : 'secondary'}>
                          {dish.status}
                        </Badge>
                      </div>
                    </div>

                    <CardHeader className="pb-3">
                      <CardTitle className="text-lg">{dish.name}</CardTitle>
                      <div className="flex items-center justify-between text-sm text-muted-foreground">
                        <span>{dish.category}</span>
                        <span className="font-medium">{dish.price}</span>
                      </div>
                    </CardHeader>

                    <CardContent className="pt-0">
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center space-x-2">
                          <Vote className="w-4 h-4 text-primary" />
                          <span className="text-sm font-medium">{dish.votes} votes</span>
                        </div>
                        <div className="flex space-x-2">
                          <Button variant="outline" size="sm">
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button variant="destructive" size="sm">
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'reservations' && (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold text-primary">Manage Reservations</h2>
                <Button variant="outline">
                  <Clock className="w-4 h-4 mr-2" />
                  View All
                </Button>
              </div>

              <div className="space-y-4">
                {filteredReservations.map((reservation) => (
                  <Card key={reservation.id}>
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <div className="flex items-center space-x-4 mb-2">
                            <div>
                              <div className="font-medium">{reservation.customerName}</div>
                              <div className="text-sm text-muted-foreground">
                                Order #{reservation.orderNumber}
                              </div>
                            </div>
                            <Badge variant={
                              reservation.status === 'pending' ? 'secondary' :
                              reservation.status === 'confirmed' ? 'default' :
                              reservation.status === 'ready' ? 'default' : 'secondary'
                            }>
                              {reservation.status}
                            </Badge>
                          </div>
                          <div className="text-sm text-muted-foreground">
                            {reservation.dishName} • {reservation.quantity} servings • {reservation.pickupTime}
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="font-bold text-lg">{reservation.totalPrice}</div>
                          <div className="text-sm text-muted-foreground">Total</div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'votes' && (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold text-primary">Vote Analytics</h2>
                <Button variant="outline">
                  <BarChart3 className="w-4 h-4 mr-2" />
                  Export Data
                </Button>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle>Vote Distribution by Category</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {['Main Course', 'Soup', 'Noodles'].map((category) => {
                      const categoryVotes = dishes
                        .filter(dish => dish.category === category)
                        .reduce((sum, dish) => sum + dish.votes, 0)
                      const percentage = ((categoryVotes / totalVotes) * 100).toFixed(1)
                      
                      return (
                        <div key={category} className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span className="font-medium">{category}</span>
                            <span className="text-muted-foreground">{categoryVotes} votes ({percentage}%)</span>
                          </div>
                          <div className="w-full bg-muted rounded-full h-2">
                            <div 
                              className="bg-primary h-2 rounded-full transition-all duration-300"
                              style={{ width: `${percentage}%` }}
                            ></div>
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Top Voted Dishes</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {dishes
                      .sort((a, b) => b.votes - a.votes)
                      .map((dish, index) => (
                        <div key={dish.id} className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
                          <div className="flex items-center space-x-4">
                            <div className="w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold">
                              {index + 1}
                            </div>
                            <div>
                              <div className="font-medium">{dish.name}</div>
                              <div className="text-sm text-muted-foreground">{dish.category}</div>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="font-medium">{dish.votes} votes</div>
                            <div className="text-sm text-muted-foreground">{dish.price}</div>
                          </div>
                        </div>
                      ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      </section>
    </div>
  )
} 