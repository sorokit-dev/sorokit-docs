# Getting started

Sorokit is a set of React tools for building [Stellar Soroban](https://developers.stellar.org/docs/build/smart-contracts/overview) dApps. It is split into two packages:

| Package | What it gives you |
|---|---|
| `@sorokit/core` | Hooks for wallet connection, contract binding and the invoke / sign / submit / confirm lifecycle |
| `@sorokit/ui` | Accessible, themeable components (connect button, transaction toasts) built on top of core |

Both are in early development (0.x), so the API may change between minor versions. See [Status and limitations](#/status) for what works today.

## Install

```bash
npm install @sorokit/core @stellar/stellar-sdk
```

`@sorokit/core` requires React 18 or newer. It depends on `@stellar/stellar-sdk` v12; install the same major version in your app if you import from the SDK directly, for example to build contract arguments.

## A first dApp

This component connects Freighter and calls an `increment()` method on a contract. Replace the contract id with one you have deployed to Testnet.

```tsx
import { useWallet, useContract, useSorobanCall } from "@sorokit/core";

const TESTNET = {
  network: "TESTNET",
  networkPassphrase: "Test SDF Network ; September 2015",
  rpcUrl: "https://soroban-testnet.stellar.org",
} as const;

export function Counter() {
  const { account, adapter, status, connect } = useWallet();

  const { contract, server } = useContract({
    contractId: "CABCD...",
    networkConfig: TESTNET,
  });

  const { call, status: callStatus, error, transactionHash } = useSorobanCall({
    contract,
    server,
    networkPassphrase: TESTNET.networkPassphrase,
    walletAdapter: adapter, // null until a wallet is connected
    sourcePublicKey: account?.publicKey ?? "",
  });

  if (status !== "connected") {
    return <button onClick={() => connect("freighter")}>Connect Freighter</button>;
  }

  return (
    <div>
      <button onClick={() => call("increment")}>Call increment()</button>
      <p>Status: {callStatus}</p>
      {transactionHash && <p>Transaction: {transactionHash}</p>}
      {error && <p role="alert">{error.message}</p>}
    </div>
  );
}
```

What happens when the button is pressed: the hook builds a transaction for the method, asks the connected wallet to sign it, submits it, and then polls the network until it is confirmed. `callStatus` moves through `building`, `signing`, `submitting` and finally `success` or `error`.

## Networks

| `network` | Network passphrase |
|---|---|
| `TESTNET` | `Test SDF Network ; September 2015` |
| `PUBLIC` | `Public Global Stellar Network ; September 2015` |
| `FUTURENET` | `Test SDF Future Network ; October 2022` |

The `rpcUrl` is the address of a Soroban RPC server for that network. For Testnet you can use `https://soroban-testnet.stellar.org`; see the [Stellar documentation](https://developers.stellar.org/docs/data/apis/rpc/providers) for providers on other networks.

## Next steps

- [Connect a wallet](#/guides/connect-a-wallet)
- [Call a contract](#/guides/call-a-contract)
- [API reference](#/reference/use-wallet)
- [Add UI components](#/guides/ui-setup)
