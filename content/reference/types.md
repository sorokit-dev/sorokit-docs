# Types

All of these are exported from `@sorokit/core`.

## `SorobanNetwork`

```ts
type SorobanNetwork = "TESTNET" | "PUBLIC" | "FUTURENET";
```

## `NetworkConfig`

```ts
interface NetworkConfig {
  network: SorobanNetwork;
  networkPassphrase: string;
  rpcUrl: string;
}
```

Passed to [`useContract`](#/reference/use-contract). The passphrases for each network are listed in [Getting started](#/getting-started).

## `WalletConnectionState`

```ts
type WalletConnectionState = "disconnected" | "connecting" | "connected" | "error";
```

## `WalletAccount`

```ts
interface WalletAccount {
  publicKey: string;
  network?: SorobanNetwork;
}
```

## `SorobanCallStatus`

```ts
type SorobanCallStatus =
  | "idle"
  | "building"
  | "signing"
  | "submitting"
  | "success"
  | "error";
```

## `SorobanCallResult`

```ts
interface SorobanCallResult<T = unknown> {
  status: SorobanCallStatus;
  data: T | null;
  error: Error | null;
  transactionHash: string | null;
}
```

[`UseSorobanCallReturn`](#/reference/use-soroban-call) extends this with `call` and `reset`.

## Other exports

`WalletAdapter`, `UseWalletResult`, `UseContractOptions`, `UseContractResult`, `UseSorobanCallOptions` and `UseSorobanCallReturn` are documented on the pages for the hooks and [Wallet adapters](#/reference/wallet-adapters).
