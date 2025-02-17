'use server'
import { revalidatePath } from "next/cache";



export const createPostAction = async (_state: unknown, input: FormData): Promise<{ error?: string } | undefined> => {
    const title = input.get("title") || ""
    const body = input.get("body") || ""

    const fullURL = `${process.env.NEXT_URL}/api/posts`

    console.log(fullURL);
    

    const response = await fetch(fullURL, {
        method: 'POST',
        body: JSON.stringify({
            title: title,
            body: body
        }),
    });

    if (!response.ok) {

        return { error: await response.text() };
    }

    revalidatePath("/posts");
}



export const deletePostAction = async (_state: unknown, input: FormData): Promise<{ error?: string } | undefined> => {
    const postId = input.get('postId') as string;


    const fullURL = `${process.env.NEXT_URL}/api/posts/${postId}`

    const response = await fetch(fullURL, {
        method: 'DELETE',
    });

    if (!response.ok) {
        return { error: "Failed to delete post" };
    }

    revalidatePath("/posts");
}
