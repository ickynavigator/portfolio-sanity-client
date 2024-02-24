# Portfolio Sanity Client

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app). It uses [Sanity](https://www.sanity.io/) as the CMS(data store)

## Tools Used

- [NextJS](https://nextjs.org/)
- [Sanity CMS](https://sanity.io/)
- [Mantine UI](https://mantine.dev/)
- [React Email](https://react.email/) + [Nodemailer](https://nodemailer.com/)
- [@tabler/icons-react](https://tabler.io/docs/icons/react)

## Getting Started

### Setting up the sanity project

You need to create a sanity project to work with this portfolio. This can be done by running this in the root of the app

```bash
npm -y create sanity@latest
```

This will prompt you to do a few things

1. Setup your sanity account or Login if you already have one
1. Create a new project
   -  You can use the default dataset config(make sure to add the new dataset name in the environment variables if you decide to use a custom one)
1. Don't add configuration files (this has already been done for you)
1. Select  `clean project with no predefined schemas`
   - You can delete the newly created sanity changes
1. Go to the [sanity dashboard](https://www.sanity.io/manage) and select your project to view your project ID and other details


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

Go to the studio at `/studio` to setup the project configuration.

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


<details>
  <summary>Migration Scripts</summary>
  
  ### Project Image to Project Images
  The project type originally used a single image object instead of an array of images (silly right?). I created a small script to convert the image from a single item to an array containing that item. The image type has already been deprecated, hidden and marked as readonly.
  [script here](sanity/migrations/image/single-to-carousel.ts)
  ```bash
  bun sanity/migrations/image/single-to-carousel.ts
  ```
</details>