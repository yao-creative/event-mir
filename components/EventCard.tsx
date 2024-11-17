import Image from 'next/image'
import { Event } from "@/app/interfaces/event"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { CalendarIcon, MapPinIcon, CheckCircleIcon } from 'lucide-react'
import * as AspectRatio from '@radix-ui/react-aspect-ratio'
import * as Tooltip from '@radix-ui/react-tooltip'

interface Props {
  data: Event
}

export default function EventCard({ data }: Props) {
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
              <CalendarIcon className="mr-1 h-4 w-4" />
              {new Date(data.dateofevent).toLocaleDateString()}
            </p>
            <h2 className="text-2xl font-bold truncate">{data.title}</h2>
          </div>
          {/* <Tooltip.Provider>
            <Tooltip.Root>
              <Tooltip.Trigger asChild>
                <Button variant="outline">Join</Button>
              </Tooltip.Trigger>
              <Tooltip.Portal>
                <Tooltip.Content className="bg-secondary text-secondary-foreground px-2 py-1 rounded text-sm" sideOffset={5}>
                  Join this event
                  <Tooltip.Arrow className="fill-secondary" />
                </Tooltip.Content>
              </Tooltip.Portal>
            </Tooltip.Root>
          </Tooltip.Provider> */}
        </div>
      </CardHeader>
      <CardContent className="space-y-2">
        <div className="flex items-center space-x-2">
          <Avatar>
            <AvatarImage src="/fibaLogo.jpg" alt="Organizer Avatar" />
            <AvatarFallback>{data.organizerid.slice(0, 2).toUpperCase()}</AvatarFallback>
          </Avatar>
          <div className="flex flex-col">
            <p className="font-bold truncate">{data.organizerid}</p>
            <p className='text-sm flex items-center text-muted-foreground'>
              <span>@{data.organizerid}</span> 
              <CheckCircleIcon className="ml-1 h-4 w-4 text-blue-500" />
            </p>
          </div>
        </div>
        <p className="text-sm text-muted-foreground line-clamp-2 truncate">{data.description}</p>
      </CardContent>
      <CardFooter>
        <p className="text-sm flex items-center text-muted-foreground truncate">
          <MapPinIcon className="mr-1 h-4 w-4" />
          {data.addresstitle}
        </p>
      </CardFooter>
    </Card>
  )
}