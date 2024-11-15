import { z } from "zod";
import { sql } from "@vercel/postgres";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

const FormSchemaEvents = z.object({
  id: z.string(),
  userId: z.string(),
  dateOfEvent: z.string(),
  title: z.string(),
  description: z.string(),
  addressUrl: z.string(),
  addressTitle: z.string(),
  organizerId: z.string(),
});

// Include all necessary fields
const CreateEvent = FormSchemaEvents;

export type State = {
  errors?: {
    userId?: string[];
  };
  message?: string | null;
};

export async function createEvent(prevState: State, formData: FormData) {
  const validatedFields = CreateEvent.safeParse({
    id: formData.get('id'),
    userId: formData.get('userId'),
    dateOfEvent: formData.get('dateOfEvent'),
    title: formData.get('title'),
    description: formData.get('description'),
    addressUrl: formData.get('addressUrl'),
    addressTitle: formData.get('addressTitle'),
    organizerId: formData.get('organizerId'),
  });

  if (!validatedFields.success) {
    // Handle validation errors here
    return { errors: validatedFields.error.issues };
  }

  const {
    data: {
      userId,
      dateOfEvent,
      title,
      description,
      addressUrl,
      addressTitle,
      organizerId,
    },
  } = validatedFields;

  // Generate a default value for dateCreated if it's not provided
  const dateCreated = new Date().toISOString();

  await sql`INSERT INTO events (userId, dateCreated, dateOfEvent, title, description, addressUrl, addressTitle, organizerId)
             VALUES (${userId}, ${dateCreated}, ${dateOfEvent}, ${title}, ${description}, ${addressUrl}, ${addressTitle}, ${organizerId})`;

  revalidatePath('/protected/events');
  redirect('/protected/events');
}