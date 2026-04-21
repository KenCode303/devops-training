# 📸 Image Setup Guide

## Where to Place Your Images

Place ALL images in the **same folder** as your HTML files:

```
devops-training-registration/
├── index.html
├── style.css
├── script.js
├── logo.png          ← Your company logo here
├── background.jpg    ← Optional background image
└── any-other-images.png
```

## Adding Your Company Logo

### Step 1: Prepare Your Logo
- **Recommended formats**: PNG (with transparent background) or SVG
- **Size**: Any size works, but 500x500px or smaller is ideal
- **Name**: Rename your logo to `logo.png` (or update the HTML if you keep the original name)

### Step 2: Place the Logo
1. Copy your logo file into the `/Users/kyeboah/src/devops-training-registration/` folder
2. That's it! The HTML is already set up to display it

### Step 3: Customize Logo Appearance

**To change logo size**, edit `style.css`:
```css
.logo {
    max-width: 200px;    /* Change this number */
    max-height: 100px;   /* Change this number */
}
```

**To keep logo's original colors** (not white), remove this line from `style.css`:
```css
filter: brightness(0) invert(1);  /* DELETE THIS LINE */
```

**To position logo differently**, edit `style.css`:
```css
.logo-container {
    margin-bottom: 1.5rem;  /* Space below logo */
    text-align: left;        /* Or: left, right, center */
}
```

## Adding Background Images

### Option 1: Background to the Entire Page

Edit `style.css` in the `body` section:
```css
body {
    background: url('your-background.jpg') no-repeat center center fixed;
    background-size: cover;
}
```

### Option 2: Background to Form Header

Edit `style.css` in the `.form-header` section:
```css
.form-header {
    background: url('header-bg.jpg') no-repeat center center;
    background-size: cover;
}
```

## Adding Other Images

### In the Form Body

Edit `index.html` and add anywhere inside the `<form>`:
```html
<div class="image-section">
    <img src="training-image.jpg" alt="Training Program">
</div>
```

Then add styling in `style.css`:
```css
.image-section {
    text-align: center;
    margin: 2rem 0;
}

.image-section img {
    max-width: 100%;
    border-radius: 8px;
}
```

## Image File Naming Tips

✅ **Good names:**
- `logo.png`
- `company-logo.svg`
- `background-image.jpg`
- `team-photo.png`

❌ **Avoid:**
- Spaces: `my logo.png` (use `my-logo.png` instead)
- Special characters: `logo@2x!.png`
- Very long names

## Recommended Image Sizes

| Image Type | Recommended Size | Format |
|------------|------------------|--------|
| Logo | 500x500px or less | PNG (transparent) or SVG |
| Background | 1920x1080px | JPG |
| Icons | 64x64px | PNG or SVG |
| Photos | 800x600px | JPG |

## Testing Your Images

1. Open `index.html` in your browser
2. Press `Ctrl+Shift+C` (or `Cmd+Option+C` on Mac) to open developer tools
3. Check the Console tab for any "404" or "image not found" errors
4. If images don't show, check:
   - File name matches exactly (case-sensitive!)
   - File is in the correct folder
   - File extension is correct (.png, .jpg, etc.)

## Image Optimization Tips

Before adding images, optimize them for web:

1. **Compress images**: Use [TinyPNG](https://tinypng.com) or [Squoosh](https://squoosh.app)
2. **Resize large images**: Don't use 5000x5000px images for a 200px logo
3. **Use correct format**:
   - PNG: For logos, icons, images with transparency
   - JPG: For photos, backgrounds
   - SVG: For logos and icons (best quality, smallest size)

## Quick Reference

**Your logo is ready to display!** Just:
1. Name your logo file: `logo.png`
2. Place it in: `/Users/kyeboah/src/devops-training-registration/`
3. Refresh your browser

The HTML is already set up with:
```html
<img src="logo.png" alt="Company Logo" class="logo">
```

If your logo has a different name (e.g., `company-logo.svg`), change `logo.png` to match your filename.
