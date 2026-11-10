# useSorobanCall

Runs one contract invocation through its full lifecycle: build, sign with the connected wallet, submit, and wait for confirmation.

```ts
function useSorobanCall<T = unknown>(options: UseSorobanCallOptions): UseSorobanCallReturn<T>;
```

## Options

```ts
interface UseSorobanCallOptions {
  contract: Contract;
  server: rpc.Server;
  networkPassphrase: string;
  walletAdapter: WalletAdapter | null;
  sourcePublicKey: string;
  pollIntervalMs?: number;
  timeoutMs?: number;
}
```

| Option | Default | Description |
|---|---|---|
| `contract` | | From [`useContract`](#/reference/use-contract). |
| `server` | | From [`useContract`](#/reference/use-contract). |
| `networkPassphrase` | | The passphrase of the target network. |
| `walletAdapter` | | The `adapter` from [`useWallet`](#/reference/use-wallet). `null` is allowed; `call` then ends in an error. |
| `sourcePublicKey` | | The account that sends the transaction, normally `account.publicKey`. |
| `pollIntervalMs` | `1000` | How often to check whether the transaction was confirmed. |
| `timeoutMs` | `60000` | How long to wait for confirmation before giving up. |

## Returns

```ts
interface UseSorobanCallReturn<T> {
  status: SorobanCallStatus;
  data: T | null;
  error: Error | null;
  transactionHash: string | null;
  call: (method: string, args?: xdr.ScVal[]) => Promise<void>;
  reset: () => void;
}
```

| Field | Description |
|---|---|
| `status` | `"idle"`, `"building"`, `"signing"`, `"submitting"`, `"success"` or `"error"`. |
| `data` | On success, the contract's return value as an XDR `ScVal` (typed as `T`), or `null`. |
| `error` | The failure reason when `status` is `"error"`, otherwise `null`. |
| `transactionHash` | Set once the network accepts the transaction. Cleared at the start of each call. |
| `call(method, args?)` | Invokes `method` with XDR-encoded `args`. Resolves when the lifecycle ends and never throws. |
| `reset()` | Returns to `"idle"` and clears `data`, `error` and `transactionHash`. |

## Behavior

- `call` has a stable identity across renders and reads the latest options each time it runs.
- Starting a call clears the previous `data`, `error` and `transactionHash`.
- Failures never throw. They set `status` to `"error"` and fill `error`:
  - no `walletAdapter`, or an empty `sourcePublicKey`
  - the wallet refuses to sign
  - the network answers `ERROR` or `TRY_AGAIN_LATER` when the transaction is submitted
  - the transaction is confirmed but failed
  - the transaction is not confirmed within `timeoutMs` (the message includes the hash; the transaction may still land later)

See the [Call a contract](#/guides/call-a-contract) guide for examples, including arguments and decoding results.
