# useWallet

Connects a browser wallet (Freighter, Albedo or xBull) behind one interface.

```ts
function useWallet(): UseWalletResult;
```

## Returns

```ts
interface UseWalletResult {
  account: WalletAccount | null;
  status: WalletConnectionState;
  error: Error | null;
  connect: (walletId: string) => Promise<void>;
  disconnect: () => void;
  adapter: WalletAdapter | null;
}
```

| Field | Description |
|---|---|
| `account` | The connected account (`{ publicKey, network? }`), or `null`. |
| `status` | `"disconnected"`, `"connecting"`, `"connected"` or `"error"`. |
| `error` | The last connection error, or `null`. Cleared when a new attempt starts. |
| `connect(walletId)` | Connects the wallet with that adapter id: `"freighter"`, `"albedo"` or `"xbull"`. Never throws; failures set `status` to `"error"`. |
| `disconnect()` | Calls the adapter's `disconnect` if it has one, then clears `account`, `adapter` and `error`. A failure in the adapter's cleanup is ignored. |
| `adapter` | The adapter in use, or `null` before a wallet is connected. Pass it to [`useSorobanCall`](#/reference/use-soroban-call). |

## Notes

- The wallet is chosen when `connect` is called, not when the hook mounts.
- State is local to each call of the hook. Two components that each call `useWallet()` have independent connections.
- An unknown `walletId` sets `status` to `"error"` with the message `Unknown wallet id: <id>`.

See the [Connect a wallet](#/guides/connect-a-wallet) guide for an example.
