Pill toggle for binary settings.

```jsx
const [on, setOn] = React.useState(true);
<Switch checked={on} onChange={setOn} label="Email receipts" />
```

On = orange; the knob slides with an ease-bounce. `size`: sm | md. Use `label` for an inline caption.
