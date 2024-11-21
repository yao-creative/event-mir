"use client";

import { useState, useEffect } from "react";
import { createClient } from "@/utils/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertCircle, CheckCircle2 } from 'lucide-react'
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

interface Profile {
  updated_at: string;
  location: string;
  contact_email: string;
  contact_phone: string;
  organization_name: string;
  user_id: string;
  name: string;
}

export default function ProfilePage() {
  const [profile, setProfile] = useState<Profile>({
    updated_at: new Date().toISOString(),
    location: "",
    contact_email: "",
    contact_phone: "",
    organization_name: "",
    user_id: "",
    name: "",
  });
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<boolean>(false);
  const [isEditing, setIsEditing] = useState(false);

  const supabase = createClient();

  useEffect(() => {
    fetchProfile();
  }, []);

  async function fetchProfile() {
    // Get authenticated user
    const { data: { user }, error: userError } = await supabase.auth.getUser();
    
    if (userError) {
      console.error("Error getting authenticated user:", userError);
      return;
    }

    if (!user) {
      console.error("No authenticated user found");
      return;
    } else{
      console.log("User found:", user);
    }

    // Fetch user profile data from the database
    const { data, error } = await supabase
      .from("user_profiles")
      .select("*")
      .eq("user_id", user.id)
      .single();

    if (error) {
      if (error.code === 'PGRST116') { // No rows returned error
        // If profile doesn't exist, create one
        const { data: newProfile, error: insertError } = await supabase
          .from("user_profiles")
          .insert([{
            user_id: user.id,
            updated_at: new Date().toISOString(),
            location: "",
            contact_email: "",
            contact_phone: "",
            organization_name: "",
            name: ""
          }])
          .select()
          .single();

        if (insertError) {
          console.error("Error creating profile:", insertError);
          setError(insertError.message);
        } else if (newProfile) {
          setProfile(newProfile as Profile);
        }
      } else {
        console.error("Error fetching profile:", error);
        setError(error.message);
      }
    } else if (data) {
      setProfile(data as Profile);
    }
  }

  async function updateProfile(e: React.FormEvent) {
    e.preventDefault();
    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        throw new Error("No authenticated user found");
      }

      const { error } = await supabase
        .from("user_profiles")
        .upsert(
          {
            user_id: user.id,
            location: profile.location,
            contact_email: profile.contact_email,
            contact_phone: profile.contact_phone,
            organization_name: profile.organization_name,
            name: profile.name,
            updated_at: new Date().toISOString()
          },
          {
            onConflict: 'user_id'
          }
        )
        .select()
        .single();

      if (error) {
        throw error;
      }
      setSuccess(true);
      setIsEditing(false);
      await fetchProfile();
    } catch (error: any) {
      setError(error.message);
      setSuccess(false);
    }
  }

  return (
    <Card className="max-w-2xl mx-auto">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-2xl font-bold">User Profile</CardTitle>
        {!isEditing && (
          <Button onClick={() => setIsEditing(true)}>Edit Profile</Button>
        )}
      </CardHeader>
      <CardContent>
        {!isEditing ? (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Name</Label>
                <p className="mt-1">{profile.name || "Not set"}</p>
              </div>
              <div>
                <Label>Email</Label>
                <p className="mt-1">{profile.contact_email || "Not set"}</p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Phone</Label>
                <p className="mt-1">{profile.contact_phone || "Not set"}</p>
              </div>
              <div>
                <Label>Organization</Label>
                <p className="mt-1">{profile.organization_name || "Not set"}</p>
              </div>
            </div>
            <div>
              <Label>Location</Label>
              <p className="mt-1">{profile.location || "Not set"}</p>
            </div>
          </div>
        ) : (
          <form onSubmit={updateProfile} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                value={profile.name}
                onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="contact_email">Email</Label>
              <Input
                id="contact_email"
                type="email"
                value={profile.contact_email}
                onChange={(e) => setProfile({ ...profile, contact_email: e.target.value })}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="contact_phone">Phone</Label>
              <Input
                id="contact_phone"
                type="tel"
                value={profile.contact_phone}
                onChange={(e) => setProfile({ ...profile, contact_phone: e.target.value })}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="organization_name">Organization</Label>
              <Input
                id="organization_name"
                value={profile.organization_name}
                onChange={(e) => setProfile({ ...profile, organization_name: e.target.value })}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="location">Location</Label>
              <Input
                id="location"
                value={profile.location}
                onChange={(e) => setProfile({ ...profile, location: e.target.value })}
                required
              />
            </div>
            <div className="flex gap-4">
              <Button type="submit" className="flex-1">Save Changes</Button>
              <Button 
                type="button" 
                variant="outline" 
                onClick={() => {
                  setIsEditing(false);
                  setError(null);
                  setSuccess(false);
                  fetchProfile(); // Reset to original data
                }}
                className="flex-1"
              >
                Cancel
              </Button>
            </div>
            
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
                <AlertDescription>Profile updated successfully!</AlertDescription>
              </Alert>
            )}
          </form>
        )}
      </CardContent>
    </Card>
  );
}
