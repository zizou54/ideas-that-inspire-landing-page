'use server'

export type RegisterState = {
  status: 'idle' | 'success' | 'error'
  message?: string
  errors?: Partial<Record<'name' | 'email' | 'message', string>>
  name?: string
}

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export async function register(_prev: RegisterState, formData: FormData): Promise<RegisterState> {
  const name = String(formData.get('name') ?? '').trim()
  const email = String(formData.get('email') ?? '').trim()
  const message = String(formData.get('message') ?? '').trim()

  const errors: RegisterState['errors'] = {}
  if (name.length < 2 || name.length > 100) errors.name = 'Please enter your full name.'
  if (!EMAIL_PATTERN.test(email) || email.length > 254) errors.email = 'Please enter a valid email address.'
  if (message.length > 1000) errors.message = 'Please keep your message under 1000 characters.'

  if (Object.keys(errors).length > 0) {
    return { status: 'error', errors, message: 'Please fix the highlighted fields.' }
  }

  return { status: 'success', name: name.split(' ')[0] }
}
