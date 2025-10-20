'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function RedirectPage({ params }) {
  const router = useRouter()
  
  useEffect(() => {
    const redirectToOriginal = () => {
      try {
        const savedLinks = localStorage.getItem('shortLinks')
        if (savedLinks) {
          const links = JSON.parse(savedLinks)
          const link = links.find(l => l.slug === params.slug)
          
          if (link) {
            // Update click count
            const updatedLinks = links.map(l => 
              l.slug === params.slug ? { ...l, clicks: l.clicks + 1 } : l
            )
            localStorage.setItem('shortLinks', JSON.stringify(updatedLinks))
            
            // Redirect to original URL
            window.location.href = link.url
          } else {
            // Link not found, redirect to home
            router.push('/')
          }
        } else {
          // No links stored, redirect to home
          router.push('/')
        }
      } catch (error) {
        console.error('Redirect error:', error)
        router.push('/')
      }
    }

    redirectToOriginal()
  }, [params.slug, router])

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
        <p className="text-gray-600">Redirecting...</p>
      </div>
    </div>
  )
}