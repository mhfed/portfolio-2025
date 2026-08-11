import { cn } from '@/lib/utils'

export interface ScrollFillHeadingProps {
  className?: string
  text: string
}

export function ScrollFillHeading({
  className,
  text,
}: ScrollFillHeadingProps) {
  return (
    <h3
      className={cn('scroll-fill-heading', className)}
      data-brilio-scroll-fill
      aria-label={text}
    >
      {text.split(/(\s+)/).map((token, tokenIndex) =>
        token.trim() ? (
          <span
            className='scroll-fill-heading__word'
            key={`${token}-${tokenIndex}`}
            aria-hidden='true'
          >
            {Array.from(token).map((character, characterIndex) => (
              <span
                key={`${character}-${characterIndex}`}
                data-brilio-scroll-char
              >
                {character}
              </span>
            ))}
          </span>
        ) : (
          <span
            className='scroll-fill-heading__space'
            key={`space-${tokenIndex}`}
            aria-hidden='true'
          >
            {' '}
          </span>
        )
      )}
    </h3>
  )
}
