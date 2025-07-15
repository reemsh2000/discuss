'use server';
import { z } from 'zod';
import { auth } from '@/auth';
import type { Topic } from '@prisma/client';
import { db } from '@/db';
import { redirect } from 'next/navigation';
import paths  from '@/path';
import { revalidatePath } from 'next/cache';
// import { revalidatePath } from 'next/cache';
const createTopicSchema = z.object({
     title: z.string().min(5).regex(/^[a-zA-Z0-9]+$/, { message: "Title must be alphanumeric" }),
     description: z.string().min(10),
});

interface CreateTopicFormState {
     errors?: {
          title?: string[];
          description?: string[];
          _form?: string[];
     };
}
export async function createTopic(formState: CreateTopicFormState, formData: FormData): Promise<CreateTopicFormState> {
   
     const result = createTopicSchema.safeParse({ title: formData.get('title'), description: formData.get('description') });

     if (!result.success) {
          return { errors: result.error.flatten().fieldErrors }
     }
     const session = await auth();
     if (!session || !session?.user) {
          return { errors: { _form: ["You must be signed in to create a topic"] } };
     }

     let topic: Topic;
     try {
          topic = await db.topic.create({
               data: {
                    slug: result.data.title,
                    description: result.data.description,
               },
          });
     } catch (err: unknown) {
          if (err instanceof Error) {
               return { errors: { _form: ["Failed to create topic"] } };
          } else {
               return { errors: { _form: ["An unknown error occurred"] } };
          }
     }
     revalidatePath('/')
     redirect(paths.topicShow(topic.slug));
} 