# Portfolio Sanity Client

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app). It uses [Sanity](https://www.sanity.io/) as the CMS(data store)

## Tools Used

- [NextJS](https://nextjs.org/)
- [Sanity CMS](https://sanity.io/)
- [Mantine UI](https://mantine.dev/)
- [React Email](https://react.email/) + [Nodemailer](https://nodemailer.com/)
- [@tabler/icons-react](https://tabler.io/docs/icons/react)

## Getting Started

### Environment Variables

Fill up the .env file with the variables in the .env.example

The Sanity API token is used to fetch data from Sanity. Go to your sanity project api page to generate it. Grant it the `Editor` role.
This is only required if your dataset is private (it should be)

```bash
SANITY_API_TOKEN =
```

The secret sanity expects when it tries to hit the revalidate webhook. It defaults to `SECRET`

```bash
SANITY_REVALIDATE_SECRET =
```

The Sanity Dataset is the name of the dataset you want to use. Go to your sanity project datasets page to find it. It defaults to `production`

```bash
NEXT_PUBLIC_SANITY_DATASET =
```

The Sanity project id is the id linked with the sanity project. It should be on the dashboard of your sanity project.

```bash
NEXT_PUBLIC_SANITY_PROJECT_ID =
```

Sanity Api version. It defaults to `2021-10-21`

```bash
NEXT_PUBLIC_SANITY_API_VERSION =
```

Ignore at least one of the SMTP variables if you don't want the contact form to go to the user's email. Check the [Nodemailer docs](https://nodemailer.com/smtp/)

```bash
SMTP_SERVICE =
SMTP_USER =
SMTP_PASS =
```

### Project config

Go to [Project Config](./src/lib/project.config.ts) to update the app configuration.

### Setup Revalidation

The app is statically built and nextjs caches all the fetch calls so you need to setup revalidation for sanity so the app actually updates when you make a change. There is a preconfigured webhook setup [Found here](https://www.sanity.io/manage/webhooks/share?name=Revalidate&description=Revalidate+site&url=https%3A%2F%2Fv3.obifortune.com%2Fapi%2Frevalidate&on=update&on=create&on=delete&filter=&projection=%7B_id%2C+_type%7D&httpMethod=POST&apiVersion=v2021-06-01&includeDrafts=&headers=%7B%7D).

- Replace the site with URL with {SITE_URL}/api/revalidate
- Add a secret (to prevent others from revalidating it)
  - This should be the same value as the environment variable `SANITY_REVALIDATE_SECRET` which defaults to `SECRET`

## Commands

### Starting the App

Then run the development server:

```bash
pnpm run dev
```

#### Viewing the main app

Open [http://localhost:3000](http://localhost:3000) to see the result.

#### Viewing the studio

Open [http://localhost:3000/studio](http://localhost:3000/studio) to see the local studio.

### Generate the schema types

```bash
pnpm run codegen
```
