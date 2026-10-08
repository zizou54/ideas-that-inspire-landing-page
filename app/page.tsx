import { EventHeader } from '@/components/event-header'
import { EventDetails } from '@/components/event-details'
import { RegistrationForm } from '@/components/registration-form'
import { SiteFooter } from '@/components/site-footer'

export default function Page() {
  return (
    <>
      <EventHeader />
      <main>
        <EventDetails />
        <RegistrationForm />
      </main>
      <SiteFooter />
    </>
  )
}
