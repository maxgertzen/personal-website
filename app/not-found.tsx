import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-4 font-body">
      <h1 className="text-6xl font-display">404</h1>
      <p className="text-lg">Page not found.</p>
      <Link
        href="/"
        className="mt-4 text-blue-500 underline hover:text-blue-700"
      >
        Back to home
      </Link>
    </div>
  );
}
