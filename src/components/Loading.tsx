interface SpinnerProps {
  size?: 'sm' | 'md' | 'lg'
  className?: string
  color?: 'white' | 'brand'
}

export const Spinner = ({
  size = 'sm',
  className = '',
  color = 'white',
}: SpinnerProps) => {
  const sizeClasses = {
    sm: 'w-4 h-4 border-2',
    md: 'w-5 h-5 border-2',
    lg: 'w-8 h-8 border-4',
  }
  const colorClasses = {
    white: 'border-white/30 border-t-white',
    brand: 'border-[var(--brand-soft-300)] border-t-[var(--brand-500)]',
  }

  return (
    <div
      className={`rounded-full animate-spin inline-block shrink-0 ${sizeClasses[size]} ${colorClasses[color]} ${className}`}
    />
  )
}

const Loading = ({ className = '' }: { className?: string }) => (
  <div className={`flex items-center justify-center w-full h-full min-h-[200px] ${className}`}>
    <Spinner size="lg" color="brand" />
  </div>
)

export default Loading