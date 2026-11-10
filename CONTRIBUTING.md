# Contributing to sorokit-docs

This repository holds the documentation site for [`@sorokit/core`](https://github.com/sorokit-dev/sorokit-core) and [`@sorokit/ui`](https://github.com/sorokit-dev/sorokit-ui). Good documentation is how most developers will first meet the project, so careful contributions here matter.

## Development setup

Requirements: Node.js 20 or newer and npm.

```bash
git clone https://github.com/sorokit-dev/sorokit-docs.git
cd sorokit-docs
npm install
npm run dev
```

Before opening a pull request, make sure both of these pass (CI runs the same steps):

```bash
npm run typecheck
npm run build
```

## How pages work

Pages are Markdown files in `content/`. To add one:

1. Create `content/<section>/<name>.md`.
2. Register it in `src/pages.ts` with a slug (the path without `.md`), a title and a sidebar section.
3. Link to other pages with `[text](#/slug)`. The build fails if a registered page has no file.

## Ways to contribute

- Write or improve guides (installation, quick start, connecting a wallet, calling a contract)
- Document the API of every exported hook and component
- Improve the documentation site and add interactive examples
- Fix typos, broken links and unclear wording

## Stellar Wave issues

If you want to work on a `Stellar Wave` issue, **apply through the [Drips Wave app](https://www.drips.network/wave)** and wait to be assigned. Please do not start work, or open a pull request, on a Wave issue that is assigned to someone else. Reference the issue in your pull request description with `Closes #<number>`.

Read the [Drips Wave terms](https://docs.drips.network/wave/terms-and-rules) before applying. In particular, low-effort submissions (for example trivial typo-only changes made to collect points) and untested or not-understood AI-generated content are not acceptable here or in the program.

## Writing guidelines

- Every code sample must be run against the current versions of `@sorokit/core` and `@sorokit/ui` before you submit it. Do not guess at API shapes; read the source.
- Prefer short, task-oriented pages with a working example over long explanations.
- Be explicit about what is and is not implemented (for example, only Freighter is fully supported today).
- Use the project names `sorokit-core`, `@sorokit/core`, `@sorokit/ui`, and Sorokit consistently.

## Making a change

1. Fork the repository and create a branch from `main`.
2. Keep the change focused. One logical change per pull request.
3. Open a pull request and fill in the template.

## Code of conduct

By participating you agree to follow our [Code of Conduct](CODE_OF_CONDUCT.md). Security issues should be reported privately, see [SECURITY.md](SECURITY.md).

## License

By contributing, you agree that your contributions are licensed under the MIT License.
