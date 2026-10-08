import { EVENT } from '@/lib/event'
import { Countdown } from '@/components/countdown'

export function EventHeader() {
  return (
    <header className="relative overflow-hidden">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 -top-40 mx-auto h-[36rem] max-w-4xl rounded-full bg-secondary/70 blur-3xl"
      />
      <nav className="relative mx-auto flex max-w-5xl items-center justify-between px-6 py-6">
        <span className="font-serif text-xl italic tracking-wide">ITI</span>
        <a
          href="#register"
          className="rounded-full border border-foreground/15 px-4 py-2 text-sm font-medium transition-colors hover:bg-foreground hover:text-background"
        >
          Reserve a seat
        </a>
      </nav>

      <div className="relative mx-auto flex max-w-3xl flex-col items-center px-6 pb-20 pt-12 text-center md:pb-28 md:pt-20">
        <p className="mb-6 inline-flex items-center gap-2 rounded-full bg-card/80 px-4 py-1.5 text-xs font-medium uppercase tracking-[0.2em] text-primary ring-1 ring-border">
          <span className="size-1.5 rounded-full bg-primary" aria-hidden="true" />
          Live event · July 13
        </p>
        <h1 className="text-balance font-serif text-6xl font-medium leading-[0.95] tracking-tight md:text-8xl">
          Ideas That <span className="italic text-primary">Inspire</span>
        </h1>
        <p className="mt-6 max-w-xl text-pretty text-lg leading-relaxed text-muted-foreground md:text-xl">
          {EVENT.tagline}
        </p>

        <div className="mt-14 w-full">
          <p className="mb-5 text-xs font-medium uppercase tracking-[0.25em] text-muted-foreground">
            The doors open in
          </p>
          <Countdown target={EVENT.startsAt} />
        </div>

        <a
          href="#register"
          className="mt-12 inline-flex h-12 items-center justify-center rounded-full bg-primary px-8 text-sm font-medium text-primary-foreground shadow-sm transition-transform hover:-translate-y-0.5 focus-visible:outline-2 focus-visible:outline-offset-2"
        >
          Register for free
        </a>
      </div>
    </header>
  )
}
