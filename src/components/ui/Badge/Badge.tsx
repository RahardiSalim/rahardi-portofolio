interface BadgeProps {
  children: React.ReactNode;
  variant?: 'default' | 'outline';
  className?: string;
}

export function Badge({ children, variant = 'default', className = '' }: BadgeProps) {
  const base = 'inline-block px-3 py-1 text-xs uppercase tracking-widest font-mono';
  const variants = {
    default: 'bg-black text-white dark:bg-white dark:text-black',
    outline: 'border border-black dark:border-white dark:text-white',
  };
  return (
    <span className={`${base} ${variants[variant]} ${className}`}>
      {children}
    </span>
  );
}
