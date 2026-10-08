'use client'

import { useActionState } from 'react'
import { CheckCircle2, Loader2 } from 'lucide-react'
import { register, type RegisterState } from '@/app/actions'

const initialState: RegisterState = { status: 'idle' }

const fieldClass =
  'w-full rounded-xl border border-input bg-background px-4 py-3 text-base outline-none transition-colors placeholder:text-muted-foreground/70 focus:border-primary focus:ring-4 focus:ring-primary/10 aria-invalid:border-destructive'

export function RegistrationForm() {
  const [state, formAction, pending] = useActionState(register, initialState)

  return (
    <section id="register" aria-labelledby="register-heading" className="mx-auto max-w-2xl px-6 pb-24 md:pb-32">
      <div className="rounded-[2rem] bg-card p-8 ring-1 ring-border md:p-12">
        <div className="text-center">
          <p className="text-xs font-medium uppercase tracking-[0.25em] text-primary">Registration</p>
          <h2 id="register-heading" className="mt-4 font-serif text-4xl font-medium md:text-5xl">
            Reserve your seat
          </h2>
          <p className="mt-3 text-pretty text-muted-foreground">
            Admission is free, but seats are limited. Tell us a little about yourself.
          </p>
        </div>

        {state.status === 'success' ? (
          <div role="status" className="mt-10 flex flex-col items-center rounded-2xl bg-accent p-8 text-center">
            <CheckCircle2 className="size-10 text-accent-foreground" aria-hidden="true" />
            <p className="mt-4 font-serif text-3xl font-medium">{`See you there, ${state.name}!`}</p>
            <p className="mt-2 text-sm text-accent-foreground">
              {"Your seat is reserved. We'll send event details to your inbox closer to the date."}
            </p>
          </div>
        ) : (
          <form action={formAction} className="mt-10 flex flex-col gap-5" noValidate>
            <div className="flex flex-col gap-2">
              <label htmlFor="name" className="text-sm font-medium">Name</label>
              <input
                id="name"
                name="name"
                type="text"
                autoComplete="name"
                required
                placeholder="Jane Doe"
                aria-invalid={Boolean(state.errors?.name)}
                aria-describedby={state.errors?.name ? 'name-error' : undefined}
                className={fieldClass}
              />
              {state.errors?.name && <p id="name-error" className="text-sm text-destructive">{state.errors.name}</p>}
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="email" className="text-sm font-medium">Email</label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                placeholder="jane@example.com"
                aria-invalid={Boolean(state.errors?.email)}
                aria-describedby={state.errors?.email ? 'email-error' : undefined}
                className={fieldClass}
              />
              {state.errors?.email && <p id="email-error" className="text-sm text-destructive">{state.errors.email}</p>}
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="message" className="text-sm font-medium">
                Message <span className="font-normal text-muted-foreground">(optional)</span>
              </label>
              <textarea
                id="message"
                name="message"
                rows={4}
                maxLength={1000}
                placeholder="What are you hoping to take away from the evening?"
                aria-invalid={Boolean(state.errors?.message)}
                aria-describedby={state.errors?.message ? 'message-error' : undefined}
                className={`${fieldClass} resize-none`}
              />
              {state.errors?.message && (
                <p id="message-error" className="text-sm text-destructive">{state.errors.message}</p>
              )}
            </div>

            <button
              type="submit"
              disabled={pending}
              className="mt-2 inline-flex h-12 items-center justify-center gap-2 rounded-full bg-primary px-8 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90 disabled:opacity-60"
            >
              {pending && <Loader2 className="size-4 animate-spin" aria-hidden="true" />}
              {pending ? 'Reserving…' : 'Complete registration'}
            </button>
          </form>
        )}
      </div>
    </section>
  )
}
