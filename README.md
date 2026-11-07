# sorokit-docs

[![CI](https://github.com/sorokit-dev/sorokit-docs/actions/workflows/ci.yml/badge.svg)](https://github.com/sorokit-dev/sorokit-docs/actions/workflows/ci.yml)
[![License: MIT](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)

Documentation for the Sorokit SDK: [`@sorokit/core`](https://github.com/sorokit-dev/sorokit-core) (TypeScript engine and React hooks for Stellar Soroban) and [`@sorokit/ui`](https://github.com/sorokit-dev/sorokit-ui) (accessible Tailwind components for Stellar dApps).

> **Status: early.** The site is built with Vite, React and TypeScript, and the pages below are written. It is not deployed to a public URL yet. Interactive examples and an example dApp are still on the roadmap.

## What is documented

- **Getting started** — install, a complete first dApp, and the supported networks
- **Guides** — connecting a wallet, calling a contract, and setting up `@sorokit/ui` with toasts and theming
- **API reference** — `useWallet`, `useContract`, `useSorobanCall`, wallet adapters and shared types
- **Status and limitations** — what works today and what does not

## Run the site locally

Requirements: Node.js 20 or newer.

```bash
npm install
npm run dev        # start the dev server
npm run typecheck  # TypeScript, no emit
npm run build      # production build into dist/
```

To host under a sub-path (for example a GitHub Pages project site), set `BASE_PATH` when building:

```bash
BASE_PATH=/sorokit-docs/ npm run build
```

## How the site works

Pages are Markdown files in [`content/`](content). A page appears in the site when it is registered in [`src/pages.ts`](src/pages.ts), which sets its title and sidebar section. Pages are addressed by hash (`#/guides/connect-a-wallet`), so the built site works on any static host. A page that is registered without a matching file fails the build.

## Roadmap

- Deploy the site to a public URL
- Interactive, in-browser examples
- A reference example dApp running against Testnet
- Documentation for the remaining `@sorokit/ui` components as they stabilize

## Contributing

Contributions are welcome. Read [CONTRIBUTING.md](CONTRIBUTING.md) first. Issues that are part of the Stellar Wave Program carry the `Stellar Wave` label and a complexity rating; apply to them through the Drips Wave app and wait to be assigned before starting.

Please report security issues privately, as described in [SECURITY.md](SECURITY.md).

## Independence

`sorokit-docs` is maintained by the [sorokit-dev](https://github.com/sorokit-dev) organization. It is an independent project and is not affiliated with the separate `Sorokit` GitHub organization.

## License

[MIT](LICENSE)
