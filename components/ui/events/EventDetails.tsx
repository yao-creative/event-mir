'use client'

import { useState, useEffect } from "react"
import { createClient } from "@/utils/supabase/client"
import Image from "next/image"
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { CalendarIcon, MapPinIcon, UserIcon, ClockIcon, CheckCircleIcon } from 'lucide-react'
import * as AspectRatio from '@radix-ui/react-aspect-ratio'
import * as Separator from '@radix-ui/react-separator'
import { Event } from "@/app/interfaces/event";


export default function EventDetails({ id }: { id: number }) {
  const [event, setEvent] = useState<Event | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)

  const supabase = createClient()

  useEffect(() => {
    fetchEvent()
  }, [id])

  async function fetchEvent() {
    try {
      const { data, error } = await supabase
        .from("events")
        .select()
        .eq("id", id)
        .single()

      if (error) throw error

      setEvent(data)
    } catch (error: any) {
      console.error("Error fetching event:", error)
      setError(error.message)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return <EventSkeleton />
  }

  if (error) {
    return (
      <Card className="max-w-2xl mx-auto mt-8">
        <CardContent className="pt-6">
          <p className="text-center text-red-500">Error: {error}</p>
        </CardContent>
      </Card>
    )
  }

  if (!event) {
    return (
      <Card className="max-w-2xl mx-auto mt-8">
        <CardContent className="pt-6">
          <p className="text-center">Event not found</p>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="max-w-md mx-auto overflow-hidden">
      <AspectRatio.Root>
        <Image
          src="/eventPoster.webp"
          alt="Event Poster"
          layout="fill"
          objectFit="cover"
          className="rounded-t-lg"
        />
      </AspectRatio.Root>
      <CardHeader className="space-y-1">
        <div className="flex justify-between items-start">
          <div className="space-y-1">
            <p className="text-sm flex items-center text-muted-foreground">
              <CalendarIcon className="mr-2 h-4 w-4" />
              {new Date(event.event_date).toLocaleDateString()}
            </p>
            <CardTitle className="text-2xl font-bold">{event.title}</CardTitle>
          </div>
          <Button>Join</Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex items-center space-x-2">
          <Avatar>
            <AvatarImage src="/fibaLogo.jpg" alt="Organizer Avatar" />
            <AvatarFallback>{event.organization_name.toUpperCase()}</AvatarFallback>
          </Avatar>
          <div className="flex flex-col">
            <p className="font-bold">{event.organization_name}</p>
            <p className='text-sm flex items-center text-muted-foreground'>
              <span>@{event.user_name}</span> 
              <CheckCircleIcon className="ml-1 h-4 w-4 text-blue-500" />
            </p>
          </div>
        </div>
        <div className="space-y-2">
          <h3 className="text-lg font-semibold">Description</h3>
          <p>{event.description}</p>
        </div>
        <Separator.Root className="h-[1px] bg-border" />
        <div className="space-y-2">
          <h3 className="text-lg font-semibold">Address</h3>
          <a href={event.address_url} target="_blank" rel="noopener noreferrer" className="flex items-center text-blue-500 hover:underline">
            <MapPinIcon className="mr-2 h-4 w-4" />
            {event.address_title}
          </a>
        </div>
        <Separator.Root className="h-[1px] bg-border" />
        <div className="grid grid-cols-2 gap-4">
          {/* <div className="space-y-2">
            <h3 className="text-lg font-semibold">Organizer ID</h3>
            <p className="flex items-center">
              <UserIcon className="mr-2 h-4 w-4" />
              {event.organizerid}
            </p>
          </div>
          <div className="space-y-2">
            <h3 className="text-lg font-semibold">User ID</h3>
            <p className="flex items-center">
              <UserIcon className="mr-2 h-4 w-4" />
              {event.userid}
            </p>
          </div> */}
        </div>
      </CardContent>
      <CardFooter>
        <p className="text-sm flex items-center text-muted-foreground">
          <ClockIcon className="mr-2 h-4 w-4" />
          Created on: {new Date(event.event_date).toLocaleString()}
        </p>
      </CardFooter>
    </Card>
  )
}

function EventSkeleton() {
  return (
    <Card className="max-w-2xl mx-auto mt-8">
      <AspectRatio.Root ratio={16 / 9}>
        <Skeleton className="w-full h-full rounded-t-lg" />
      </AspectRatio.Root>
      <CardHeader>
        <Skeleton className="h-4 w-32 mb-2" />
        <Skeleton className="h-8 w-64" />
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex items-center space-x-2">
          <Skeleton className="h-10 w-10 rounded-full" />
          <div className="space-y-2">
            <Skeleton className="h-4 w-32" />
            <Skeleton className="h-4 w-24" />
          </div>
        </div>
        <div className="space-y-2">
          <Skeleton className="h-6 w-32" />
          <Skeleton className="h-20 w-full" />
        </div>
        <Separator.Root className="h-[1px] bg-border" />
        <div className="space-y-2">
          <Skeleton className="h-6 w-32" />
          <Skeleton className="h-6 w-64" />
        </div>
        <Separator.Root className="h-[1px] bg-border" />
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Skeleton className="h-6 w-32" />
            <Skeleton className="h-6 w-48" />
          </div>
          <div className="space-y-2">
            <Skeleton className="h-6 w-32" />
            <Skeleton className="h-6 w-48" />
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Skeleton className="h-4 w-64" />
      </CardFooter>
    </Card>
  )
}