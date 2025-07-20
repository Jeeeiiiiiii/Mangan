'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card'
import { Button } from '../../components/ui/button'
import { Badge } from '../../components/ui/badge'
import { ArrowLeft, Calendar, Clock, MapPin, Phone, User, Plus, Edit, Trash2 } from 'lucide-react'
import Link from 'next/link'
import { WaveSeparatorTop, WaveSeparatorBottom } from '../../components/ui/wave-separator'

interface Reservation {
  id: number
  dishName: string
  quantity: number
  totalPrice: string
  pickupTime: string
  pickupDate: string
  status: 'pending' | 'confirmed' | 'ready' | 'completed' | 'cancelled'
  orderNumber: string
  customerName: string
  phoneNumber: string
  specialInstructions?: string
}

const reservations: Reservation[] = [
  {
    id: 1,
    dishName: "Adobo",
    quantity: 2,
    totalPrice: "₱360",
    pickupTime: "12:30 PM",
    pickupDate: "2024-01-15",
    status: 'confirmed',
    orderNumber: "ORD-001",
    customerName: "Juan Dela Cruz",
    phoneNumber: "+63 912 345 6789",
    specialInstructions: "Extra spicy please"
  },
  {
    id: 2,
    dishName: "Sinigang",
    quantity: 1,
    totalPrice: "₱220",
    pickupTime: "6:00 PM",
    pickupDate: "2024-01-15",
    status: 'ready',
    orderNumber: "ORD-002",
    customerName: "Maria Santos",
    phoneNumber: "+63 923 456 7890"
  },
  {
    id: 3,
    dishName: "Lechon Kawali",
    quantity: 3,
    totalPrice: "₱750",
    pickupTime: "1:00 PM",
    pickupDate: "2024-01-16",
    status: 'pending',
    orderNumber: "ORD-003",
    customerName: "Pedro Reyes",
    phoneNumber: "+63 934 567 8901",
    specialInstructions: "Extra crispy skin"
  }
]

const statusColors = {
  pending: 'bg-yellow-100 text-yellow-800',
  confirmed: 'bg-blue-100 text-blue-800',
  ready: 'bg-green-100 text-green-800',
  completed: 'bg-gray-100 text-gray-800',
  cancelled: 'bg-red-100 text-red-800'
}

const statusLabels = {
  pending: 'Pending',
  confirmed: 'Confirmed',
  ready: 'Ready for Pickup',
  completed: 'Completed',
  cancelled: 'Cancelled'
}

export default function ReservationsPage() {
  const [selectedStatus, setSelectedStatus] = useState<string>('all')

  const filteredReservations = selectedStatus === 'all' 
    ? reservations 
    : reservations.filter(reservation => reservation.status === selectedStatus)

  const handleCancelReservation = (id: number) => {
    // Handle cancellation logic
    console.log('Cancelling reservation:', id)
  }

  const handleEditReservation = (id: number) => {
    // Handle edit logic
    console.log('Editing reservation:', id)
  }

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
            <Button className="flex items-center space-x-2">
              <Plus className="w-4 h-4" />
              <span>New Reservation</span>
            </Button>
          </div>

          <div className="text-center mb-8">
            <h1 className="text-4xl md:text-5xl font-bold text-primary mb-4">
              My Reservations
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Manage your food reservations and track their status
            </p>
          </div>

          {/* Stats */}
          <div className="grid md:grid-cols-4 gap-6 mb-8">
            <div className="bg-card rounded-2xl shadow-lg p-6 text-center">
              <div className="text-3xl font-bold text-primary mb-2">{reservations.length}</div>
              <div className="text-muted-foreground">Total Reservations</div>
            </div>
            <div className="bg-card rounded-2xl shadow-lg p-6 text-center">
              <div className="text-3xl font-bold text-blue-600 mb-2">
                {reservations.filter(r => r.status === 'confirmed').length}
              </div>
              <div className="text-muted-foreground">Confirmed</div>
            </div>
            <div className="bg-card rounded-2xl shadow-lg p-6 text-center">
              <div className="text-3xl font-bold text-green-600 mb-2">
                {reservations.filter(r => r.status === 'ready').length}
              </div>
              <div className="text-muted-foreground">Ready for Pickup</div>
            </div>
            <div className="bg-card rounded-2xl shadow-lg p-6 text-center">
              <div className="text-3xl font-bold text-gray-600 mb-2">
                {reservations.filter(r => r.status === 'completed').length}
              </div>
              <div className="text-muted-foreground">Completed</div>
            </div>
          </div>

          {/* Filter */}
          <div className="flex flex-wrap justify-center gap-4 mb-8">
            <Button
              variant={selectedStatus === 'all' ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedStatus('all')}
              className="rounded-full"
            >
              All
            </Button>
            <Button
              variant={selectedStatus === 'pending' ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedStatus('pending')}
              className="rounded-full"
            >
              Pending
            </Button>
            <Button
              variant={selectedStatus === 'confirmed' ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedStatus('confirmed')}
              className="rounded-full"
            >
              Confirmed
            </Button>
            <Button
              variant={selectedStatus === 'ready' ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedStatus('ready')}
              className="rounded-full"
            >
              Ready
            </Button>
          </div>
        </div>
      </section>

      {/* Reservations Section */}
      <section className="py-16 bg-white relative">
        <WaveSeparatorTop color="white" height={60} className="absolute -top-1" />
        
        <div className="container mx-auto px-4">
          {filteredReservations.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">🍽️</div>
              <h3 className="text-2xl font-bold text-primary mb-2">No Reservations Found</h3>
              <p className="text-muted-foreground mb-6">
                {selectedStatus === 'all' 
                  ? "You haven't made any reservations yet." 
                  : `No ${selectedStatus} reservations found.`
                }
              </p>
              <Button asChild>
                <Link href="/menu">Browse Menu & Make Reservation</Link>
              </Button>
            </div>
          ) : (
            <div className="space-y-6">
              {filteredReservations.map((reservation) => (
                <Card key={reservation.id} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-4 mb-2">
                          <CardTitle className="text-xl">{reservation.dishName}</CardTitle>
                          <Badge className={statusColors[reservation.status]}>
                            {statusLabels[reservation.status]}
                          </Badge>
                        </div>
                        <div className="text-sm text-muted-foreground">
                          Order #{reservation.orderNumber}
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-2xl font-bold text-primary">{reservation.totalPrice}</div>
                        <div className="text-sm text-muted-foreground">
                          {reservation.quantity} {reservation.quantity === 1 ? 'serving' : 'servings'}
                        </div>
                      </div>
                    </div>
                  </CardHeader>

                  <CardContent>
                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="space-y-4">
                        <div className="flex items-center space-x-3">
                          <Calendar className="w-5 h-5 text-muted-foreground" />
                          <div>
                            <div className="font-medium">Pickup Date</div>
                            <div className="text-sm text-muted-foreground">
                              {new Date(reservation.pickupDate).toLocaleDateString()}
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center space-x-3">
                          <Clock className="w-5 h-5 text-muted-foreground" />
                          <div>
                            <div className="font-medium">Pickup Time</div>
                            <div className="text-sm text-muted-foreground">{reservation.pickupTime}</div>
                          </div>
                        </div>
                        <div className="flex items-center space-x-3">
                          <MapPin className="w-5 h-5 text-muted-foreground" />
                          <div>
                            <div className="font-medium">Pickup Location</div>
                            <div className="text-sm text-muted-foreground">Mangan Restaurant, Biñan, Laguna</div>
                          </div>
                        </div>
                      </div>

                      <div className="space-y-4">
                        <div className="flex items-center space-x-3">
                          <User className="w-5 h-5 text-muted-foreground" />
                          <div>
                            <div className="font-medium">Customer</div>
                            <div className="text-sm text-muted-foreground">{reservation.customerName}</div>
                          </div>
                        </div>
                        <div className="flex items-center space-x-3">
                          <Phone className="w-5 h-5 text-muted-foreground" />
                          <div>
                            <div className="font-medium">Contact</div>
                            <div className="text-sm text-muted-foreground">{reservation.phoneNumber}</div>
                          </div>
                        </div>
                        {reservation.specialInstructions && (
                          <div>
                            <div className="font-medium mb-1">Special Instructions</div>
                            <div className="text-sm text-muted-foreground bg-muted/50 p-2 rounded">
                              {reservation.specialInstructions}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center justify-between mt-6 pt-6 border-t">
                      <div className="text-sm text-muted-foreground">
                        Created on {new Date().toLocaleDateString()}
                      </div>
                      <div className="flex space-x-2">
                        {reservation.status === 'pending' && (
                          <>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleEditReservation(reservation.id)}
                            >
                              <Edit className="w-4 h-4 mr-2" />
                              Edit
                            </Button>
                            <Button
                              variant="destructive"
                              size="sm"
                              onClick={() => handleCancelReservation(reservation.id)}
                            >
                              <Trash2 className="w-4 h-4 mr-2" />
                              Cancel
                            </Button>
                          </>
                        )}
                        {reservation.status === 'ready' && (
                          <Button variant="default" size="sm">
                            Mark as Picked Up
                          </Button>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  )
} 