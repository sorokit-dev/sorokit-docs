# Call a contract

Calling a contract takes two hooks: `useContract` binds a contract address to an RPC server, and `useSorobanCall` drives one invocation from build to confirmation.

## Bind a contract

```tsx
const { contract, server } = useContract({
  contractId: "CABCD...",
  networkConfig: {
    network: "TESTNET",
    networkPassphrase: "Test SDF Network ; September 2015",
    rpcUrl: "https://soroban-testnet.stellar.org",
  },
});
```

`contract` is a `Contract` from `@stellar/stellar-sdk` and `server` is a Soroban RPC server. Both are memoized, so calling the hook is cheap. `server` is shared, so you can also use it directly for read-only RPC requests.

## Invoke a method

```tsx
const { call, status, data, error, transactionHash, reset } = useSorobanCall({
  contract,
  server,
  networkPassphrase: "Test SDF Network ; September 2015",
  walletAdapter: adapter, // from useWallet(); null before connecting
  sourcePublicKey: account?.publicKey ?? "",
});

await call("increment");
```

`call` resolves when the lifecycle ends. It does not throw: success and failure are both reported through `status`, `data` and `error`.

## Pass arguments

Arguments are XDR values. Build them with `nativeToScVal` from `@stellar/stellar-sdk`:

```tsx
import { nativeToScVal } from "@stellar/stellar-sdk";

await call("transfer", [
  nativeToScVal(recipient, { type: "address" }),
  nativeToScVal(1_000_000n, { type: "i128" }),
]);
```

## Read the result

On success, `data` holds the contract's return value as an XDR `ScVal`. Give the hook that type, then decode the value with `scValToNative`:

```tsx
import { scValToNative, type xdr } from "@stellar/stellar-sdk";

const { call, data } = useSorobanCall<xdr.ScVal>({
  // ...
});

const value = data ? scValToNative(data) : null;
```

## Call lifecycle

| `status` | What is happening |
|---|---|
| `idle` | Nothing in flight. The initial state, and the state after `reset()`. |
| `building` | Loading the account and preparing the transaction. |
| `signing` | Waiting for the wallet to sign. |
| `submitting` | Sending the signed transaction, then waiting for confirmation. |
| `success` | Confirmed. `data` and `transactionHash` are set. |
| `error` | Something failed. `error` holds the reason. |

`transactionHash` is set as soon as the network accepts the transaction, so you can link to it while it is still being confirmed.

## What counts as an error

A call ends in `error` when:

- no wallet is connected (`walletAdapter` is `null`) or `sourcePublicKey` is empty
- the user rejects the signature in their wallet
- the network rejects the submission (`ERROR` or `TRY_AGAIN_LATER`)
- the transaction is confirmed but failed on-chain
- the transaction is not confirmed in time

## Waiting for confirmation

After submitting, the hook polls every second and gives up after 60 seconds. Both are configurable:

```tsx
useSorobanCall({
  // ...
  pollIntervalMs: 2000,
  timeoutMs: 120_000,
});
```

A timeout does not mean the transaction failed; it may still be confirmed later. The error message includes the transaction hash so you can look it up.

## Stable `call`

`call` keeps the same identity across renders and always uses the latest options, so it is safe to pass to memoized children or use in effect dependencies.
