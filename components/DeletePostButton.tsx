'use client';

import { deletePostAction } from '@/lib/actions';
import { useActionState, useEffect } from 'react';

interface DeletePostButtonProps {
  postId: string;
}

export default function DeletePostButton({ postId }: DeletePostButtonProps) {



  const [state, formAction, pending] = useActionState(deletePostAction, undefined);


  useEffect(() => {
    if (state?.error) {
      alert('Failed to delete post');
    }
  }, [state]);

  return (

    <form action={formAction}>
      <input type="hidden" name="postId" value={postId} />
      <button
        disabled={pending}
        className="inline-flex items-center px-3 py-1 border border-red-600 text-sm 
                font-medium rounded text-red-600 hover:bg-red-50 
                focus:outline-none focus:ring-2 focus:ring-offset-2 
                focus:ring-red-500 disabled:opacity-50"
      >
        {pending ? 'Deleting...' : 'Delete'}
      </button>
    </form>
  );
}