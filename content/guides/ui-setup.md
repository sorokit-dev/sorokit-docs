# Set up @sorokit/ui

`@sorokit/ui` is a library of accessible, themeable React components built on `@sorokit/core`. It is styled with Tailwind CSS.

## Install

```bash
npm install @sorokit/ui @sorokit/core
```

It requires React 18 or newer and Tailwind CSS 3.

## Configure Tailwind

Add the preset and let Tailwind scan the library's output so its classes are generated:

```js
// tailwind.config.js
module.exports = {
  presets: [require("@sorokit/ui/tailwind-preset")],
  content: [
    "./src/**/*.{ts,tsx}",
    "./node_modules/@sorokit/ui/dist/**/*.js",
  ],
};
```

## Import the theme

Import the stylesheet once in your app entry. It defines the theme variables for light and dark mode.

```ts
import "@sorokit/ui/styles.css";
```

## Add the provider and button

```tsx
import { ToastProvider, ConnectButton } from "@sorokit/ui";

export function App() {
  return (
    <ToastProvider>
      <ConnectButton />
    </ToastProvider>
  );
}
```

`ToastProvider` supplies the context that [transaction toasts](#/guides/transaction-toasts) use. `ConnectButton` shows a "Connect Wallet" button that opens a wallet picker, and the connected address once a wallet is connected.

## Next

- [Transaction toasts](#/guides/transaction-toasts)
- [Theming](#/guides/theming)
- The [sorokit-ui README](https://github.com/sorokit-dev/sorokit-ui#readme) lists every exported component.
