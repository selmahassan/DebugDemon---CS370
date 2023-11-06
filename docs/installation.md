# Project Installation

## How to see the public project

Visit the [Swoopermarket website](https://debug-demon-cs-370-swoopermarket.vercel.app/) to see the published project.

## How to run the project locally

**NOTE: Running the project locally requires access to the debug-demon-cs-370 Vercel Project. Please email selmahassan at selma.hassan@emory.edu for access.**

1. Clone [Repo](https://github.com/selmahassan/DebugDemon---CS370) using command `git clone [HTTPS/SSH]`
2. Install [Node.js](https://nodejs.org/en)
3. cd into the `swoopermarket-v2`` directory
4. Install project dependencies with the command `npm install`
5. Access to Vercel Postgres is required to run the website. Follow the (Quickstart docs)[https://vercel.com/docs/storage/vercel-postgres/quickstart] or see below in the **Vercel Postgres Quickstart** section.
6. Run `npm run dev` to start a local server and follow the prompts to view the code running in a browser at url `http://localhost:3000`

## Vercel Postgres Quickstart

To follow this quickstart, you will need access to the existing **debug-demon-cs-370** Vercel Project.

1. Download the Vercel Postgres package: `npm i @vercel/postgres`
2. Download the latest version of Vercel CLI: `npm i -g vercel@latest`
   1. If this command doesn't work, try: `sudo npm i -g vercel@latest`
3. Run `vercel link` and follow the prompts to link the local project with the **debug-demon-cs-370** Vercel Project.
   1. Set up “~/DebugDemon---CS370/swoopermarket-v2”? [Y/n] y
   2. Which scope should contain your project? Debug Demon
   3. Link to existing project? [y/N] y
   4. What’s the name of your existing project? debug-demon-cs-370
   5. ✅ Linked to swoopermarket/debug-demon-cs-370 (created .vercel)
4. Pull credentials into your local environment to access your Postgres database: `vercel env pull .env.development.local`
5. Run `vercel pull` and `vercel env pull .env.development.local` to download project settings.
