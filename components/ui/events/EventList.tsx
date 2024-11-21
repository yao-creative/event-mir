import React from "react"
import Link from "next/link"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { CalendarIcon, MapPinIcon, UserIcon } from 'lucide-react'
import { Event } from "@/app/interfaces/event";


interface EventListProps {
  events: Event[]
}

export default function EventList({ events }: EventListProps) {
  if (events.length === 0) {
    return <p className="text-center text-muted-foreground">No events found.</p>
  }

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {events.map((event) => (
        <Card key={event.id} className="flex flex-col">
          <CardHeader>
            <CardTitle>{event.title}</CardTitle>
          </CardHeader>
          <CardContent className="flex-grow">
            <p className="text-muted-foreground mb-4">{event.description}</p>
            <div className="flex items-center mb-2">
              <CalendarIcon className="mr-2 h-4 w-4" />
              <span>{new Date(event.event_date).toLocaleDateString()}</span>
            </div>
            <div className="flex items-center mb-2">
              <MapPinIcon className="mr-2 h-4 w-4" />
              <a href={event.address_url} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
                {event.address_title}
              </a>
            </div>
            <div className="flex items-center">
              <UserIcon className="mr-2 h-4 w-4" />
              <span>Organizer ID: {event.organization_name}</span>
            </div>
          </CardContent>
          <CardFooter>
            <Link href={`/event/${event.id}`} passHref>
              <Button variant="outline" className="w-full">View Details</Button>
            </Link>
          </CardFooter>
        </Card>
      ))}
    </div>
  )
}