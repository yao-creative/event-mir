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
    user_name: "",
    created_at: new Date().toISOString(),
    event_date: "",
    title: "",
    description: "",
    address_url: "",
    address_title: "",
    organization_name: "",
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
            user_name: event.user_name,
            created_at: event.created_at,
            event_date: event.event_date,
            title: event.title,
            description: event.description,
            address_url: event.address_url,
            address_title: event.address_title,
            organization_name: event.organization_name,
          },
        ])
        .single();
      if (error) {
        throw error;
      }
      setSuccess(true);
      setEvent({
        id: 0,
        user_name: "",
        created_at: new Date().toISOString(),
        event_date: "",
        title: "",
        description: "",
        address_url: "",
        address_title: "",
        organization_name: "",
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
              <Label htmlFor="user_name">User Name</Label>
              <Input
                id="user_name"
                value={event.user_name}
                onChange={(e) => setEvent({ ...event, user_name: e.target.value })}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="organization_name">Organization Name</Label>
              <Input
                id="organization_name"
                value={event.organization_name}
                onChange={(e) => setEvent({ ...event, organization_name: e.target.value })}
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
              <Label htmlFor="event_date">Date of Event</Label>
              <Input
                id="event_date"
                type="date"
                value={event.event_date}
                onChange={(e) => setEvent({ ...event, event_date: e.target.value })}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="created_at">Date Created</Label>
              <Input
                id="created_at"
                value={event.created_at}
                readOnly
                disabled
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="address_title">Address Title</Label>
            <Input
              id="address_title"
              value={event.address_title}
              onChange={(e) => setEvent({ ...event, address_title: e.target.value })}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="address_url">Address URL</Label>
            <Input
              id="address_url"
              type="url"
              value={event.address_url}
              onChange={(e) => setEvent({ ...event, address_url: e.target.value })}
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