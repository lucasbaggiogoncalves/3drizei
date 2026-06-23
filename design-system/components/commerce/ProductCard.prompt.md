The storefront product card — image, title, price, optional badge and rating, with favorite + quick-add. Composes Badge and RatingStars.

```jsx
<ProductCard
  title="Luminária Lua personalizada"
  price="R$ 119,90"
  badge="Novo"
  rating={4.9}
  ratingCount={128}
  onAdd={() => addToCart(id)}
/>
```

Omit `image` to show the warm clay + layer-line placeholder.
