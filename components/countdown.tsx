'use client'

import { useEffect, useState } from 'react'

function getRemaining(target: number) {
  const diff = Math.max(0, target - Date.now())
  return {
    days: Math.floor(diff / 86_400_000),
    hours: Math.floor((diff / 3_600_000) % 24),
    minutes: Math.floor((diff / 60_000) % 60),
    seconds: Math.floor((diff / 1000) % 60),
    done: diff === 0,
  }
}

export function Countdown({ target }: { target: string }) {
  const targetMs = new Date(target).getTime()
  const [remaining, setRemaining] = useState<ReturnType<typeof getRemaining> | null>(null)

  useEffect(() => {
    setRemaining(getRemaining(targetMs))
    const id = setInterval(() => setRemaining(getRemaining(targetMs)), 1000)
    return () => clearInterval(id)
  }, [targetMs])

  if (remaining?.done) {
    return <p className="font-serif text-3xl italic text-primary">{"We're live — welcome!"}</p>
  }

  const units = [
    { label: 'Days', value: remaining?.days },
    { label: 'Hours', value: remaining?.hours },
    { label: 'Minutes', value: remaining?.minutes },
    { label: 'Seconds', value: remaining?.seconds },
  ]

  return (
    <div role="timer" aria-label="Time remaining until the event" className="mx-auto grid max-w-xl grid-cols-4 gap-3 md:gap-4">
      {units.map((unit) => (
        <div
          key={unit.label}
          className="flex flex-col items-center rounded-2xl bg-card/80 px-2 py-5 shadow-[0_1px_2px_rgba(0,0,0,0.03)] ring-1 ring-border backdrop-blur md:py-6"
        >
          <span className="font-serif text-4xl font-medium tabular-nums md:text-5xl">
            {unit.value === undefined ? '--' : String(unit.value).padStart(2, '0')}
          </span>
          <span className="mt-1 text-[0.65rem] font-medium uppercase tracking-[0.2em] text-muted-foreground md:text-xs">
            {unit.label}
          </span>
        </div>
      ))}
    </div>
  )
}
