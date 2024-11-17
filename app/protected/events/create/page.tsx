"use client";

import { useState } from "react";
import { createClient } from "@/utils/supabase/client";
import { Event } from "@/app/interfaces/event";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertCircle, CheckCircle2 } from 'lucide-react'
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

export default function EventForm() {
  const [event, setEvent] = useState<Event>({
    id: 0,
    userid: "",
    datecreated: new Date().toISOString(),
    dateofevent: "",
    title: "",
    description: "",
    addressurl: "",
    addresstitle: "",
    organizerid: "",
  });
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<boolean>(false);

  const supabase = createClient();

  async function createEvent(e: React.FormEvent) {
    e.preventDefault();
    try {
      const { data, error } = await supabase
        .from("events")
        .insert([
          {
            userid: event.userid,
            datecreated: event.datecreated,
            dateofevent: event.dateofevent,
            title: event.title,
            description: event.description,
            addressurl: event.addressurl,
            addresstitle: event.addresstitle,
            organizerid: event.organizerid,
          },
        ])
        .single();
      if (error) {
        throw error;
      }
      setSuccess(true);
      setEvent({
        id: 0,
        userid: "",
        datecreated: new Date().toISOString(),
        dateofevent: "",
        title: "",
        description: "",
        addressurl: "",
        addresstitle: "",
        organizerid: "",
      });
    } catch (error: any) {
      setError(error.message);
      setSuccess(false);
    }
  }

  return (
    <Card className="max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl font-bold">Create Event</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={createEvent} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="userid">User ID</Label>
              <Input
                id="userid"
                value={event.userid}
                onChange={(e) => setEvent({ ...event, userid: e.target.value })}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="organizerid">Organizer ID</Label>
              <Input
                id="organizerid"
                value={event.organizerid}
                onChange={(e) => setEvent({ ...event, organizerid: e.target.value })}
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              value={event.title}
              onChange={(e) => setEvent({ ...event, title: e.target.value })}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={event.description}
              onChange={(e) => setEvent({ ...event, description: e.target.value })}
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="dateofevent">Date of Event</Label>
              <Input
                id="dateofevent"
                type="date"
                value={event.dateofevent}
                onChange={(e) => setEvent({ ...event, dateofevent: e.target.value })}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="datecreated">Date Created</Label>
              <Input
                id="datecreated"
                value={event.datecreated}
                readOnly
                disabled
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="addresstitle">Address Title</Label>
            <Input
              id="addresstitle"
              value={event.addresstitle}
              onChange={(e) => setEvent({ ...event, addresstitle: e.target.value })}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="addressurl">Address URL</Label>
            <Input
              id="addressurl"
              type="url"
              value={event.addressurl}
              onChange={(e) => setEvent({ ...event, addressurl: e.target.value })}
              required
            />
          </div>

          <Button type="submit" className="w-full">Create Event</Button>

          {error && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
          {success && (
            <Alert variant="default" className="bg-green-100 text-green-800 border-green-300">
              <CheckCircle2 className="h-4 w-4" />
              <AlertTitle>Success</AlertTitle>
              <AlertDescription>Event created successfully!</AlertDescription>
            </Alert>
          )}
        </form>
      </CardContent>
    </Card>
  );
}