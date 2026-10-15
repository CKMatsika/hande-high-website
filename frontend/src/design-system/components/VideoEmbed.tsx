interface VideoEmbedProps {
  url: string
  title?: string
  className?: string
}

function youtubeId(url: string): string | null {
  const patterns = [
    /youtu\.be\/([\w-]{11})/,
    /youtube\.com\/watch\?[^#]*v=([\w-]{11})/,
    /youtube\.com\/embed\/([\w-]{11})/,
    /youtube\.com\/shorts\/([\w-]{11})/,
    /youtube\.com\/live\/([\w-]{11})/,
  ]
  for (const pattern of patterns) {
    const match = url.match(pattern)
    if (match) return match[1]
  }
  return null
}

function vimeoId(url: string): string | null {
  const match = url.match(/vimeo\.com\/(?:video\/)?(\d+)/)
  return match ? match[1] : null
}

/**
 * Renders a responsive 16:9 video. Accepts a YouTube or Vimeo link (embedded via
 * privacy-friendly players) or a direct video file URL (mp4/webm/ogg) for a
 * native HTML5 player.
 */
export function VideoEmbed({ url, title = 'School video', className = '' }: VideoEmbedProps) {
  const youtube = youtubeId(url)
  const vimeo = vimeoId(url)
  const embedSrc = youtube
    ? `https://www.youtube-nocookie.com/embed/${youtube}`
    : vimeo
      ? `https://player.vimeo.com/video/${vimeo}`
      : null

  return (
    <div className={`relative aspect-video overflow-hidden bg-brand-950 ${className}`}>
      {embedSrc ? (
        <iframe
          src={embedSrc}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          loading="lazy"
          className="absolute inset-0 h-full w-full"
        />
      ) : (
        <video controls preload="metadata" className="absolute inset-0 h-full w-full" title={title}>
          <source src={url} />
          Your browser does not support the video tag.
        </video>
      )}
    </div>
  )
}
