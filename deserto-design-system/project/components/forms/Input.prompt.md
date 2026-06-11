Warm text input with label, helper/error text and adornments.

```jsx
<Input label="Email" placeholder="you@email.com" helperText="We'll send your receipt here." />
<Input label="Search menu" leading={<Search size={18} />} />
<Input label="Phone" error="Enter a valid number." defaultValue="123" />
```

Focus shows an orange ring. `size`: sm | md | lg. Pass any native input prop (`type`, `value`, `onChange`, …).
