Icon-only button for toolbars, headers and cards. Always pass `aria-label`.

```jsx
<IconButton aria-label="Add to bag" variant="accent"><Plus size={20} /></IconButton>
<IconButton aria-label="Favorite" variant="ghost"><Heart size={20} /></IconButton>
```

Variants: `primary | accent | soft | ghost (default) | outline`. Sizes `sm(32) | md(40) | lg(48)`. `round` (default true) toggles circle vs rounded-square.
