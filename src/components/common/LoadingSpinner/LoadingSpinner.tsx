export function LoadingSpinner({ label = 'Loading...' }: { label?: string }) {
  return (
    <div className="flex flex-col items-center gap-4">
      <div className="w-12 h-12 border-2 border-black dark:border-white border-t-transparent dark:border-t-transparent rounded-full animate-spin" />
      <p className="font-mono text-xs animate-pulse uppercase tracking-widest">{label}</p>
    </div>
  );
}
