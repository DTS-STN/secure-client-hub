# Secure Client Hub

Secure Client Hub for Service Canada users accessing benefit details in a unified and consistent experience.

This application is not released yet.

## Technologies Implemented

This project uses

- [Next.js](https://nextjs.org/) ![Next JS Version](https://img.shields.io/github/package-json/dependency-version/DTS-STN/secure-client-hub/next)
- [Tailwind CSS](https://tailwindcss.com/) ![Tailwind CSS Version](https://img.shields.io/github/package-json/dependency-version/DTS-STN/secure-client-hub/dev/tailwindcss)
- [Jest](https://jestjs.io/) for unit testing ![Jest Version (dev dependancy)](https://img.shields.io/github/package-json/dependency-version/DTS-STN/secure-client-hub/dev/jest)
- [Cypress](https://www.cypress.io/) for end-to-end testing. ![Cypress Version (dev dependancy)](https://img.shields.io/github/package-json/dependency-version/DTS-STN/secure-client-hub/dev/cypress)

## Test reports for Main 👩‍🔬 🧪

[![End-to-end workflow status](https://img.shields.io/github/workflow/status/DTS-STN/secure-client-hub/E2E%20Test?label=E2E)](https://dts-stn.github.io/secure-client-hub/main/coverage/e2e-report)
[![Unit test workflow status](https://img.shields.io/github/workflow/status/DTS-STN/secure-client-hub/Lint%20and%20Test?label=Lint%20and%20Unit)](https://dts-stn.github.io/secure-client-hub/main/coverage/lcov-report)

![Line Coverage Badge](https://img.shields.io/badge/dynamic/json?label=Line%20Coverage&query=%24.total.lines.pct&suffix=%25&url=https%3A%2F%2Fdts-stn.github.io%2Fsecure-client-hub%2Frefs%2Fheads%2Fmain%2Fcoverage%2Fcoverage-summary.json)
![Statements Coverage Badge](https://img.shields.io/badge/dynamic/json?label=Statement%20Coverage&query=%24.total.statements.pct&suffix=%25&url=https%3A%2F%2Fdts-stn.github.io%2Fsecure-client-hub%2Frefs%2Fheads%2Fmain%2Fcoverage%2Fcoverage-summary.json)
![Function Coverage Badge](https://img.shields.io/badge/dynamic/json?label=Function%20Coverage&query=%24.total.functions.pct&suffix=%25&url=https%3A%2F%2Fdts-stn.github.io%2Fsecure-client-hub%2Frefs%2Fheads%2Fmain%2Fcoverage%2Fcoverage-summary.json)
![Branch Coverage Badge](https://img.shields.io/badge/dynamic/json?label=Branch%20Coverage&query=%24.total.branches.pct&suffix=%25&url=https%3A%2F%2Fdts-stn.github.io%2Fsecure-client-hub%2Frefs%2Fheads%2Fmain%2Fcoverage%2Fcoverage-summary.json)

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## PR Procedures/Definition of done

Have at least one person reviewing each PR before it can be merged.
Each branch should be prefixed with the ID of the relevant ADO task (eg. "379-update-readme").

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Licence

Unless otherwise noted, the source code of this project is covered under Crown Copyright, Government of Canada, and is distributed under the [MIT Licence](LICENSE).

The Canada wordmark and related graphics associated with this distribution are protected under trademark law and copyright law.
No permission is granted to use them outside the parameters of the Government of Canada's corporate identity program.
For more information, see Federal identity requirements.
