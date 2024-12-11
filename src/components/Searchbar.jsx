'use client'

import { useState } from 'react'
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Search } from 'lucide-react'

export default function Searchbar() {
  const [query, setQuery] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!query.trim()) return

    try {
      // Replace '/api/search' with your actual endpoint
      const response = await fetch('/api/search', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ query }),
      })

      if (!response.ok) {
        throw new Error('Search request failed')
      }

      const data = await response.json()
      console.log('Search results:', data)
      // Handle the search results here (e.g., update state, display results)
    } catch (error) {
      console.error('Error during search:', error)
      // Handle errors here (e.g., show error message to user)
    }

    // Optionally clear the input after submission
    // setQuery('')
  }

  return (
    <form onSubmit={handleSubmit} className="flex w-full max-w-sm items-center space-x-2">
      <Input
        type="text"
        placeholder="Zoek..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="flex-grow"
        aria-label="Search input"
      />
      <Button type="submit" aria-label="Submit search">
        <Search className="h-4 w-4" />
      </Button>
    </form>
  )
}

