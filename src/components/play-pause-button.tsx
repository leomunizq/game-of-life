import { cn } from '@/lib/cn'

export function PlayPauseButton({
  onClick,
  isRunning
}: {
  onClick: () => void
  isRunning: boolean
}) {
  return (
    <button
      aria-label={isRunning ? 'Stop' : 'Start'}
      aria-pressed={isRunning}
      className={cn(
        ' focus:ring-2 focus:outline-none focus:ring-slate-400 rounded-lg transition ease-in  p-2   text-blaze-orange-950',
        isRunning
          ? 'bg-blaze-orange-950 hover:bg-blaze-orange-300'
          : 'bg-blaze-orange-500 hover:bg-blaze-orange-300'
      )}
      onClick={onClick}
    >
      {isRunning ? (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="#ff850a"
          stroke="none"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
          focusable="false"
          className="lucide lucide-pause"
        >
          <title>Stop</title>
          <rect x="14" y="4" width="4" height="16" rx="1" />
          <rect x="6" y="4" width="4" height="16" rx="1" />
        </svg>
      ) : (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="white"
          stroke="none"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
          focusable="false"
          className="lucide lucide-play"
        >
          <title>Start</title>
          <polygon points="6 3 20 12 6 21 6 3" />
        </svg>
      )}
    </button>
  )
}
