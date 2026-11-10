# Theming

Components are styled with Tailwind classes that resolve to CSS variables. Changing a variable re-themes every component, with no Tailwind rebuild.

## How it fits together

- `@sorokit/ui/styles.css` defines the variables (`--sorokit-*`) for the light theme on `:root` and the dark theme on `.dark`.
- `@sorokit/ui/tailwind-preset` maps them to Tailwind colors (`sorokit-bg`, `sorokit-accent`, and so on) and a `rounded-sorokit` radius, and enables `darkMode: "class"`.

## Tokens

Each color token is a space-separated RGB triplet such as `59 91 219`, not a hex value. This lets Tailwind opacity modifiers like `bg-sorokit-pending/10` work.

| Variable | Tailwind color | Used for |
|---|---|---|
| `--sorokit-bg` | `sorokit-bg` | Modal and component backgrounds |
| `--sorokit-surface` | `sorokit-surface` | Raised surfaces |
| `--sorokit-border` | `sorokit-border` | Borders and dividers |
| `--sorokit-text` | `sorokit-text` | Primary text |
| `--sorokit-text-muted` | `sorokit-text-muted` | Secondary text |
| `--sorokit-accent` | `sorokit-accent` | Primary actions and links |
| `--sorokit-accent-fg` | `sorokit-accent-fg` | Text on top of the accent color |
| `--sorokit-success` | `sorokit-success` | Confirmed transactions |
| `--sorokit-danger` | `sorokit-danger` | Failed transactions and errors |
| `--sorokit-pending` | `sorokit-pending` | Pending transactions |
| `--sorokit-radius` | `rounded-sorokit` | Corner radius, a length such as `0.75rem` |

## Dark mode

Add the `dark` class to the `html` element, or any ancestor. The `.dark` block in the stylesheet swaps every token to its dark value.

## Rebranding

Override variables in your own CSS, after importing the stylesheet:

```css
:root {
  --sorokit-accent: 124 58 237;
  --sorokit-radius: 0.5rem;
}

.dark {
  --sorokit-accent: 167 139 250;
}
```
