import { clsx } from 'clsx'

/**
 * Player avatar with initials fallback, hex clip-path, online dot, and level badge
 */
const sizeMap = {
  sm: { container: 'w-8 h-8', text: 'text-xs', dot: 'w-2 h-2', badge: 'text-[8px] px-1' },
  md: { container: 'w-10 h-10', text: 'text-sm', dot: 'w-2.5 h-2.5', badge: 'text-[9px] px-1.5' },
  lg: { container: 'w-14 h-14', text: 'text-base', dot: 'w-3 h-3', badge: 'text-[10px] px-2' },
  xl: { container: 'w-20 h-20', text: 'text-xl', dot: 'w-3.5 h-3.5', badge: 'text-xs px-2' },
}

function getInitials(username = '') {
  return username
    .split(/[\s_-]/)
    .slice(0, 2)
    .map((w) => w[0]?.toUpperCase() ?? '')
    .join('')
}

export default function Avatar({
  username = 'Player',
  size = 'md',
  online = false,
  level,
  src,
  className,
}) {
  const s = sizeMap[size] ?? sizeMap.md
  const initials = getInitials(username)

  return (
    <div
      className={clsx('relative inline-flex flex-shrink-0', className)}
      aria-label={`${username}${online ? ', online' : ', offline'}${level ? `, level ${level}` : ''}`}
    >
      {/* Avatar body */}
      <div
        className={clsx(
          s.container,
          'clip-hex flex items-center justify-center overflow-hidden',
          !src && 'bg-gradient-to-br from-bz-red/80 to-[#8b0000]'
        )}
      >
        {src ? (
          <img
            src={src}
            alt={username}
            className="w-full h-full object-cover"
            draggable={false}
          />
        ) : (
          <span
            className={clsx(
              s.text,
              'font-display font-bold text-bz-white tracking-wider select-none'
            )}
            aria-hidden="true"
          >
            {initials}
          </span>
        )}
      </div>

      {/* Online status dot */}
      {online !== undefined && (
        <span
          className={clsx(
            s.dot,
            'absolute bottom-0.5 right-0.5 rounded-full border-2 border-bz-black',
            online ? 'bg-bz-green' : 'bg-bz-gray'
          )}
          aria-hidden="true"
        />
      )}

      {/* Level badge */}
      {level !== undefined && (
        <span
          className={clsx(
            s.badge,
            'absolute -bottom-1 left-1/2 -translate-x-1/2',
            'bg-bz-red text-bz-white font-mono font-bold rounded-sm leading-4',
            'border border-bz-red/50 shadow-red-glow-sm'
          )}
          aria-hidden="true"
        >
          {level}
        </span>
      )}
    </div>
  )
}
