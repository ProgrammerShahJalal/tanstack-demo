import React, { useState } from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import axios from 'axios'

interface Post {
  id: number
  title: string
  body: string
  userId: number
}

interface User {
  id: number
  name: string
  email: string
}

const fetchPosts = async (): Promise<Post[]> => {
  const response = await axios.get('https://jsonplaceholder.typicode.com/posts')
  return response.data.slice(0, 10) // Limit to 10 posts for demo
}

const fetchUsers = async (): Promise<User[]> => {
  const response = await axios.get('https://jsonplaceholder.typicode.com/users')
  return response.data
}

const createPost = async (post: Omit<Post, 'id'>): Promise<Post> => {
  const response = await axios.post('https://jsonplaceholder.typicode.com/posts', post)
  return response.data
}

const deletePost = async (postId: number): Promise<void> => {
  await axios.delete(`https://jsonplaceholder.typicode.com/posts/${postId}`)
}

const QueryDemo: React.FC = () => {
  const [selectedUserId, setSelectedUserId] = useState<number>(1)
  const [newPostTitle, setNewPostTitle] = useState('')
  const [newPostBody, setNewPostBody] = useState('')
  const queryClient = useQueryClient()

  // Query for posts
  const postsQuery = useQuery({
    queryKey: ['posts'],
    queryFn: fetchPosts,
    staleTime: 5 * 60 * 1000, // 5 minutes
    refetchInterval: 30 * 1000, // Refetch every 30 seconds
  })

  // Query for users
  const usersQuery = useQuery({
    queryKey: ['users'],
    queryFn: fetchUsers,
    staleTime: 10 * 60 * 1000, // 10 minutes
  })

  // Mutation for creating posts
  const createPostMutation = useMutation({
    mutationFn: createPost,
    onSuccess: (newPost) => {
      // Optimistically update the cache
      queryClient.setQueryData(['posts'], (oldPosts: Post[] = []) => [newPost, ...oldPosts])
      setNewPostTitle('')
      setNewPostBody('')
    },
    onError: (error) => {
      console.error('Error creating post:', error)
    },
  })

  // Mutation for deleting posts
  const deletePostMutation = useMutation({
    mutationFn: deletePost,
    onSuccess: (_, deletedPostId) => {
      // Remove from cache
      queryClient.setQueryData(['posts'], (oldPosts: Post[] = []) => 
        oldPosts.filter(post => post.id !== deletedPostId)
      )
    },
    onError: (error) => {
      console.error('Error deleting post:', error)
    },
  })

  const handleCreatePost = (e: React.FormEvent) => {
    e.preventDefault()
    if (newPostTitle.trim() && newPostBody.trim()) {
      createPostMutation.mutate({
        title: newPostTitle,
        body: newPostBody,
        userId: selectedUserId,
      })
    }
  }

  const handleDeletePost = (postId: number) => {
    deletePostMutation.mutate(postId)
  }

  const handleRefresh = () => {
    queryClient.invalidateQueries({ queryKey: ['posts'] })
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">TanStack Query Demo</h1>
        <p className="mt-2 text-gray-600">
          Demonstrating data fetching, caching, mutations, and optimistic updates
        </p>
      </div>

      {/* Query Status Info */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white p-4 rounded-lg shadow border">
          <h3 className="font-semibold text-gray-900">Posts Query Status</h3>
          <div className="mt-2 space-y-1 text-sm">
            <div className={`px-2 py-1 rounded ${postsQuery.isLoading ? 'bg-yellow-100 text-yellow-800' : 'bg-gray-100 text-gray-600'}`}>
              Loading: {postsQuery.isLoading ? 'Yes' : 'No'}
            </div>
            <div className={`px-2 py-1 rounded ${postsQuery.isFetching ? 'bg-blue-100 text-blue-800' : 'bg-gray-100 text-gray-600'}`}>
              Fetching: {postsQuery.isFetching ? 'Yes' : 'No'}
            </div>
            <div className={`px-2 py-1 rounded ${postsQuery.isStale ? 'bg-orange-100 text-orange-800' : 'bg-green-100 text-green-800'}`}>
              Stale: {postsQuery.isStale ? 'Yes' : 'No'}
            </div>
            <div className="px-2 py-1 rounded bg-gray-100 text-gray-600">
              Last Updated: {postsQuery.dataUpdatedAt ? new Date(postsQuery.dataUpdatedAt).toLocaleTimeString() : 'Never'}
            </div>
          </div>
        </div>

        <div className="bg-white p-4 rounded-lg shadow border">
          <h3 className="font-semibold text-gray-900">Cache Actions</h3>
          <div className="mt-2 space-y-2">
            <button
              onClick={handleRefresh}
              className="w-full bg-blue-500 text-white px-3 py-1 rounded text-sm hover:bg-blue-600"
            >
              Refresh Posts
            </button>
            <button
              onClick={() => queryClient.removeQueries({ queryKey: ['posts'] })}
              className="w-full bg-red-500 text-white px-3 py-1 rounded text-sm hover:bg-red-600"
            >
              Clear Cache
            </button>
            <button
              onClick={() => queryClient.invalidateQueries({ queryKey: ['users'] })}
              className="w-full bg-green-500 text-white px-3 py-1 rounded text-sm hover:bg-green-600"
            >
              Refresh Users
            </button>
          </div>
        </div>

        <div className="bg-white p-4 rounded-lg shadow border">
          <h3 className="font-semibold text-gray-900">Mutation Status</h3>
          <div className="mt-2 space-y-1 text-sm">
            <div className={`px-2 py-1 rounded ${createPostMutation.isPending ? 'bg-yellow-100 text-yellow-800' : 'bg-gray-100 text-gray-600'}`}>
              Creating: {createPostMutation.isPending ? 'Yes' : 'No'}
            </div>
            <div className={`px-2 py-1 rounded ${deletePostMutation.isPending ? 'bg-yellow-100 text-yellow-800' : 'bg-gray-100 text-gray-600'}`}>
              Deleting: {deletePostMutation.isPending ? 'Yes' : 'No'}
            </div>
            <div className={`px-2 py-1 rounded ${createPostMutation.isError ? 'bg-red-100 text-red-800' : 'bg-gray-100 text-gray-600'}`}>
              Error: {createPostMutation.isError ? 'Yes' : 'No'}
            </div>
          </div>
        </div>
      </div>

      {/* Create New Post Form */}
      <div className="bg-white p-6 rounded-lg shadow border">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Create New Post</h2>
        <form onSubmit={handleCreatePost} className="space-y-4">
          <div>
            <label htmlFor="user-select" className="block text-sm font-medium text-gray-700">
              Author
            </label>
            <select
              id="user-select"
              value={selectedUserId}
              onChange={(e) => setSelectedUserId(Number(e.target.value))}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
            >
              {usersQuery.data?.map((user) => (
                <option key={user.id} value={user.id}>
                  {user.name} ({user.email})
                </option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="post-title" className="block text-sm font-medium text-gray-700">
              Title
            </label>
            <input
              id="post-title"
              type="text"
              value={newPostTitle}
              onChange={(e) => setNewPostTitle(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
              placeholder="Enter post title"
              required
            />
          </div>
          <div>
            <label htmlFor="post-body" className="block text-sm font-medium text-gray-700">
              Content
            </label>
            <textarea
              id="post-body"
              value={newPostBody}
              onChange={(e) => setNewPostBody(e.target.value)}
              rows={3}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
              placeholder="Enter post content"
              required
            />
          </div>
          <button
            type="submit"
            disabled={createPostMutation.isPending || !newPostTitle.trim() || !newPostBody.trim()}
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {createPostMutation.isPending ? 'Creating...' : 'Create Post'}
          </button>
        </form>
      </div>

      {/* Posts List */}
      <div className="bg-white rounded-lg shadow border">
        <div className="p-6 border-b">
          <h2 className="text-xl font-semibold text-gray-900">Posts</h2>
          <p className="text-gray-600">Automatic background refetching every 30 seconds</p>
        </div>
        
        {postsQuery.isLoading ? (
          <div className="p-6 text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mx-auto"></div>
            <p className="mt-2 text-gray-600">Loading posts...</p>
          </div>
        ) : postsQuery.isError ? (
          <div className="p-6 text-center text-red-600">
            Error loading posts: {postsQuery.error instanceof Error ? postsQuery.error.message : 'Unknown error'}
          </div>
        ) : (
          <div className="divide-y divide-gray-200">
            {postsQuery.data?.map((post) => (
              <div key={post.id} className="p-6">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <h3 className="text-lg font-medium text-gray-900 mb-2">{post.title}</h3>
                    <p className="text-gray-600 mb-2">{post.body}</p>
                    <div className="flex items-center text-sm text-gray-500">
                      <span>Post ID: {post.id}</span>
                      <span className="mx-2">•</span>
                      <span>Author ID: {post.userId}</span>
                      <span className="mx-2">•</span>
                      <span>
                        Author: {usersQuery.data?.find(user => user.id === post.userId)?.name || 'Unknown'}
                      </span>
                    </div>
                  </div>
                  <button
                    onClick={() => handleDeletePost(post.id)}
                    disabled={deletePostMutation.isPending}
                    className="ml-4 text-red-600 hover:text-red-800 disabled:opacity-50"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default QueryDemo
