# Transaction toasts

`useTxToast` shows a toast for a transaction and keeps it up to date as the transaction settles. It needs `ToastProvider` higher in your tree (see [Set up @sorokit/ui](#/guides/ui-setup)).

```tsx
import { useTxToast } from "@sorokit/ui";

function TransferButton({ send }: { send: () => Promise<unknown> }) {
  const { track } = useTxToast();

  return (
    <button onClick={() => track(send(), { label: "Transfer" })}>
      Send
    </button>
  );
}
```

## How `track` works

```ts
track<T>(promise: Promise<T>, opts?: { label?: string }): Promise<T>
```

1. A pending toast appears immediately, showing `label`.
2. When the promise resolves, the toast switches to success and `track` resolves with the same value.
3. When it rejects, the toast switches to failed and shows the error message, and `track` re-throws the error so you can still handle it.

The toast follows the promise you give it, so any asynchronous action can be tracked, not only contract calls.

## Using toasts with `useSorobanCall`

`useSorobanCall().call` does not reject when a transaction fails. It resolves when its lifecycle ends and reports the outcome through `status` and `error`. Passing `call(...)` straight to `track` would therefore show every transaction as successful.

For contract calls, render the outcome from `useSorobanCall` itself, as in [Call a contract](#/guides/call-a-contract). Use `track` for asynchronous work that signals failure by rejecting, such as your own API requests or wallet operations. Joining the two properly is listed under [Status and limitations](#/status).
