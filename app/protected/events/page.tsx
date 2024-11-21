"use client"

import { Suspense, useEffect, useState } from "react"
import { createClient } from "@/utils/supabase/client"
import Link from 'next/link'
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { PlusCircle, SearchIcon } from 'lucide-react'
import EventList from "@/components/ui/events/EventList"
import { Event } from "@/app/interfaces/event";

export default function HomePage() {
  const [events, setEvents] = useState<Event[]>([])
  const [error, setError] = useState<string | null>(null)
  const [searchQuery, setSearchQuery] = useState("")

  const supabase = createClient()

  useEffect(() => {
    fetchEvents()
  }, [])

  async function fetchEvents() {
    const { data, error } = await supabase.from("events").select()
    if (error) {
      console.error("Error fetching events:", error)
      setError(error.message)
    } else {
      setEvents(data as Event[])
    }
  }

  const filteredEvents = events.filter(event =>
    event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    event.description.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <Card className="max-w-4xl mx-auto mt-8">
      <CardHeader>
        <CardTitle className="text-2xl font-bold">Events</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex justify-between items-center mb-6">
          <div className="relative flex-1 max-w-sm">
            <Input
              placeholder="Search events"
              className="pl-8"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <Link href="/protected/events/create" passHref>
            <Button>
              <PlusCircle className="mr-2 h-4 w-4" />
              Create Event
            </Button>
          </Link>
        </div>

        {error && (
          <p className="text-red-500 mb-4">{error}</p>
        )}

        <Suspense fallback={<div>Loading events...</div>}>
          <EventList events={filteredEvents} />
        </Suspense>
      </CardContent>
    </Card>
  )
}