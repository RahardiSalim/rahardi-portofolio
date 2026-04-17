import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center container-custom text-center">
      <p className="text-sm font-mono uppercase tracking-widest text-gray-500 dark:text-gray-400 mb-4">
        404
      </p>
      <h1 className="text-6xl md:text-8xl font-black dark:text-white tracking-tighter uppercase mb-6">
        Not Found
      </h1>
      <p className="text-lg text-gray-600 dark:text-gray-400 mb-10">
        The page you&apos;re looking for doesn&apos;t exist.
      </p>
      <Link
        href="/"
        className="inline-block bg-black dark:bg-white text-white dark:text-black px-10 py-4 text-sm font-mono uppercase tracking-widest hover:bg-gray-800 dark:hover:bg-gray-200 transition-all"
      >
        Go Home
      </Link>
    </div>
  );
}
