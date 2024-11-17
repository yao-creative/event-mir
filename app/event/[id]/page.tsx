// app/event/[id]/index.tsx
import React from 'react'
import EventDetails from "@/components/ui/events/EventDetails";

export default async function Page(props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  const id = parseInt(params.id); // Convert ID to number

  return (
    <div>
  
      <EventDetails id={id} />
    </div>
  )
}