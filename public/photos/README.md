# Sia's Photos — How to Add/Remove Photos

## Folder Structure
```
public/photos/
  ceremony/   ← naming ceremony moments
  family/     ← family group shots
  candid/     ← candid, fun moments
  details/    ← decor, food, details
```

## Add a photo
1. Drop any .jpg / .jpeg / .png / .webp into the right subfolder
2. Run: `npm run scan`  (or just `npm run dev` — it auto-scans)
3. Done — photo appears in gallery ✅

## Remove a photo
1. Delete the file from the subfolder
2. Run: `npm run scan`
3. Done — photo disappears ✅

## Supported formats
jpg, jpeg, png, webp (any casing)

## Photo naming
Any name works. They sort alphabetically within each category.
Suggested: `001.jpg`, `002.jpg` for easy ordering.

## For Vercel deployment
The scan runs automatically during `npm run build`.
Just push your photos to GitHub and deploy — no manual steps.
