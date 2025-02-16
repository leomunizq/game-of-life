import { cn } from '@/lib/cn'

export function Button({
  onClick,
  children
}: {
  onClick: () => void
  children: React.ReactNode
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        'text-blaze-orange-950 transition ease-in bg-blaze-orange-200 focus:ring-2  focus:ring-slate-400 font-medium rounded-lg text-sm text-center inline-flex items-center  h-10 px-4 py-2',
        'hover:bg-blaze-orange-300 active:bg-blaze-orange-400 disabled:bg-blaze-orange-950 disabled:cursor-not-allowed disabled:text-blaze-orange-500'
      )}
    >
      {children}
    </button>
  )
}
