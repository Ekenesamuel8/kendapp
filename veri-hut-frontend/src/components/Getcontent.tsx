'use client';

import useSWR from 'swr';

type Post = {
  id: number;
  text: string;
  media: string | null;
  created_at: string;
};

// Fetch function using SWR
const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function PostsPage() {
  const { data, error, isLoading } = useSWR<Post[]>(
    'http://127.0.0.1:8000/api/posts/',
    fetcher
  );

  if (isLoading) return <p>Loading posts...</p>;
  if (error) return <p>Error loading posts!</p>;

  return (
    <main className="max-w-2xl mx-auto p-6 space-y-4">
      <h1 className="text-2xl font-semibold">Posts</h1>
      <ul className="space-y-3">
        {data!.map((p) => (
          <li key={p.id} className="border rounded p-4">
            <p className="mb-2">{p.text}</p>
            {p.media && (
              <img src={p.media} alt={`Post ${p.id}`} className="rounded" />
            )}
            <small className="opacity-70">
              {new Date(p.created_at).toLocaleString()}
            </small>
          </li>
        ))}
      </ul>
    </main>
  );
}
