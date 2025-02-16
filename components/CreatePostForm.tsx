'use client';

import { useActionState, useState } from 'react';
import { createPostAction } from '../lib/actions';

export default function CreatePostForm() {

  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');

  const [state, formAction, pending] = useActionState(createPostAction, undefined)

  return (
    <form action={formAction} className="space-y-6 mb-8 bg-white rounded-lg shadow-sm border border-gray-100 p-6">
      <div className="space-y-1">
        <label
          htmlFor="title"
          className="block text-sm font-medium text-gray-700"
        >
          Title
        </label>
        <input
          type="text"
          name="title"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          minLength={3}
          maxLength={100}
          placeholder="Enter post title..."
          className="mt-1 block w-full text-black rounded-md border-gray-300 shadow-sm 
                   focus:border-blue-500 focus:ring-blue-500 
                   placeholder:text-gray-400
                   disabled:bg-gray-50 disabled:text-gray-500 disabled:border-gray-200
                   transition-colors duration-200
                   text-base"
          disabled={pending}
        />
      </div>

      <div className="space-y-1">
        <label
          htmlFor="body"
          className="block text-sm font-medium text-gray-700"
        >
          Content
        </label>
        <textarea
          name="body"
          id="body"
          value={body}
          onChange={(e) => setBody(e.target.value)}
          required
          minLength={10}
          maxLength={1000}
          placeholder="Write your post content..."
          rows={4}
          className="mt-1 block text-black w-full rounded-md border-gray-300 shadow-sm 
                   focus:border-blue-500 focus:ring-blue-500
                   placeholder:text-gray-400
                   disabled:bg-gray-50 disabled:text-gray-500 disabled:border-gray-200
                   transition-colors duration-200
                   resize-y min-h-[100px] max-h-[400px]
                   text-base"
          disabled={pending}
        />
        <p className="text-sm text-gray-500 mt-1">
          {body.length}/1000 characters
        </p>
      </div>

      {state?.error && (
        <div className="text-sm text-red-600 bg-red-50 border border-red-100 rounded-md p-3 flex items-center">
          <svg
            className="h-5 w-5 text-red-500 mr-2"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          {state.error}
        </div>
      )}

      <div className="flex items-center justify-end space-x-3">
        <button
          type="button"
          className="inline-flex items-center px-4 py-2 border border-gray-300 
                   text-sm font-medium rounded-md text-gray-700 bg-white 
                   hover:bg-gray-50 focus:outline-none focus:ring-2 
                   focus:ring-offset-2 focus:ring-blue-500
                   disabled:opacity-50 disabled:cursor-not-allowed
                   transition-colors duration-200"
          disabled={pending || (!title && !body)}
        >
          Clear
        </button>
        <button
          type="submit"
          disabled={pending || !title || !body}
          className="inline-flex items-center px-4 py-2 border border-transparent 
                   text-sm font-medium rounded-md shadow-sm text-white 
                   bg-blue-600 hover:bg-blue-700 
                   focus:outline-none focus:ring-2 focus:ring-offset-2 
                   focus:ring-blue-500 disabled:opacity-50 
                   disabled:cursor-not-allowed disabled:hover:bg-blue-600
                   transition-colors duration-200"
        >
          {pending ? (
            <>
              <svg
                className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                />
              </svg>
              Creating...
            </>
          ) : (
            'Create Post'
          )}
        </button>
      </div>
    </form>
  );
}
