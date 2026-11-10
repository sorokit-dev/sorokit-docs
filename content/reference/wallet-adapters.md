# Wallet adapters

Every supported wallet implements one interface, so hooks and your app never branch on which wallet is in use.

## The `WalletAdapter` interface

```ts
interface WalletAdapter {
  id: string;
  name: string;
  isAvailable(): Promise<boolean>;
  connect(): Promise<WalletAccount>;
  signTransaction(
    xdr: string,
    opts: { networkPassphrase: string; address?: string }
  ): Promise<string>;
  disconnect?(): Promise<void>;
}
```

| Member | Description |
|---|---|
| `id` | Unique id used to select the wallet, for example `"freighter"`. |
| `name` | Human-readable name for display. |
| `isAvailable()` | Whether the wallet is present in this browser. |
| `connect()` | Asks the user to grant access and returns their account. |
| `signTransaction(xdr, opts)` | Signs a transaction XDR and returns the signed XDR string. |
| `disconnect()` | Optional. Clears local connection state for wallets that need it. |

## Built-in adapters

```ts
import {
  walletAdapters,
  freighterAdapter,
  albedoAdapter,
  xbullAdapter,
  WalletNotAvailableError,
} from "@sorokit/core";
```

`walletAdapters` is a record of all built-in adapters keyed by id: `freighter`, `albedo` and `xbull`. This is the registry `useWallet().connect(id)` looks adapters up in.

| Adapter | Status | Notes |
|---|---|---|
| `freighterAdapter` | Implemented | Available when the Freighter extension is present. `connect` requests access and returns the public key. `signTransaction` forwards the network passphrase and address to Freighter. |
| `albedoAdapter` | Scaffolded | Reports itself available, but `connect` and `signTransaction` are not yet implemented and reject with an error. |
| `xbullAdapter` | Scaffolded | Available only when the xBull SDK is injected into the page. `connect` and `signTransaction` are not yet implemented and reject with an error. |

## `WalletNotAvailableError`

Thrown by an adapter's `connect` when its wallet is not installed. The message reads "<Wallet name> is not installed or not available in this browser." `useWallet` catches it and exposes it as `error`.

## Using your own adapter

`useWallet().connect` only knows the built-in adapters. A custom adapter can still sign transactions: pass it as `walletAdapter` to [`useSorobanCall`](#/reference/use-soroban-call).

```ts
import type { WalletAdapter } from "@sorokit/core";

const myWallet: WalletAdapter = {
  id: "my-wallet",
  name: "My Wallet",
  isAvailable: async () => typeof window !== "undefined" && "myWallet" in window,
  connect: async () => ({ publicKey: await getPublicKeyFromMyWallet() }),
  signTransaction: async (xdr, { networkPassphrase }) =>
    signWithMyWallet(xdr, networkPassphrase),
};
```

`getPublicKeyFromMyWallet` and `signWithMyWallet` stand in for your wallet's own API.
