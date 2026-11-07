# useContract

Binds a contract address to an RPC server for a network.

```ts
function useContract(options: UseContractOptions): UseContractResult;
```

## Options

```ts
interface UseContractOptions {
  contractId: string;
  networkConfig: NetworkConfig;
}
```

| Option | Description |
|---|---|
| `contractId` | The contract address (starts with `C`). |
| `networkConfig` | `{ network, networkPassphrase, rpcUrl }`. See [Types](#/reference/types). |

## Returns

```ts
interface UseContractResult {
  contract: Contract;
  server: rpc.Server;
}
```

| Field | Description |
|---|---|
| `contract` | A `Contract` instance from `@stellar/stellar-sdk` for the given id. |
| `server` | A Soroban RPC `Server` connected to `networkConfig.rpcUrl`. |

## Notes

- Both values are memoized: `contract` changes only when `contractId` changes, and `server` only when `rpcUrl` changes.
- An `http://` RPC URL is allowed (useful for a local node); use `https://` in production.
- This hook is deliberately thin. It does not sign or submit anything; use [`useSorobanCall`](#/reference/use-soroban-call) for that.
