import React from 'react'
import { cn } from '../../lib/utils'

interface WaveSeparatorProps {
  className?: string
  variant?: 'top' | 'bottom' | 'both'
  color?: 'primary' | 'secondary' | 'accent' | 'white' | 'background' | 'yellow-400'
  height?: number
}

export function WaveSeparator({ 
  className, 
  variant = 'bottom', 
  color = 'white',
  height = 60 
}: WaveSeparatorProps) {
  const colorClasses = {
    primary: 'fill-primary',
    secondary: 'fill-secondary',
    accent: 'fill-accent',
    white: 'fill-white',
    background: 'fill-background',
    'yellow-400': 'fill-yellow-400'
  }

  const wavePath = variant === 'top' 
    ? "M0,80L48,85.3C96,91,192,101,288,112C384,123,480,133,576,128C672,123,768,101,864,96C960,91,1056,101,1152,112C1248,123,1344,133,1392,138.7L1440,144L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
    : "M0,176L48,165.3C96,155,192,133,288,133.3C384,133,480,155,576,165.3C672,176,768,176,864,165.3C960,155,1056,133,1152,133.3C1248,133,1344,155,1392,165.3L1440,176L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"

  return (
    <div className={cn('relative w-full', className)} style={{ height: `${height}px` }}>
      <svg
        className={cn('absolute w-full h-full', colorClasses[color])}
        viewBox="0 0 1440 320"
        preserveAspectRatio="none"
      >
        <path d={wavePath}></path>
      </svg>
    </div>
  )
}

export function WaveSeparatorTop({ className, color = 'white', height = 60 }: Omit<WaveSeparatorProps, 'variant'>) {
  return <WaveSeparator className={className} variant="top" color={color} height={height} />
}

export function WaveSeparatorBottom({ className, color = 'white', height = 60 }: Omit<WaveSeparatorProps, 'variant'>) {
  return <WaveSeparator className={className} variant="bottom" color={color} height={height} />
}

export function DoubleWaveSeparator({ className, color = 'white', height = 80 }: Omit<WaveSeparatorProps, 'variant'>) {
  const colorClasses = {
    primary: 'fill-primary',
    secondary: 'fill-secondary',
    accent: 'fill-accent',
    white: 'fill-white',
    background: 'fill-background',
    'yellow-400': 'fill-yellow-400'
  }

  return (
    <div className={cn('relative w-full', className)} style={{ height: `${height}px` }}>
      <svg
        className={cn('absolute w-full h-full', colorClasses[color])}
        viewBox="0 0 1440 320"
        preserveAspectRatio="none"
      >
        {/* Top wave */}
        <path 
          d="M0,32L48,37.3C96,43,192,53,288,90.7C384,128,480,192,576,197.3C672,203,768,149,864,128C960,107,1056,117,1152,128C1248,139,1344,149,1392,154.7L1440,160L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
          opacity="0.3"
        ></path>
        {/* Bottom wave */}
        <path 
          d="M0,160L48,144C96,128,192,96,288,106.7C384,117,480,171,576,181.3C672,192,768,160,864,144C960,128,1056,128,1152,144C1248,160,1344,192,1392,208L1440,224L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
        ></path>
      </svg>
    </div>
  )
} 