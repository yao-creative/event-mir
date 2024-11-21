"use client";

import { useState, useEffect } from "react";
import { createClient } from "@/utils/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertCircle, CheckCircle2 } from 'lucide-react'
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Profile } from "@/app/interfaces/profile";

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
  const [status, setStatus] = useState<{ error: string | null; success: boolean }>({ error: null, success: false });
  const [isEditing, setIsEditing] = useState(true);

  const supabase = createClient();

  useEffect(() => {
    fetchProfile();
  }, []);

  async function fetchProfile() {
    try {
      const { data: { user }, error: userError } = await supabase.auth.getUser();
      if (userError || !user) {
        throw new Error("No authenticated user found");
      }

      const userEmail = user.email;
      const { data, error } = await supabase
        .from("user_profiles")
        .select("*")
        .eq("user_id", user.id)
        .single();

      if (error) {
        if (error.code === 'PGRST116') { // No rows returned error
          const { data: newProfile, error: insertError } = await supabase
            .from("user_profiles")
            .insert([{
              user_id: user.id,
              updated_at: new Date().toISOString(),
              location: "",
              contact_email: userEmail,
              contact_phone: "",
              organization_name: "",
              name: ""
            }])
            .select()
            .single();

          if (insertError) {
            throw insertError;
          }
          setProfile(newProfile as Profile);
        } else {
          throw error;
        }
      } else {
        const profileData = { ...data, contact_email: data.contact_email || userEmail };
        setProfile(profileData as Profile);
      }
    } catch (error: any) {
      console.error("Error fetching profile:", error);
      setStatus({ error: error.message, success: false });
    }
  }

  async function updateProfile(e: React.FormEvent) {
    e.preventDefault();

    // Basic form validation
    if (!profile.name || !profile.contact_phone || !profile.organization_name || !profile.location) {
      setStatus({ error: "Please fill in all required fields.", success: false });
      return;
    }

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
            name: profile.name,
            contact_phone: profile.contact_phone,
            organization_name: profile.organization_name,
            location: profile.location,
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
      setStatus({ error: null, success: true });
      setIsEditing(false); // Toggle off edit mode after saving changes
      await fetchProfile(); // Reset to original data
    } catch (error: any) {
      console.error("Error updating profile:", error);
      setStatus({ error: error.message, success: false });
    }
  }

  function toggleEditMode() {
    setIsEditing(!isEditing);
  }

  return (
    <Card className="max-w-2xl mx-auto">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-2xl font-bold">User Profile</CardTitle>
        {isEditing ? (
          <Button type="button" onClick={toggleEditMode}>View</Button>
        ) : (
          <Button type="button" onClick={toggleEditMode}>Edit</Button>
        )}
      </CardHeader>
      <CardContent>
        <form onSubmit={updateProfile} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              value={profile.name || ""} // Ensure empty string if null or undefined
              onChange={(e) => setProfile({ ...profile, name: e.target.value })}
              disabled={!isEditing}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="contact_email">Email</Label>
            <p className="mt-1">{profile.contact_email}</p>
          </div>
          <div className="space-y-2">
            <Label htmlFor="contact_phone">Phone</Label>
            <Input
              id="contact_phone"
              type="tel"
              value={profile.contact_phone || ""} // Ensure empty string if null or undefined
              onChange={(e) => setProfile({ ...profile, contact_phone: e.target.value })}
              disabled={!isEditing}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="organization_name">Organization</Label>
            <Input
              id="organization_name"
              value={profile.organization_name || ""} // Ensure empty string if null or undefined
              onChange={(e) => setProfile({ ...profile, organization_name: e.target.value })}
              disabled={!isEditing}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="location">Location</Label>
            <Input
              id="location"
              value={profile.location || ""} // Ensure empty string if null or undefined
              onChange={(e) => setProfile({ ...profile, location: e.target.value })}
              disabled={!isEditing}
              required
            />
          </div>

          {isEditing && (
            <div className="flex gap-4">
              <Button type="submit" className="flex-1">Save Changes</Button>
            </div>
          )}

          {status.error && (
            <Alert variant="default">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>{status.error}</AlertDescription>
            </Alert>
          )}
          {status.success && (
            <Alert variant="default">
              <CheckCircle2 className="h-4 w-4" />
              <AlertTitle>Success</AlertTitle>
              <AlertDescription>Profile updated successfully!</AlertDescription>
            </Alert>
          )}
        </form>
      </CardContent>
    </Card>
  );
}