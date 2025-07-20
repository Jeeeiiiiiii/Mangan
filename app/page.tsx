'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Button } from '../components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card'
import { Vote, Calendar, Users, Utensils, Star, MapPin, ShoppingBag } from 'lucide-react'
import { PageLoader } from '../components/ui/loader'
import { WaveSeparatorBottom, WaveSeparatorTop } from '../components/ui/wave-separator'
import { DishesCarousel } from '../components/dishes-carousel'

export default function HomePage() {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Simulate loading time
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 2000)

    return () => clearTimeout(timer)
  }, [])

  if (isLoading) {
    return <PageLoader />
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section with Dynamic Background */}
      <section className="relative overflow-hidden bg-gradient-to-br from-background via-background to-secondary/20">
        {/* Floating Decorative Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 left-10 w-4 h-4 bg-primary/20 rounded-full animate-pulse"></div>
          <div className="absolute top-32 right-20 w-6 h-6 bg-accent/30 rounded-full animate-pulse delay-1000"></div>
          <div className="absolute bottom-40 left-1/4 w-3 h-3 bg-muted-foreground/20 rounded-full animate-pulse delay-500"></div>
          <div className="absolute top-1/2 right-1/3 w-5 h-5 bg-primary/15 rounded-full animate-pulse delay-1500"></div>
        </div>

        {/* Wave Separator */}
        <WaveSeparatorBottom color="white" height={100} />

        <div className="container mx-auto px-4 py-16 relative z-10">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-6xl md:text-7xl font-bold text-primary mb-6 leading-tight">
              Better food for more people
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground mb-12 max-w-3xl mx-auto leading-relaxed">
              For over a decade, we've enabled our customers to discover new tastes, 
              delivered right to their doorstep
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button size="lg" className="text-lg px-8 py-4 h-auto" asChild>
                <Link href="/menu">
                  <Vote className="w-5 h-5 mr-2" />
                  Vote for Today's Menu
                </Link>
              </Button>
              <Button variant="outline" size="lg" className="text-lg px-8 py-4 h-auto" asChild>
                <Link href="/auth/signin">
                  <Calendar className="w-5 h-5 mr-2" />
                  My Reservations
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Statistics Section */}
      <section className="py-16 bg-white relative">
        <WaveSeparatorTop color="white" height={60} className="absolute -top-1" />
        <div className="container mx-auto px-4">
          <div className="bg-card rounded-2xl shadow-lg p-8 md:p-12">
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="flex justify-center mb-4">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
                    <Utensils className="w-8 h-8 text-primary" />
                  </div>
                </div>
                <div className="text-4xl font-bold text-primary mb-2">50+</div>
                <div className="text-muted-foreground">Filipino Dishes</div>
              </div>
              <div className="text-center">
                <div className="flex justify-center mb-4">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
                    <MapPin className="w-8 h-8 text-primary" />
                  </div>
                </div>
                <div className="text-4xl font-bold text-primary mb-2">Biñan</div>
                <div className="text-muted-foreground">Laguna Location</div>
              </div>
              <div className="text-center">
                <div className="flex justify-center mb-4">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
                    <ShoppingBag className="w-8 h-8 text-primary" />
                  </div>
                </div>
                <div className="text-4xl font-bold text-primary mb-2">1000+</div>
                <div className="text-muted-foreground">Orders Delivered</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section with Floating Elements */}
      <section className="py-20 bg-background relative overflow-hidden">
        <WaveSeparatorBottom color="background" height={60} className="absolute -top-1" />
        {/* Floating Food Elements */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-20 left-10 w-24 h-24 bg-accent/20 rounded-full blur-xl"></div>
          <div className="absolute bottom-20 right-10 w-32 h-32 bg-primary/10 rounded-full blur-xl"></div>
          <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-muted/30 rounded-full blur-lg"></div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-primary mb-6">
              What's waiting for you?
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Our platform is packed with features that enable you to experience 
              Filipino food delivery like never before
            </p>
          </div>

          {/* Central Phone Mockup */}
          <div className="relative flex justify-center mb-16">
            <div className="w-64 h-96 bg-card rounded-3xl shadow-2xl border-4 border-primary/20 flex items-center justify-center">
              <div className="text-center p-6">
                <Vote className="w-12 h-12 mx-auto mb-4 text-primary" />
                <h3 className="text-lg font-semibold text-primary">Vote Daily</h3>
                <p className="text-sm text-muted-foreground mt-2">
                  Cast your vote for tomorrow's menu
                </p>
              </div>
            </div>
          </div>

          {/* Feature Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {[
              { icon: Vote, title: "Daily Voting", desc: "Vote for your favorite dishes" },
              { icon: Utensils, title: "Fresh Menu", desc: "Top dishes selected daily" },
              { icon: Calendar, title: "Easy Booking", desc: "Reserve your meals in advance" },
              { icon: Star, title: "Authentic", desc: "Traditional Filipino flavors" }
            ].map((feature, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                <CardHeader className="pb-4">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <feature.icon className="w-8 h-8 text-primary" />
                  </div>
                  <CardTitle className="text-lg">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">{feature.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Popular Dishes Section */}
      <section className="py-20 bg-white relative">
        <WaveSeparatorTop color="white" height={60} className="absolute -top-1" />
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-primary mb-6">
              Popular Filipino Dishes
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Discover the most loved traditional dishes from our community
            </p>
          </div>

          {/* Animated Dishes Carousel */}
          <DishesCarousel />

          <div className="text-center">
            <Button size="lg" className="text-lg px-8 py-4 h-auto">
              <Link href="/menu">View Full Menu & Vote</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-primary to-primary/80 text-white relative">
        <WaveSeparatorTop color="primary" height={100} className="absolute -top-1" />
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Ready to experience authentic Filipino flavors?
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto opacity-90">
            Join our community and start voting for your favorite dishes today
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="secondary" className="text-lg px-8 py-4 h-auto" asChild>
              <Link href="/menu">Start Voting Now</Link>
            </Button>
            <Button size="lg" variant="outline" className="text-lg px-8 py-4 h-auto border-white text-white hover:bg-white hover:text-primary">
              Learn More
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}