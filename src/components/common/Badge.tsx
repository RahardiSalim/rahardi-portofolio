interface BadgeProps {
  children: React.ReactNode;
  variant?: 'default' | 'outline';
}

export function Badge({ children, variant = 'default' }: BadgeProps) {
  const baseStyles = 'inline-block px-3 py-1 text-xs uppercase tracking-widest font-mono';
  const variantStyles = variant === 'outline'
    ? 'border border-black dark:border-white dark:text-white'
    : 'bg-black text-white dark:bg-white dark:text-black';

  return (
    <span className={`${baseStyles} ${variantStyles}`}>
      {children}
    </span>
  );
}
