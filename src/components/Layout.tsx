import { Link } from 'react-router-dom'

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-[--color-bg] text-[--color-ink]">
      <header className="border-b border-[--color-line]">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
          <Link to="/" className="font-display text-lg font-semibold tracking-tight">
            <span className="inline-flex items-center gap-1">
              <span className="inline-block h-2 w-2 rounded-full bg-[--color-accent]" />
              PULSE
            </span>
          </Link>
          <nav className="flex items-center gap-4 text-sm text-[--color-ink-2]">
            <Link to="/programs" className="hover:text-[--color-ink]">Programs</Link>
            <Link to="/library" className="hover:text-[--color-ink]">Library</Link>
            <Link to="/dashboard" className="hover:text-[--color-ink]">Dashboard</Link>
            <Link to="/progress" className="hover:text-[--color-ink]">Progress</Link>
            <Link to="/settings" className="hover:text-[--color-ink]">Settings</Link>
          </nav>
        </div>
      </header>
      <main className="mx-auto max-w-6xl px-4 py-6">{children}</main>
      <footer className="border-t border-[--color-line] py-6 text-center text-xs text-[--color-ink-3]">
        © {new Date().getFullYear()} PULSE
      </footer>
    </div>
  )
}