# Status and limitations

Sorokit is in early development (0.x). This page says plainly what works today and what does not, so you can decide whether it fits your project.

## What works today

- **Freighter**: connecting, and signing transactions
- **Contract calls**: `useSorobanCall` builds, signs, submits and confirms a transaction, with timeouts and clear error states
- **UI**: the connect button, wallet picker and transaction toasts, with light and dark themes
- **Types**: the package is written in TypeScript and ships declarations

## Known limitations

- **Albedo and xBull are not implemented.** Both are scaffolded behind the common adapter interface, but connecting either ends in an error. Only Freighter works end to end.
- **Wallet state is not shared between components.** Each `useWallet()` call keeps its own connection state. Call it once, high in your tree, and pass the result down. A shared wallet provider is planned.
- **`useContractCall` in `@sorokit/ui` is experimental.** It builds a contract invocation but does not sign or submit a transaction. Use `useSorobanCall` from `@sorokit/core` for real calls.
- **Toasts and `useSorobanCall` do not compose directly**, because `call` reports failure through state rather than by rejecting. See [Transaction toasts](#/guides/transaction-toasts).
- **The API may change** between minor versions until 1.0.
- **Read-only contract queries have no dedicated hook yet.** `useContract` returns the RPC `server`, which you can use directly.

## Reporting problems

Open an issue in [sorokit-core](https://github.com/sorokit-dev/sorokit-core/issues) or [sorokit-ui](https://github.com/sorokit-dev/sorokit-ui/issues). Report security problems privately, as described in each repository's `SECURITY.md`.
