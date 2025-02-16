'use server'
import { revalidatePath } from "next/cache";



export const createPostAction = async (_state: unknown, input: FormData): Promise<{ error?: string } | undefined> => {
    const response = await fetch('/api/posts', {
        method: 'POST',
        body: input,
    });

    if (!response.ok) {
        // throw new Error(await response.text());
        return { error: await response.text() };
    }

    revalidatePath("/posts");
}



export const deletePostAction = async (_state: unknown, input: FormData): Promise<{ error?: string } | undefined> => {
    const postId = input.get('postId') as string;

    const response = await fetch(`/api/posts/${postId}`, {
        method: 'DELETE',
    });

    if (!response.ok) {
        return { error: "Failed to delete post" };
    }

    revalidatePath("/posts");
}
