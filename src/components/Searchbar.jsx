'use client'

import { useState } from 'react'
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Search } from 'lucide-react'
import RecordDetails from './RecordDetails'

export default function Searchbar() {
  const [query, setQuery] = useState('')
  const [responseData, setResponseData] = useState(null)

  const handleSubmit = async (e) => {
    e.preventDefault()
    // if (!query.trim()) return

    fetch('http://127.0.0.1:8000/search/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({query}),
    })
      .then((response) => response.json())
      .then((data) => {
        setResponseData(data)
        console.log(responseData)
      
        if (data?.result && data.result.length > 0) {
          const closestRecord = data.result[0]; 
          const parsedRecord = JSON.parse(closestRecord.record); 
          setResponseData(parsedRecord[0]); 
        }
      })
      .catch((error) => console.error('Error:', error))
    }

  return (
    <>
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

      {responseData && (
        <RecordDetails record={responseData} />
      )}
    </>
  )
}
