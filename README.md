# Portfolio Sanity Client

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

You should setup the portfolio sanity studio first. Find it at https://github.com/ickynavigator/portfolio-sanity-studio

## Getting Started

### Environment Variables

Fill up the .env file with the variables in the .env.example

The Sanity API token is used to fetch data from Sanity. Go to your sanity project api page to generate it. Grant it the `Editor` role.

```bash
SANITY_API_TOKEN =
```

The Sanity Dataset is the name of the dataset you want to use. Go to your sanity project datasets page to find it. It is probably production but you can confirm by going to the URL above.

```bash
NEXT_PUBLIC_SANITY_DATASET =
```

The Sanity project id is the id linked with the sanity project. It should be on the dashboard of your sanity project.

```bash
NEXT_PUBLIC_SANITY_PROJECT_ID =
```

This is the ID of the profile you want to use for the site. You can find this by going to your Sanity Studio and running this query in the GROQ console: \*[_type == "personalInfo"]{ \_id }

```bash
NEXT_PUBLIC_PROFILE_ID =
```

Ignore at least one of the SMTP variables if you don't want the contact form to go to the user's email

```bash
SMTP_SERVICE =
SMTP_USER =
SMTP_PASS =
```

### Starting the App

Then run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.
