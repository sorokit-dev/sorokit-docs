# Connect a wallet

`useWallet` connects a browser wallet behind one interface. You choose the wallet when you call `connect`, not when the component mounts.

```tsx
import { useWallet } from "@sorokit/core";

export function WalletStatus() {
  const { account, status, error, connect, disconnect } = useWallet();

  if (status === "connected" && account) {
    return (
      <div>
        <p>Connected as {account.publicKey}</p>
        <button onClick={disconnect}>Disconnect</button>
      </div>
    );
  }

  return (
    <div>
      <button onClick={() => connect("freighter")} disabled={status === "connecting"}>
        {status === "connecting" ? "Connecting…" : "Connect Freighter"}
      </button>
      {status === "error" && error && <p role="alert">{error.message}</p>}
    </div>
  );
}
```

## Connection status

| `status` | Meaning |
|---|---|
| `disconnected` | No wallet connected. The initial state. |
| `connecting` | A wallet is being asked for access. |
| `connected` | `account` and `adapter` are set. |
| `error` | The attempt failed; `error` holds the reason. |

## Handling errors

`connect` never throws. Failures are reported through `status` and `error`:

- If the wallet is not installed, `error` is a `WalletNotAvailableError` with a message such as "Freighter is not installed or not available in this browser."
- If the user declines the request, `error` carries the wallet's message.
- If you pass an id that does not exist, `error` reads "Unknown wallet id".

## Supported wallets

| Wallet | `walletId` | Status |
|---|---|---|
| Freighter | `freighter` | Implemented |
| Albedo | `albedo` | Scaffolded, not yet implemented |
| xBull | `xbull` | Scaffolded, not yet implemented |

Connecting an unimplemented wallet ends in the `error` status with a "not yet implemented" message. See [Wallet adapters](#/reference/wallet-adapters) for the interface each wallet implements.

## Using the connected wallet

`adapter` is the adapter instance for the connected wallet, or `null` before connecting. Pass it to [`useSorobanCall`](#/guides/call-a-contract) so contract calls are signed by the same wallet.

> **Note:** wallet state lives inside each `useWallet()` call, so it is not shared between components. Call `useWallet` once, high in your tree, and pass what children need through props or your own context.
