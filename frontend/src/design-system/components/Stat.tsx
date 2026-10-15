interface StatProps {
  value: string
  label: string
}

export function Stat({ value, label }: StatProps) {
  return (
    <div className="text-center">
      <p className="font-display text-4xl md:text-5xl text-accent-400">{value}</p>
      <p className="mt-2 text-sm uppercase tracking-[0.15em] text-brand-200">{label}</p>
    </div>
  )
}
