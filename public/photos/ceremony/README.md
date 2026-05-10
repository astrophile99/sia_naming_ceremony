# Photos Folder

Place your ceremony photos here named:
- photo1.jpg
- photo2.jpg
- ...
- photo30.jpg

The gallery is currently using placeholder images from picsum.photos.
To use real photos, update the `photos` array in `src/lib/utils.ts`:

```ts
export const photos = Array.from({ length: 30 }, (_, i) => ({
  id: i + 1,
  src: `/photos/photo${i + 1}.jpg`,  // ← change this line
  alt: `Sia's naming ceremony - precious moment ${i + 1}`,
  width: 800,
  height: i % 3 === 0 ? 900 : i % 3 === 1 ? 600 : 750,
  category: i < 10 ? "ceremony" : i < 20 ? "family" : i < 25 ? "candid" : "details",
}));
```
