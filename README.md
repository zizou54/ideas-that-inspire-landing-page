# Ideas That Inspire — Event Landing Page

A one-page landing site for **Ideas That Inspire**, an evening of talks on **Tuesday, July 13, 2027** at The Lumen Hall in San Francisco.

The page has a hero section with a live countdown, the event details, the speakers, a registration form, and a footer with social links.

## Tech stack

- [Next.js 16](https://nextjs.org) (App Router, Server Actions)
- [React 19](https://react.dev)
- [TypeScript](https://www.typescriptlang.org)
- [Tailwind CSS 4](https://tailwindcss.com) with [shadcn/ui](https://ui.shadcn.com) theme tokens
- [lucide-react](https://lucide.dev) icons
- Google Fonts via `next/font`: **Inter** (body) and **Cormorant Garamond** (headings)
- [Vercel Analytics](https://vercel.com/analytics) (production only)

## Getting started

### Requirements

- **Node.js** 20 or newer
- **pnpm**. The project pins `pnpm@12.3.4` in `package.json`. If you don't have pnpm, install it once:

  ```bash
  npm install -g pnpm@12.3.4
  ```

### Install and run

```bash
git clone https://github.com/zizou54/ideas-that-inspire-landing-page.git
cd ideas-that-inspire-landing-page
pnpm install
pnpm dev
```

Open <http://localhost:3000>. The page reloads automatically when you edit a file.

### Scripts

| Command      | What it does                                    |
| ------------ | ----------------------------------------------- |
| `pnpm dev`   | Start the development server on port 3000       |
| `pnpm build` | Create an optimized production build in `.next/` |
| `pnpm start` | Serve the production build (run `build` first)  |

## Project structure

```
ideas-that-inspire-landing-page/
├── app/
│   ├── layout.tsx            # Root layout: fonts, page metadata, favicons, analytics
│   ├── page.tsx              # The page: Header → Details → Registration → Footer
│   ├── actions.ts            # Server action `register` that validates the form
│   └── globals.css           # Tailwind imports and the color/radius theme
├── components/
│   ├── event-header.tsx      # Nav bar, hero title, tagline, countdown, CTA
│   ├── countdown.tsx         # Client component that ticks every second
│   ├── event-details.tsx     # Date/time/location cards and the speaker grid
│   ├── registration-form.tsx # Form with inline errors, loading and success states
│   ├── site-footer.tsx       # Event name, date, social links, copyright
│   └── ui/button.tsx         # shadcn Button component
├── lib/
│   ├── event.ts              # Event info (EVENT) and speaker list (SPEAKERS)
│   └── utils.ts              # cn() helper for merging Tailwind classes
├── public/
│   ├── speakers/             # Speaker portraits
│   └── icon*.png, icon.svg   # Favicons and Apple touch icon
├── components.json           # shadcn/ui configuration
├── next.config.mjs           # Next.js configuration
├── postcss.config.mjs        # Tailwind PostCSS plugin
└── tsconfig.json             # TypeScript config (`@/*` → project root)
```

## Customizing the content

### Event info and speakers

Most of the content lives in [`lib/event.ts`](lib/event.ts):

```ts
export const EVENT = {
  title: 'Ideas That Inspire',
  tagline: 'Small sparks. Big change. One unforgettable evening.',
  startsAt: '2027-07-13T18:00:00-07:00', // The countdown counts down to this time
  dateLabel: 'Tuesday, July 13, 2027',
  timeLabel: '6:00 PM – 9:30 PM PT',
  doorsLabel: 'Doors open at 5:30 PM',
  venue: 'The Lumen Hall',
  address: '480 Harbor Street, San Francisco, CA',
}
```

- `startsAt` must be an ISO 8601 date with a time-zone offset. The countdown uses it, and when it reaches zero it shows "We're live — welcome!"
- To add, remove or change a speaker, edit the `SPEAKERS` array. Put the portrait in `public/speakers/` and set `image` to its path, such as `/speakers/name.png`. If `image` is empty, a placeholder is shown.

### Text that is not in `lib/event.ts`

If you change the date, city or name of the event, also update these places:

| What                                           | File                                                     |
| ---------------------------------------------- | -------------------------------------------------------- |
| Browser tab title and search description       | [`app/layout.tsx`](app/layout.tsx) (`metadata`)          |
| "Live event · July 13" badge and "ITI" logo    | [`components/event-header.tsx`](components/event-header.tsx) |
| Section headings and intro text                | [`components/event-details.tsx`](components/event-details.tsx) |
| "San Francisco", copyright year, social links  | [`components/site-footer.tsx`](components/site-footer.tsx) |
| Registration heading and success message       | [`components/registration-form.tsx`](components/registration-form.tsx) |

The social links in the footer currently point to the Instagram, X, LinkedIn and YouTube home pages. Replace each `href` with your real profile URL.

### Colors and fonts

- The colors are CSS variables (`--background`, `--primary`, `--accent`, and so on) in the `:root` block of [`app/globals.css`](app/globals.css). Changing them re-themes the whole page.
- The fonts are loaded in [`app/layout.tsx`](app/layout.tsx). Swap `Inter` or `Cormorant_Garamond` for any other `next/font/google` font.

## Registration form

The form submits to the `register` server action in [`app/actions.ts`](app/actions.ts). It checks that:

- **Name** is 2–100 characters
- **Email** is a valid address of at most 254 characters
- **Message** (optional) is at most 1000 characters

If a check fails, the error appears under that field. If all checks pass, the form is replaced by a "See you there, *first name*!" message.

> **Note:** Registrations are not saved anywhere yet. The action only validates the input and returns a success message. To collect real sign-ups, add storage or email sending inside `register()` before the `return { status: 'success' … }` line. Examples: a database (Vercel Postgres, Supabase), a Google Sheet, or an email service such as Resend. Keep API keys in a `.env.local` file; it is already in `.gitignore`.

## Configuration notes

[`next.config.mjs`](next.config.mjs) has two settings worth knowing about:

- `typescript.ignoreBuildErrors: true`: `pnpm build` succeeds even when there are TypeScript errors. Remove it if you want type errors to fail the build.
- `images.unoptimized: true`: images are served as-is without Next.js image optimization.

## Deployment

The easiest way to deploy is [Vercel](https://vercel.com):

1. Go to <https://vercel.com/new> and import this GitHub repository.
2. Keep the default settings. Vercel detects Next.js and pnpm automatically.
3. Click **Deploy**. Every push to `main` then redeploys the site.

Vercel Analytics starts collecting page views automatically in production. Enable it in the project's **Analytics** tab on Vercel.

To host it somewhere else, run `pnpm build` followed by `pnpm start` on any server with Node.js 20 or newer.
