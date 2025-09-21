interface PrimaryButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement>{
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'danger';
  className?: string;
}

const PrimaryButton = ({ children, variant = 'primary', className = '', ...props }: PrimaryButtonProps) => {

  const variantClasses = {
    primary: 'bg-primary hover:bg-secondary text-background',
    secondary: 'text-primary bg-zinc-50 border border-border1 hover:bg-zinc-100',
    danger: 'text-red-600 bg-red-100 border border-red-300 hover:bg-red-200',
  }

  const styleClasses = `rounded-xl border transition-colors flex items-center justify-center cursor-pointer gap-2 font-medium text-sm sm:text-base h-10 sm:h-12 px-4 py-2 sm:px-5 ${className} ${variantClasses[variant]}`

  return (
    <button className={styleClasses} {...props}>{children}</button>
  )
}

export default PrimaryButton
