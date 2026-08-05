import { Fragment } from 'react'

export interface KineticHeadlineProps {
  text: string
}

interface HeadlinePart {
  emphasis: boolean
  text: string
}

function parseHeadline(text: string): HeadlinePart[] {
  return text.split('*').map((part, index) => ({
    emphasis: index % 2 === 1,
    text: part,
  }))
}

function renderWords(text: string, partIndex: number) {
  return text.split(/(\s+)/).map((token, tokenIndex) => {
    if (/^\s+$/.test(token)) return token

    return (
      <span
        key={`${partIndex}-${tokenIndex}-${token}`}
        className='hero-title__word'
        data-hero-word
      >
        {Array.from(token).map((character, characterIndex) => (
          <span
            key={`${character}-${characterIndex}`}
            className='hero-title__char'
            data-hero-char
          >
            {character}
          </span>
        ))}
      </span>
    )
  })
}

export function KineticHeadline({ text }: KineticHeadlineProps) {
  const parts = parseHeadline(text)
  const accessibleText = parts.map((part) => part.text).join('')

  return (
    <h1 id='hero-title' className='hero-title' aria-label={accessibleText}>
      <span aria-hidden='true'>
        {parts.map((part, partIndex) =>
          part.emphasis ? (
            <em key={`${part.text}-${partIndex}`} data-hero-emphasis>
              {renderWords(part.text, partIndex)}
            </em>
          ) : (
            <Fragment key={`${part.text}-${partIndex}`}>
              {renderWords(part.text, partIndex)}
            </Fragment>
          )
        )}
      </span>
    </h1>
  )
}
