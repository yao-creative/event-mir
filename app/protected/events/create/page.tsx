'use client';
import { useEffect, useState } from "react";
import CreateEventForm from "@/components/ui/events/create-event-form";
import { createClient } from "@/utils/supabase/client";

interface Event {
  id: number;
  userid: string;
  datecreated: string;
  dateofevent: string;
  title: string;
  description: string;
  addressurl: string;
  addresstitle: string;
  organizerid: string;
}

const HomePage = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [event, setEvent] = useState<Event>({
    id: 0,
    userid: '',
    datecreated: new Date().toISOString(), // Initialize with current timestamp
    dateofevent: '',
    title: '',
    description: '',
    addressurl: '',
    addresstitle: '',
    organizerid: ''
  });
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<boolean>(false);

  // Destructure all properties from the event state
  const { 
    userid, 
    datecreated, 
    dateofevent, 
    title, 
    description, 
    addressurl, 
    addresstitle, 
    organizerid 
  } = event;

  const supabase = createClient();

  useEffect(() => {
    fetchEvents();
  }, []);

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

  async function createEvent() {
    try {
      const { data, error } = await supabase.from("events").insert([
        {
          userid,
          datecreated,
          dateofevent,
          title,
          description,
          addressurl,
          addresstitle,
          organizerid
        }
      ]).single();
      if (error) {
        throw error;
      }
      setSuccess(true);
      setEvent({
        id: 0,
        userid: '',
        datecreated: new Date().toISOString(), // Reset with current timestamp
        dateofevent: '',
        title: '',
        description: '',
        addressurl: '',
        addresstitle: '',
        organizerid: ''
      });
      fetchEvents();
    } catch (error: any) {
      setError(error.message);
      setSuccess(false);
    }
  }

  return (
    <div>
      <input
        placeholder="User ID"
        value={userid}
        onChange={(e) => setEvent({ ...event, userid: e.target.value })}
      />
      <input
        placeholder="Date Created"
        value={datecreated}
        readOnly // This field should be read-only if it's automatically set
        onChange={(e) => setEvent({ ...event, datecreated: e.target.value })}
      />
      <input
        type="date"
        placeholder="Date of Event (YYYY-MM-DD)"
        value={dateofevent}
        onChange={(e) => setEvent({ ...event, dateofevent: e.target.value })}
      />
      <input
        placeholder="Title"
        value={title}
        onChange={(e) => setEvent({ ...event, title: e.target.value })}
      />
      <input
        placeholder="Description"
        value={description}
        onChange={(e) => setEvent({ ...event, description: e.target.value })}
      />
      <input
        placeholder="Address URL"
        value={addressurl}
        onChange={(e) => setEvent({ ...event, addressurl: e.target.value })}
      />
      <input
        placeholder="Address Title"
        value={addresstitle}
        onChange={(e) => setEvent({ ...event, addresstitle: e.target.value })}
      />
      <input
        placeholder="Organizer ID"
        value={organizerid}
        onChange={(e) => setEvent({ ...event, organizerid: e.target.value })}
      />
      <button onClick={createEvent}>Create Event</button>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {success && <p style={{ color: 'green' }}>Event created successfully!</p>}
      {events.map((event) => (
        <div key={event.id}>
          <h3>{event.title}</h3>
          <p>Description: {event.description}</p>
          <p>Address: {event.addresstitle} ({event.addressurl})</p>
          <p>Organizer ID: {event.organizerid}</p>
          <p>User ID: {event.userid}</p>
          <p>Date of Event: {event.dateofevent}</p>
          <p>Date Created: {event.datecreated}</p>
          <p><br /></p>
        </div>
      ))}
    </div>
  );
};

export default HomePage;