import React from 'react'
import { cn } from '../../lib/utils'

interface LoaderProps {
  className?: string
  size?: 'sm' | 'md' | 'lg'
}

export function Loader({ className, size = 'md' }: LoaderProps) {
  const sizeClasses = {
    sm: 'w-6 h-6',
    md: 'w-12 h-12',
    lg: 'w-16 h-16'
  }

  return (
    <div className={cn('flex items-center justify-center', className)}>
      <div className="relative">
        {/* Main spinning circle */}
        <div className={cn(
          'border-4 border-muted/30 rounded-full animate-spin',
          sizeClasses[size]
        )}>
          <div className="absolute inset-0 border-4 border-transparent border-t-primary rounded-full animate-spin"></div>
        </div>
        
        {/* Inner pulsing circle */}
        <div className={cn(
          'absolute inset-2 bg-primary/20 rounded-full animate-pulse',
          size === 'sm' ? 'inset-1' : size === 'lg' ? 'inset-3' : 'inset-2'
        )}></div>
        
        {/* Center dot */}
        <div className={cn(
          'absolute inset-0 flex items-center justify-center',
          size === 'sm' ? 'inset-1' : size === 'lg' ? 'inset-4' : 'inset-2'
        )}>
          <div className="w-1 h-1 bg-primary rounded-full animate-pulse"></div>
        </div>
      </div>
    </div>
  )
}

export function PageLoader() {
  return (
    <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center">
      <div className="text-center">
        <Loader size="lg" className="mb-6" />
        <div className="text-primary font-semibold text-lg">Loading Mangan...</div>
        <div className="text-muted-foreground text-sm mt-2">Preparing your Filipino feast</div>
      </div>
    </div>
  )
}

export function SectionLoader() {
  return (
    <div className="flex items-center justify-center py-12">
      <div className="text-center">
        <Loader size="md" className="mb-4" />
        <div className="text-primary font-medium">Loading dishes...</div>
      </div>
    </div>
  )
} 