'use client'

import { useState, useEffect } from 'react'

export default function Home() {
  const [url, setUrl] = useState('')
  const [customSlug, setCustomSlug] = useState('')
  const [shortLink, setShortLink] = useState(null)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [links, setLinks] = useState([])

  // Load links from localStorage on component mount
  useEffect(() => {
    const savedLinks = localStorage.getItem('shortLinks')
    if (savedLinks) {
      setLinks(JSON.parse(savedLinks))
    }
  }, [])

  // Save links to localStorage whenever links change
  useEffect(() => {
    localStorage.setItem('shortLinks', JSON.stringify(links))
  }, [links])

  const handleSubmit = (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      // Validate URL
      if (!url) {
        throw new Error('URL is required')
      }

      // Validate URL format
      try {
        new URL(url)
      } catch {
        throw new Error('Invalid URL format')
      }

      // Generate or use custom slug
      let slug = customSlug || generateRandomSlug(6)

      // Check if slug already exists
      const existingLink = links.find(link => link.slug === slug)
      if (existingLink) {
        if (customSlug) {
          throw new Error('This custom slug is already in use')
        }
        // Generate new slug if random one exists
        slug = generateRandomSlug(6)
      }

      // Create short link object
      const newShortLink = {
        id: generateRandomSlug(10),
        slug,
        url,
        shortUrl: `${window.location.origin}/${slug}`,
        clicks: 0,
        createdAt: new Date().toISOString()
      }

      // Add to links list
      const updatedLinks = [newShortLink, ...links]
      setLinks(updatedLinks)
      setShortLink(newShortLink)
      setUrl('')
      setCustomSlug('')

    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  const handleRedirect = (slug) => {
    // Find the link
    const link = links.find(l => l.slug === slug)
    if (link) {
      // Update click count
      const updatedLinks = links.map(l => 
        l.slug === slug ? { ...l, clicks: l.clicks + 1 } : l
      )
      setLinks(updatedLinks)
      
      // Redirect to original URL
      window.open(link.url, '_blank')
    }
  }

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text)
    alert('Copied to clipboard!')
  }

  const deleteLink = (id) => {
    const updatedLinks = links.filter(link => link.id !== id)
    setLinks(updatedLinks)
    if (shortLink && shortLink.id === id) {
      setShortLink(null)
    }
  }

  const generateRandomSlug = (length) => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
    let result = ''
    for (let i = 0; i < length; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length))
    }
    return result
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            URL Shortener
          </h1>
          <p className="text-lg text-gray-600 mb-8">
            Shorten your long URLs quickly and easily - All data stored locally in your browser
          </p>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="url" className="block text-sm font-medium text-gray-700">
                Long URL *
              </label>
              <input
                type="url"
                id="url"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder="https://example.com/very-long-url"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>

            <div>
              <label htmlFor="customSlug" className="block text-sm font-medium text-gray-700">
                Custom Slug (optional)
              </label>
              <input
                type="text"
                id="customSlug"
                value={customSlug}
                onChange={(e) => setCustomSlug(e.target.value)}
                placeholder="my-custom-link"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                pattern="[a-zA-Z0-9-_]+"
                title="Only letters, numbers, hyphens, and underscores allowed"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
            >
              {loading ? 'Shortening...' : 'Shorten URL'}
            </button>
          </form>

          {error && (
            <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-md">
              <p className="text-sm text-red-600">{error}</p>
            </div>
          )}

          {shortLink && (
            <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-md">
              <p className="text-sm font-medium text-green-800 mb-2">
                ✅ URL shortened successfully!
              </p>
              <div className="flex items-center space-x-2">
                <input
                  type="text"
                  value={shortLink.shortUrl}
                  readOnly
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-md text-sm bg-white"
                />
                <button
                  onClick={() => copyToClipboard(shortLink.shortUrl)}
                  className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  Copy
                </button>
              </div>
            </div>
          )}
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold text-gray-900">Your Short Links</h2>
            <div className="text-sm text-gray-500">
              {links.length} link{links.length !== 1 ? 's' : ''} stored locally
            </div>
          </div>

          {links.length === 0 ? (
            <div className="text-center py-8">
              <div className="text-gray-400 text-6xl mb-4">🔗</div>
              <p className="text-gray-500 text-lg">No links yet</p>
              <p className="text-gray-400 text-sm mt-2">Create your first short URL above!</p>
            </div>
          ) : (
            <div className="space-y-4">
              {links.map((link) => (
                <div key={link.id} className="border border-gray-200 rounded-lg p-4 hover:border-gray-300 transition-colors">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-2">
                        <button
                          onClick={() => handleRedirect(link.slug)}
                          className="text-blue-600 hover:text-blue-800 font-medium text-lg"
                        >
                          {window.location.origin}/{link.slug}
                        </button>
                        <button
                          onClick={() => copyToClipboard(`${window.location.origin}/${link.slug}`)}
                          className="text-gray-400 hover:text-gray-600 text-sm px-2 py-1 border rounded"
                        >
                          Copy
                        </button>
                      </div>
                      <p className="text-sm text-gray-600 truncate" title={link.url}>
                        → {link.url}
                      </p>
                      <div className="flex items-center space-x-4 mt-2 text-xs text-gray-500">
                        <span>👆 {link.clicks} clicks</span>
                        <span>🕐 {new Date(link.createdAt).toLocaleDateString()}</span>
                      </div>
                    </div>
                    <button
                      onClick={() => deleteLink(link.id)}
                      className="text-red-500 hover:text-red-700 ml-4 p-2"
                      title="Delete link"
                    >
                      🗑️
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {links.length > 0 && (
            <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-md">
              <p className="text-sm text-blue-700">
                💡 <strong>Note:</strong> All data is stored locally in your browser. 
                Links will be lost if you clear browser data or use a different browser/device.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}