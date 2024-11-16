'use client';
import EventCard from "@/components/EventCard";
import Link from "next/link";
import { Event } from "@/app/interfaces/event";
import { useState, useEffect } from "react";
import { createClient } from "@/utils/supabase/client";

export default function Home() {
  const supabase = createClient();

  const [events, setEvents] = useState<Event[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<boolean>(false);

  async function fetchEvents() {
    const { data, error } = await supabase.from("events").select();
    if (error) {
      console.error("Error fetching events:", error);
      setError(error.message);
    } else {
      setEvents(data as Event[]);
      console.log("data: ", data);
    }
  }

  // Fetch events when the component mounts
  useEffect(() => {
    fetchEvents();
  }, []);

  return (
    <div className="container mx-auto p-4 mt-4">
      {error && (
        <p style={{ color: 'red', textAlign: 'center' }}>{error}</p>
      )}
      
      <h1 className="text-3xl font-bold mb-4">Upcoming Events</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {events.map((event) => (
          <Link key={event.id} href={`/event/${event.id}`}>
            <EventCard data={event} />
          </Link>
        ))}
      </div>
    </div>
  );
}