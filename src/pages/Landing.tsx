export default function Landing() {
  return (
    <section className="grid gap-10">
      <div className="grid gap-4">
        <h1 className="font-display text-3xl font-semibold tracking-tight md:text-5xl lg:text-6xl">
          Train with <span className="text-[--color-accent]">PULSE</span>
        </h1>
        <p className="max-w-2xl text-lg text-[--color-ink-2]">
          Fast, offline-capable workout tracker. Plan your programs, run focused sessions with timers, and watch your
          strength grow with local-first data.
        </p>
        <div className="flex flex-wrap gap-3">
          <a href="#/programs" className="rounded-md bg-[--color-accent] px-4 py-2 text-sm font-medium text-[--color-accent-ink] shadow-sm hover:opacity-90">
            Browse Programs
          </a>
          <a href="#/library" className="rounded-md border border-[--color-line] px-4 py-2 text-sm font-medium hover:bg-[--color-surface-2]">
            Exercise Library
          </a>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        {[
          { title: 'Local-first', desc: 'Everything stays in your browser with localStorage. No sign-in required.' },
          { title: 'Program-driven', desc: 'Follow curated strength/hypertrophy/fat-loss programs or build your own.' },
          { title: 'PWA Ready', desc: 'Installable, works offline, and updates automatically.' },
        ].map((f) => (
          <div key={f.title} className="rounded-lg border border-[--color-line] bg-[--color-surface] p-4 shadow-sm">
            <h3 className="font-medium">{f.title}</h3>
            <p className="mt-1 text-sm text-[--color-ink-2]">{f.desc}</p>
          </div>
        ))}
      </div>
    </section>
  )
}