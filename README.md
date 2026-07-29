This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `src/app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load Nunito Sans.

## Design tokens

All ShipNow design tokens live in `src/tokens/tokens.ts`, which is the single source of truth. Tailwind CSS v4 utilities are exposed through the mirrored `@theme` declarations in `src/app/globals.css`; update the token source first whenever a design value changes.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
# Design assumptions

- Create New Shipment shipping-method options were not included in the supplied frame transcription. The select uses Standard, Express, and Priority while preserving the specified empty “Select Method” error state.
- The Shipments table displays the Figma copy “of 1,240 results” while using 192 generated mock records to produce 16 pages at the default page size of 12.
- The Shipments grid displays the Figma copy “of 520 results” while sharing the same 192-record mock dataset and 16-page default pagination.
