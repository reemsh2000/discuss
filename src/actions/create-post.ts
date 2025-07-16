'use server';
import { z } from 'zod';
import { auth } from '@/auth';
import type { Post } from '@prisma/client';
import { db } from '@/db';
import { redirect } from 'next/navigation';
import paths from '@/path';
import { revalidatePath } from 'next/cache';
// import { revalidatePath } from 'next/cache';
const createPostSchema = z.object({
    title: z.string().min(3).regex(/^[a-zA-Z0-9]+$/, { message: "Title must be alphanumeric" }),
    content: z.string().min(10),
});

interface CreatePostFormState {
    errors?: {
        title?: string[];
        content?: string[];
        _form?: string[];
    };
}
export async function createPost(slug: string, formState: CreatePostFormState, formData: FormData): Promise<CreatePostFormState> {

    const result = createPostSchema.safeParse({ title: formData.get('title'), content: formData.get('content') });

    if (!result.success) {
        return { errors: result.error.flatten().fieldErrors }
    }
    const session = await auth();
    if (!session || !session?.user|| !session.user.id) {
        return { errors: { _form: ["You must be signed in to create a topic"] } };
    }
   const topic = await db.topic.findFirst({
        where: {
            slug,
        },
    });
    if (!topic) {
        return { errors: { _form: ["Topic not found"] } };
    }
    let post: Post;
    try {
        post = await db.post.create({
            data: {
                topicId: topic.id,
                title: result.data.title,
                content: result.data.content,
                userId: session.user.id,
            },
        });
    } catch (err: unknown) {
        if (err instanceof Error) {
            return { errors: { _form: ["Failed to create topic"] } };
        } else {
            return { errors: { _form: ["An unknown error occurred"] } };
        }
    }
    revalidatePath(paths.topicShow(slug));
    redirect(paths.postShow(slug , post.id));
} 