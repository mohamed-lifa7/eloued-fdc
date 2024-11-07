# Nexa Starter (Next.js Template)

This Next.js template is ready for action, equipped with everything you need to build powerful web apps.

## Tech Stack

- **Next.js 14:** Next.js is a React framework that enables functionality like server-side rendering and generating static websites for React-based web applications.
- **TypeScript 5:**  Because sometimes, you just need to know what's what.
- **Zod:** Zod is a TypeScript-first schema declaration and validation library.
- **AuthJS 5:** Authentication and authorization made as easy as pie.
- **Prisma:** Prisma is a modern database toolkit for PostgreSQL, MySQL, and SQLite, providing type-safe database access.
- **Resend:** Resend is a mailing provider for sending transactional emails.
- **Tailwind CSS with Shadcn library:** Styling made simple, with an extra dash of pizzazz.
- **ESLint and Prettier:** ESLint is a pluggable linting utility for JavaScript and JSX. Prettier is an opinionated code formatter.

## Getting Started

1. Clone this repository.
2. Install dependencies using npm or yarn:
> i use `pnpm` you can use whatever you want, if you want to use `npm` for example
> just go the `package.json` and change this `"packageManager": "pnpm@8.14.1"` 
> to this `"packageManager": "npm"` and then use the command bellow with your new package manager

```bash
pnpm install
# or
npm install
# or
yarn install
 ```
3. Configure environment variables:\
Need a PostgreSQL database? You can spin one up with the start-database.sh script, or if you're feeling adventurous, create your own—I won't stop you! Just make sure to fill in those `.env` values based on `.env.example`.


4. Run the development server:
``` bash
pnpm dev
# or
npm run dev
# or
yarn dev
```
5. Open http://localhost:3000 in your browser to see the application.

## License

This project is licensed under the MIT License.

## Shoutout 📢

A big shoutout to [Create T3 App](https://create.t3.gg) for for this.