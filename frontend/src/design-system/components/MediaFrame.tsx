import type { ReactNode } from 'react'

interface MediaFrameProps {
  src: string
  alt: string
  aspect?: 'video' | 'photo' | 'portrait' | 'square'
  className?: string
  imgClassName?: string
  eager?: boolean
  children?: ReactNode
}

const aspects = {
  video: 'aspect-video',
  photo: 'aspect-[4/3]',
  portrait: 'aspect-[3/4]',
  square: 'aspect-square',
}

export function MediaFrame({
  src,
  alt,
  aspect = 'photo',
  className = '',
  imgClassName = '',
  eager = false,
  children,
}: MediaFrameProps) {
  return (
    <figure className={`relative overflow-hidden bg-brand-100 ${aspects[aspect]} ${className}`}>
      <img
        src={src}
        alt={alt}
        loading={eager ? 'eager' : 'lazy'}
        decoding="async"
        className={`h-full w-full object-cover ${imgClassName}`}
      />
      {children}
    </figure>
  )
}
