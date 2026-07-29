import cn from 'classnames';

interface ButtonProps {
  href: string;
  text: string;
  size?: 'small' | 'medium' | 'large';
  variant?: 'light' | 'dark';
  className?: string;
  onClick?: () => void;
}

export const Button = ({ href, text, size = 'medium', variant = 'light', className, onClick }: ButtonProps) => {
  const sizeClasses = cn({
    'py-1 px-4 text-sm': size === 'small',
    'py-2 px-4 text-sm md:py-3 md:px-6 md:text-base lg:py-4 lg:px-8 lg:text-lg': size === 'medium',
    'py-3 px-8 text-lg': size === 'large',
  });

  const variantClasses = cn({
    'bg-indigo-950 text-stone-200 hover:bg-violet-900 hover:text-stone-200': variant === 'dark',
    'bg-stone-200 text-indigo-950 hover:bg-violet-900 hover:text-stone-200': variant === 'light',
  });

  return (
    <a
      href={href}
      onClick={onClick}
      className={cn(
        'rounded-full font-bold inline-block transition-colors duration-300',
        sizeClasses,
        variantClasses,
        className
      )}
      target="_blank"
      rel="noreferrer noopener"
    >
      {text}
    </a>
  );
};