'use client'

import Link from 'next/link'
import { Button } from './ui/button'
import { useSession, signOut } from '../lib/auth-client'
import { User, Vote, Calendar, Home, Menu } from 'lucide-react'

export function Navigation() {
  const { data: session } = useSession()

  return (
    <nav className="bg-white/80 backdrop-blur-md border-b border-border/50 sticky top-0 z-50 shadow-sm">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2 group">
            <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center group-hover:scale-105 transition-transform">
              <span className="text-white font-bold text-lg">M</span>
            </div>
            <span className="text-2xl font-bold text-primary group-hover:text-primary/80 transition-colors">
              Mangan
            </span>
          </Link>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link href="/" className="flex items-center space-x-2 text-foreground hover:text-primary transition-colors group">
              <Home size={18} className="group-hover:scale-110 transition-transform" />
              <span className="font-medium">Home</span>
            </Link>
            <Link href="/menu" className="flex items-center space-x-2 text-foreground hover:text-primary transition-colors group">
              <Vote size={18} className="group-hover:scale-110 transition-transform" />
              <span className="font-medium">Vote & Menu</span>
            </Link>
            {session && (
              <Link href="/reservations" className="flex items-center space-x-2 text-foreground hover:text-primary transition-colors group">
                <Calendar size={18} className="group-hover:scale-110 transition-transform" />
                <span className="font-medium">My Reservations</span>
              </Link>
            )}
          </div>

          {/* User Actions */}
          <div className="flex items-center space-x-4">
            {session ? (
              <div className="flex items-center space-x-4">
                <div className="hidden sm:flex items-center space-x-2 bg-muted/50 px-3 py-2 rounded-lg">
                  <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center">
                    <User size={14} className="text-white" />
                  </div>
                  <span className="text-sm font-medium text-foreground">
                    {session.user.name || session.user.email?.split('@')[0]}
                  </span>
                </div>
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={() => signOut()}
                  className="hover:bg-destructive hover:text-destructive-foreground transition-colors"
                >
                  Sign Out
                </Button>
              </div>
            ) : (
              <div className="flex items-center space-x-3">
                <Button variant="ghost" size="sm" asChild className="hover:bg-muted">
                  <Link href="/auth/signin">Sign In</Link>
                </Button>
                <Button size="sm" asChild className="shadow-md hover:shadow-lg transition-shadow">
                  <Link href="/auth/signup">Sign Up</Link>
                </Button>
              </div>
            )}
            
            {/* Mobile Menu Button */}
            <Button variant="ghost" size="sm" className="md:hidden">
              <Menu size={20} />
            </Button>
          </div>
        </div>
      </div>
    </nav>
  )
}