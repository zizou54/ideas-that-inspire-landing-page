import Image from 'next/image'
import { CalendarDays, Clock, MapPin } from 'lucide-react'
import { EVENT, SPEAKERS } from '@/lib/event'

const details = [
  { icon: CalendarDays, label: 'Date', value: EVENT.dateLabel, note: 'Save the date' },
  { icon: Clock, label: 'Time', value: EVENT.timeLabel, note: EVENT.doorsLabel },
  { icon: MapPin, label: 'Location', value: EVENT.venue, note: EVENT.address },
]

export function EventDetails() {
  return (
    <section id="details" aria-labelledby="details-heading" className="mx-auto max-w-5xl px-6 py-20 md:py-28">
      <div className="mx-auto max-w-2xl text-center">
        <p className="text-xs font-medium uppercase tracking-[0.25em] text-primary">The details</p>
        <h2 id="details-heading" className="mt-4 text-balance font-serif text-4xl font-medium md:text-5xl">
          An evening worth showing up for
        </h2>
        <p className="mt-4 text-pretty leading-relaxed text-muted-foreground">
          Three talks, open conversation, and a room full of curious people. Stay after for
          drinks and connection.
        </p>
      </div>

      <dl className="mt-14 grid gap-4 md:grid-cols-3">
        {details.map(({ icon: Icon, label, value, note }) => (
          <div key={label} className="flex flex-col items-center rounded-3xl bg-card p-8 text-center ring-1 ring-border">
            <span className="flex size-11 items-center justify-center rounded-full bg-secondary text-primary">
              <Icon className="size-5" aria-hidden="true" />
            </span>
            <dt className="mt-5 text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground">{label}</dt>
            <dd className="mt-2 font-serif text-2xl font-medium">{value}</dd>
            <dd className="mt-1 text-sm text-muted-foreground">{note}</dd>
          </div>
        ))}
      </dl>

      <div className="mt-24 text-center">
        <p className="text-xs font-medium uppercase tracking-[0.25em] text-primary">Speakers</p>
        <h3 className="mt-4 font-serif text-4xl font-medium md:text-5xl">Voices of the evening</h3>
      </div>

      <ul className="mt-12 grid gap-10 sm:grid-cols-2 md:grid-cols-3">
        {SPEAKERS.map((speaker) => (
          <li key={speaker.name} className="flex flex-col items-center text-center">
            <div className="relative size-40 overflow-hidden rounded-full ring-1 ring-border ring-offset-4 ring-offset-background md:size-44">
              <Image
                src={speaker.image || '/placeholder.svg'}
                alt={`Portrait of ${speaker.name}`}
                fill
                sizes="176px"
                className="object-cover"
              />
            </div>
            <p className="mt-6 font-serif text-2xl font-medium">{speaker.name}</p>
            <p className="mt-1 text-sm text-muted-foreground">{speaker.role}</p>
            <p className="mt-3 rounded-full bg-accent px-3 py-1 text-xs font-medium text-accent-foreground">
              {speaker.topic}
            </p>
          </li>
        ))}
      </ul>
    </section>
  )
}
